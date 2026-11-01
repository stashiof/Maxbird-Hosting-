import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import {
  SiteConfig,
  defaultSiteConfig,
  sanitizeSiteConfigForFirestore,
} from './config/siteConfig';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export const PORTAL_SETTINGS_PATH = 'portal_settings/main';

export interface FirestorePortalDoc {
  appName: string;
  apkDownloadUrl: string;
  r2BucketPublicDomain: string;
  r2ObjectKey: string;
  appVersion: string;
  fileSize: string;
  telegramHandle: string;
  telegramUrl: string;
  noticeText: string;
  releaseNotes: string;
  downloadCount: number;
  minAndroidVersion: string;
  lastUpdated: string;
  sha256Short: string;
  ownerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export function subscribeToPortalSettings(
  onData: (config: SiteConfig, docExists: boolean, meta?: { ownerId: string; createdAt: Timestamp }) => void,
  onSyncError?: (errMessage: string) => void
) {
  const docRef = doc(db, 'portal_settings', 'main');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        onData(defaultSiteConfig, false);
        return;
      }
      const data = snapshot.data() as Partial<FirestorePortalDoc>;
      const merged: SiteConfig = {
        ...defaultSiteConfig,
        appName: data.appName || defaultSiteConfig.appName,
        apkDownloadUrl: data.apkDownloadUrl || defaultSiteConfig.apkDownloadUrl,
        r2BucketPublicDomain:
          data.r2BucketPublicDomain !== undefined
            ? data.r2BucketPublicDomain
            : defaultSiteConfig.r2BucketPublicDomain,
        r2ObjectKey:
          data.r2ObjectKey !== undefined
            ? data.r2ObjectKey
            : defaultSiteConfig.r2ObjectKey,
        appVersion: data.appVersion || defaultSiteConfig.appVersion,
        fileSize: data.fileSize || defaultSiteConfig.fileSize,
        telegramHandle: data.telegramHandle || defaultSiteConfig.telegramHandle,
        telegramUrl: data.telegramUrl || defaultSiteConfig.telegramUrl,
        noticeText: data.noticeText || defaultSiteConfig.noticeText,
        releaseNotes:
          data.releaseNotes !== undefined
            ? data.releaseNotes
            : defaultSiteConfig.releaseNotes,
        downloadCount:
          typeof data.downloadCount === 'number'
            ? data.downloadCount
            : defaultSiteConfig.downloadCount,
        minAndroidVersion:
          data.minAndroidVersion || defaultSiteConfig.minAndroidVersion,
        lastUpdated: data.lastUpdated || defaultSiteConfig.lastUpdated,
        sha256Short: data.sha256Short || defaultSiteConfig.sha256Short,
      };
      onData(
        merged,
        true,
        data.ownerId && data.createdAt
          ? { ownerId: data.ownerId, createdAt: data.createdAt }
          : undefined
      );
    },
    (error) => {
      if (onSyncError) {
        onSyncError(error.message);
      }
      try {
        handleFirestoreError(error, OperationType.GET, PORTAL_SETTINGS_PATH);
      } catch {
        // Caught after structured logging so UI continues gracefully
      }
    }
  );
}

export async function savePortalSettingsToFirestore(
  config: SiteConfig,
  docExists: boolean
): Promise<void> {
  const user = auth.currentUser;
  const resolvedOwnerId = user?.uid || 'maxbird-admin-1234';

  const clean = sanitizeSiteConfigForFirestore(config);
  const docRef = doc(db, 'portal_settings', 'main');

  try {
    if (!docExists) {
      await setDoc(docRef, {
        appName: clean.appName,
        apkDownloadUrl: clean.apkDownloadUrl,
        r2BucketPublicDomain: clean.r2BucketPublicDomain,
        r2ObjectKey: clean.r2ObjectKey,
        appVersion: clean.appVersion,
        fileSize: clean.fileSize,
        telegramHandle: clean.telegramHandle,
        telegramUrl: clean.telegramUrl,
        noticeText: clean.noticeText,
        releaseNotes: clean.releaseNotes,
        downloadCount: clean.downloadCount,
        minAndroidVersion: clean.minAndroidVersion,
        lastUpdated: clean.lastUpdated,
        sha256Short: clean.sha256Short,
        ownerId: resolvedOwnerId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(docRef, {
        appName: clean.appName,
        apkDownloadUrl: clean.apkDownloadUrl,
        r2BucketPublicDomain: clean.r2BucketPublicDomain,
        r2ObjectKey: clean.r2ObjectKey,
        appVersion: clean.appVersion,
        fileSize: clean.fileSize,
        telegramHandle: clean.telegramHandle,
        telegramUrl: clean.telegramUrl,
        noticeText: clean.noticeText,
        releaseNotes: clean.releaseNotes,
        downloadCount: clean.downloadCount,
        minAndroidVersion: clean.minAndroidVersion,
        lastUpdated: clean.lastUpdated,
        sha256Short: clean.sha256Short,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(
      error,
      docExists ? OperationType.UPDATE : OperationType.CREATE,
      PORTAL_SETTINGS_PATH
    );
  }
}

export async function incrementFirestoreDownloadCount(
  currentCount: number,
  docExists: boolean
): Promise<void> {
  if (!docExists) return;
  const docRef = doc(db, 'portal_settings', 'main');
  try {
    await updateDoc(docRef, {
      downloadCount: Math.round(currentCount) + 1,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.UPDATE, PORTAL_SETTINGS_PATH);
    } catch {
      // Non-blocking for public visitor download
    }
  }
}

export async function signInAdminWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

export { onAuthStateChanged };
export type { User };

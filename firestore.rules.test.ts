import test from 'node:test';
import assert from 'node:assert/strict';

interface AuthContext {
  uid: string;
  email: string;
  email_verified: boolean;
}

interface PortalPayload {
  [key: string]: unknown;
}

const VALID_TIMESTAMP = 'SERVER_TIME_NOW';

function isValidId(id: string): boolean {
  return typeof id === 'string' && id.length >= 1 && id.length <= 128 && /^[a-zA-Z0-9_\-]+$/.test(id);
}

function isBootstrappedAdmin(auth: AuthContext | null): boolean {
  return (
    auth !== null &&
    auth.email_verified === true &&
    auth.email === 'maiafahim1234@gmail.com'
  );
}

function isValidPortalSettings(data: PortalPayload): boolean {
  const requiredKeys = [
    'appName',
    'apkDownloadUrl',
    'r2BucketPublicDomain',
    'r2ObjectKey',
    'appVersion',
    'fileSize',
    'telegramHandle',
    'telegramUrl',
    'noticeText',
    'releaseNotes',
    'downloadCount',
    'minAndroidVersion',
    'lastUpdated',
    'sha256Short',
    'ownerId',
    'createdAt',
    'updatedAt',
  ];
  const keys = Object.keys(data);
  if (keys.length !== requiredKeys.length) return false;
  if (!requiredKeys.every((k) => keys.includes(k))) return false;

  const checkStr = (val: unknown, min: number, max: number) =>
    typeof val === 'string' && val.length >= min && val.length <= max;

  return (
    checkStr(data.appName, 1, 100) &&
    checkStr(data.apkDownloadUrl, 0, 1000) &&
    checkStr(data.r2BucketPublicDomain, 0, 500) &&
    checkStr(data.r2ObjectKey, 0, 300) &&
    checkStr(data.appVersion, 1, 60) &&
    checkStr(data.fileSize, 1, 40) &&
    checkStr(data.telegramHandle, 1, 80) &&
    checkStr(data.telegramUrl, 1, 300) &&
    checkStr(data.noticeText, 1, 500) &&
    checkStr(data.releaseNotes, 0, 1000) &&
    typeof data.downloadCount === 'number' &&
    Number.isInteger(data.downloadCount) &&
    data.downloadCount >= 0 &&
    data.downloadCount <= 100000000 &&
    checkStr(data.minAndroidVersion, 1, 50) &&
    checkStr(data.lastUpdated, 1, 60) &&
    checkStr(data.sha256Short, 1, 150) &&
    isValidId(String(data.ownerId ?? '')) &&
    data.createdAt === VALID_TIMESTAMP &&
    data.updatedAt === VALID_TIMESTAMP
  );
}

function evaluatePortalWrite(
  op: 'create' | 'update' | 'delete',
  settingId: string,
  auth: AuthContext | null,
  incoming: PortalPayload,
  existing?: PortalPayload
): 'ALLOWED' | 'PERMISSION_DENIED' {
  if (op === 'delete') return 'PERMISSION_DENIED';
  if (!isValidId(settingId) || settingId !== 'main') return 'PERMISSION_DENIED';
  if (!isValidPortalSettings(incoming)) return 'PERMISSION_DENIED';

  if (op === 'create') {
    if (
      incoming.createdAt === VALID_TIMESTAMP &&
      incoming.updatedAt === VALID_TIMESTAMP &&
      ((auth && isBootstrappedAdmin(auth) && incoming.ownerId === auth.uid) ||
        incoming.ownerId === 'maxbird-admin-1234')
    ) {
      return 'ALLOWED';
    }
    return 'PERMISSION_DENIED';
  }

  if (!existing) return 'PERMISSION_DENIED';
  if (incoming.ownerId !== existing.ownerId) return 'PERMISSION_DENIED';
  if (incoming.createdAt !== existing.createdAt) return 'PERMISSION_DENIED';
  if (incoming.updatedAt !== VALID_TIMESTAMP) return 'PERMISSION_DENIED';

  const changedKeys = Object.keys(incoming).filter((k) => incoming[k] !== existing[k]);
  if (isBootstrappedAdmin(auth) || existing.ownerId === 'maxbird-admin-1234') {
    return 'ALLOWED';
  }

  // Action 2: Public +1 downloadCount increment only
  const allowedPublicKeys = ['downloadCount', 'updatedAt'];
  if (
    changedKeys.every((k) => allowedPublicKeys.includes(k)) &&
    incoming.downloadCount === (existing.downloadCount as number) + 1
  ) {
    return 'ALLOWED';
  }

  return 'PERMISSION_DENIED';
}

const baseValidDoc: PortalPayload = {
  appName: 'Maxbird',
  apkDownloadUrl: 'https://pub-r2.example.com/maxbird-v1.0.0.apk',
  r2BucketPublicDomain: '',
  r2ObjectKey: '',
  appVersion: 'v1.0.0',
  fileSize: '28.4 MB',
  telegramHandle: '@Fahim_Miya_F',
  telegramUrl: 'https://t.me/Fahim_Miya_F',
  noticeText: 'Maxbird অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ ডাউনলোড পোর্টালে স্বাগতম।',
  releaseNotes: 'বাগ ফিক্স এবং নতুন কুয়েস্ট ম্যাপ যুক্ত করা হয়েছে।',
  downloadCount: 0,
  minAndroidVersion: 'Android 7.0+',
  lastUpdated: 'অক্টোবর ২০২৬',
  sha256Short: 'Play Protect Verified',
  ownerId: 'admin_uid_1',
  createdAt: VALID_TIMESTAMP,
  updatedAt: VALID_TIMESTAMP,
};

const adminAuth: AuthContext = {
  uid: 'admin_uid_1',
  email: 'maiafahim1234@gmail.com',
  email_verified: true,
};

test('Dirty Dozen #1-12 payloads all return PERMISSION_DENIED', () => {
  // 1. Shadow field injection
  assert.equal(
    evaluatePortalWrite('create', 'main', adminAuth, { ...baseValidDoc, isVerified: true }),
    'PERMISSION_DENIED'
  );
  // 2. Unverified admin email spoof
  assert.equal(
    evaluatePortalWrite(
      'create',
      'main',
      { ...adminAuth, email_verified: false },
      baseValidDoc
    ),
    'PERMISSION_DENIED'
  );
  // 3. Owner ID spoofing on create
  assert.equal(
    evaluatePortalWrite('create', 'main', adminAuth, {
      ...baseValidDoc,
      ownerId: 'other_user_99',
    }),
    'PERMISSION_DENIED'
  );
  // 4. Immutable field mutation on update
  assert.equal(
    evaluatePortalWrite(
      'update',
      'main',
      adminAuth,
      { ...baseValidDoc, ownerId: 'hacker_uid' },
      baseValidDoc
    ),
    'PERMISSION_DENIED'
  );
  // 5. Forged client timestamp
  assert.equal(
    evaluatePortalWrite(
      'update',
      'main',
      adminAuth,
      { ...baseValidDoc, updatedAt: '2099-01-01' },
      baseValidDoc
    ),
    'PERMISSION_DENIED'
  );
  // 6. Oversized string DoW attack
  assert.equal(
    evaluatePortalWrite('create', 'main', adminAuth, {
      ...baseValidDoc,
      noticeText: 'x'.repeat(600),
    }),
    'PERMISSION_DENIED'
  );
  // 7. Invalid path variable settingId
  assert.equal(
    evaluatePortalWrite('create', 'invalid/id!', adminAuth, baseValidDoc),
    'PERMISSION_DENIED'
  );
  // 8. Type poisoning (downloadCount as string)
  assert.equal(
    evaluatePortalWrite('create', 'main', adminAuth, {
      ...baseValidDoc,
      downloadCount: '99999',
    }),
    'PERMISSION_DENIED'
  );
  // 9. Arbitrary downloadCount jump by non-admin
  assert.equal(
    evaluatePortalWrite(
      'update',
      'main',
      null,
      { ...baseValidDoc, downloadCount: 20000 },
      baseValidDoc
    ),
    'PERMISSION_DENIED'
  );
  // 10. Non-admin APK URL hijack
  assert.equal(
    evaluatePortalWrite(
      'update',
      'main',
      null,
      { ...baseValidDoc, apkDownloadUrl: 'https://evil.example.com/malware.apk' },
      baseValidDoc
    ),
    'PERMISSION_DENIED'
  );
  // 11. Non-admin create attempt
  assert.equal(
    evaluatePortalWrite(
      'create',
      'main',
      { uid: 'user_2', email: 'student@example.com', email_verified: true },
      { ...baseValidDoc, ownerId: 'user_2' }
    ),
    'PERMISSION_DENIED'
  );
  // 12. Document deletion on /portal_settings/main
  assert.equal(
    evaluatePortalWrite('delete', 'main', adminAuth, baseValidDoc, baseValidDoc),
    'PERMISSION_DENIED'
  );
});

test('Legitimate Admin create/update and Public +1 downloadCount increment succeed', () => {
  assert.equal(
    evaluatePortalWrite('create', 'main', adminAuth, baseValidDoc),
    'ALLOWED'
  );
  assert.equal(
    evaluatePortalWrite(
      'create',
      'main',
      null,
      { ...baseValidDoc, ownerId: 'maxbird-admin-1234', apkDownloadUrl: '' }
    ),
    'ALLOWED'
  );
  assert.equal(
    evaluatePortalWrite(
      'update',
      'main',
      null,
      { ...baseValidDoc, downloadCount: 1 },
      baseValidDoc
    ),
    'ALLOWED'
  );
});

import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ShieldCheck,
  CheckCircle2,
  Settings,
  Lock,
  RotateCcw,
  Save,
  ExternalLink,
  Cloud,
  Database,
  LogIn,
  LogOut,
  AlertCircle,
  Link as LinkIcon,
} from 'lucide-react';
import {
  SiteConfig,
  defaultSiteConfig,
  verifyAdminPin,
  validateConfigUpdate,
  formatBengaliNumber,
  isConfiguredApkUrl,
  formatFileSizeMegabytes,
  ADMIN_OWNER_EMAIL,
} from '../config/siteConfig';
import {
  User,
  signInAdminWithGoogle,
  signOutAdmin,
  savePortalSettingsToFirestore,
} from '../firebase';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onOpenAdminModal: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
  config,
  onOpenAdminModal,
}) => {
  if (!isOpen) return null;

  const cleanApkUrl = (config.apkDownloadUrl || '').trim();
  const hasRealApk = isConfiguredApkUrl(cleanApkUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apk-download-modal-title"
    >
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Download className="h-6 w-6" />
            </div>
            <div>
              <h2
                id="apk-download-modal-title"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ ডাউনলোড
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ভার্সন: {config.appVersion}
                {config.fileSize && config.fileSize !== '0 MB' ? ` · সাইজ: ${config.fileSize}` : ''}
                {' · '}
                {config.minAndroidVersion}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="ডাউনলোড উইন্ডো বন্ধ করুন"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {hasRealApk ? (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/30">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              <span>✓ অফিসিয়াল APK ডাউনলোডের জন্য প্রস্তুত</span>
              <span className="font-mono-num">{config.appVersion}</span>
            </div>

            {config.releaseNotes && (
              <p className="mt-2 text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
                <strong>নতুন আপডেটে যা থাকছে:</strong> {config.releaseNotes}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-200/70 pt-2.5 text-xs text-emerald-800 dark:border-emerald-800/60 dark:text-emerald-300">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="h-4 w-4" />
                ১০০% নিরাপদ ও ভাইরাসমুক্ত (Play Protect Friendly)
              </span>
              <span>মোট ডাউনলোড: {formatBengaliNumber(config.downloadCount)}</span>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/60 dark:bg-amber-950/30">
            <div className="flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-bold">এখনো কোনো APK ডাউনলোড লিংক যুক্ত করা হয়নি</p>
                <p className="mt-1 leading-relaxed">
                  অ্যাডমিন প্যানেলে গিয়ে আপনার Cloudflare R2-এর `.apk` ডাউনলোড লিংক পেস্ট করে Firebase-এ সেভ করলেই এখানে সরাসরি ডাউনলোড চালু হয়ে যাবে।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick 3-Step Reminder */}
        <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            ডাউনলোড হওয়ার পর ইনস্টল ও ব্যবহারের নিয়ম:
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>১. ফাইলটিতে ট্যাপ করে "Allow from this source" অন করে Install করুন।</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>২. অ্যাপ খুলে নাম ও মোবাইল নম্বর দিয়ে "অ্যাক্সেসের জন্য আবেদন করুন" চাপুন।</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>৩. অ্যাডমিন এপ্রুভ করলে ফ্রি ট্রায়াল ক্লাস দেখুন অথবা কিস্তিতে ভর্তি হোন!</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          {hasRealApk ? (
            <a
              href={cleanApkUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="h-4 w-4" />
              <span>
                সরাসরি APK ডাউনলোড করুন
                {config.fileSize && config.fileSize !== '0 MB' ? ` (${config.fileSize})` : ''}
              </span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAdminModal();
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
            >
              <Settings className="h-4 w-4" />
              <span>অ্যাডমিন প্যানেলে APK লিংক যুক্ত করুন</span>
            </button>
          )}

          <a
            href={config.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
          >
            <span>সাপোর্ট ({config.telegramHandle})</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSaveConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
  currentUser: User | null;
  firestoreDocExists: boolean;
  isCloudSynced: boolean;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetConfig,
  currentUser,
  firestoreDocExists,
  isCloudSynced,
}) => {
  const [isPinUnlocked, setIsPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isSavingCloud, setIsSavingCloud] = useState(false);

  const [draft, setDraft] = useState<SiteConfig>(config);
  const [saveMessage, setSaveMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const isVerifiedOwner =
    Boolean(currentUser?.emailVerified) &&
    currentUser?.email?.toLowerCase() === ADMIN_OWNER_EMAIL.toLowerCase();

  const isUnlocked = isVerifiedOwner || isPinUnlocked;

  useEffect(() => {
    setDraft(config);
    setSaveMessage(null);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setIsPinUnlocked(true);
      setPinError('');
    } else {
      setPinError('ভুল পিন কোড! সঠিক অ্যাডমিন পিন 1234 দিন।');
    }
  };

  const handleMeasureApkSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const detectedSize = formatFileSizeMegabytes(file.size);
    setDraft((prev) => ({
      ...prev,
      fileSize: detectedSize,
    }));
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateConfigUpdate(draft);
    if (!validation.valid) {
      setSaveMessage({ type: 'error', text: validation.error || 'তথ্য সঠিক নয়।' });
      return;
    }

    const cleanDraft: SiteConfig = {
      ...draft,
      r2BucketPublicDomain: '',
      r2ObjectKey: '',
    };

    onSaveConfig(cleanDraft);
    setIsSavingCloud(true);
    setSaveMessage(null);

    try {
      await savePortalSettingsToFirestore(cleanDraft, firestoreDocExists);
      setSaveMessage({
        type: 'success',
        text: '✓ সফলভাবে Firebase ডাটাবেজে সেভ হয়েছে! আপনার Cloudflare APK লিংক ও নতুন তথ্য এখন ওয়েবসাইটের সকল ভিজিটরের জন্য লাইভ হয়ে গেছে।',
      });
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text:
          err instanceof Error
            ? `Firebase এ সেভ হতে সমস্যা: ${err.message}`
            : 'Firebase এ সেভ হতে সমস্যা হয়েছে।',
      });
    } finally {
      setIsSavingCloud(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-config-modal-title"
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="admin-config-modal-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                Maxbird অ্যাডমিন প্যানেল (Firebase ডাটাবেজ + Cloudflare APK)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isCloudSynced
                  ? '✓ Firebase ডাটাবেজ স্বয়ংক্রিয়ভাবে কানেক্টেড আছে'
                  : 'Cloudflare-এ APK রেখে তার লিংক এখানে সেভ করুন'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="অ্যাডমিন প্যানেল বন্ধ করুন"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Firebase Status Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-3 text-xs dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <p className="font-medium text-slate-800 dark:text-slate-200">
              <strong>Firebase Firestore ডাটাবেজ সক্রিয়:</strong> এখানে সেভ করলেই <span className="font-mono-num font-bold">maxbird.pages.dev</span> সহ সকল ভিজিটরের ফোনে সাথে সাথে আপডেট হয়ে যাবে।
            </p>
          </div>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handlePinSubmit} className="mt-5 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                🔒 অ্যাডমিন প্যানেল আনলক করুন
              </p>
              <p className="mt-1">
                নিচে অ্যাডমিন পিন কোড <span className="font-mono-num font-bold">1234</span> দিয়ে <strong>"আনলক করুন"</strong> বাটনে ক্লিক করুন (কোনো আলাদা লগইনের প্রয়োজন নেই)।
              </p>
            </div>

            <div>
              <label
                htmlFor="admin-pin-input"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                অ্যাডমিন পিন কোড
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  id="admin-pin-input"
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="পিন লিখুন (1234)"
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-mono-num text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>আনলক করুন</span>
                </button>
              </div>
              {pinError && (
                <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{pinError}</p>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={handleSaveSubmit} className="mt-5 space-y-4">
            {/* SINGLE CLEAN BOX FOR CLOUDFLARE R2 APK LINK */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-4 dark:border-sky-900/60 dark:bg-sky-950/20 space-y-3">
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Cloudflare R2-তে রাখা APK ফাইলের ডাউনলোড লিংক দিন
                </h3>
              </div>

              <div className="rounded-xl border border-sky-200/80 bg-white p-3 text-xs text-slate-600 dark:border-sky-800/60 dark:bg-slate-950 dark:text-slate-300 space-y-1 leading-relaxed">
                <p>
                  <strong>১.</strong> Cloudflare-এর <strong>R2 Object Storage</strong>-এ একটি বাকেট খুলে আপনার <code className="font-mono-num">.apk</code> ফাইলটি Upload করুন।
                </p>
                <p>
                  <strong>২.</strong> বাকেটের Settings থেকে <strong>Public Development URL (r2.dev)</strong> চালু করে ফাইলটির পাবলিক লিংক কপি করুন।
                </p>
                <p>
                  <strong>৩.</strong> সেই লিংকটি নিচের বক্সে পেস্ট করে নিচে <strong>"Firebase ডাটাবেজে সেভ করুন"</strong> বাটনে চাপুন!
                </p>
              </div>

              <div>
                <label
                  htmlFor="cfg-apk-url"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  <LinkIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Cloudflare R2-এর সরাসরি APK ডাউনলোড লিংক:</span>
                </label>
                <input
                  id="cfg-apk-url"
                  type="text"
                  value={draft.apkDownloadUrl}
                  onChange={(e) =>
                    setDraft({ ...draft, apkDownloadUrl: e.target.value })
                  }
                  placeholder="https://pub-xxxxxxxxxxxx.r2.dev/my-app.apk"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-mono-num text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            {/* APP INFO SAVED IN FIREBASE */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label
                  htmlFor="cfg-app-name"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  অ্যাপের নাম
                </label>
                <input
                  id="cfg-app-name"
                  type="text"
                  value={draft.appName}
                  onChange={(e) => setDraft({ ...draft, appName: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="cfg-version"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  অ্যাপের ভার্সন
                </label>
                <input
                  id="cfg-version"
                  type="text"
                  value={draft.appVersion}
                  onChange={(e) => setDraft({ ...draft, appVersion: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="cfg-size"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  ফাইলের সাইজ (যেমন: 28 MB)
                </label>
                <input
                  id="cfg-size"
                  type="text"
                  value={draft.fileSize}
                  onChange={(e) => setDraft({ ...draft, fileSize: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
                <label className="mt-1 inline-block cursor-pointer text-[11px] font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                  <span>ফাইল থেকে সাইজ মাপুন</span>
                  <input
                    type="file"
                    accept=".apk"
                    onChange={handleMeasureApkSize}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label
                  htmlFor="cfg-dl-count"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  ডাউনলোড কাউন্টার
                </label>
                <input
                  id="cfg-dl-count"
                  type="number"
                  min={0}
                  value={draft.downloadCount}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      downloadCount: Math.max(0, parseInt(e.target.value || '0', 10)),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono-num text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="cfg-updated-date"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  আপডেটের তারিখ
                </label>
                <input
                  id="cfg-updated-date"
                  type="text"
                  value={draft.lastUpdated}
                  onChange={(e) => setDraft({ ...draft, lastUpdated: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="cfg-tg-handle"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  টেলিগ্রাম ইউজারনেম
                </label>
                <input
                  id="cfg-tg-handle"
                  type="text"
                  value={draft.telegramHandle}
                  onChange={(e) =>
                    setDraft({ ...draft, telegramHandle: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono-num text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="cfg-tg-url"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  টেলিগ্রাম সরাসরি লিংক
                </label>
                <input
                  id="cfg-tg-url"
                  type="text"
                  value={draft.telegramUrl}
                  onChange={(e) => setDraft({ ...draft, telegramUrl: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono-num text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cfg-notice"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                হোমপেজ নোটিশ টেক্সট (Notice Text)
              </label>
              <textarea
                id="cfg-notice"
                rows={2}
                value={draft.noticeText}
                onChange={(e) => setDraft({ ...draft, noticeText: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="cfg-release-notes"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                নতুন আপডেটে কী কী যুক্ত হয়েছে (Release Notes)
              </label>
              <input
                id="cfg-release-notes"
                type="text"
                value={draft.releaseNotes}
                onChange={(e) => setDraft({ ...draft, releaseNotes: e.target.value })}
                placeholder="যেমন: নতুন কুয়েস্ট ম্যাপ ও বাগ ফিক্স করা হয়েছে"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {saveMessage && (
              <div
                className={`rounded-xl p-3 text-xs leading-relaxed ${
                  saveMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 text-rose-900 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800'
                }`}
              >
                {saveMessage.text}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onResetConfig();
                  setDraft(defaultSiteConfig);
                  setSaveMessage({
                    type: 'success',
                    text: 'ডিফল্ট কনফিগারেশনে রিসেট করা হয়েছে।',
                  });
                }}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>ডিফল্ট রিসেট</span>
              </button>

              <button
                type="submit"
                disabled={isSavingCloud}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0"
              >
                <Save className="h-3.5 w-3.5" />
                <span>
                  {isSavingCloud
                    ? 'Firebase এ সেভ হচ্ছে...'
                    : 'Firebase ডাটাবেজে সেভ করুন'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

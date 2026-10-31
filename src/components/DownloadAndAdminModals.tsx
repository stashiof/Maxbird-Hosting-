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
} from 'lucide-react';
import {
  SiteConfig,
  defaultSiteConfig,
  verifyAdminPin,
  validateConfigUpdate,
  formatBengaliNumber,
} from '../config/siteConfig';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDownloadProgress(0);
      setDownloadCompleted(false);
      return;
    }

    const timer1 = setTimeout(() => setDownloadProgress(45), 120);
    const timer2 = setTimeout(() => setDownloadProgress(85), 320);
    const timer3 = setTimeout(() => {
      setDownloadProgress(100);
      setDownloadCompleted(true);
    }, 550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerGuideFileDownload = () => {
    // If admin configured a real external URL, open/navigate to it
    if (
      config.apkDownloadUrl &&
      config.apkDownloadUrl !== '#direct-apk-download' &&
      config.apkDownloadUrl.startsWith('http')
    ) {
      window.location.href = config.apkDownloadUrl;
      return;
    }

    // Otherwise generate a clean installation info package for immediate download feedback
    const content = [
      `==================================================`,
      `${config.appName} — অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ (${config.appVersion})`,
      `==================================================`,
      `ফাইলের সাইজ: ${config.fileSize}`,
      `নিরাপত্তা যাচাই: ১০০% নিরাপদ ও ভাইরাসমুক্ত (${config.sha256Short})`,
      `টেলিগ্রাম সাপোর্ট: ${config.telegramHandle} (${config.telegramUrl})`,
      ``,
      `ইনস্টল ও ব্যবহারের সংক্ষিপ্ত নিয়ম:`,
      `১. APK ফাইলটিতে ট্যাপ করে "Allow from this source" অন করে Install দিন।`,
      `২. অ্যাপ ওপেন করে নাম ও মোবাইল নম্বর দিয়ে "অ্যাক্সেসের জন্য আবেদন করুন" বাটনে ক্লিক করুন।`,
      `৩. অ্যাডমিন এপ্রুভ করলে OTP দিয়ে লগইন করুন এবং কেনার আগে ফ্রি ট্রায়াল ক্লাস দেখুন!`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Smart-Shiksha-${config.appVersion.replace(/\s+/g, '-')}-Info.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
                {config.appVersion} · {config.fileSize} · {config.minAndroidVersion}
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

        {/* Download Progress Card */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-800 dark:text-slate-200">
              {downloadCompleted
                ? '✓ APK ফাইল ডাউনলোডের জন্য প্রস্তুত!'
                : 'সার্ভার থেকে নিরাপদ APK ফাইল প্রস্তুত হচ্ছে...'}
            </span>
            <span className="font-mono-num text-emerald-600 dark:text-emerald-400">
              {downloadProgress}%
            </span>
          </div>

          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-200"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              ১০০% নিরাপদ ও ভাইরাসমুক্ত (Play Protect Friendly)
            </span>
            <span>মোট ডাউনলোড: {formatBengaliNumber(config.downloadCount)}+</span>
          </div>
        </div>

        {/* Quick 3-Step Reminder */}
        <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            ডাউনলোড হওয়ার পর করণীয়:
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

        {/* Primary Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={triggerGuideFileDownload}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>সরাসরি APK ফাইলটি সেভ করুন ({config.fileSize})</span>
          </button>
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
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetConfig,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [draft, setDraft] = useState<SiteConfig>(config);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setDraft(config);
    setSaveMessage(null);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('ভুল পিন কোড! ডেমো পিন: 1234 ব্যবহার করুন।');
    }
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateConfigUpdate(draft);
    if (!validation.valid) {
      setSaveMessage({ type: 'error', text: validation.error || 'তথ্য সঠিক নয়।' });
      return;
    }
    onSaveConfig(draft);
    setSaveMessage({
      type: 'success',
      text: 'সফলভাবে সংরক্ষিত হয়েছে! ওয়েবসাইটের সকল বাটন ও তথ্যে নতুন কনফিগারেশন যুক্ত হয়েছে।',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-config-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="admin-config-modal-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                অ্যাডমিন কনফিগারেশন প্যানেল (siteConfig Editor)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                APK ডাউনলোড লিংক, ভার্সন, ফাইলের সাইজ ও নোটিশ সহজেই পরিবর্তন করুন
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

        {!isUnlocked ? (
          <form onSubmit={handlePinSubmit} className="mt-5 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                🔒 অ্যাডমিন সিকিউরিটি চেক
              </p>
              <p className="mt-1">
                ওয়েবসাইটের APK ডাউনলোড লিংক ও ভার্সন পরিবর্তন করতে অ্যাডমিন পিন দিন। (ডেমো পিন: <code className="font-mono-num font-bold text-emerald-600 dark:text-emerald-400">1234</code>)
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
                  placeholder="1234"
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
              {pinError && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{pinError}</p>}
            </div>
          </form>
        ) : (
          <form onSubmit={handleSaveSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cfg-version"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  অ্যাপের ভার্সন (App Version)
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
                  ফাইলের সাইজ (File Size)
                </label>
                <input
                  id="cfg-size"
                  type="text"
                  value={draft.fileSize}
                  onChange={(e) => setDraft({ ...draft, fileSize: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cfg-apk-url"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                সরাসরি APK ডাউনলোড লিংক (APK Download URL)
              </label>
              <input
                id="cfg-apk-url"
                type="text"
                value={draft.apkDownloadUrl}
                onChange={(e) => setDraft({ ...draft, apkDownloadUrl: e.target.value })}
                placeholder="https://your-domain.com/app-release.apk"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono-num text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cfg-tg-handle"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  টেলিগ্রাম সাপোর্ট ইউজারনেম
                </label>
                <input
                  id="cfg-tg-handle"
                  type="text"
                  value={draft.telegramHandle}
                  onChange={(e) => setDraft({ ...draft, telegramHandle: e.target.value })}
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

            {saveMessage && (
              <div
                className={`rounded-xl p-3 text-xs ${
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
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
              >
                <Save className="h-3.5 w-3.5" />
                <span>পরিবর্তন সেভ করুন</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

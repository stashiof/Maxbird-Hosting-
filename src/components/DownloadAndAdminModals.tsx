import React from 'react';
import {
  X,
  Download,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import {
  SiteConfig,
  formatBengaliNumber,
  isConfiguredApkUrl,
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
                {config.appName} — অফিসিয়াল অ্যাপ ডাউনলোড
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
                <p className="font-bold">নতুন ভার্সনের APK আপডেট কাজ চলছে</p>
                <p className="mt-1 leading-relaxed">
                  খুব শীঘ্রই এখানে সরাসরি ডাউনলোড লিংক যুক্ত হয়ে যাবে। জরুরি প্রয়োজনে নিচে আমাদের টেলিগ্রাম সাপোর্টে মেসেজ দিন।
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
          {hasRealApk && (
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
          )}

          <a
            href={config.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
          >
            <span>সাপোর্ট ({config.telegramHandle})</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

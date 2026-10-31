import React from 'react';
import { Download, Settings, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ApkInstallGuideProps {
  onTriggerApkDownload: () => void;
  appVersion: string;
  fileSize: string;
}

export const ApkInstallGuide: React.FC<ApkInstallGuideProps> = ({
  onTriggerApkDownload,
  appVersion,
  fileSize,
}) => {
  return (
    <section
      id="apk-install-guide"
      className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50 py-16 md:py-24 dark:border-slate-800/80 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            APK ইনস্টল করার নিয়মাবলী · ৩টি সহজ ধাপে নিরাপদ ইনস্টলেশন
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            ব্রাউজার থেকে APK ডাউনলোড ও ইনস্টল করার নিয়ম
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            অনেকে ব্রাউজার থেকে সরাসরি APK নামানোর পর "Install Unknown Apps" অপশন দেখে ভয় পান। ভয়ের কোনো কারণ নেই—নিচের ৩টি সহজ ধাপ অনুসরণ করলেই খুব সহজে অ্যাপটি আপনার ফোনে ইনস্টল হয়ে যাবে।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  ০১ · প্রথম ধাপ
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Download className="h-5 w-5" />
                </div>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                ১. ডাউনলোড বাটনে ট্যাপ করে ফাইলটি নামান
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                ওয়েবসাইটের ডাউনলোড বাটনে ট্যাপ করুন। যদি ব্রাউজারে "Download anyway" বা "File might be harmful" লেখা আসে (যেকোনো APK ফাইলের ক্ষেত্রেই ব্রাউজার এটি দেখায়), তবে নিশ্চিন্তে <strong>"Download anyway"</strong> তে ট্যাপ করে ফাইলটি নামিয়ে নিন।
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={onTriggerApkDownload}
                className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
              >
                📥 APK ডাউনলোড করুন ({appVersion}{fileSize !== '0 MB' ? ` · ${fileSize}` : ''})
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  ০২ · দ্বিতীয় ধাপ
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Settings className="h-5 w-5" />
                </div>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                ২. "Allow from this source" অন করে Install দিন
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                ডাউনলোড হওয়া ফাইলটিতে ট্যাপ করলে যদি ফোনের ব্রাউজার পারমিশন চায়, তবে সেটিংস থেকে <strong>"Allow from this source"</strong> সুইচটি অন করে দিয়ে <strong>"Install"</strong> বাটনে ক্লিক করুন।
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>মাত্র একবারই এই পারমিশন দিতে হয়</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  ০৩ · তৃতীয় ধাপ
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                ৩. সম্পূর্ণ নিরাপদ ও সুরক্ষিত শিক্ষামূলক অ্যাপ
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                আমাদের অ্যাপটি সম্পূর্ণ নিরাপদ, ভাইরাসমুক্ত এবং Play Protect Friendly। ইনস্টল শেষ হলে <strong>"Open"</strong> বাটনে ক্লিক করে আপনার নাম ও মোবাইল নম্বর দিয়ে এক ক্লিকেই অ্যাক্সেসের আবেদন করুন।
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>১০০% নিরাপদ · ব্যক্তিগত তথ্যের কোনো ঝুঁকি নেই</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

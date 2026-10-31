import React, { useState } from 'react';
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
  const [allowUnknownSource, setAllowUnknownSource] = useState(true);
  const [installSimulated, setInstallSimulated] = useState(false);

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
            অনেকে ব্রাউজার থেকে সরাসরি APK নামানোর পর "Install Unknown Apps" অপশন দেখে ভয় পান। ভয়ের কোনো কারণ নেই—নিচের ৩টি সহজ ধাপ অনুসরণ করলেই ৩০ সেকেন্ডে অ্যাপটি আপনার ফোনে ইনস্টল হয়ে যাবে।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: Download APK File */}
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
                ওয়েবসাইটের ডাউনলোড বাটনে ট্যাপ করুন। যদি ব্রাউজারে "Download anyway" বা "File might be harmful" লেখা আসে (যেকোনো APK ফাইলের ক্ষেত্রেই ক্রোম ব্রাউজার এটি দেখায়), তবে নিশ্চিন্তে <strong>"Download anyway"</strong> তে ট্যাপ করুন।
              </p>

              {/* Visual Android Notification Preview */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-num font-semibold text-slate-800 dark:text-slate-200">
                    smart-shiksha.apk
                  </span>
                  <span className="font-mono-num text-emerald-600 dark:text-emerald-400">
                    {fileSize}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full w-full rounded-full bg-emerald-600" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>ডাউনলোড সম্পন্ন ({appVersion})</span>
                  <button
                    type="button"
                    onClick={onTriggerApkDownload}
                    className="font-bold text-emerald-700 hover:underline dark:text-emerald-400 whitespace-nowrap shrink-0"
                  >
                    Open / ফাইল খুলুন
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onTriggerApkDownload}
                className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
              >
                📥 এখনই APK ফাইলটি নামান
              </button>
            </div>
          </div>

          {/* Card 2: Allow from this source & Install */}
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

              {/* Interactive Android Permission Simulator */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Allow from this source
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Chrome / Browser Permission
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={allowUnknownSource}
                    aria-label="Allow from this source সুইচ"
                    onClick={() => setAllowUnknownSource(!allowUnknownSource)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                      allowUnknownSource ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        allowUnknownSource ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-200/80 pt-2.5 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {allowUnknownSource ? 'পারমিশন অন আছে' : 'সুইচটি অন করুন'}
                  </span>
                  <button
                    type="button"
                    disabled={!allowUnknownSource}
                    onClick={() => setInstallSimulated(true)}
                    className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    {installSimulated ? '✓ Installed' : 'Install (ইনস্টল)'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                মাত্র একবারই এই পারমিশন দিতে হয়, পরবর্তীতে আর লাগবে না।
              </p>
            </div>
          </div>

          {/* Card 3: 100% Safe & Protected */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
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
                আমাদের অ্যাপটি সম্পূর্ণ নিরাপদ, ভাইরাসমুক্ত এবং Play Protect Friendly। এটি শুধুমাত্র ভিডিও ক্লাস, পিডিএফ নোট এবং পরীক্ষার জন্য তৈরি—ফোনের কোনো ব্যক্তিগত তথ্যের অ্যাক্সেস নেয় না।
              </p>

              {/* Play Protect Verified Card */}
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 dark:border-emerald-800/60 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Play Protect Friendly · কোনো ক্ষতিকর কোড নেই</span>
                </div>
                <p className="mt-1.5 text-xs text-emerald-800 dark:text-emerald-300">
                  ইনস্টল শেষ হলে "Open" বাটনে ক্লিক করে আপনার নাম ও মোবাইল নম্বর দিয়ে এক ক্লিকেই পড়াশোনা শুরু করুন।
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                ✓ ১৪,০০০+ শিক্ষার্থীর ফোনে সফলভাবে ব্যবহৃত হচ্ছে
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

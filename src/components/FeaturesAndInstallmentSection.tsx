import React from 'react';
import {
  Gift,
  CreditCard,
  Clapperboard,
  DownloadCloud,
  Map,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { PhoneScreenTab } from './MobileAppMockup';

interface FeaturesAndInstallmentSectionProps {
  onTriggerApkDownload: () => void;
  onJumpToHeroPhoneTab: (tab: PhoneScreenTab) => void;
}

export const FeaturesAndInstallmentSection: React.FC<FeaturesAndInstallmentSectionProps> = ({
  onTriggerApkDownload,
  onJumpToHeroPhoneTab,
}) => {
  return (
    <div className="space-y-0">
      {/* SECTION 1: PREMIUM FEATURES BENTO GRID */}
      <section
        id="features"
        className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50 py-16 md:py-24 dark:border-slate-800/80 dark:bg-slate-950"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              কোর্স ও প্রিমিয়াম সুবিধাসমূহ · আধুনিক এডুকেশনাল অ্যাপ
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              আমাদের অ্যাপের প্রিমিয়াম সুবিধাসমূহ
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              সাধারণ শিক্ষার্থীদের সাধ্যের মধ্যে সেরা মানের ক্লাস, নোট এবং পরীক্ষা নিশ্চিত করতে আমাদের অ্যাপে যুক্ত করা হয়েছে আধুনিক সব ফিচার।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12">
            {/* Feature 1: Free Trial */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 md:col-span-6 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    01 · ঝুঁকিমুক্ত যাচাই সুবিধা
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <Gift className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  🎁 কেনার আগে ফ্রি ট্রায়াল সুবিধা
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  আগে ক্লাস দেখুন, ভালো লাগলে ভর্তি হোন। যেকোনো কোর্সে এক্সেস রিকোয়েস্ট পাঠালে অ্যাডমিন আপনাকে ফ্রি ট্রায়াল অনুমোদন করবেন। আপনি ভিডিও কোয়ালিটি, শিক্ষকের বোঝানোর ধরন এবং স্মার্ট নোটস সম্পূর্ণ ফ্রিতে দেখে সিদ্ধান্ত নিতে পারবেন।
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  কেনার আগেই ফ্রি ক্লাস করে যাচাই করুন
                </span>
                <button
                  type="button"
                  onClick={() => onJumpToHeroPhoneTab('courses')}
                  className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400 whitespace-nowrap shrink-0"
                >
                  অ্যাপ প্রিভিউ দেখুন →
                </button>
              </div>
            </div>

            {/* Feature 2: Installment Payment */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 md:col-span-6 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    02 · সাশ্রয়ী পেমেন্ট সিস্টেম
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  💳 সহজ কিস্তিতে (Installment) পেমেন্ট
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  একসাথে পুরো টাকা না থাকলে ২ বা ৩ কিস্তিতে কোর্স ফি পরিশোধের সুবিধা এবং অ্যাপের ভেতরেই কিস্তির হিসাব ও বাকি সময় দেখার ট্র্যাকার। বিকাশ (bKash) বা নগদ (Nagad) দিয়ে ১ম কিস্তি পরিশোধ করেই ক্লাস শুরু করতে পারবেন।
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  বিকাশ ও নগদে এককালীন বা ২/৩ কিস্তি সুবিধা
                </span>
                <a
                  href="#installment-trial"
                  className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400 whitespace-nowrap shrink-0"
                >
                  বিস্তারিত নিয়ম দেখুন ↓
                </a>
              </div>
            </div>

            {/* Feature 3: HD Classes */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 md:col-span-4 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    03 · স্মুথ স্ট্রিমিং
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    <Clapperboard className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  🎬 HD রেকর্ডেড ও লাইভ ক্লাস
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  বাফারিং ছাড়া স্মুথ ভিডিও প্লেয়ার ও প্রগ্রেস ট্র্যাকিং। কম ইন্টারনেট স্পিডেও পরিষ্কার বোর্ড ও লেখা দেখা যায় এবং ক্লাসের স্পিড বাড়িয়ে-কমিয়ে দেখার সুবিধা রয়েছে।
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onJumpToHeroPhoneTab('player')}
                  className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400 whitespace-nowrap shrink-0"
                >
                  প্লেয়ার ইউআই দেখুন →
                </button>
              </div>
            </div>

            {/* Feature 4: Offline Download */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 md:col-span-4 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    04 · ইন্টারনেট ছাড়াই পড়াশোনা
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    <DownloadCloud className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  📥 অফলাইন ডাউনলোড সুবিধা
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  ইন্টারনেট বা এমবি না থাকলেও অ্যাপের ভেতরে ভিডিও ও লেকচার নোট ডাউনলোড করে পরে দেখার সুবিধা। একবার ডাউনলোড করলে বারবার এমবি খরচ হবে না।
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ভিডিও ও PDF উভয়ই অফলাইনে সেভ থাকে
                </span>
              </div>
            </div>

            {/* Feature 5: Quest Map */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 md:col-span-4 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    05 · গেমিফাইড লার্নিং
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    <Map className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  🗺️ কুয়েস্ট ম্যাপ ও অ্যানিমেটেড লেসন
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  অধ্যায়ভিত্তিক কুয়েস্ট ম্যাপ, মডেল টেস্ট এবং পিডিএফ স্মার্ট নোটস। প্রতিটি লেসন শেষে কুইজ দিয়ে পরবর্তী অধ্যায় আনলক করার আনন্দদায়ক ব্যবস্থা।
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onJumpToHeroPhoneTab('quest')}
                  className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400 whitespace-nowrap shrink-0"
                >
                  কুয়েস্ট ম্যাপ প্রিভিউ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CLEAN FREE TRIAL & INSTALLMENT GUIDELINE */}
      <section
        id="installment-trial"
        className="scroll-mt-20 border-t border-slate-200/80 bg-white py-16 md:py-24 dark:border-slate-800/80 dark:bg-slate-900/50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              কিস্তি ও ফ্রি ট্রায়াল গাইডলাইন · সহজ ও স্বচ্ছ প্রক্রিয়া
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              কীভাবে ফ্রি ট্রায়াল নেবেন এবং এককালীন বা কিস্তিতে ভর্তি হবেন?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              আমাদের অ্যান্ড্রয়েড অ্যাপের ভেতরেই কোর্স যাচাই এবং কিস্তিতে ফি পরিশোধের সম্পূর্ণ ব্যবস্থা অত্যন্ত সহজভাবে দেওয়া আছে:
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                ০১ · ফ্রি ট্রায়াল অনুমোদন
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                কেনার আগেই ক্লাস দেখে যাচাই করুন
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                অ্যাপে লগইন করে আপনার পছন্দের কোর্সের নিচে <strong>"কোর্সে এক্সেস পান"</strong> বাটনে ক্লিক করে কনফার্ম করুন। অ্যাডমিন অনুমোদন করলেই আপনি <strong>"🎁 ফ্রি ট্রায়াল শুরু করুন"</strong> বাটন পাবেন এবং কোনো টাকা ছাড়াই ক্লাস করে দেখতে পারবেন।
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>ভিডিও লেকচার, নোট ও কুয়েস্ট ম্যাপ যাচাইয়ের সুযোগ</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                ০২ · এককালীন বা ২/৩ কিস্তিতে পেমেন্ট
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                বিকাশ (bKash) বা নগদে (Nagad) সহজ কিস্তি
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                ফ্রি ট্রায়াল শেষে আপনি চাইলে এককালীন পুরো ফি দিতে পারেন, অথবা একসাথে পুরো টাকা না থাকলে <strong>২ বা ৩ কিস্তিতে (Installments)</strong> পেমেন্ট করতে পারেন। বিকাশ বা নগদে পেমেন্ট করে শুধু <strong>TrxID</strong> অ্যাপে জমা দিলেই কোর্স আনলক হয়ে যাবে।
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>১ম কিস্তি পরিশোধ করেই সম্পূর্ণ ক্লাস শুরু করা যায়</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                ০৩ · ইন-অ্যাপ কিস্তি ট্র্যাকার
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                অ্যাপের ভেতরেই কিস্তির হিসাব ও সময় দেখা
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                কিস্তিতে ভর্তি হলে আপনাকে আলাদাভাবে তারিখ মনে রাখতে হবে না। অ্যাপের কোর্স কার্ডেই আপনার পরিশোধিত টাকা, অবশিষ্ট বকেয়া এবং পরবর্তী কিস্তি দেওয়ার শেষ তারিখ পরিষ্কারভাবে দেখা যাবে।
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>কোনো লুকানো চার্জ বা অতিরিক্ত ফি নেই</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 dark:border-emerald-800/60 dark:bg-emerald-950/20">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                এখনই অ্যাপটি ফোনে ইনস্টল করে ফ্রি ট্রায়াল শুরু করুন
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                অফিসিয়াল অ্যান্ড্রয়েড অ্যাপটি ডাউনলোড করে এক ক্লিকে ডিভাইস অ্যাক্সেসের আবেদন করুন।
              </p>
            </div>
            <button
              type="button"
              onClick={onTriggerApkDownload}
              className="rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
            >
              📥 অফিসিয়াল অ্যাপ ডাউনলোড করুন (APK)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

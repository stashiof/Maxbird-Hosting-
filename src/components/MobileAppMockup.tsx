import React from 'react';
import {
  Download,
  Play,
  CheckCircle2,
  Lock,
  ShieldCheck,
  FileText,
  Smartphone,
  Sparkles,
  Check,
  MapPin,
  Volume2,
  WifiOff,
  CreditCard,
} from 'lucide-react';

export type PhoneScreenTab = 'courses' | 'player' | 'quest' | 'access';

interface MobileAppMockupProps {
  activeTab: PhoneScreenTab;
  onTabChange: (tab: PhoneScreenTab) => void;
  onTriggerApkDownload: () => void;
  appName: string;
  appVersion: string;
}

export const MobileAppMockup: React.FC<MobileAppMockupProps> = ({
  activeTab,
  onTabChange,
  onTriggerApkDownload,
  appName,
  appVersion,
}) => {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* App Screen Preview Switcher */}
      <div className="mb-3 flex items-center justify-between gap-1 rounded-xl border border-slate-200/80 bg-white/90 p-1.5 shadow-xs backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <button
          type="button"
          onClick={() => onTabChange('courses')}
          className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'courses'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          কোর্স ও ট্রায়াল
        </button>
        <button
          type="button"
          onClick={() => onTabChange('player')}
          className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'player'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          ভিডিও ক্লাস
        </button>
        <button
          type="button"
          onClick={() => onTabChange('quest')}
          className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'quest'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          কুয়েস্ট ম্যাপ
        </button>
        <button
          type="button"
          onClick={() => onTabChange('access')}
          className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'access'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          ডিভাইস অ্যাক্সেস
        </button>
      </div>

      {/* Android Frame */}
      <div className="relative overflow-hidden rounded-[32px] border-[6px] border-slate-900 bg-slate-950 shadow-2xl dark:border-slate-800">
        {/* Android Status Bar */}
        <div className="flex items-center justify-between bg-slate-900 px-5 py-2 text-[11px] text-slate-300">
          <span className="font-mono-num font-medium">Android App UI</span>
          <div className="h-2.5 w-16 rounded-full bg-slate-950" aria-hidden="true" />
          <span className="font-mono-num text-[10px] text-emerald-400">
            {appVersion.split(' ')[0]}
          </span>
        </div>

        {/* In-App Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 py-3 text-white">
          <div>
            <p className="text-xs font-semibold tracking-tight text-emerald-400">
              {appName}
            </p>
            <p className="text-[11px] text-slate-400">
              অ্যাপের ভেতরের ইন্টারফেস প্রিভিউ
            </p>
          </div>
          <button
            type="button"
            onClick={onTriggerApkDownload}
            className="rounded-lg bg-emerald-600/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-600/30 transition-colors whitespace-nowrap shrink-0"
          >
            APK নামান
          </button>
        </div>

        {/* Phone Body Content Area */}
        <div className="min-h-[410px] bg-slate-950 p-4 text-slate-100">
          {/* SCREEN 1: COURSES & FREE TRIAL */}
          {activeTab === 'courses' && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5">
                <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>অ্যাকাডেমিক ও স্কিল কোর্স</span>
                  <span>·</span>
                  <span className="text-amber-400 font-medium">
                    🎁 ফ্রি ট্রায়াল সুবিধা
                  </span>
                </div>

                <h3 className="text-sm font-bold leading-snug text-white">
                  পছন্দের কোর্সে এক্সেস ও ফ্রি ট্রায়াল কার্ড
                </h3>

                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  অ্যাপের ভেতরে প্রতিটি কোর্সের ব্যানার, ক্লাসের সংখ্যা, ফ্রি ট্রায়াল অপশন এবং কিস্তির প্ল্যান এভাবে সাজানো থাকে।
                </p>

                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/80 p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">পেমেন্ট অপশন:</span>
                    <span className="font-bold text-white">
                      এককালীন অথবা ২/৩ কিস্তি (Installment)
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400">
                    ✓ কেনার আগেই ফ্রিতে ক্লাস দেখে যাচাই করার সুবিধা
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onTabChange('player')}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>🎁 ফ্রি ট্রায়াল শুরু করুন</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onTabChange('quest')}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>কুয়েস্ট ম্যাপ</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                    কিস্তি ও পেমেন্ট ট্র্যাকার
                  </span>
                  <span className="text-[11px] text-emerald-400">bKash / Nagad</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  কিস্তিতে ভর্তি হলে পরিশোধিত টাকা, বকেয়া এবং পরবর্তী কিস্তির তারিখ অ্যাপের কোর্স কার্ডেই দেখা যাবে।
                </p>
              </div>
            </div>
          )}

          {/* SCREEN 2: HD VIDEO PLAYER */}
          {activeTab === 'player' && (
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-4">
                <div className="flex items-center justify-between text-[11px] text-emerald-300">
                  <span>🎬 এইচডি ভিডিও প্লেয়ার ইউআই</span>
                  <span className="font-mono-num">1080p HD</span>
                </div>

                <div className="my-5 flex flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                  <p className="mt-2.5 text-xs font-semibold text-white">
                    বাফারিং ছাড়া স্মুথ রেকর্ডেড ও লাইভ ক্লাস
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    স্পিড কন্ট্রোল · প্রগ্রেস ট্র্যাকিং · অফলাইন সেভ
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-2/3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>স্মুথ স্ট্রিমিং</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Volume2 className="h-3 w-3" /> পরিষ্কার অডিও ও ভিজ্যুয়াল
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3 py-2.5 text-xs font-medium text-emerald-300">
                  <WifiOff className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>অফলাইন ডাউনলোড</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs font-medium text-slate-300">
                  <FileText className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>পিডিএফ স্মার্ট নোটস</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300 leading-relaxed">
                ইন্টারনেট বা এমবি না থাকলেও অ্যাপের ভেতরে ভিডিও ও লেকচার নোট ডাউনলোড করে পরবর্তীতে অফলাইনে দেখা যাবে।
              </div>
            </div>
          )}

          {/* SCREEN 3: QUEST MAP */}
          {activeTab === 'quest' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">🗺️ অধ্যায়ভিত্তিক কুয়েস্ট ম্যাপ</span>
                  <span className="text-[11px] text-amber-400">ধাপে ধাপে অগ্রগতি</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  প্রতিটি লেসন ও মডেল টেস্ট শেষ করে পরবর্তী অধ্যায় আনলক করার গেমিফাইড ম্যাপ।
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">প্রথম ধাপ: ফ্রি ট্রায়াল লেসন ও নোটস</p>
                    <p className="text-[11px] text-slate-400">কেনার আগেই ক্লাস দেখে মান যাচাই</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/40 bg-amber-950/20 p-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
                    ২
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">দ্বিতীয় ধাপ: অধ্যায়ভিত্তিক কুইজ ও মডেল টেস্ট</p>
                    <p className="text-[11px] text-slate-400">নিজের প্রস্তুতি যাচাই ও লিডারবোর্ড</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">তৃতীয় ধাপ: পূর্ণাঙ্গ কোর্স আনলক</p>
                    <p className="text-[11px] text-slate-400">এককালীন বা সহজ কিস্তিতে ভর্তির পর উন্মুক্ত</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: ONE-CLICK DEVICE ACCESS */}
          {activeTab === 'access' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>এক ক্লিকে ডিভাইস অ্যাক্সেস আবেদন</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                  কোনো কোড কপি-পেস্টের ঝামেলা নেই! অ্যাপ ওপেন করে আপনার নাম ও মোবাইল নম্বর দিয়ে বাটনে ক্লিক করলেই অ্যাডমিনের কাছে রিকোয়েস্ট চলে যাবে।
                </p>
              </div>

              <div className="space-y-2.5 rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
                <div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                  <span className="block text-[10px] text-slate-400">১. আপনার নাম</span>
                  <span className="text-xs font-medium text-slate-200">আপনার পূর্ণ নাম লিখবেন</span>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                  <span className="block text-[10px] text-slate-400">২. মোবাইল নম্বর</span>
                  <span className="text-xs font-medium text-slate-200">আপনার ১১ সংখ্যার মোবাইল নম্বর দিবেন</span>
                </div>

                <div className="w-full rounded-xl bg-emerald-600 px-3 py-2 text-center text-xs font-semibold text-white">
                  অ্যাক্সেসের জন্য আবেদন করুন
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-[11px] text-slate-300 leading-relaxed">
                🛡️ ১০০% নিরাপদ: এটি শুধুমাত্র অ্যাপের নিরাপত্তার জন্য, আপনার ফোনের কোনো ব্যক্তিগত তথ্যের ক্ষতি করবে না।
              </div>
            </div>
          )}
        </div>

        {/* Bottom Android Bar */}
        <div className="flex items-center justify-around border-t border-slate-800 bg-slate-900 px-3 py-2 text-[11px] text-slate-400">
          <button
            type="button"
            onClick={() => onTabChange('courses')}
            className={`flex items-center gap-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'courses' ? 'text-emerald-400' : 'hover:text-slate-200'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>কোর্স</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('player')}
            className={`flex items-center gap-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'player' ? 'text-emerald-400' : 'hover:text-slate-200'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>ভিডিও প্লেয়ার</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('access')}
            className={`flex items-center gap-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'access' ? 'text-emerald-400' : 'hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>অ্যাক্সেস</span>
          </button>
        </div>
      </div>
    </div>
  );
};

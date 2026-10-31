import React, { useState } from 'react';
import {
  Download,
  ShieldCheck,
  KeyRound,
  BookOpenCheck,
  Gift,
  CreditCard,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { usageSteps, UsageStep } from '../config/siteConfig';
import { PhoneScreenTab } from './MobileAppMockup';

interface StepByStepGuideProps {
  onTriggerApkDownload: () => void;
  onJumpToHeroPhoneTab: (tab: PhoneScreenTab) => void;
  onJumpToInstallmentSection: () => void;
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({
  onTriggerApkDownload,
  onJumpToHeroPhoneTab,
  onJumpToInstallmentSection,
}) => {
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(1); // Default highlight Step 2 (One-Click Access)
  const [otpDemoInput, setOtpDemoInput] = useState('4829');
  const [otpVerified, setOtpVerified] = useState(true);
  const [trxDemoInput, setTrxDemoInput] = useState('BKS948271X');
  const [trxSubmitted, setTrxSubmitted] = useState(false);

  const currentStep: UsageStep = usageSteps[selectedStepIdx] || usageSteps[0];

  const getStepIcon = (key: UsageStep['screenStateKey']) => {
    switch (key) {
      case 'download':
        return <Download className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'device_access':
        return <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'otp_login':
        return <KeyRound className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'course_request':
        return <BookOpenCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'free_trial':
        return <Gift className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'installment_pay':
        return <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const handleStepPrimaryAction = (step: UsageStep) => {
    if (step.screenStateKey === 'download') {
      onTriggerApkDownload();
    } else if (step.screenStateKey === 'device_access') {
      onJumpToHeroPhoneTab('access');
    } else if (step.screenStateKey === 'free_trial') {
      onJumpToHeroPhoneTab('player');
    } else if (step.screenStateKey === 'installment_pay') {
      onJumpToInstallmentSection();
    } else {
      onJumpToHeroPhoneTab('courses');
    }
  };

  return (
    <section
      id="usage-guide"
      className="scroll-mt-20 border-t border-slate-200/80 bg-white py-16 md:py-24 dark:border-slate-800/80 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            ধাপে ধাপে ভিজ্যুয়াল গাইড · নতুন শিক্ষার্থীদের জন্য সহজ নির্দেশনা
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            অ্যাপটি কীভাবে ব্যবহার করবেন? (৬টি সহজ ধাপে সম্পূর্ণ নিয়ম)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            নতুন ব্যবহারকারীরা যেন একটুও বিভ্রান্ত না হন, সেজন্য নিচের ৬টি ধাপে ডাউনলোড থেকে শুরু করে ডিভাইস অ্যাক্সেস, ফ্রি ট্রায়াল এবং কিস্তিতে কোর্স আনলক করার সম্পূর্ণ প্রক্রিয়াটি চিত্র ও কার্ডসহ তুলে ধরা হলো। যেকোনো ধাপে ক্লিক করে তার লাইভ প্রিভিউ দেখুন।
          </p>
        </div>

        {/* 6-Step Grid + Interactive Step Visualizer */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left 7 Columns: 6 Step Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {usageSteps.map((step, index) => {
              const isSelected = selectedStepIdx === index;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setSelectedStepIdx(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedStepIdx(index);
                    }
                  }}
                  className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm dark:border-emerald-500 dark:bg-emerald-950/20'
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {step.stepNumber}. {step.bengaliNumber}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
                        {getStepIcon(step.screenStateKey)}
                      </div>
                    </div>

                    <h3 className="mt-3 text-base font-bold leading-snug text-slate-900 dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {step.description}
                    </p>

                    {step.safetyNote && (
                      <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-100/60 p-2.5 text-xs font-medium leading-relaxed text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-200">
                        🛡️ {step.safetyNote}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {isSelected ? 'ডান পাশে স্ক্রিন প্রিভিউ দেখুন' : 'স্ক্রিন প্রিভিউ দেখতে ট্যাপ করুন'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-0.5 dark:text-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 5 Columns: Sticky Interactive Visual Walkthrough Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    ভিজ্যুয়াল গাইড প্রিভিউ · {currentStep.bengaliNumber}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {currentStep.title}
                  </h3>
                </div>
                <span className="font-mono-num text-sm font-bold text-slate-400">
                  {currentStep.stepNumber} / 06
                </span>
              </div>

              {/* Dynamic Interactive Screen Simulation based on selected step */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                {currentStep.screenStateKey === 'download' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                        <Download className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ (APK)
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          ভার্সন v2.5.0 · Play Protect Friendly · সরাসরি ডাউনলোড
                        </p>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      নিচের বাটনে ক্লিক করলেই সরাসরি আপনার ফোনে `.apk` ফাইলটি ডাউনলোড শুরু হবে। এরপর ফাইলটিতে ট্যাপ করে সাধারণ নিয়মে ইনস্টল করে নিন।
                    </p>
                    <button
                      type="button"
                      onClick={onTriggerApkDownload}
                      className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                    >
                      📥 অফিসিয়াল অ্যাপ ডাউনলোড করুন (APK)
                    </button>
                  </div>
                )}

                {currentStep.screenStateKey === 'device_access' && (
                  <div className="space-y-3.5">
                    <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                      <p className="font-bold">কোনো ডিভাইস কোড কপি-পেস্টের ঝামেলা নেই!</p>
                      <p className="mt-1">
                        শুধু আপনার নাম ও মোবাইল নম্বর লিখে নিচের বাটনে চাপ দিন। সাথে সাথে অ্যাডমিনের কাছে রিকোয়েস্ট চলে যাবে।
                      </p>
                    </div>
                    <div className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">শিক্ষার্থীর নাম:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">সাদিয়া ইসলাম</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">মোবাইল নম্বর:</span>
                        <span className="font-mono-num font-semibold text-slate-900 dark:text-white">01819-XXXXXX</span>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => onJumpToHeroPhoneTab('access')}
                          className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                        >
                          অ্যাক্সেসের জন্য আবেদন করুন (লাইভ ডেমো দেখুন)
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ✓ ১০০% নিরাপদ: এটি শুধুমাত্র অ্যাপের নিরাপত্তার জন্য, ফোনের কোনো ব্যক্তিগত তথ্যের ক্ষতি করবে না।
                    </p>
                  </div>
                )}

                {currentStep.screenStateKey === 'otp_login' && (
                  <div className="space-y-3.5">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      মোবাইল নম্বর ও ৪ সংখ্যার OTP দিয়ে একাউন্ট খোলার নমুনা:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800">
                        <span className="text-slate-400 block text-[11px]">শ্রেণি / ব্যাচ</span>
                        <span className="font-semibold text-slate-900 dark:text-white">HSC ২৫/২৬ বিজ্ঞান</span>
                      </div>
                      <div className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800">
                        <span className="text-slate-400 block text-[11px]">৪ সংখ্যার OTP</span>
                        <input
                          type="text"
                          maxLength={4}
                          aria-label="৪ সংখ্যার ওটিপি কোড"
                          value={otpDemoInput}
                          onChange={(e) => {
                            setOtpDemoInput(e.target.value);
                            setOtpVerified(false);
                          }}
                          className="w-full bg-transparent font-mono-num font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpVerified(true)}
                      className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                    >
                      OTP বসিয়ে একাউন্ট কনফার্ম করুন
                    </button>
                    {otpVerified && (
                      <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>OTP ({otpDemoInput}) সফলভাবে যাচাই হয়েছে! আপনার একাউন্ট প্রস্তুত।</span>
                      </p>
                    )}
                  </div>
                )}

                {currentStep.screenStateKey === 'course_request' && (
                  <div className="space-y-3.5">
                    <div className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        এইচএসসি বিজ্ঞান — পূর্ণাঙ্গ একাডেমিক কোর্স
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        কোর্স ব্যানারের নিচে প্রথমে "কোর্সে এক্সেস পান" এবং পপ-আপে "হ্যাঁ, আমি এক্সেস নিতে চাই" বাটনে ট্যাপ করুন।
                      </p>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => onJumpToHeroPhoneTab('courses')}
                          className="flex-1 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0"
                        >
                          ১. কোর্সে এক্সেস পান
                        </button>
                        <button
                          type="button"
                          onClick={() => onJumpToHeroPhoneTab('courses')}
                          className="flex-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                        >
                          ২. হ্যাঁ, আমি এক্সেস নিতে চাই
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep.screenStateKey === 'free_trial' && (
                  <div className="space-y-3.5">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 dark:border-emerald-800/60 dark:bg-emerald-950/30">
                      <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        🎁 কেনার আগেই ফ্রি ট্রায়াল ক্লাস করে যাচাই করুন!
                      </p>
                      <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                        অ্যাডমিন এক্সেস অনুমোদন করলেই আপনি কোর্সের নির্ধারিত মূল্য, কিস্তির প্ল্যান এবং "🎁 ফ্রি ট্রায়াল শুরু করুন" অপশন দেখতে পাবেন।
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onJumpToHeroPhoneTab('player')}
                      className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                    >
                      🎁 ফ্রি ট্রায়াল শুরু করুন (ভিডিও প্লেয়ার দেখুন)
                    </button>
                  </div>
                )}

                {currentStep.screenStateKey === 'installment_pay' && (
                  <div className="space-y-3.5">
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      বিকাশ (bKash) বা নগদ (Nagad) এ এককালীন অথবা ২/৩ কিস্তিতে ফি পাঠিয়ে নিচের মতো TrxID জমা দিন:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        aria-label="বিকাশ বা নগদ ট্রানজেকশন আইডি"
                        value={trxDemoInput}
                        onChange={(e) => {
                          setTrxDemoInput(e.target.value);
                          setTrxSubmitted(false);
                        }}
                        placeholder="TrxID লিখুন"
                        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono-num text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setTrxSubmitted(true)}
                        className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                      >
                        TrxID জমা দিন
                      </button>
                    </div>
                    {trxSubmitted && (
                      <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        ✓ আপনার TrxID ({trxDemoInput}) জমা হয়েছে! অ্যাডমিন এপ্রুভ করলেই কোর্স আনলক হয়ে যাবে।
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={onJumpToInstallmentSection}
                      className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
                    >
                      নিচে কিস্তির হিসাব ও ক্যালকুলেটর দেখুন →
                    </button>
                  </div>
                )}
              </div>

              {/* Step Quick Navigation Footer */}
              <div className="mt-4 flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={selectedStepIdx === 0}
                  onClick={() => setSelectedStepIdx((prev) => Math.max(0, prev - 1))}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  ← আগের ধাপ
                </button>
                <button
                  type="button"
                  onClick={() => handleStepPrimaryAction(currentStep)}
                  className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400 whitespace-nowrap shrink-0"
                >
                  {currentStep.actionButtonText}
                </button>
                <button
                  type="button"
                  disabled={selectedStepIdx === usageSteps.length - 1}
                  onClick={() =>
                    setSelectedStepIdx((prev) => Math.min(usageSteps.length - 1, prev + 1))
                  }
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  পরের ধাপ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

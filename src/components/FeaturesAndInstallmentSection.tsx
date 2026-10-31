import React, { useState } from 'react';
import {
  Gift,
  CreditCard,
  Clapperboard,
  DownloadCloud,
  Map,
  CheckCircle2,
  Sparkles,
  Calculator,
} from 'lucide-react';
import {
  sampleCourses,
  calculateInstallmentPlan,
  formatBengaliNumber,
} from '../config/siteConfig';
import { PhoneScreenTab } from './MobileAppMockup';

interface FeaturesAndInstallmentSectionProps {
  onTriggerApkDownload: () => void;
  onJumpToHeroPhoneTab: (tab: PhoneScreenTab) => void;
}

export const FeaturesAndInstallmentSection: React.FC<FeaturesAndInstallmentSectionProps> = ({
  onTriggerApkDownload,
  onJumpToHeroPhoneTab,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(sampleCourses[0].id);
  const [installmentCount, setInstallmentCount] = useState<1 | 2 | 3>(3);
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [trxInput, setTrxInput] = useState('');
  const [trxFeedback, setTrxFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const selectedCourse =
    sampleCourses.find((c) => c.id === selectedCourseId) || sampleCourses[0];
  const plan = calculateInstallmentPlan(selectedCourse.fullPrice, installmentCount);

  const handleSimulateTrxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trxInput.trim().length < 6) {
      setTrxFeedback({
        type: 'error',
        message: 'অনুগ্রহ করে কমপক্ষে ৬ অক্ষরের সঠিক বিকাশ/নগদ TrxID লিখুন (যেমন: BKS948271)।',
      });
      return;
    }
    setTrxFeedback({
      type: 'success',
      message: `${paymentMethod} TrxID (${trxInput.trim().toUpperCase()}) সফলভাবে যাচাইয়ের জন্য গৃহীত হয়েছে! অ্যাপের ভেতরে এভাবে জমা দিলেই অ্যাডমিন আপনার কোর্স আনলক করে দেবেন।`,
    });
  };

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
              কোর্স ও প্রিমিয়াম সুবিধাসমূহ · আধুনিক এডটেক অভিজ্ঞতা
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              আমাদের অ্যাপের প্রিমিয়াম সুবিধাসমূহ
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              সাধারণ শিক্ষার্থীদের সাধ্যের মধ্যে সেরা মানের ক্লাস, নোট এবং পরীক্ষা নিশ্চিত করতে আমাদের অ্যাপে যুক্ত করা হয়েছে আধুনিক সব ফিচার।
            </p>
          </div>

          {/* Asymmetric Bento Grid (5 Core Features) */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12">
            {/* Feature 1: Free Trial (col-span-6) */}
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
                  সব কোর্সে ৩ দিনের ফ্রি ট্রায়াল উন্মুক্ত
                </span>
                <button
                  type="button"
                  onClick={() => onJumpToHeroPhoneTab('courses')}
                  className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400 whitespace-nowrap shrink-0"
                >
                  ফ্রি ট্রায়াল ডেমো দেখুন →
                </button>
              </div>
            </div>

            {/* Feature 2: Easy Installment Payment (col-span-6) */}
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
                  কোনো অতিরিক্ত চার্জ বা লুকানো ফি নেই
                </span>
                <a
                  href="#installment-trial"
                  className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400 whitespace-nowrap shrink-0"
                >
                  কিস্তির হিসাব দেখুন ↓
                </a>
              </div>
            </div>

            {/* Feature 3: HD Recorded & Live Classes (col-span-4) */}
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
                  প্লেয়ার প্রিভিউ দেখুন →
                </button>
              </div>
            </div>

            {/* Feature 4: Offline Download (col-span-4) */}
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

            {/* Feature 5: Quest Map & Animated Lessons (col-span-4) */}
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
                  কুয়েস্ট ম্যাপ দেখুন →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE INSTALLMENT & FREE TRIAL CALCULATOR */}
      <section
        id="installment-trial"
        className="scroll-mt-20 border-t border-slate-200/80 bg-white py-16 md:py-24 dark:border-slate-800/80 dark:bg-slate-900/50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              কিস্তি ও ফ্রি ট্রায়াল প্ল্যানার · স্বচ্ছ পেমেন্ট গাইডলাইন
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              কীভাবে ফ্রি ট্রায়াল নেবেন এবং এককালীন বা কিস্তিতে ভর্তি হবেন?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              নিচের যেকোনো একটি কোর্স সিলেক্ট করে দেখুন আপনার ১, ২ বা ৩ কিস্তিতে কত টাকা পড়বে এবং অ্যাপের ভেতরে কীভাবে বিকাশ বা নগদ TrxID দিয়ে কোর্স আনলক করবেন।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left 6 Columns: Course Selection & Installment Breakdown */}
            <div className="space-y-6 lg:col-span-7">
              {/* Step A: Select Course */}
              <div>
                <p className="mb-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                  ১. আপনার পছন্দের কোর্স নির্বাচন করুন:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {sampleCourses.map((course) => {
                    const isSelected = course.id === selectedCourse.id;
                    return (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          setTrxFeedback(null);
                        }}
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/60 dark:border-emerald-500 dark:bg-emerald-950/30'
                            : 'border-slate-200 bg-slate-50/70 hover:bg-white dark:border-slate-800 dark:bg-slate-900'
                        }`}
                      >
                        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {course.classLevel}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                          {course.title}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          পূর্ণ ফি: ৳{formatBengaliNumber(course.fullPrice)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step B: Select Installment Count (Segmented Control) */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    ২. আপনার সুবিধামতো পেমেন্ট প্ল্যান বেছে নিন:
                  </p>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    🎁 ভর্তি হওয়ার আগে {formatBengaliNumber(selectedCourse.trialDays)} দিনের ফ্রি ট্রায়াল ফ্রি!
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-1.5 dark:border-slate-800 dark:bg-slate-900">
                  {([1, 2, 3] as const).map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setInstallmentCount(count)}
                      className={`rounded-xl px-3 py-2.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        installmentCount === count
                          ? 'bg-white text-slate-900 shadow-xs dark:bg-emerald-600 dark:text-white'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {count === 1
                        ? 'এককালীন পেমেন্ট'
                        : count === 2
                        ? '২ কিস্তিতে পরিশোধ'
                        : '৩ কিস্তিতে পরিশোধ'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step C: Calculated Installment Schedule Table */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/90">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      নির্বাচিত কোর্স · {selectedCourse.classLevel}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {selectedCourse.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">
                      এখন ১ম পেমেন্ট দিয়ে শুরু করুন
                    </span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      ৳{formatBengaliNumber(plan.firstPaymentNow)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {plan.schedule.map((item) => (
                    <div
                      key={item.installmentNo}
                      className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                    >
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.dueTimeline}</p>
                      </div>
                      <span className="text-base font-bold text-slate-900 dark:text-white">
                        ৳{formatBengaliNumber(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span>মোট কোর্স ফি: ৳{formatBengaliNumber(plan.totalAmount)}</span>
                  <span>·</span>
                  <span>
                    ১ম পেমেন্টের পর অবশিষ্ট বকেয়া: ৳{formatBengaliNumber(plan.remainingBalance)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: In-App Payment & Free Trial Simulator Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Calculator className="h-4 w-4" />
                  <span>অ্যাপের ভেতরের পেমেন্ট ও ট্রায়াল সিমুলেটর</span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  আগে ফ্রি ট্রায়াল দেখুন, তারপর কিস্তিতে ভর্তি হোন
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  অ্যাপের ভেতরে আপনি প্রথমে ৩ দিনের ফ্রি ট্রায়াল আনলক করতে পারবেন। ট্রায়াল শেষে বিকাশ বা নগদে পেমেন্ট করে নিচের মতো TrxID জমা দিলেই কোর্স আনলক হয়ে যাবে।
                </p>

                {/* Free Trial Callout Box */}
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      🎁 {formatBengaliNumber(selectedCourse.freeTrialLessons)}টি প্রিমিয়াম ক্লাস ও নোট সম্পূর্ণ ফ্রি!
                    </span>
                    <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                    কোনো টাকা ছাড়াই অ্যাপে "{selectedCourse.title}" কোর্সের প্রথম ক্লাসগুলো করে দেখুন।
                  </p>
                  <button
                    type="button"
                    onClick={onTriggerApkDownload}
                    className="mt-3 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    📥 অ্যাপ নামিয়ে ফ্রি ট্রায়াল শুরু করুন
                  </button>
                </div>

                {/* bKash / Nagad TrxID Practice Form */}
                <form onSubmit={handleSimulateTrxSubmit} className="mt-5 space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    অ্যাপে বিকাশ/নগদ TrxID জমা দেওয়ার নিয়ম (ডেমো টেস্ট করুন):
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bKash')}
                      className={`rounded-xl border px-3 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        paymentMethod === 'bKash'
                          ? 'border-pink-600 bg-pink-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                      }`}
                    >
                      bKash (বিকাশ পেমেন্ট)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Nagad')}
                      className={`rounded-xl border px-3 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        paymentMethod === 'Nagad'
                          ? 'border-orange-600 bg-orange-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                      }`}
                    >
                      Nagad (নগদ পেমেন্ট)
                    </button>
                  </div>

                  <div>
                    <label
                      htmlFor="demo-trx-input"
                      className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                    >
                      {paymentMethod} এ ৳{formatBengaliNumber(plan.firstPaymentNow)} পাঠানোর পর প্রাপ্ত TrxID:
                    </label>
                    <div className="mt-1.5 flex items-center gap-2">
                      <input
                        id="demo-trx-input"
                        type="text"
                        value={trxInput}
                        onChange={(e) => setTrxInput(e.target.value)}
                        placeholder="যেমন: BKS948271X"
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono-num text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                      >
                        TrxID যাচাই করুন
                      </button>
                    </div>
                  </div>

                  {trxFeedback && (
                    <div
                      className={`rounded-xl p-3 text-xs leading-relaxed ${
                        trxFeedback.type === 'success'
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-50 text-rose-900 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800'
                      }`}
                    >
                      {trxFeedback.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

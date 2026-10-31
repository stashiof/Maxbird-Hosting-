import React from 'react';
import {
  Download,
  ShieldCheck,
  KeyRound,
  BookOpenCheck,
  Gift,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import { usageSteps, UsageStep } from '../config/siteConfig';

interface StepByStepGuideProps {
  onTriggerApkDownload: () => void;
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({
  onTriggerApkDownload,
}) => {
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

  return (
    <section
      id="usage-guide"
      className="scroll-mt-20 border-t border-slate-200/80 bg-white py-16 md:py-24 dark:border-slate-800/80 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            ধাপে ধাপে ভিজ্যুয়াল গাইড · নতুন শিক্ষার্থীদের জন্য সহজ নির্দেশনা
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            অ্যাপটি কীভাবে ব্যবহার করবেন? (৬টি সহজ ধাপে সম্পূর্ণ নিয়ম)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            নতুন ব্যবহারকারীরা যেন একটুও বিভ্রান্ত না হন, সেজন্য নিচের ৬টি ধাপে ডাউনলোড থেকে শুরু করে ডিভাইস অ্যাক্সেস, ফ্রি ট্রায়াল এবং কিস্তিতে কোর্স আনলক করার সম্পূর্ণ প্রক্রিয়াটি তুলে ধরা হলো।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {usageSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {step.stepNumber} · {step.bengaliNumber}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
                    {getStepIcon(step.screenStateKey)}
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>

                {step.safetyNote && (
                  <p className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs font-medium leading-relaxed text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200">
                    🛡️ {step.safetyNote}
                  </p>
                )}
              </div>

              <div className="mt-5 border-t border-slate-200/70 pt-4 dark:border-slate-800">
                {step.screenStateKey === 'download' ? (
                  <button
                    type="button"
                    onClick={onTriggerApkDownload}
                    className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    📥 অফিসিয়াল অ্যাপ ডাউনলোড করুন (APK)
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{step.highlightPoint}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

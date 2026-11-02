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
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            ইনস্টল ও ব্যবহারের গাইড
          </p>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            মাত্র ৪টি সহজ ধাপে অ্যাপ ইনস্টল ও ক্লাস শুরু করুন
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usageSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-emerald-100/80 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                    {step.bengaliNumber}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
                    {getStepIcon(step.screenStateKey)}
                  </div>
                </div>

                <h3 className="mt-3.5 text-base font-bold leading-snug text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 border-t border-slate-200/70 pt-3.5 dark:border-slate-800">
                {step.screenStateKey === 'download' ? (
                  <button
                    type="button"
                    onClick={onTriggerApkDownload}
                    className="w-full rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                  >
                    📥 অ্যাপ ডাউনলোড করুন (APK)
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
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

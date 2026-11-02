import React from 'react';
import { motion } from 'motion/react';
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
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            ইনস্টল ও ব্যবহারের গাইড
          </p>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            মাত্র ৪টি সহজ ধাপে অ্যাপ ইনস্টল ও ক্লাস শুরু করুন
          </h2>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usageSteps.map((step, index) => (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-5 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {step.bengaliNumber} · {step.subtitle}
                  </span>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
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
                    className="w-full rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                  >
                    ব্রাউজারে অ্যাপ ডাউনলোড ও ইনস্টল করুন
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{step.highlightPoint}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

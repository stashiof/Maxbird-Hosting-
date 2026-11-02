import React from 'react';
import {
  Clapperboard,
  DownloadCloud,
  Map,
  CreditCard,
} from 'lucide-react';

interface FeaturesAndInstallmentSectionProps {
  onTriggerApkDownload: () => void;
}

export const FeaturesAndInstallmentSection: React.FC<FeaturesAndInstallmentSectionProps> = ({
  onTriggerApkDownload,
}) => {
  const features = [
    {
      badge: '০১ · স্মুথ স্ট্রিমিং',
      title: '🎬 HD রেকর্ডেড ও লাইভ ক্লাস',
      description:
        'কম ইন্টারনেট স্পিডেও বাফারিং ছাড়া পরিষ্কার ক্লাস দেখা যায় এবং ভিডিওর স্পিড ও কোয়ালিটি নিয়ন্ত্রণের সুবিধা রয়েছে।',
      footer: 'স্মার্ট ভিডিও প্লেয়ার ও প্রগ্রেস ট্র্যাকিং',
      icon: <Clapperboard className="h-5 w-5" />,
    },
    {
      badge: '০২ · ইন্টারনেট ছাড়া ক্লাস',
      title: '📥 অফলাইন ডাউনলোড সুবিধা',
      description:
        'ওয়াইফাই বা ডাটা থাকা অবস্থায় অ্যাপের ভেতরেই ভিডিও ক্লাস ও PDF নোট ডাউনলোড করে পরে ইন্টারনেট ছাড়াই দেখা যায়।',
      footer: 'ভিডিও ও লেকচার শিট উভয়ই সেভ থাকে',
      icon: <DownloadCloud className="h-5 w-5" />,
    },
    {
      badge: '০৩ · স্মার্ট প্রস্তুতি',
      title: '🗺️ কুয়েস্ট ম্যাপ ও মডেল টেস্ট',
      description:
        'অধ্যায়ভিত্তিক কুয়েস্ট ম্যাপ, স্মার্ট পিডিএফ নোট এবং প্রতিটি লেসন শেষে কুইজ দিয়ে নিজের প্রস্তুতি যাচাইয়ের ব্যবস্থা।',
      footer: 'গেমিফাইড অধ্যায়ভিত্তিক লার্নিং সিস্টেম',
      icon: <Map className="h-5 w-5" />,
    },
    {
      badge: '০৪ · সাশ্রয়ী পেমেন্ট ট্র্যাকার',
      title: '💳 ইন-অ্যাপ কিস্তি ও ফ্রি ট্রায়াল',
      description:
        'ভর্তির আগে ফ্রি ট্রায়াল ক্লাস এবং বিকাশ/নগদে ২ বা ৩ কিস্তিতে ভর্তির পর অ্যাপের ভেতরেই পরবর্তী কিস্তির তারিখ ও হিসাব দেখা যায়।',
      footer: 'কোনো লুকানো চার্জ বা অতিরিক্ত ফি নেই',
      icon: <CreditCard className="h-5 w-5" />,
    },
  ];

  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50 py-14 sm:py-20 dark:border-slate-800/80 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              কোর্স ও অ্যাপ সুবিধাসমূহ
            </p>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              অ্যাপের ভেতরে যেসব আধুনিক সুবিধা পাবেন
            </h2>
          </div>

          <button
            type="button"
            onClick={onTriggerApkDownload}
            className="w-full sm:w-auto rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
          >
            📥 অফিসিয়াল অ্যাপ ডাউনলোড করুন
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {item.badge}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                    {item.icon}
                  </div>
                </div>
                <h3 className="mt-3.5 text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
                {item.footer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


import React, { useState } from 'react';
import {
  ChevronDown,
  MessageCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
} from 'lucide-react';
import { faqItems, FaqItem, filterFaqs } from '../config/siteConfig';

interface FaqAndSupportSectionProps {
  telegramHandle: string;
  telegramUrl: string;
}

export const FaqAndSupportSection: React.FC<FaqAndSupportSectionProps> = ({
  telegramHandle,
  telegramUrl,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | FaqItem['category']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string>(faqItems[0].id);
  const [copiedTopicIdx, setCopiedTopicIdx] = useState<number | null>(null);

  const visibleFaqs = filterFaqs(faqItems, selectedCategory, searchQuery);

  const quickTemplates = [
    {
      label: 'ডিভাইস অ্যাক্সেস অনুমোদন',
      text: 'আসসালামু আলাইকুম ভাইয়া, আমি অ্যাপে ডিভাইস অ্যাক্সেসের জন্য আবেদন করেছি। আমার মোবাইল নম্বর: 01XXXXXXXXX। অনুগ্রহ করে अप्रूভ করে দিন।',
    },
    {
      label: '🎁 ফ্রি ট্রায়াল রিকোয়েস্ট',
      text: 'আসসালামু আলাইকুম ভাইয়া, আমি কোর্সে ফ্রি ট্রায়াল দেখার জন্য এক্সেস রিকোয়েস্ট পাঠিয়েছি। অনুগ্রহ করে ফ্রি ট্রায়াল চালু করে দিন।',
    },
    {
      label: '💳 কিস্তি / TrxID ভেরিফিকেশন',
      text: 'আসসালামু আলাইকুম ভাইয়া, আমি কোর্সের ১ম কিস্তি বিকাশ/নগদে পেমেন্ট করে অ্যাপে TrxID জমা দিয়েছি। অনুগ্রহ করে কোর্সটি আনলক করে দিন।',
    },
  ];

  const handleCopyTemplate = (text: string, idx: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedTopicIdx(idx);
    setTimeout(() => setCopiedTopicIdx(null), 2200);
  };

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-slate-200/80 bg-white py-16 md:py-24 dark:border-slate-800/80 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left 7 Columns: Interactive FAQ Accordion */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              সচরাচর জিজ্ঞাসা (FAQ) · আপনার মনের সকল প্রশ্নের উত্তর
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              শিক্ষার্থীদের সাধারণ প্রশ্ন ও সমাধান
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              ডিভাইস ভেরিফিকেশন, ফ্রি ট্রায়াল, কিস্তিতে পেমেন্ট কিংবা APK ইনস্টল নিয়ে আপনার মনে যে প্রশ্নগুলো আসতে পারে তার বিস্তারিত উত্তর নিচে দেওয়া হলো।
            </p>

            {/* Filter Controls & Search */}
            <div className="mt-6 space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 p-1.5 dark:border-slate-800 dark:bg-slate-900">
                {(
                  [
                    { key: 'all', label: 'সব প্রশ্ন' },
                    { key: 'security', label: 'ডিভাইস ও নিরাপত্তা' },
                    { key: 'trial', label: 'ফ্রি ট্রায়াল ও ক্লাস' },
                    { key: 'payment', label: 'কিস্তি ও পেমেন্ট' },
                    { key: 'support', label: 'সাপোর্ট' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedCategory(tab.key)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === tab.key
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-emerald-600 dark:text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  aria-label="প্রশ্ন খুঁজুন"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="আপনার প্রশ্ন খুঁজুন (যেমন: ফ্রি ট্রায়াল, কিস্তি, বিকাশ, ডিভাইস)..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Accordion List */}
            <div className="mt-6 space-y-3">
              {visibleFaqs.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    এই অনুসন্ধানে কোনো প্রশ্ন পাওয়া যায়নি।
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-2 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    সব প্রশ্ন আবার দেখুন
                  </button>
                </div>
              ) : (
                visibleFaqs.map((item) => {
                  const isOpen = openFaqId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 transition-colors dark:border-slate-800 dark:bg-slate-900/80"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="text-base font-bold text-slate-900 dark:text-white">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-150 ${
                            isOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-200/80 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right 5 Columns: Direct Telegram Support Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">
                  সরাসরি অ্যাডমিন হেল্পডেস্ক · দ্রুত সমাধান
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400">
                  <MessageCircle className="h-5 w-5" />
                </div>
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
                Telegram সাপোর্ট ({telegramHandle})
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                ডিভাইস অ্যাক্সেস দ্রুত এপ্রুভ করতে, ফ্রি ট্রায়াল চালু করতে অথবা কিস্তির পেমেন্ট (TrxID) সংক্রান্ত যেকোনো সহযোগিতায় সরাসরি আমাদের টেলিগ্রামে এক ক্লিকে মেসেজ দিন।
              </p>

              {/* Direct One-Click Telegram CTA */}
              <div className="mt-6">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-3.5 text-sm font-bold text-slate-950 hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>Telegram সাপোর্টে মেসেজ দিন ({telegramHandle})</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Pre-filled Message Copy Helper */}
              <div className="mt-6 border-t border-slate-800 pt-5">
                <p className="text-xs font-semibold text-slate-300">
                  অ্যাডমিনকে দ্রুত মেসেজ পাঠানোর রেডিমেড ফরম্যাট (কপি করে পাঠান):
                </p>
                <div className="mt-3 space-y-2.5">
                  {quickTemplates.map((tpl, idx) => (
                    <div
                      key={tpl.label}
                      className="rounded-2xl border border-slate-800 bg-slate-950/90 p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-emerald-400">
                          {tpl.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyTemplate(tpl.text, idx)}
                          className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
                        >
                          {copiedTopicIdx === idx ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">কপি হয়েছে!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>মেসেজ কপি করুন</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                        "{tpl.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

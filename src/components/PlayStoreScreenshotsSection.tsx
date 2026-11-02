import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  ShieldCheck,
  Star,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Gift,
  CreditCard,
  CheckCircle2,
  Compass,
  Sparkles,
} from 'lucide-react';
import { SiteConfig, formatBengaliNumber } from '../config/siteConfig';

interface PlayStoreScreenshotsSectionProps {
  config: SiteConfig;
  onTriggerApkDownload: () => void;
}

interface BuiltInScreenPreview {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  accentColor: string;
  type: 'courses' | 'video' | 'quest' | 'installment' | 'security';
}

const BUILT_IN_PREVIEWS: BuiltInScreenPreview[] = [
  {
    id: 'preview-1',
    badge: 'স্ক্রিন ১ · হোম ও কোর্স',
    title: 'সব কোর্স ও ফ্রি ট্রায়াল এক জায়গায়',
    subtitle: 'কোর্সের ব্যানার, মূল্য ও কিস্তির বিস্তারিত তালিকা',
    accentColor: 'from-emerald-600 to-teal-700',
    type: 'courses',
  },
  {
    id: 'preview-2',
    badge: 'স্ক্রিন ২ · ফ্রি ট্রায়াল ক্লাস',
    title: 'ভর্তির আগেই ফ্রি ক্লাস দেখুন',
    subtitle: 'এইচডি ভিডিও প্লেয়ার ও লেকচার শিট ডাউনলোড',
    accentColor: 'from-sky-600 to-indigo-700',
    type: 'video',
  },
  {
    id: 'preview-3',
    badge: 'স্ক্রিন ৩ · কিস্তি ট্র্যাকার',
    title: 'বিকাশ ও নগদে ২/৩ কিস্তিতে ভর্তি',
    subtitle: 'পরিশোধিত টাকা ও পরবর্তী কিস্তির অটোমেটিক হিসাব',
    accentColor: 'from-violet-600 to-purple-800',
    type: 'installment',
  },
  {
    id: 'preview-4',
    badge: 'স্ক্রিন ৪ · কুয়েস্ট ম্যাপ',
    title: 'গেমের মতো অধ্যায়ভিত্তিক পড়াশোনা',
    subtitle: 'একটি ক্লাস শেষ করে পরবর্তী চ্যালেঞ্জ আনলক',
    accentColor: 'from-amber-600 to-orange-700',
    type: 'quest',
  },
  {
    id: 'preview-5',
    badge: 'স্ক্রিন ৫ · ওয়ান-ক্লিক অ্যাক্সেস',
    title: 'নাম ও নম্বর দিলেই অ্যাপ আনলক',
    subtitle: 'কোনো জটিল কোড কপি-পেস্ট করার ঝামেলা নেই',
    accentColor: 'from-emerald-700 to-slate-900',
    type: 'security',
  },
];

export const PlayStoreScreenshotsSection: React.FC<PlayStoreScreenshotsSectionProps> = ({
  config,
  onTriggerApkDownload,
}) => {
  const uploadedScreenshots = (config.appScreenshots || []).filter(
    (url) => typeof url === 'string' && url.trim().length > 0
  );
  const hasUploadedScreenshots = uploadedScreenshots.length > 0;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const totalItems = hasUploadedScreenshots
    ? uploadedScreenshots.length
    : BUILT_IN_PREVIEWS.length;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % totalItems);
  };

  return (
    <section
      id="screenshots"
      className="scroll-mt-16 border-t border-slate-200/80 bg-white py-12 sm:py-16 dark:border-slate-800/80 dark:bg-slate-900/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SCREENSHOTS GALLERY HEADER */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              অ্যাপ প্রিভিউ গ্যালারি
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              অ্যাপের ভেতরের স্ক্রিনশট ({formatBengaliNumber(totalItems)}টি ছবি)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              ডানে-বামে সোয়াইপ করে দেখুন অথবা যেকোনো ছবির ওপর ট্যাপ করে বড় করে দেখুন
            </p>
          </div>

          <button
            type="button"
            onClick={onTriggerApkDownload}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>অ্যাপ ডাউনলোড করুন</span>
          </button>
        </div>

        {/* HORIZONTAL SCROLLABLE PLAY STORE SCREENSHOT STRIP */}
        <div className="mt-6 flex gap-3.5 sm:gap-4 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory">
            {hasUploadedScreenshots
              ? uploadedScreenshots.map((imgUrl, idx) => (
                  <button
                    key={`${imgUrl}-${idx}`}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative w-[180px] sm:w-[235px] shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-slate-900 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg dark:border-slate-800"
                  >
                    <div className="aspect-[9/18] w-full overflow-hidden bg-slate-950">
                      <img
                        src={imgUrl}
                        alt={`${config.appName} স্ক্রিনশট ${idx + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-2.5 sm:p-3">
                      <span className="rounded-lg bg-slate-900/90 px-2 py-0.5 text-[11px] font-bold text-white">
                        স্ক্রিনশট {formatBengaliNumber(idx + 1)}
                      </span>
                      <span className="rounded-lg bg-emerald-600 p-1.5 text-white shadow-xs">
                        <Maximize2 className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </button>
                ))
              : BUILT_IN_PREVIEWS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative flex w-[225px] sm:w-[245px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-slate-950 p-4 text-left text-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg dark:border-slate-800"
                  >
                    {/* Phone Notch Header */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-mono">{config.appName}</span>
                        <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                          {item.badge}
                        </span>
                      </div>

                      {/* Mini Graphic Card inside Phone Screen */}
                      <div
                        className={`mt-3 rounded-xl bg-gradient-to-br ${item.accentColor} p-3.5 shadow-inner`}
                      >
                        <p className="text-xs font-extrabold leading-snug text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-white/85">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Screen Specific UI Preview Body */}
                      <div className="mt-3 space-y-2">
                        {item.type === 'courses' && (
                          <>
                            <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-bold text-emerald-400">একাডেমিক ও স্কিল কোর্স</span>
                                <span className="text-amber-300">🎁 ফ্রি ট্রায়াল</span>
                              </div>
                              <p className="mt-1 text-xs font-bold text-white">
                                সম্পূর্ণ সিলেবাস ও লাইভ গাইডলাইন
                              </p>
                              <div className="mt-2 flex items-center justify-between rounded bg-emerald-600/20 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                                <span>এককালীন বা ২/৩ কিস্তি</span>
                                <span>আনলক →</span>
                              </div>
                            </div>
                            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-2.5 text-[11px] text-slate-300">
                              ✓ কেনার আগেই ফ্রি ক্লাস করে মান যাচাই
                            </div>
                          </>
                        )}

                        {item.type === 'video' && (
                          <>
                            <div className="flex aspect-video flex-col items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-3 text-center">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-slate-950">
                                <Play className="h-4 w-4 fill-current" />
                              </div>
                              <span className="mt-1.5 text-[11px] font-bold text-white">
                                অধ্যায় ১: ফ্রি ট্রায়াল ভিডিও ক্লাস
                              </span>
                            </div>
                            <div className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-[11px] text-slate-300">
                              📥 অফলাইন ডাউনলোড ও পিডিএফ লেকচার নোট
                            </div>
                          </>
                        )}

                        {item.type === 'installment' && (
                          <>
                            <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="text-slate-400">কিস্তির প্ল্যান</span>
                                <span className="font-bold text-emerald-400">bKash / Nagad</span>
                              </div>
                              <div className="mt-2 space-y-1.5 text-[11px]">
                                <div className="flex justify-between text-emerald-300">
                                  <span>১ম কিস্তি (ভর্তির সময়)</span>
                                  <span>পরিশোধিত ✓</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                  <span>২য় কিস্তি</span>
                                  <span>অ্যাপেই অটো রিমাইন্ডার</span>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-2 text-[11px] text-slate-300">
                              <CreditCard className="mr-1 inline h-3.5 w-3.5 text-emerald-400" />
                              সহজ TrxID সাবমিশন ও দ্রুত অ্যাক্সেস
                            </div>
                          </>
                        )}

                        {item.type === 'quest' && (
                          <>
                            <div className="space-y-1.5 rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-[11px]">
                              <div className="flex items-center gap-2 text-emerald-400">
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                                <span>লেভেল ১: বেসিক কনসেপ্ট (সম্পন্ন)</span>
                              </div>
                              <div className="flex items-center gap-2 text-amber-300">
                                <Compass className="h-3.5 w-3.5 shrink-0" />
                                <span>লেভেল ২: প্র্যাকটিস ও কুইজ (চলমান)</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400">
                                <Gift className="h-3.5 w-3.5 shrink-0" />
                                <span>লেভেল ৩: মাস্টারি চ্যালেঞ্জ</span>
                              </div>
                            </div>
                          </>
                        )}

                        {item.type === 'security' && (
                          <>
                            <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-[11px]">
                              <p className="font-bold text-emerald-400">ওয়ান-ক্লিক ডিভাইস আনলক</p>
                              <p className="mt-1 text-slate-300">
                                শুধুমাত্র আপনার নাম ও মোবাইল নম্বর লিখে বাটনে চাপ দিলেই অ্যাডমিনের কাছে রিকোয়েস্ট চলে যাবে।
                              </p>
                            </div>
                            <div className="rounded-lg bg-emerald-600/20 px-2.5 py-1.5 text-center text-[11px] font-bold text-emerald-300">
                              ✓ ১০০% নিরাপদ ও ঝামেলামুক্ত
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Footer inside phone card */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[11px] text-slate-400">
                      <span>বড় করে দেখুন</span>
                      <Maximize2 className="h-3.5 w-3.5 text-emerald-400 transition-transform group-hover:scale-110" />
                    </div>
                  </button>
                ))}
        </div>
      </div>

      {/* FULL-SCREEN SCREENSHOT LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="স্ক্রিনশট প্রিভিউ"
        >
          <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col items-center">
            {/* Top Close Bar */}
            <div className="mb-3 flex w-full items-center justify-between text-white">
              <span className="text-xs font-bold">
                {config.appName} — স্ক্রিনশট {formatBengaliNumber(lightboxIndex + 1)} /{' '}
                {formatBengaliNumber(totalItems)}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
                <span>বন্ধ করুন</span>
              </button>
            </div>

            {/* Main Lightbox Content */}
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-3 shadow-2xl">
              {hasUploadedScreenshots ? (
                <img
                  src={uploadedScreenshots[lightboxIndex]}
                  alt={`${config.appName} স্ক্রিনশট ${lightboxIndex + 1}`}
                  className="max-h-[75vh] w-auto rounded-2xl object-contain"
                />
              ) : (
                <div className="w-full max-w-sm rounded-2xl bg-slate-950 p-6 text-white">
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                    {BUILT_IN_PREVIEWS[lightboxIndex].badge}
                  </span>
                  <h4 className="mt-4 text-xl font-bold text-white">
                    {BUILT_IN_PREVIEWS[lightboxIndex].title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {BUILT_IN_PREVIEWS[lightboxIndex].subtitle}
                  </p>
                  <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs leading-relaxed text-slate-300">
                    অফিসিয়াল <strong>{config.appName}</strong> অ্যাপটি ডাউনলোড করে আপনার ফোনে ইনস্টল করলেই এই ফিচারগুলো সরাসরি ব্যবহার করতে পারবেন।
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxIndex(null);
                      onTriggerApkDownload();
                    }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500"
                  >
                    <Download className="h-4 w-4" />
                    <span>এখনই অ্যাপ ডাউনলোড করুন (APK)</span>
                  </button>
                </div>
              )}

              {/* Prev / Next Navigation Buttons */}
              {totalItems > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="আগের ছবি"
                    className="absolute left-3 rounded-full bg-slate-900/90 p-2.5 text-white shadow-lg hover:bg-emerald-600"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="পরের ছবি"
                    className="absolute right-3 rounded-full bg-slate-900/90 p-2.5 text-white shadow-lg hover:bg-emerald-600"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

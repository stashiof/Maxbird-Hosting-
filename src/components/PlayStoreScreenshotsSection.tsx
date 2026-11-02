import React, { useState } from 'react';
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
      className="border-t border-slate-200/80 bg-white py-14 sm:py-20 dark:border-slate-800/80 dark:bg-slate-900/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* GOOGLE PLAY STORE STYLE HEADER CARD */}
        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-5 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            {/* Left: App Icon + Title + Developer Info */}
            <div className="flex items-start gap-4 sm:gap-6">
              {config.appIconUrl && config.appIconUrl.trim() ? (
                <img
                  src={config.appIconUrl}
                  alt={`${config.appName} Icon`}
                  className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-3xl border border-slate-200 object-cover shadow-md dark:border-slate-700"
                />
              ) : (
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-600/25">
                  <Smartphone className="h-9 w-9 sm:h-10 sm:w-10" />
                  <span className="mt-1 text-[10px] font-extrabold tracking-wider uppercase">
                    {config.appName.slice(0, 8)}
                  </span>
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                    {config.appName}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Play Protect Verified
                  </span>
                </div>

                <p className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {config.appName} Official · এডুকেশন ও স্মার্ট লার্নিং অ্যাপ
                </p>

                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  ভার্সন: <strong className="text-slate-700 dark:text-slate-200">{config.appVersion}</strong>
                  {' · '}ন্যূনতম প্রয়োজন: <strong className="text-slate-700 dark:text-slate-200">{config.minAndroidVersion}</strong>
                  {' · '}আপডেট: <strong className="text-slate-700 dark:text-slate-200">{config.lastUpdated}</strong>
                </p>
              </div>
            </div>

            {/* Right: Play Store Style Metrics + Install CTA */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
              <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200/80 bg-white px-3 py-2.5 text-center dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
                <div className="px-3">
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-slate-900 dark:text-white">
                    <span>৪.৯</span>
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                    শিক্ষার্থী রেটিং
                  </p>
                </div>

                <div className="px-3">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {config.fileSize && config.fileSize !== '0 MB' ? config.fileSize : 'APK'}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                    ফাইলের সাইজ
                  </p>
                </div>

                <div className="px-3">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {formatBengaliNumber(config.downloadCount)}+
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                    ডাউনলোড
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onTriggerApkDownload}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-500 active:scale-[0.99] transition-all sm:w-auto"
              >
                <Download className="h-4 w-4" />
                <span>অ্যাপ ইনস্টল / ডাউনলোড করুন (APK)</span>
              </button>
            </div>
          </div>

          {/* SCREENSHOTS GALLERY HEADER */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-6 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                অ্যাপের ভেতরের স্ক্রিনশট ও প্রিভিউ (Play Store View)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                যেকোনো ছবির ওপর ক্লিক করে ফুল-স্ক্রিনে বড় করে দেখতে পারবেন
              </p>
            </div>

            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              মোট {formatBengaliNumber(totalItems)}টি স্ক্রিন প্রিভিউ
            </span>
          </div>

          {/* HORIZONTAL SCROLLABLE PLAY STORE SCREENSHOT STRIP */}
          <div className="mt-5 flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory">
            {hasUploadedScreenshots
              ? uploadedScreenshots.map((imgUrl, idx) => (
                  <button
                    key={`${imgUrl}-${idx}`}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative w-[210px] sm:w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-slate-900 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg dark:border-slate-800"
                  >
                    <div className="aspect-[9/18] w-full overflow-hidden bg-slate-950">
                      <img
                        src={imgUrl}
                        alt={`${config.appName} স্ক্রিনশট ${idx + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded-lg bg-slate-900/90 px-2.5 py-1 text-[11px] font-bold text-white">
                        স্ক্রিনশট {formatBengaliNumber(idx + 1)}
                      </span>
                      <span className="rounded-lg bg-emerald-600 p-1.5 text-white">
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

          {/* WHAT'S NEW / RELEASE NOTES BAR (Play Store "নতুন কী আছে" Box) */}
          {config.releaseNotes && config.releaseNotes.trim().length > 0 && (
            <div className="mt-4 rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <Sparkles className="h-4 w-4" />
                <span>নতুন আপডেটে যা থাকছে ({config.appVersion}):</span>
              </div>
              <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {config.releaseNotes}
              </p>
            </div>
          )}
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

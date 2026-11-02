/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Download,
  ShieldCheck,
  Sun,
  Moon,
  MessageCircle,
  BookOpen,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import {
  SiteConfig,
  defaultSiteConfig,
  formatBengaliNumber,
  isConfiguredApkUrl,
} from './config/siteConfig';
import {
  subscribeToPortalSettings,
  incrementFirestoreDownloadCount,
} from './firebase';
import { PlayStoreScreenshotsSection } from './components/PlayStoreScreenshotsSection';
import { StepByStepGuide } from './components/StepByStepGuide';
import { FeaturesAndInstallmentSection } from './components/FeaturesAndInstallmentSection';
import { FaqAndSupportSection } from './components/FaqAndSupportSection';
import { ApkDownloadModal } from './components/DownloadAndAdminModals';

const STORAGE_KEY_CONFIG = 'maxbird_site_config_v3';
const STORAGE_KEY_THEME = 'maxbird_theme_v1';

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSiteConfig,
          ...parsed,
          appIconUrl: parsed.appIconUrl || defaultSiteConfig.appIconUrl || '/logo.png',
        };
      }
    } catch {
      // ignore storage errors
    }
    return defaultSiteConfig;
  });

  const [firestoreDocExists, setFirestoreDocExists] = useState(false);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) return saved === 'dark';
    } catch {
      // ignore
    }
    return false;
  });

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const resolvedLogoUrl =
    siteConfig.appIconUrl && siteConfig.appIconUrl.trim()
      ? siteConfig.appIconUrl
      : '/logo.png';

  // Real-time Firestore listener (loads live APK URL, version, notice, logo, screenshots, and download count)
  useEffect(() => {
    const unsubFirestore = subscribeToPortalSettings(
      (cloudConfig, docExists) => {
        setFirestoreDocExists(docExists);
        if (docExists) {
          setSiteConfig(cloudConfig);
          try {
            localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(cloudConfig));
          } catch {
            // ignore
          }
        }
      }
    );

    return () => {
      unsubFirestore();
    };
  }, []);

  // Keep browser tab favicon & apple-touch-icon synced with the app logo
  useEffect(() => {
    const faviconEl = document.getElementById('site-favicon') as HTMLLinkElement | null;
    const appleIconEl = document.getElementById('site-apple-icon') as HTMLLinkElement | null;
    if (faviconEl) {
      faviconEl.href = resolvedLogoUrl;
    }
    if (appleIconEl) {
      appleIconEl.href = resolvedLogoUrl;
    }
  }, [resolvedLogoUrl]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  const handleTriggerApkDownload = () => {
    const cleanUrl = (siteConfig.apkDownloadUrl || '').trim();

    if (isConfiguredApkUrl(cleanUrl)) {
      const previousCount = siteConfig.downloadCount;
      setSiteConfig((prev) => {
        const updated = { ...prev, downloadCount: prev.downloadCount + 1 };
        try {
          localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
      if (firestoreDocExists) {
        incrementFirestoreDownloadCount(previousCount, true);
      }
    }
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Zone 1: Official Logo + Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 dark:text-white"
          >
            <img
              src={resolvedLogoUrl}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/logo.png')) {
                  target.src = '/logo.png';
                }
              }}
              alt={`${siteConfig.appName} লোগো`}
              className="h-9 w-9 rounded-xl border border-slate-200 bg-white p-1 object-contain shadow-xs dark:border-slate-700"
            />
            <span>{siteConfig.appName}</span>
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="প্রধান নেভিগেশন"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="#home"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              হোম
            </a>
            <a
              href="#screenshots"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              অ্যাপের ছবি
            </a>
            <a
              href="#usage-guide"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              ব্যবহারের নিয়ম
            </a>
            <a
              href="#features"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              সুবিধাসমূহ
            </a>
            <a
              href="#faq"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              সচরাচর জিজ্ঞাসা
            </a>
          </nav>

          {/* Zone 3: Theme Toggle + Download CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              aria-label={isDark ? 'লাইট থিম চালু করুন' : 'ডার্ক থিম চালু করুন'}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors"
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400" />
                  <span className="hidden sm:inline">লাইট</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  <span className="hidden sm:inline">ডার্ক</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleTriggerApkDownload}
              className="rounded-xl bg-emerald-600 px-3.5 sm:px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
            >
              ডাউনলোড অ্যাপ
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              aria-expanded={isMobileMenuOpen}
              className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden dark:border-slate-800 dark:text-slate-200"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              <a
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                হোম
              </a>
              <a
                href="#screenshots"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                অ্যাপের ছবি (Play Store View)
              </a>
              <a
                href="#usage-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ইনস্টল ও ব্যবহারের নিয়ম
              </a>
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                অ্যাপের সুবিধাসমূহ
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                সচরাচর জিজ্ঞাসা (FAQ)
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative overflow-hidden pt-5 pb-12 sm:pt-10 sm:pb-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Compact Notice Banner (Only when noticeText is set) */}
            {siteConfig.noticeText && siteConfig.noticeText.trim().length > 0 && (
              <div className="mb-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 px-4 py-2.5 text-xs leading-relaxed text-slate-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-slate-200">
                <strong className="font-bold text-emerald-700 dark:text-emerald-400">
                  অফিসিয়াল নোটিশ:
                </strong>{' '}
                {siteConfig.noticeText}
              </div>
            )}

            {/* 2-Column Hero Split */}
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left 7 Columns: Concise Value Proposition & Primary APK Download CTA */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-2xs dark:border-emerald-900/60 dark:bg-slate-900 dark:text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                  <span>{siteConfig.appName} অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ</span>
                </div>

                <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] leading-[1.3] dark:text-white">
                  পড়াশোনা হোক আরও সহজ, স্মার্ট ও সাশ্রয়ী — এখন আপনার হাতের মুঠোয়!
                </h1>

                <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  ভর্তির আগেই <strong>ফ্রি ট্রায়াল ক্লাস</strong> দেখে মান যাচাই করুন এবং বিকাশ বা নগদে সহজ <strong>২/৩ কিস্তিতে (Installment)</strong> কোর্সে যুক্ত হয়ে যেকোনো সময় পড়াশোনা চালিয়ে যান।
                </p>

                {/* Primary APK Download Action Block */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTriggerApkDownload}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 active:scale-[0.99] transition-all text-center"
                  >
                    <Download className="h-5 w-5 shrink-0" />
                    <span>অফিসিয়াল অ্যাপ ডাউনলোড করুন (APK)</span>
                  </button>

                  <a
                    href="#screenshots"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 sm:py-4 text-sm font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors text-center"
                  >
                    <BookOpen className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>অ্যাপের স্ক্রিনশট দেখুন</span>
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Official Play Store Style App Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-4">
                    <img
                      src={resolvedLogoUrl}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/logo.png')) {
                          target.src = '/logo.png';
                        }
                      }}
                      alt={`${siteConfig.appName} লোগো`}
                      className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl border border-slate-200 bg-white p-1.5 object-contain shadow-sm dark:border-slate-700"
                    />
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Play Protect Verified</span>
                      </span>
                      <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                        {siteConfig.appName}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        ভার্সন: <strong className="text-slate-700 dark:text-slate-200">{siteConfig.appVersion}</strong> · {siteConfig.minAndroidVersion} · {siteConfig.lastUpdated}
                      </p>
                    </div>
                  </div>

                  {/* Unified Play Store Metrics Row */}
                  <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-100 bg-slate-50 py-2.5 text-center text-xs dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">৪.৯ ★</p>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">রেটিং</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {siteConfig.fileSize && siteConfig.fileSize !== '0 MB'
                          ? siteConfig.fileSize
                          : 'APK'}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">ফাইল সাইজ</p>
                    </div>
                    <div>
                      <p className="font-bold text-emerald-700 dark:text-emerald-400">
                        {formatBengaliNumber(siteConfig.downloadCount)}+
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">ডাউনলোড</p>
                    </div>
                  </div>

                  {siteConfig.releaseNotes && siteConfig.releaseNotes.trim().length > 0 && (
                    <div className="mt-3.5 rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                      <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        <Sparkles className="h-3.5 w-3.5 shrink-0" />
                        <span>নতুন আপডেটে যা থাকছে ({siteConfig.appVersion}):</span>
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        {siteConfig.releaseNotes}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleTriggerApkDownload}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
                  >
                    <Download className="h-4 w-4 shrink-0" />
                    <span>
                      সরাসরি APK ইনস্টল / ডাউনলোড করুন
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: GOOGLE PLAY STORE STYLE APP SCREENSHOTS & LISTING */}
        <PlayStoreScreenshotsSection
          config={siteConfig}
          onTriggerApkDownload={handleTriggerApkDownload}
        />

        {/* SECTION 3: CONCISE 4-STEP INSTALL & USAGE GUIDE */}
        <StepByStepGuide onTriggerApkDownload={handleTriggerApkDownload} />

        {/* SECTION 4: 4 DISTINCT IN-APP LEARNING FEATURES */}
        <FeaturesAndInstallmentSection
          onTriggerApkDownload={handleTriggerApkDownload}
        />

        {/* SECTION 5: INTERACTIVE FAQ & DIRECT TELEGRAM SUPPORT */}
        <FaqAndSupportSection
          telegramHandle={siteConfig.telegramHandle}
          telegramUrl={siteConfig.telegramUrl}
        />
      </main>

      {/* QUIET FOOTER WITH LOGO & SITE LINKS */}
      <footer className="border-t border-slate-200 bg-white pt-10 pb-20 sm:pb-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <img
                src={resolvedLogoUrl}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/logo.png')) {
                    target.src = '/logo.png';
                  }
                }}
                alt={`${siteConfig.appName} লোগো`}
                className="h-10 w-10 rounded-xl border border-slate-200 bg-white p-1 object-contain shadow-xs dark:border-slate-700"
              />
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {siteConfig.appName} — অফিসিয়াল অ্যাপ ডাউনলোড পোর্টাল
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  ভার্সন: {siteConfig.appVersion}
                  {siteConfig.fileSize && siteConfig.fileSize !== '0 MB'
                    ? ` · ফাইল সাইজ: ${siteConfig.fileSize}`
                    : ''}
                  {' · '}আপডেট: {siteConfig.lastUpdated}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
              <a href="#home" className="hover:text-emerald-600">
                হোম
              </a>
              <a href="#screenshots" className="hover:text-emerald-600">
                অ্যাপের ছবি
              </a>
              <a href="#usage-guide" className="hover:text-emerald-600">
                ব্যবহারের নিয়ম
              </a>
              <a href="#features" className="hover:text-emerald-600">
                সুবিধাসমূহ
              </a>
              <a href="#faq" className="hover:text-emerald-600">
                FAQ
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 dark:border-slate-900 dark:text-slate-400">
            <p>© ২০২৬ {siteConfig.appName}। সর্বস্বত্ব সংরক্ষিত।</p>
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              সরাসরি টেলিগ্রাম সাপোর্ট: {siteConfig.telegramHandle}
            </a>
          </div>
        </div>
      </footer>

      {/* COMPACT FLOATING TELEGRAM SUPPORT BUTTON */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40">
        <a
          href={siteConfig.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-sky-500 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold text-slate-950 shadow-lg hover:bg-sky-400 transition-transform hover:scale-105 whitespace-nowrap"
        >
          <MessageCircle className="h-4 w-4 fill-current shrink-0" />
          <span className="sm:hidden">Telegram হেল্প</span>
          <span className="hidden sm:inline">Telegram সাপোর্ট ({siteConfig.telegramHandle})</span>
        </a>
      </div>

      {/* STUDENT APK DOWNLOAD MODAL */}
      <ApkDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        config={siteConfig}
      />
    </div>
  );
}


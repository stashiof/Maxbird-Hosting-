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
  CheckCircle2,
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
import { MobileAppMockup, PhoneScreenTab } from './components/MobileAppMockup';
import { StepByStepGuide } from './components/StepByStepGuide';
import { FeaturesAndInstallmentSection } from './components/FeaturesAndInstallmentSection';
import { ApkInstallGuide } from './components/ApkInstallGuide';
import { FaqAndSupportSection } from './components/FaqAndSupportSection';
import { ApkDownloadModal } from './components/DownloadAndAdminModals';

const STORAGE_KEY_CONFIG = 'maxbird_site_config_v3';
const STORAGE_KEY_THEME = 'maxbird_theme_v1';

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        return { ...defaultSiteConfig, ...JSON.parse(saved) };
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

  const [heroPhoneTab, setHeroPhoneTab] = useState<PhoneScreenTab>('courses');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Real-time Firestore listener (loads live APK URL, version, notice, and download count)
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

  const handleJumpToHeroPhoneTab = (tab: PhoneScreenTab) => {
    setHeroPhoneTab(tab);
    const heroEl = document.getElementById('home');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* STRICT 3-ZONE TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#home"
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 dark:text-white"
          >
            {siteConfig.appName}
          </a>

          {/* Zone 2: 5 Clean Single-Line Text Navigation Links */}
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
              href="#usage-guide"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              ব্যবহারের নিয়ম
            </a>
            <a
              href="#features"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              কোর্স ও সুবিধাসমূহ
            </a>
            <a
              href="#installment-trial"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              কিস্তি ও ফ্রি ট্রায়াল
            </a>
            <a
              href="#faq"
              className="hover:text-emerald-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 dark:hover:text-emerald-400"
            >
              সচরাচর জিজ্ঞাসা (FAQ)
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action (+ Mobile Menu Button on small screens) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleTriggerApkDownload}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
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
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <a
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                হোম
              </a>
              <a
                href="#usage-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ব্যবহারের নিয়ম
              </a>
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                কোর্স ও সুবিধাসমূহ
              </a>
              <a
                href="#installment-trial"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                কিস্তি ও ফ্রি ট্রায়াল
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
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
          className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Workspace Utility Bar: Notice + Theme Switch */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-900">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="font-bold text-emerald-700 dark:text-emerald-400">
                  অফিসিয়াল নোটিশ:
                </strong>{' '}
                {siteConfig.noticeText}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
                >
                  {isDark ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-400" />
                      <span>লাইট থিম</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-slate-700" />
                      <span>ডার্ক থিম</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2-Column Hero Split */}
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left 7 Columns: Value Proposition & Primary APK Download CTA */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>{siteConfig.appName} অফিসিয়াল অ্যাপ ডাউনলোড পোর্টাল</span>
                  <span aria-hidden="true">·</span>
                  <span>কেনার আগে ফ্রি ট্রায়াল</span>
                  <span aria-hidden="true">·</span>
                  <span>২/৩ কিস্তিতে ভর্তির সুবিধা</span>
                </div>

                <h1
                  className="mt-4 font-bold tracking-tight text-slate-900 dark:text-white leading-[1.28]"
                  style={{ fontSize: 'clamp(2rem, 3.8vw, 3.35rem)' }}
                >
                  পড়াশোনা হোক আরও সহজ, স্মার্ট ও সাশ্রয়ী — এখন আপনার হাতের মুঠোয়!
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                  আমাদের অফিসিয়াল এডুকেশনাল অ্যান্ড্রয়েড অ্যাপটি এক ক্লিকেই ডাউনলোড করুন। কোনো কোড কপি-পেস্টের ঝামেলা ছাড়াই নাম ও মোবাইল নম্বর দিয়ে অ্যাপ আনলক করুন, কেনার আগে <strong>ফ্রি ট্রায়াল ক্লাস</strong> দেখুন এবং বিকাশ বা নগদে সহজ <strong>কিস্তিতে (Installment)</strong> ভর্তি হয়ে ক্লাস শুরু করুন।
                </p>

                {/* Primary APK Download Action Block */}
                <div className="mt-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={handleTriggerApkDownload}
                      className="flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 active:scale-[0.99] transition-all whitespace-nowrap shrink-0"
                    >
                      <Download className="h-5 w-5" />
                      <span>📥 অফিসিয়াল অ্যাপ ডাউনলোড করুন (APK)</span>
                    </button>

                    <a
                      href="#usage-guide"
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>অ্যাপ ব্যবহারের ৬টি ধাপ দেখুন</span>
                    </a>
                  </div>

                  {/* Unboxed Clean Metadata Line below button */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      ভার্সন: {siteConfig.appVersion}
                    </span>
                    {siteConfig.fileSize && siteConfig.fileSize !== '0 MB' && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>ফাইলের সাইজ: {siteConfig.fileSize}</span>
                      </>
                    )}
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck className="h-4 w-4" />
                      ১০০% নিরাপদ ও ভাইরাসমুক্ত (Play Protect Friendly)
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      ডাউনলোড কাউন্টার: {formatBengaliNumber(siteConfig.downloadCount)}
                    </span>
                  </div>
                </div>

                {/* Quick Highlight Points */}
                <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200/80 pt-6 sm:grid-cols-3 dark:border-slate-800/80">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        এক ক্লিকে ডিভাইস অ্যাক্সেস
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        নাম ও নম্বর দিলেই অ্যাপ আনলক
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        🎁 ফ্রি ট্রায়াল ক্লাস
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        ভর্তির আগেই ক্লাস করে যাচাই
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        💳 ২/৩ কিস্তিতে পেমেন্ট
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        বিকাশ ও নগদে সহজ কিস্তি ট্র্যাকার
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Android App UI Preview */}
              <div className="lg:col-span-5">
                <MobileAppMockup
                  activeTab={heroPhoneTab}
                  onTabChange={setHeroPhoneTab}
                  onTriggerApkDownload={handleTriggerApkDownload}
                  appName={siteConfig.appName}
                  appVersion={siteConfig.appVersion}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION খ: 6-STEP VISUAL GUIDE */}
        <StepByStepGuide onTriggerApkDownload={handleTriggerApkDownload} />

        {/* SECTION গ: PREMIUM FEATURES & INSTALLMENT GUIDELINE */}
        <FeaturesAndInstallmentSection
          onTriggerApkDownload={handleTriggerApkDownload}
          onJumpToHeroPhoneTab={handleJumpToHeroPhoneTab}
        />

        {/* SECTION ঘ: HOW TO INSTALL APK GUIDE */}
        <ApkInstallGuide
          onTriggerApkDownload={handleTriggerApkDownload}
          appVersion={siteConfig.appVersion}
          fileSize={siteConfig.fileSize}
        />

        {/* SECTION ঙ & চ: INTERACTIVE FAQ & DIRECT TELEGRAM SUPPORT */}
        <FaqAndSupportSection
          telegramHandle={siteConfig.telegramHandle}
          telegramUrl={siteConfig.telegramUrl}
        />
      </main>

      {/* QUIET FOOTER WITH SITE LINKS */}
      <footer className="border-t border-slate-200 bg-white pt-12 pb-20 sm:pb-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white">
                {siteConfig.appName} — অফিসিয়াল ওয়েবসাইট ও অ্যাপ ডাউনলোড পোর্টাল
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                ভার্সন: {siteConfig.appVersion}
                {siteConfig.fileSize && siteConfig.fileSize !== '0 MB' ? ` · ফাইল সাইজ: ${siteConfig.fileSize}` : ''}
                {' · '}সর্বশেষ আপডেট: {siteConfig.lastUpdated}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
              <a href="#home" className="hover:text-emerald-600">
                হোম
              </a>
              <a href="#usage-guide" className="hover:text-emerald-600">
                ব্যবহারের নিয়ম
              </a>
              <a href="#apk-install-guide" className="hover:text-emerald-600">
                APK ইনস্টল গাইড
              </a>
              <a href="#faq" className="hover:text-emerald-600">
                FAQ
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 dark:border-slate-900 dark:text-slate-400">
            <p>© ২০২৬ {siteConfig.appName}। সর্বস্বত্ব সংরক্ষিত। শিক্ষার্থীদের নিরাপদ ও সাশ্রয়ী শিক্ষার লক্ষ্যে নির্মিত।</p>
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

      {/* FLOATING TELEGRAM SUPPORT BUTTON */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40">
        <a
          href={siteConfig.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-sky-500 px-3.5 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs font-bold text-slate-950 shadow-lg hover:bg-sky-400 transition-transform hover:scale-105 whitespace-nowrap shrink-0"
        >
          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
          <span>Telegram সাপোর্ট ({siteConfig.telegramHandle})</span>
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

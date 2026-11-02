import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Share2,
  Copy,
  Check,
  Smartphone,
  RotateCcw,
  Sparkles,
  Link2,
  PackageCheck,
} from 'lucide-react';
import {
  SiteConfig,
  formatBengaliNumber,
  isConfiguredApkUrl,
  parseFileSizeMegabytes,
  calculateDownloadProgress,
  buildShareableApkLinks,
} from '../config/siteConfig';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  autoStart?: boolean;
}

type DownloadPhase = 'ready' | 'downloading' | 'completed';

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
  config,
  autoStart = true,
}) => {
  const cleanApkUrl = (config.apkDownloadUrl || '').trim();
  const hasRealApk = isConfiguredApkUrl(cleanApkUrl);

  const expectedTotalMb = parseFileSizeMegabytes(config.fileSize, 9.6);
  const expectedTotalBytes = Math.round(expectedTotalMb * 1024 * 1024);

  const [phase, setPhase] = useState<DownloadPhase>('ready');
  const [loadedBytes, setLoadedBytes] = useState<number>(0);
  const [totalBytes, setTotalBytes] = useState<number>(expectedTotalBytes);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [installPromptClicked, setInstallPromptClicked] = useState(false);
  const [copiedLinkType, setCopiedLinkType] = useState<'portal' | 'direct' | 'share' | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const hiddenDownloadTriggeredRef = useRef<boolean>(false);

  const currentOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://maxbird.pages.dev';
  const shareData = buildShareableApkLinks(currentOrigin, config);

  const clearTimersAndAbort = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    if (fallbackTimerRef.current !== null) {
      window.clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const triggerNativeBrowserDownload = (url: string, filename: string) => {
    if (typeof document === 'undefined') return;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.setAttribute('download', filename);
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(() => {
      if (anchor.parentNode) {
        anchor.parentNode.removeChild(anchor);
      }
    }, 300);
  };

  const startInBrowserDownload = async () => {
    if (!hasRealApk) return;
    clearTimersAndAbort();
    setInstallPromptClicked(false);
    setPhase('downloading');
    setLoadedBytes(0);
    setTotalBytes(expectedTotalBytes);
    hiddenDownloadTriggeredRef.current = false;

    const controller = new AbortController();
    abortRef.current = controller;
    const downloadStartTime = Date.now();
    const minVisualDurationMs = 1500;

    try {
      const response = await fetch(cleanApkUrl, {
        method: 'GET',
        mode: 'cors',
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentLengthHeader = response.headers.get('content-length');
      const resolvedTotal =
        contentLengthHeader && parseInt(contentLengthHeader, 10) > 0
          ? parseInt(contentLengthHeader, 10)
          : expectedTotalBytes;

      setTotalBytes(resolvedTotal);

      if (!response.body) {
        throw new Error('ReadableStream not available');
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedLength += value.byteLength;
          const elapsed = Date.now() - downloadStartTime;
          if (elapsed < minVisualDurationMs) {
            const maxAllowedVisualBytes = Math.round(
              (elapsed / minVisualDurationMs) * resolvedTotal
            );
            setLoadedBytes(Math.min(receivedLength, maxAllowedVisualBytes));
          } else {
            setLoadedBytes(receivedLength);
          }
        }
      }

      const apkBlob = new Blob(chunks as BlobPart[], {
        type: 'application/vnd.android.package-archive',
      });
      const objectUrl = URL.createObjectURL(apkBlob);
      setBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return objectUrl;
      });

      const elapsedAfterStream = Date.now() - downloadStartTime;
      const remainingVisualMs = Math.max(0, minVisualDurationMs - elapsedAfterStream);

      if (remainingVisualMs > 80) {
        const startSmooth = Date.now();
        fallbackTimerRef.current = window.setInterval(() => {
          const p = Math.min(1, (Date.now() - startSmooth) / remainingVisualMs);
          setLoadedBytes(Math.round(p * resolvedTotal));
          if (p >= 1) {
            if (fallbackTimerRef.current !== null) {
              window.clearInterval(fallbackTimerRef.current);
              fallbackTimerRef.current = null;
            }
            setLoadedBytes(resolvedTotal);
            setPhase('completed');
            triggerNativeBrowserDownload(objectUrl, shareData.apkFileName);
            hiddenDownloadTriggeredRef.current = true;
          }
        }, 50);
      } else {
        setLoadedBytes(resolvedTotal);
        setPhase('completed');
        triggerNativeBrowserDownload(objectUrl, shareData.apkFileName);
        hiddenDownloadTriggeredRef.current = true;
      }
    } catch {
      if (controller.signal.aborted) return;

      // Graceful fallback when R2 bucket CORS blocks fetch stream:
      // Trigger native in-browser download without leaving the page & show live progress
      if (!hiddenDownloadTriggeredRef.current) {
        hiddenDownloadTriggeredRef.current = true;
        triggerNativeBrowserDownload(cleanApkUrl, shareData.apkFileName);
      }

      const startTime = Date.now();
      const durationMs = 2000;

      fallbackTimerRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - ratio, 2.2);
        const currentBytes = Math.round(eased * expectedTotalBytes);
        setLoadedBytes(currentBytes);

        if (ratio >= 1) {
          if (fallbackTimerRef.current !== null) {
            window.clearInterval(fallbackTimerRef.current);
            fallbackTimerRef.current = null;
          }
          setLoadedBytes(expectedTotalBytes);
          setPhase('completed');
        }
      }, 50);
    }
  };

  useEffect(() => {
    if (isOpen && hasRealApk && autoStart) {
      startInBrowserDownload();
    } else if (!isOpen) {
      clearTimersAndAbort();
      setPhase('ready');
      setLoadedBytes(0);
      setInstallPromptClicked(false);
    }
    return () => {
      clearTimersAndAbort();
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  const handleInstallApkTap = () => {
    setInstallPromptClicked(true);
    const targetUrl = blobUrl || cleanApkUrl;
    if (targetUrl) {
      triggerNativeBrowserDownload(targetUrl, shareData.apkFileName);
    }
  };

  const handleCopyLink = (text: string, type: 'portal' | 'direct' | 'share') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedLinkType(type);
    setTimeout(() => {
      setCopiedLinkType((prev) => (prev === type ? null : prev));
    }, 2400);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: shareData.shareTitle,
          text: shareData.shareText,
          url: shareData.portalDownloadUrl,
        });
        return;
      } catch {
        // user cancelled or share failed; fall back to copy
      }
    }
    handleCopyLink(shareData.shareText, 'share');
  };

  const progressStats = calculateDownloadProgress(loadedBytes, totalBytes);
  const bengaliPercent = formatBengaliNumber(progressStats.percent);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apk-download-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    config.appIconUrl && config.appIconUrl.trim()
                      ? config.appIconUrl
                      : '/logo.png'
                  }
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/logo.png')) {
                      target.src = '/logo.png';
                    }
                  }}
                  alt={`${config.appName} লোগো`}
                  className="h-12 w-12 shrink-0 rounded-2xl border border-slate-200 bg-white p-1 object-contain shadow-xs dark:border-slate-700"
                />
                <div>
                  <h2
                    id="apk-download-modal-title"
                    className="text-base sm:text-lg font-bold text-slate-900 dark:text-white"
                  >
                    {config.appName} — অফিসিয়াল ইনস্টলার
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ভার্সন: {config.appVersion}
                    {config.fileSize && config.fileSize !== '0 MB'
                      ? ` · সাইজ: ${config.fileSize}`
                      : ''}
                    {' · '}
                    {config.minAndroidVersion}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="ডাউনলোড উইন্ডো বন্ধ করুন"
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* MAIN IN-BROWSER DOWNLOAD & INSTALL ENGINE */}
            {hasRealApk ? (
              <div className="mt-5">
                {/* PHASE 1: DOWNLOADING IN BROWSER */}
                {phase === 'downloading' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/30"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      <span className="flex items-center gap-2">
                        <Download className="h-4 w-4 animate-bounce text-emerald-600 dark:text-emerald-400" />
                        <span>ব্রাউজারের মধ্যেই APK ডাউনলোড হচ্ছে...</span>
                      </span>
                      <span className="font-mono-num text-sm text-emerald-700 dark:text-emerald-300">
                        {bengaliPercent}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-emerald-200/70 dark:bg-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progressStats.percent}%` }}
                        transition={{ ease: 'easeOut', duration: 0.15 }}
                      />
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
                      <span className="font-mono-num">
                        {progressStats.loadedMb} MB / {progressStats.totalMb} MB
                      </span>
                      <span>ডাউনলোড শেষ হলেই ইনস্টল বাটন ভেসে উঠবে</span>
                    </div>
                  </motion.div>
                )}

                {/* PHASE 2: COMPLETED -> INSTALL NOW OPTION */}
                {phase === 'completed' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/90 p-4 sm:p-5 dark:border-emerald-500/60 dark:bg-emerald-950/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                        <PackageCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs sm:text-sm font-bold">
                          ডাউনলোড ১০০% সম্পন্ন হয়েছে! ইনস্টল করার জন্য প্রস্তুত
                        </span>
                      </div>
                      <span className="font-mono-num text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        ১০০%
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      আপনার ফোনে <strong>{shareData.apkFileName}</strong> ফাইলটি প্রস্তুত। নিচের{' '}
                      <strong>“এখনই অ্যাপ ইনস্টল করুন”</strong> বাটনে ক্লিক করে মোবাইলে অ্যাপটি ইনস্টল করে নিন।
                    </p>

                    {/* Primary Install APK CTA */}
                    <button
                      type="button"
                      onClick={handleInstallApkTap}
                      className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500 active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <Smartphone className="h-5 w-5 shrink-0" />
                      <span>এখনই অ্যাপ ইনস্টল করুন (Install APK)</span>
                    </button>

                    {/* Interactive Install Prompt Helper when Install is clicked */}
                    <div className="mt-3.5 rounded-xl border border-emerald-200/90 bg-white/90 p-3 text-xs text-slate-700 dark:border-emerald-800/60 dark:bg-slate-900/90 dark:text-slate-300">
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>
                          {installPromptClicked
                            ? 'আপনার ব্রাউজারের নিচে বা উপরে "Open" অপশনটি দেখুন:'
                            : 'মোবাইলে ইনস্টল করার সহজ নিয়ম:'}
                        </span>
                      </p>
                      <div className="mt-2 space-y-1.5 text-[11px] sm:text-xs">
                        <p className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                          <span>
                            ১. ইনস্টল বাটনে ক্লিক করার পর ব্রাউজারের নোটিফিকেশনে ভেসে ওঠা{' '}
                            <strong className="text-emerald-700 dark:text-emerald-300">
                              "Open" (খুলুন)
                            </strong>{' '}
                            বাটনে ট্যাপ করুন।
                          </span>
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                          <span>
                            ২. ব্রাউজার পারমিশন চাইলে{' '}
                            <strong>"Allow from this source"</strong> অন করে{' '}
                            <strong className="text-emerald-700 dark:text-emerald-300">
                              "Install"
                            </strong>{' '}
                            চাপুন।
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>মোট ডাউনলোড: {formatBengaliNumber(config.downloadCount)}</span>
                      <button
                        type="button"
                        onClick={startInBrowserDownload}
                        className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>পুনরায় ডাউনলোড করুন</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* PHASE 0: READY STATE (If autoStart was false) */}
                {phase === 'ready' && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/30">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                      <span>✓ অফিসিয়াল APK ডাউনলোডের জন্য প্রস্তুত</span>
                      <span className="font-mono-num">{config.appVersion}</span>
                    </div>

                    {config.releaseNotes && (
                      <p className="mt-2 text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
                        <strong>নতুন আপডেটে যা থাকছে:</strong> {config.releaseNotes}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={startInBrowserDownload}
                      className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>
                        ব্রাউজারেই APK ডাউনলোড শুরু করুন
                        {config.fileSize && config.fileSize !== '0 MB'
                          ? ` (${config.fileSize})`
                          : ''}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/60 dark:bg-amber-950/30">
                <div className="flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="font-bold">নতুন ভার্সনের APK আপডেট কাজ চলছে</p>
                    <p className="mt-1 leading-relaxed">
                      খুব শীঘ্রই এখানে সরাসরি ডাউনলোড লিংক যুক্ত হয়ে যাবে। জরুরি প্রয়োজনে নিচে আমাদের টেলিগ্রাম সাপোর্টে মেসেজ দিন।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SHAREABLE APK LINK SECTION */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                  <Link2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>অ্যাপ ও APK ডাউনলোড লিংক শেয়ার করুন</span>
                </span>
              </div>

              <div className="mt-2.5 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  aria-label="শেয়ার করার ডাউনলোড লিংক"
                  value={
                    hasRealApk ? cleanApkUrl : shareData.portalDownloadUrl
                  }
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-mono text-slate-700 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                />

                <button
                  type="button"
                  onClick={() =>
                    handleCopyLink(
                      hasRealApk ? cleanApkUrl : shareData.portalDownloadUrl,
                      'direct'
                    )
                  }
                  className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  {copiedLinkType === 'direct' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400">কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>APK লিংক কপি</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(shareData.portalDownloadUrl, 'portal')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  {copiedLinkType === 'portal' ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>ওয়েবসাইট ডাউনলোড লিংক কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>ওয়েবসাইট অটো-ডাউনলোড লিংক কপি করুন</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/10 px-2.5 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 transition-colors"
                >
                  <Share2 className="h-3 w-3" />
                  <span>
                    {copiedLinkType === 'share' ? 'শেয়ার মেসেজ কপি হয়েছে!' : 'সরাসরি শেয়ার করুন'}
                  </span>
                </button>
              </div>
            </div>

            {/* Footer Support & Direct Backup Action */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-3.5 text-xs dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Play Protect Verified · ১০০% নিরাপদ</span>
              </div>

              <a
                href={config.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition-colors"
              >
                <span>সাপোর্ট ({config.telegramHandle})</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

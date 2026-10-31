export interface SiteConfig {
  appName: string;
  apkDownloadUrl: string;
  r2BucketPublicDomain: string;
  r2ObjectKey: string;
  appVersion: string;
  fileSize: string;
  telegramHandle: string;
  telegramUrl: string;
  noticeText: string;
  releaseNotes: string;
  downloadCount: number;
  minAndroidVersion: string;
  lastUpdated: string;
  sha256Short: string;
}

export const defaultSiteConfig: SiteConfig = {
  appName: 'স্মার্ট শিক্ষা',
  apkDownloadUrl: 'https://your-r2-domain.r2.dev/app.apk',
  r2BucketPublicDomain: '',
  r2ObjectKey: '',
  appVersion: 'v1.0.0',
  fileSize: '0 MB',
  telegramHandle: '@Fahim_Miya_F',
  telegramUrl: 'https://t.me/Fahim_Miya_F',
  noticeText: 'আমাদের অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ ডাউনলোড পোর্টালে স্বাগতম। যেকোনো কোর্সে কেনার আগে ফ্রি ট্রায়াল এবং সহজ কিস্তিতে ভর্তির সুবিধা রয়েছে।',
  releaseNotes: '',
  downloadCount: 0,
  minAndroidVersion: 'Android 7.0+',
  lastUpdated: 'অক্টোবর ২০২৬',
  sha256Short: 'Play Protect Verified',
};

export const ADMIN_DEFAULT_PIN = '1234';
export const ADMIN_OWNER_EMAIL = 'maiafahim1234@gmail.com';

export function isConfiguredApkUrl(url: string): boolean {
  const clean = url.trim();
  if (!clean) return false;
  if (clean === '#direct-apk-download') return false;
  if (clean === 'https://your-r2-domain.r2.dev/app.apk') return false;
  if (clean.includes('pub-smart-shiksha.r2.dev')) return false;
  return /^https?:\/\//i.test(clean);
}

export function buildCloudflareR2DownloadUrl(
  bucketDomain: string,
  objectKey: string,
  fallbackUrl: string = ''
): string {
  const cleanDomain = bucketDomain.trim().replace(/\/+$/, '');
  const cleanKey = objectKey.trim().replace(/^\/+/, '');
  if (cleanDomain && cleanKey) {
    const withProtocol = /^https?:\/\//i.test(cleanDomain)
      ? cleanDomain
      : `https://${cleanDomain}`;
    return `${withProtocol}/${cleanKey}`;
  }
  return fallbackUrl.trim();
}

export function formatFileSizeMegabytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export function sanitizeSiteConfigForFirestore(config: SiteConfig): SiteConfig {
  const resolvedUrl = buildCloudflareR2DownloadUrl(
    config.r2BucketPublicDomain || '',
    config.r2ObjectKey || '',
    config.apkDownloadUrl
  );
  return {
    appName: (config.appName || defaultSiteConfig.appName).trim().slice(0, 100),
    apkDownloadUrl: (resolvedUrl || defaultSiteConfig.apkDownloadUrl).trim().slice(0, 1000),
    r2BucketPublicDomain: (config.r2BucketPublicDomain || '').trim().slice(0, 500),
    r2ObjectKey: (config.r2ObjectKey || '').trim().slice(0, 300),
    appVersion: (config.appVersion || defaultSiteConfig.appVersion).trim().slice(0, 60),
    fileSize: (config.fileSize || defaultSiteConfig.fileSize).trim().slice(0, 40),
    telegramHandle: (config.telegramHandle || defaultSiteConfig.telegramHandle).trim().slice(0, 80),
    telegramUrl: (config.telegramUrl || defaultSiteConfig.telegramUrl).trim().slice(0, 300),
    noticeText: (config.noticeText || defaultSiteConfig.noticeText).trim().slice(0, 500),
    releaseNotes: (config.releaseNotes || '').trim().slice(0, 1000),
    downloadCount: Math.max(0, Math.min(100000000, Math.round(Number(config.downloadCount) || 0))),
    minAndroidVersion: (config.minAndroidVersion || defaultSiteConfig.minAndroidVersion).trim().slice(0, 50),
    lastUpdated: (config.lastUpdated || defaultSiteConfig.lastUpdated).trim().slice(0, 60),
    sha256Short: (config.sha256Short || defaultSiteConfig.sha256Short).trim().slice(0, 150),
  };
}

export interface UsageStep {
  stepNumber: string;
  bengaliNumber: string;
  title: string;
  subtitle: string;
  description: string;
  highlightPoint: string;
  safetyNote?: string;
  screenStateKey: 'download' | 'device_access' | 'otp_login' | 'course_request' | 'free_trial' | 'installment_pay';
}

export const usageSteps: UsageStep[] = [
  {
    stepNumber: '01',
    bengaliNumber: 'ধাপ ১',
    title: 'অ্যাপ ডাউনলোড ও ইনস্টল',
    subtitle: 'ওয়েবসাইট থেকে সরাসরি APK ফাইল নামান',
    description: 'ওয়েবসাইটের ডাউনলোড বাটন থেকে APK নামিয়ে ফোনে ইনস্টল করুন। কোনো আলাদা অ্যাপ স্টোর একাউন্টের প্রয়োজন নেই।',
    highlightPoint: 'সরাসরি ওয়েবসাইট থেকে অফিশিয়াল APK ডাউনলোড ও ইনস্টল।',
    screenStateKey: 'download',
  },
  {
    stepNumber: '02',
    bengaliNumber: 'ধাপ ২',
    title: 'এক ক্লিকে অ্যাপ অ্যাক্সেস আবেদন (কোনো কোড কপি-পেস্টের ঝামেলা নেই!)',
    subtitle: 'নাম ও মোবাইল নম্বর দিয়ে সরাসরি রিকোয়েস্ট পাঠান',
    description: 'অ্যাপ ওপেন করে আপনার নাম ও মোবাইল নম্বর দিয়ে "অ্যাক্সেসের জন্য আবেদন করুন" বাটনে ক্লিক করুন। সাথে সাথে অ্যাডমিনের কাছে রিকোয়েস্ট চলে যাবে এবং অ্যাডমিন এপ্রুভ করলেই আপনার ফোনে অ্যাপ আনলক হয়ে যাবে!',
    highlightPoint: 'কোনো ডিভাইস কোড কপি-পেস্ট করতে হয় না—এক ক্লিকেই রিকোয়েস্ট চলে যায়।',
    safetyNote: 'বিশেষ নোট: এটি শুধুমাত্র অ্যাপের নিরাপত্তার জন্য, আপনার ফোনের কোনো ব্যক্তিগত তথ্যের ক্ষতি করবে না—১০০% নিরাপদ।',
    screenStateKey: 'device_access',
  },
  {
    stepNumber: '03',
    bengaliNumber: 'ধাপ ৩',
    title: 'মোবাইল নম্বর ও OTP দিয়ে লগইন/নতুন একাউন্ট',
    subtitle: '৪ সংখ্যার ওটিপি কোড দিয়ে দ্রুত রেজিস্ট্রেশন',
    description: 'আপনার মোবাইল নম্বর দিলে ফোনে ৪ সংখ্যার OTP যাবে। OTP বসিয়ে নিজের নাম, ক্লাস ও পাসওয়ার্ড সেট করে একাউন্ট খুলে ফেলুন।',
    highlightPoint: 'মোবাইল নম্বর ও ৪ সংখ্যার OTP দিয়ে নিরাপদ একাউন্ট তৈরি।',
    screenStateKey: 'otp_login',
  },
  {
    stepNumber: '04',
    bengaliNumber: 'ধাপ ৪',
    title: 'পছন্দের কোর্স দেখুন ও এক্সেস নিন',
    subtitle: 'কোর্সের ব্যানার দেখে এক্সেস রিকোয়েস্ট কনফার্ম করুন',
    description: 'অ্যাপের ভেতরে সব কোর্সের পরিষ্কার ব্যানার ও নাম দেখতে পাবেন। আপনার পছন্দের কোর্সের নিচে "কোর্সে এক্সেস পান" বাটনে ক্লিক করে "হ্যাঁ, আমি এক্সেস নিতে চাই" কনফার্ম করুন।',
    highlightPoint: '"কোর্সে এক্সেস পান" → "হ্যাঁ, আমি এক্সেস নিতে চাই" কনফার্মেশন।',
    screenStateKey: 'course_request',
  },
  {
    stepNumber: '05',
    bengaliNumber: 'ধাপ ৫',
    title: 'কেনার আগে ফ্রি ট্রায়াল (Free Trial) দেখুন',
    subtitle: 'ভর্তি হওয়ার আগেই ক্লাস করে মান যাচাই করুন',
    description: 'অ্যাডমিন এক্সেস অনুমোদন করলে আপনি কোর্সের নির্ধারিত মূল্য, কিস্তির প্ল্যান এবং "🎁 ফ্রি ট্রায়াল শুরু করুন" অপশন পাবেন! কেনার আগেই ফ্রিতে ক্লাস করে যাচাই করে নিতে পারবেন।',
    highlightPoint: 'কোর্স কেনার আগেই ফ্রি ক্লাস ও নোট দেখে যাচাই করার সুবিধা।',
    screenStateKey: 'free_trial',
  },
  {
    stepNumber: '06',
    bengaliNumber: 'ধাপ ৬',
    title: 'এককালীন বা সহজ কিস্তিতে ভর্তি',
    subtitle: 'বিকাশ বা নগদে ১, ২ বা ৩ কিস্তিতে পেমেন্ট সুবিধা',
    description: 'ফ্রি ট্রায়াল শেষে বা যেকোনো সময় বিকাশ (bKash) বা নগদ (Nagad) এর মাধ্যমে এককালীন অথবা ২/৩ কিস্তিতে (Installments) পেমেন্ট করে TrxID জমা দিন। অ্যাডমিন এপ্রুভ করলেই কোর্স আনলক হয়ে যাবে!',
    highlightPoint: 'বিকাশ বা নগদে এককালীন অথবা ২/৩ কিস্তিতে পেমেন্ট ও TrxID সাবমিশন।',
    screenStateKey: 'installment_pay',
  },
];

export interface FaqItem {
  id: string;
  category: 'security' | 'trial' | 'payment' | 'support';
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'security',
    question: 'অ্যাপ ওপেন করলে ডিভাইস ভেরিফিকেশন চায় কেন? এতে কি ফোনের কোনো সমস্যা হবে?',
    answer: 'না, এটি ১০০% নিরাপদ। শুধুমাত্র অনুমোদিত শিক্ষার্থীদের ক্লাস করার সুযোগ দিতে এবং পাইরেসি রোধ করতে এই ব্যবস্থা। এটি আপনার ফোনের কোনো ছবি, কন্টাক্ট বা ব্যক্তিগত তথ্যের অ্যাক্সেস নেয় না এবং ফোনের কোনো ক্ষতি করে না।',
  },
  {
    id: 'faq-2',
    category: 'trial',
    question: 'আমি কি কোর্স কেনার আগে ফ্রিতে ক্লাস দেখতে পারব?',
    answer: 'হ্যাঁ! কোর্সে এক্সেস রিকোয়েস্ট পাঠালে অ্যাডমিন আপনাকে ফ্রি ট্রায়াল দিবেন, যা দিয়ে কেনার আগেই ক্লাস দেখতে পারবেন। ফ্রি ট্রায়াল চলাকালীন আপনি ভিডিও লেকচার, কুয়েস্ট ম্যাপ এবং পিডিএফ নোটের মান যাচাই করতে পারবেন।',
  },
  {
    id: 'faq-3',
    category: 'payment',
    question: 'কিস্তিতে ভর্তি হলে পরবর্তী কিস্তি কীভাবে দিব?',
    answer: 'অ্যাপের কোর্স কার্ডেই আপনার পরিশোধিত টাকা, বকেয়া এবং পরবর্তী কিস্তির শেষ তারিখ দেখা যাবে। সেখান থেকেই বিকাশ (bKash) বা নগদে (Nagad) পেমেন্ট করে TrxID সাবমিট করতে পারবেন—কোনো আলাদা হিসাব রাখার চিন্তা নেই।',
  },
  {
    id: 'faq-4',
    category: 'support',
    question: 'অ্যাক্সেস বা পেমেন্ট দ্রুত এপ্রুভ করতে কার সাথে যোগাযোগ করব?',
    answer: 'আমাদের সরাসরি টেলিগ্রাম সাপোর্টে (@Fahim_Miya_F) মেসেজ দিন। আপনার নিবন্ধিত মোবাইল নম্বর বা TrxID লিখে মেসেজ দিলে খুব দ্রুত ডিভাইস অ্যাক্সেস ও কোর্স আনলক করে দেওয়া হয়।',
  },
  {
    id: 'faq-5',
    category: 'security',
    question: 'APK ইনস্টল করার সময় "Install Unknown Apps" দেখালে কী করব?',
    answer: 'যেহেতু আপনি ওয়েবসাইট থেকে সরাসরি অফিসিয়াল APK ডাউনলোড করছেন, তাই অ্যান্ড্রয়েড ব্রাউজার প্রথমবার পারমিশন চায়। তখন "Settings" এ ট্যাপ করে "Allow from this source" অন করে "Install" বাটনে চাপ দিলেই নিরাপদে ইনস্টল হয়ে যাবে।',
  },
  {
    id: 'faq-6',
    category: 'trial',
    question: 'ইন্টারনেট বা এমবি না থাকলে কি ক্লাস করা যাবে?',
    answer: 'হ্যাঁ! আমাদের অ্যাপে অফলাইন ডাউনলোড সুবিধা রয়েছে। ওয়াইফাই বা ডাটা থাকা অবস্থায় অ্যাপের ভেতরে ভিডিও ক্লাস ও লেকচার নোট ডাউনলোড করে রাখলে পরবর্তীতে ইন্টারনেট ছাড়াই যেকোনো সময় দেখতে পারবেন।',
  },
];

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function formatBengaliNumber(num: number): string {
  const formatted = Math.round(num).toLocaleString('en-IN');
  return formatted.replace(/\d/g, (d) => BENGALI_DIGITS[Number(d)] ?? d);
}

export function verifyAdminPin(inputPin: string, expectedPin: string = ADMIN_DEFAULT_PIN): boolean {
  return inputPin.trim() === expectedPin.trim() && expectedPin.trim().length >= 4;
}

export function validateConfigUpdate(partial: Partial<SiteConfig>): {
  valid: boolean;
  error?: string;
} {
  if (partial.appVersion !== undefined && partial.appVersion.trim().length === 0) {
    return { valid: false, error: 'অ্যাপের ভার্সন খালি রাখা যাবে না।' };
  }
  if (partial.fileSize !== undefined && partial.fileSize.trim().length === 0) {
    return { valid: false, error: 'ফাইলের সাইজ খালি রাখা যাবে না।' };
  }
  if (partial.telegramHandle !== undefined && partial.telegramHandle.trim().length === 0) {
    return { valid: false, error: 'টেলিগ্রাম ইউজারনেম খালি রাখা যাবে না।' };
  }
  return { valid: true };
}

export function filterFaqs(
  items: FaqItem[],
  category: 'all' | FaqItem['category'],
  searchQuery: string = ''
): FaqItem[] {
  const q = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    );
  });
}

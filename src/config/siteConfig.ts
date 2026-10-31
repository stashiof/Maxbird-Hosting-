export interface SiteConfig {
  appName: string;
  apkDownloadUrl: string;
  appVersion: string;
  fileSize: string;
  telegramHandle: string;
  telegramUrl: string;
  noticeText: string;
  downloadCount: number;
  minAndroidVersion: string;
  lastUpdated: string;
  sha256Short: string;
  bkashMerchantInfo: string;
  nagadMerchantInfo: string;
}

export const defaultSiteConfig: SiteConfig = {
  appName: 'স্মার্ট শিক্ষা',
  apkDownloadUrl: '#direct-apk-download',
  appVersion: 'v2.5.0 Latest',
  fileSize: '28.4 MB',
  telegramHandle: '@Fahim_Miya_F',
  telegramUrl: 'https://t.me/Fahim_Miya_F',
  noticeText: 'নতুন ব্যাচে ভর্তি চলছে! যেকোনো কোর্সে কেনার আগে ৩ দিনের ফ্রি ট্রায়াল এবং ২ বা ৩ কিস্তিতে ফি পরিশোধের সুবিধা চালু আছে।',
  downloadCount: 14820,
  minAndroidVersion: 'Android 7.0+',
  lastUpdated: 'অক্টোবর ২০২৬',
  sha256Short: '8f4b...e92a (Play Protect Verified)',
  bkashMerchantInfo: 'বিকাশ পেমেন্ট / সেন্ড মানি (অ্যাপের ভেতরে নম্বর দেওয়া আছে)',
  nagadMerchantInfo: 'নগদ পেমেন্ট / সেন্ড মানি (অ্যাপের ভেতরে নম্বর দেওয়া আছে)',
};

export const ADMIN_DEFAULT_PIN = '1234';

export interface CoursePreviewItem {
  id: string;
  title: string;
  category: string;
  classLevel: string;
  totalClasses: number;
  totalNotes: number;
  questChapters: number;
  fullPrice: number;
  trialDays: number;
  freeTrialLessons: number;
  highlightFeature: string;
  chapters: {
    id: string;
    title: string;
    duration: string;
    isFreeTrial: boolean;
    questStatus: 'completed' | 'unlocked' | 'locked';
  }[];
}

export const sampleCourses: CoursePreviewItem[] = [
  {
    id: 'hsc-science-master',
    title: 'এইচএসসি বিজ্ঞান — পূর্ণাঙ্গ একাডেমিক ও অ্যাডমিশন ফাউন্ডেশন',
    category: 'বিজ্ঞান বিভাগ',
    classLevel: 'HSC ২৫ ও ২৬ ব্যাচ',
    totalClasses: 145,
    totalNotes: 90,
    questChapters: 24,
    fullPrice: 3000,
    trialDays: 3,
    freeTrialLessons: 6,
    highlightFeature: 'পদার্থ, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞান — অ্যানিমেটেড লেসন ও কুয়েস্ট ম্যাপসহ',
    chapters: [
      { id: 'c1', title: 'অধ্যায় ১: ভেক্টর ও ত্রিমাত্রিক স্থানাঙ্ক (ফ্রি ট্রায়াল)', duration: '৪৮ মিনিট', isFreeTrial: true, questStatus: 'completed' },
      { id: 'c2', title: 'অধ্যায় ২: গতিবিদ্যা ও প্রাসের সমীকরণ (ফ্রি ট্রায়াল)', duration: '৫৫ মিনিট', isFreeTrial: true, questStatus: 'unlocked' },
      { id: 'c3', title: 'অধ্যায় ৩: নিউটনিয়ান বলবিদ্যা ও সংঘর্ষ', duration: '৬২ মিনিট', isFreeTrial: false, questStatus: 'locked' },
      { id: 'c4', title: 'অধ্যায় ৪: কাজ, শক্তি ও ক্ষমতা — কুয়েস্ট চ্যালেঞ্জ', duration: '৫০ মিনিট', isFreeTrial: false, questStatus: 'locked' },
    ],
  },
  {
    id: 'ssc-complete-prep',
    title: 'এসএসসি পদার্থ, রসায়ন ও সাধারণ গণিত — স্পেশাল ক্র্যাশ ও মাস্টার কোর্স',
    category: 'মাধ্যমিক (SSC)',
    classLevel: 'নবম ও দশম শ্রেণি',
    totalClasses: 110,
    totalNotes: 75,
    questChapters: 18,
    fullPrice: 2100,
    trialDays: 3,
    freeTrialLessons: 5,
    highlightFeature: 'অধ্যায়ভিত্তিক বোর্ড প্রশ্ন সমাধান, মডেল টেস্ট ও অফলাইন ভিডিও ডাউনলোড',
    chapters: [
      { id: 's1', title: 'অধ্যায় ১: ভৌত রাশি এবং পরিমাপ (ফ্রি ট্রায়াল)', duration: '৪২ মিনিট', isFreeTrial: true, questStatus: 'completed' },
      { id: 's2', title: 'অধ্যায় ২: গতি ও লেখচিত্র বিশ্লেষণ (ফ্রি ট্রায়াল)', duration: '৪৯ মিনিট', isFreeTrial: true, questStatus: 'unlocked' },
      { id: 's3', title: 'অধ্যায় ৩: বল ও ঘর্ষণ বলের গাণিতিক সমস্যা', duration: '৫৪ মিনিট', isFreeTrial: false, questStatus: 'locked' },
      { id: 's4', title: 'অধ্যায় ৪: রাসায়নিক বন্ধন ও পর্যায় সারণি', duration: '৫৮ মিনিট', isFreeTrial: false, questStatus: 'locked' },
    ],
  },
  {
    id: 'english-ict-skill',
    title: 'ইংরেজি গ্রামার ও আইসিটি (HTML, C Programming & Number System)',
    category: 'সবার জন্য আবশ্যিক',
    classLevel: 'SSC ও HSC শিক্ষার্থী',
    totalClasses: 85,
    totalNotes: 60,
    questChapters: 15,
    fullPrice: 1500,
    trialDays: 3,
    freeTrialLessons: 4,
    highlightFeature: 'সহজ বাংলায় কোডিং ল্যাব, গ্রামার রুলস এবং পিডিএফ স্মার্ট নোটস',
    chapters: [
      { id: 'e1', title: 'লেসন ১: সংখ্যা পদ্ধতি ও বাইনারি রূপান্তর (ফ্রি ট্রায়াল)', duration: '৩৮ মিনিট', isFreeTrial: true, questStatus: 'completed' },
      { id: 'e2', title: 'লেসন ২: ডিজিটাল ডিভাইস ও লজিক গেট (ফ্রি ট্রায়াল)', duration: '৪৫ মিনিট', isFreeTrial: true, questStatus: 'unlocked' },
      { id: 'e3', title: 'লেসন ৩: ওয়েব ডিজাইন ও HTML ট্যাগ প্র্যাকটিস', duration: '৫২ মিনিট', isFreeTrial: false, questStatus: 'locked' },
      { id: 'e4', title: 'লেসন ৪: C Programming — লুপ ও কন্ডিশন কুয়েস্ট', duration: '৬০ মিনিট', isFreeTrial: false, questStatus: 'locked' },
    ],
  },
];

export interface UsageStep {
  stepNumber: string;
  bengaliNumber: string;
  title: string;
  subtitle: string;
  description: string;
  actionButtonText: string;
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
    actionButtonText: '📥 অফিসিয়াল অ্যাপ ডাউনলোড করুন (APK)',
    screenStateKey: 'download',
  },
  {
    stepNumber: '02',
    bengaliNumber: 'ধাপ ২',
    title: 'এক ক্লিকে অ্যাপ অ্যাক্সেস আবেদন (কোনো কোড কপি-পেস্টের ঝামেলা নেই!)',
    subtitle: 'নাম ও মোবাইল নম্বর দিয়ে সরাসরি রিকোয়েস্ট পাঠান',
    description: 'অ্যাপ ওপেন করে আপনার নাম ও মোবাইল নম্বর দিয়ে "অ্যাক্সেসের জন্য আবেদন করুন" বাটনে ক্লিক করুন। সাথে সাথে অ্যাডমিনের কাছে রিকোয়েস্ট চলে যাবে এবং অ্যাডমিন এপ্রুভ করলেই আপনার ফোনে অ্যাপ আনলক হয়ে যাবে!',
    actionButtonText: 'অ্যাক্সেসের জন্য আবেদন করুন',
    safetyNote: 'বিশেষ নোট: এটি শুধুমাত্র অ্যাপের নিরাপত্তার জন্য, আপনার ফোনের কোনো ব্যক্তিগত তথ্যের ক্ষতি করবে না—১০০% নিরাপদ।',
    screenStateKey: 'device_access',
  },
  {
    stepNumber: '03',
    bengaliNumber: 'ধাপ ৩',
    title: 'মোবাইল নম্বর ও OTP দিয়ে লগইন/নতুন একাউন্ট',
    subtitle: '৪ সংখ্যার ওটিপি কোড দিয়ে দ্রুত রেজিস্ট্রেশন',
    description: 'আপনার মোবাইল নম্বর দিলে ফোনে ৪ সংখ্যার OTP যাবে। OTP বসিয়ে নিজের নাম, ক্লাস ও পাসওয়ার্ড সেট করে একাউন্ট খুলে ফেলুন।',
    actionButtonText: 'OTP যাচাই ও একাউন্ট তৈরি করুন',
    screenStateKey: 'otp_login',
  },
  {
    stepNumber: '04',
    bengaliNumber: 'ধাপ ৪',
    title: 'পছন্দের কোর্স দেখুন ও এক্সেস নিন',
    subtitle: 'কোর্সের ব্যানার দেখে এক্সেস রিকোয়েস্ট কনফার্ম করুন',
    description: 'অ্যাপের ভেতরে সব কোর্সের পরিষ্কার ব্যানার ও নাম দেখতে পাবেন। আপনার পছন্দের কোর্সের নিচে "কোর্সে এক্সেস পান" বাটনে ক্লিক করে "হ্যাঁ, আমি এক্সেস নিতে চাই" কনফার্ম করুন।',
    actionButtonText: 'হ্যাঁ, আমি এক্সেস নিতে চাই',
    screenStateKey: 'course_request',
  },
  {
    stepNumber: '05',
    bengaliNumber: 'ধাপ ৫',
    title: 'কেনার আগে ফ্রি ট্রায়াল (Free Trial) দেখুন',
    subtitle: 'ভর্তি হওয়ার আগেই ক্লাস করে মান যাচাই করুন',
    description: 'অ্যাডমিন এক্সেস অনুমোদন করলে আপনি কোর্সের নির্ধারিত মূল্য, কিস্তির প্ল্যান এবং "🎁 ফ্রি ট্রায়াল শুরু করুন" অপশন পাবেন! কেনার আগেই ফ্রিতে ক্লাস করে যাচাই করে নিতে পারবেন।',
    actionButtonText: '🎁 ফ্রি ট্রায়াল শুরু করুন',
    screenStateKey: 'free_trial',
  },
  {
    stepNumber: '06',
    bengaliNumber: 'ধাপ ৬',
    title: 'এককালীন বা সহজ কিস্তিতে ভর্তি',
    subtitle: 'বিকাশ বা নগদে ১, ২ বা ৩ কিস্তিতে পেমেন্ট সুবিধা',
    description: 'ফ্রি ট্রায়াল শেষে বা যেকোনো সময় বিকাশ (bKash) বা নগদ (Nagad) এর মাধ্যমে এককালীন অথবা ২/৩ কিস্তিতে (Installments) পেমেন্ট করে TrxID জমা দিন। অ্যাডমিন এপ্রুভ করলেই কোর্স আনলক হয়ে যাবে!',
    actionButtonText: 'TrxID জমা দিয়ে কোর্স আনলক করুন',
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

export interface InstallmentBreakdown {
  installmentCount: 1 | 2 | 3;
  totalAmount: number;
  perInstallmentAmount: number;
  firstPaymentNow: number;
  remainingBalance: number;
  schedule: {
    installmentNo: number;
    label: string;
    amount: number;
    dueTimeline: string;
  }[];
}

export function calculateInstallmentPlan(
  fullPrice: number,
  installmentCount: 1 | 2 | 3
): InstallmentBreakdown {
  const safePrice = Math.max(0, Math.round(fullPrice));
  if (installmentCount === 1) {
    return {
      installmentCount: 1,
      totalAmount: safePrice,
      perInstallmentAmount: safePrice,
      firstPaymentNow: safePrice,
      remainingBalance: 0,
      schedule: [
        {
          installmentNo: 1,
          label: 'এককালীন সম্পূর্ণ পেমেন্ট',
          amount: safePrice,
          dueTimeline: 'ভর্তির সময় (কোনো বকেয়া নেই)',
        },
      ],
    };
  }

  if (installmentCount === 2) {
    const first = Math.ceil(safePrice / 2);
    const second = safePrice - first;
    return {
      installmentCount: 2,
      totalAmount: safePrice,
      perInstallmentAmount: first,
      firstPaymentNow: first,
      remainingBalance: second,
      schedule: [
        {
          installmentNo: 1,
          label: '১ম কিস্তি (কোর্স আনলক)',
          amount: first,
          dueTimeline: 'ভর্তির সময় পরিশোধযোগ্য',
        },
        {
          installmentNo: 2,
          label: '২য় কিস্তি (চূড়ান্ত কিস্তি)',
          amount: second,
          dueTimeline: 'ভর্তির ৩০ দিন পর',
        },
      ],
    };
  }

  const first = Math.ceil(safePrice / 3);
  const second = Math.ceil((safePrice - first) / 2);
  const third = safePrice - first - second;

  return {
    installmentCount: 3,
    totalAmount: safePrice,
    perInstallmentAmount: first,
    firstPaymentNow: first,
    remainingBalance: safePrice - first,
    schedule: [
      {
        installmentNo: 1,
        label: '১ম কিস্তি (কোর্স আনলক)',
        amount: first,
        dueTimeline: 'ভর্তির সময় পরিশোধযোগ্য',
      },
      {
        installmentNo: 2,
        label: '২য় কিস্তি',
        amount: second,
        dueTimeline: 'ভর্তির ২৫ দিন পর',
      },
      {
        installmentNo: 3,
        label: '৩য় কিস্তি (চূড়ান্ত কিস্তি)',
        amount: third,
        dueTimeline: 'ভর্তির ৫০ দিন পর',
      },
    ],
  };
}

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
  if (partial.apkDownloadUrl !== undefined && partial.apkDownloadUrl.trim().length === 0) {
    return { valid: false, error: 'ডাউনলোড লিংক খালি রাখা যাবে না।' };
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

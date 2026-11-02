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
  appIconUrl?: string;
  appScreenshots?: string[];
}

export const defaultSiteConfig: SiteConfig = {
  appName: 'Maxbird',
  apkDownloadUrl: 'https://pub-aa3b7c689e544e9b8b6f15e1bff27cf9.r2.dev/apk/Maxbird-v1.0.0-1793582027.apk',
  r2BucketPublicDomain: '',
  r2ObjectKey: 'apk/Maxbird-v1.0.0-1793582027.apk',
  appVersion: 'v1.0.7',
  fileSize: '9.6 MB',
  telegramHandle: '@Fahim_Miya_F',
  telegramUrl: 'https://t.me/Fahim_Miya_F',
  noticeText: 'Maxbird অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ ডাউনলোড পোর্টালে স্বাগতম।',
  releaseNotes: 'উন্নত ফিউচার।',
  downloadCount: 5,
  minAndroidVersion: 'Android 8.0+',
  lastUpdated: 'নভেম্বর ২০২৬',
  sha256Short: 'Play Protect Verified',
  appIconUrl: '/logo.png',
  appScreenshots: [],
};

export const ADMIN_DEFAULT_PIN = '1234';
export const ADMIN_OWNER_EMAIL = 'maiafahim1234@gmail.com';

export function sanitizeScreenshotsList(raw: unknown): string[] {
  if (!raw) return [];
  const items: string[] = Array.isArray(raw)
    ? raw.map((item) => String(item ?? '').trim())
    : typeof raw === 'string'
    ? raw.split(/[\n,]+/).map((s) => s.trim())
    : [];
  return items
    .filter((url) => url.length > 0 && /^https?:\/\//i.test(url))
    .map((url) => url.slice(0, 1000))
    .slice(0, 15);
}

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

export function parseFileSizeMegabytes(fileSizeStr: string, fallbackMb: number = 9.6): number {
  if (!fileSizeStr || typeof fileSizeStr !== 'string') return fallbackMb;
  const match = fileSizeStr.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  if (!match) return fallbackMb;
  const parsed = parseFloat(match[1]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackMb;
}

export function calculateDownloadProgress(
  loadedBytes: number,
  totalBytes: number
): {
  percent: number;
  loadedMb: string;
  totalMb: string;
} {
  const safeTotal = Number.isFinite(totalBytes) && totalBytes > 0 ? totalBytes : 9.6 * 1024 * 1024;
  const safeLoaded = Math.max(0, Math.min(safeTotal, Number.isFinite(loadedBytes) ? loadedBytes : 0));
  const percent = Math.min(100, Math.max(0, Math.round((safeLoaded / safeTotal) * 100)));
  const loadedMb = (safeLoaded / (1024 * 1024)).toFixed(1);
  const totalMb = (safeTotal / (1024 * 1024)).toFixed(1);
  return { percent, loadedMb, totalMb };
}

export function buildApkFileName(appName: string, appVersion: string): string {
  const cleanName = (appName || 'Maxbird').trim().replace(/[^a-zA-Z0-9_-]/g, '') || 'Maxbird';
  const cleanVer = (appVersion || 'v1.0.7').trim().replace(/[^a-zA-Z0-9._-]/g, '') || 'v1.0.7';
  return `${cleanName}-${cleanVer}.apk`;
}

export function buildShareableApkLinks(
  originOrCurrentUrl: string,
  config: Pick<SiteConfig, 'appName' | 'appVersion' | 'fileSize' | 'apkDownloadUrl'>
): {
  portalDownloadUrl: string;
  directApkUrl: string;
  apkFileName: string;
  shareTitle: string;
  shareText: string;
} {
  let baseOrigin = 'https://maxbird.pages.dev';
  try {
    if (originOrCurrentUrl && /^https?:\/\//i.test(originOrCurrentUrl.trim())) {
      const parsed = new URL(originOrCurrentUrl.trim());
      baseOrigin = `${parsed.origin}${parsed.pathname.replace(/\/+$/, '')}`;
    }
  } catch {
    // fallback to default
  }
  const portalDownloadUrl = `${baseOrigin}/?download=1`;
  const directApkUrl = (config.apkDownloadUrl || '').trim();
  const apkFileName = buildApkFileName(config.appName, config.appVersion);
  const shareTitle = `${config.appName} (${config.appVersion}) — অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ`;
  const shareText = `📲 ${config.appName} অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ (${config.appVersion}${
    config.fileSize ? ` · ${config.fileSize}` : ''
  }) ডাউনলোড ও ইনস্টল লিংক:\n🌐 ওয়েবসাইট থেকে সরাসরি ডাউনলোড: ${portalDownloadUrl}${
    isConfiguredApkUrl(directApkUrl) ? `\n📦 সরাসরি APK ফাইল লিংক: ${directApkUrl}` : ''
  }`;

  return {
    portalDownloadUrl,
    directApkUrl,
    apkFileName,
    shareTitle,
    shareText,
  };
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
    appIconUrl: (config.appIconUrl || '').trim().slice(0, 1000),
    appScreenshots: sanitizeScreenshotsList(config.appScreenshots),
  };
}

export function normalizeWorkerBaseUrl(url: string): string {
  const clean = url.trim().replace(/\/+$/, '');
  if (!clean) return '';
  if (clean.includes('your-portal-worker.workers.dev') || clean.includes('your-r2-domain.r2.dev')) {
    return '';
  }
  return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
}

export function buildWorkerApiEndpoints(workerBaseUrl: string) {
  const base = normalizeWorkerBaseUrl(workerBaseUrl);
  return {
    base,
    configUrl: base ? `${base}/api/config` : '',
    downloadHitUrl: base ? `${base}/api/download-hit` : '',
    releaseUploadUrl: (objectKey: string) => {
      const cleanKey = objectKey.trim().replace(/^\/+/, '');
      return base && cleanKey ? `${base}/${cleanKey}` : '';
    },
  };
}

export async function fetchCloudflarePortalConfig(workerBaseUrl: string): Promise<{
  ok: boolean;
  exists: boolean;
  config?: SiteConfig;
  error?: string;
}> {
  const endpoints = buildWorkerApiEndpoints(workerBaseUrl);
  if (!endpoints.configUrl) {
    return { ok: false, exists: false, error: 'Cloudflare Worker URL কনফিগার করা হয়নি।' };
  }
  try {
    const res = await fetch(endpoints.configUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return {
        ok: false,
        exists: false,
        error: `Worker রেসপন্স ত্রুটি (HTTP ${res.status})`,
      };
    }
    const data = await res.json();
    if (data && data.exists && data.config) {
      const merged = sanitizeSiteConfigForFirestore({
        ...defaultSiteConfig,
        ...data.config,
      });
      return { ok: true, exists: true, config: merged };
    }
    return { ok: true, exists: false };
  } catch (err) {
    return {
      ok: false,
      exists: false,
      error:
        err instanceof Error
          ? `Cloudflare Worker-এ কানেক্ট করা যায়নি: ${err.message}`
          : 'Cloudflare Worker-এ কানেক্ট করা যায়নি।',
    };
  }
}

export async function saveCloudflarePortalConfig(
  workerBaseUrl: string,
  secretKey: string,
  config: SiteConfig
): Promise<{ ok: boolean; config?: SiteConfig; error?: string }> {
  const endpoints = buildWorkerApiEndpoints(workerBaseUrl);
  if (!endpoints.configUrl) {
    return { ok: false, error: 'প্রথমে ধাপ ১-এ আপনার Cloudflare Worker URL যুক্ত করুন।' };
  }
  if (!secretKey.trim()) {
    return { ok: false, error: 'প্রথমে ধাপ ১-এ আপনার Admin Secret Key দিন।' };
  }
  const cleanPayload = sanitizeSiteConfigForFirestore(config);
  try {
    const res = await fetch(endpoints.configUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Auth-Key': secretKey.trim(),
      },
      body: JSON.stringify(cleanPayload),
    });
    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        error: `Cloudflare সেভ ব্যর্থ (HTTP ${res.status}): ${text || 'Secret Key চেক করুন।'}`,
      };
    }
    return { ok: true, config: cleanPayload };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? `Cloudflare নেটওয়ার্ক ত্রুটি: ${err.message}`
          : 'Cloudflare Worker-এ সেভ করা যায়নি।',
    };
  }
}

export async function incrementCloudflareDownloadCount(
  workerBaseUrl: string
): Promise<{ ok: boolean; downloadCount?: number }> {
  const endpoints = buildWorkerApiEndpoints(workerBaseUrl);
  if (!endpoints.downloadHitUrl) return { ok: false };
  try {
    const res = await fetch(endpoints.downloadHitUrl, { method: 'POST' });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    return {
      ok: true,
      downloadCount: typeof data?.downloadCount === 'number' ? data.downloadCount : undefined,
    };
  } catch {
    return { ok: false };
  }
}


export const CLOUDFLARE_ALL_IN_ONE_WORKER_SCRIPT = `/**
 * ১০০% ক্লাউডফ্লেয়ার (All-in-One Cloudflare Worker + R2 Database & APK Storage)
 * ----------------------------------------------------------------------------
 * সেটআপ নিয়ম (মাত্র ৩টি ধাপ):
 * ১. Cloudflare Dashboard -> R2 -> একটি বাকেট তৈরি করুন (যেমন: apk-storage)
 * ২. Workers & Pages -> একটি Worker তৈরি করুন -> Settings -> Bindings এ গিয়ে:
 *    - R2 Bucket Binding যোগ করুন: Variable name দিন: APK_BUCKET
 *    - Environment Variable (Secret) যোগ করুন: Variable name দিন: ADMIN_SECRET_KEY (আপনার গোপন পাসওয়ার্ড)
 * ৩. এই সম্পূর্ণ কোডটি Worker-এ পেস্ট করে Deploy করুন!
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Custom-Auth-Key",
};

const CONFIG_KEY = "portal-config.json";

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/^\\/+/, "");

    // ১. ওয়েবসাইটের লাইভ ডাটাবেজ পড়া (GET /api/config)
    if (path === "api/config" && request.method === "GET") {
      const obj = await env.APK_BUCKET.get(CONFIG_KEY);
      if (!obj) {
        return new Response(JSON.stringify({ exists: false }), {
          status: 200,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json", "Cache-Control": "no-store" },
        });
      }
      const data = await obj.json();
      return new Response(JSON.stringify({ exists: true, config: data }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }

    // ২. অ্যাডমিন প্যানেল থেকে ওয়েবসাইটের ডাটাবেজ সেভ করা (PUT /api/config)
    if (path === "api/config" && request.method === "PUT") {
      const authKey = request.headers.get("X-Custom-Auth-Key");
      if (!env.ADMIN_SECRET_KEY || authKey !== env.ADMIN_SECRET_KEY) {
        return new Response(JSON.stringify({ error: "Unauthorized: ভুল Admin Secret Key" }), {
          status: 401,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
      const body = await request.json();
      await env.APK_BUCKET.put(CONFIG_KEY, JSON.stringify(body), {
        httpMetadata: { contentType: "application/json" },
      });
      return new Response(JSON.stringify({ ok: true, config: body }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // ৩. ডাউনলোড কাউন্টার +১ বাড়ানো (POST /api/download-hit)
    if (path === "api/download-hit" && request.method === "POST") {
      const obj = await env.APK_BUCKET.get(CONFIG_KEY);
      let currentConfig = {};
      if (obj) {
        currentConfig = await obj.json();
      }
      const nextCount = (Number(currentConfig.downloadCount) || 0) + 1;
      const updated = { ...currentConfig, downloadCount: nextCount };
      await env.APK_BUCKET.put(CONFIG_KEY, JSON.stringify(updated), {
        httpMetadata: { contentType: "application/json" },
      });
      return new Response(JSON.stringify({ ok: true, downloadCount: nextCount }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // ৪. সরাসরি .apk ফাইল R2 বাকেটে আপলোড করা (PUT /releases/filename.apk)
    if (request.method === "PUT" && path.startsWith("releases/")) {
      const authKey = request.headers.get("X-Custom-Auth-Key");
      if (!env.ADMIN_SECRET_KEY || authKey !== env.ADMIN_SECRET_KEY) {
        return new Response("Unauthorized: ভুল Admin Secret Key", {
          status: 401,
          headers: CORS_HEADERS,
        });
      }
      await env.APK_BUCKET.put(path, request.body, {
        httpMetadata: {
          contentType: "application/vnd.android.package-archive",
          contentDisposition: \`attachment; filename="\${path.split("/").pop()}"\`,
        },
      });
      return new Response(
        JSON.stringify({ ok: true, downloadUrl: \`\${url.origin}/\${path}\` }),
        { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    // ৫. শিক্ষার্থীদের জন্য সরাসরি .apk ফাইল ডাউনলোড (GET /releases/filename.apk)
    if (request.method === "GET" && path.startsWith("releases/")) {
      const object = await env.APK_BUCKET.get(path);
      if (!object) {
        return new Response("APK File Not Found in R2", { status: 404, headers: CORS_HEADERS });
      }
      const headers = new Headers(CORS_HEADERS);
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("Content-Type", "application/vnd.android.package-archive");
      headers.set("Content-Disposition", \`attachment; filename="\${path.split("/").pop()}"\`);
      return new Response(object.body, { headers });
    }

    return new Response("Cloudflare Portal Worker Active", { status: 200, headers: CORS_HEADERS });
  },
};`;


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
    title: 'APK ডাউনলোড ও ইনস্টল',
    subtitle: 'সরাসরি ফোনে নামিয়ে ইনস্টল করুন',
    description: 'ডাউনলোড বাটন থেকে APK ফাইলটি নামিয়ে ওপেন করুন। ব্রাউজার প্রথমবার পারমিশন চাইলে সেটিংস থেকে "Allow from this source" অন করে Install দিন।',
    highlightPoint: '১০০% নিরাপদ ও Play Protect Friendly অফিশিয়াল ফাইল',
    screenStateKey: 'download',
  },
  {
    stepNumber: '02',
    bengaliNumber: 'ধাপ ২',
    title: 'ওয়ান-ক্লিক ডিভাইস আনলক ও লগইন',
    subtitle: 'নাম, মোবাইল নম্বর ও ৪ সংখ্যার OTP',
    description: 'অ্যাপ খুলে আপনার নাম ও মোবাইল নম্বর দিয়ে রিকোয়েস্ট পাঠান (কোনো কোড কপি-পেস্টের ঝামেলা নেই)। অ্যাডমিন এপ্রুভ করলে ৪ সংখ্যার OTP দিয়ে নিজের একাউন্ট খুলে নিন।',
    highlightPoint: 'এক ক্লিকেই নিরাপদ ডিভাইস ভেরিফিকেশন ও লগইন',
    screenStateKey: 'device_access',
  },
  {
    stepNumber: '03',
    bengaliNumber: 'ধাপ ৩',
    title: 'পছন্দের কোর্সে ফ্রি ট্রায়াল যাচাই',
    subtitle: 'ভর্তির আগেই ক্লাস ও নোট দেখার সুযোগ',
    description: 'যেকোনো কোর্সের নিচে "কোর্সে এক্সেস পান" বাটনে ট্যাপ করুন। অ্যাডমিন এক্সেস দিলেই "🎁 ফ্রি ট্রায়াল শুরু করুন" বাটনে ক্লিক করে ভিডিও ক্লাস ও নোট যাচাই করতে পারবেন।',
    highlightPoint: 'কোনো ফি ছাড়াই আগে ক্লাস করে মান যাচাইয়ের সুবিধা',
    screenStateKey: 'free_trial',
  },
  {
    stepNumber: '04',
    bengaliNumber: 'ধাপ ৪',
    title: 'এককালীন বা সহজ কিস্তিতে ভর্তি',
    subtitle: 'বিকাশ বা নগদে ১, ২ বা ৩ কিস্তি সুবিধা',
    description: 'ক্লাস ভালো লাগলে বিকাশ (bKash) বা নগদে (Nagad) এককালীন অথবা ২/৩ কিস্তিতে পেমেন্ট করে অ্যাপেই TrxID জমা দিন। সাথে সাথে আপনার পূর্ণাঙ্গ কোর্স আনলক হয়ে যাবে।',
    highlightPoint: 'অ্যাপের ভেতরেই কিস্তির হিসাব ও পরবর্তী তারিখের অটো-ট্র্যাকার',
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

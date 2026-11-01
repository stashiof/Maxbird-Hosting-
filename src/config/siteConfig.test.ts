import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBengaliNumber,
  verifyAdminPin,
  validateConfigUpdate,
  filterFaqs,
  faqItems,
  buildCloudflareR2DownloadUrl,
  sanitizeSiteConfigForFirestore,
  isConfiguredApkUrl,
  formatFileSizeMegabytes,
  defaultSiteConfig,
  normalizeWorkerBaseUrl,
  buildWorkerApiEndpoints,
  CLOUDFLARE_ALL_IN_ONE_WORKER_SCRIPT,
} from './siteConfig';

test('formatBengaliNumber converts English numerals to Bengali numerals with formatting', () => {
  assert.equal(formatBengaliNumber(3000), '৩,০০০');
  assert.equal(formatBengaliNumber(14820), '১৪,৮২০');
  assert.equal(formatBengaliNumber(0), '০');
});

test('verifyAdminPin validates admin PIN accurately', () => {
  assert.equal(verifyAdminPin('1234'), true);
  assert.equal(verifyAdminPin(' 1234 '), true);
  assert.equal(verifyAdminPin('0000'), false);
  assert.equal(verifyAdminPin(''), false);
});

test('validateConfigUpdate rejects empty required fields and accepts valid updates', () => {
  assert.equal(validateConfigUpdate({ appVersion: '' }).valid, false);
  assert.equal(
    validateConfigUpdate({
      appVersion: 'v2.6.0 Latest',
      fileSize: '29.1 MB',
      apkDownloadUrl: 'https://example.com/app.apk',
    }).valid,
    true
  );
});

test('filterFaqs filters by category and search query', () => {
  const securityFaqs = filterFaqs(faqItems, 'security');
  assert.equal(securityFaqs.length, 2);

  const paymentFaqs = filterFaqs(faqItems, 'all', 'বিকাশ');
  assert.equal(paymentFaqs.length, 1);
  assert.equal(paymentFaqs[0].id, 'faq-3');
});

test('buildCloudflareR2DownloadUrl constructs clean direct R2 APK URLs', () => {
  assert.equal(
    buildCloudflareR2DownloadUrl('https://pub-123.r2.dev/', '/releases/app-v2.6.apk'),
    'https://pub-123.r2.dev/releases/app-v2.6.apk'
  );
  assert.equal(
    buildCloudflareR2DownloadUrl('pub-123.r2.dev', 'app.apk'),
    'https://pub-123.r2.dev/app.apk'
  );
  assert.equal(
    buildCloudflareR2DownloadUrl('', '', 'https://fallback.example.com/app.apk'),
    'https://fallback.example.com/app.apk'
  );
});

test('isConfiguredApkUrl detects unconfigured placeholder vs real R2 APK URLs', () => {
  assert.equal(isConfiguredApkUrl(''), false);
  assert.equal(isConfiguredApkUrl('https://your-r2-domain.r2.dev/app.apk'), false);
  assert.equal(isConfiguredApkUrl('https://pub-real123.r2.dev/releases/app.apk'), true);
});

test('formatFileSizeMegabytes formats byte counts into MB strings', () => {
  assert.equal(formatFileSizeMegabytes(0), '0 MB');
  assert.equal(formatFileSizeMegabytes(29779558), '28.4 MB');
});

test('sanitizeSiteConfigForFirestore enforces blueprint maxLengths and builds R2 URL', () => {
  const sanitized = sanitizeSiteConfigForFirestore({
    ...defaultSiteConfig,
    r2BucketPublicDomain: 'https://pub-abc.r2.dev/',
    r2ObjectKey: 'v3.0/smart.apk',
    noticeText: 'ক'.repeat(700),
  });
  assert.equal(sanitized.apkDownloadUrl, 'https://pub-abc.r2.dev/v3.0/smart.apk');
  assert.equal(sanitized.noticeText.length, 500);
});

test('normalizeWorkerBaseUrl and buildWorkerApiEndpoints construct 100% Cloudflare endpoints', () => {
  assert.equal(normalizeWorkerBaseUrl(''), '');
  assert.equal(normalizeWorkerBaseUrl('https://your-portal-worker.workers.dev'), '');
  assert.equal(
    normalizeWorkerBaseUrl('smart-portal.fahim.workers.dev/'),
    'https://smart-portal.fahim.workers.dev'
  );

  const endpoints = buildWorkerApiEndpoints('https://smart-portal.fahim.workers.dev/');
  assert.equal(endpoints.configUrl, 'https://smart-portal.fahim.workers.dev/api/config');
  assert.equal(endpoints.downloadHitUrl, 'https://smart-portal.fahim.workers.dev/api/download-hit');
  assert.equal(
    endpoints.releaseUploadUrl('/releases/app-v1.apk'),
    'https://smart-portal.fahim.workers.dev/releases/app-v1.apk'
  );
  assert.ok(CLOUDFLARE_ALL_IN_ONE_WORKER_SCRIPT.includes('APK_BUCKET'));
});


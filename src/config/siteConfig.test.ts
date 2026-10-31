import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateInstallmentPlan,
  formatBengaliNumber,
  verifyAdminPin,
  validateConfigUpdate,
  filterFaqs,
  faqItems,
} from './siteConfig';

test('calculateInstallmentPlan computes 1, 2, and 3 installment breakdowns accurately', () => {
  const onePay = calculateInstallmentPlan(3000, 1);
  assert.equal(onePay.firstPaymentNow, 3000);
  assert.equal(onePay.remainingBalance, 0);
  assert.equal(onePay.schedule.length, 1);

  const twoPay = calculateInstallmentPlan(3000, 2);
  assert.equal(twoPay.firstPaymentNow, 1500);
  assert.equal(twoPay.remainingBalance, 1500);
  assert.equal(twoPay.schedule.length, 2);
  assert.equal(twoPay.schedule[0].amount + twoPay.schedule[1].amount, 3000);

  const threePay = calculateInstallmentPlan(2100, 3);
  assert.equal(threePay.firstPaymentNow, 700);
  assert.equal(threePay.remainingBalance, 1400);
  assert.equal(threePay.schedule.length, 3);
  assert.equal(
    threePay.schedule[0].amount + threePay.schedule[1].amount + threePay.schedule[2].amount,
    2100
  );
});

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
  assert.equal(validateConfigUpdate({ apkDownloadUrl: '   ' }).valid, false);
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

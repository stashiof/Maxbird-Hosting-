import React, { useState } from 'react';
import {
  Download,
  Play,
  CheckCircle2,
  Lock,
  ShieldCheck,
  FileText,
  Smartphone,
  Sparkles,
  Check,
  CreditCard,
  MapPin,
  Volume2,
  WifiOff,
} from 'lucide-react';
import { sampleCourses, formatBengaliNumber } from '../config/siteConfig';

export type PhoneScreenTab = 'courses' | 'player' | 'quest' | 'access';

interface MobileAppMockupProps {
  activeTab: PhoneScreenTab;
  onTabChange: (tab: PhoneScreenTab) => void;
  onTriggerApkDownload: () => void;
  appVersion: string;
}

export const MobileAppMockup: React.FC<MobileAppMockupProps> = ({
  activeTab,
  onTabChange,
  onTriggerApkDownload,
  appVersion,
}) => {
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [accessRequestedCourses, setAccessRequestedCourses] = useState<Record<string, boolean>>({
    'hsc-science-master': true,
  });
  const [confirmingCourseId, setConfirmingCourseId] = useState<string | null>(null);
  const [trialStartedCourses, setTrialStartedCourses] = useState<Record<string, boolean>>({});
  const [offlineSavedLessons, setOfflineSavedLessons] = useState<Record<string, boolean>>({
    c1: true,
  });
  const [activeLessonId, setActiveLessonId] = useState('c1');
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  // Device access demo form state
  const [studentName, setStudentName] = useState('তানভীর আহমেদ');
  const [studentPhone, setStudentPhone] = useState('01712345678');
  const [deviceAccessStatus, setDeviceAccessStatus] = useState<'idle' | 'submitted' | 'approved'>('approved');
  const [formError, setFormError] = useState('');

  const currentCourse = sampleCourses[selectedCourseIdx] || sampleCourses[0];
  const currentLesson =
    currentCourse.chapters.find((c) => c.id === activeLessonId) || currentCourse.chapters[0];

  const handleRequestDeviceAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || studentPhone.trim().length < 11) {
      setFormError('অনুগ্রহ করে সঠিক নাম এবং ১১ সংখ্যার মোবাইল নম্বর দিন।');
      return;
    }
    setFormError('');
    setDeviceAccessStatus('submitted');
    setTimeout(() => {
      setDeviceAccessStatus('approved');
    }, 900);
  };

  const handleConfirmCourseAccess = (courseId: string) => {
    setAccessRequestedCourses((prev) => ({ ...prev, [courseId]: true }));
    setConfirmingCourseId(null);
  };

  const handleStartFreeTrial = (courseId: string) => {
    setTrialStartedCourses((prev) => ({ ...prev, [courseId]: true }));
    onTabChange('player');
  };

  const toggleOfflineSave = (lessonId: string) => {
    setOfflineSavedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* Interactive Mode Switcher above Phone Frame */}
      <div className="mb-3 flex items-center justify-between gap-1 rounded-xl border border-slate-200/80 bg-white/90 p-1.5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <button
          type="button"
          onClick={() => onTabChange('courses')}
          className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'courses'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          কোর্স ও ট্রায়াল
        </button>
        <button
          type="button"
          onClick={() => onTabChange('player')}
          className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'player'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          ভিডিও ক্লাস
        </button>
        <button
          type="button"
          onClick={() => onTabChange('quest')}
          className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'quest'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          কুয়েস্ট ম্যাপ
        </button>
        <button
          type="button"
          onClick={() => onTabChange('access')}
          className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'access'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          ডিভাইস অ্যাক্সেস
        </button>
      </div>

      {/* Outer Android Hardware Frame */}
      <div className="relative overflow-hidden rounded-[32px] border-[6px] border-slate-900 bg-slate-950 shadow-2xl dark:border-slate-800">
        {/* Android Status Bar */}
        <div className="flex items-center justify-between bg-slate-900 px-5 py-2 text-[11px] text-slate-300">
          <span className="font-mono-num font-medium">10:30 AM</span>
          <div className="h-2.5 w-16 rounded-full bg-slate-950" aria-hidden="true" />
          <span className="font-mono-num text-[10px] text-emerald-400">{appVersion.split(' ')[0]}</span>
        </div>

        {/* In-App Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 py-3 text-white">
          <div>
            <p className="text-xs font-semibold tracking-tight text-emerald-400">স্মার্ট শিক্ষা অ্যাপ</p>
            <p className="text-[11px] text-slate-400">অফিসিয়াল লার্নিং পোর্টাল · ফ্রি ট্রায়াল চালু</p>
          </div>
          <button
            type="button"
            onClick={onTriggerApkDownload}
            aria-label="অ্যাপের ভেতর থেকে ডাউনলোড প্রিভিউ"
            className="rounded-lg bg-emerald-600/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-600/30 transition-colors whitespace-nowrap shrink-0"
          >
            APK ডাউনলোড
          </button>
        </div>

        {/* Phone Body Content Area */}
        <div className="min-h-[430px] bg-slate-950 p-4 text-slate-100">
          {/* TAB 1: COURSES & FREE TRIAL */}
          {activeTab === 'courses' && (
            <div className="space-y-3">
              {/* Course Selector Tabs inside phone */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {sampleCourses.map((course, idx) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => {
                      setSelectedCourseIdx(idx);
                      setActiveLessonId(course.chapters[0].id);
                    }}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selectedCourseIdx === idx
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {course.category}
                  </button>
                ))}
              </div>

              {/* Active Course Card inside phone */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5">
                <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{currentCourse.classLevel}</span>
                  <span>·</span>
                  <span>{formatBengaliNumber(currentCourse.totalClasses)}টি এইচডি ক্লাস</span>
                  <span>·</span>
                  <span className="text-amber-400 font-medium">
                    🎁 {formatBengaliNumber(currentCourse.trialDays)} দিন ফ্রি ট্রায়াল
                  </span>
                </div>

                <h3 className="text-sm font-bold leading-snug text-white">
                  {currentCourse.title}
                </h3>

                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {currentCourse.highlightFeature}
                </p>

                {/* Price & Installment Tracker Preview inside Course Card */}
                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/80 p-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">কোর্স ফি:</span>
                    <span className="font-bold text-white">
                      ৳{formatBengaliNumber(currentCourse.fullPrice)} (অথবা ৩ কিস্তিতে ৳{formatBengaliNumber(Math.ceil(currentCourse.fullPrice / 3))}/কিস্তি)
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-emerald-400">
                    <span>কিস্তি ট্র্যাকার: ১ম কিস্তি শেষে বাকি সময় অ্যাপেই দেখা যাবে</span>
                  </div>
                </div>

                {/* Course Access / Free Trial Interactive Action */}
                <div className="mt-3 space-y-2">
                  {!accessRequestedCourses[currentCourse.id] ? (
                    confirmingCourseId === currentCourse.id ? (
                      <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2.5">
                        <p className="mb-2 text-xs text-emerald-200">
                          আপনি কি এই কোর্সে ফ্রি ট্রায়াল ও কিস্তি সুবিধার এক্সেস নিতে চান?
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleConfirmCourseAccess(currentCourse.id)}
                            className="flex-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                          >
                            হ্যাঁ, আমি এক্সেস নিতে চাই
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmingCourseId(null)}
                            className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
                          >
                            বাতিল
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingCourseId(currentCourse.id)}
                        className="w-full rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0"
                      >
                        কোর্সে এক্সেস পান
                      </button>
                    )
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartFreeTrial(currentCourse.id)}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>🎁 ফ্রি ট্রায়াল শুরু করুন</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onTabChange('quest')}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
                      >
                        <MapPin className="h-3.5 w-3.5 text-amber-400" />
                        <span>কুয়েস্ট ম্যাপ দেখুন</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mini Installment Status Card inside Phone */}
              <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200">💳 কিস্তিতে পেমেন্ট ও TrxID ভেরিফিকেশন</span>
                  <span className="text-[11px] text-emerald-400">bKash / Nagad</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  ফ্রি ট্রায়াল শেষে ১, ২ বা ৩ কিস্তিতে বিকাশ/নগদ TrxID দিলেই সম্পূর্ণ কোর্স আনলক হবে।
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: HD VIDEO PLAYER & OFFLINE DOWNLOAD */}
          {activeTab === 'player' && (
            <div className="space-y-3">
              {/* Simulated Video Screen */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-4">
                <div className="flex items-center justify-between text-[11px] text-emerald-300">
                  <span>🎁 ফ্রি ট্রায়াল ক্লাস চলছে</span>
                  <span className="font-mono-num">1080p HD · 60fps</span>
                </div>

                <div className="my-5 flex flex-col items-center justify-center text-center">
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    aria-label={isPlayingVideo ? 'ভিডিও পজ করুন' : 'ভিডিও প্লে করুন'}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg hover:bg-emerald-400 transition-transform active:scale-95"
                  >
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </button>
                  <p className="mt-2.5 text-xs font-semibold text-white">
                    {currentLesson.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    সময়কাল: {currentLesson.duration} · বাফারিং ছাড়া স্মুথ প্লেয়ার
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-2/3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono-num">
                    <span>18:24</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Volume2 className="h-3 w-3" /> বাংলা অডিও + স্মার্ট নোটস
                    </span>
                    <span>48:00</span>
                  </div>
                </div>
              </div>

              {/* Offline Save & PDF Note Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleOfflineSave(currentLesson.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    offlineSavedLessons[currentLesson.id]
                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {offlineSavedLessons[currentLesson.id] ? (
                    <>
                      <WifiOff className="h-3.5 w-3.5 text-emerald-400" />
                      <span>অফলাইনে ডাউনলোড করা আছে</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" />
                      <span>অফলাইনে ডাউনলোড করুন</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange('quest')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <FileText className="h-3.5 w-3.5 text-amber-400" />
                  <span>স্মার্ট PDF নোট</span>
                </button>
              </div>

              {/* Chapter List inside Player */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-400">অধ্যায়ভিত্তিক ক্লাস তালিকা:</p>
                {currentCourse.chapters.slice(0, 3).map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      if (ch.isFreeTrial) setActiveLessonId(ch.id);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
                      activeLessonId === ch.id
                        ? 'border-emerald-500/50 bg-emerald-950/30 text-white'
                        : 'border-slate-800/80 bg-slate-900/60 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span className="truncate pr-2">{ch.title}</span>
                    {ch.isFreeTrial ? (
                      <span className="text-[10px] font-semibold text-emerald-400 whitespace-nowrap shrink-0">
                        ফ্রি ট্রায়াল
                      </span>
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: QUEST MAP */}
          {activeTab === 'quest' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">🗺️ অধ্যায়ভিত্তিক কুয়েস্ট ম্যাপ</span>
                  <span className="text-[11px] text-amber-400">
                    {formatBengaliNumber(currentCourse.questChapters)}টি চ্যালেঞ্জ ধাপ
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  প্রতিটি ক্লাস শেষে ছোট কুইজ ও মডেল টেস্ট পাস করে পরবর্তী লেভেল আনলক করুন।
                </p>
              </div>

              <div className="space-y-2">
                {currentCourse.chapters.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className={`flex items-center justify-between rounded-xl border p-3 ${
                      ch.questStatus === 'completed'
                        ? 'border-emerald-500/30 bg-emerald-950/20'
                        : ch.questStatus === 'unlocked'
                        ? 'border-amber-500/40 bg-amber-950/20'
                        : 'border-slate-800 bg-slate-900/50 opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          ch.questStatus === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : ch.questStatus === 'unlocked'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {ch.questStatus === 'completed' ? (
                          <Check className="h-4 w-4" />
                        ) : ch.questStatus === 'unlocked' ? (
                          formatBengaliNumber(idx + 1)
                        ) : (
                          <Lock className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-white">{ch.title}</p>
                        <p className="text-[11px] text-slate-400">
                          {ch.questStatus === 'completed'
                            ? 'সম্পন্ন · এমসিকিউ স্কোর: ১০/১০'
                            : ch.questStatus === 'unlocked'
                            ? 'চলমান কুয়েস্ট · ফ্রি ট্রায়ালে উন্মুক্ত'
                            : 'কিস্তি বা এককালীন ভর্তির পর আনলক হবে'}
                        </p>
                      </div>
                    </div>

                    {ch.isFreeTrial && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLessonId(ch.id);
                          onTabChange('player');
                        }}
                        className="ml-2 rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-emerald-400 hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
                      >
                        ক্লাস দেখুন
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ONE-CLICK DEVICE ACCESS REQUEST DEMO */}
          {activeTab === 'access' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>এক ক্লিকে ডিভাইস অ্যাক্সেস (কোনো কোড কপি-পেস্ট নেই!)</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                  অ্যাপ ওপেন করে শুধু নাম ও মোবাইল নম্বর দিয়ে বাটনে চাপ দিন। অ্যাডমিন এপ্রুভ করলেই সাথে সাথে অ্যাপ আনলক হয়ে যাবে।
                </p>
              </div>

              <form onSubmit={handleRequestDeviceAccess} className="space-y-2.5 rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
                <div>
                  <label htmlFor="mockup-student-name" className="block text-[11px] font-medium text-slate-300">
                    আপনার পূর্ণ নাম
                  </label>
                  <input
                    id="mockup-student-name"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="mockup-student-phone" className="block text-[11px] font-medium text-slate-300">
                    মোবাইল নম্বর (OTP ও ভেরিফিকেশনের জন্য)
                  </label>
                  <input
                    id="mockup-student-phone"
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white font-mono-num focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {formError && (
                  <p className="text-[11px] text-rose-400">{formError}</p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
                >
                  অ্যাক্সেসের জন্য আবেদন করুন
                </button>
              </form>

              {deviceAccessStatus === 'submitted' && (
                <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-2.5 text-xs text-amber-200">
                  অ্যাডমিনের কাছে রিকোয়েস্ট পাঠানো হয়েছে... অনুমোদন হচ্ছে।
                </div>
              )}

              {deviceAccessStatus === 'approved' && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2.5 text-xs text-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-300">✓ ডিভাইস অ্যাক্সেস অনুমোদিত!</span>
                    <button
                      type="button"
                      onClick={() => onTabChange('courses')}
                      className="underline text-[11px] text-white hover:text-emerald-200 whitespace-nowrap shrink-0"
                    >
                      কোর্সে যান →
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-300">
                    ১০০% নিরাপদ — আপনার ফোনের কোনো ব্যক্তিগত তথ্যের ক্ষতি করবে না।
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Android Navigation Pill */}
        <div className="flex items-center justify-around border-t border-slate-800 bg-slate-900 px-3 py-2 text-[11px] text-slate-400">
          <button
            type="button"
            onClick={() => onTabChange('courses')}
            className={`flex items-center gap-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'courses' ? 'text-emerald-400' : 'hover:text-slate-200'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>হোম ও কোর্স</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('player')}
            className={`flex items-center gap-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'player' ? 'text-emerald-400' : 'hover:text-slate-200'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>ফ্রি ট্রায়াল</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('access')}
            className={`flex items-center gap-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'access' ? 'text-emerald-400' : 'hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>অ্যাক্সেস</span>
          </button>
        </div>
      </div>
    </div>
  );
};

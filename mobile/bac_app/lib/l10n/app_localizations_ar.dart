// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Arabic (`ar`).
class AppLocalizationsAr extends AppLocalizations {
  AppLocalizationsAr([String locale = 'ar']) : super(locale);

  @override
  String get appTitle => 'BacPrep';

  @override
  String hello(String name) {
    return 'مرحبا $name !';
  }

  @override
  String get todaySession => 'حصة اليوم';

  @override
  String get startSession => 'ابدأ الحصة';

  @override
  String get continueSession => 'متابعة';

  @override
  String get quickReview => 'مراجعة سريعة';

  @override
  String get mockExam => 'امتحان تجريبي';

  @override
  String get yourSubjects => 'موادك';

  @override
  String daysUntilExam(int count) {
    return '$count يوم قبل الامتحان';
  }

  @override
  String get yourProgress => 'تقدمك';

  @override
  String get streak => 'السلسلة';

  @override
  String get totalXp => 'مجموع XP';

  @override
  String get today => 'اليوم';

  @override
  String get bySubject => 'حسب المادة';

  @override
  String get weakPoints => 'نقاط الضعف';

  @override
  String get noWeaknessDetected => 'لا توجد نقاط ضعف. استمر!';

  @override
  String seeMore(int count) {
    return 'عرض الكل ($count)';
  }

  @override
  String get seeLess => 'عرض أقل';

  @override
  String get review => 'مراجعة';

  @override
  String attempts(int count) {
    return '$count محاولات';
  }

  @override
  String skillsMastered(int mastered, int total) {
    return '$mastered / $total مهارات متقنة';
  }

  @override
  String coefficient(String value) {
    return 'معامل $value';
  }

  @override
  String get sessionComplete => 'انتهت الحصة!';

  @override
  String get correct => 'صحيح';

  @override
  String get precision => 'الدقة';

  @override
  String get xp => 'XP';

  @override
  String get backToHome => 'العودة للرئيسية';

  @override
  String get newSession => 'حصة جديدة';

  @override
  String get reviewLesson => 'مراجعة الدرس';

  @override
  String get encourageExcellent => 'ممتاز! أنت تتقن هذه المفاهيم جيدا.';

  @override
  String get encourageGood => 'عمل جيد! واصل التدريب.';

  @override
  String get encourageOk => 'لا بأس! الانتظام هو مفتاح النجاح.';

  @override
  String get encourageKeepGoing => 'كل خطأ فرصة للتعلم. واصل!';

  @override
  String get correctAnswer => 'صحيح!';

  @override
  String get incorrectAnswer => 'خاطئ';

  @override
  String get next => 'التالي';

  @override
  String get seeLesson => 'عرض الدرس';

  @override
  String get seeSteps => 'عرض الخطوات';

  @override
  String get nextStep => 'الخطوة التالية';

  @override
  String get seeAll => 'عرض الكل';

  @override
  String get deepen => 'تعمق أكثر';

  @override
  String get whatIf => 'ماذا لو...؟';

  @override
  String whyWrong(String answer) {
    return 'لماذا \"$answer\" خاطئ:';
  }

  @override
  String correctIs(String answer) {
    return 'الإجابة الصحيحة هي \"$answer\":';
  }

  @override
  String get validate => 'تأكيد';

  @override
  String get hint => 'تلميح';

  @override
  String get hintPenalty => '-30% XP';

  @override
  String get settings => 'الإعدادات';

  @override
  String get bacStream => 'شعبة الباكالوريا';

  @override
  String get dailyGoal => 'الهدف اليومي';

  @override
  String minutesGoal(int count) {
    return '$count دقائق';
  }

  @override
  String get language => 'اللغة';

  @override
  String get french => 'Français';

  @override
  String get arabic => 'العربية';

  @override
  String get notifications => 'الإشعارات';

  @override
  String get studyReminders => 'تذكيرات المراجعة';

  @override
  String get signOut => 'تسجيل الخروج';

  @override
  String get chooseLanguage => 'اختر اللغة';

  @override
  String get exams => 'الامتحانات';

  @override
  String get examBrowser => 'نماذج الباكالوريا';

  @override
  String get skill => 'مهارة';

  @override
  String error(String message) {
    return 'خطأ: $message';
  }

  @override
  String get demoWidgets => 'عرض المكونات';

  @override
  String get testWidgets => 'اختبار المكونات';

  @override
  String get loginTagline => 'استعد للباكالوريا بذكاء';

  @override
  String get signIn => 'تسجيل الدخول';

  @override
  String get signUp => 'إنشاء حساب';

  @override
  String get yourName => 'اسمك';

  @override
  String get email => 'البريد الإلكتروني';

  @override
  String get password => 'كلمة المرور';

  @override
  String get createAccount => 'إنشاء حساب';

  @override
  String get signInAction => 'تسجيل الدخول';

  @override
  String get welcomeTitle => 'مرحبا بك في BacPrep !';

  @override
  String get welcomeBody =>
      'استعد للباكالوريا المغربية بتمارين ذكية، مكيفة لمستواك ولبرنامجك.';

  @override
  String get benefitAdaptiveTitle => 'تعلم تكيفي';

  @override
  String get benefitAdaptiveSubtitle => 'تتكيف التمارين مع مستواك';

  @override
  String get benefitSpacedTitle => 'مراجعة متباعدة';

  @override
  String get benefitSpacedSubtitle => 'راجع في الوقت المناسب لتجنب النسيان';

  @override
  String get benefitAlignedTitle => 'متوافق مع الباكالوريا';

  @override
  String get benefitAlignedSubtitle => 'تمارين على نمط الامتحان الوطني';

  @override
  String get start => 'ابدأ';

  @override
  String get yourStream => 'شعبتك';

  @override
  String get chooseStream => 'اختر شعبتك في الباكالوريا';

  @override
  String get examDateApprox => 'تاريخ الامتحان (تقريبي)';

  @override
  String get pickDate => 'اختر تاريخا';

  @override
  String get startReviewing => 'ابدأ المراجعة';

  @override
  String get byYear => 'حسب السنة';

  @override
  String get bySubjectTab => 'حسب المادة';

  @override
  String get favorites => 'المفضلة';

  @override
  String get noExamAvailable => 'لا توجد امتحانات';

  @override
  String get noFavorites => 'لا توجد مفضلة';

  @override
  String get addFavoritesHint => 'أضف امتحانات إلى مفضلتك\nللوصول السريع';

  @override
  String get filters => 'المرشحات';

  @override
  String get reset => 'إعادة تعيين';

  @override
  String get myStream => 'شعبتي';

  @override
  String get year => 'السنة';

  @override
  String get session => 'الدورة';

  @override
  String get stream => 'الشعبة';

  @override
  String get showAllExams => 'عرض كل الامتحانات';

  @override
  String showResults(int count) {
    return 'عرض $count نتيجة';
  }

  @override
  String examCount(int count) {
    return '$count امتحان';
  }

  @override
  String get examDetailsTitle => 'تفاصيل الامتحان';

  @override
  String get notAttemptedYet => 'لم تجرب هذا الامتحان بعد';

  @override
  String get lastAttempt => 'المحاولة الأخيرة';

  @override
  String get questionsTab => 'الأسئلة';

  @override
  String questions(int count) {
    return 'الأسئلة ($count)';
  }

  @override
  String moreQuestions(int count) {
    return '+$count أسئلة أخرى';
  }

  @override
  String get viewPdf => 'عرض الموضوع (PDF)';

  @override
  String get practice => 'تدريب';

  @override
  String get examMode => 'وضع الامتحان';

  @override
  String get examModeIntro => 'ستبدأ امتحانا محددا بالوقت:';

  @override
  String get rules => 'القواعد:';

  @override
  String get ruleNoExit => '• لا يمكنك الخروج أثناء الامتحان';

  @override
  String get ruleTimed => '• الوقت محدود';

  @override
  String get ruleAutoSubmit => '• سيتم تقديم الامتحان تلقائيا في النهاية';

  @override
  String get cancel => 'إلغاء';

  @override
  String get cantOpenPdf => 'تعذر فتح PDF';

  @override
  String minutes(int count) {
    return '$count دقيقة';
  }

  @override
  String get results => 'النتائج';

  @override
  String get summary => 'ملخص';

  @override
  String get save => 'حفظ';

  @override
  String get perQuestion => 'الأداء حسب السؤال';

  @override
  String get perTopic => 'الأداء حسب الموضوع';

  @override
  String get tipsTitle => 'نصائح للتقدم';

  @override
  String get incorrectPlural => 'خاطئة';

  @override
  String get correctPlural => 'صحيحة';

  @override
  String get points => 'نقاط';

  @override
  String get gradeExcellent => 'ممتاز !';

  @override
  String get gradeVeryGood => 'جيد جدا !';

  @override
  String get gradeGood => 'أحسنت !';

  @override
  String get gradeOk => 'لا بأس !';

  @override
  String get gradeKeepGoing => 'واصل !';

  @override
  String get gradeMorePractice => 'تحتاج إلى مزيد من التدريب';

  @override
  String get home => 'الرئيسية';

  @override
  String get reviewBtn => 'مراجعة';

  @override
  String get retry => 'إعادة المحاولة';

  @override
  String get selectQuestion => 'اختر سؤالا';

  @override
  String get detailedSolution => 'الحل المفصل';

  @override
  String get resolutionSteps => 'خطوات الحل';

  @override
  String get scaleHeader => 'السلم';

  @override
  String get commonMistakes => 'الأخطاء الشائعة';

  @override
  String get tipsHeader => 'نصائح';

  @override
  String get myPerformance => 'أدائي';

  @override
  String get noDataYet => 'لا توجد بيانات بعد';

  @override
  String get completeExamsHint => 'أكمل امتحانات لرؤية أدائك';

  @override
  String get overview => 'نظرة عامة';

  @override
  String get averageScore => 'المعدل';

  @override
  String get bestScore => 'الأفضل';

  @override
  String get totalTime => 'الوقت الإجمالي';

  @override
  String get examHistory => 'تاريخ الامتحانات';

  @override
  String get viewAll => 'عرض الكل';

  @override
  String get subjectPerformance => 'الأداء حسب المادة';

  @override
  String get topicsToReview => 'مواضيع للمراجعة';

  @override
  String get yesterday => 'أمس';

  @override
  String daysAgo(int count) {
    return 'منذ $count أيام';
  }

  @override
  String get examsLabel => 'امتحانات';

  @override
  String get sessionNormale => 'عادية';

  @override
  String get sessionRattrapage => 'استدراكية';

  @override
  String get leaderboardTitle => 'لوحة المتصدرين';

  @override
  String get global => 'عالمي';

  @override
  String get myStreamShort => 'شعبتي';

  @override
  String get noData => 'لا توجد بيانات';

  @override
  String minutesShort(int count) {
    return '$count دقيقة';
  }

  @override
  String get howManyMinutes => 'كم دقيقة في اليوم ؟';

  @override
  String get reminderTime => 'وقت التذكير';

  @override
  String get dailyReminderSubtitle => 'تلقي تذكير يومي';

  @override
  String get submit => 'تقديم';

  @override
  String get submitExamTitle => 'تقديم الامتحان ؟';

  @override
  String get submitExamConfirm => 'هل أنت متأكد من تقديم الامتحان ؟';

  @override
  String unansweredQuestions(int count) {
    return '$count سؤال بدون إجابة.';
  }

  @override
  String flaggedQuestions(int count) {
    return '$count سؤال مُعلَّم للمراجعة.';
  }

  @override
  String get submitAnyway => 'تقديم على أي حال ؟';

  @override
  String get fiveMinutesLeft => '⏰ بقيت 5 دقائق فقط !';

  @override
  String get oneMinuteLeft => '🚨 بقيت دقيقة واحدة !';

  @override
  String get timeUpTitle => '⏰ انتهى الوقت !';

  @override
  String get timeUpBody => 'انتهى وقتك. سيتم تقديم الامتحان تلقائيا.';

  @override
  String get exitExamBody => 'سيتم حفظ تقدمك ويمكنك المتابعة لاحقا.';

  @override
  String get quit => 'خروج';

  @override
  String get yourAnswer => 'إجابتك';

  @override
  String get previous => 'السابق';

  @override
  String get finish => 'إنهاء';

  @override
  String get noQuestionsAvailable => 'لا توجد أسئلة';

  @override
  String get flagForReview => 'وضع علامة للمراجعة';

  @override
  String get solution => 'الحل';

  @override
  String get examNational => 'الامتحان الوطني';

  @override
  String get examRegional => 'الامتحان الجهوي';

  @override
  String get noChaptersAvailable => 'لا توجد فصول متاحة';

  @override
  String skillsProgress(int mastered, int total) {
    return '$mastered / $total مهارات';
  }

  @override
  String get loading => 'جاري التحميل...';

  @override
  String get noLessonAvailable => 'لا يوجد درس متاح';

  @override
  String get startQuiz => 'ابدأ الاختبار';

  @override
  String get sessionPreparation => 'جاري تحضير حصتك...';

  @override
  String get offlineMode => 'وضع عدم الاتصال — سيتم المزامنة عند العودة';

  @override
  String get navProgress => 'التقدم';

  @override
  String get navSubjects => 'المواد';

  @override
  String get errorInvalidCredentials =>
      'البريد الإلكتروني أو كلمة المرور غير صحيحة';

  @override
  String get errorNetworkUnavailable => 'الاتصال بالشبكة غير متاح';

  @override
  String get errorGeneric => 'حدث خطأ. يرجى المحاولة مرة أخرى.';

  @override
  String get errorLoadingData => 'تعذر تحميل البيانات';

  @override
  String get noSubjectsAvailable => 'لا توجد مواد متاحة';

  @override
  String get splashTagline => 'باكالورياك، مهمتنا';

  @override
  String get cardTypeTheory => 'نظرية';

  @override
  String get cardTypeFormula => 'صيغة';

  @override
  String get cardTypeExample => 'مثال';

  @override
  String get tapToAdvance => 'اضغط للمتابعة';

  @override
  String get examReadiness => 'الاستعداد للامتحان';

  @override
  String get examReady => 'جاهز للامتحان';

  @override
  String examReadyPercent(int percent) {
    return '$percent% جاهز';
  }

  @override
  String skillsStrong(int count) {
    return '$count قوية';
  }

  @override
  String skillsAtRisk(int count) {
    return '$count معرضة للخطر';
  }

  @override
  String skillsCritical(int count) {
    return '$count حرجة';
  }

  @override
  String get noExamDate => 'حدد تاريخ الامتحان في الإعدادات';

  @override
  String get projectedOnExamDay => 'التوقعات يوم الامتحان';

  @override
  String get recommendedFocus => 'التركيز الموصى به';

  @override
  String get fadingFast => 'يتلاشى بسرعة';

  @override
  String get highCoefficient => 'معامل مرتفع';

  @override
  String get challengeZone => 'منطقة التحدي';

  @override
  String get noRecommendations => 'كل شيء محدث! واصل هكذا.';

  @override
  String get reviewNow => 'راجع';

  @override
  String get memoryHeatmap => 'خريطة الذاكرة';

  @override
  String get strongMemory => 'قوية';

  @override
  String get fadingMemory => 'تتلاشى';

  @override
  String get forgottenMemory => 'منسية';

  @override
  String get neverReviewed => 'لم تتم مراجعتها';

  @override
  String strength(int percent) {
    return 'القوة: $percent%';
  }

  @override
  String lastReviewed(String time) {
    return 'آخر مراجعة: $time';
  }

  @override
  String nextOptimalReview(String time) {
    return 'المراجعة المثلى التالية: $time';
  }

  @override
  String get studySchedule => 'جدول المراجعة';

  @override
  String get reviewToday => 'للمراجعة اليوم';

  @override
  String get reviewTomorrow => 'غدا';

  @override
  String get thisWeek => 'هذا الأسبوع';

  @override
  String get later => 'لاحقا';

  @override
  String overdueReviews(int count) {
    return '$count مراجعات متأخرة';
  }

  @override
  String nextReviewIn(String time) {
    return 'خلال $time';
  }

  @override
  String hoursShort(int count) {
    return '$countس';
  }

  @override
  String get analyticsHub => 'التحليلات';

  @override
  String get viewAnalytics => 'عرض التحليلات';

  @override
  String get examDayProjection => 'توقعات يوم الامتحان';

  @override
  String get dailyQuests => 'تحديات اليوم';

  @override
  String questCorrectAnswers(int count) {
    return 'أجب بشكل صحيح على $count أسئلة';
  }

  @override
  String questStudyMinutes(int count) {
    return 'ادرس لمدة $count دقائق';
  }

  @override
  String questReviewSkills(int count) {
    return 'راجع $count مهارات تتلاشى';
  }

  @override
  String questCompleteSession(int count) {
    return 'أكمل $count حصة';
  }

  @override
  String questPerfectStreak(int count) {
    return 'احصل على $count إجابات صحيحة متتالية';
  }

  @override
  String questXpReward(int xp) {
    return '+$xp XP';
  }

  @override
  String get questCompleted => 'تم!';

  @override
  String questProgress(int current, int target) {
    return '$current / $target';
  }

  @override
  String get allQuestsCompleted => 'جميع التحديات مكتملة! 🎉';

  @override
  String questBonusEarned(int xp) {
    return '+$xp XP إضافية';
  }

  @override
  String get theme => 'السمة';

  @override
  String get themeSystem => 'النظام';

  @override
  String get themeLight => 'فاتح';

  @override
  String get themeDark => 'داكن';

  @override
  String get chooseTheme => 'اختر السمة';
}

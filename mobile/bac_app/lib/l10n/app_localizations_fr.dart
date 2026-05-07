// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for French (`fr`).
class AppLocalizationsFr extends AppLocalizations {
  AppLocalizationsFr([String locale = 'fr']) : super(locale);

  @override
  String get appTitle => 'BacPrep';

  @override
  String hello(String name) {
    return 'Bonjour $name !';
  }

  @override
  String get todaySession => 'Session du jour';

  @override
  String get startSession => 'Commencer la session';

  @override
  String get continueSession => 'Continuer';

  @override
  String get quickReview => 'Révision rapide';

  @override
  String get mockExam => 'Examen blanc';

  @override
  String get yourSubjects => 'Vos matières';

  @override
  String daysUntilExam(int count) {
    return '$count jours avant l\'examen';
  }

  @override
  String get yourProgress => 'Votre progrès';

  @override
  String get streak => 'Série';

  @override
  String get totalXp => 'XP Total';

  @override
  String get today => 'Aujourd\'hui';

  @override
  String get bySubject => 'Par matière';

  @override
  String get weakPoints => 'Points faibles';

  @override
  String get noWeaknessDetected => 'Aucune faiblesse détectée. Continuez !';

  @override
  String seeMore(int count) {
    return 'Voir tout ($count)';
  }

  @override
  String get seeLess => 'Voir moins';

  @override
  String get review => 'Réviser';

  @override
  String attempts(int count) {
    return '$count tentatives';
  }

  @override
  String skillsMastered(int mastered, int total) {
    return '$mastered / $total compétences maîtrisées';
  }

  @override
  String coefficient(String value) {
    return 'Coeff. $value';
  }

  @override
  String get sessionComplete => 'Session terminée !';

  @override
  String get correct => 'Correct';

  @override
  String get precision => 'Précision';

  @override
  String get xp => 'XP';

  @override
  String get backToHome => 'Retour à l\'accueil';

  @override
  String get newSession => 'Nouvelle session';

  @override
  String get reviewLesson => 'Revoir la leçon';

  @override
  String get encourageExcellent =>
      'Excellent ! Vous maîtrisez bien ces concepts.';

  @override
  String get encourageGood => 'Bon travail ! Continuez à pratiquer.';

  @override
  String get encourageOk => 'Pas mal ! La régularité est la clé du succès.';

  @override
  String get encourageKeepGoing =>
      'Chaque erreur est une opportunité d\'apprendre. Continuez !';

  @override
  String get correctAnswer => 'Correct !';

  @override
  String get incorrectAnswer => 'Incorrect';

  @override
  String get next => 'Suivant';

  @override
  String get seeLesson => 'Voir la leçon';

  @override
  String get seeSteps => 'Voir les étapes';

  @override
  String get nextStep => 'Étape suivante';

  @override
  String get seeAll => 'Voir tout';

  @override
  String get deepen => 'Approfondissez';

  @override
  String get whatIf => 'Et si...?';

  @override
  String whyWrong(String answer) {
    return 'Pourquoi \"$answer\" est incorrect :';
  }

  @override
  String correctIs(String answer) {
    return 'La bonne réponse est \"$answer\" :';
  }

  @override
  String get validate => 'Valider';

  @override
  String get hint => 'Indice';

  @override
  String get hintPenalty => '-30% XP';

  @override
  String get settings => 'Réglages';

  @override
  String get bacStream => 'Filière du Bac';

  @override
  String get dailyGoal => 'Objectif quotidien';

  @override
  String minutesGoal(int count) {
    return '$count minutes';
  }

  @override
  String get language => 'Langue';

  @override
  String get french => 'Français';

  @override
  String get arabic => 'العربية';

  @override
  String get notifications => 'Notifications';

  @override
  String get studyReminders => 'Rappels de révision';

  @override
  String get signOut => 'Se déconnecter';

  @override
  String get chooseLanguage => 'Choisir la langue';

  @override
  String get exams => 'Examens';

  @override
  String get examBrowser => 'Annales du Bac';

  @override
  String get skill => 'Compétence';

  @override
  String error(String message) {
    return 'Erreur: $message';
  }

  @override
  String get demoWidgets => 'Demo Widgets';

  @override
  String get testWidgets => 'Test Widgets';

  @override
  String get loginTagline => 'Préparez votre Bac intelligemment';

  @override
  String get signIn => 'Connexion';

  @override
  String get signUp => 'Inscription';

  @override
  String get yourName => 'Votre nom';

  @override
  String get email => 'Email';

  @override
  String get password => 'Mot de passe';

  @override
  String get createAccount => 'Créer un compte';

  @override
  String get signInAction => 'Se connecter';

  @override
  String get welcomeTitle => 'Bienvenue sur BacPrep !';

  @override
  String get welcomeBody =>
      'Préparez votre Baccalauréat marocain avec des exercices intelligents, adaptés à votre niveau et à votre programme.';

  @override
  String get benefitAdaptiveTitle => 'Apprentissage adaptatif';

  @override
  String get benefitAdaptiveSubtitle =>
      'Les exercices s\'adaptent à votre niveau';

  @override
  String get benefitSpacedTitle => 'Révision espacée';

  @override
  String get benefitSpacedSubtitle =>
      'Revoyez au bon moment pour ne rien oublier';

  @override
  String get benefitAlignedTitle => 'Aligné au Bac';

  @override
  String get benefitAlignedSubtitle =>
      'Exercices dans le style de l\'examen national';

  @override
  String get start => 'Commencer';

  @override
  String get yourStream => 'Votre filière';

  @override
  String get chooseStream => 'Choisissez votre filière du Baccalauréat';

  @override
  String get examDateApprox => 'Date de l\'examen (approx.)';

  @override
  String get pickDate => 'Sélectionner une date';

  @override
  String get startReviewing => 'Commencer à réviser';

  @override
  String get byYear => 'Par Année';

  @override
  String get bySubjectTab => 'Par Matière';

  @override
  String get favorites => 'Favoris';

  @override
  String get noExamAvailable => 'Aucun examen disponible';

  @override
  String get noFavorites => 'Aucun favori';

  @override
  String get addFavoritesHint =>
      'Ajoutez des examens à vos favoris\npour un accès rapide';

  @override
  String get filters => 'Filtres';

  @override
  String get reset => 'Réinitialiser';

  @override
  String get myStream => 'Ma Filière';

  @override
  String get year => 'Année';

  @override
  String get session => 'Session';

  @override
  String get stream => 'Filière';

  @override
  String get showAllExams => 'Afficher tous les examens';

  @override
  String showResults(int count) {
    return 'Voir $count résultats';
  }

  @override
  String examCount(int count) {
    return '$count examen(s)';
  }

  @override
  String get examDetailsTitle => 'Détails de l\'examen';

  @override
  String get notAttemptedYet => 'Vous n\'avez pas encore tenté cet examen';

  @override
  String get lastAttempt => 'Dernière tentative';

  @override
  String get questionsTab => 'Questions';

  @override
  String questions(int count) {
    return 'Questions ($count)';
  }

  @override
  String moreQuestions(int count) {
    return '+$count autres questions';
  }

  @override
  String get viewPdf => 'Voir le sujet (PDF)';

  @override
  String get practice => 'Pratique';

  @override
  String get examMode => 'Mode Examen';

  @override
  String get examModeIntro => 'Vous allez commencer un examen chronométré:';

  @override
  String get rules => 'Règles:';

  @override
  String get ruleNoExit => '• Vous ne pouvez pas quitter pendant l\'examen';

  @override
  String get ruleTimed => '• Le temps est limité';

  @override
  String get ruleAutoSubmit =>
      '• L\'examen sera soumis automatiquement à la fin';

  @override
  String get cancel => 'Annuler';

  @override
  String get cantOpenPdf => 'Impossible d\'ouvrir le PDF';

  @override
  String minutes(int count) {
    return '$count minutes';
  }

  @override
  String get results => 'Résultats';

  @override
  String get summary => 'Résumé';

  @override
  String get save => 'Sauvegarder';

  @override
  String get perQuestion => 'Performance par question';

  @override
  String get perTopic => 'Performance par thème';

  @override
  String get tipsTitle => 'Conseils pour progresser';

  @override
  String get incorrectPlural => 'Incorrectes';

  @override
  String get correctPlural => 'Correctes';

  @override
  String get points => 'Points';

  @override
  String get gradeExcellent => 'Excellent !';

  @override
  String get gradeVeryGood => 'Très bien !';

  @override
  String get gradeGood => 'Bien joué !';

  @override
  String get gradeOk => 'Pas mal !';

  @override
  String get gradeKeepGoing => 'Continuez !';

  @override
  String get gradeMorePractice => 'Plus de pratique nécessaire';

  @override
  String get home => 'Accueil';

  @override
  String get reviewBtn => 'Revoir';

  @override
  String get retry => 'Réessayer';

  @override
  String get selectQuestion => 'Sélectionnez une question';

  @override
  String get detailedSolution => 'Solution détaillée';

  @override
  String get resolutionSteps => 'Étapes de résolution';

  @override
  String get scaleHeader => 'Barème';

  @override
  String get commonMistakes => 'Erreurs fréquentes';

  @override
  String get tipsHeader => 'Conseils';

  @override
  String get myPerformance => 'Mes Performances';

  @override
  String get noDataYet => 'Pas encore de données';

  @override
  String get completeExamsHint =>
      'Complétez des examens pour voir vos performances';

  @override
  String get overview => 'Vue d\'ensemble';

  @override
  String get averageScore => 'Score moyen';

  @override
  String get bestScore => 'Meilleur';

  @override
  String get totalTime => 'Temps total';

  @override
  String get examHistory => 'Historique des examens';

  @override
  String get viewAll => 'Voir tout';

  @override
  String get subjectPerformance => 'Performance par matière';

  @override
  String get topicsToReview => 'Sujets à réviser';

  @override
  String get yesterday => 'Hier';

  @override
  String daysAgo(int count) {
    return 'Il y a ${count}j';
  }

  @override
  String get examsLabel => 'Examens';

  @override
  String get sessionNormale => 'Normale';

  @override
  String get sessionRattrapage => 'Rattrapage';

  @override
  String get leaderboardTitle => 'Classement';

  @override
  String get global => 'Global';

  @override
  String get myStreamShort => 'Ma filière';

  @override
  String get noData => 'Aucune donnée';

  @override
  String minutesShort(int count) {
    return '$count min';
  }

  @override
  String get howManyMinutes => 'Combien de minutes par jour ?';

  @override
  String get reminderTime => 'Heure du rappel';

  @override
  String get dailyReminderSubtitle => 'Recevoir un rappel quotidien';

  @override
  String get submit => 'Soumettre';

  @override
  String get submitExamTitle => 'Soumettre l\'examen ?';

  @override
  String get submitExamConfirm =>
      'Êtes-vous sûr de vouloir soumettre votre examen ?';

  @override
  String unansweredQuestions(int count) {
    return '$count question(s) sans réponse.';
  }

  @override
  String flaggedQuestions(int count) {
    return '$count marquée(s) pour révision.';
  }

  @override
  String get submitAnyway => 'Soumettre quand même ?';

  @override
  String get fiveMinutesLeft => '⏰ Plus que 5 minutes !';

  @override
  String get oneMinuteLeft => '🚨 Plus que 1 minute !';

  @override
  String get timeUpTitle => '⏰ Temps écoulé !';

  @override
  String get timeUpBody =>
      'Votre temps est écoulé. L\'examen va être soumis automatiquement.';

  @override
  String get exitExamBody =>
      'Votre progression sera sauvegardée et vous pourrez continuer plus tard.';

  @override
  String get quit => 'Quitter';

  @override
  String get yourAnswer => 'Votre réponse';

  @override
  String get previous => 'Précédent';

  @override
  String get finish => 'Terminer';

  @override
  String get noQuestionsAvailable => 'Aucune question disponible';

  @override
  String get flagForReview => 'Marquer pour révision';

  @override
  String get solution => 'Solution';

  @override
  String get examNational => 'Examen National';

  @override
  String get examRegional => 'Examen Régional';

  @override
  String get noChaptersAvailable => 'Aucun chapitre disponible';

  @override
  String skillsProgress(int mastered, int total) {
    return '$mastered / $total compétences';
  }

  @override
  String get loading => 'Chargement...';

  @override
  String get noLessonAvailable => 'Aucune leçon disponible';

  @override
  String get startQuiz => 'Commencer le quiz';

  @override
  String get sessionPreparation => 'Préparation de votre session...';

  @override
  String get offlineMode => 'Mode hors-ligne — synchronisation au retour';

  @override
  String get navProgress => 'Progrès';

  @override
  String get navSubjects => 'Matières';

  @override
  String get errorInvalidCredentials => 'Email ou mot de passe incorrect';

  @override
  String get errorNetworkUnavailable => 'Connexion réseau indisponible';

  @override
  String get errorGeneric => 'Une erreur est survenue. Veuillez réessayer.';

  @override
  String get errorLoadingData => 'Impossible de charger les données';

  @override
  String get noSubjectsAvailable => 'Aucune matière disponible';

  @override
  String get splashTagline => 'Votre Bac, notre mission';

  @override
  String get cardTypeTheory => 'Théorie';

  @override
  String get cardTypeFormula => 'Formule';

  @override
  String get cardTypeExample => 'Exemple';

  @override
  String get tapToAdvance => 'Touchez pour avancer';

  @override
  String get examReadiness => 'Préparation à l\'examen';

  @override
  String get examReady => 'Prêt pour l\'examen';

  @override
  String examReadyPercent(int percent) {
    return '$percent% prêt';
  }

  @override
  String skillsStrong(int count) {
    return '$count solides';
  }

  @override
  String skillsAtRisk(int count) {
    return '$count à risque';
  }

  @override
  String skillsCritical(int count) {
    return '$count critiques';
  }

  @override
  String get noExamDate => 'Définissez votre date d\'examen dans les réglages';

  @override
  String get projectedOnExamDay => 'Projection le jour de l\'examen';

  @override
  String get recommendedFocus => 'Focus recommandé';

  @override
  String get fadingFast => 'S\'estompe vite';

  @override
  String get highCoefficient => 'Fort coefficient';

  @override
  String get challengeZone => 'Zone de défi';

  @override
  String get noRecommendations => 'Tout est à jour ! Continuez ainsi.';

  @override
  String get reviewNow => 'Réviser';

  @override
  String get memoryHeatmap => 'Carte de mémoire';

  @override
  String get strongMemory => 'Solide';

  @override
  String get fadingMemory => 'S\'estompe';

  @override
  String get forgottenMemory => 'Oubliée';

  @override
  String get neverReviewed => 'Jamais révisé';

  @override
  String strength(int percent) {
    return 'Force : $percent%';
  }

  @override
  String lastReviewed(String time) {
    return 'Dernière révision : $time';
  }

  @override
  String nextOptimalReview(String time) {
    return 'Prochaine révision optimale : $time';
  }

  @override
  String get studySchedule => 'Planning de révision';

  @override
  String get reviewToday => 'À réviser aujourd\'hui';

  @override
  String get reviewTomorrow => 'Demain';

  @override
  String get thisWeek => 'Cette semaine';

  @override
  String get later => 'Plus tard';

  @override
  String overdueReviews(int count) {
    return '$count révisions en retard';
  }

  @override
  String nextReviewIn(String time) {
    return 'Dans $time';
  }

  @override
  String hoursShort(int count) {
    return '${count}h';
  }

  @override
  String get analyticsHub => 'Analytiques';

  @override
  String get viewAnalytics => 'Voir les analytiques';

  @override
  String get examDayProjection => 'Projection jour d\'examen';

  @override
  String get dailyQuests => 'Défis du jour';

  @override
  String questCorrectAnswers(int count) {
    return 'Répondez correctement à $count questions';
  }

  @override
  String questStudyMinutes(int count) {
    return 'Étudiez pendant $count minutes';
  }

  @override
  String questReviewSkills(int count) {
    return 'Révisez $count compétences qui s\'estompent';
  }

  @override
  String questCompleteSession(int count) {
    return 'Terminez $count session';
  }

  @override
  String questPerfectStreak(int count) {
    return 'Obtenez $count bonnes réponses d\'affilée';
  }

  @override
  String questXpReward(int xp) {
    return '+$xp XP';
  }

  @override
  String get questCompleted => 'Terminé !';

  @override
  String questProgress(int current, int target) {
    return '$current / $target';
  }

  @override
  String get allQuestsCompleted => 'Tous les défis terminés ! 🎉';

  @override
  String questBonusEarned(int xp) {
    return '+$xp XP bonus';
  }

  @override
  String get theme => 'Thème';

  @override
  String get themeSystem => 'Système';

  @override
  String get themeLight => 'Clair';

  @override
  String get themeDark => 'Sombre';

  @override
  String get chooseTheme => 'Choisir le thème';
}

import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_fr.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
      : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('ar'),
    Locale('fr')
  ];

  /// No description provided for @appTitle.
  ///
  /// In fr, this message translates to:
  /// **'BacPrep'**
  String get appTitle;

  /// No description provided for @hello.
  ///
  /// In fr, this message translates to:
  /// **'Bonjour {name} !'**
  String hello(String name);

  /// No description provided for @todaySession.
  ///
  /// In fr, this message translates to:
  /// **'Session du jour'**
  String get todaySession;

  /// No description provided for @startSession.
  ///
  /// In fr, this message translates to:
  /// **'Commencer la session'**
  String get startSession;

  /// No description provided for @continueSession.
  ///
  /// In fr, this message translates to:
  /// **'Continuer'**
  String get continueSession;

  /// No description provided for @quickReview.
  ///
  /// In fr, this message translates to:
  /// **'Révision rapide'**
  String get quickReview;

  /// No description provided for @mockExam.
  ///
  /// In fr, this message translates to:
  /// **'Examen blanc'**
  String get mockExam;

  /// No description provided for @yourSubjects.
  ///
  /// In fr, this message translates to:
  /// **'Vos matières'**
  String get yourSubjects;

  /// No description provided for @daysUntilExam.
  ///
  /// In fr, this message translates to:
  /// **'{count} jours avant l\'examen'**
  String daysUntilExam(int count);

  /// No description provided for @yourProgress.
  ///
  /// In fr, this message translates to:
  /// **'Votre progrès'**
  String get yourProgress;

  /// No description provided for @streak.
  ///
  /// In fr, this message translates to:
  /// **'Série'**
  String get streak;

  /// No description provided for @totalXp.
  ///
  /// In fr, this message translates to:
  /// **'XP Total'**
  String get totalXp;

  /// No description provided for @today.
  ///
  /// In fr, this message translates to:
  /// **'Aujourd\'hui'**
  String get today;

  /// No description provided for @bySubject.
  ///
  /// In fr, this message translates to:
  /// **'Par matière'**
  String get bySubject;

  /// No description provided for @weakPoints.
  ///
  /// In fr, this message translates to:
  /// **'Points faibles'**
  String get weakPoints;

  /// No description provided for @noWeaknessDetected.
  ///
  /// In fr, this message translates to:
  /// **'Aucune faiblesse détectée. Continuez !'**
  String get noWeaknessDetected;

  /// No description provided for @seeMore.
  ///
  /// In fr, this message translates to:
  /// **'Voir tout ({count})'**
  String seeMore(int count);

  /// No description provided for @seeLess.
  ///
  /// In fr, this message translates to:
  /// **'Voir moins'**
  String get seeLess;

  /// No description provided for @review.
  ///
  /// In fr, this message translates to:
  /// **'Réviser'**
  String get review;

  /// No description provided for @attempts.
  ///
  /// In fr, this message translates to:
  /// **'{count} tentatives'**
  String attempts(int count);

  /// No description provided for @skillsMastered.
  ///
  /// In fr, this message translates to:
  /// **'{mastered} / {total} compétences maîtrisées'**
  String skillsMastered(int mastered, int total);

  /// No description provided for @coefficient.
  ///
  /// In fr, this message translates to:
  /// **'Coeff. {value}'**
  String coefficient(String value);

  /// No description provided for @sessionComplete.
  ///
  /// In fr, this message translates to:
  /// **'Session terminée !'**
  String get sessionComplete;

  /// No description provided for @correct.
  ///
  /// In fr, this message translates to:
  /// **'Correct'**
  String get correct;

  /// No description provided for @precision.
  ///
  /// In fr, this message translates to:
  /// **'Précision'**
  String get precision;

  /// No description provided for @xp.
  ///
  /// In fr, this message translates to:
  /// **'XP'**
  String get xp;

  /// No description provided for @backToHome.
  ///
  /// In fr, this message translates to:
  /// **'Retour à l\'accueil'**
  String get backToHome;

  /// No description provided for @newSession.
  ///
  /// In fr, this message translates to:
  /// **'Nouvelle session'**
  String get newSession;

  /// No description provided for @reviewLesson.
  ///
  /// In fr, this message translates to:
  /// **'Revoir la leçon'**
  String get reviewLesson;

  /// No description provided for @encourageExcellent.
  ///
  /// In fr, this message translates to:
  /// **'Excellent ! Vous maîtrisez bien ces concepts.'**
  String get encourageExcellent;

  /// No description provided for @encourageGood.
  ///
  /// In fr, this message translates to:
  /// **'Bon travail ! Continuez à pratiquer.'**
  String get encourageGood;

  /// No description provided for @encourageOk.
  ///
  /// In fr, this message translates to:
  /// **'Pas mal ! La régularité est la clé du succès.'**
  String get encourageOk;

  /// No description provided for @encourageKeepGoing.
  ///
  /// In fr, this message translates to:
  /// **'Chaque erreur est une opportunité d\'apprendre. Continuez !'**
  String get encourageKeepGoing;

  /// No description provided for @correctAnswer.
  ///
  /// In fr, this message translates to:
  /// **'Correct !'**
  String get correctAnswer;

  /// No description provided for @incorrectAnswer.
  ///
  /// In fr, this message translates to:
  /// **'Incorrect'**
  String get incorrectAnswer;

  /// No description provided for @next.
  ///
  /// In fr, this message translates to:
  /// **'Suivant'**
  String get next;

  /// No description provided for @seeLesson.
  ///
  /// In fr, this message translates to:
  /// **'Voir la leçon'**
  String get seeLesson;

  /// No description provided for @seeSteps.
  ///
  /// In fr, this message translates to:
  /// **'Voir les étapes'**
  String get seeSteps;

  /// No description provided for @nextStep.
  ///
  /// In fr, this message translates to:
  /// **'Étape suivante'**
  String get nextStep;

  /// No description provided for @seeAll.
  ///
  /// In fr, this message translates to:
  /// **'Voir tout'**
  String get seeAll;

  /// No description provided for @deepen.
  ///
  /// In fr, this message translates to:
  /// **'Approfondissez'**
  String get deepen;

  /// No description provided for @whatIf.
  ///
  /// In fr, this message translates to:
  /// **'Et si...?'**
  String get whatIf;

  /// No description provided for @whyWrong.
  ///
  /// In fr, this message translates to:
  /// **'Pourquoi \"{answer}\" est incorrect :'**
  String whyWrong(String answer);

  /// No description provided for @correctIs.
  ///
  /// In fr, this message translates to:
  /// **'La bonne réponse est \"{answer}\" :'**
  String correctIs(String answer);

  /// No description provided for @validate.
  ///
  /// In fr, this message translates to:
  /// **'Valider'**
  String get validate;

  /// No description provided for @hint.
  ///
  /// In fr, this message translates to:
  /// **'Indice'**
  String get hint;

  /// No description provided for @hintPenalty.
  ///
  /// In fr, this message translates to:
  /// **'-30% XP'**
  String get hintPenalty;

  /// No description provided for @settings.
  ///
  /// In fr, this message translates to:
  /// **'Réglages'**
  String get settings;

  /// No description provided for @bacStream.
  ///
  /// In fr, this message translates to:
  /// **'Filière du Bac'**
  String get bacStream;

  /// No description provided for @dailyGoal.
  ///
  /// In fr, this message translates to:
  /// **'Objectif quotidien'**
  String get dailyGoal;

  /// No description provided for @minutesGoal.
  ///
  /// In fr, this message translates to:
  /// **'{count} minutes'**
  String minutesGoal(int count);

  /// No description provided for @language.
  ///
  /// In fr, this message translates to:
  /// **'Langue'**
  String get language;

  /// No description provided for @french.
  ///
  /// In fr, this message translates to:
  /// **'Français'**
  String get french;

  /// No description provided for @arabic.
  ///
  /// In fr, this message translates to:
  /// **'العربية'**
  String get arabic;

  /// No description provided for @notifications.
  ///
  /// In fr, this message translates to:
  /// **'Notifications'**
  String get notifications;

  /// No description provided for @studyReminders.
  ///
  /// In fr, this message translates to:
  /// **'Rappels de révision'**
  String get studyReminders;

  /// No description provided for @signOut.
  ///
  /// In fr, this message translates to:
  /// **'Se déconnecter'**
  String get signOut;

  /// No description provided for @chooseLanguage.
  ///
  /// In fr, this message translates to:
  /// **'Choisir la langue'**
  String get chooseLanguage;

  /// No description provided for @exams.
  ///
  /// In fr, this message translates to:
  /// **'Examens'**
  String get exams;

  /// No description provided for @examBrowser.
  ///
  /// In fr, this message translates to:
  /// **'Annales du Bac'**
  String get examBrowser;

  /// No description provided for @skill.
  ///
  /// In fr, this message translates to:
  /// **'Compétence'**
  String get skill;

  /// No description provided for @error.
  ///
  /// In fr, this message translates to:
  /// **'Erreur: {message}'**
  String error(String message);

  /// No description provided for @demoWidgets.
  ///
  /// In fr, this message translates to:
  /// **'Demo Widgets'**
  String get demoWidgets;

  /// No description provided for @testWidgets.
  ///
  /// In fr, this message translates to:
  /// **'Test Widgets'**
  String get testWidgets;

  /// No description provided for @loginTagline.
  ///
  /// In fr, this message translates to:
  /// **'Préparez votre Bac intelligemment'**
  String get loginTagline;

  /// No description provided for @signIn.
  ///
  /// In fr, this message translates to:
  /// **'Connexion'**
  String get signIn;

  /// No description provided for @signUp.
  ///
  /// In fr, this message translates to:
  /// **'Inscription'**
  String get signUp;

  /// No description provided for @yourName.
  ///
  /// In fr, this message translates to:
  /// **'Votre nom'**
  String get yourName;

  /// No description provided for @email.
  ///
  /// In fr, this message translates to:
  /// **'Email'**
  String get email;

  /// No description provided for @password.
  ///
  /// In fr, this message translates to:
  /// **'Mot de passe'**
  String get password;

  /// No description provided for @createAccount.
  ///
  /// In fr, this message translates to:
  /// **'Créer un compte'**
  String get createAccount;

  /// No description provided for @signInAction.
  ///
  /// In fr, this message translates to:
  /// **'Se connecter'**
  String get signInAction;

  /// No description provided for @welcomeTitle.
  ///
  /// In fr, this message translates to:
  /// **'Bienvenue sur BacPrep !'**
  String get welcomeTitle;

  /// No description provided for @welcomeBody.
  ///
  /// In fr, this message translates to:
  /// **'Préparez votre Baccalauréat marocain avec des exercices intelligents, adaptés à votre niveau et à votre programme.'**
  String get welcomeBody;

  /// No description provided for @benefitAdaptiveTitle.
  ///
  /// In fr, this message translates to:
  /// **'Apprentissage adaptatif'**
  String get benefitAdaptiveTitle;

  /// No description provided for @benefitAdaptiveSubtitle.
  ///
  /// In fr, this message translates to:
  /// **'Les exercices s\'adaptent à votre niveau'**
  String get benefitAdaptiveSubtitle;

  /// No description provided for @benefitSpacedTitle.
  ///
  /// In fr, this message translates to:
  /// **'Révision espacée'**
  String get benefitSpacedTitle;

  /// No description provided for @benefitSpacedSubtitle.
  ///
  /// In fr, this message translates to:
  /// **'Revoyez au bon moment pour ne rien oublier'**
  String get benefitSpacedSubtitle;

  /// No description provided for @benefitAlignedTitle.
  ///
  /// In fr, this message translates to:
  /// **'Aligné au Bac'**
  String get benefitAlignedTitle;

  /// No description provided for @benefitAlignedSubtitle.
  ///
  /// In fr, this message translates to:
  /// **'Exercices dans le style de l\'examen national'**
  String get benefitAlignedSubtitle;

  /// No description provided for @start.
  ///
  /// In fr, this message translates to:
  /// **'Commencer'**
  String get start;

  /// No description provided for @yourStream.
  ///
  /// In fr, this message translates to:
  /// **'Votre filière'**
  String get yourStream;

  /// No description provided for @chooseStream.
  ///
  /// In fr, this message translates to:
  /// **'Choisissez votre filière du Baccalauréat'**
  String get chooseStream;

  /// No description provided for @examDateApprox.
  ///
  /// In fr, this message translates to:
  /// **'Date de l\'examen (approx.)'**
  String get examDateApprox;

  /// No description provided for @pickDate.
  ///
  /// In fr, this message translates to:
  /// **'Sélectionner une date'**
  String get pickDate;

  /// No description provided for @startReviewing.
  ///
  /// In fr, this message translates to:
  /// **'Commencer à réviser'**
  String get startReviewing;

  /// No description provided for @byYear.
  ///
  /// In fr, this message translates to:
  /// **'Par Année'**
  String get byYear;

  /// No description provided for @bySubjectTab.
  ///
  /// In fr, this message translates to:
  /// **'Par Matière'**
  String get bySubjectTab;

  /// No description provided for @favorites.
  ///
  /// In fr, this message translates to:
  /// **'Favoris'**
  String get favorites;

  /// No description provided for @noExamAvailable.
  ///
  /// In fr, this message translates to:
  /// **'Aucun examen disponible'**
  String get noExamAvailable;

  /// No description provided for @noFavorites.
  ///
  /// In fr, this message translates to:
  /// **'Aucun favori'**
  String get noFavorites;

  /// No description provided for @addFavoritesHint.
  ///
  /// In fr, this message translates to:
  /// **'Ajoutez des examens à vos favoris\npour un accès rapide'**
  String get addFavoritesHint;

  /// No description provided for @filters.
  ///
  /// In fr, this message translates to:
  /// **'Filtres'**
  String get filters;

  /// No description provided for @reset.
  ///
  /// In fr, this message translates to:
  /// **'Réinitialiser'**
  String get reset;

  /// No description provided for @myStream.
  ///
  /// In fr, this message translates to:
  /// **'Ma Filière'**
  String get myStream;

  /// No description provided for @year.
  ///
  /// In fr, this message translates to:
  /// **'Année'**
  String get year;

  /// No description provided for @session.
  ///
  /// In fr, this message translates to:
  /// **'Session'**
  String get session;

  /// No description provided for @stream.
  ///
  /// In fr, this message translates to:
  /// **'Filière'**
  String get stream;

  /// No description provided for @showAllExams.
  ///
  /// In fr, this message translates to:
  /// **'Afficher tous les examens'**
  String get showAllExams;

  /// No description provided for @showResults.
  ///
  /// In fr, this message translates to:
  /// **'Voir {count} résultats'**
  String showResults(int count);

  /// No description provided for @examCount.
  ///
  /// In fr, this message translates to:
  /// **'{count} examen(s)'**
  String examCount(int count);

  /// No description provided for @examDetailsTitle.
  ///
  /// In fr, this message translates to:
  /// **'Détails de l\'examen'**
  String get examDetailsTitle;

  /// No description provided for @notAttemptedYet.
  ///
  /// In fr, this message translates to:
  /// **'Vous n\'avez pas encore tenté cet examen'**
  String get notAttemptedYet;

  /// No description provided for @lastAttempt.
  ///
  /// In fr, this message translates to:
  /// **'Dernière tentative'**
  String get lastAttempt;

  /// No description provided for @questionsTab.
  ///
  /// In fr, this message translates to:
  /// **'Questions'**
  String get questionsTab;

  /// No description provided for @questions.
  ///
  /// In fr, this message translates to:
  /// **'Questions ({count})'**
  String questions(int count);

  /// No description provided for @moreQuestions.
  ///
  /// In fr, this message translates to:
  /// **'+{count} autres questions'**
  String moreQuestions(int count);

  /// No description provided for @viewPdf.
  ///
  /// In fr, this message translates to:
  /// **'Voir le sujet (PDF)'**
  String get viewPdf;

  /// No description provided for @practice.
  ///
  /// In fr, this message translates to:
  /// **'Pratique'**
  String get practice;

  /// No description provided for @examMode.
  ///
  /// In fr, this message translates to:
  /// **'Mode Examen'**
  String get examMode;

  /// No description provided for @examModeIntro.
  ///
  /// In fr, this message translates to:
  /// **'Vous allez commencer un examen chronométré:'**
  String get examModeIntro;

  /// No description provided for @rules.
  ///
  /// In fr, this message translates to:
  /// **'Règles:'**
  String get rules;

  /// No description provided for @ruleNoExit.
  ///
  /// In fr, this message translates to:
  /// **'• Vous ne pouvez pas quitter pendant l\'examen'**
  String get ruleNoExit;

  /// No description provided for @ruleTimed.
  ///
  /// In fr, this message translates to:
  /// **'• Le temps est limité'**
  String get ruleTimed;

  /// No description provided for @ruleAutoSubmit.
  ///
  /// In fr, this message translates to:
  /// **'• L\'examen sera soumis automatiquement à la fin'**
  String get ruleAutoSubmit;

  /// No description provided for @cancel.
  ///
  /// In fr, this message translates to:
  /// **'Annuler'**
  String get cancel;

  /// No description provided for @cantOpenPdf.
  ///
  /// In fr, this message translates to:
  /// **'Impossible d\'ouvrir le PDF'**
  String get cantOpenPdf;

  /// No description provided for @minutes.
  ///
  /// In fr, this message translates to:
  /// **'{count} minutes'**
  String minutes(int count);

  /// No description provided for @results.
  ///
  /// In fr, this message translates to:
  /// **'Résultats'**
  String get results;

  /// No description provided for @summary.
  ///
  /// In fr, this message translates to:
  /// **'Résumé'**
  String get summary;

  /// No description provided for @save.
  ///
  /// In fr, this message translates to:
  /// **'Sauvegarder'**
  String get save;

  /// No description provided for @perQuestion.
  ///
  /// In fr, this message translates to:
  /// **'Performance par question'**
  String get perQuestion;

  /// No description provided for @perTopic.
  ///
  /// In fr, this message translates to:
  /// **'Performance par thème'**
  String get perTopic;

  /// No description provided for @tipsTitle.
  ///
  /// In fr, this message translates to:
  /// **'Conseils pour progresser'**
  String get tipsTitle;

  /// No description provided for @incorrectPlural.
  ///
  /// In fr, this message translates to:
  /// **'Incorrectes'**
  String get incorrectPlural;

  /// No description provided for @correctPlural.
  ///
  /// In fr, this message translates to:
  /// **'Correctes'**
  String get correctPlural;

  /// No description provided for @points.
  ///
  /// In fr, this message translates to:
  /// **'Points'**
  String get points;

  /// No description provided for @gradeExcellent.
  ///
  /// In fr, this message translates to:
  /// **'Excellent !'**
  String get gradeExcellent;

  /// No description provided for @gradeVeryGood.
  ///
  /// In fr, this message translates to:
  /// **'Très bien !'**
  String get gradeVeryGood;

  /// No description provided for @gradeGood.
  ///
  /// In fr, this message translates to:
  /// **'Bien joué !'**
  String get gradeGood;

  /// No description provided for @gradeOk.
  ///
  /// In fr, this message translates to:
  /// **'Pas mal !'**
  String get gradeOk;

  /// No description provided for @gradeKeepGoing.
  ///
  /// In fr, this message translates to:
  /// **'Continuez !'**
  String get gradeKeepGoing;

  /// No description provided for @gradeMorePractice.
  ///
  /// In fr, this message translates to:
  /// **'Plus de pratique nécessaire'**
  String get gradeMorePractice;

  /// No description provided for @home.
  ///
  /// In fr, this message translates to:
  /// **'Accueil'**
  String get home;

  /// No description provided for @reviewBtn.
  ///
  /// In fr, this message translates to:
  /// **'Revoir'**
  String get reviewBtn;

  /// No description provided for @retry.
  ///
  /// In fr, this message translates to:
  /// **'Réessayer'**
  String get retry;

  /// No description provided for @selectQuestion.
  ///
  /// In fr, this message translates to:
  /// **'Sélectionnez une question'**
  String get selectQuestion;

  /// No description provided for @detailedSolution.
  ///
  /// In fr, this message translates to:
  /// **'Solution détaillée'**
  String get detailedSolution;

  /// No description provided for @resolutionSteps.
  ///
  /// In fr, this message translates to:
  /// **'Étapes de résolution'**
  String get resolutionSteps;

  /// No description provided for @scaleHeader.
  ///
  /// In fr, this message translates to:
  /// **'Barème'**
  String get scaleHeader;

  /// No description provided for @commonMistakes.
  ///
  /// In fr, this message translates to:
  /// **'Erreurs fréquentes'**
  String get commonMistakes;

  /// No description provided for @tipsHeader.
  ///
  /// In fr, this message translates to:
  /// **'Conseils'**
  String get tipsHeader;

  /// No description provided for @myPerformance.
  ///
  /// In fr, this message translates to:
  /// **'Mes Performances'**
  String get myPerformance;

  /// No description provided for @noDataYet.
  ///
  /// In fr, this message translates to:
  /// **'Pas encore de données'**
  String get noDataYet;

  /// No description provided for @completeExamsHint.
  ///
  /// In fr, this message translates to:
  /// **'Complétez des examens pour voir vos performances'**
  String get completeExamsHint;

  /// No description provided for @overview.
  ///
  /// In fr, this message translates to:
  /// **'Vue d\'ensemble'**
  String get overview;

  /// No description provided for @averageScore.
  ///
  /// In fr, this message translates to:
  /// **'Score moyen'**
  String get averageScore;

  /// No description provided for @bestScore.
  ///
  /// In fr, this message translates to:
  /// **'Meilleur'**
  String get bestScore;

  /// No description provided for @totalTime.
  ///
  /// In fr, this message translates to:
  /// **'Temps total'**
  String get totalTime;

  /// No description provided for @examHistory.
  ///
  /// In fr, this message translates to:
  /// **'Historique des examens'**
  String get examHistory;

  /// No description provided for @viewAll.
  ///
  /// In fr, this message translates to:
  /// **'Voir tout'**
  String get viewAll;

  /// No description provided for @subjectPerformance.
  ///
  /// In fr, this message translates to:
  /// **'Performance par matière'**
  String get subjectPerformance;

  /// No description provided for @topicsToReview.
  ///
  /// In fr, this message translates to:
  /// **'Sujets à réviser'**
  String get topicsToReview;

  /// No description provided for @yesterday.
  ///
  /// In fr, this message translates to:
  /// **'Hier'**
  String get yesterday;

  /// No description provided for @daysAgo.
  ///
  /// In fr, this message translates to:
  /// **'Il y a {count}j'**
  String daysAgo(int count);

  /// No description provided for @examsLabel.
  ///
  /// In fr, this message translates to:
  /// **'Examens'**
  String get examsLabel;

  /// No description provided for @sessionNormale.
  ///
  /// In fr, this message translates to:
  /// **'Normale'**
  String get sessionNormale;

  /// No description provided for @sessionRattrapage.
  ///
  /// In fr, this message translates to:
  /// **'Rattrapage'**
  String get sessionRattrapage;

  /// No description provided for @leaderboardTitle.
  ///
  /// In fr, this message translates to:
  /// **'Classement'**
  String get leaderboardTitle;

  /// No description provided for @global.
  ///
  /// In fr, this message translates to:
  /// **'Global'**
  String get global;

  /// No description provided for @myStreamShort.
  ///
  /// In fr, this message translates to:
  /// **'Ma filière'**
  String get myStreamShort;

  /// No description provided for @noData.
  ///
  /// In fr, this message translates to:
  /// **'Aucune donnée'**
  String get noData;

  /// No description provided for @minutesShort.
  ///
  /// In fr, this message translates to:
  /// **'{count} min'**
  String minutesShort(int count);

  /// No description provided for @howManyMinutes.
  ///
  /// In fr, this message translates to:
  /// **'Combien de minutes par jour ?'**
  String get howManyMinutes;

  /// No description provided for @reminderTime.
  ///
  /// In fr, this message translates to:
  /// **'Heure du rappel'**
  String get reminderTime;

  /// No description provided for @dailyReminderSubtitle.
  ///
  /// In fr, this message translates to:
  /// **'Recevoir un rappel quotidien'**
  String get dailyReminderSubtitle;

  /// No description provided for @submit.
  ///
  /// In fr, this message translates to:
  /// **'Soumettre'**
  String get submit;

  /// No description provided for @submitExamTitle.
  ///
  /// In fr, this message translates to:
  /// **'Soumettre l\'examen ?'**
  String get submitExamTitle;

  /// No description provided for @submitExamConfirm.
  ///
  /// In fr, this message translates to:
  /// **'Êtes-vous sûr de vouloir soumettre votre examen ?'**
  String get submitExamConfirm;

  /// No description provided for @unansweredQuestions.
  ///
  /// In fr, this message translates to:
  /// **'{count} question(s) sans réponse.'**
  String unansweredQuestions(int count);

  /// No description provided for @flaggedQuestions.
  ///
  /// In fr, this message translates to:
  /// **'{count} marquée(s) pour révision.'**
  String flaggedQuestions(int count);

  /// No description provided for @submitAnyway.
  ///
  /// In fr, this message translates to:
  /// **'Soumettre quand même ?'**
  String get submitAnyway;

  /// No description provided for @fiveMinutesLeft.
  ///
  /// In fr, this message translates to:
  /// **'⏰ Plus que 5 minutes !'**
  String get fiveMinutesLeft;

  /// No description provided for @oneMinuteLeft.
  ///
  /// In fr, this message translates to:
  /// **'🚨 Plus que 1 minute !'**
  String get oneMinuteLeft;

  /// No description provided for @timeUpTitle.
  ///
  /// In fr, this message translates to:
  /// **'⏰ Temps écoulé !'**
  String get timeUpTitle;

  /// No description provided for @timeUpBody.
  ///
  /// In fr, this message translates to:
  /// **'Votre temps est écoulé. L\'examen va être soumis automatiquement.'**
  String get timeUpBody;

  /// No description provided for @exitExamBody.
  ///
  /// In fr, this message translates to:
  /// **'Votre progression sera sauvegardée et vous pourrez continuer plus tard.'**
  String get exitExamBody;

  /// No description provided for @quit.
  ///
  /// In fr, this message translates to:
  /// **'Quitter'**
  String get quit;

  /// No description provided for @yourAnswer.
  ///
  /// In fr, this message translates to:
  /// **'Votre réponse'**
  String get yourAnswer;

  /// No description provided for @previous.
  ///
  /// In fr, this message translates to:
  /// **'Précédent'**
  String get previous;

  /// No description provided for @finish.
  ///
  /// In fr, this message translates to:
  /// **'Terminer'**
  String get finish;

  /// No description provided for @noQuestionsAvailable.
  ///
  /// In fr, this message translates to:
  /// **'Aucune question disponible'**
  String get noQuestionsAvailable;

  /// No description provided for @flagForReview.
  ///
  /// In fr, this message translates to:
  /// **'Marquer pour révision'**
  String get flagForReview;

  /// No description provided for @solution.
  ///
  /// In fr, this message translates to:
  /// **'Solution'**
  String get solution;

  /// No description provided for @examNational.
  ///
  /// In fr, this message translates to:
  /// **'Examen National'**
  String get examNational;

  /// No description provided for @examRegional.
  ///
  /// In fr, this message translates to:
  /// **'Examen Régional'**
  String get examRegional;

  /// No description provided for @noChaptersAvailable.
  ///
  /// In fr, this message translates to:
  /// **'Aucun chapitre disponible'**
  String get noChaptersAvailable;

  /// No description provided for @skillsProgress.
  ///
  /// In fr, this message translates to:
  /// **'{mastered} / {total} compétences'**
  String skillsProgress(int mastered, int total);

  /// No description provided for @loading.
  ///
  /// In fr, this message translates to:
  /// **'Chargement...'**
  String get loading;

  /// No description provided for @noLessonAvailable.
  ///
  /// In fr, this message translates to:
  /// **'Aucune leçon disponible'**
  String get noLessonAvailable;

  /// No description provided for @startQuiz.
  ///
  /// In fr, this message translates to:
  /// **'Commencer le quiz'**
  String get startQuiz;

  /// No description provided for @sessionPreparation.
  ///
  /// In fr, this message translates to:
  /// **'Préparation de votre session...'**
  String get sessionPreparation;

  /// No description provided for @offlineMode.
  ///
  /// In fr, this message translates to:
  /// **'Mode hors-ligne — synchronisation au retour'**
  String get offlineMode;

  /// No description provided for @navProgress.
  ///
  /// In fr, this message translates to:
  /// **'Progrès'**
  String get navProgress;

  /// No description provided for @navSubjects.
  ///
  /// In fr, this message translates to:
  /// **'Matières'**
  String get navSubjects;

  /// No description provided for @errorInvalidCredentials.
  ///
  /// In fr, this message translates to:
  /// **'Email ou mot de passe incorrect'**
  String get errorInvalidCredentials;

  /// No description provided for @errorNetworkUnavailable.
  ///
  /// In fr, this message translates to:
  /// **'Connexion réseau indisponible'**
  String get errorNetworkUnavailable;

  /// No description provided for @errorGeneric.
  ///
  /// In fr, this message translates to:
  /// **'Une erreur est survenue. Veuillez réessayer.'**
  String get errorGeneric;

  /// No description provided for @errorLoadingData.
  ///
  /// In fr, this message translates to:
  /// **'Impossible de charger les données'**
  String get errorLoadingData;

  /// No description provided for @noSubjectsAvailable.
  ///
  /// In fr, this message translates to:
  /// **'Aucune matière disponible'**
  String get noSubjectsAvailable;

  /// No description provided for @splashTagline.
  ///
  /// In fr, this message translates to:
  /// **'Votre Bac, notre mission'**
  String get splashTagline;

  /// No description provided for @cardTypeTheory.
  ///
  /// In fr, this message translates to:
  /// **'Théorie'**
  String get cardTypeTheory;

  /// No description provided for @cardTypeFormula.
  ///
  /// In fr, this message translates to:
  /// **'Formule'**
  String get cardTypeFormula;

  /// No description provided for @cardTypeExample.
  ///
  /// In fr, this message translates to:
  /// **'Exemple'**
  String get cardTypeExample;

  /// No description provided for @tapToAdvance.
  ///
  /// In fr, this message translates to:
  /// **'Touchez pour avancer'**
  String get tapToAdvance;

  /// No description provided for @examReadiness.
  ///
  /// In fr, this message translates to:
  /// **'Préparation à l\'examen'**
  String get examReadiness;

  /// No description provided for @examReady.
  ///
  /// In fr, this message translates to:
  /// **'Prêt pour l\'examen'**
  String get examReady;

  /// No description provided for @examReadyPercent.
  ///
  /// In fr, this message translates to:
  /// **'{percent}% prêt'**
  String examReadyPercent(int percent);

  /// No description provided for @skillsStrong.
  ///
  /// In fr, this message translates to:
  /// **'{count} solides'**
  String skillsStrong(int count);

  /// No description provided for @skillsAtRisk.
  ///
  /// In fr, this message translates to:
  /// **'{count} à risque'**
  String skillsAtRisk(int count);

  /// No description provided for @skillsCritical.
  ///
  /// In fr, this message translates to:
  /// **'{count} critiques'**
  String skillsCritical(int count);

  /// No description provided for @noExamDate.
  ///
  /// In fr, this message translates to:
  /// **'Définissez votre date d\'examen dans les réglages'**
  String get noExamDate;

  /// No description provided for @projectedOnExamDay.
  ///
  /// In fr, this message translates to:
  /// **'Projection le jour de l\'examen'**
  String get projectedOnExamDay;

  /// No description provided for @recommendedFocus.
  ///
  /// In fr, this message translates to:
  /// **'Focus recommandé'**
  String get recommendedFocus;

  /// No description provided for @fadingFast.
  ///
  /// In fr, this message translates to:
  /// **'S\'estompe vite'**
  String get fadingFast;

  /// No description provided for @highCoefficient.
  ///
  /// In fr, this message translates to:
  /// **'Fort coefficient'**
  String get highCoefficient;

  /// No description provided for @challengeZone.
  ///
  /// In fr, this message translates to:
  /// **'Zone de défi'**
  String get challengeZone;

  /// No description provided for @noRecommendations.
  ///
  /// In fr, this message translates to:
  /// **'Tout est à jour ! Continuez ainsi.'**
  String get noRecommendations;

  /// No description provided for @reviewNow.
  ///
  /// In fr, this message translates to:
  /// **'Réviser'**
  String get reviewNow;

  /// No description provided for @memoryHeatmap.
  ///
  /// In fr, this message translates to:
  /// **'Carte de mémoire'**
  String get memoryHeatmap;

  /// No description provided for @strongMemory.
  ///
  /// In fr, this message translates to:
  /// **'Solide'**
  String get strongMemory;

  /// No description provided for @fadingMemory.
  ///
  /// In fr, this message translates to:
  /// **'S\'estompe'**
  String get fadingMemory;

  /// No description provided for @forgottenMemory.
  ///
  /// In fr, this message translates to:
  /// **'Oubliée'**
  String get forgottenMemory;

  /// No description provided for @neverReviewed.
  ///
  /// In fr, this message translates to:
  /// **'Jamais révisé'**
  String get neverReviewed;

  /// No description provided for @strength.
  ///
  /// In fr, this message translates to:
  /// **'Force : {percent}%'**
  String strength(int percent);

  /// No description provided for @lastReviewed.
  ///
  /// In fr, this message translates to:
  /// **'Dernière révision : {time}'**
  String lastReviewed(String time);

  /// No description provided for @nextOptimalReview.
  ///
  /// In fr, this message translates to:
  /// **'Prochaine révision optimale : {time}'**
  String nextOptimalReview(String time);

  /// No description provided for @studySchedule.
  ///
  /// In fr, this message translates to:
  /// **'Planning de révision'**
  String get studySchedule;

  /// No description provided for @reviewToday.
  ///
  /// In fr, this message translates to:
  /// **'À réviser aujourd\'hui'**
  String get reviewToday;

  /// No description provided for @reviewTomorrow.
  ///
  /// In fr, this message translates to:
  /// **'Demain'**
  String get reviewTomorrow;

  /// No description provided for @thisWeek.
  ///
  /// In fr, this message translates to:
  /// **'Cette semaine'**
  String get thisWeek;

  /// No description provided for @later.
  ///
  /// In fr, this message translates to:
  /// **'Plus tard'**
  String get later;

  /// No description provided for @overdueReviews.
  ///
  /// In fr, this message translates to:
  /// **'{count} révisions en retard'**
  String overdueReviews(int count);

  /// No description provided for @nextReviewIn.
  ///
  /// In fr, this message translates to:
  /// **'Dans {time}'**
  String nextReviewIn(String time);

  /// No description provided for @hoursShort.
  ///
  /// In fr, this message translates to:
  /// **'{count}h'**
  String hoursShort(int count);

  /// No description provided for @analyticsHub.
  ///
  /// In fr, this message translates to:
  /// **'Analytiques'**
  String get analyticsHub;

  /// No description provided for @viewAnalytics.
  ///
  /// In fr, this message translates to:
  /// **'Voir les analytiques'**
  String get viewAnalytics;

  /// No description provided for @examDayProjection.
  ///
  /// In fr, this message translates to:
  /// **'Projection jour d\'examen'**
  String get examDayProjection;

  /// No description provided for @dailyQuests.
  ///
  /// In fr, this message translates to:
  /// **'Défis du jour'**
  String get dailyQuests;

  /// No description provided for @questCorrectAnswers.
  ///
  /// In fr, this message translates to:
  /// **'Répondez correctement à {count} questions'**
  String questCorrectAnswers(int count);

  /// No description provided for @questStudyMinutes.
  ///
  /// In fr, this message translates to:
  /// **'Étudiez pendant {count} minutes'**
  String questStudyMinutes(int count);

  /// No description provided for @questReviewSkills.
  ///
  /// In fr, this message translates to:
  /// **'Révisez {count} compétences qui s\'estompent'**
  String questReviewSkills(int count);

  /// No description provided for @questCompleteSession.
  ///
  /// In fr, this message translates to:
  /// **'Terminez {count} session'**
  String questCompleteSession(int count);

  /// No description provided for @questPerfectStreak.
  ///
  /// In fr, this message translates to:
  /// **'Obtenez {count} bonnes réponses d\'affilée'**
  String questPerfectStreak(int count);

  /// No description provided for @questXpReward.
  ///
  /// In fr, this message translates to:
  /// **'+{xp} XP'**
  String questXpReward(int xp);

  /// No description provided for @questCompleted.
  ///
  /// In fr, this message translates to:
  /// **'Terminé !'**
  String get questCompleted;

  /// No description provided for @questProgress.
  ///
  /// In fr, this message translates to:
  /// **'{current} / {target}'**
  String questProgress(int current, int target);

  /// No description provided for @allQuestsCompleted.
  ///
  /// In fr, this message translates to:
  /// **'Tous les défis terminés ! 🎉'**
  String get allQuestsCompleted;

  /// No description provided for @questBonusEarned.
  ///
  /// In fr, this message translates to:
  /// **'+{xp} XP bonus'**
  String questBonusEarned(int xp);

  /// No description provided for @theme.
  ///
  /// In fr, this message translates to:
  /// **'Thème'**
  String get theme;

  /// No description provided for @themeSystem.
  ///
  /// In fr, this message translates to:
  /// **'Système'**
  String get themeSystem;

  /// No description provided for @themeLight.
  ///
  /// In fr, this message translates to:
  /// **'Clair'**
  String get themeLight;

  /// No description provided for @themeDark.
  ///
  /// In fr, this message translates to:
  /// **'Sombre'**
  String get themeDark;

  /// No description provided for @chooseTheme.
  ///
  /// In fr, this message translates to:
  /// **'Choisir le thème'**
  String get chooseTheme;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['ar', 'fr'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar':
      return AppLocalizationsAr();
    case 'fr':
      return AppLocalizationsFr();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}

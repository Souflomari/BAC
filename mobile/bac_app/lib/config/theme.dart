import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// BacPrep Papier — design system
///
/// "Une application d'étude qui ressemble à un cahier qu'on aurait tenu
/// toute l'année : pages crèmes, encre oxydée, notes en vert dans la
/// marge, titres imprimés en rouge manuscrit, sceaux à la feuille d'or."
///
/// Rule:
///   Red    = critical action / correction
///   Green  = hint / progression
///   Gold   = reward / seal
///   Indigo = scientific graph
///   Ink    = everything else
class BacPrepColors {
  // Primary palette — neutral black/gray (was warm brown, unreadable).
  static const primary       = Color(0xFF111111);
  static const primaryLight  = Color(0xFF424242);
  static const primaryDark   = Color(0xFF111111);

  // Accents
  static const accent  = Color(0xFFA07B2B);  // gold leaf — XP / streak / reward
  static const success = Color(0xFF3E5A3B);  // botanical green — hint / progression
  static const error   = Color(0xFF8B2A20);  // manuscript red — critical action
  static const warning = Color(0xFFA07B2B);  // gold

  // Subject colors — recolored on the neutral palette
  static const math       = Color(0xFF8B2A20);  // red
  static const physics    = Color(0xFF2D4963);  // engraving indigo
  static const biology    = Color(0xFF3E5A3B);  // green
  static const philosophy = Color(0xFF424242);  // neutral gray (was ink2)
  static const french     = Color(0xFF2D4963);
  static const arabic     = Color(0xFFA07B2B);  // gold
  static const english    = Color(0xFF757575);  // neutral gray (was ink3)

  // Mastery levels
  static const locked      = Color(0xFFC4B893);
  static const novice      = Color(0xFFA07B2B);
  static const developing  = Color(0xFFA07B2B);
  static const proficient  = Color(0xFF111111);  // ink
  static const master      = Color(0xFF3E5A3B);  // green

  // Neutrals
  static const background      = Color(0xFFF6F1E4);  // aged cream paper
  static const surface         = Color(0xFFFCF8EC);  // bright paper
  static const surfaceVariant  = Color(0xFFEEE7D3);  // bg2
  static const textPrimary     = Color(0xFF111111);
  static const textSecondary   = Color(0xFF424242);
  static const textTertiary    = Color(0xFF757575);
  static const border          = Color(0xFFD8CEB2);

  // Dark mode — neutral grayscale.
  static const darkBackground       = Color(0xFF121212);
  static const darkSurface          = Color(0xFF1E1E1E);
  static const darkSurfaceVariant   = Color(0xFF2A2A2A);
  static const darkTextPrimary      = Color(0xFFF2F2F2);
  static const darkTextSecondary    = Color(0xFFBDBDBD);
  static const darkBorder           = Color(0xFF424242);
}

/// Papier — full Papier design vocabulary.
/// Use this when you need the complete palette (includes ink shades,
/// rule weights, accent2/3/4/5).
class Papier {
  // Surfaces
  static const bg       = Color(0xFFF6F1E4);  // aged cream paper
  static const bg2      = Color(0xFFEEE7D3);  // darker cream (cards/sections)
  static const bg3      = Color(0xFFE5DCC0);  // deepest (stamps/deckle)
  static const surface  = Color(0xFFFCF8EC);  // bright paper

  // Ink shades — neutral black/gray scale (was warm brown, hard to read).
  static const ink   = Color(0xFF111111);  // primary text — near-black
  static const ink2  = Color(0xFF424242);  // secondary
  static const ink3  = Color(0xFF757575);  // tertiary / muted
  static const ink4  = Color(0xFFA8A8A8);  // watermark / disabled

  // Rules
  static const line   = Color(0xFFD8CEB2);
  static const line2  = Color(0xFFC4B893);  // heavier rules

  // Semantic accents
  /// Manuscript red — critical action / correction.
  static const red    = Color(0xFF8B2A20);
  /// Botanical green — hints / progression.
  static const green  = Color(0xFF3E5A3B);
  /// Gold leaf / ochre — rewards / seals.
  static const gold   = Color(0xFFA07B2B);
  /// Engraving indigo — scientific graphs.
  static const indigo = Color(0xFF2D4963);

  // Dark variant — neutral grayscale (was warm brown).
  static const darkBg     = Color(0xFF121212);
  static const darkInk    = Color(0xFFF2F2F2);  // primary text
  static const darkInk2   = Color(0xFFBDBDBD);  // secondary
  static const darkInk3   = Color(0xFF888888);  // tertiary

  static const radius = 6.0;
}

/// Papier typography helpers — wrap GoogleFonts for the three families.
class PapierType {
  /// EB Garamond — serif for titles + body voice.
  static TextStyle serif({
    double fontSize = 14,
    FontWeight fontWeight = FontWeight.w400,
    Color color = Papier.ink,
    double letterSpacing = 0,
    double height = 1.4,
    FontStyle fontStyle = FontStyle.normal,
  }) => GoogleFonts.ebGaramond(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: letterSpacing,
        height: height,
        fontStyle: fontStyle,
      );

  /// Italic shortcut — most Papier titles use italic.
  static TextStyle italic({
    double fontSize = 14,
    FontWeight fontWeight = FontWeight.w400,
    Color color = Papier.ink,
    double letterSpacing = 0,
    double height = 1.4,
  }) => serif(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: letterSpacing,
        height: height,
        fontStyle: FontStyle.italic,
      );

  /// Display 1 — hero headlines on landing / marketing pages. ~64px desktop.
  /// Tight line-height + slight negative tracking so the italic Garamond
  /// glyphs feel like a printed cover instead of a UI label.
  static TextStyle display1({
    double fontSize = 64,
    Color color = Papier.ink,
    FontWeight fontWeight = FontWeight.w500,
  }) => italic(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: -1.2,
        height: 1.02,
      );

  /// Display 2 — section titles on landing / dashboards. ~48px.
  static TextStyle display2({
    double fontSize = 48,
    Color color = Papier.ink,
    FontWeight fontWeight = FontWeight.w500,
  }) => italic(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: -0.9,
        height: 1.05,
      );

  /// Display 3 — page-level headings. ~36px.
  static TextStyle display3({
    double fontSize = 36,
    Color color = Papier.ink,
    FontWeight fontWeight = FontWeight.w500,
  }) => italic(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: -0.6,
        height: 1.1,
      );

  /// Inter — body / UI / actions.
  static TextStyle body({
    double fontSize = 13,
    FontWeight fontWeight = FontWeight.w400,
    Color color = Papier.ink,
    double letterSpacing = 0.02,
    double height = 1.5,
  }) => GoogleFonts.inter(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: letterSpacing,
        height: height,
      );

  /// JetBrains Mono — folios, dates, metadata.
  static TextStyle mono({
    double fontSize = 10,
    FontWeight fontWeight = FontWeight.w400,
    Color color = Papier.ink2,
    double letterSpacing = 0.05,
  }) => GoogleFonts.jetBrainsMono(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: letterSpacing,
      );

  /// Small caps — eyebrow labels (uppercase, wide tracking).
  static TextStyle smallCaps({
    double fontSize = 10,
    Color color = Papier.ink3,
    FontWeight fontWeight = FontWeight.w400,
  }) => GoogleFonts.ebGaramond(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: 0.18 * fontSize,  // ~0.18em
      );
}

class BacPrepTheme {
  static ThemeData get light {
    final base = ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.fromSeed(
        seedColor: Papier.ink,
        brightness: Brightness.light,
        primary: Papier.ink,
        onPrimary: Papier.surface,
        secondary: Papier.red,
        onSecondary: Papier.surface,
        tertiary: Papier.gold,
        surface: Papier.surface,
        onSurface: Papier.ink,
        error: Papier.red,
      ),
      scaffoldBackgroundColor: Papier.bg,
    );
    return base.copyWith(
      textTheme: GoogleFonts.ebGaramondTextTheme(base.textTheme).copyWith(
        // Headlines + titles are italic Garamond
        headlineLarge: PapierType.italic(fontSize: 30, fontWeight: FontWeight.w500, letterSpacing: -0.6, height: 1.0),
        headlineMedium: PapierType.italic(fontSize: 24, fontWeight: FontWeight.w500, letterSpacing: -0.4, height: 1.05),
        headlineSmall: PapierType.italic(fontSize: 18, fontWeight: FontWeight.w500, letterSpacing: -0.2, height: 1.15),
        titleLarge: PapierType.italic(fontSize: 20, fontWeight: FontWeight.w500),
        titleMedium: PapierType.serif(fontSize: 16, fontWeight: FontWeight.w500),
        titleSmall: PapierType.serif(fontSize: 14, fontWeight: FontWeight.w500),
        // Body uses Inter (UI text), Garamond reserved for "voice" passages
        bodyLarge: PapierType.body(fontSize: 15, color: Papier.ink),
        bodyMedium: PapierType.body(fontSize: 13, color: Papier.ink2),
        bodySmall: PapierType.body(fontSize: 11, color: Papier.ink3),
        labelLarge: PapierType.body(fontSize: 13, fontWeight: FontWeight.w500, color: Papier.ink),
        labelMedium: PapierType.body(fontSize: 11, fontWeight: FontWeight.w500, color: Papier.ink),
        labelSmall: PapierType.mono(fontSize: 10, color: Papier.ink2),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: Papier.ink,
          foregroundColor: Papier.surface,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(4))),
          textStyle: PapierType.body(fontSize: 13, fontWeight: FontWeight.w500, color: Papier.surface),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: Papier.ink,
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(4))),
          side: const BorderSide(color: Papier.ink, width: 1),
          textStyle: PapierType.body(fontSize: 13, fontWeight: FontWeight.w500),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: Papier.red,
          textStyle: PapierType.body(fontSize: 13),
        ),
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(Papier.radius)),
          side: BorderSide(color: Papier.line, width: 1),
        ),
        color: Papier.surface,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Papier.bg2,
        border: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(4)),
          borderSide: BorderSide(color: Papier.line),
        ),
        enabledBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(4)),
          borderSide: BorderSide(color: Papier.line),
        ),
        focusedBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(4)),
          borderSide: BorderSide(color: Papier.ink, width: 1.5),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        labelStyle: PapierType.body(fontSize: 13, color: Papier.ink3),
        hintStyle: PapierType.body(fontSize: 13, color: Papier.ink3),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Papier.surface,
        selectedItemColor: Papier.ink,
        unselectedItemColor: Papier.ink3,
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: Papier.surface,
        indicatorColor: Papier.bg2,
        labelTextStyle: WidgetStateProperty.all(PapierType.serif(fontSize: 11, color: Papier.ink)),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: Papier.bg,
        foregroundColor: Papier.ink,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: PapierType.italic(fontSize: 20, color: Papier.ink),
      ),
      dialogTheme: const DialogThemeData(
        backgroundColor: Papier.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(Papier.radius))),
      ),
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: Papier.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(Papier.radius)),
        ),
      ),
      dividerTheme: const DividerThemeData(color: Papier.line, thickness: 1, space: 1),
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: Papier.ink,
        linearTrackColor: Papier.line,
      ),
    );
  }

  static ThemeData get dark {
    final base = ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: Papier.gold,
        brightness: Brightness.dark,
        primary: Papier.gold,
        onPrimary: Papier.darkBg,
        secondary: Papier.gold,
        surface: Color(0xFF1E1E1E),
        onSurface: Papier.darkInk,
        error: Color(0xFFD2745E),
      ),
      scaffoldBackgroundColor: Papier.darkBg,
    );
    return base.copyWith(
      textTheme: GoogleFonts.ebGaramondTextTheme(base.textTheme).copyWith(
        headlineLarge: PapierType.italic(fontSize: 30, fontWeight: FontWeight.w500, letterSpacing: -0.6, height: 1.0, color: Papier.darkInk),
        headlineMedium: PapierType.italic(fontSize: 24, fontWeight: FontWeight.w500, letterSpacing: -0.4, color: Papier.darkInk),
        titleLarge: PapierType.italic(fontSize: 20, fontWeight: FontWeight.w500, color: Papier.darkInk),
        titleMedium: PapierType.serif(fontSize: 16, fontWeight: FontWeight.w500, color: Papier.darkInk),
        bodyLarge: PapierType.body(fontSize: 15, color: Papier.darkInk),
        bodyMedium: PapierType.body(fontSize: 13, color: Papier.darkInk2),
        bodySmall: PapierType.body(fontSize: 11, color: Papier.darkInk3),
        labelLarge: PapierType.body(fontSize: 13, fontWeight: FontWeight.w500, color: Papier.darkInk),
      ),
      cardTheme: const CardThemeData(
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(Papier.radius)),
          side: BorderSide(color: Color(0xFF424242), width: 1),
        ),
        color: Color(0xFF1E1E1E),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Color(0xFF1E1E1E),
        selectedItemColor: Papier.gold,
        unselectedItemColor: Papier.darkInk3,
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: Papier.darkBg,
        foregroundColor: Papier.darkInk,
        elevation: 0,
        titleTextStyle: PapierType.italic(fontSize: 20, color: Papier.darkInk),
      ),
      dividerTheme: const DividerThemeData(color: Color(0xFF424242)),
    );
  }
}

/// Spacing constants
class Spacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 16;
  static const double lg = 24;
  static const double xl = 32;
  static const double xxl = 48;
}

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../config/theme.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/papier/papier_toast.dart';

/// Shown after sign-up. Tells the user to check their inbox + offers
/// a resend button + lets them continue without verifying.
///
/// No router gate is wired — users with unverified emails can still
/// access the app. Tightening this is a future-session task per
/// PROJECT_STATUS.md.
class VerifyEmailScreen extends StatefulWidget {
  final String? email;
  const VerifyEmailScreen({super.key, this.email});

  @override
  State<VerifyEmailScreen> createState() => _VerifyEmailScreenState();
}

class _VerifyEmailScreenState extends State<VerifyEmailScreen> {
  bool _isResending = false;
  bool _resentOnce = false;
  String? _error;

  Future<void> _resend() async {
    final email = widget.email ?? Supabase.instance.client.auth.currentUser?.email;
    if (email == null || email.isEmpty) {
      setState(() => _error = "Aucune adresse e-mail disponible.");
      return;
    }
    setState(() {
      _isResending = true;
      _error = null;
    });
    try {
      await Supabase.instance.client.auth.resend(
        type: OtpType.signup,
        email: email,
      );
      if (mounted) {
        setState(() => _resentOnce = true);
        PapierToast.success(context, "Lien renvoyé à $email");
      }
    } catch (e) {
      if (mounted) {
        setState(() => _error = "Échec de l'envoi. Réessaie dans un instant.");
      }
    } finally {
      if (mounted) setState(() => _isResending = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final email = widget.email ?? Supabase.instance.client.auth.currentUser?.email ?? '';

    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const PaperGrain(opacity: 0.3),
          SafeArea(
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 480),
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 40),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        'BacPrep',
                        style: PapierType.italic(
                          fontSize: 32,
                          color: Papier.ink,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'Vérifie ta boîte mail',
                        style: PapierType.italic(fontSize: 22, color: Papier.ink2),
                      ),
                      const SizedBox(height: 12),
                      const DoubleRule(),
                      const SizedBox(height: 24),
                      Text(
                        email.isNotEmpty
                            ? "Nous t'avons envoyé un lien à :"
                            : "Nous t'avons envoyé un lien de vérification.",
                        style: PapierType.body(
                          fontSize: 14,
                          color: Papier.ink2,
                          height: 1.5,
                        ),
                      ),
                      if (email.isNotEmpty) ...[
                        const SizedBox(height: 8),
                        Text(
                          email,
                          style: PapierType.mono(
                            fontSize: 14,
                            color: Papier.ink,
                          ),
                        ),
                      ],
                      const SizedBox(height: 18),
                      Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          border: const Border(
                            left: BorderSide(color: Papier.indigo, width: 2),
                          ),
                          color: Papier.indigo.withValues(alpha: 0.05),
                        ),
                        child: Text(
                          "Clique sur le lien pour confirmer ton adresse. "
                          "Tu peux aussi continuer sans vérifier — tu ne perdras "
                          "rien, mais certaines fonctionnalités pourraient être "
                          "limitées plus tard.",
                          style: PapierType.body(
                            fontSize: 13,
                            color: Papier.ink2,
                            height: 1.5,
                          ),
                        ),
                      ),
                      if (_error != null) ...[
                        const SizedBox(height: 12),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            border: const Border(
                              left: BorderSide(color: Papier.red, width: 2),
                            ),
                            color: Papier.red.withValues(alpha: 0.05),
                          ),
                          child: Text(
                            _error!,
                            style: PapierType.body(color: Papier.red, fontSize: 13),
                          ),
                        ),
                      ],
                      const SizedBox(height: 28),
                      // Resend button (outlined Papier style)
                      GestureDetector(
                        onTap: _isResending ? null : _resend,
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          decoration: const BoxDecoration(
                            border: Border.fromBorderSide(
                              BorderSide(color: Papier.ink, width: 1.4),
                            ),
                          ),
                          child: Center(
                            child: _isResending
                                ? const SizedBox(
                                    width: 16,
                                    height: 16,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                      color: Papier.ink,
                                    ),
                                  )
                                : Text(
                                    _resentOnce
                                        ? 'Lien renvoyé ✓'
                                        : 'Renvoyer le lien',
                                    style: PapierType.smallCaps(
                                      fontSize: 12,
                                      color: Papier.ink,
                                    ),
                                  ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      // Continue without verifying (filled Papier ink)
                      GestureDetector(
                        onTap: () => context.go('/onboarding'),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          color: Papier.ink,
                          child: Center(
                            child: Text(
                              'Continuer →',
                              style: PapierType.smallCaps(
                                fontSize: 12,
                                color: Papier.surface,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

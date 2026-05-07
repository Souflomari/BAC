import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../config/theme.dart';
import '../../widgets/papier/papier_primitives.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _emailController = TextEditingController();
  bool _isLoading = false;
  bool _sent = false;
  String? _error;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _send() async {
    final email = _emailController.text.trim();
    if (email.isEmpty) {
      setState(() => _error = 'Veuillez saisir votre adresse e-mail.');
      return;
    }
    setState(() { _isLoading = true; _error = null; });
    try {
      await Supabase.instance.client.auth.resetPasswordForEmail(
        email,
        redirectTo: 'https://bacapp.vercel.app',
      );
      if (mounted) setState(() => _sent = true);
    } catch (e) {
      if (mounted) setState(() => _error = 'Une erreur est survenue. Vérifiez l\'adresse saisie.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const PaperGrain(opacity: 0.3),
          SafeArea(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Header
                  Container(
                    padding: const EdgeInsets.fromLTRB(22, 40, 22, 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            GestureDetector(
                              onTap: () => context.pop(),
                              child: Text(
                                '← Retour',
                                style: PapierType.italic(fontSize: 13, color: Papier.ink2),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        Text(
                          'Le Cahier',
                          style: PapierType.italic(fontSize: 44, letterSpacing: -1.0),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'Réinitialiser le mot de passe',
                          style: PapierType.italic(fontSize: 16, color: Papier.ink2),
                        ),
                        const SizedBox(height: 12),
                        const DoubleRule(),
                      ],
                    ),
                  ),

                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 22),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        if (_sent) ...[
                          Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              border: const Border(
                                left: BorderSide(color: Papier.indigo, width: 2),
                              ),
                              color: Papier.indigo.withValues(alpha: 0.05),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Lien envoyé',
                                  style: PapierType.smallCaps(fontSize: 11, color: Papier.indigo),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  'Vérifiez votre boîte mail. Le lien de réinitialisation expire dans 1 heure.',
                                  style: PapierType.body(fontSize: 14, color: Papier.ink2),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 24),
                          GestureDetector(
                            onTap: () => context.pop(),
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              color: Papier.ink,
                              child: Center(
                                child: Text(
                                  '← Retour à la connexion',
                                  style: PapierType.smallCaps(fontSize: 12, color: Papier.surface),
                                ),
                              ),
                            ),
                          ),
                        ] else ...[
                          Text(
                            'Saisissez votre adresse e-mail. Nous vous enverrons un lien pour réinitialiser votre mot de passe.',
                            style: PapierType.body(fontSize: 14, color: Papier.ink2, height: 1.5),
                          ),
                          const SizedBox(height: 20),
                          TextField(
                            controller: _emailController,
                            keyboardType: TextInputType.emailAddress,
                            textInputAction: TextInputAction.done,
                            onSubmitted: (_) => _send(),
                            style: PapierType.body(fontSize: 15, color: Papier.ink),
                            decoration: InputDecoration(
                              hintText: 'Adresse e-mail',
                              hintStyle: PapierType.italic(fontSize: 14, color: Papier.ink3),
                              filled: true,
                              fillColor: Papier.surface,
                              contentPadding: const EdgeInsets.fromLTRB(14, 14, 14, 14),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(0),
                                borderSide: const BorderSide(color: Papier.line2),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(0),
                                borderSide: const BorderSide(color: Papier.line2),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(0),
                                borderSide: const BorderSide(color: Papier.ink, width: 1.5),
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
                          const SizedBox(height: 24),
                          GestureDetector(
                            onTap: _isLoading ? null : _send,
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              color: Papier.ink,
                              child: Center(
                                child: _isLoading
                                    ? const SizedBox(
                                        width: 18,
                                        height: 18,
                                        child: CircularProgressIndicator(
                                          strokeWidth: 2,
                                          color: Papier.surface,
                                        ),
                                      )
                                    : Text(
                                        'Envoyer le lien →',
                                        style: PapierType.smallCaps(fontSize: 12, color: Papier.surface),
                                      ),
                              ),
                            ),
                          ),
                        ],
                        const SizedBox(height: 80),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

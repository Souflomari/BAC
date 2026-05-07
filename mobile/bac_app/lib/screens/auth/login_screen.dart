import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/papier/papier_primitives.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  bool _isSignUp = false;
  bool _isLoading = false;
  String? _error;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    final auth = ref.read(authActionsProvider);

    try {
      if (_isSignUp) {
        await auth.signUp(
          _emailController.text.trim(),
          _passwordController.text,
          displayName: _nameController.text.trim(),
        );
        if (mounted) context.go('/onboarding');
      } else {
        await auth.signIn(
          _emailController.text.trim(),
          _passwordController.text,
        );
        if (mounted) context.go('/home');
      }
    } catch (e) {
      setState(() => _error = _mapAuthError(e));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  String _mapAuthError(Object e) {
    final msg = e.toString().toLowerCase();
    final l = AppLocalizations.of(context)!;
    if (msg.contains('invalid login') ||
        msg.contains('invalid_credentials') ||
        msg.contains('wrong password') ||
        msg.contains('user not found')) {
      return l.errorInvalidCredentials;
    }
    if (msg.contains('socket') ||
        msg.contains('network') ||
        msg.contains('timeout') ||
        msg.contains('connection')) {
      return l.errorNetworkUnavailable;
    }
    return l.errorGeneric;
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;

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
                  // Masthead
                  Container(
                    padding: const EdgeInsets.fromLTRB(22, 40, 22, 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              'BACPREP',
                              style: PapierType.smallCaps(
                                fontSize: 11,
                                color: Papier.ink3,
                              ),
                            ),
                            const SizedBox(width: 12),
                            const Expanded(
                              child: Divider(color: Papier.ink, thickness: 0.8),
                            ),
                            const SizedBox(width: 12),
                            Text(
                              'BAC MAROC',
                              style: PapierType.mono(
                                fontSize: 9,
                                color: Papier.ink3,
                                letterSpacing: 1.5,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        Text(
                          'Le Cahier',
                          style: PapierType.italic(
                            fontSize: 44,
                            letterSpacing: -1.0,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          _isSignUp
                              ? 'Créer un compte'
                              : 'Se connecter',
                          style: PapierType.italic(
                            fontSize: 16,
                            color: Papier.ink2,
                          ),
                        ),
                        const SizedBox(height: 12),
                        const DoubleRule(),
                      ],
                    ),
                  ),

                  // Toggle sign-in / sign-up
                  Padding(
                    padding: const EdgeInsets.fromLTRB(22, 0, 22, 20),
                    child: Row(
                      children: [
                        _TabButton(
                          label: l.signIn,
                          isActive: !_isSignUp,
                          onTap: () => setState(() => _isSignUp = false),
                        ),
                        const SizedBox(width: 20),
                        _TabButton(
                          label: l.signUp,
                          isActive: _isSignUp,
                          onTap: () => setState(() => _isSignUp = true),
                        ),
                      ],
                    ),
                  ),

                  // Fields
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 22),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        if (_isSignUp) ...[
                          _PapierField(
                            controller: _nameController,
                            hint: l.yourName,
                            inputAction: TextInputAction.next,
                          ),
                          const SizedBox(height: 12),
                        ],
                        _PapierField(
                          controller: _emailController,
                          hint: l.email,
                          inputType: TextInputType.emailAddress,
                          inputAction: TextInputAction.next,
                        ),
                        const SizedBox(height: 12),
                        _PapierField(
                          controller: _passwordController,
                          hint: l.password,
                          obscure: true,
                          inputAction: TextInputAction.done,
                          onSubmitted: (_) => _submit(),
                        ),

                        // Error
                        if (_error != null) ...[
                          const SizedBox(height: 14),
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
                              style: PapierType.body(
                                color: Papier.red,
                                fontSize: 13,
                              ),
                            ),
                          ),
                        ],

                        const SizedBox(height: 24),

                        // Submit button
                        GestureDetector(
                          onTap: _isLoading ? null : _submit,
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
                                      _isSignUp
                                          ? '${l.signUp} →'
                                          : '${l.signIn} →',
                                      style: PapierType.smallCaps(
                                        fontSize: 12,
                                        color: Papier.surface,
                                      ),
                                    ),
                            ),
                          ),
                        ),

                        if (!_isSignUp) ...[
                          const SizedBox(height: 14),
                          Center(
                            child: GestureDetector(
                              onTap: () => context.push('/forgot-password'),
                              child: Text(
                                'Mot de passe oublié ?',
                                style: PapierType.italic(
                                  fontSize: 13,
                                  color: Papier.ink2,
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

class _TabButton extends StatelessWidget {
  final String label;
  final bool isActive;
  final VoidCallback onTap;

  const _TabButton({
    required this.label,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label,
            style: PapierType.serif(
              fontSize: 14,
              color: isActive ? Papier.ink : Papier.ink3,
              fontStyle: isActive ? FontStyle.italic : FontStyle.normal,
            ),
          ),
          const SizedBox(height: 3),
          Container(
            height: 1.5,
            width: 40,
            color: isActive ? Papier.red : Colors.transparent,
          ),
        ],
      ),
    );
  }
}

class _PapierField extends StatelessWidget {
  final TextEditingController controller;
  final String hint;
  final bool obscure;
  final TextInputType? inputType;
  final TextInputAction? inputAction;
  final ValueChanged<String>? onSubmitted;

  const _PapierField({
    required this.controller,
    required this.hint,
    this.obscure = false,
    this.inputType,
    this.inputAction,
    this.onSubmitted,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscure,
      keyboardType: inputType,
      textInputAction: inputAction,
      onSubmitted: onSubmitted,
      style: PapierType.body(fontSize: 15, color: Papier.ink),
      decoration: InputDecoration(
        hintText: hint,
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
    );
  }
}

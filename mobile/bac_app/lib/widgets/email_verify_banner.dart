import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../config/theme.dart';
import '../providers/auth_provider.dart';

/// Soft banner that nudges unverified users to confirm their email.
///
/// Renders on every authed tab. Returns SizedBox.shrink() if the user
/// already has emailConfirmedAt set (or isn't signed in).
///
/// This is a SOFT gate: users can dismiss / continue. To upgrade to a
/// hard redirect gate, change the router redirect in router.dart.
class EmailVerifyBanner extends ConsumerStatefulWidget {
  const EmailVerifyBanner({super.key});

  @override
  ConsumerState<EmailVerifyBanner> createState() => _EmailVerifyBannerState();
}

class _EmailVerifyBannerState extends ConsumerState<EmailVerifyBanner> {
  bool _dismissed = false;
  bool _resending = false;

  Future<void> _resend() async {
    final email = Supabase.instance.client.auth.currentUser?.email;
    if (email == null) return;
    setState(() => _resending = true);
    try {
      await Supabase.instance.client.auth.resend(
        type: OtpType.signup,
        email: email,
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Lien de vérification renvoyé à $email',
                style: PapierType.body(color: Papier.surface, fontSize: 13)),
            backgroundColor: Papier.ink,
          ),
        );
      }
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Échec du renvoi. Réessaie dans un instant.",
                style: PapierType.body(color: Papier.surface, fontSize: 13)),
            backgroundColor: Papier.red,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _resending = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_dismissed) return const SizedBox.shrink();
    final user = ref.watch(authStateProvider).valueOrNull?.session?.user;
    if (user == null) return const SizedBox.shrink();
    if (user.emailConfirmedAt != null) return const SizedBox.shrink();

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(16, 10, 8, 10),
      decoration: BoxDecoration(
        color: Papier.gold.withValues(alpha: 0.08),
        border: const Border(
          bottom: BorderSide(color: Papier.gold, width: 1.5),
        ),
      ),
      child: Row(
        children: [
          const Icon(Icons.mark_email_unread_outlined,
              size: 18, color: Papier.gold),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              "Vérifie ta boîte mail pour confirmer ton adresse — certaines fonctionnalités seront limitées sinon.",
              style: PapierType.body(fontSize: 12.5, color: Papier.ink),
            ),
          ),
          const SizedBox(width: 8),
          TextButton(
            onPressed: _resending ? null : _resend,
            style: TextButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              minimumSize: Size.zero,
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
            child: _resending
                ? const SizedBox(
                    width: 12,
                    height: 12,
                    child: CircularProgressIndicator(
                      strokeWidth: 1.5,
                      color: Papier.ink,
                    ),
                  )
                : Text(
                    'Renvoyer',
                    style: PapierType.smallCaps(
                        fontSize: 11, color: Papier.ink),
                  ),
          ),
          TextButton(
            onPressed: () => context.go('/verify-email'),
            style: TextButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              minimumSize: Size.zero,
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
            child: Text(
              'Vérifier →',
              style: PapierType.smallCaps(fontSize: 11, color: Papier.indigo),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.close, size: 16, color: Papier.ink2),
            tooltip: 'Masquer',
            onPressed: () => setState(() => _dismissed = true),
          ),
        ],
      ),
    );
  }
}

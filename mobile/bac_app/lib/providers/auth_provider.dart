import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/profile.dart';
import '../services/analytics_service.dart';
import '../services/api_service.dart';

final apiServiceProvider = Provider<ApiService>((ref) => ApiService());

/// Stream of auth state changes
final authStateProvider = StreamProvider<AuthState>((ref) {
  final stream = Supabase.instance.client.auth.onAuthStateChange;
  // Side-effect: identify the user in analytics on every signedIn event.
  return stream.map((s) {
    final uid = s.session?.user.id;
    if (uid != null) Analytics.identify(uid);
    return s;
  });
});

/// Current user profile
final profileProvider = FutureProvider<Profile?>((ref) async {
  final authState = ref.watch(authStateProvider);
  if (authState.valueOrNull?.session == null) return null;

  final api = ref.read(apiServiceProvider);
  return api.getProfile();
});

/// Auth actions notifier
final authActionsProvider = Provider<AuthActions>((ref) {
  return AuthActions(ref.read(apiServiceProvider));
});

class AuthActions {
  final ApiService _api;
  AuthActions(this._api);

  Future<void> signUp(String email, String password, {String? displayName}) async {
    await _api.signUp(email, password, displayName: displayName);
  }

  Future<void> signIn(String email, String password) async {
    await _api.signIn(email, password);
  }

  Future<void> signOut() async {
    await _api.signOut();
    Analytics.reset();
  }

  Future<void> updateProfile(Profile profile) async {
    await _api.updateProfile(profile);
  }

  Future<void> updateDisplayName(String name) =>
      _api.patchProfile(displayName: name);

  Future<String> uploadAvatar(List<int> bytes, {String contentType = 'image/jpeg'}) async {
    final url = await _api.uploadAvatar(bytes, contentType: contentType);
    await _api.patchProfile(avatarUrl: url);
    return url;
  }

  Future<void> deleteSelfAccount() => _api.deleteSelfAccount();
}

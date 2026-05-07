import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/profile.dart';
import 'auth_provider.dart';

final localeProvider = StateProvider<Locale>((ref) {
  final profile = ref.watch(profileProvider).valueOrNull;
  if (profile != null) {
    return Locale(profile.preferredLanguage.value);
  }
  return const Locale('fr');
});

// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

import 'share_helper.dart';

/// Web implementation of share. Uses `dart:html`'s clipboard if available,
/// else falls back to a hidden textarea + execCommand('copy'). The native
/// Web Share API requires JS interop that conflicts with the analyzer in
/// non-web contexts; we keep this implementation simple and rely on the
/// clipboard for cross-browser parity.
Future<ShareResult> sharePage({required String title, required String url}) async {
  try {
    final clipboard = html.window.navigator.clipboard;
    if (clipboard != null) {
      await clipboard.writeText(url);
      return ShareResult.copiedToClipboard;
    }
  } catch (_) {
    // Fall through to legacy clipboard.
  }
  try {
    final input = html.TextAreaElement()
      ..value = url
      ..style.position = 'fixed'
      ..style.opacity = '0';
    html.document.body?.append(input);
    input.select();
    final ok = html.document.execCommand('copy');
    input.remove();
    return ok ? ShareResult.copiedToClipboard : ShareResult.unsupported;
  } catch (_) {
    return ShareResult.unsupported;
  }
}

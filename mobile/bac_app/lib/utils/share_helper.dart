/// Cross-platform share helper. On web, uses `navigator.share` if
/// available, else falls back to `navigator.clipboard.writeText` and
/// returns `ShareResult.copiedToClipboard` so the caller can toast.
/// On mobile, currently no-op (use share_plus in a follow-up).
library share_helper;

import 'package:flutter/foundation.dart';
import 'share_helper_stub.dart'
    if (dart.library.html) 'share_helper_web.dart' as impl;

enum ShareResult { shared, copiedToClipboard, unsupported }

Future<ShareResult> sharePage({required String title, required String url}) {
  if (!kIsWeb) return Future.value(ShareResult.unsupported);
  return impl.sharePage(title: title, url: url);
}

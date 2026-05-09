/// Cross-platform "print this page" helper. On web, calls window.print().
/// On mobile, no-op (mobile users can take a screenshot instead).
library print_helper;

import 'package:flutter/foundation.dart';
import 'print_helper_stub.dart'
    if (dart.library.html) 'print_helper_web.dart' as impl;

void printPage() {
  if (!kIsWeb) return;
  impl.printPage();
}

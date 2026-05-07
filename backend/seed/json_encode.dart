import 'dart:io';
import 'dart:convert';

void main(List<String> args) {
  if (args.length != 2) {
    stderr.writeln('Usage: dart json_encode.dart <input.sql> <output.json>');
    exit(1);
  }
  final sql = File(args[0]).readAsStringSync();
  final payload = jsonEncode({'query': sql});
  File(args[1]).writeAsStringSync(payload);
}

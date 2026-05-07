import 'package:flutter/material.dart';
import 'package:flutter_math_fork/flutter_math.dart';
import '../config/theme.dart';

/// Renders body text that may contain:
/// - `### Header` lines         → bold serif header
/// - `- bullet` lines           → bulleted list item
/// - Blank lines                → 8 px spacer
/// - `$$...$$` on its own line  → display LaTeX (centred)
/// - Inline `$...$`             → inline LaTeX
/// - Inline `**bold**`          → bold
/// - Inline `*italic*`          → italic
class RichTextRenderer extends StatelessWidget {
  final String text;
  final TextStyle? style;

  const RichTextRenderer({
    super.key,
    required this.text,
    this.style,
  });

  @override
  Widget build(BuildContext context) {
    final base = (style ?? Theme.of(context).textTheme.bodyLarge)?.copyWith(
          color: Papier.ink,
          height: style?.height ?? 1.6,
          fontSize: style?.fontSize ?? 16,
        ) ??
        const TextStyle(color: Papier.ink, height: 1.6, fontSize: 16);

    final lines = text.split('\n');
    final widgets = <Widget>[];

    for (final line in lines) {
      if (line.trim().isEmpty) {
        widgets.add(const SizedBox(height: 8));
      } else if (line.startsWith('### ')) {
        widgets.add(_buildHeader(line.substring(4).trim(), base));
        widgets.add(const SizedBox(height: 4));
      } else if (line.startsWith('- ')) {
        widgets.add(_buildBullet(line.substring(2).trim(), base, context));
      } else {
        widgets.add(_buildParagraph(line, base, context));
      }
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: widgets,
    );
  }

  Widget _buildHeader(String text, TextStyle base) {
    return Padding(
      padding: const EdgeInsets.only(top: 8, bottom: 2),
      child: Text(
        text,
        style: base.copyWith(
          fontSize: (base.fontSize ?? 16) + 2,
          fontWeight: FontWeight.bold,
          color: Papier.ink,
        ),
      ),
    );
  }

  Widget _buildBullet(String content, TextStyle base, BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 8, top: 2, bottom: 2),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('• ', style: base.copyWith(color: Papier.ink2)),
          Expanded(child: _buildParagraph(content, base, context)),
        ],
      ),
    );
  }

  Widget _buildParagraph(String line, TextStyle base, BuildContext context) {
    // Check for a standalone block LaTeX line: $$...$$
    final trimmed = line.trim();
    if (trimmed.startsWith('\$\$') && trimmed.endsWith('\$\$') && trimmed.length > 4) {
      final latex = trimmed.substring(2, trimmed.length - 2);
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Center(
          child: Math.tex(
            latex,
            textStyle: base.copyWith(fontSize: (base.fontSize ?? 16) + 2, color: Papier.ink),
            mathStyle: MathStyle.display,
            onErrorFallback: (err) => Text(latex, style: base),
          ),
        ),
      );
    }

    // Mixed inline content: parse into spans
    final spans = _parseInline(line, base);
    if (spans.length == 1 && spans.first is WidgetSpan == false) {
      // Pure text — use simple Text for better performance
      final ts = spans.first as TextSpan;
      if (ts.children == null) {
        return Text(ts.text ?? '', style: base);
      }
    }
    return RichText(
      text: TextSpan(children: spans, style: base),
    );
  }

  /// Parses inline content into TextSpan / WidgetSpan children.
  /// Handles: **bold**, *italic*, $inline LaTeX$, plain text.
  List<InlineSpan> _parseInline(String input, TextStyle base) {
    final spans = <InlineSpan>[];
    int i = 0;
    final buf = StringBuffer();

    void flushBuf() {
      if (buf.isNotEmpty) {
        spans.add(TextSpan(text: buf.toString(), style: base));
        buf.clear();
      }
    }

    while (i < input.length) {
      // Block LaTeX $$ (inline occurrence)
      if (i + 1 < input.length && input[i] == '\$' && input[i + 1] == '\$') {
        flushBuf();
        i += 2;
        final start = i;
        while (i + 1 < input.length && !(input[i] == '\$' && input[i + 1] == '\$')) i++;
        final latex = input.substring(start, i);
        if (i + 1 < input.length) i += 2;
        spans.add(WidgetSpan(
          alignment: PlaceholderAlignment.middle,
          child: Math.tex(
            latex,
            textStyle: base.copyWith(fontSize: (base.fontSize ?? 16) + 2, color: Papier.ink),
            mathStyle: MathStyle.display,
            onErrorFallback: (err) => Text(latex, style: base),
          ),
        ));
        continue;
      }

      // Inline LaTeX $...$
      if (input[i] == '\$') {
        flushBuf();
        i += 1;
        final start = i;
        while (i < input.length && input[i] != '\$') i++;
        final latex = input.substring(start, i);
        if (i < input.length) i += 1;
        spans.add(WidgetSpan(
          alignment: PlaceholderAlignment.middle,
          child: Math.tex(
            latex,
            textStyle: base.copyWith(color: Papier.ink),
            mathStyle: MathStyle.text,
            onErrorFallback: (err) => Text(latex, style: base),
          ),
        ));
        continue;
      }

      // Bold **text**
      if (i + 1 < input.length && input[i] == '*' && input[i + 1] == '*') {
        flushBuf();
        i += 2;
        final start = i;
        while (i + 1 < input.length && !(input[i] == '*' && input[i + 1] == '*')) i++;
        final bold = input.substring(start, i);
        if (i + 1 < input.length) i += 2;
        spans.add(TextSpan(
          text: bold,
          style: base.copyWith(fontWeight: FontWeight.bold, color: Papier.ink),
        ));
        continue;
      }

      // Italic *text*
      if (input[i] == '*') {
        flushBuf();
        i += 1;
        final start = i;
        while (i < input.length && input[i] != '*') i++;
        final italic = input.substring(start, i);
        if (i < input.length) i += 1;
        spans.add(TextSpan(
          text: italic,
          style: base.copyWith(fontStyle: FontStyle.italic, color: Papier.ink),
        ));
        continue;
      }

      buf.write(input[i]);
      i++;
    }

    flushBuf();
    return spans.isEmpty ? [TextSpan(text: input, style: base)] : spans;
  }
}

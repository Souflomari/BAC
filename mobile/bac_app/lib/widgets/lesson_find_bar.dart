import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../config/theme.dart';

/// Sticky find-in-page bar for the long lesson screen.
///
/// Shown when the user presses Ctrl/Cmd+F. Renders a Papier-styled input
/// + match counter + ↑/↓ buttons + close. Matching is delegated to the
/// parent via [onChanged]; the parent maintains the search state and
/// passes back the current match counts.
class LessonFindBar extends StatefulWidget {
  final String? initialQuery;
  final int matchCount;
  final int currentIndex;
  final ValueChanged<String> onChanged;
  final VoidCallback onPrev;
  final VoidCallback onNext;
  final VoidCallback onClose;

  const LessonFindBar({
    super.key,
    this.initialQuery,
    required this.matchCount,
    required this.currentIndex,
    required this.onChanged,
    required this.onPrev,
    required this.onNext,
    required this.onClose,
  });

  @override
  State<LessonFindBar> createState() => _LessonFindBarState();
}

class _LessonFindBarState extends State<LessonFindBar> {
  late final TextEditingController _controller;
  late final FocusNode _focusNode;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialQuery);
    _focusNode = FocusNode();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _focusNode.requestFocus();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  KeyEventResult _onKey(FocusNode _, KeyEvent event) {
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    if (event.logicalKey == LogicalKeyboardKey.escape) {
      widget.onClose();
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.enter) {
      if (HardwareKeyboard.instance.isShiftPressed) {
        widget.onPrev();
      } else {
        widget.onNext();
      }
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final hasMatches = widget.matchCount > 0;
    final hasQuery = _controller.text.trim().isNotEmpty;

    return Container(
      padding: const EdgeInsets.fromLTRB(14, 8, 8, 8),
      decoration: const BoxDecoration(
        color: Papier.surface,
        border: Border(bottom: BorderSide(color: Papier.ink, width: 1.4)),
      ),
      child: Row(
        children: [
          const Icon(Icons.search, size: 18, color: Papier.ink2),
          const SizedBox(width: 10),
          Expanded(
            child: Focus(
              onKeyEvent: _onKey,
              child: TextField(
                controller: _controller,
                focusNode: _focusNode,
                style: PapierType.body(fontSize: 14, color: Papier.ink),
                decoration: InputDecoration(
                  hintText: 'Rechercher dans le chapitre…',
                  hintStyle:
                      PapierType.italic(fontSize: 13, color: Papier.ink3),
                  border: InputBorder.none,
                  isDense: true,
                  contentPadding: EdgeInsets.zero,
                ),
                onChanged: widget.onChanged,
              ),
            ),
          ),
          if (hasQuery) ...[
            Text(
              hasMatches
                  ? '${widget.currentIndex + 1} / ${widget.matchCount}'
                  : '0 / 0',
              style: PapierType.mono(
                fontSize: 11,
                color: hasMatches ? Papier.ink2 : Papier.red,
              ),
            ),
            const SizedBox(width: 6),
          ],
          IconButton(
            icon: const Icon(Icons.keyboard_arrow_up, size: 18),
            tooltip: 'Précédent (Maj + Entrée)',
            color: hasMatches ? Papier.ink : Papier.ink3,
            onPressed: hasMatches ? widget.onPrev : null,
          ),
          IconButton(
            icon: const Icon(Icons.keyboard_arrow_down, size: 18),
            tooltip: 'Suivant (Entrée)',
            color: hasMatches ? Papier.ink : Papier.ink3,
            onPressed: hasMatches ? widget.onNext : null,
          ),
          IconButton(
            icon: const Icon(Icons.close, size: 18),
            tooltip: 'Fermer (Esc)',
            color: Papier.ink,
            onPressed: widget.onClose,
          ),
        ],
      ),
    );
  }
}

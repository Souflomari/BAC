import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../providers/progress_provider.dart';

/// Global search overlay (Cmd/Ctrl+K). Local-only — searches subjects,
/// topics, and skills already loaded in providers. Keyboard-friendly:
/// ↑↓ navigate, Enter open, Esc close.
class GlobalSearchOverlay {
  static OverlayEntry? _current;

  static bool get isOpen => _current != null;

  static void open(BuildContext context) {
    if (_current != null) return;
    final overlay = Overlay.maybeOf(context, rootOverlay: true);
    if (overlay == null) return;

    final entry = OverlayEntry(builder: (_) {
      return _SearchModal(onDismiss: close);
    });
    _current = entry;
    overlay.insert(entry);
  }

  static void close() {
    _current?.remove();
    _current = null;
  }

  static void toggle(BuildContext context) {
    if (_current != null) {
      close();
    } else {
      open(context);
    }
  }
}

class _SearchModal extends ConsumerStatefulWidget {
  final VoidCallback onDismiss;
  const _SearchModal({required this.onDismiss});

  @override
  ConsumerState<_SearchModal> createState() => _SearchModalState();
}

class _SearchResult {
  final String label;
  final String type; // 'Chapitre', 'Compétence', 'Sujet'
  final String route;
  final String? subtitle;
  const _SearchResult({
    required this.label,
    required this.type,
    required this.route,
    this.subtitle,
  });
}

class _SearchModalState extends ConsumerState<_SearchModal> {
  final TextEditingController _controller = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  String _query = '';
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      setState(() {
        _query = _controller.text.trim().toLowerCase();
        _selectedIndex = 0;
      });
    });
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

  List<_SearchResult> _buildResults() {
    if (_query.isEmpty) return const [];
    final subjects = ref.read(subjectsProvider).valueOrNull ?? const [];
    final results = <_SearchResult>[];

    for (final s in subjects) {
      if (s.nameFr.toLowerCase().contains(_query)) {
        results.add(_SearchResult(
          label: s.nameFr,
          type: 'Sujet',
          route: '/subjects/${s.id}',
          subtitle: s.examType == 'national' ? 'épreuve nationale' : 'régional',
        ));
      }
    }

    // Topics + skills via subjects' topics
    final topicsAll = ref.read(allTopicsProvider).valueOrNull ?? const [];
    for (final t in topicsAll) {
      if (t.nameFr.toLowerCase().contains(_query)) {
        results.add(_SearchResult(
          label: t.nameFr,
          type: 'Chapitre',
          route: '/subjects/${t.subjectId}',
        ));
      }
    }
    final skillsAll = ref.read(allSkillsProvider).valueOrNull ?? const [];
    for (final s in skillsAll) {
      if (s.nameFr.toLowerCase().contains(_query)) {
        results.add(_SearchResult(
          label: s.nameFr,
          type: 'Compétence',
          route: '/lesson/${s.id}',
        ));
      }
    }

    return results.take(20).toList();
  }

  void _activate(BuildContext context, _SearchResult r) {
    widget.onDismiss();
    context.push(r.route);
  }

  @override
  Widget build(BuildContext context) {
    final results = _buildResults();
    return Material(
      color: Colors.black.withValues(alpha: 0.45),
      child: GestureDetector(
        onTap: widget.onDismiss,
        behavior: HitTestBehavior.opaque,
        child: Center(
          child: GestureDetector(
            onTap: () {}, // absorb taps inside the modal
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 600, maxHeight: 600),
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 18, vertical: 64),
                decoration: BoxDecoration(
                  color: Papier.surface,
                  border: Border.all(color: Papier.ink, width: 2),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x33000000),
                      offset: Offset(0, 8),
                      blurRadius: 24,
                    ),
                  ],
                ),
                child: KeyboardListener(
                  focusNode: FocusNode(skipTraversal: true),
                  onKeyEvent: (event) {
                    if (event is KeyDownEvent) {
                      if (event.logicalKey == LogicalKeyboardKey.escape) {
                        widget.onDismiss();
                      } else if (event.logicalKey ==
                          LogicalKeyboardKey.arrowDown) {
                        if (results.isNotEmpty) {
                          setState(() {
                            _selectedIndex =
                                (_selectedIndex + 1) % results.length;
                          });
                        }
                      } else if (event.logicalKey ==
                          LogicalKeyboardKey.arrowUp) {
                        if (results.isNotEmpty) {
                          setState(() {
                            _selectedIndex = (_selectedIndex - 1 + results.length)
                                % results.length;
                          });
                        }
                      } else if (event.logicalKey ==
                          LogicalKeyboardKey.enter) {
                        if (_selectedIndex >= 0 &&
                            _selectedIndex < results.length) {
                          _activate(context, results[_selectedIndex]);
                        }
                      }
                    }
                  },
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Search input
                      Container(
                        padding: const EdgeInsets.fromLTRB(16, 12, 12, 12),
                        decoration: const BoxDecoration(
                          border: Border(
                            bottom: BorderSide(color: Papier.line2, width: 1),
                          ),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.search,
                                size: 20, color: Papier.ink2),
                            const SizedBox(width: 10),
                            Expanded(
                              child: TextField(
                                controller: _controller,
                                focusNode: _focusNode,
                                autofocus: true,
                                style: PapierType.serif(
                                  fontSize: 16,
                                  color: Papier.ink,
                                ),
                                decoration: InputDecoration(
                                  hintText:
                                      'Cherche un chapitre, une compétence...',
                                  hintStyle: PapierType.italic(
                                    fontSize: 16,
                                    color: Papier.ink3,
                                  ),
                                  border: InputBorder.none,
                                  isDense: true,
                                ),
                                onSubmitted: (_) {
                                  if (results.isNotEmpty) {
                                    _activate(context,
                                        results[_selectedIndex.clamp(0, results.length - 1)]);
                                  }
                                },
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: Papier.bg2,
                                border: Border.all(color: Papier.line2),
                                borderRadius: BorderRadius.circular(3),
                              ),
                              child: Text('Esc',
                                  style: PapierType.mono(
                                      fontSize: 10, color: Papier.ink3)),
                            ),
                          ],
                        ),
                      ),
                      // Results
                      Flexible(
                        child: _query.isEmpty
                            ? _buildHint()
                            : results.isEmpty
                                ? _buildNoResults()
                                : ListView.builder(
                                    shrinkWrap: true,
                                    itemCount: results.length,
                                    itemBuilder: (ctx, i) {
                                      final r = results[i];
                                      final selected = i == _selectedIndex;
                                      return InkWell(
                                        onTap: () => _activate(context, r),
                                        child: Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 16, vertical: 12),
                                          color: selected
                                              ? Papier.bg2
                                              : Colors.transparent,
                                          child: Row(
                                            children: [
                                              Container(
                                                padding: const EdgeInsets
                                                    .symmetric(
                                                    horizontal: 6,
                                                    vertical: 2),
                                                decoration: BoxDecoration(
                                                  color: Papier.bg2,
                                                  border: Border.all(
                                                      color: Papier.line2),
                                                ),
                                                child: Text(
                                                  r.type.toUpperCase(),
                                                  style: PapierType.smallCaps(
                                                      fontSize: 9,
                                                      color: Papier.ink3),
                                                ),
                                              ),
                                              const SizedBox(width: 12),
                                              Expanded(
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(r.label,
                                                        style: PapierType.serif(
                                                          fontSize: 14,
                                                          color: Papier.ink,
                                                          fontWeight:
                                                              FontWeight.w500,
                                                        )),
                                                    if (r.subtitle != null)
                                                      Text(r.subtitle!,
                                                          style: PapierType.mono(
                                                              fontSize: 10,
                                                              color: Papier
                                                                  .ink3)),
                                                  ],
                                                ),
                                              ),
                                              if (selected)
                                                Text('↵',
                                                    style: PapierType.italic(
                                                        fontSize: 14,
                                                        color: Papier.ink2)),
                                            ],
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                      ),
                      // Footer hint
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 14, vertical: 8),
                        decoration: const BoxDecoration(
                          color: Papier.bg2,
                          border: Border(
                            top: BorderSide(color: Papier.line2),
                          ),
                        ),
                        child: Row(
                          children: [
                            Text('↑↓ naviguer · ↵ ouvrir · Esc fermer',
                                style: PapierType.mono(
                                    fontSize: 10, color: Papier.ink3)),
                            const Spacer(),
                            Text('Cmd/Ctrl + K',
                                style: PapierType.mono(
                                    fontSize: 10, color: Papier.ink3)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHint() {
    return Padding(
      padding: const EdgeInsets.all(28),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('SUGGESTIONS',
              style: PapierType.smallCaps(fontSize: 10, color: Papier.ink3)),
          const SizedBox(height: 12),
          Text('Tape pour chercher dans le programme.',
              style: PapierType.body(fontSize: 14, color: Papier.ink)),
          const SizedBox(height: 6),
          Text(
              'Exemples : « limites », « lois de Newton », « titrage », « complexe »…',
              style: PapierType.italic(fontSize: 13, color: Papier.ink3)),
        ],
      ),
    );
  }

  Widget _buildNoResults() {
    return Padding(
      padding: const EdgeInsets.all(28),
      child: Center(
        child: Text('Aucun résultat pour « $_query ».',
            style: PapierType.italic(fontSize: 14, color: Papier.ink2)),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Papier tab bar — academic footer with Roman-numeral chapter labels.
/// Top-bordered with a 2px ink rule. Active tab gets a thin red underline
/// and ink-coloured label; inactive labels are ink3.
class PapierTabBar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;
  final List<PapierTabItem> items;

  const PapierTabBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Papier.surface,
        border: Border(top: BorderSide(color: Papier.ink, width: 2)),
      ),
      padding: EdgeInsets.fromLTRB(
        0,
        8,
        0,
        12 + MediaQuery.of(context).padding.bottom,
      ),
      child: Row(
        children: List.generate(items.length, (i) {
          final on = i == currentIndex;
          return Expanded(
            child: InkWell(
              onTap: () => onTap(i),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    items[i].numeral,
                    style: PapierType.italic(
                      fontSize: 11,
                      color: on ? Papier.red : Papier.ink3,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    items[i].label,
                    style: PapierType.serif(
                      fontSize: 12,
                      color: on ? Papier.ink : Papier.ink3,
                      fontWeight: on ? FontWeight.w500 : FontWeight.w400,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Container(
                    width: 14,
                    height: 2,
                    color: on ? Papier.red : Colors.transparent,
                  ),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}

class PapierTabItem {
  final String numeral; // 'I', 'II', 'III'...
  final String label;
  const PapierTabItem({required this.numeral, required this.label});
}

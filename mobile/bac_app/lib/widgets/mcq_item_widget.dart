import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/item.dart';
import 'rich_text_renderer.dart';
import 'figure_widget.dart';

class McqItemWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(int selectedIndex) onAnswer;

  const McqItemWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<McqItemWidget> createState() => _McqItemWidgetState();
}

class _McqItemWidgetState extends State<McqItemWidget> {
  int? _selectedIndex;

  @override
  void didUpdateWidget(McqItemWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _selectedIndex = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(Spacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Question stem
          RichTextRenderer(
            text: widget.item.stem,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontSize: 18,
              height: 1.5,
            ),
          ),

          // Figure (if any)
          FigureWidget(figure: widget.item.questionFigure),

          const SizedBox(height: Spacing.xl),

          // Choices
          ...List.generate(widget.item.choices.length, (index) {
            final choice = widget.item.choices[index];
            final isSelected = _selectedIndex == index;
            final isCorrect = index == widget.item.correctIndex;
            final isAnswered = widget.isAnswered;

            Color borderColor = BacPrepColors.border;
            Color? bgColor;
            Color textColor = BacPrepColors.textPrimary;

            if (isAnswered) {
              if (isCorrect) {
                borderColor = BacPrepColors.success;
                bgColor = BacPrepColors.success.withValues(alpha: 0.08);
                textColor = BacPrepColors.success;
              } else if (isSelected && !isCorrect) {
                borderColor = BacPrepColors.error;
                bgColor = BacPrepColors.error.withValues(alpha: 0.08);
                textColor = BacPrepColors.error;
              }
            } else if (isSelected) {
              borderColor = BacPrepColors.primary;
              bgColor = BacPrepColors.primary.withValues(alpha: 0.05);
            }

            return Padding(
              padding: const EdgeInsets.only(bottom: Spacing.sm),
              child: InkWell(
                onTap: isAnswered
                    ? null
                    : () {
                        setState(() => _selectedIndex = index);
                      },
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  padding: const EdgeInsets.all(Spacing.md),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: borderColor, width: 1.5),
                    color: bgColor,
                  ),
                  child: Row(
                    children: [
                      // Letter label
                      Container(
                        width: 32,
                        height: 32,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: isSelected || (isAnswered && isCorrect)
                              ? borderColor
                              : BacPrepColors.surfaceVariant,
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          String.fromCharCode(65 + index), // A, B, C, D
                          style: TextStyle(
                            color: isSelected || (isAnswered && isCorrect)
                                ? Colors.white
                                : BacPrepColors.textSecondary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      const SizedBox(width: Spacing.md),
                      Expanded(
                        child: RichTextRenderer(
                          text: choice,
                          style: TextStyle(
                            fontSize: 16,
                            color: textColor,
                            fontWeight: (isSelected || (isAnswered && isCorrect))
                                ? FontWeight.w600
                                : FontWeight.normal,
                          ),
                        ),
                      ),
                      if (isAnswered && isCorrect)
                        const Icon(Icons.check_circle, color: BacPrepColors.success, size: 24),
                      if (isAnswered && isSelected && !isCorrect)
                        const Icon(Icons.cancel, color: BacPrepColors.error, size: 24),
                    ],
                  ),
                ),
              ),
            );
          }),

          // Confirm button
          if (!widget.isAnswered) ...[
            const SizedBox(height: Spacing.lg),
            ElevatedButton(
              onPressed: _selectedIndex != null
                  ? () => widget.onAnswer(_selectedIndex!)
                  : null,
              child: const Text('Valider'),
            ),
          ],
        ],
      ),
    );
  }
}

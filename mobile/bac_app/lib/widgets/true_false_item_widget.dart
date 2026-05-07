import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/item.dart';
import 'rich_text_renderer.dart';
import 'figure_widget.dart';

class TrueFalseItemWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(bool answer) onAnswer;

  const TrueFalseItemWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<TrueFalseItemWidget> createState() => _TrueFalseItemWidgetState();
}

class _TrueFalseItemWidgetState extends State<TrueFalseItemWidget> {
  bool? _selectedAnswer;

  @override
  void didUpdateWidget(TrueFalseItemWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _selectedAnswer = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(Spacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Question
          RichTextRenderer(
            text: widget.item.stem,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontSize: 18,
              height: 1.5,
            ),
          ),

          // Figure (if any)
          FigureWidget(figure: widget.item.questionFigure),

          const SizedBox(height: Spacing.xxl),

          // True / False buttons
          Row(
            children: [
              Expanded(
                child: _ChoiceButton(
                  label: 'Vrai',
                  icon: Icons.check,
                  isSelected: _selectedAnswer == true,
                  isCorrect: widget.item.correctAnswer == true,
                  isAnswered: widget.isAnswered,
                  color: BacPrepColors.success,
                  onTap: () {
                    if (widget.isAnswered) return;
                    setState(() => _selectedAnswer = true);
                  },
                ),
              ),
              const SizedBox(width: Spacing.md),
              Expanded(
                child: _ChoiceButton(
                  label: 'Faux',
                  icon: Icons.close,
                  isSelected: _selectedAnswer == false,
                  isCorrect: widget.item.correctAnswer == false,
                  isAnswered: widget.isAnswered,
                  color: BacPrepColors.error,
                  onTap: () {
                    if (widget.isAnswered) return;
                    setState(() => _selectedAnswer = false);
                  },
                ),
              ),
            ],
          ),

          // Confirm button
          if (!widget.isAnswered) ...[
            const SizedBox(height: Spacing.xl),
            ElevatedButton(
              onPressed: _selectedAnswer != null
                  ? () => widget.onAnswer(_selectedAnswer!)
                  : null,
              child: const Text('Valider'),
            ),
          ],
        ],
      ),
    );
  }
}

class _ChoiceButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool isSelected;
  final bool isCorrect;
  final bool isAnswered;
  final Color color;
  final VoidCallback onTap;

  const _ChoiceButton({
    required this.label,
    required this.icon,
    required this.isSelected,
    required this.isCorrect,
    required this.isAnswered,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    Color borderColor = BacPrepColors.border;
    Color? bgColor;
    Color contentColor = BacPrepColors.textPrimary;

    if (isAnswered) {
      if (isCorrect) {
        borderColor = BacPrepColors.success;
        bgColor = BacPrepColors.success.withValues(alpha: 0.08);
        contentColor = BacPrepColors.success;
      } else if (isSelected && !isCorrect) {
        borderColor = BacPrepColors.error;
        bgColor = BacPrepColors.error.withValues(alpha: 0.08);
        contentColor = BacPrepColors.error;
      }
    } else if (isSelected) {
      borderColor = color;
      bgColor = color.withValues(alpha: 0.05);
      contentColor = color;
    }

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: Spacing.xl),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: borderColor, width: 2),
          color: bgColor,
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 40, color: contentColor),
            const SizedBox(height: Spacing.sm),
            Text(
              label,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: contentColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

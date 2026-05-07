import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../config/theme.dart';
import '../models/item.dart';
import 'rich_text_renderer.dart';
import 'figure_widget.dart';

class NumericItemWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(double value) onAnswer;

  const NumericItemWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<NumericItemWidget> createState() => _NumericItemWidgetState();
}

class _NumericItemWidgetState extends State<NumericItemWidget> {
  final _controller = TextEditingController();
  final _focusNode = FocusNode();
  bool _hasSubmitted = false;

  @override
  void didUpdateWidget(NumericItemWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _controller.clear();
      _hasSubmitted = false;
      _focusNode.requestFocus();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _submit() {
    if (_hasSubmitted || widget.isAnswered) return;
    final text = _controller.text.trim().replaceAll(',', '.');
    final value = double.tryParse(text);
    if (value != null) {
      setState(() => _hasSubmitted = true);
      widget.onAnswer(value);
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

          const SizedBox(height: Spacing.xl),

          // Numeric input
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _controller,
                  focusNode: _focusNode,
                  enabled: !widget.isAnswered,
                  keyboardType: const TextInputType.numberWithOptions(
                    decimal: true,
                    signed: true,
                  ),
                  inputFormatters: [
                    FilteringTextInputFormatter.allow(RegExp(r'[0-9.,\-]')),
                  ],
                  decoration: InputDecoration(
                    hintText: 'Votre réponse',
                    suffixText: widget.item.unit,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
                  textAlign: TextAlign.center,
                  onSubmitted: (_) => _submit(),
                  autofocus: true,
                ),
              ),
            ],
          ),

          const SizedBox(height: Spacing.md),

          // Submit button
          if (!widget.isAnswered)
            ElevatedButton(
              onPressed: _controller.text.trim().isNotEmpty ? _submit : null,
              child: const Text('Valider'),
            ),

          // Show correct answer after submission
          if (widget.isAnswered) ...[
            const SizedBox(height: Spacing.md),
            Container(
              padding: const EdgeInsets.all(Spacing.md),
              decoration: BoxDecoration(
                color: BacPrepColors.success.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: BacPrepColors.success.withValues(alpha: 0.3)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.check, color: BacPrepColors.success),
                  const SizedBox(width: Spacing.sm),
                  Text(
                    'Réponse correcte : ${widget.item.correctValue}${widget.item.unit != null ? ' ${widget.item.unit}' : ''}',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: BacPrepColors.success,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

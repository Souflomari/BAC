import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../l10n/app_localizations.dart';
import '../models/item.dart';
import '../models/session.dart';
import 'rich_text_renderer.dart';
import 'figure_widget.dart';
import 'mastery_meter.dart';

class ExplanationPanel extends StatefulWidget {
  final bool isCorrect;
  final AnswerResult result;
  final Item item;
  final dynamic selectedAnswer;
  final VoidCallback onNext;
  final void Function(String skillId)? onNavigateToLesson;

  const ExplanationPanel({
    super.key,
    required this.isCorrect,
    required this.result,
    required this.item,
    this.selectedAnswer,
    required this.onNext,
    this.onNavigateToLesson,
  });

  @override
  State<ExplanationPanel> createState() => _ExplanationPanelState();
}

class _ExplanationPanelState extends State<ExplanationPanel> {
  int _revealedSteps = 0;
  bool _showAllSteps = false;
  bool _whyExpanded = false;
  bool _whatIfExpanded = false;

  @override
  void didUpdateWidget(ExplanationPanel oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _revealedSteps = 0;
      _showAllSteps = false;
      _whyExpanded = false;
      _whatIfExpanded = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    final item = widget.item;
    final result = widget.result;
    final isCorrect = widget.isCorrect;
    final steps = item.explanationSteps;
    final hasSteps = steps.isNotEmpty;

    return Container(
      width: double.infinity,
      constraints: BoxConstraints(
        maxHeight: MediaQuery.of(context).size.height * 0.6,
      ),
      decoration: BoxDecoration(
        color: isCorrect
            ? BacPrepColors.success.withValues(alpha: 0.08)
            : BacPrepColors.error.withValues(alpha: 0.08),
        border: Border(
          top: BorderSide(
            color: isCorrect ? BacPrepColors.success : BacPrepColors.error,
            width: 2,
          ),
        ),
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(Spacing.lg),
        child: SafeArea(
          top: false,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.min,
            children: [
              // Header row: correct/incorrect + XP
              _buildHeader(context),

              // Contrastive wrong-answer feedback (MCQ)
              if (!isCorrect && item.itemType == ItemType.mcq)
                _buildContrastiveFeedback(context),

              // Main explanation text
              if (item.explanationText.isNotEmpty) ...[
                const SizedBox(height: Spacing.md),
                RichTextRenderer(
                  text: item.explanationText,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: BacPrepColors.textPrimary,
                  ),
                ),
              ],

              // Explanation figure
              FigureWidget(figure: item.explanationFigure),

              // Step-by-step reveal
              if (hasSteps) _buildStepByStep(context, steps),

              const SizedBox(height: Spacing.md),

              // Mastery meter
              MasteryMeter(
                mastery: result.updatedMastery,
                streak: result.streak,
              ),

              // Elaborative: "Pourquoi ?" prompt
              if (item.whyPrompt != null) _buildWhyPrompt(context),

              // Elaborative: "Et si...?" prompt
              if (item.whatIfPrompt != null) _buildWhatIfPrompt(context),

              // Reference link to lesson (always show when callback provided)
              if (widget.onNavigateToLesson != null) ...[
                const SizedBox(height: Spacing.sm),
                Align(
                  alignment: Alignment.centerLeft,
                  child: ActionChip(
                    avatar: const Icon(Icons.menu_book, size: 18),
                    label: Text(AppLocalizations.of(context)!.seeLesson),
                    onPressed: () =>
                        widget.onNavigateToLesson!(item.skillId),
                  ),
                ),
              ],

              const SizedBox(height: Spacing.md),

              ElevatedButton(
                onPressed: widget.onNext,
                child: Text(AppLocalizations.of(context)!.next),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    final isCorrect = widget.isCorrect;
    return Row(
      children: [
        Icon(
          isCorrect ? Icons.check_circle : Icons.cancel,
          color: isCorrect ? BacPrepColors.success : BacPrepColors.error,
          size: 28,
        ),
        const SizedBox(width: Spacing.sm),
        Text(
          isCorrect
              ? AppLocalizations.of(context)!.correctAnswer
              : AppLocalizations.of(context)!.incorrectAnswer,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            color: isCorrect ? BacPrepColors.success : BacPrepColors.error,
          ),
        ),
        const Spacer(),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: BacPrepColors.accent.withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            '+${widget.result.xpEarned} XP',
            style: const TextStyle(
              color: BacPrepColors.accent,
              fontWeight: FontWeight.w600,
              fontSize: 13,
            ),
          ),
        ),
      ],
    );
  }

  /// B4: Contrastive wrong-answer feedback for MCQ
  Widget _buildContrastiveFeedback(BuildContext context) {
    final item = widget.item;
    final selectedIdx = widget.selectedAnswer as int?;
    final wrongExplanations = item.wrongChoiceExplanations;

    // If no contrastive data, skip
    if (wrongExplanations.isEmpty || selectedIdx == null) {
      return const SizedBox.shrink();
    }

    final wrongExpl = selectedIdx < wrongExplanations.length
        ? wrongExplanations[selectedIdx]
        : null;
    final correctChoice = item.correctIndex < item.choices.length
        ? item.choices[item.correctIndex]
        : '';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Why chosen answer is wrong
        if (wrongExpl != null && wrongExpl.isNotEmpty) ...[
          const SizedBox(height: Spacing.md),
          Container(
            padding: const EdgeInsets.all(Spacing.md),
            decoration: BoxDecoration(
              color: BacPrepColors.error.withValues(alpha: 0.10),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: BacPrepColors.error.withValues(alpha: 0.35),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  AppLocalizations.of(context)!.whyWrong(selectedIdx < item.choices.length ? item.choices[selectedIdx] : ''),
                  style: PapierType.body(
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.error,
                    fontSize: 13,
                  ),
                ),
                const SizedBox(height: 6),
                RichTextRenderer(
                  text: wrongExpl,
                  style: PapierType.body(fontSize: 13),
                ),
              ],
            ),
          ),
        ],
        // Why correct answer is right
        if (correctChoice.isNotEmpty) ...[
          const SizedBox(height: Spacing.sm),
          Container(
            padding: const EdgeInsets.all(Spacing.md),
            decoration: BoxDecoration(
              color: BacPrepColors.success.withValues(alpha: 0.10),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: BacPrepColors.success.withValues(alpha: 0.35),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  AppLocalizations.of(context)!.correctIs(correctChoice),
                  style: PapierType.body(
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.success,
                    fontSize: 13,
                  ),
                ),
                const SizedBox(height: 6),
                if (item.explanationText.isNotEmpty)
                  RichTextRenderer(
                    text: item.explanationText,
                    style: PapierType.body(fontSize: 13),
                  ),
              ],
            ),
          ),
        ],
      ],
    );
  }

  /// B5: Step-by-step explanation reveal
  Widget _buildStepByStep(BuildContext context, List<String> steps) {
    final visibleCount = _showAllSteps ? steps.length : _revealedSteps;
    final allRevealed = visibleCount >= steps.length;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: Spacing.sm),
        // Revealed steps with animation
        AnimatedSize(
          duration: const Duration(milliseconds: 300),
          alignment: Alignment.topCenter,
          child: Column(
            children: List.generate(
              visibleCount.clamp(0, steps.length),
              (i) => Padding(
                padding: const EdgeInsets.only(top: 4),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 22,
                      height: 22,
                      margin: const EdgeInsetsDirectional.only(end: 8, top: 2),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: BacPrepColors.primary.withValues(alpha: 0.15),
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        '${i + 1}',
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: BacPrepColors.primary,
                        ),
                      ),
                    ),
                    Expanded(
                      child: RichTextRenderer(
                        text: steps[i],
                        style: PapierType.body(fontSize: 13),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        // Reveal buttons
        if (!allRevealed) ...[
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              OutlinedButton.icon(
                onPressed: () {
                  setState(() => _revealedSteps++);
                },
                icon: const Icon(Icons.arrow_forward, size: 16),
                label: Text(
                  _revealedSteps == 0
                      ? AppLocalizations.of(context)!.seeSteps
                      : AppLocalizations.of(context)!.nextStep,
                ),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  textStyle: const TextStyle(fontSize: 13),
                ),
              ),
              const SizedBox(width: Spacing.sm),
              TextButton(
                onPressed: () {
                  setState(() => _showAllSteps = true);
                },
                child: Text(AppLocalizations.of(context)!.seeAll, style: const TextStyle(fontSize: 13)),
              ),
            ],
          ),
        ],
      ],
    );
  }

  /// C8: "Pourquoi ?" elaborative prompt
  Widget _buildWhyPrompt(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: Spacing.md),
      child: _ExpandablePromptCard(
        icon: Icons.psychology,
        label: 'Approfondissez',
        prompt: widget.item.whyPrompt!,
        answer: widget.item.whyAnswer,
        isExpanded: _whyExpanded,
        onToggle: () => setState(() => _whyExpanded = !_whyExpanded),
      ),
    );
  }

  /// C9: "Et si...?" elaborative prompt
  Widget _buildWhatIfPrompt(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: Spacing.sm),
      child: _ExpandablePromptCard(
        icon: Icons.lightbulb_outline,
        label: 'Et si...?',
        prompt: widget.item.whatIfPrompt!,
        answer: widget.item.whatIfAnswer,
        isExpanded: _whatIfExpanded,
        onToggle: () => setState(() => _whatIfExpanded = !_whatIfExpanded),
      ),
    );
  }
}

/// Reusable expandable card for elaborative prompts
class _ExpandablePromptCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String prompt;
  final String? answer;
  final bool isExpanded;
  final VoidCallback onToggle;

  const _ExpandablePromptCard({
    required this.icon,
    required this.label,
    required this.prompt,
    this.answer,
    required this.isExpanded,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: BacPrepColors.primary.withValues(alpha: 0.3),
        ),
        color: BacPrepColors.primary.withValues(alpha: 0.04),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          InkWell(
            onTap: onToggle,
            borderRadius: BorderRadius.circular(10),
            child: Padding(
              padding: const EdgeInsets.all(Spacing.md),
              child: Row(
                children: [
                  Icon(icon, size: 20, color: BacPrepColors.primary),
                  const SizedBox(width: 8),
                  Text(
                    label,
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      color: BacPrepColors.primary,
                      fontSize: 14,
                    ),
                  ),
                  const Spacer(),
                  Icon(
                    isExpanded
                        ? Icons.keyboard_arrow_up
                        : Icons.keyboard_arrow_down,
                    color: BacPrepColors.primary,
                  ),
                ],
              ),
            ),
          ),
          // Prompt text always visible
          Padding(
            padding: const EdgeInsets.fromLTRB(Spacing.md, 0, Spacing.md, Spacing.sm),
            child: RichTextRenderer(
              text: prompt,
              style: TextStyle(
                fontSize: 13,
                color: BacPrepColors.textPrimary.withValues(alpha: 0.8),
                fontStyle: FontStyle.italic,
              ),
            ),
          ),
          // Answer revealed on expand
          AnimatedSize(
            duration: const Duration(milliseconds: 250),
            child: isExpanded && answer != null
                ? Padding(
                    padding: const EdgeInsets.fromLTRB(
                        Spacing.md, 0, Spacing.md, Spacing.md),
                    child: RichTextRenderer(
                      text: answer!,
                      style: PapierType.body(fontSize: 13),
                    ),
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}

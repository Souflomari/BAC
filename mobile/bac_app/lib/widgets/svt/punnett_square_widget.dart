import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class PunnettSquareWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const PunnettSquareWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<PunnettSquareWidget> createState() => _PunnettSquareWidgetState();
}

class _PunnettSquareWidgetState extends State<PunnettSquareWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  String _parent1Allele1 = 'A';
  String _parent1Allele2 = 'a';
  String _parent2Allele1 = 'A';
  String _parent2Allele2 = 'a';

  String _dominantTrait = 'Phénotype dominant';
  String _recessiveTrait = 'Phénotype recessif';

  int? _selectedCell;
  bool _showGenotypes = true;
  bool _showPhenotypes = true;
  bool _showProbability = true;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  List<String> get _offspringGenotypes {
    return [
      '$_parent1Allele1$_parent2Allele1',
      '$_parent1Allele1$_parent2Allele2',
      '$_parent1Allele2$_parent2Allele1',
      '$_parent1Allele2$_parent2Allele2',
    ];
  }

  List<String> get _uniqueGenotypes {
    final genotypes = _offspringGenotypes.toSet().toList();
    genotypes.sort((a, b) {
      final aIsHomo = a[0] == a[1];
      final bIsHomo = b[0] == b[1];
      if (aIsHomo && !bIsHomo) return -1;
      if (!aIsHomo && bIsHomo) return 1;
      return a.compareTo(b);
    });
    return genotypes;
  }

  Map<String, int> get _genotypeCounts {
    final counts = <String, int>{};
    for (final g in _offspringGenotypes) {
      final sorted = g.split('')..sort();
      final key = sorted.join();
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }

  String _getPhenotype(String genotype) {
    final sorted = genotype.split('')..sort();
    final key = sorted.join();
    if (key.contains('aa')) return _recessiveTrait;
    return _dominantTrait;
  }

  Map<String, double> get _phenotypeRatios {
    int dominantCount = 0;
    int recessiveCount = 0;
    for (final g in _offspringGenotypes) {
      if (_getPhenotype(g) == _dominantTrait) {
        dominantCount++;
      } else {
        recessiveCount++;
      }
    }
    return {
      _dominantTrait: dominantCount / 4,
      _recessiveTrait: recessiveCount / 4,
    };
  }

  void _submit() {
    if (_hasSubmitted) return;
    setState(() => _hasSubmitted = true);
    widget.onAnswer(_genotypeCounts);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(Spacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          RichTextRenderer(
            text: widget.item.stem,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontSize: 18,
              height: 1.5,
            ),
          ),
          const SizedBox(height: Spacing.md),
          FigureWidget(figure: widget.item.questionFigure),
          const SizedBox(height: Spacing.lg),
          _buildPunnettSquare(),
          const SizedBox(height: Spacing.md),
          _buildParentControls(),
          const SizedBox(height: Spacing.md),
          _buildResults(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildPunnettSquare() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: Column(
        children: [
          Text(
            'Carré de Punnett',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.md),
          AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Opacity(
                opacity: _animation.value,
                child: _buildSquare(),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSquare() {
    return Column(
      children: [
        Row(
          children: [
            const SizedBox(width: 60),
            const SizedBox(width: Spacing.sm),
            Expanded(
              child: Row(
                children: [
                  _AlleleBox(allele: _parent2Allele1, color: BacPrepColors.success),
                  const SizedBox(width: Spacing.xs),
                  _AlleleBox(allele: _parent2Allele2, color: BacPrepColors.success),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: Spacing.xs),
        Row(
          children: [
            SizedBox(
              width: 60,
              child: Column(
                children: [
                  _AlleleBox(allele: _parent1Allele1, color: BacPrepColors.primary),
                  const SizedBox(height: Spacing.xs),
                  _AlleleBox(allele: _parent1Allele2, color: BacPrepColors.primary),
                ],
              ),
            ),
            const SizedBox(width: Spacing.sm),
            Expanded(
              child: Column(
                children: [
                  Row(
                    children: [
                      _OffspringCell(
                        genotype: '${_parent1Allele1}${_parent2Allele1}',
                        showGenotype: _showGenotypes,
                        showPhenotype: _showPhenotypes,
                        phenotype: _getPhenotype('${_parent1Allele1}${_parent2Allele1}'),
                        isSelected: _selectedCell == 0,
                        onTap: () => setState(() => _selectedCell = _selectedCell == 0 ? null : 0),
                      ),
                      const SizedBox(width: Spacing.xs),
                      _OffspringCell(
                        genotype: '${_parent1Allele1}${_parent2Allele2}',
                        showGenotype: _showGenotypes,
                        showPhenotype: _showPhenotypes,
                        phenotype: _getPhenotype('${_parent1Allele1}${_parent2Allele2}'),
                        isSelected: _selectedCell == 1,
                        onTap: () => setState(() => _selectedCell = _selectedCell == 1 ? null : 1),
                      ),
                    ],
                  ),
                  const SizedBox(height: Spacing.xs),
                  Row(
                    children: [
                      _OffspringCell(
                        genotype: '${_parent1Allele2}${_parent2Allele1}',
                        showGenotype: _showGenotypes,
                        showPhenotype: _showPhenotypes,
                        phenotype: _getPhenotype('${_parent1Allele2}${_parent2Allele1}'),
                        isSelected: _selectedCell == 2,
                        onTap: () => setState(() => _selectedCell = _selectedCell == 2 ? null : 2),
                      ),
                      const SizedBox(width: Spacing.xs),
                      _OffspringCell(
                        genotype: '${_parent1Allele2}${_parent2Allele2}',
                        showGenotype: _showGenotypes,
                        showPhenotype: _showPhenotypes,
                        phenotype: _getPhenotype('${_parent1Allele2}${_parent2Allele2}'),
                        isSelected: _selectedCell == 3,
                        onTap: () => setState(() => _selectedCell = _selectedCell == 3 ? null : 3),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildParentControls() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Allèles parentaux',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              Expanded(
                child: _AlleleSelector(
                  label: 'Parent 1',
                  allele1: _parent1Allele1,
                  allele2: _parent1Allele2,
                  color: BacPrepColors.primary,
                  onChanged: (a1, a2) => setState(() {
                    _parent1Allele1 = a1;
                    _parent1Allele2 = a2;
                    _controller.forward(from: 0);
                  }),
                ),
              ),
              const SizedBox(width: Spacing.md),
              Expanded(
                child: _AlleleSelector(
                  label: 'Parent 2',
                  allele1: _parent2Allele1,
                  allele2: _parent2Allele2,
                  color: BacPrepColors.success,
                  onChanged: (a1, a2) => setState(() {
                    _parent2Allele1 = a1;
                    _parent2Allele2 = a2;
                    _controller.forward(from: 0);
                  }),
                ),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Génotypes'),
                selected: _showGenotypes,
                onSelected: (v) => setState(() => _showGenotypes = v),
              ),
              FilterChip(
                label: const Text('Phénotypes'),
                selected: _showPhenotypes,
                onSelected: (v) => setState(() => _showPhenotypes = v),
              ),
              FilterChip(
                label: const Text('Probabilités'),
                selected: _showProbability,
                onSelected: (v) => setState(() => _showProbability = v),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildResults() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.biology.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.biology.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Résultats',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.biology,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          if (_showProbability)
            Wrap(
              spacing: Spacing.sm,
              runSpacing: Spacing.xs,
              children: _phenotypeRatios.entries.map((e) {
                return Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: e.key == _dominantTrait
                        ? BacPrepColors.primary.withValues(alpha: 0.1)
                        : BacPrepColors.warning.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: e.key == _dominantTrait
                          ? BacPrepColors.primary.withValues(alpha: 0.5)
                          : BacPrepColors.warning.withValues(alpha: 0.5),
                    ),
                  ),
                  child: Text(
                    '${e.key}: ${(e.value * 100).toStringAsFixed(0)}%',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: e.key == _dominantTrait
                          ? BacPrepColors.primary
                          : BacPrepColors.warning,
                    ),
                  ),
                );
              }).toList(),
            ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: _uniqueGenotypes.map((g) {
              final sorted = g.split('')..sort();
              final key = sorted.join();
              final count = _genotypeCounts[key] ?? 0;
              return _GenotypeChip(
                genotype: key,
                count: count,
                phenotype: _getPhenotype(g),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildAnswerInput() {
    if (widget.isAnswered || _hasSubmitted) {
      return Container(
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
              'Vérifié ✓',
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: BacPrepColors.success,
              ),
            ),
          ],
        ),
      );
    }

    return TextField(
      controller: _answerController,
      decoration: InputDecoration(
        hintText: 'Décrivez le phénotype dominant attendu',
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
      style: const TextStyle(fontSize: 16),
      maxLines: 2,
      onSubmitted: (_) => _submit(),
    );
  }
}

class _AlleleBox extends StatelessWidget {
  final String allele;
  final Color color;

  const _AlleleBox({required this.allele, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 28,
      height: 28,
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: color),
      ),
      child: Center(
        child: Text(
          allele,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
      ),
    );
  }
}

class _OffspringCell extends StatelessWidget {
  final String genotype;
  final bool showGenotype;
  final bool showPhenotype;
  final String phenotype;
  final bool isSelected;
  final VoidCallback onTap;

  const _OffspringCell({
    required this.genotype,
    required this.showGenotype,
    required this.showPhenotype,
    required this.phenotype,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final sorted = genotype.split('')..sort();
    final sortedGenotype = sorted.join();
    final isHomozygous = genotype[0] == genotype[1];
    final isDominant = sortedGenotype[0] != 'a';

    return Expanded(
      child: InkWell(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: isSelected
                ? BacPrepColors.primary.withValues(alpha: 0.2)
                : isHomozygous
                    ? (isDominant
                        ? BacPrepColors.primary.withValues(alpha: 0.1)
                        : BacPrepColors.warning.withValues(alpha: 0.1))
                    : BacPrepColors.surface,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: isSelected
                  ? BacPrepColors.primary
                  : BacPrepColors.border,
              width: isSelected ? 2 : 1,
            ),
          ),
          child: Column(
            children: [
              if (showGenotype)
                Text(
                  sortedGenotype,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
              if (showPhenotype)
                Text(
                  isDominant ? 'Dominant' : 'Recessif',
                  style: TextStyle(
                    fontSize: 10,
                    color: isDominant ? BacPrepColors.primary : BacPrepColors.warning,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _AlleleSelector extends StatelessWidget {
  final String label;
  final String allele1;
  final String allele2;
  final Color color;
  final void Function(String, String) onChanged;

  const _AlleleSelector({
    required this.label,
    required this.allele1,
    required this.allele2,
    required this.color,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 12, color: color)),
        const SizedBox(height: 4),
        Row(
          children: [
            _AlleleButton(
              allele: allele1,
              color: color,
              isSelected: true,
              onTap: () {},
            ),
            const Text(' × '),
            _AlleleButton(
              allele: allele2,
              color: color,
              isSelected: false,
              onTap: () {},
            ),
          ],
        ),
      ],
    );
  }
}

class _AlleleButton extends StatelessWidget {
  final String allele;
  final Color color;
  final bool isSelected;
  final VoidCallback onTap;

  const _AlleleButton({
    required this.allele,
    required this.color,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        width: 32,
        height: 32,
        decoration: BoxDecoration(
          color: color.withValues(alpha: isSelected ? 0.3 : 0.1),
          borderRadius: BorderRadius.circular(4),
          border: Border.all(color: color, width: isSelected ? 2 : 1),
        ),
        child: Center(
          child: Text(
            allele,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: color,
              fontSize: 16,
            ),
          ),
        ),
      ),
    );
  }
}

class _GenotypeChip extends StatelessWidget {
  final String genotype;
  final int count;
  final String phenotype;

  const _GenotypeChip({
    required this.genotype,
    required this.count,
    required this.phenotype,
  });

  @override
  Widget build(BuildContext context) {
    final isDominant = genotype[0] != 'a';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: Column(
        children: [
          Text(
            genotype,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 12,
              color: isDominant ? BacPrepColors.primary : BacPrepColors.warning,
            ),
          ),
          Text(
            '$count/4',
            style: TextStyle(
              fontSize: 10,
              color: BacPrepColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}

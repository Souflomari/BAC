import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/skill.dart';
import '../../providers/progress_provider.dart';
import '../../widgets/error_retry_widget.dart';
import '../../widgets/skill_tile.dart';

class SubjectDetailScreen extends ConsumerWidget {
  final String subjectId;

  const SubjectDetailScreen({super.key, required this.subjectId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final topicsAsync = ref.watch(topicsProvider(subjectId));
    final skillStatesAsync = ref.watch(skillStatesProvider);
    final subjectsAsync = ref.watch(subjectsProvider);

    // Find the subject from the list
    final subject = subjectsAsync.valueOrNull
        ?.where((s) => s.id == subjectId)
        .firstOrNull;

    return Scaffold(
      appBar: AppBar(
        title: Text(subject?.nameFr ?? 'Matiere'),
        centerTitle: true,
      ),
      body: Column(
        children: [
          // Hero button: start session for entire subject
          Padding(
            padding: const EdgeInsets.all(Spacing.lg),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () => context.push('/session', extra: {
                  'subject_id': subjectId,
                }),
                icon: const Icon(Icons.play_arrow),
                label: Text(AppLocalizations.of(context)!.startSession),
              ),
            ),
          ),

          // Topics accordion
          Expanded(
            child: topicsAsync.when(
              data: (topics) {
                if (topics.isEmpty) {
                  return Center(
                    child: Text(AppLocalizations.of(context)!.noChaptersAvailable),
                  );
                }

                final stateMap = <String, UserSkillState>{};
                for (final s in skillStatesAsync.valueOrNull ?? <UserSkillState>[]) {
                  stateMap[s.skillId] = s;
                }

                return ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: Spacing.sm),
                  itemCount: topics.length,
                  itemBuilder: (context, index) {
                    final topic = topics[index];
                    return _TopicExpansionTile(
                      topicId: topic.id,
                      topicName: topic.nameFr,
                      stateMap: stateMap,
                    );
                  },
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => ErrorRetryWidget(
                message: AppLocalizations.of(context)!.errorLoadingData,
                onRetry: () => ref.invalidate(topicsProvider(subjectId)),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _TopicExpansionTile extends ConsumerWidget {
  final String topicId;
  final String topicName;
  final Map<String, UserSkillState> stateMap;

  const _TopicExpansionTile({
    required this.topicId,
    required this.topicName,
    required this.stateMap,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final skillsAsync = ref.watch(skillsProvider(topicId));

    return skillsAsync.when(
      data: (skills) {
        // Count mastered skills in this topic
        final masteredCount = skills.where((s) {
          final state = stateMap[s.id];
          return state?.mastery == MasteryLevel.master ||
              state?.mastery == MasteryLevel.proficient;
        }).length;

        return ExpansionTile(
          title: Text(topicName),
          subtitle: Text(
            AppLocalizations.of(context)!.skillsProgress(masteredCount, skills.length),
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          children: skills.map((skill) {
            return SkillTile(
              skill: skill,
              skillState: stateMap[skill.id],
              onTap: () {
                if (skill.hasLesson) {
                  context.push('/lesson/${skill.id}');
                } else {
                  context.push('/session', extra: {
                    'skill_id': skill.id,
                  });
                }
              },
            );
          }).toList(),
        );
      },
      loading: () => ExpansionTile(
        title: Text(AppLocalizations.of(context)!.loading),
        children: [
          Padding(
            padding: EdgeInsets.all(Spacing.md),
            child: Center(child: CircularProgressIndicator()),
          ),
        ],
      ),
      error: (e, _) => ExpansionTile(
        title: Text(topicName),
        children: [
          Padding(
            padding: const EdgeInsets.all(Spacing.md),
            child: Text(AppLocalizations.of(context)!.error('$e')),
          ),
        ],
      ),
    );
  }
}

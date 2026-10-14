import 'package:flutter/material.dart';
import '../models/user_profile.dart';
import '../models/subject.dart';
import '../models/study_task.dart';
import '../theme/app_theme.dart';

class DashboardScreen extends StatelessWidget {
  final UserProfile profile;
  final List<Subject> subjects;
  final List<StudyTask> tasks;
  final Function(int) onNavigateTab;
  final Function(Subject) onSelectSubject;

  const DashboardScreen({
    super.key,
    required this.profile,
    required this.subjects,
    required this.tasks,
    required this.onNavigateTab,
    required this.onSelectSubject,
  });

  @override
  Widget build(BuildContext context) {
    int totalSyllabusTopics = 0;
    int completedSyllabusTopics = 0;
    for (var s in subjects) {
      totalSyllabusTopics += s.totalTopics;
      completedSyllabusTopics += s.completedTopics;
    }
    double overallProgress = totalSyllabusTopics > 0
        ? (completedSyllabusTopics / totalSyllabusTopics) * 100
        : 0.0;

    final pendingTasks =
        tasks.where((t) => t.status != 'Completed').take(3).toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. Welcome Banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF2E1065), Color(0xFF1E1B4B)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.primaryViolet.withOpacity(0.4)),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.primaryViolet.withOpacity(0.15),
                  blurRadius: 16,
                  offset: const Offset(0, 4),
                )
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Welcome back, ${profile.name}! 👋',
                            style: const TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${profile.branch} • ${profile.semester}',
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.8),
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: AppTheme.primaryViolet.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppTheme.primaryViolet),
                      ),
                      child: Text(
                        'Target CGPA: ${profile.targetCgpa}',
                        style: const TextStyle(
                          color: AppTheme.violetLight,
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: overallProgress / 100,
                    minHeight: 10,
                    backgroundColor: Colors.white.withOpacity(0.1),
                    valueColor: const AlwaysStoppedAnimation<Color>(
                        AppTheme.primaryViolet),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Syllabus Coverage: ${overallProgress.toStringAsFixed(1)}%',
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Text(
                      '$completedSyllabusTopics of $totalSyllabusTopics Topics Done',
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // 2. Quick Action Grid
          Row(
            children: [
              Expanded(
                child: _buildActionCard(
                  title: 'Ask AI Coach',
                  subtitle: 'Any CSE Subject Doubts',
                  icon: Icons.auto_awesome,
                  color: AppTheme.primaryViolet,
                  onTap: () => onNavigateTab(2),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildActionCard(
                  title: 'Focus Timer',
                  subtitle: 'Pomodoro & Deep Work',
                  icon: Icons.timer_outlined,
                  color: AppTheme.cyan,
                  onTap: () => onNavigateTab(3),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildActionCard(
                  title: 'Subject Syllabus',
                  subtitle: 'Videos & Google Notes',
                  icon: Icons.menu_book,
                  color: AppTheme.secondaryViolet,
                  onTap: () => onNavigateTab(1),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildActionCard(
                  title: 'Take Exam Quiz',
                  subtitle: 'Timed MCQs Practice',
                  icon: Icons.quiz_outlined,
                  color: AppTheme.warning,
                  onTap: () => onNavigateTab(6),
                ),
              ),
            ],
          ),

          const SizedBox(height: 24),

          // 3. Subjects Progress Section
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Subjects & Syllabus Progress',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              TextButton(
                onPressed: () => onNavigateTab(1),
                child: const Text('View All',
                    style: TextStyle(color: AppTheme.violetLight)),
              ),
            ],
          ),
          const SizedBox(height: 8),

          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: subjects.take(4).length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, index) {
              final sub = subjects[index];
              return Card(
                child: InkWell(
                  borderRadius: BorderRadius.circular(16),
                  onTap: () {
                    onSelectSubject(sub);
                    onNavigateTab(1);
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Text(
                                sub.name,
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: AppTheme.surfaceElevated,
                                borderRadius: BorderRadius.circular(6),
                                border: Border.all(color: AppTheme.border),
                              ),
                              child: Text(
                                sub.code,
                                style: const TextStyle(
                                  color: AppTheme.violetLight,
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Text(
                          '${sub.units.length} Units • ${sub.completedTopics}/${sub.totalTopics} Topics Completed',
                          style: const TextStyle(
                              color: AppTheme.textSecondary, fontSize: 12),
                        ),
                        const SizedBox(height: 10),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: sub.progressPercentage / 100,
                            minHeight: 6,
                            backgroundColor: AppTheme.surfaceElevated,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              sub.progressPercentage >= 75
                                  ? AppTheme.success
                                  : AppTheme.primaryViolet,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),

          const SizedBox(height: 24),

          // 4. Today's Priority Tasks
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Today\'s Priority Tasks',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              TextButton(
                onPressed: () => onNavigateTab(4),
                child: const Text('All Tasks',
                    style: TextStyle(color: AppTheme.violetLight)),
              ),
            ],
          ),
          const SizedBox(height: 8),

          if (pendingTasks.isEmpty)
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.border),
              ),
              child: const Center(
                child: Text('All tasks completed! Great job! 🎉',
                    style: TextStyle(color: AppTheme.textSecondary)),
              ),
            )
          else
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: pendingTasks.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (context, index) {
                final task = pendingTasks[index];
                return Card(
                  child: ListTile(
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16, vertical: 8),
                    leading: CircleAvatar(
                      backgroundColor: task.priority == 'High'
                          ? AppTheme.danger.withOpacity(0.2)
                          : AppTheme.primaryViolet.withOpacity(0.2),
                      child: Icon(
                        task.priority == 'High'
                            ? Icons.priority_high
                            : Icons.task_alt,
                        color: task.priority == 'High'
                            ? AppTheme.danger
                            : AppTheme.primaryViolet,
                        size: 20,
                      ),
                    ),
                    title: Text(
                      task.title,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                        color: Colors.white,
                      ),
                    ),
                    subtitle: Text(
                      '${task.subjectName} • ${task.startTime} (${task.durationMinutes}m)',
                      style: const TextStyle(
                          color: AppTheme.textSecondary, fontSize: 12),
                    ),
                    trailing: Text(
                      task.status,
                      style: TextStyle(
                        color: task.status == 'In Progress'
                            ? AppTheme.warning
                            : AppTheme.violetLight,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                );
              },
            ),

          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildActionCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: color.withOpacity(0.2),
                child: Icon(icon, color: color, size: 22),
              ),
              const SizedBox(height: 12),
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style:
                    const TextStyle(color: AppTheme.textSecondary, fontSize: 11),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

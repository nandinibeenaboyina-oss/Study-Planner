import 'package:flutter/material.dart';
import '../models/study_log.dart';
import '../models/subject.dart';
import '../theme/app_theme.dart';

class AnalyticsScreen extends StatelessWidget {
  final List<Subject> subjects;
  final List<StudyLog> logs;

  const AnalyticsScreen({
    super.key,
    required this.subjects,
    required this.logs,
  });

  @override
  Widget build(BuildContext context) {
    int totalMinutes = 0;
    for (var l in logs) {
      totalMinutes += l.minutesStudied;
    }
    final totalHours = (totalMinutes / 60).toStringAsFixed(1);

    int totalTopics = 0;
    int completedTopics = 0;
    for (var s in subjects) {
      totalTopics += s.totalTopics;
      completedTopics += s.completedTopics;
    }
    final overallSyllabus = totalTopics > 0
        ? ((completedTopics / totalTopics) * 100).toStringAsFixed(1)
        : '0';

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Progress & Analytics',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 4),
              Text(
                'Track your daily study velocity and syllabus milestones',
                style: TextStyle(color: AppTheme.textSecondary, fontSize: 13),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // Overview Metric Cards
          Row(
            children: [
              Expanded(
                child: _buildMetricCard(
                  title: 'Total Study Time',
                  value: '$totalHours hrs',
                  subtitle: '${logs.length} logged sessions',
                  icon: Icons.timer,
                  color: AppTheme.primaryViolet,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildMetricCard(
                  title: 'Syllabus Covered',
                  value: '$overallSyllabus%',
                  subtitle: '$completedTopics of $totalTopics topics',
                  icon: Icons.menu_book,
                  color: AppTheme.success,
                ),
              ),
            ],
          ),

          const SizedBox(height: 24),

          // Daily Study Log Bar Chart Representation
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Recent Daily Study Hours',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: logs.take(7).map((log) {
                    final hours = log.minutesStudied / 60.0;
                    final heightFactor = (hours / 5.0).clamp(0.1, 1.0);

                    return Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          '${hours.toStringAsFixed(1)}h',
                          style: const TextStyle(color: AppTheme.violetLight, fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 6),
                        Container(
                          width: 24,
                          height: 100 * heightFactor,
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [AppTheme.primaryViolet, AppTheme.secondaryViolet],
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                            ),
                            borderRadius: BorderRadius.circular(6),
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          log.date.substring(5), // MM-DD
                          style: const TextStyle(color: AppTheme.textMuted, fontSize: 10),
                        ),
                      ],
                    );
                  }).toList(),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Subject-wise Breakdown
          const Text(
            'Subject Syllabus Breakdown',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 12),

          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: subjects.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, index) {
              final sub = subjects[index];
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              sub.name,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white),
                            ),
                          ),
                          Text(
                            '${sub.progressPercentage.toStringAsFixed(0)}%',
                            style: const TextStyle(color: AppTheme.violetLight, fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${sub.completedTopics} of ${sub.totalTopics} topics completed',
                        style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                      ),
                      const SizedBox(height: 8),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: sub.progressPercentage / 100,
                          minHeight: 6,
                          backgroundColor: AppTheme.surfaceElevated,
                          valueColor: AlwaysStoppedAnimation<Color>(
                            sub.progressPercentage >= 80 ? AppTheme.success : AppTheme.primaryViolet,
                          ),
                        ),
                      ),
                    ],
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

  Widget _buildMetricCard({
    required String title,
    required String value,
    required String subtitle,
    required IconData icon,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 18,
            backgroundColor: color.withOpacity(0.2),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(height: 12),
          Text(
            value,
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 2),
          Text(title, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
          const SizedBox(height: 4),
          Text(subtitle, style: const TextStyle(color: AppTheme.textMuted, fontSize: 11)),
        ],
      ),
    );
  }
}

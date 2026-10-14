import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/subject.dart';
import '../theme/app_theme.dart';

class SubjectsScreen extends StatefulWidget {
  final List<Subject> subjects;
  final Subject? selectedSubject;
  final Function(Subject?) onSelectSubject;
  final Function(String, String, bool) onToggleTopic;
  final Function(String) onAskAiCoach;

  const SubjectsScreen({
    super.key,
    required this.subjects,
    required this.selectedSubject,
    required this.onSelectSubject,
    required this.onToggleTopic,
    required this.onAskAiCoach,
  });

  @override
  State<SubjectsScreen> createState() => _SubjectsScreenState();
}

class _SubjectsScreenState extends State<SubjectsScreen> {
  String _selectedCategory = 'All';
  String _searchQuery = '';
  final Set<String> _expandedUnits = {};

  final List<String> _categories = [
    'All',
    'Core CSE',
    'Programming',
    'Aptitude',
  ];

  Future<void> _launchUrl(String urlString) async {
    final uri = Uri.parse(urlString);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Could not open $urlString')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    // If a subject is selected, show 2-Step Syllabus & Topic View
    if (widget.selectedSubject != null) {
      return _buildSubjectSyllabusView(widget.selectedSubject!);
    }

    // Otherwise show all subjects list
    return _buildSubjectsListView();
  }

  // STEP 1: Subjects List View
  Widget _buildSubjectsListView() {
    final filtered = widget.subjects.where((sub) {
      final matchesCategory =
          _selectedCategory == 'All' || sub.category == _selectedCategory;
      final matchesSearch = sub.name.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          sub.code.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).toList();

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Syllabus & Subjects',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'Select a subject to view its syllabus and topics',
                    style: TextStyle(color: AppTheme.textSecondary, fontSize: 13),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceElevated,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppTheme.border),
                ),
                child: Text(
                  '${widget.subjects.length} Subjects',
                  style: const TextStyle(
                      color: AppTheme.violetLight,
                      fontWeight: FontWeight.bold,
                      fontSize: 12),
                ),
              ),
            ],
          ),

          const SizedBox(height: 16),

          // Search Bar
          TextField(
            onChanged: (val) => setState(() => _searchQuery = val),
            decoration: InputDecoration(
              hintText: 'Search subject name, course code...',
              prefixIcon: const Icon(Icons.search, color: AppTheme.textMuted),
              suffixIcon: _searchQuery.isNotEmpty
                  ? IconButton(
                      icon: const Icon(Icons.clear, color: AppTheme.textMuted),
                      onPressed: () => setState(() => _searchQuery = ''),
                    )
                  : null,
            ),
          ),

          const SizedBox(height: 12),

          // Category Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: _categories.map((cat) {
                final isSelected = _selectedCategory == cat;
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: FilterChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (_) => setState(() => _selectedCategory = cat),
                    backgroundColor: AppTheme.surface,
                    selectedColor: AppTheme.primaryViolet.withOpacity(0.3),
                    checkmarkColor: AppTheme.primaryViolet,
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : AppTheme.textSecondary,
                      fontWeight:
                          isSelected ? FontWeight.bold : FontWeight.normal,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                      side: BorderSide(
                        color:
                            isSelected ? AppTheme.primaryViolet : AppTheme.border,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 16),

          // Subjects Grid / List
          Expanded(
            child: filtered.isEmpty
                ? const Center(
                    child: Text(
                      'No matching subjects found.',
                      style: TextStyle(color: AppTheme.textSecondary),
                    ),
                  )
                : ListView.separated(
                    itemCount: filtered.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final sub = filtered[index];
                      return _buildSubjectCard(sub);
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubjectCard(Subject sub) {
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: () => widget.onSelectSubject(sub),
        child: Padding(
          padding: const EdgeInsets.all(18.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryViolet.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                          color: AppTheme.primaryViolet.withOpacity(0.4)),
                    ),
                    child: Text(
                      sub.code,
                      style: const TextStyle(
                        color: AppTheme.violetLight,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: sub.priority == 'High'
                              ? AppTheme.danger.withOpacity(0.2)
                              : AppTheme.surfaceElevated,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          '${sub.priority} Priority',
                          style: TextStyle(
                            color: sub.priority == 'High'
                                ? AppTheme.danger
                                : AppTheme.textSecondary,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      const Icon(Icons.arrow_forward_ios,
                          size: 14, color: AppTheme.textMuted),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                sub.name,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 17,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                sub.description,
                style: const TextStyle(
                  color: AppTheme.textSecondary,
                  fontSize: 13,
                  height: 1.4,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${sub.units.length} Syllabus Units',
                    style: const TextStyle(
                      color: AppTheme.violetLight,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  Text(
                    '${sub.completedTopics}/${sub.totalTopics} Topics (${sub.progressPercentage.toStringAsFixed(0)}%)',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: sub.progressPercentage / 100,
                  minHeight: 8,
                  backgroundColor: AppTheme.surfaceElevated,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    sub.progressPercentage >= 80
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
  }

  // STEP 2: Subject Details & Syllabus Units Drill-Down
  Widget _buildSubjectSyllabusView(Subject sub) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Back Button
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back, color: Colors.white),
                onPressed: () => widget.onSelectSubject(null),
              ),
              const SizedBox(width: 4),
              const Text(
                'Back to All Subjects',
                style: TextStyle(
                    color: AppTheme.violetLight,
                    fontWeight: FontWeight.bold,
                    fontSize: 14),
              ),
            ],
          ),

          const SizedBox(height: 8),

          // Subject Header Card
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.primaryViolet.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        sub.code,
                        style: const TextStyle(
                          color: AppTheme.violetLight,
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.surfaceElevated,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppTheme.border),
                      ),
                      child: Text(
                        'Exam: ${sub.examDate}',
                        style: const TextStyle(
                          color: AppTheme.textSecondary,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  sub.name,
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  sub.description,
                  style: const TextStyle(
                      color: AppTheme.textSecondary, fontSize: 13, height: 1.4),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Syllabus Completion: ${sub.progressPercentage.toStringAsFixed(1)}%',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: AppTheme.violetLight,
                        fontSize: 13,
                      ),
                    ),
                    Text(
                      '${sub.completedTopics} of ${sub.totalTopics} Topics Completed',
                      style: const TextStyle(
                          color: AppTheme.textSecondary, fontSize: 12),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: LinearProgressIndicator(
                    value: sub.progressPercentage / 100,
                    minHeight: 8,
                    backgroundColor: AppTheme.surfaceElevated,
                    valueColor: const AlwaysStoppedAnimation<Color>(
                        AppTheme.primaryViolet),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Section Title
          const Row(
            children: [
              Icon(Icons.list_alt, color: AppTheme.primaryViolet, size: 20),
              SizedBox(width: 8),
              Text(
                'Syllabus Units & Related Topics',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          const Text(
            'Click on any unit to expand its topics. Each topic has direct YouTube videos, Google notes, and AI tutor shortcuts.',
            style: TextStyle(color: AppTheme.textSecondary, fontSize: 12),
          ),

          const SizedBox(height: 16),

          // Syllabus Units List
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: sub.units.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final unit = sub.units[index];
              final isExpanded = _expandedUnits.contains(unit.id);
              final completedInUnit =
                  unit.topics.where((t) => t.isCompleted).length;

              return Card(
                child: Column(
                  children: [
                    // Unit Header (Click to expand)
                    InkWell(
                      borderRadius: BorderRadius.circular(16),
                      onTap: () {
                        setState(() {
                          if (isExpanded) {
                            _expandedUnits.remove(unit.id);
                          } else {
                            _expandedUnits.add(unit.id);
                          }
                        });
                      },
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 10, vertical: 6),
                              decoration: BoxDecoration(
                                color: AppTheme.primaryViolet.withOpacity(0.15),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                unit.unitNumber,
                                style: const TextStyle(
                                  color: AppTheme.violetLight,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    unit.unitTitle,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                      color: Colors.white,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '$completedInUnit/${unit.topics.length} Topics Completed',
                                    style: const TextStyle(
                                      color: AppTheme.textSecondary,
                                      fontSize: 12,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Icon(
                              isExpanded
                                  ? Icons.keyboard_arrow_up
                                  : Icons.keyboard_arrow_down,
                              color: AppTheme.violetLight,
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Expanded Topics
                    if (isExpanded) ...[
                      const Divider(height: 1, color: AppTheme.border),
                      ListView.separated(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: unit.topics.length,
                        separatorBuilder: (_, __) =>
                            const Divider(height: 1, color: AppTheme.border),
                        itemBuilder: (context, tIndex) {
                          final topic = unit.topics[tIndex];
                          return Padding(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 16, vertical: 12),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    // Checkbox to mark complete
                                    Checkbox(
                                      value: topic.isCompleted,
                                      activeColor: AppTheme.primaryViolet,
                                      checkColor: Colors.white,
                                      onChanged: (val) {
                                        widget.onToggleTopic(
                                          sub.id,
                                          topic.id,
                                          val ?? false,
                                        );
                                      },
                                    ),
                                    Expanded(
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 8.0),
                                        child: Text(
                                          topic.title,
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.w600,
                                            color: topic.isCompleted
                                                ? AppTheme.textSecondary
                                                : Colors.white,
                                            decoration: topic.isCompleted
                                                ? TextDecoration.lineThrough
                                                : null,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 8),

                                // Action Buttons (YouTube, Google Notes, Ask AI)
                                Padding(
                                  padding: const EdgeInsets.only(left: 48.0),
                                  child: Wrap(
                                    spacing: 8,
                                    runSpacing: 8,
                                    children: [
                                      // 1. YouTube Video Button
                                      ElevatedButton.icon(
                                        onPressed: () =>
                                            _launchUrl(topic.youtubeUrl),
                                        icon: const Icon(
                                          Icons.play_circle_fill,
                                          size: 16,
                                          color: Colors.white,
                                        ),
                                        label: const Text(
                                          'YouTube Video',
                                          style: TextStyle(fontSize: 11),
                                        ),
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor:
                                              const Color(0xFFDC2626), // YouTube Red
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 10, vertical: 6),
                                          minimumSize: Size.zero,
                                        ),
                                      ),

                                      // 2. Google Notes Button
                                      ElevatedButton.icon(
                                        onPressed: () =>
                                            _launchUrl(topic.notesUrl),
                                        icon: const Icon(
                                          Icons.article_outlined,
                                          size: 16,
                                          color: Colors.white,
                                        ),
                                        label: const Text(
                                          'Google Notes',
                                          style: TextStyle(fontSize: 11),
                                        ),
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor:
                                              const Color(0xFF2563EB), // Blue
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 10, vertical: 6),
                                          minimumSize: Size.zero,
                                        ),
                                      ),

                                      // 3. Ask AI Coach Button
                                      ElevatedButton.icon(
                                        onPressed: () => widget.onAskAiCoach(
                                            'Explain "${topic.title}" in ${sub.name} in detail with key formulas and concepts.'),
                                        icon: const Icon(
                                          Icons.auto_awesome,
                                          size: 16,
                                          color: Colors.white,
                                        ),
                                        label: const Text(
                                          'Ask AI Coach',
                                          style: TextStyle(fontSize: 11),
                                        ),
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor:
                                              AppTheme.secondaryViolet,
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 10, vertical: 6),
                                          minimumSize: Size.zero,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ],
                  ],
                ),
              );
            },
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }
}

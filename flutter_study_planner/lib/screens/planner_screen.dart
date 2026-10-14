import 'package:flutter/material.dart';
import '../models/study_task.dart';
import '../models/subject.dart';
import '../theme/app_theme.dart';

class PlannerScreen extends StatefulWidget {
  final List<StudyTask> tasks;
  final List<Subject> subjects;
  final Function(StudyTask) onAddTask;
  final Function(String, String) onUpdateStatus;
  final Function(String) onDeleteTask;

  const PlannerScreen({
    super.key,
    required this.tasks,
    required this.subjects,
    required this.onAddTask,
    required this.onUpdateStatus,
    required this.onDeleteTask,
  });

  @override
  State<PlannerScreen> createState() => _PlannerScreenState();
}

class _PlannerScreenState extends State<PlannerScreen> {
  String _filter = 'All'; // 'All', 'Pending', 'In Progress', 'Completed'

  void _showAddTaskDialog() {
    final titleController = TextEditingController();
    final descController = TextEditingController();
    String selectedSubject = widget.subjects.isNotEmpty ? widget.subjects.first.name : 'General';
    String priority = 'Medium';
    int duration = 60;
    String time = '10:00 AM';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppTheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom + 20,
                left: 20,
                right: 20,
                top: 20,
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Schedule New Study Task',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: titleController,
                      decoration: const InputDecoration(labelText: 'Task Title (e.g. Solve DP Problems)'),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: descController,
                      decoration: const InputDecoration(labelText: 'Description / Topics to cover'),
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<String>(
                      value: selectedSubject,
                      decoration: const InputDecoration(labelText: 'Subject'),
                      dropdownColor: AppTheme.surfaceElevated,
                      items: widget.subjects.map((s) {
                        return DropdownMenuItem(value: s.name, child: Text(s.name));
                      }).toList(),
                      onChanged: (val) {
                        if (val != null) setModalState(() => selectedSubject = val);
                      },
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            value: priority,
                            decoration: const InputDecoration(labelText: 'Priority'),
                            dropdownColor: AppTheme.surfaceElevated,
                            items: ['High', 'Medium', 'Low'].map((p) {
                              return DropdownMenuItem(value: p, child: Text(p));
                            }).toList>,
                            onChanged: (val) {
                              if (val != null) setModalState(() => priority = val);
                            },
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: TextField(
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(labelText: 'Minutes'),
                            controller: TextEditingController(text: duration.toString()),
                            onChanged: (val) => duration = int.tryParse(val) ?? 60,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          if (titleController.text.trim().isEmpty) return;
                          final newTask = StudyTask(
                            id: DateTime.now().millisecondsSinceEpoch.toString(),
                            title: titleController.text.trim(),
                            subjectName: selectedSubject,
                            description: descController.text.trim(),
                            date: DateTime.now().toIso8601String().substring(0, 10),
                            startTime: time,
                            durationMinutes: duration,
                            priority: priority,
                            status: 'Pending',
                          );
                          widget.onAddTask(newTask);
                          Navigator.pop(ctx);
                        },
                        child: const Text('Add Task to Timetable'),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final filtered = widget.tasks.where((t) {
      if (_filter == 'All') return true;
      return t.status == _filter;
    }).toList();

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header with Add Button
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Study Task Planner',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'Daily goals, priorities & exam revision schedule',
                    style: TextStyle(color: AppTheme.textSecondary, fontSize: 13),
                  ),
                ],
              ),
              ElevatedButton.icon(
                onPressed: _showAddTaskDialog,
                icon: const Icon(Icons.add, size: 18),
                label: const Text('New Task'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                ),
              ),
            ],
          ),

          const SizedBox(height: 16),

          // Filter Segment
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: ['All', 'Pending', 'In Progress', 'Completed'].map((status) {
                final isSelected = _filter == status;
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: FilterChip(
                    label: Text(status),
                    selected: isSelected,
                    onSelected: (_) => setState(() => _filter = status),
                    backgroundColor: AppTheme.surface,
                    selectedColor: AppTheme.primaryViolet.withOpacity(0.3),
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : AppTheme.textSecondary,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 16),

          // Task List
          Expanded(
            child: filtered.isEmpty
                ? const Center(
                    child: Text(
                      'No tasks found for this filter.',
                      style: TextStyle(color: AppTheme.textSecondary),
                    ),
                  )
                : ListView.separated(
                    itemCount: filtered.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final task = filtered[index];
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Checkbox(
                                    value: task.status == 'Completed',
                                    activeColor: AppTheme.primaryViolet,
                                    onChanged: (val) {
                                      widget.onUpdateStatus(
                                        task.id,
                                        (val ?? false) ? 'Completed' : 'Pending',
                                      );
                                    },
                                  ),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          task.title,
                                          style: TextStyle(
                                            fontSize: 15,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                            decoration: task.status == 'Completed'
                                                ? TextDecoration.lineThrough
                                                : null,
                                          ),
                                        ),
                                        if (task.description.isNotEmpty) ...[
                                          const SizedBox(height: 4),
                                          Text(
                                            task.description,
                                            style: const TextStyle(
                                              color: AppTheme.textSecondary,
                                              fontSize: 12,
                                            ),
                                          ),
                                        ],
                                        const SizedBox(height: 8),
                                        Wrap(
                                          spacing: 8,
                                          runSpacing: 4,
                                          children: [
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                              decoration: BoxDecoration(
                                                color: AppTheme.surfaceElevated,
                                                borderRadius: BorderRadius.circular(4),
                                              ),
                                              child: Text(
                                                task.subjectName,
                                                style: const TextStyle(color: AppTheme.violetLight, fontSize: 11),
                                              ),
                                            ),
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                              decoration: BoxDecoration(
                                                color: task.priority == 'High'
                                                    ? AppTheme.danger.withOpacity(0.2)
                                                    : AppTheme.surfaceElevated,
                                                borderRadius: BorderRadius.circular(4),
                                              ),
                                              child: Text(
                                                '${task.priority} Priority',
                                                style: TextStyle(
                                                  color: task.priority == 'High' ? AppTheme.danger : AppTheme.textMuted,
                                                  fontSize: 11,
                                                ),
                                              ),
                                            ),
                                            Text(
                                              '⏱ ${task.durationMinutes} min',
                                              style: const TextStyle(color: AppTheme.textMuted, fontSize: 11),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                  PopupMenuButton<String>(
                                    icon: const Icon(Icons.more_vert, color: AppTheme.textMuted, size: 20),
                                    color: AppTheme.surfaceElevated,
                                    onSelected: (val) {
                                      if (val == 'delete') {
                                        widget.onDeleteTask(task.id);
                                      } else {
                                        widget.onUpdateStatus(task.id, val);
                                      }
                                    },
                                    itemBuilder: (context) => [
                                      const PopupMenuItem(value: 'Pending', child: Text('Mark Pending')),
                                      const PopupMenuItem(value: 'In Progress', child: Text('Mark In Progress')),
                                      const PopupMenuItem(value: 'Completed', child: Text('Mark Completed')),
                                      const PopupMenuDivider(),
                                      const PopupMenuItem(
                                        value: 'delete',
                                        child: Text('Delete Task', style: TextStyle(color: AppTheme.danger)),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

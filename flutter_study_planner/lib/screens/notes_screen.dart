import 'package:flutter/material.dart';
import '../models/study_note.dart';
import '../models/subject.dart';
import '../theme/app_theme.dart';

class NotesScreen extends StatefulWidget {
  final List<StudyNote> notes;
  final List<Subject> subjects;
  final Function(StudyNote) onAddNote;
  final Function(String) onDeleteNote;

  const NotesScreen({
    super.key,
    required this.notes,
    required this.subjects,
    required this.onAddNote,
    required this.onDeleteNote,
  });

  @override
  State<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  String _searchQuery = '';
  String _selectedCategory = 'All';

  final List<String> _categories = ['All', 'Important', 'Concept', 'Formula', 'Interview'];

  void _showAddNoteDialog() {
    final titleController = TextEditingController();
    final contentController = TextEditingController();
    final tagsController = TextEditingController();
    String selectedSubject = widget.subjects.isNotEmpty ? widget.subjects.first.name : 'General';
    String selectedCat = 'Important';

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
                      'Create Study Note',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: titleController,
                      decoration: const InputDecoration(labelText: 'Note Title'),
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<String>(
                      value: selectedSubject,
                      decoration: const InputDecoration(labelText: 'Subject'),
                      dropdownColor: AppTheme.surfaceElevated,
                      items: widget.subjects.map((s) => DropdownMenuItem(value: s.name, child: Text(s.name))).toList(),
                      onChanged: (val) {
                        if (val != null) setModalState(() => selectedSubject = val);
                      },
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<String>(
                      value: selectedCat,
                      decoration: const InputDecoration(labelText: 'Category'),
                      dropdownColor: AppTheme.surfaceElevated,
                      items: ['Important', 'Concept', 'Formula', 'Interview']
                          .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                          .toList(),
                      onChanged: (val) {
                        if (val != null) setModalState(() => selectedCat = val);
                      },
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: contentController,
                      maxLines: 5,
                      decoration: const InputDecoration(labelText: 'Notes Content (Summary, Formulas, Code)'),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: tagsController,
                      decoration: const InputDecoration(labelText: 'Tags (comma separated, e.g. dbms, acid, gate)'),
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          if (titleController.text.trim().isEmpty || contentController.text.trim().isEmpty) return;
                          final newNote = StudyNote(
                            id: DateTime.now().millisecondsSinceEpoch.toString(),
                            title: titleController.text.trim(),
                            subjectName: selectedSubject,
                            content: contentController.text.trim(),
                            category: selectedCat,
                            tags: tagsController.text
                                .split(',')
                                .map((t) => t.trim().toLowerCase())
                                .where((t) => t.isNotEmpty)
                                .toList(),
                            updatedAt: DateTime.now().toIso8601String().substring(0, 10),
                          );
                          widget.onAddNote(newNote);
                          Navigator.pop(ctx);
                        },
                        child: const Text('Save Note'),
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
    final filtered = widget.notes.where((note) {
      final matchesCat = _selectedCategory == 'All' || note.category == _selectedCategory;
      final matchesSearch = note.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          note.content.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          note.subjectName.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
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
                    'Study Notes Repository',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'Subject-wise cheat sheets, key formulas & viva notes',
                    style: TextStyle(color: AppTheme.textSecondary, fontSize: 13),
                  ),
                ],
              ),
              ElevatedButton.icon(
                onPressed: _showAddNoteDialog,
                icon: const Icon(Icons.add, size: 18),
                label: const Text('New Note'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                ),
              ),
            ],
          ),

          const SizedBox(height: 16),

          // Search
          TextField(
            onChanged: (val) => setState(() => _searchQuery = val),
            decoration: const InputDecoration(
              hintText: 'Search notes by keyword, subject, tag...',
              prefixIcon: Icon(Icons.search, color: AppTheme.textMuted),
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

          // Notes List
          Expanded(
            child: filtered.isEmpty
                ? const Center(
                    child: Text('No notes found.', style: TextStyle(color: AppTheme.textSecondary)),
                  )
                : ListView.separated(
                    itemCount: filtered.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final note = filtered[index];
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: AppTheme.primaryViolet.withOpacity(0.15),
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: Text(
                                      note.subjectName,
                                      style: const TextStyle(color: AppTheme.violetLight, fontSize: 11, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                  Row(
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: AppTheme.surfaceElevated,
                                          borderRadius: BorderRadius.circular(6),
                                        ),
                                        child: Text(
                                          note.category,
                                          style: const TextStyle(color: AppTheme.textSecondary, fontSize: 11),
                                        ),
                                      ),
                                      IconButton(
                                        icon: const Icon(Icons.delete_outline, size: 18, color: AppTheme.textMuted),
                                        onPressed: () => widget.onDeleteNote(note.id),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                note.title,
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                  color: Colors.white,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                note.content,
                                style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13, height: 1.5),
                              ),
                              if (note.tags.isNotEmpty) ...[
                                const SizedBox(height: 12),
                                Wrap(
                                  spacing: 6,
                                  children: note.tags.map((t) {
                                    return Text('#$t', style: const TextStyle(color: AppTheme.violetLight, fontSize: 11));
                                  }).toList(),
                                ),
                              ],
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

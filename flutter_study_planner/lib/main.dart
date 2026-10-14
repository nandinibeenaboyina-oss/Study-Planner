import 'package:flutter/material.dart';
import 'data/initial_data.dart';
import 'models/user_profile.dart';
import 'models/subject.dart';
import 'models/study_task.dart';
import 'models/study_note.dart';
import 'models/quiz.dart';
import 'models/study_log.dart';
import 'theme/app_theme.dart';
import 'screens/dashboard_screen.dart';
import 'screens/subjects_screen.dart';
import 'screens/ai_coach_screen.dart';
import 'screens/timer_screen.dart';
import 'screens/planner_screen.dart';
import 'screens/notes_screen.dart';
import 'screens/quizzes_screen.dart';
import 'screens/analytics_screen.dart';
import 'screens/settings_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CseStudyPlannerApp());
}

class CseStudyPlannerApp extends StatelessWidget {
  const CseStudyPlannerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CSE Study Planner',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const MainNavigationShell(),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentTabIndex = 0;

  late UserProfile _profile;
  late List<Subject> _subjects;
  late List<StudyTask> _tasks;
  late List<StudyNote> _notes;
  late List<QuizQuestion> _quizQuestions;
  late List<StudyLog> _studyLogs;

  Subject? _selectedSubject;
  String? _aiInitialQuery;

  @override
  void initState() {
    super.initState();
    _profile = InitialData.profile;
    _subjects = InitialData.subjects;
    _tasks = InitialData.tasks;
    _notes = InitialData.notes;
    _quizQuestions = InitialData.quizQuestions;
    _studyLogs = InitialData.studyLogs;
  }

  void _toggleTopic(String subjectId, String topicId, bool isCompleted) {
    setState(() {
      for (var sub in _subjects) {
        if (sub.id == subjectId) {
          for (var unit in sub.units) {
            for (var topic in unit.topics) {
              if (topic.id == topicId) {
                topic.isCompleted = isCompleted;
                break;
              }
            }
          }
        }
      }
    });
  }

  void _askAiCoach(String query) {
    setState(() {
      _aiInitialQuery = query;
      _currentTabIndex = 2; // AI Coach tab
    });
  }

  void _logStudySession(StudyLog log) {
    setState(() {
      _studyLogs.insert(0, log);
    });
  }

  void _addTask(StudyTask task) {
    setState(() {
      _tasks.insert(0, task);
    });
  }

  void _updateTaskStatus(String taskId, String newStatus) {
    setState(() {
      final task = _tasks.firstWhere((t) => t.id == taskId);
      task.status = newStatus;
    });
  }

  void _deleteTask(String taskId) {
    setState(() {
      _tasks.removeWhere((t) => t.id == taskId);
    });
  }

  void _addNote(StudyNote note) {
    setState(() {
      _notes.insert(0, note);
    });
  }

  void _deleteNote(String noteId) {
    setState(() {
      _notes.removeWhere((n) => n.id == noteId);
    });
  }

  void _updateProfile(UserProfile updated) {
    setState(() {
      _profile = updated;
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = [
      DashboardScreen(
        profile: _profile,
        subjects: _subjects,
        tasks: _tasks,
        onNavigateTab: (index) => setState(() => _currentTabIndex = index),
        onSelectSubject: (sub) => setState(() => _selectedSubject = sub),
      ),
      SubjectsScreen(
        subjects: _subjects,
        selectedSubject: _selectedSubject,
        onSelectSubject: (sub) => setState(() => _selectedSubject = sub),
        onToggleTopic: _toggleTopic,
        onAskAiCoach: _askAiCoach,
      ),
      AiCoachScreen(
        initialQuery: _aiInitialQuery,
        onClearInitialQuery: () => setState(() => _aiInitialQuery = null),
      ),
      TimerScreen(
        subjects: _subjects,
        onLogSession: _logStudySession,
      ),
      PlannerScreen(
        tasks: _tasks,
        subjects: _subjects,
        onAddTask: _addTask,
        onUpdateStatus: _updateTaskStatus,
        onDeleteTask: _deleteTask,
      ),
      NotesScreen(
        notes: _notes,
        subjects: _subjects,
        onAddNote: _addNote,
        onDeleteNote: _deleteNote,
      ),
      QuizzesScreen(
        questions: _quizQuestions,
      ),
      AnalyticsScreen(
        subjects: _subjects,
        logs: _studyLogs,
      ),
      SettingsScreen(
        profile: _profile,
        onUpdateProfile: _updateProfile,
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppTheme.primaryViolet, AppTheme.secondaryViolet],
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.school, size: 20, color: Colors.white),
            ),
            const SizedBox(width: 10),
            const Text(
              'CSE Study Planner',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18,
                letterSpacing: 0.5,
                color: Colors.white,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.timer_outlined, color: AppTheme.violetLight),
            tooltip: 'Study Timer',
            onPressed: () => setState(() => _currentTabIndex = 3),
          ),
          IconButton(
            icon: const Icon(Icons.auto_awesome, color: AppTheme.primaryViolet),
            tooltip: 'AI Coach',
            onPressed: () => setState(() => _currentTabIndex = 2),
          ),
          IconButton(
            icon: const Icon(Icons.person_outline, color: AppTheme.textSecondary),
            tooltip: 'Profile Settings',
            onPressed: () => setState(() => _currentTabIndex = 8),
          ),
        ],
      ),
      body: IndexedStack(
        index: _currentTabIndex,
        children: screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentTabIndex.clamp(0, 4),
        backgroundColor: AppTheme.surface,
        indicatorColor: AppTheme.primaryViolet.withOpacity(0.25),
        onDestinationSelected: (idx) {
          setState(() {
            _currentTabIndex = idx;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined, color: AppTheme.textSecondary),
            selectedIcon: Icon(Icons.dashboard, color: AppTheme.primaryViolet),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.menu_book_outlined, color: AppTheme.textSecondary),
            selectedIcon: Icon(Icons.menu_book, color: AppTheme.primaryViolet),
            label: 'Syllabus',
          ),
          NavigationDestination(
            icon: Icon(Icons.auto_awesome_outlined, color: AppTheme.textSecondary),
            selectedIcon: Icon(Icons.auto_awesome, color: AppTheme.primaryViolet),
            label: 'AI Coach',
          ),
          NavigationDestination(
            icon: Icon(Icons.timer_outlined, color: AppTheme.textSecondary),
            selectedIcon: Icon(Icons.timer, color: AppTheme.primaryViolet),
            label: 'Timer',
          ),
          NavigationDestination(
            icon: Icon(Icons.task_alt_outlined, color: AppTheme.textSecondary),
            selectedIcon: Icon(Icons.task_alt, color: AppTheme.primaryViolet),
            label: 'Tasks',
          ),
        ],
      ),
      drawer: Drawer(
        backgroundColor: AppTheme.surface,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF2E1065), Color(0xFF1E1B4B)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: AppTheme.primaryViolet,
                    child: Text(
                      _profile.name.isNotEmpty ? _profile.name[0] : 'U',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _profile.name,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  Text(
                    '${_profile.branch} • ${_profile.semester}',
                    style: const TextStyle(color: AppTheme.textSecondary, fontSize: 11),
                  ),
                ],
              ),
            ),
            _buildDrawerTile(Icons.dashboard_outlined, 'Dashboard', 0),
            _buildDrawerTile(Icons.menu_book_outlined, 'Syllabus & Subjects', 1),
            _buildDrawerTile(Icons.auto_awesome_outlined, 'AI Study Coach', 2),
            _buildDrawerTile(Icons.timer_outlined, 'Focus Study Timer', 3),
            _buildDrawerTile(Icons.task_alt_outlined, 'Study Planner & Timetable', 4),
            _buildDrawerTile(Icons.edit_note_outlined, 'Study Notes Repository', 5),
            _buildDrawerTile(Icons.quiz_outlined, 'Exam Practice Quizzes', 6),
            _buildDrawerTile(Icons.bar_chart_outlined, 'Progress & Analytics', 7),
            const Divider(color: AppTheme.border),
            _buildDrawerTile(Icons.settings_outlined, 'Profile & Settings', 8),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawerTile(IconData icon, String title, int tabIndex) {
    final isSelected = _currentTabIndex == tabIndex;
    return ListTile(
      leading: Icon(
        icon,
        color: isSelected ? AppTheme.primaryViolet : AppTheme.textSecondary,
      ),
      title: Text(
        title,
        style: TextStyle(
          color: isSelected ? Colors.white : AppTheme.textSecondary,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          fontSize: 14,
        ),
      ),
      selected: isSelected,
      selectedTileColor: AppTheme.primaryViolet.withOpacity(0.15),
      onTap: () {
        Navigator.pop(context);
        setState(() => _currentTabIndex = tabIndex);
      },
    );
  }
}

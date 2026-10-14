import 'dart:async';
import 'package:flutter/material.dart';
import '../models/study_log.dart';
import '../models/subject.dart';
import '../theme/app_theme.dart';

class TimerScreen extends StatefulWidget {
  final List<Subject> subjects;
  final Function(StudyLog) onLogSession;

  const TimerScreen({
    super.key,
    required this.subjects,
    required this.onLogSession,
  });

  @override
  State<TimerScreen> createState() => _TimerScreenState();
}

class _TimerScreenState extends State<TimerScreen> {
  Timer? _timer;
  int _initialSeconds = 25 * 60;
  int _remainingSeconds = 25 * 60;
  bool _isRunning = false;
  String _activeMode = 'Pomodoro'; // 'Pomodoro', 'Deep Work', 'Power Hour', 'Stopwatch'
  String _selectedSubject = 'Database Management Systems';

  final List<Map<String, dynamic>> _modes = [
    {'name': 'Pomodoro', 'minutes': 25, 'desc': '25 min focus + 5 min rest'},
    {'name': 'Deep Work', 'minutes': 50, 'desc': '50 min heavy focus'},
    {'name': 'Power Hour', 'minutes': 45, 'desc': '45 min problem solving'},
    {'name': 'Stopwatch', 'minutes': 0, 'desc': 'Open study counter'},
  ];

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _switchMode(String mode, int minutes) {
    _timer?.cancel();
    setState(() {
      _activeMode = mode;
      _isRunning = false;
      if (mode == 'Stopwatch') {
        _initialSeconds = 0;
        _remainingSeconds = 0;
      } else {
        _initialSeconds = minutes * 60;
        _remainingSeconds = minutes * 60;
      }
    });
  }

  void _toggleTimer() {
    if (_isRunning) {
      _timer?.cancel();
      setState(() => _isRunning = false);
    } else {
      setState(() => _isRunning = true);
      _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
        if (_activeMode == 'Stopwatch') {
          setState(() => _remainingSeconds++);
        } else {
          if (_remainingSeconds > 0) {
            setState(() => _remainingSeconds--);
          } else {
            _timer?.cancel();
            setState(() => _isRunning = false);
            _completeSession();
          }
        }
      });
    }
  }

  void _resetTimer() {
    _timer?.cancel();
    setState(() {
      _isRunning = false;
      _remainingSeconds = _initialSeconds;
    });
  }

  void _completeSession() {
    final minutes = _activeMode == 'Stopwatch'
        ? (_remainingSeconds / 60).round()
        : (_initialSeconds / 60).round();

    if (minutes > 0) {
      widget.onLogSession(
        StudyLog(
          date: DateTime.now().toIso8601String().substring(0, 10),
          minutesStudied: minutes,
          subjectName: _selectedSubject,
        ),
      );
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('🎉 Awesome! Logged $minutes minutes of study for $_selectedSubject!'),
          backgroundColor: AppTheme.success,
        ),
      );
    }
  }

  String _formatTime(int totalSeconds) {
    final mins = (totalSeconds ~/ 60).toString().padLeft(2, '0');
    final secs = (totalSeconds % 60).toString().padLeft(2, '0');
    return '$mins:$secs';
  }

  @override
  Widget build(BuildContext context) {
    final double progress = _activeMode == 'Stopwatch'
        ? 1.0
        : (_initialSeconds > 0 ? (_remainingSeconds / _initialSeconds) : 0.0);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          // Header
          const Column(
            children: [
              Text(
                'Focus Study Timer',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 4),
              Text(
                'Stay in flow, eliminate distractions, and log hours',
                style: TextStyle(color: AppTheme.textSecondary, fontSize: 13),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // Mode Selector Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: _modes.map((m) {
                final isSelected = _activeMode == m['name'];
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: ChoiceChip(
                    label: Text(m['name']),
                    selected: isSelected,
                    onSelected: (_) => _switchMode(m['name'], m['minutes']),
                    selectedColor: AppTheme.primaryViolet,
                    backgroundColor: AppTheme.surfaceElevated,
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : AppTheme.textSecondary,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 30),

          // Big Circular Timer
          Stack(
            alignment: Alignment.center,
            children: [
              SizedBox(
                width: 240,
                height: 240,
                child: CircularProgressIndicator(
                  value: progress,
                  strokeWidth: 12,
                  backgroundColor: AppTheme.surfaceElevated,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    _isRunning ? AppTheme.primaryViolet : AppTheme.secondaryViolet,
                  ),
                ),
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    _formatTime(_remainingSeconds),
                    style: const TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _activeMode,
                    style: const TextStyle(
                      color: AppTheme.violetLight,
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceElevated,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      _isRunning ? 'FOCUS MODE ACTIVE' : 'PAUSED',
                      style: TextStyle(
                        color: _isRunning ? AppTheme.success : AppTheme.textMuted,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),

          const SizedBox(height: 30),

          // Subject Tag Selector
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.border),
            ),
            child: DropdownButtonHideUnderline(
              child: DropdownButton<String>(
                value: widget.subjects.any((s) => s.name == _selectedSubject)
                    ? _selectedSubject
                    : (widget.subjects.isNotEmpty ? widget.subjects.first.name : null),
                isExpanded: true,
                dropdownColor: AppTheme.surfaceElevated,
                items: widget.subjects.map((sub) {
                  return DropdownMenuItem<String>(
                    value: sub.name,
                    child: Text(
                      'Studying: ${sub.name}',
                      style: const TextStyle(color: Colors.white, fontSize: 13),
                    ),
                  );
                }).toList(),
                onChanged: (val) {
                  if (val != null) setState(() => _selectedSubject = val);
                },
              ),
            ),
          ),

          const SizedBox(height: 24),

          // Action Buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              OutlinedButton.icon(
                onPressed: _resetTimer,
                icon: const Icon(Icons.refresh),
                label: const Text('Reset'),
              ),
              const SizedBox(width: 16),
              ElevatedButton.icon(
                onPressed: _toggleTimer,
                icon: Icon(_isRunning ? Icons.pause : Icons.play_arrow),
                label: Text(_isRunning ? 'Pause' : 'Start Focus'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isRunning ? AppTheme.warning : AppTheme.primaryViolet,
                  padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
                ),
              ),
              if (_isRunning || _remainingSeconds != _initialSeconds) ...[
                const SizedBox(width: 16),
                IconButton.filledTonal(
                  icon: const Icon(Icons.check, color: AppTheme.success),
                  tooltip: 'Finish & Log Session',
                  onPressed: () {
                    _timer?.cancel();
                    setState(() => _isRunning = false);
                    _completeSession();
                  },
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}

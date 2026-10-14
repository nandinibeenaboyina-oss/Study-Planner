import 'dart:async';
import 'package:flutter/material.dart';
import '../models/quiz.dart';
import '../theme/app_theme.dart';

class QuizzesScreen extends StatefulWidget {
  final List<QuizQuestion> questions;

  const QuizzesScreen({super.key, required this.questions});

  @override
  State<QuizzesScreen> createState() => _QuizzesScreenState();
}

class _QuizzesScreenState extends State<QuizzesScreen> {
  int _currentIndex = 0;
  int? _selectedOption;
  bool _hasSubmitted = false;
  int _correctCount = 0;
  bool _isQuizCompleted = false;

  Timer? _timer;
  int _secondsLeft = 120; // 2 minutes total test time

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsLeft > 0) {
        setState(() => _secondsLeft--);
      } else {
        _timer?.cancel();
        setState(() => _isQuizCompleted = true);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _submitAnswer() {
    if (_selectedOption == null) return;
    final currentQ = widget.questions[_currentIndex];
    final isCorrect = _selectedOption == currentQ.correctIndex;

    setState(() {
      _hasSubmitted = true;
      if (isCorrect) _correctCount++;
    });
  }

  void _nextQuestion() {
    if (_currentIndex < widget.questions.length - 1) {
      setState(() {
        _currentIndex++;
        _selectedOption = null;
        _hasSubmitted = false;
      });
    } else {
      _timer?.cancel();
      setState(() => _isQuizCompleted = true);
    }
  }

  void _restartQuiz() {
    _timer?.cancel();
    setState(() {
      _currentIndex = 0;
      _selectedOption = null;
      _hasSubmitted = false;
      _correctCount = 0;
      _isQuizCompleted = false;
      _secondsLeft = 120;
    });
    _startTimer();
  }

  @override
  Widget build(BuildContext context) {
    if (_isQuizCompleted) {
      final percentage = (widget.questions.isNotEmpty)
          ? ((_correctCount / widget.questions.length) * 100).toStringAsFixed(1)
          : '0';

      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  color: AppTheme.primaryViolet.withOpacity(0.2),
                  shape: BoxShape.circle,
                  border: Border.all(color: AppTheme.primaryViolet, width: 2),
                ),
                child: const Icon(Icons.emoji_events, size: 40, color: AppTheme.warning),
              ),
              const SizedBox(height: 20),
              const Text(
                'Exam Practice Completed! 🎉',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              const SizedBox(height: 8),
              Text(
                'You scored $_correctCount out of ${widget.questions.length} questions correctly ($percentage%).',
                textAlign: TextAlign.center,
                style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14),
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _restartQuiz,
                icon: const Icon(Icons.replay),
                label: const Text('Try Again'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                ),
              ),
            ],
          ),
        ),
      );
    }

    final currentQ = widget.questions[_currentIndex];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Header & Countdown Timer
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.primaryViolet.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  currentQ.category,
                  style: const TextStyle(color: AppTheme.violetLight, fontWeight: FontWeight.bold, fontSize: 12),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: _secondsLeft < 30 ? AppTheme.danger.withOpacity(0.2) : AppTheme.surfaceElevated,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: _secondsLeft < 30 ? AppTheme.danger : AppTheme.border),
                ),
                child: Row(
                  children: [
                    Icon(Icons.timer, size: 14, color: _secondsLeft < 30 ? AppTheme.danger : AppTheme.warning),
                    const SizedBox(width: 4),
                    Text(
                      '${_secondsLeft ~/ 60}:${(_secondsLeft % 60).toString().padLeft(2, '0')}',
                      style: TextStyle(
                        color: _secondsLeft < 30 ? AppTheme.danger : Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          // Stepper Indicator
          Text(
            'Question ${_currentIndex + 1} of ${widget.questions.length}',
            style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13),
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: (_currentIndex + 1) / widget.questions.length,
              minHeight: 6,
              backgroundColor: AppTheme.surfaceElevated,
              valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.primaryViolet),
            ),
          ),

          const SizedBox(height: 20),

          // Question Card
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.border),
            ),
            child: Text(
              currentQ.question,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                height: 1.4,
              ),
            ),
          ),

          const SizedBox(height: 16),

          // Options List
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: currentQ.options.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, optIndex) {
              final isSelected = _selectedOption == optIndex;
              final isCorrect = optIndex == currentQ.correctIndex;

              Color borderColor = AppTheme.border;
              Color bgColor = AppTheme.surface;

              if (_hasSubmitted) {
                if (isCorrect) {
                  borderColor = AppTheme.success;
                  bgColor = AppTheme.success.withOpacity(0.15);
                } else if (isSelected) {
                  borderColor = AppTheme.danger;
                  bgColor = AppTheme.danger.withOpacity(0.15);
                }
              } else if (isSelected) {
                borderColor = AppTheme.primaryViolet;
                bgColor = AppTheme.primaryViolet.withOpacity(0.15);
              }

              return InkWell(
                borderRadius: BorderRadius.circular(12),
                onTap: _hasSubmitted
                    ? null
                    : () {
                        setState(() => _selectedOption = optIndex);
                      },
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: bgColor,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: borderColor, width: isSelected ? 1.5 : 1),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 28,
                        height: 28,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: AppTheme.surfaceElevated,
                          shape: BoxShape.circle,
                          border: Border.all(color: borderColor),
                        ),
                        child: Text(
                          String.fromCharCode(65 + optIndex), // 'A', 'B', 'C', 'D'
                          style: TextStyle(
                            color: isSelected ? AppTheme.violetLight : AppTheme.textSecondary,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Text(
                          currentQ.options[optIndex],
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                        ),
                      ),
                      if (_hasSubmitted && isCorrect)
                        const Icon(Icons.check_circle, color: AppTheme.success, size: 20),
                      if (_hasSubmitted && isSelected && !isCorrect)
                        const Icon(Icons.cancel, color: AppTheme.danger, size: 20),
                    ],
                  ),
                ),
              );
            },
          ),

          const SizedBox(height: 16),

          // Explanation Card if submitted
          if (_hasSubmitted)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.surfaceElevated,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.lightbulb, size: 16, color: AppTheme.warning),
                      SizedBox(width: 6),
                      Text(
                        'Explanation & Key Concepts',
                        style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 13),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    currentQ.explanation,
                    style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13, height: 1.4),
                  ),
                ],
              ),
            ),

          const SizedBox(height: 20),

          // Next / Submit Button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _selectedOption == null
                  ? null
                  : (_hasSubmitted ? _nextQuestion : _submitAnswer),
              child: Text(
                _hasSubmitted
                    ? (_currentIndex < widget.questions.length - 1 ? 'Next Question' : 'View Results')
                    : 'Submit Answer',
              ),
            ),
          ),

          const SizedBox(height: 20),
        ],
      ),
    );
  }
}

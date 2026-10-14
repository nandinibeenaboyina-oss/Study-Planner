class QuizQuestion {
  final String id;
  final String category;
  final String question;
  final List<String> options;
  final int correctIndex;
  final String explanation;

  QuizQuestion({
    required this.id,
    required this.category,
    required this.question,
    required this.options,
    required this.correctIndex,
    required this.explanation,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'category': category,
    'question': question,
    'options': options,
    'correctIndex': correctIndex,
    'explanation': explanation,
  };

  factory QuizQuestion.fromJson(Map<String, dynamic> json) => QuizQuestion(
    id: json['id'] ?? '',
    category: json['category'] ?? '',
    question: json['question'] ?? '',
    options: List<String>.from(json['options'] ?? []),
    correctIndex: json['correctIndex'] ?? 0,
    explanation: json['explanation'] ?? '',
  );
}

class QuizAttempt {
  final String id;
  final String category;
  final int totalQuestions;
  final int correctAnswers;
  final double scorePercentage;
  final int durationSeconds;
  final String completedAt;

  QuizAttempt({
    required this.id,
    required this.category,
    required this.totalQuestions,
    required this.correctAnswers,
    required this.scorePercentage,
    required this.durationSeconds,
    required this.completedAt,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'category': category,
    'totalQuestions': totalQuestions,
    'correctAnswers': correctAnswers,
    'scorePercentage': scorePercentage,
    'durationSeconds': durationSeconds,
    'completedAt': completedAt,
  };

  factory QuizAttempt.fromJson(Map<String, dynamic> json) => QuizAttempt(
    id: json['id'] ?? '',
    category: json['category'] ?? '',
    totalQuestions: json['totalQuestions'] ?? 0,
    correctAnswers: json['correctAnswers'] ?? 0,
    scorePercentage: (json['scorePercentage'] as num?)?.toDouble() ?? 0.0,
    durationSeconds: json['durationSeconds'] ?? 0,
    completedAt: json['completedAt'] ?? '',
  );
}

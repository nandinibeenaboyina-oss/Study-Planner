class SyllabusTopic {
  final String id;
  final String title;
  final String youtubeUrl;
  final String notesUrl;
  bool isCompleted;

  SyllabusTopic({
    required this.id,
    required this.title,
    required this.youtubeUrl,
    required this.notesUrl,
    this.isCompleted = false,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'youtubeUrl': youtubeUrl,
    'notesUrl': notesUrl,
    'isCompleted': isCompleted,
  };

  factory SyllabusTopic.fromJson(Map<String, dynamic> json) => SyllabusTopic(
    id: json['id'] ?? '',
    title: json['title'] ?? '',
    youtubeUrl: json['youtubeUrl'] ?? '',
    notesUrl: json['notesUrl'] ?? '',
    isCompleted: json['isCompleted'] ?? false,
  );
}

class SyllabusUnit {
  final String id;
  final String unitNumber; // e.g. "Unit 1"
  final String unitTitle;  // e.g. "Foundations & Relational Architecture"
  final List<SyllabusTopic> topics;

  SyllabusUnit({
    required this.id,
    required this.unitNumber,
    required this.unitTitle,
    required this.topics,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'unitNumber': unitNumber,
    'unitTitle': unitTitle,
    'topics': topics.map((t) => t.toJson()).toList(),
  };

  factory SyllabusUnit.fromJson(Map<String, dynamic> json) => SyllabusUnit(
    id: json['id'] ?? '',
    unitNumber: json['unitNumber'] ?? '',
    unitTitle: json['unitTitle'] ?? '',
    topics: (json['topics'] as List<dynamic>?)
            ?.map((t) => SyllabusTopic.fromJson(t))
            .toList() ??
        [],
  );
}

class Subject {
  final String id;
  final String name;
  final String code;
  final String category; // 'Core CSE', 'Programming', 'Aptitude', 'Reasoning'
  final String description;
  final String examDate; // YYYY-MM-DD
  final String priority; // 'High', 'Medium', 'Low'
  final String colorHex;
  final List<SyllabusUnit> units;

  Subject({
    required this.id,
    required this.name,
    required this.code,
    required this.category,
    required this.description,
    required this.examDate,
    required this.priority,
    required this.colorHex,
    required this.units,
  });

  int get totalTopics {
    int count = 0;
    for (var u in units) {
      count += u.topics.length;
    }
    return count;
  }

  int get completedTopics {
    int count = 0;
    for (var u in units) {
      count += u.topics.where((t) => t.isCompleted).length;
    }
    return count;
  }

  double get progressPercentage {
    if (totalTopics == 0) return 0.0;
    return (completedTopics / totalTopics) * 100.0;
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'code': code,
    'category': category,
    'description': description,
    'examDate': examDate,
    'priority': priority,
    'colorHex': colorHex,
    'units': units.map((u) => u.toJson()).toList(),
  };

  factory Subject.fromJson(Map<String, dynamic> json) => Subject(
    id: json['id'] ?? '',
    name: json['name'] ?? '',
    code: json['code'] ?? '',
    category: json['category'] ?? 'Core CSE',
    description: json['description'] ?? '',
    examDate: json['examDate'] ?? '',
    priority: json['priority'] ?? 'Medium',
    colorHex: json['colorHex'] ?? '#8b5cf6',
    units: (json['units'] as List<dynamic>?)
            ?.map((u) => SyllabusUnit.fromJson(u))
            .toList() ??
        [],
  );
}

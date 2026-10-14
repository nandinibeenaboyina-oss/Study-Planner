class StudyNote {
  final String id;
  String title;
  String subjectName;
  String content;
  String category; // 'Important' | 'Concept' | 'Formula' | 'Interview'
  List<String> tags;
  String updatedAt;

  StudyNote({
    required this.id,
    required this.title,
    required this.subjectName,
    required this.content,
    required this.category,
    required this.tags,
    required this.updatedAt,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'subjectName': subjectName,
    'content': content,
    'category': category,
    'tags': tags,
    'updatedAt': updatedAt,
  };

  factory StudyNote.fromJson(Map<String, dynamic> json) => StudyNote(
    id: json['id'] ?? '',
    title: json['title'] ?? '',
    subjectName: json['subjectName'] ?? '',
    content: json['content'] ?? '',
    category: json['category'] ?? 'Concept',
    tags: List<String>.from(json['tags'] ?? []),
    updatedAt: json['updatedAt'] ?? '',
  );
}

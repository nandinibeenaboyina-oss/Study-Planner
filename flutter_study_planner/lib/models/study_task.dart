class StudyTask {
  final String id;
  String title;
  String subjectName;
  String description;
  String date; // YYYY-MM-DD
  String startTime;
  int durationMinutes;
  String priority; // 'High' | 'Medium' | 'Low'
  String status;   // 'Pending' | 'In Progress' | 'Completed'

  StudyTask({
    required this.id,
    required this.title,
    required this.subjectName,
    required this.description,
    required this.date,
    required this.startTime,
    required this.durationMinutes,
    required this.priority,
    required this.status,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'subjectName': subjectName,
    'description': description,
    'date': date,
    'startTime': startTime,
    'durationMinutes': durationMinutes,
    'priority': priority,
    'status': status,
  };

  factory StudyTask.fromJson(Map<String, dynamic> json) => StudyTask(
    id: json['id'] ?? '',
    title: json['title'] ?? '',
    subjectName: json['subjectName'] ?? '',
    description: json['description'] ?? '',
    date: json['date'] ?? '',
    startTime: json['startTime'] ?? '',
    durationMinutes: json['durationMinutes'] ?? 60,
    priority: json['priority'] ?? 'Medium',
    status: json['status'] ?? 'Pending',
  );
}

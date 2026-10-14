class StudyLog {
  final String date;
  final int minutesStudied;
  final String subjectName;

  StudyLog({
    required this.date,
    required this.minutesStudied,
    required this.subjectName,
  });

  Map<String, dynamic> toJson() => {
    'date': date,
    'minutesStudied': minutesStudied,
    'subjectName': subjectName,
  };

  factory StudyLog.fromJson(Map<String, dynamic> json) => StudyLog(
    date: json['date'] ?? '',
    minutesStudied: json['minutesStudied'] ?? 0,
    subjectName: json['subjectName'] ?? '',
  );
}

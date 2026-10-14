class UserProfile {
  String name;
  String email;
  String rollNumber;
  String semester;
  String branch;
  double targetCgpa;
  double currentCgpa;
  String bio;
  double dailyGoalHours;

  UserProfile({
    required this.name,
    required this.email,
    required this.rollNumber,
    required this.semester,
    required this.branch,
    required this.targetCgpa,
    required this.currentCgpa,
    required this.bio,
    required this.dailyGoalHours,
  });

  Map<String, dynamic> toJson() => {
    'name': name,
    'email': email,
    'rollNumber': rollNumber,
    'semester': semester,
    'branch': branch,
    'targetCgpa': targetCgpa,
    'currentCgpa': currentCgpa,
    'bio': bio,
    'dailyGoalHours': dailyGoalHours,
  };

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
    name: json['name'] ?? '',
    email: json['email'] ?? '',
    rollNumber: json['rollNumber'] ?? '',
    semester: json['semester'] ?? '',
    branch: json['branch'] ?? '',
    targetCgpa: (json['targetCgpa'] as num?)?.toDouble() ?? 9.0,
    currentCgpa: (json['currentCgpa'] as num?)?.toDouble() ?? 8.5,
    bio: json['bio'] ?? '',
    dailyGoalHours: (json['dailyGoalHours'] as num?)?.toDouble() ?? 4.0,
  );
}

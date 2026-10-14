class ChatMessage {
  final String id;
  final bool isUser;
  final String text;
  final String? subjectTag;
  final String timestamp;

  ChatMessage({
    required this.id,
    required this.isUser,
    required this.text,
    this.subjectTag,
    required this.timestamp,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'isUser': isUser,
    'text': text,
    'subjectTag': subjectTag,
    'timestamp': timestamp,
  };

  factory ChatMessage.fromJson(Map<String, dynamic> json) => ChatMessage(
    id: json['id'] ?? '',
    isUser: json['isUser'] ?? false,
    text: json['text'] ?? '',
    subjectTag: json['subjectTag'],
    timestamp: json['timestamp'] ?? '',
  );
}

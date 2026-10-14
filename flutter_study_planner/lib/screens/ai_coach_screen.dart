import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import '../models/chat_message.dart';
import '../services/ai_coach_service.dart';
import '../theme/app_theme.dart';

class AiCoachScreen extends StatefulWidget {
  final String? initialQuery;
  final VoidCallback? onClearInitialQuery;

  const AiCoachScreen({
    super.key,
    this.initialQuery,
    this.onClearInitialQuery,
  });

  @override
  State<AiCoachScreen> createState() => _AiCoachScreenState();
}

class _AiCoachScreenState extends State<AiCoachScreen> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _isLoading = false;

  final List<ChatMessage> _messages = [
    ChatMessage(
      id: '1',
      isUser: false,
      text: '''🎓 **Hello! I am your AI Study Coach for Computer Science & Engineering.**

You can ask me **ANY question related to ANY subject**:
* **Core Systems:** Operating Systems, DBMS, Computer Networks, System Design
* **Algorithms & Code:** Data Structures, C++, Java, Python, Dynamic Programming
* **Advanced CSE:** Machine Learning, Data Mining, Software Engineering, Cloud
* **Aptitude & Logic:** Quantitative shortcuts, Reasoning, Placement MCQs
* **Exam Strategies:** 7-day revision timetables, formulas, and viva questions!

Type your question below or tap any quick topic chip to start!''',
      timestamp: 'Just now',
    ),
  ];

  final List<Map<String, String>> _quickPrompts = [
    {'title': 'Virtual Memory & Paging', 'sub': 'Operating Systems'},
    {'title': '3NF vs BCNF Normalization', 'sub': 'DBMS'},
    {'title': 'TCP 3-Way Handshake with Diagram', 'sub': 'Computer Networks'},
    {'title': 'B+ Tree Indexing in Databases', 'sub': 'DBMS'},
    {'title': 'Dijkstra vs Bellman-Ford Shortest Path', 'sub': 'DSA'},
    {'title': '4 Coffman Deadlock Conditions', 'sub': 'Operating Systems'},
    {'title': 'Explain Gradient Descent & Cost Function', 'sub': 'Machine Learning'},
    {'title': '7-Day Comprehensive Exam Revision Plan', 'sub': 'General'},
  ];

  @override
  void initState() {
    super.initState();
    if (widget.initialQuery != null && widget.initialQuery!.isNotEmpty) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _handleSend(widget.initialQuery!);
        widget.onClearInitialQuery?.call();
      });
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _handleSend([String? presetText]) async {
    final query = presetText ?? _textController.text.trim();
    if (query.isEmpty || _isLoading) return;

    final userMsg = ChatMessage(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      isUser: true,
      text: query,
      timestamp: '${TimeOfDay.now().hour}:${TimeOfDay.now().minute.toString().padLeft(2, '0')}',
    );

    setState(() {
      _messages.add(userMsg);
      if (presetText == null) _textController.clear();
      _isLoading = true;
    });
    _scrollToBottom();

    final botAnswer = await AiCoachService.askQuestion(query);

    final botMsg = ChatMessage(
      id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
      isUser: false,
      text: botAnswer,
      timestamp: '${TimeOfDay.now().hour}:${TimeOfDay.now().minute.toString().padLeft(2, '0')}',
    );

    if (mounted) {
      setState(() {
        _messages.add(botMsg);
        _isLoading = false;
      });
      _scrollToBottom();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Top Toolbar
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.auto_awesome, color: AppTheme.primaryViolet, size: 20),
                  SizedBox(width: 8),
                  Text(
                    'AI Study Coach',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
              IconButton(
                icon: const Icon(Icons.delete_outline, color: AppTheme.textMuted),
                tooltip: 'Clear Chat',
                onPressed: () {
                  setState(() {
                    _messages.clear();
                    _messages.add(
                      ChatMessage(
                        id: '1',
                        isUser: false,
                        text: 'Chat cleared. Ask me any question related to any CSE subject!',
                        timestamp: 'Just now',
                      ),
                    );
                  });
                },
              ),
            ],
          ),
        ),

        // Quick Topic Chips
        SizedBox(
          height: 42,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: _quickPrompts.length,
            separatorBuilder: (_, __) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final prompt = _quickPrompts[index];
              return ActionChip(
                backgroundColor: AppTheme.surfaceElevated,
                side: const BorderSide(color: AppTheme.border),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                label: Text(
                  prompt['title']!,
                  style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                ),
                onPressed: () => _handleSend(prompt['title']!),
              );
            },
          ),
        ),

        const SizedBox(height: 8),
        const Divider(height: 1, color: AppTheme.border),

        // Messages List
        Expanded(
          child: ListView.separated(
            controller: _scrollController,
            padding: const EdgeInsets.all(16),
            itemCount: _messages.length,
            separatorBuilder: (_, __) => const SizedBox(height: 16),
            itemBuilder: (context, index) {
              final msg = _messages[index];
              return _buildMessageBubble(msg);
            },
          ),
        ),

        if (_isLoading)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Row(
              children: [
                const SizedBox(
                  width: 18,
                  height: 18,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    valueColor: AlwaysStoppedAnimation<Color>(AppTheme.primaryViolet),
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  'AI Coach is analyzing and structuring the answer...',
                  style: TextStyle(color: AppTheme.violetLight.withOpacity(0.8), fontSize: 12),
                ),
              ],
            ),
          ),

        // Bottom Input Box
        Container(
          padding: const EdgeInsets.all(12),
          decoration: const BoxDecoration(
            color: AppTheme.surface,
            border: Border(top: BorderSide(color: AppTheme.border)),
          ),
          child: SafeArea(
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _textController,
                    onSubmitted: (val) => _handleSend(),
                    style: const TextStyle(color: Colors.white, fontSize: 14),
                    decoration: InputDecoration(
                      hintText: 'Ask any question on DBMS, OS, Networks, DSA, ML...',
                      hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
                      filled: true,
                      fillColor: AppTheme.surfaceElevated,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                        borderSide: const BorderSide(color: AppTheme.border),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton.filled(
                  style: IconButton.styleFrom(
                    backgroundColor: AppTheme.primaryViolet,
                    shape: const CircleBorder(),
                  ),
                  icon: const Icon(Icons.send, color: Colors.white, size: 20),
                  onPressed: () => _handleSend(),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMessageBubble(ChatMessage msg) {
    if (msg.isUser) {
      return Align(
        alignment: Alignment.centerRight,
        child: Container(
          constraints: BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width * 0.8,
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: AppTheme.primaryViolet,
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(16),
              topRight: Radius.circular(16),
              bottomLeft: Radius.circular(16),
              bottomRight: Radius.circular(4),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                msg.text,
                style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.4),
              ),
              const SizedBox(height: 4),
              Text(
                msg.timestamp,
                style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 10),
              ),
            ],
          ),
        ),
      );
    }

    // AI Coach Bubble
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.9,
        ),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(16),
            topRight: Radius.circular(16),
            bottomRight: Radius.circular(16),
            bottomLeft: Radius.circular(4),
          ),
          border: Border.all(color: AppTheme.border),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    CircleAvatar(
                      radius: 12,
                      backgroundColor: AppTheme.secondaryViolet,
                      child: Icon(Icons.auto_awesome, color: Colors.white, size: 14),
                    ),
                    SizedBox(width: 8),
                    Text(
                      'AI Study Coach',
                      style: TextStyle(
                        color: AppTheme.violetLight,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.copy, size: 16, color: AppTheme.textMuted),
                  onPressed: () {
                    Clipboard.setData(ClipboardData(text: msg.text));
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Answer copied to clipboard!'),
                        duration: Duration(seconds: 2),
                      ),
                    );
                  },
                ),
              ],
            ),
            const SizedBox(height: 8),
            MarkdownBody(
              data: msg.text,
              styleSheet: MarkdownStyleSheet.fromTheme(Theme.of(context)).copyWith(
                p: const TextStyle(color: AppTheme.textPrimary, fontSize: 14, height: 1.5),
                h1: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
                h2: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                h3: const TextStyle(color: AppTheme.violetLight, fontWeight: FontWeight.bold, fontSize: 15),
                h4: const TextStyle(color: AppTheme.violetLight, fontWeight: FontWeight.w600, fontSize: 14),
                code: TextStyle(
                  backgroundColor: AppTheme.surfaceElevated,
                  color: AppTheme.violetLight,
                  fontFamily: 'monospace',
                  fontSize: 12,
                ),
                codeblockDecoration: BoxDecoration(
                  color: AppTheme.surfaceElevated,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppTheme.border),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import '../models/user_profile.dart';
import '../theme/app_theme.dart';

class SettingsScreen extends StatefulWidget {
  final UserProfile profile;
  final Function(UserProfile) onUpdateProfile;

  const SettingsScreen({
    super.key,
    required this.profile,
    required this.onUpdateProfile,
  });

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _rollController;
  late TextEditingController _branchController;
  late TextEditingController _semesterController;
  late TextEditingController _targetCgpaController;
  late TextEditingController _currentCgpaController;
  late TextEditingController _dailyGoalController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.profile.name);
    _emailController = TextEditingController(text: widget.profile.email);
    _rollController = TextEditingController(text: widget.profile.rollNumber);
    _branchController = TextEditingController(text: widget.profile.branch);
    _semesterController = TextEditingController(text: widget.profile.semester);
    _targetCgpaController = TextEditingController(text: widget.profile.targetCgpa.toString());
    _currentCgpaController = TextEditingController(text: widget.profile.currentCgpa.toString());
    _dailyGoalController = TextEditingController(text: widget.profile.dailyGoalHours.toString());
  }

  void _saveProfile() {
    final updated = UserProfile(
      name: _nameController.text.trim(),
      email: _emailController.text.trim(),
      rollNumber: _rollController.text.trim(),
      branch: _branchController.text.trim(),
      semester: _semesterController.text.trim(),
      targetCgpa: double.tryParse(_targetCgpaController.text) ?? widget.profile.targetCgpa,
      currentCgpa: double.tryParse(_currentCgpaController.text) ?? widget.profile.currentCgpa,
      dailyGoalHours: double.tryParse(_dailyGoalController.text) ?? widget.profile.dailyGoalHours,
      bio: widget.profile.bio,
    );
    widget.onUpdateProfile(updated);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Profile & academic targets updated successfully!'), backgroundColor: AppTheme.success),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Student Profile & Settings',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 4),
              Text(
                'Manage your academic details, CGPA targets, and study quotas',
                style: TextStyle(color: AppTheme.textSecondary, fontSize: 13),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // Profile Avatar Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.border),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundColor: AppTheme.primaryViolet,
                  child: Text(
                    widget.profile.name.isNotEmpty ? widget.profile.name[0] : 'U',
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.profile.name,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '${widget.profile.rollNumber} • ${widget.profile.semester}',
                        style: const TextStyle(color: AppTheme.violetLight, fontSize: 13),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        widget.profile.branch,
                        style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Form fields
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Academic Information',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _nameController,
                  decoration: const InputDecoration(labelText: 'Full Name'),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _emailController,
                  decoration: const InputDecoration(labelText: 'College Email'),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _rollController,
                        decoration: const InputDecoration(labelText: 'Roll Number'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextField(
                        controller: _semesterController,
                        decoration: const InputDecoration(labelText: 'Current Semester'),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _branchController,
                  decoration: const InputDecoration(labelText: 'Branch / Specialization'),
                ),
                const SizedBox(height: 20),
                const Text(
                  'Performance Targets',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _currentCgpaController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Current CGPA'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextField(
                        controller: _targetCgpaController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Target CGPA'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextField(
                        controller: _dailyGoalController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Daily Hours'),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _saveProfile,
                    child: const Text('Save Changes'),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 30),
        ],
      ),
    );
  }
}

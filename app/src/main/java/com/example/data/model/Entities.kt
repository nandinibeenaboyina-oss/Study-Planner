package com.example.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_profiles")
data class UserProfile(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String = "Alex Sharma",
    val email: String = "alex.cse@college.edu",
    val rollNumber: String = "22BCE1048",
    val semester: String = "Semester 6",
    val branch: String = "B.Tech Computer Science & Engineering",
    val targetCgpa: Double = 9.2,
    val currentCgpa: Double = 8.7,
    val bio: String = "Aspiring Full Stack Engineer & SDE. Preparing for placements & GATE CSE.",
    val dailyGoalHours: Float = 4.5f
)

@Entity(tableName = "subjects")
data class Subject(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val code: String,
    val category: String, // "Core CSE", "Programming", "Aptitude", "Reasoning", "English"
    val description: String,
    val examDate: String, // YYYY-MM-DD
    val priority: String, // "High", "Medium", "Low"
    val totalTopics: Int = 10,
    val completedTopics: Int = 0,
    val colorHex: String = "#2563EB"
)

@Entity(tableName = "study_tasks")
data class StudyTask(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val subjectId: Long = 0,
    val subjectName: String,
    val description: String = "",
    val date: String, // YYYY-MM-DD
    val startTime: String = "10:00 AM",
    val durationMinutes: Int = 60,
    val priority: String = "Medium", // "High", "Medium", "Low"
    val status: String = "Pending", // "Pending", "In Progress", "Completed"
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "study_notes")
data class StudyNote(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val subjectName: String,
    val content: String,
    val category: String = "Concept", // "Concept", "Formula", "Interview", "Important"
    val tags: String = "exam,notes", // comma separated
    val colorTag: String = "#DBEAFE",
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "quiz_questions")
data class QuizQuestion(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val category: String, // "DBMS", "Operating Systems", "Computer Networks", "Programming", "Data Mining", "Aptitude", "Logical Reasoning", "English Grammar"
    val question: String,
    val optionA: String,
    val optionB: String,
    val optionC: String,
    val optionD: String,
    val correctOptionIndex: Int, // 0 for A, 1 for B, 2 for C, 3 for D
    val explanation: String
)

@Entity(tableName = "quiz_attempts")
data class QuizAttempt(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val category: String,
    val totalQuestions: Int,
    val correctAnswers: Int,
    val scorePercentage: Int,
    val durationSeconds: Int,
    val completedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "placement_resources")
data class PlacementResource(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val category: String, // "Technical", "HR Interview", "Programming Practice", "Company Guide"
    val title: String,
    val topic: String, // e.g. "Data Structures", "OS", "Behavioral", "TCS"
    val difficulty: String = "Medium", // "Easy", "Medium", "Hard"
    val question: String,
    val answer: String,
    val codeSnippet: String = "",
    val isBookmarked: Boolean = false
)

@Entity(tableName = "study_logs")
data class StudyLog(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val date: String, // YYYY-MM-DD
    val minutesStudied: Int,
    val subjectName: String
)

package com.example.data.repository

import com.example.data.local.SampleData
import com.example.data.local.StudyDao
import com.example.data.model.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.firstOrNull

class StudyRepository(private val dao: StudyDao) {

    val userProfile: Flow<UserProfile?> = dao.getUserProfile()
    val allSubjects: Flow<List<Subject>> = dao.getAllSubjects()
    val allTasks: Flow<List<StudyTask>> = dao.getAllTasks()
    val allNotes: Flow<List<StudyNote>> = dao.getAllNotes()
    val allQuizAttempts: Flow<List<QuizAttempt>> = dao.getAllQuizAttempts()
    val allPlacementResources: Flow<List<PlacementResource>> = dao.getAllPlacementResources()
    val bookmarkedResources: Flow<List<PlacementResource>> = dao.getBookmarkedResources()
    val allStudyLogs: Flow<List<StudyLog>> = dao.getAllStudyLogs()

    suspend fun initializeIfEmpty() {
        val existingProfile = dao.getUserProfile().firstOrNull()
        if (existingProfile == null) {
            dao.insertOrUpdateProfile(SampleData.getDefaultProfile())
        }

        val subjectList = dao.getAllSubjects().firstOrNull()
        if (subjectList.isNullOrEmpty()) {
            dao.insertSubjects(SampleData.getDefaultSubjects())
        }

        val taskList = dao.getAllTasks().firstOrNull()
        if (taskList.isNullOrEmpty()) {
            dao.insertTasks(SampleData.getDefaultTasks())
        }

        val noteList = dao.getAllNotes().firstOrNull()
        if (noteList.isNullOrEmpty()) {
            dao.insertNotes(SampleData.getDefaultNotes())
        }

        if (dao.getQuestionCount() == 0) {
            dao.insertQuizQuestions(SampleData.getDefaultQuizQuestions())
        }

        if (dao.getPlacementResourceCount() == 0) {
            dao.insertPlacementResources(SampleData.getDefaultPlacementResources())
        }

        val logList = dao.getAllStudyLogs().firstOrNull()
        if (logList.isNullOrEmpty()) {
            dao.insertStudyLogs(SampleData.getDefaultStudyLogs())
        }
    }

    suspend fun updateProfile(profile: UserProfile) {
        dao.insertOrUpdateProfile(profile)
    }

    // Subjects
    suspend fun addSubject(subject: Subject): Long = dao.insertSubject(subject)
    suspend fun updateSubject(subject: Subject) = dao.updateSubject(subject)
    suspend fun deleteSubject(id: Long) = dao.deleteSubject(id)

    // Tasks
    suspend fun addTask(task: StudyTask): Long = dao.insertTask(task)
    suspend fun updateTask(task: StudyTask) = dao.updateTask(task)
    suspend fun deleteTask(id: Long) = dao.deleteTask(id)

    // Notes
    suspend fun addNote(note: StudyNote): Long = dao.insertNote(note)
    suspend fun updateNote(note: StudyNote) = dao.updateNote(note)
    suspend fun deleteNote(id: Long) = dao.deleteNote(id)

    // Quizzes
    suspend fun getQuestionsForQuiz(category: String): List<QuizQuestion> {
        val list = dao.getQuestionsByCategory(category)
        return if (list.isNotEmpty()) list else dao.getRandomQuestions(5)
    }

    suspend fun saveQuizAttempt(attempt: QuizAttempt): Long = dao.insertQuizAttempt(attempt)

    // Placement
    suspend fun togglePlacementBookmark(id: Long, isBookmarked: Boolean) {
        dao.toggleBookmark(id, isBookmarked)
    }

    // Study Logs
    suspend fun logStudyTime(date: String, minutes: Int, subject: String) {
        dao.insertStudyLog(StudyLog(date = date, minutesStudied = minutes, subjectName = subject))
    }
}

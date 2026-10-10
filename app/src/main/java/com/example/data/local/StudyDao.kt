package com.example.data.local

import androidx.room.*
import com.example.data.model.*
import kotlinx.coroutines.flow.Flow

@Dao
interface StudyDao {

    // --- User Profile ---
    @Query("SELECT * FROM user_profiles LIMIT 1")
    fun getUserProfile(): Flow<UserProfile?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdateProfile(profile: UserProfile): Long

    // --- Subjects ---
    @Query("SELECT * FROM subjects ORDER BY id ASC")
    fun getAllSubjects(): Flow<List<Subject>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSubject(subject: Subject): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSubjects(subjects: List<Subject>)

    @Update
    suspend fun updateSubject(subject: Subject)

    @Query("DELETE FROM subjects WHERE id = :id")
    suspend fun deleteSubject(id: Long)

    // --- Study Tasks ---
    @Query("SELECT * FROM study_tasks ORDER BY date ASC, startTime ASC")
    fun getAllTasks(): Flow<List<StudyTask>>

    @Query("SELECT * FROM study_tasks WHERE date = :date ORDER BY startTime ASC")
    fun getTasksByDate(date: String): Flow<List<StudyTask>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTask(task: StudyTask): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTasks(tasks: List<StudyTask>)

    @Update
    suspend fun updateTask(task: StudyTask)

    @Query("DELETE FROM study_tasks WHERE id = :id")
    suspend fun deleteTask(id: Long)

    // --- Study Notes ---
    @Query("SELECT * FROM study_notes ORDER BY updatedAt DESC")
    fun getAllNotes(): Flow<List<StudyNote>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNote(note: StudyNote): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNotes(notes: List<StudyNote>)

    @Update
    suspend fun updateNote(note: StudyNote)

    @Query("DELETE FROM study_notes WHERE id = :id")
    suspend fun deleteNote(id: Long)

    // --- Quizzes ---
    @Query("SELECT * FROM quiz_questions WHERE category = :category ORDER BY id ASC")
    suspend fun getQuestionsByCategory(category: String): List<QuizQuestion>

    @Query("SELECT * FROM quiz_questions ORDER BY RANDOM() LIMIT :limit")
    suspend fun getRandomQuestions(limit: Int): List<QuizQuestion>

    @Query("SELECT DISTINCT category FROM quiz_questions")
    fun getAllQuizCategories(): Flow<List<String>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertQuizQuestions(questions: List<QuizQuestion>)

    @Query("SELECT COUNT(*) FROM quiz_questions")
    suspend fun getQuestionCount(): Int

    // --- Quiz Attempts ---
    @Query("SELECT * FROM quiz_attempts ORDER BY completedAt DESC")
    fun getAllQuizAttempts(): Flow<List<QuizAttempt>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertQuizAttempt(attempt: QuizAttempt): Long

    // --- Placement Prep ---
    @Query("SELECT * FROM placement_resources ORDER BY id ASC")
    fun getAllPlacementResources(): Flow<List<PlacementResource>>

    @Query("SELECT * FROM placement_resources WHERE isBookmarked = 1")
    fun getBookmarkedResources(): Flow<List<PlacementResource>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPlacementResources(resources: List<PlacementResource>)

    @Query("UPDATE placement_resources SET isBookmarked = :isBookmarked WHERE id = :id")
    suspend fun toggleBookmark(id: Long, isBookmarked: Boolean)

    @Query("SELECT COUNT(*) FROM placement_resources")
    suspend fun getPlacementResourceCount(): Int

    // --- Study Logs ---
    @Query("SELECT * FROM study_logs ORDER BY date DESC")
    fun getAllStudyLogs(): Flow<List<StudyLog>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertStudyLog(log: StudyLog): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertStudyLogs(logs: List<StudyLog>)
}

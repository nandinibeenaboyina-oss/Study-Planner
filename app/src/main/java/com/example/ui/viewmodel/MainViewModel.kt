package com.example.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.local.AppDatabase
import com.example.data.model.*
import com.example.data.remote.GeminiAssistantService
import com.example.data.repository.StudyRepository
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

enum class AppScreen(val title: String) {
    DASHBOARD("Dashboard"),
    SUBJECTS("My Subjects"),
    TASKS("Study Planner"),
    NOTES("Study Notes"),
    QUIZZES("Quizzes"),
    PLACEMENT("Placement Prep"),
    AI_ASSISTANT("AI Assistant"),
    REPORTS("Progress Reports"),
    SETTINGS("Student Profile")
}

data class ChatMessage(
    val id: Long = System.currentTimeMillis(),
    val isUser: Boolean,
    val text: String,
    val timestamp: Long = System.currentTimeMillis()
)

data class ActiveQuizState(
    val category: String = "",
    val questions: List<QuizQuestion> = emptyList(),
    val currentIndex: Int = 0,
    val selectedAnswers: Map<Int, Int> = emptyMap(), // questionIndex -> optionIndex (0-3)
    val timeRemainingSeconds: Int = 180,
    val isFinished: Boolean = false,
    val scorePercentage: Int = 0,
    val correctCount: Int = 0
)

class MainViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: StudyRepository

    // Screen State
    private val _currentScreen = MutableStateFlow(AppScreen.DASHBOARD)
    val currentScreen: StateFlow<AppScreen> = _currentScreen.asStateFlow()

    // Navigation Stack for robust back handling
    private val screenStack = mutableListOf(AppScreen.DASHBOARD)

    // Data Flows from Room
    val userProfile: StateFlow<UserProfile?>
    val allSubjects: StateFlow<List<Subject>>
    val allTasks: StateFlow<List<StudyTask>>
    val allNotes: StateFlow<List<StudyNote>>
    val allQuizAttempts: StateFlow<List<QuizAttempt>>
    val allPlacementResources: StateFlow<List<PlacementResource>>
    val allStudyLogs: StateFlow<List<StudyLog>>

    // Filters & Search
    private val _taskSearchQuery = MutableStateFlow("")
    val taskSearchQuery: StateFlow<String> = _taskSearchQuery.asStateFlow()

    private val _taskStatusFilter = MutableStateFlow("All") // "All", "Pending", "In Progress", "Completed"
    val taskStatusFilter: StateFlow<String> = _taskStatusFilter.asStateFlow()

    private val _noteSearchQuery = MutableStateFlow("")
    val noteSearchQuery: StateFlow<String> = _noteSearchQuery.asStateFlow()

    private val _subjectCategoryFilter = MutableStateFlow("All")
    val subjectCategoryFilter: StateFlow<String> = _subjectCategoryFilter.asStateFlow()

    // Placement filters
    private val _placementTab = MutableStateFlow("Technical") // "Technical", "HR Interview", "Programming Practice", "Company Guide"
    val placementTab: StateFlow<String> = _placementTab.asStateFlow()

    private val _onlyBookmarkedPlacement = MutableStateFlow(false)
    val onlyBookmarkedPlacement: StateFlow<Boolean> = _onlyBookmarkedPlacement.asStateFlow()

    // Active Quiz Session
    private val _activeQuiz = MutableStateFlow<ActiveQuizState?>(null)
    val activeQuiz: StateFlow<ActiveQuizState?> = _activeQuiz.asStateFlow()
    private var quizTimerJob: Job? = null

    // AI Chat
    private val _chatMessages = MutableStateFlow<List<ChatMessage>>(
        listOf(
            ChatMessage(
                isUser = false,
                text = "Hello Alex! 👋 I'm your CSE Study Assistant. Ask me anything about Data Structures, DBMS, Operating Systems, Networking, Algorithms, or request a personalized exam revision plan!"
            )
        )
    )
    val chatMessages: StateFlow<List<ChatMessage>> = _chatMessages.asStateFlow()

    private val _isAiLoading = MutableStateFlow(false)
    val isAiLoading: StateFlow<Boolean> = _isAiLoading.asStateFlow()

    // Dark Mode Toggle (in-memory & settings)
    private val _isDarkMode = MutableStateFlow<Boolean?>(null) // null = system default
    val isDarkMode: StateFlow<Boolean?> = _isDarkMode.asStateFlow()

    // Snackbar / Feedback message
    private val _userMessage = MutableSharedFlow<String>()
    val userMessage: SharedFlow<String> = _userMessage.asSharedFlow()

    init {
        val db = AppDatabase.getDatabase(application)
        repository = StudyRepository(db.studyDao())

        userProfile = repository.userProfile
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

        allSubjects = repository.allSubjects
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

        allTasks = repository.allTasks
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

        allNotes = repository.allNotes
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

        allQuizAttempts = repository.allQuizAttempts
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

        allPlacementResources = repository.allPlacementResources
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

        allStudyLogs = repository.allStudyLogs
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

        viewModelScope.launch {
            repository.initializeIfEmpty()
        }
    }

    fun navigateTo(screen: AppScreen) {
        if (_currentScreen.value != screen) {
            screenStack.add(screen)
            _currentScreen.value = screen
        }
    }

    fun handleBackPress(): Boolean {
        if (_activeQuiz.value != null && !_activeQuiz.value!!.isFinished) {
            // Confirm quit quiz
            exitQuiz()
            return true
        }

        if (screenStack.size > 1) {
            screenStack.removeAt(screenStack.size - 1)
            val previous = screenStack.last()
            _currentScreen.value = previous
            return true
        }
        return false // let system handle exit
    }

    fun setDarkMode(dark: Boolean?) {
        _isDarkMode.value = dark
    }

    // --- Profile ---
    fun updateProfile(profile: UserProfile) {
        viewModelScope.launch {
            repository.updateProfile(profile)
            _userMessage.emit("Profile updated successfully")
        }
    }

    // --- Subjects ---
    fun setSubjectCategoryFilter(category: String) {
        _subjectCategoryFilter.value = category
    }

    fun addSubject(subject: Subject) {
        viewModelScope.launch {
            repository.addSubject(subject)
            _userMessage.emit("Subject '${subject.name}' added")
        }
    }

    fun updateSubject(subject: Subject) {
        viewModelScope.launch {
            repository.updateSubject(subject)
            _userMessage.emit("Subject updated")
        }
    }

    fun deleteSubject(id: Long) {
        viewModelScope.launch {
            repository.deleteSubject(id)
            _userMessage.emit("Subject deleted")
        }
    }

    // --- Tasks ---
    fun setTaskSearchQuery(query: String) {
        _taskSearchQuery.value = query
    }

    fun setTaskStatusFilter(status: String) {
        _taskStatusFilter.value = status
    }

    fun addTask(task: StudyTask) {
        viewModelScope.launch {
            repository.addTask(task)
            _userMessage.emit("Task created")
        }
    }

    fun updateTask(task: StudyTask) {
        viewModelScope.launch {
            repository.updateTask(task)
            _userMessage.emit("Task updated")
        }
    }

    fun deleteTask(id: Long) {
        viewModelScope.launch {
            repository.deleteTask(id)
            _userMessage.emit("Task deleted")
        }
    }

    fun toggleTaskStatus(task: StudyTask) {
        val nextStatus = when (task.status) {
            "Pending" -> "In Progress"
            "In Progress" -> "Completed"
            else -> "Pending"
        }
        viewModelScope.launch {
            repository.updateTask(task.copy(status = nextStatus))
            if (nextStatus == "Completed") {
                // Also log 45 mins study
                repository.logStudyTime(task.date, task.durationMinutes, task.subjectName)
                _userMessage.emit("Completed '${task.title}'! 🎉")
            }
        }
    }

    // --- Notes ---
    fun setNoteSearchQuery(query: String) {
        _noteSearchQuery.value = query
    }

    fun addNote(note: StudyNote) {
        viewModelScope.launch {
            repository.addNote(note)
            _userMessage.emit("Note saved")
        }
    }

    fun updateNote(note: StudyNote) {
        viewModelScope.launch {
            repository.updateNote(note)
            _userMessage.emit("Note updated")
        }
    }

    fun deleteNote(id: Long) {
        viewModelScope.launch {
            repository.deleteNote(id)
            _userMessage.emit("Note deleted")
        }
    }

    // --- Quizzes ---
    fun startQuiz(category: String) {
        viewModelScope.launch {
            val questions = repository.getQuestionsForQuiz(category)
            if (questions.isNotEmpty()) {
                val duration = questions.size * 60 // 60s per question
                _activeQuiz.value = ActiveQuizState(
                    category = category,
                    questions = questions,
                    currentIndex = 0,
                    selectedAnswers = emptyMap(),
                    timeRemainingSeconds = duration,
                    isFinished = false
                )
                startQuizTimer()
                navigateTo(AppScreen.QUIZZES)
            } else {
                _userMessage.emit("No questions available for $category")
            }
        }
    }

    private fun startQuizTimer() {
        quizTimerJob?.cancel()
        quizTimerJob = viewModelScope.launch {
            while (true) {
                delay(1000)
                val current = _activeQuiz.value ?: break
                if (current.isFinished) break

                if (current.timeRemainingSeconds <= 1) {
                    submitQuiz()
                    break
                } else {
                    _activeQuiz.value = current.copy(
                        timeRemainingSeconds = current.timeRemainingSeconds - 1
                    )
                }
            }
        }
    }

    fun selectQuizAnswer(questionIndex: Int, optionIndex: Int) {
        val current = _activeQuiz.value ?: return
        if (current.isFinished) return
        val newAnswers = current.selectedAnswers.toMutableMap()
        newAnswers[questionIndex] = optionIndex
        _activeQuiz.value = current.copy(selectedAnswers = newAnswers)
    }

    fun goToQuizQuestion(index: Int) {
        val current = _activeQuiz.value ?: return
        if (index in 0 until current.questions.size) {
            _activeQuiz.value = current.copy(currentIndex = index)
        }
    }

    fun submitQuiz() {
        quizTimerJob?.cancel()
        val current = _activeQuiz.value ?: return
        if (current.isFinished) return

        var correct = 0
        current.questions.forEachIndexed { index, question ->
            val chosen = current.selectedAnswers[index]
            if (chosen == question.correctOptionIndex) {
                correct++
            }
        }

        val percentage = if (current.questions.isNotEmpty()) {
            (correct * 100) / current.questions.size
        } else 0

        val finishedState = current.copy(
            isFinished = true,
            scorePercentage = percentage,
            correctCount = correct
        )
        _activeQuiz.value = finishedState

        viewModelScope.launch {
            repository.saveQuizAttempt(
                QuizAttempt(
                    category = current.category,
                    totalQuestions = current.questions.size,
                    correctAnswers = correct,
                    scorePercentage = percentage,
                    durationSeconds = (current.questions.size * 60) - current.timeRemainingSeconds
                )
            )
        }
    }

    fun exitQuiz() {
        quizTimerJob?.cancel()
        _activeQuiz.value = null
    }

    // --- Placement ---
    fun setPlacementTab(tab: String) {
        _placementTab.value = tab
    }

    fun togglePlacementBookmarkFilter() {
        _onlyBookmarkedPlacement.value = !_onlyBookmarkedPlacement.value
    }

    fun toggleResourceBookmark(resource: PlacementResource) {
        viewModelScope.launch {
            repository.togglePlacementBookmark(resource.id, !resource.isBookmarked)
        }
    }

    // --- AI Assistant ---
    fun sendAiPrompt(promptText: String) {
        if (promptText.isBlank() || _isAiLoading.value) return

        val userMsg = ChatMessage(isUser = true, text = promptText)
        _chatMessages.value = _chatMessages.value + userMsg
        _isAiLoading.value = true

        viewModelScope.launch {
            val contextSubjects = allSubjects.value.joinToString { "${it.name} (${it.category})" }
            val result = GeminiAssistantService.generateStudyResponse(
                prompt = promptText,
                cseContext = "Student subjects: $contextSubjects"
            )

            _isAiLoading.value = false
            val aiResponseText = result.getOrElse {
                "Unable to generate response right now. Please check your network connection."
            }

            val aiMsg = ChatMessage(isUser = false, text = aiResponseText)
            _chatMessages.value = _chatMessages.value + aiMsg
        }
    }

    fun clearChat() {
        _chatMessages.value = listOf(
            ChatMessage(
                isUser = false,
                text = "Chat history cleared. How can I help you with your B.Tech CSE preparation today?"
            )
        )
    }

    // --- Study Hours Logging ---
    fun logManualStudyHours(hours: Float, subject: String) {
        val minutes = (hours * 60).toInt()
        val today = java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault()).format(java.util.Date())
        viewModelScope.launch {
            repository.logStudyTime(today, minutes, subject)
            _userMessage.emit("Logged $hours hrs for $subject! ⏱️")
        }
    }
}

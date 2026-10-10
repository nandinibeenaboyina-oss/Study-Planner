package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.QuizAttempt
import com.example.data.model.QuizQuestion
import com.example.ui.theme.*
import com.example.ui.viewmodel.ActiveQuizState
import com.example.ui.viewmodel.MainViewModel

@Composable
fun QuizzesScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val activeQuiz by viewModel.activeQuiz.collectAsState()
    val attempts by viewModel.allQuizAttempts.collectAsState()

    if (activeQuiz != null) {
        val quiz = activeQuiz!!
        if (quiz.isFinished) {
            QuizResultsView(
                quizState = quiz,
                onRetake = { viewModel.startQuiz(quiz.category) },
                onExit = { viewModel.exitQuiz() }
            )
        } else {
            ActiveQuizView(
                quizState = quiz,
                onSelectAnswer = { qIndex, optIndex -> viewModel.selectQuizAnswer(qIndex, optIndex) },
                onNavigateQuestion = { index -> viewModel.goToQuizQuestion(index) },
                onSubmit = { viewModel.submitQuiz() },
                onExit = { viewModel.exitQuiz() }
            )
        }
    } else {
        QuizCategoriesAndHistoryView(
            attempts = attempts,
            onStartQuiz = { category -> viewModel.startQuiz(category) }
        )
    }
}

@Composable
fun QuizCategoriesAndHistoryView(
    attempts: List<QuizAttempt>,
    onStartQuiz: (String) -> Unit
) {
    val quizCategories = listOf(
        QuizCategoryInfo("DBMS", "Relational Models, SQL, 3NF, B+ Trees", Icons.Default.Storage, ColorCoreCse, 3),
        QuizCategoryInfo("Operating Systems", "Scheduling, Deadlocks, Paging, Virtual Memory", Icons.Default.Memory, PrimaryLight, 3),
        QuizCategoryInfo("Computer Networks", "OSI, TCP/IP, Subnetting, Routing", Icons.Default.Lan, Color(0xFF0284C7), 2),
        QuizCategoryInfo("Programming", "C/C++, Java Polymorphism, Python DSA", Icons.Default.Code, ColorProgramming, 2),
        QuizCategoryInfo("Data Mining", "Association Rules, Apriori, K-Means Clustering", Icons.Default.Analytics, ColorReasoning, 2),
        QuizCategoryInfo("Aptitude", "Speed-Time, Percentages, Work-Time, Probability", Icons.Default.Calculate, ColorAptitude, 2),
        QuizCategoryInfo("Logical Reasoning", "Number Series, Blood Relations, Syllogisms", Icons.Default.Psychology, Color(0xFFD97706), 2),
        QuizCategoryInfo("English Grammar", "Subject-Verb, Error Detection, Vocabulary", Icons.Default.Translate, ColorEnglish, 1)
    )

    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.fillMaxSize().testTag("quiz_hub_screen")
    ) {
        item {
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .clip(CircleShape)
                            .background(MaterialTheme.colorScheme.primary),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Quiz, contentDescription = "Quiz Hub", tint = Color.White)
                    }
                    Spacer(modifier = Modifier.width(14.dp))
                    Column {
                        Text(
                            text = "Interactive Practice Quizzes",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                        Text(
                            text = "Test your core CSE concepts and placement aptitude with timed MCQs.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.8f)
                        )
                    }
                }
            }
        }

        item {
            Text(
                text = "Select a Topic to Start",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                color = MaterialTheme.colorScheme.onSurface
            )
        }

        items(quizCategories) { cat ->
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onStartQuiz(cat.name) }
                    .testTag("quiz_category_${cat.name.lowercase().replace(" ", "_")}")
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(CircleShape)
                            .background(cat.color.copy(alpha = 0.15f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(cat.icon, contentDescription = cat.name, tint = cat.color, modifier = Modifier.size(24.dp))
                    }
                    Spacer(modifier = Modifier.width(14.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = cat.name,
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Text(
                            text = cat.desc,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Button(
                        onClick = { onStartQuiz(cat.name) },
                        colors = ButtonDefaults.buttonColors(containerColor = cat.color)
                    ) {
                        Text("Start")
                    }
                }
            }
        }

        // Quiz History Section
        item {
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Recent Quiz History",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                color = MaterialTheme.colorScheme.onSurface
            )
        }

        if (attempts.isEmpty()) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                ) {
                    Box(modifier = Modifier.padding(20.dp), contentAlignment = Alignment.Center) {
                        Text(
                            text = "No quiz attempts yet. Pick a subject above to start your first quiz!",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        } else {
            items(attempts.take(5)) { attempt ->
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(14.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(
                                text = attempt.category,
                                style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Text(
                                text = "Score: ${attempt.correctAnswers}/${attempt.totalQuestions} • Duration: ${attempt.durationSeconds}s",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = if (attempt.scorePercentage >= 70) ColorProgramming.copy(alpha = 0.15f) else ColorMedPriority.copy(alpha = 0.15f)
                        ) {
                            Text(
                                text = "${attempt.scorePercentage}%",
                                color = if (attempt.scorePercentage >= 70) ColorProgramming else ColorMedPriority,
                                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}

data class QuizCategoryInfo(
    val name: String,
    val desc: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector,
    val color: Color,
    val questionCount: Int
)

@Composable
fun ActiveQuizView(
    quizState: ActiveQuizState,
    onSelectAnswer: (Int, Int) -> Unit,
    onNavigateQuestion: (Int) -> Unit,
    onSubmit: () -> Unit,
    onExit: () -> Unit
) {
    val currentQuestion = quizState.questions.getOrNull(quizState.currentIndex) ?: return
    val selectedOption = quizState.selectedAnswers[quizState.currentIndex]
    val minutes = quizState.timeRemainingSeconds / 60
    val seconds = quizState.timeRemainingSeconds % 60
    val formattedTime = String.format(java.util.Locale.US, "%02d:%02d", minutes, seconds)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .testTag("active_quiz_session")
    ) {
        // Top Bar: Timer & Exit
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onExit) {
                Icon(Icons.Default.Close, contentDescription = "Exit Quiz")
            }
            Text(
                text = "${quizState.category} Quiz",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
            )
            Surface(
                shape = RoundedCornerShape(12.dp),
                color = if (quizState.timeRemainingSeconds < 30) ColorHighPriority.copy(alpha = 0.15f) else PrimaryLight.copy(alpha = 0.15f)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.Timer,
                        contentDescription = "Timer",
                        tint = if (quizState.timeRemainingSeconds < 30) ColorHighPriority else PrimaryLight,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = formattedTime,
                        color = if (quizState.timeRemainingSeconds < 30) ColorHighPriority else PrimaryLight,
                        style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Question Palette (1..N)
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            itemsIndexed(quizState.questions) { idx, _ ->
                val isAnswered = quizState.selectedAnswers.containsKey(idx)
                val isCurrent = quizState.currentIndex == idx
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(
                            when {
                                isCurrent -> PrimaryLight
                                isAnswered -> ColorProgramming
                                else -> MaterialTheme.colorScheme.surfaceVariant
                            }
                        )
                        .clickable { onNavigateQuestion(idx) },
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "${idx + 1}",
                        color = if (isCurrent || isAnswered) Color.White else MaterialTheme.colorScheme.onSurfaceVariant,
                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Question Card
        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
            modifier = Modifier.weight(1f)
        ) {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(18.dp)
            ) {
                item {
                    Text(
                        text = "Question ${quizState.currentIndex + 1} of ${quizState.questions.size}",
                        style = MaterialTheme.typography.labelMedium,
                        color = PrimaryLight
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = currentQuestion.question,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(20.dp))
                }

                // 4 Options
                val options = listOf(
                    currentQuestion.optionA,
                    currentQuestion.optionB,
                    currentQuestion.optionC,
                    currentQuestion.optionD
                )
                itemsIndexed(options) { optIdx, optText ->
                    val isSelected = selectedOption == optIdx
                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = if (isSelected) PrimaryLight.copy(alpha = 0.12f) else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
                        border = if (isSelected) androidx.compose.foundation.BorderStroke(1.5.dp, PrimaryLight) else null,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 6.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .clickable { onSelectAnswer(quizState.currentIndex, optIdx) }
                            .testTag("quiz_option_${optIdx}")
                    ) {
                        Row(
                            modifier = Modifier.padding(14.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(28.dp)
                                    .clip(CircleShape)
                                    .background(if (isSelected) PrimaryLight else MaterialTheme.colorScheme.surface),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "${('A'.code + optIdx).toChar()}",
                                    color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurface,
                                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold)
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = optText,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Bottom Controls: Prev, Next, Submit
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedButton(
                onClick = { onNavigateQuestion(quizState.currentIndex - 1) },
                enabled = quizState.currentIndex > 0
            ) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Previous")
                Spacer(modifier = Modifier.width(4.dp))
                Text("Previous")
            }

            if (quizState.currentIndex == quizState.questions.size - 1) {
                Button(
                    onClick = onSubmit,
                    colors = ButtonDefaults.buttonColors(containerColor = ColorProgramming),
                    modifier = Modifier.testTag("submit_quiz_button")
                ) {
                    Text("Submit Quiz")
                }
            } else {
                Button(
                    onClick = { onNavigateQuestion(quizState.currentIndex + 1) }
                ) {
                    Text("Next")
                    Spacer(modifier = Modifier.width(4.dp))
                    Icon(Icons.Default.ArrowForward, contentDescription = "Next")
                }
            }
        }
    }
}

@Composable
fun QuizResultsView(
    quizState: ActiveQuizState,
    onRetake: () -> Unit,
    onExit: () -> Unit
) {
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.fillMaxSize().testTag("quiz_results_screen")
    ) {
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 3.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        modifier = Modifier
                            .size(72.dp)
                            .clip(CircleShape)
                            .background(
                                if (quizState.scorePercentage >= 70) ColorProgramming.copy(alpha = 0.15f)
                                else ColorMedPriority.copy(alpha = 0.15f)
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = if (quizState.scorePercentage >= 70) Icons.Default.EmojiEvents else Icons.Default.ThumbUp,
                            contentDescription = "Result",
                            tint = if (quizState.scorePercentage >= 70) ColorProgramming else ColorMedPriority,
                            modifier = Modifier.size(40.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(14.dp))
                    Text(
                        text = if (quizState.scorePercentage >= 80) "Outstanding Performance! 🌟"
                        else if (quizState.scorePercentage >= 60) "Good Effort! Keep Revising."
                        else "Needs Improvement. Review the answers below.",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "${quizState.correctCount} / ${quizState.questions.size} Correct (${quizState.scorePercentage}%)",
                        style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold),
                        color = PrimaryLight
                    )

                    Spacer(modifier = Modifier.height(18.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        Button(onClick = onRetake) {
                            Text("Retake Quiz")
                        }
                        OutlinedButton(onClick = onExit) {
                            Text("Back to Hub")
                        }
                    }
                }
            }
        }

        item {
            Text(
                text = "Detailed Answer Explanations",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                color = MaterialTheme.colorScheme.onSurface
            )
        }

        itemsIndexed(quizState.questions) { idx, q ->
            val userChosen = quizState.selectedAnswers[idx]
            val isCorrect = userChosen == q.correctOptionIndex

            Card(
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "Q${idx + 1}.",
                            style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
                            color = PrimaryLight
                        )
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = if (isCorrect) ColorProgramming.copy(alpha = 0.15f) else ColorHighPriority.copy(alpha = 0.15f)
                        ) {
                            Text(
                                text = if (isCorrect) "CORRECT" else "INCORRECT",
                                color = if (isCorrect) ColorProgramming else ColorHighPriority,
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = q.question,
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold)
                    )

                    Spacer(modifier = Modifier.height(10.dp))
                    val options = listOf(q.optionA, q.optionB, q.optionC, q.optionD)
                    Text(
                        text = "Correct Answer: ${('A'.code + q.correctOptionIndex).toChar()}. ${options[q.correctOptionIndex]}",
                        style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold),
                        color = ColorProgramming
                    )

                    if (!isCorrect && userChosen != null) {
                        Text(
                            text = "Your Answer: ${('A'.code + userChosen).toChar()}. ${options[userChosen]}",
                            style = MaterialTheme.typography.bodySmall,
                            color = ColorHighPriority
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "💡 Explanation: ${q.explanation}",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.padding(10.dp)
                        )
                    }
                }
            }
        }
    }
}

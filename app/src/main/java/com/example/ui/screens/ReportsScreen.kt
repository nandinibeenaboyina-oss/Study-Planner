package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.StudyLog
import com.example.ui.components.SectionHeader
import com.example.ui.components.StatCard
import com.example.ui.theme.*
import com.example.ui.viewmodel.MainViewModel

@Composable
fun ReportsScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val subjects by viewModel.allSubjects.collectAsState()
    val tasks by viewModel.allTasks.collectAsState()
    val quizAttempts by viewModel.allQuizAttempts.collectAsState()
    val studyLogs by viewModel.allStudyLogs.collectAsState()
    val profile by viewModel.userProfile.collectAsState()
    val context = LocalContext.current

    var showLogHoursDialog by remember { mutableStateOf(false) }

    val totalHours = studyLogs.sumOf { it.minutesStudied } / 60f
    val completedTasks = tasks.count { it.status == "Completed" }
    val totalTasks = tasks.size
    val taskCompletionRate = if (totalTasks > 0) (completedTasks * 100) / totalTasks else 0
    val avgQuizScore = if (quizAttempts.isNotEmpty()) quizAttempts.map { it.scorePercentage }.average().toInt() else 0

    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = modifier
            .fillMaxSize()
            .testTag("reports_screen")
    ) {
        // Top Action Bar
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "B.Tech CSE Progress Analytics",
                    style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onSurface
                )
                Button(
                    onClick = { showLogHoursDialog = true },
                    modifier = Modifier.testTag("log_hours_button")
                ) {
                    Icon(Icons.Default.Add, contentDescription = "Log Hours", modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Log Hours")
                }
            }
        }

        // Summary Statistics
        item {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    StatCard(
                        title = "Total Hours",
                        value = String.format(java.util.Locale.US, "%.1fh", totalHours),
                        subtitle = "Cumulative",
                        icon = Icons.Default.Timelapse,
                        iconColor = PrimaryLight,
                        modifier = Modifier.weight(1f)
                    )
                    StatCard(
                        title = "Task Success",
                        value = "$taskCompletionRate%",
                        subtitle = "$completedTasks/$totalTasks done",
                        icon = Icons.Default.TaskAlt,
                        iconColor = ColorProgramming,
                        modifier = Modifier.weight(1f)
                    )
                }
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    StatCard(
                        title = "Quiz Average",
                        value = "$avgQuizScore%",
                        subtitle = "${quizAttempts.size} attempts",
                        icon = Icons.Default.Insights,
                        iconColor = ColorAptitude,
                        modifier = Modifier.weight(1f)
                    )
                    StatCard(
                        title = "Target CGPA",
                        value = "${profile?.targetCgpa ?: 9.2}",
                        subtitle = "Current: ${profile?.currentCgpa ?: 8.75}",
                        icon = Icons.Default.Grade,
                        iconColor = ColorReasoning,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // Weekly Study Hours Bar Visualization
        item {
            SectionHeader(title = "Recent Study Log (Last 7 Days)")
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Daily Hours Distribution",
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(14.dp))

                    val recentLogs = studyLogs.take(7).reversed()
                    val maxMinutes = (recentLogs.maxOfOrNull { it.minutesStudied } ?: 240).coerceAtLeast(60)

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(140.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Bottom
                    ) {
                        recentLogs.forEach { log ->
                            val heightFraction = (log.minutesStudied.toFloat() / maxMinutes.toFloat()).coerceIn(0.1f, 1f)
                            val hoursVal = log.minutesStudied / 60f

                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(
                                    text = String.format(java.util.Locale.US, "%.1f", hoursVal),
                                    style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp),
                                    color = PrimaryLight
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Box(
                                    modifier = Modifier
                                        .width(18.dp)
                                        .fillMaxHeight(heightFraction)
                                        .clip(RoundedCornerShape(topStart = 6.dp, topEnd = 6.dp))
                                        .background(PrimaryLight)
                                )
                                Spacer(modifier = Modifier.height(6.dp))
                                Text(
                                    text = log.date.takeLast(5),
                                    style = MaterialTheme.typography.labelSmall.copy(fontSize = 9.sp),
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            }
        }

        // Subject-wise Syllabus Progress
        item {
            SectionHeader(title = "Subject-Wise Syllabus Completion")
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                subjects.forEach { subject ->
                    val fraction = if (subject.totalTopics > 0) {
                        (subject.completedTopics.toFloat() / subject.totalTopics.toFloat()).coerceIn(0f, 1f)
                    } else 0f

                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = subject.name,
                                    style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold)
                                )
                                Text(
                                    text = "${(fraction * 100).toInt()}%",
                                    style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                                    color = PrimaryLight
                                )
                            }
                            Spacer(modifier = Modifier.height(6.dp))
                            LinearProgressIndicator(
                                progress = { fraction },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(6.dp)
                                    .clip(RoundedCornerShape(3.dp)),
                                color = PrimaryLight,
                                trackColor = MaterialTheme.colorScheme.surfaceVariant
                            )
                        }
                    }
                }
            }
        }

        // Exportable Performance Report Button
        item {
            Spacer(modifier = Modifier.height(8.dp))
            Button(
                onClick = {
                    val reportText = buildString {
                        appendLine("🎓 B.Tech CSE Study & Placement Progress Report")
                        appendLine("Student: ${profile?.name ?: "Alex Sharma"} (${profile?.rollNumber ?: "22BCE1048"})")
                        appendLine("Branch: ${profile?.branch ?: "B.Tech CSE"} | ${profile?.semester ?: "Sem 6"}")
                        appendLine("----------------------------------------")
                        appendLine("Total Study Hours: ${String.format(java.util.Locale.US, "%.1f", totalHours)} hrs")
                        appendLine("Tasks Completed: $completedTasks of $totalTasks ($taskCompletionRate%)")
                        appendLine("Average Quiz Score: $avgQuizScore%")
                        appendLine("----------------------------------------")
                        appendLine("Subject Progress:")
                        subjects.forEach { sub ->
                            val pct = if (sub.totalTopics > 0) (sub.completedTopics * 100) / sub.totalTopics else 0
                            appendLine("- ${sub.name}: $pct% (Exam: ${sub.examDate})")
                        }
                    }
                    val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                    val clip = ClipData.newPlainText("Progress Report", reportText)
                    clipboard.setPrimaryClip(clip)
                    Toast.makeText(context, "Full Progress Report copied to clipboard!", Toast.LENGTH_LONG).show()
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("export_report_button")
            ) {
                Icon(Icons.Default.Share, contentDescription = "Copy Report")
                Spacer(modifier = Modifier.width(8.dp))
                Text("Copy & Export Progress Report")
            }
        }
    }

    // Log Study Hours Dialog
    if (showLogHoursDialog) {
        var hoursStr by remember { mutableStateOf("2.0") }
        var selectedSubject by remember {
            mutableStateOf(subjects.firstOrNull()?.name ?: "Database Management Systems")
        }

        AlertDialog(
            onDismissRequest = { showLogHoursDialog = false },
            title = { Text("Log Study Session") },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    OutlinedTextField(
                        value = hoursStr,
                        onValueChange = { hoursStr = it },
                        label = { Text("Hours Studied (e.g. 1.5, 2.0)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Text("Subject:", style = MaterialTheme.typography.labelSmall)
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        items(subjects.take(6)) { sub ->
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (selectedSubject == sub.name) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                                modifier = Modifier.clickable { selectedSubject = sub.name }
                            ) {
                                Text(
                                    text = sub.code.ifBlank { sub.name.take(8) },
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                    style = MaterialTheme.typography.labelSmall
                                )
                            }
                        }
                    }
                }
            },
            confirmButton = {
                Button(onClick = {
                    val hrs = hoursStr.toFloatOrNull() ?: 1.0f
                    viewModel.logManualStudyHours(hrs, selectedSubject)
                    showLogHoursDialog = false
                }) {
                    Text("Log")
                }
            },
            dismissButton = {
                TextButton(onClick = { showLogHoursDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }
}

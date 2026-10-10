package com.example.ui.screens

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
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.StudyTask
import com.example.data.model.Subject
import com.example.ui.components.PriorityBadge
import com.example.ui.components.SectionHeader
import com.example.ui.components.StatCard
import com.example.ui.theme.*
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MainViewModel

@Composable
fun DashboardScreen(
    viewModel: MainViewModel,
    onNavigate: (AppScreen) -> Unit,
    modifier: Modifier = Modifier
) {
    val profile by viewModel.userProfile.collectAsState()
    val subjects by viewModel.allSubjects.collectAsState()
    val tasks by viewModel.allTasks.collectAsState()
    val studyLogs by viewModel.allStudyLogs.collectAsState()

    val completedTasks = tasks.count { it.status == "Completed" }
    val pendingTasks = tasks.count { it.status != "Completed" }
    val totalHoursStudied = (studyLogs.sumOf { it.minutesStudied } / 60f)

    // Today's tasks
    val todayDate = remember {
        java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault()).format(java.util.Date())
    }
    val todaysTasks = tasks.filter { it.date == todayDate || it.status == "In Progress" }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("dashboard_screen"),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 1. Hero Student Profile Banner
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.Transparent),
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("student_hero_banner")
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            brush = Brush.horizontalGradient(
                                colors = listOf(PrimaryLight, SecondaryLight)
                            )
                        )
                        .padding(20.dp)
                ) {
                    Column {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Box(
                                    modifier = Modifier
                                        .size(48.dp)
                                        .clip(CircleShape)
                                        .background(Color.White.copy(alpha = 0.2f)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.School,
                                        contentDescription = "Profile",
                                        tint = Color.White,
                                        modifier = Modifier.size(28.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.width(12.dp))
                                Column {
                                    Text(
                                        text = "Welcome back, ${profile?.name ?: "Alex"}! 👋",
                                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                                        color = Color.White
                                    )
                                    Text(
                                        text = "${profile?.branch ?: "B.Tech CSE"} • ${profile?.semester ?: "Sem 6"}",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = Color.White.copy(alpha = 0.85f)
                                    )
                                }
                            }
                            Surface(
                                shape = RoundedCornerShape(12.dp),
                                color = Color.White.copy(alpha = 0.2f)
                            ) {
                                Text(
                                    text = "Target: ${profile?.targetCgpa ?: 9.2} CGPA",
                                    color = Color.White,
                                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            text = "Next Milestone: DBMS & OS Mid-Term Examination in 5 days.",
                            style = MaterialTheme.typography.bodyMedium,
                            color = Color.White.copy(alpha = 0.95f)
                        )
                    }
                }
            }
        }

        // 2. Statistics Overview (Grid of 4 StatCards)
        item {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    StatCard(
                        title = "Subjects",
                        value = "${subjects.size}",
                        subtitle = "Active",
                        icon = Icons.Default.MenuBook,
                        iconColor = ColorCoreCse,
                        modifier = Modifier.weight(1f)
                    )
                    StatCard(
                        title = "Pending Tasks",
                        value = "$pendingTasks",
                        subtitle = "To Do",
                        icon = Icons.Default.PendingActions,
                        iconColor = ColorMedPriority,
                        modifier = Modifier.weight(1f)
                    )
                }
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    StatCard(
                        title = "Completed",
                        value = "$completedTasks",
                        subtitle = "Tasks",
                        icon = Icons.Default.CheckCircle,
                        iconColor = ColorProgramming,
                        modifier = Modifier.weight(1f)
                    )
                    StatCard(
                        title = "Study Hours",
                        value = String.format(java.util.Locale.US, "%.1fh", totalHoursStudied),
                        subtitle = "Logged",
                        icon = Icons.Default.Timer,
                        iconColor = ColorReasoning,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // 3. Quick Action Hub
        item {
            SectionHeader(title = "Quick Actions")
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                item {
                    QuickActionCard(
                        title = "AI Assistant",
                        subtitle = "Ask CSE Doubts",
                        icon = Icons.Default.AutoAwesome,
                        color = Color(0xFF6366F1),
                        onClick = { onNavigate(AppScreen.AI_ASSISTANT) }
                    )
                }
                item {
                    QuickActionCard(
                        title = "Take Quiz",
                        subtitle = "MCQ Practice",
                        icon = Icons.Default.Quiz,
                        color = ColorAptitude,
                        onClick = { onNavigate(AppScreen.QUIZZES) }
                    )
                }
                item {
                    QuickActionCard(
                        title = "Placement Prep",
                        subtitle = "Interview Questions",
                        icon = Icons.Default.WorkOutline,
                        color = ColorProgramming,
                        onClick = { onNavigate(AppScreen.PLACEMENT) }
                    )
                }
                item {
                    QuickActionCard(
                        title = "Add Task",
                        subtitle = "Schedule Study",
                        icon = Icons.Default.AddCircleOutline,
                        color = PrimaryLight,
                        onClick = { onNavigate(AppScreen.TASKS) }
                    )
                }
                item {
                    QuickActionCard(
                        title = "Study Notes",
                        subtitle = "Subject Formulae",
                        icon = Icons.Default.Description,
                        color = ColorEnglish,
                        onClick = { onNavigate(AppScreen.NOTES) }
                    )
                }
            }
        }

        // 4. Today's Study Schedule
        item {
            SectionHeader(
                title = "Today's Study Schedule",
                subtitle = "Keep your daily study rhythm",
                actionText = "View All",
                onActionClick = { onNavigate(AppScreen.TASKS) }
            )

            if (todaysTasks.isEmpty()) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(20.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Icon(
                            imageVector = Icons.Default.EventAvailable,
                            contentDescription = "No tasks",
                            tint = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(36.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "No study tasks remaining today!",
                            style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Medium),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Text(
                            text = "Plan your upcoming assignments or take an aptitude quiz.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    todaysTasks.take(4).forEach { task ->
                        DashboardTaskItem(
                            task = task,
                            onToggle = { viewModel.toggleTaskStatus(task) }
                        )
                    }
                }
            }
        }

        // 5. Upcoming Examinations
        item {
            SectionHeader(
                title = "Upcoming Examinations",
                subtitle = "Marked deadlines & exam papers",
                actionText = "All Subjects",
                onActionClick = { onNavigate(AppScreen.SUBJECTS) }
            )

            val upcomingSubjects = subjects.sortedBy { it.examDate }.take(3)
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                upcomingSubjects.forEach { sub ->
                    ExamDeadlineCard(subject = sub)
                }
            }
        }
    }
}

@Composable
fun QuickActionCard(
    title: String,
    subtitle: String,
    icon: ImageVector,
    color: Color,
    onClick: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier
            .width(140.dp)
            .clickable(onClick = onClick)
            .testTag("quick_action_${title.replace(" ", "_").lowercase()}")
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(color.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = title,
                    tint = color,
                    modifier = Modifier.size(20.dp)
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
                color = MaterialTheme.colorScheme.onSurface,
                maxLines = 1
            )
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 1
            )
        }
    }
}

@Composable
fun DashboardTaskItem(
    task: StudyTask,
    onToggle: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = onToggle,
                modifier = Modifier.size(36.dp)
            ) {
                Icon(
                    imageVector = if (task.status == "Completed") Icons.Default.CheckCircle else Icons.Outlined.RadioButtonUnchecked,
                    contentDescription = "Toggle status",
                    tint = if (task.status == "Completed") ColorProgramming else MaterialTheme.colorScheme.outline
                )
            }
            Spacer(modifier = Modifier.width(8.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = task.title,
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontWeight = FontWeight.SemiBold,
                        color = MaterialTheme.colorScheme.onSurface
                    ),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "${task.subjectName} • ${task.startTime} (${task.durationMinutes}m)",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            PriorityBadge(priority = task.priority)
        }
    }
}

@Composable
fun ExamDeadlineCard(subject: Subject) {
    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(10.dp)
                        .clip(CircleShape)
                        .background(ColorCoreCse)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = subject.name,
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "${subject.code} • ${subject.category}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = subject.examDate,
                    style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                    color = PrimaryLight
                )
                PriorityBadge(priority = subject.priority)
            }
        }
    }
}

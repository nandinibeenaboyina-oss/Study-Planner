package com.example.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.StudyTask
import com.example.ui.components.CategoryChip
import com.example.ui.components.PriorityBadge
import com.example.ui.theme.*
import com.example.ui.viewmodel.MainViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TasksScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val tasks by viewModel.allTasks.collectAsState()
    val subjects by viewModel.allSubjects.collectAsState()
    val statusFilter by viewModel.taskStatusFilter.collectAsState()
    val searchQuery by viewModel.taskSearchQuery.collectAsState()

    var showAddDialog by remember { mutableStateOf(false) }
    var editingTask by remember { mutableStateOf<StudyTask?>(null) }
    var taskToDelete by remember { mutableStateOf<StudyTask?>(null) }

    val statusOptions = listOf("All", "Pending", "In Progress", "Completed")

    val filteredTasks = tasks.filter { task ->
        val matchesStatus = if (statusFilter == "All") true else task.status == statusFilter
        val matchesSearch = if (searchQuery.isBlank()) true else {
            task.title.contains(searchQuery, ignoreCase = true) ||
                    task.subjectName.contains(searchQuery, ignoreCase = true) ||
                    task.description.contains(searchQuery, ignoreCase = true)
        }
        matchesStatus && matchesSearch
    }

    val completedCount = tasks.count { it.status == "Completed" }
    val progress = if (tasks.isNotEmpty()) (completedCount.toFloat() / tasks.size.toFloat()).coerceIn(0f, 1f) else 0f

    Scaffold(
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = { showAddDialog = true },
                icon = { Icon(Icons.Default.Add, contentDescription = "Add Task") },
                text = { Text("Schedule Task") },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary,
                modifier = Modifier.testTag("add_task_fab")
            )
        },
        modifier = modifier.fillMaxSize()
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Search Bar & Progress Overview
            Column(modifier = Modifier.padding(16.dp)) {
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { viewModel.setTaskSearchQuery(it) },
                    placeholder = { Text("Search tasks by title, subject...") },
                    leadingIcon = { Icon(Icons.Default.Search, contentDescription = "Search") },
                    trailingIcon = {
                        if (searchQuery.isNotEmpty()) {
                            IconButton(onClick = { viewModel.setTaskSearchQuery("") }) {
                                Icon(Icons.Default.Close, contentDescription = "Clear")
                            }
                        }
                    },
                    singleLine = true,
                    shape = RoundedCornerShape(14.dp),
                    modifier = Modifier.fillMaxWidth().testTag("task_search_bar")
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Progress Banner
                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = "Tasks Completed: $completedCount / ${tasks.size}",
                                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Text(
                                text = "${(progress * 100).toInt()}% Done",
                                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                                color = PrimaryLight
                            )
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        LinearProgressIndicator(
                            progress = { progress },
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(6.dp)
                                .clip(RoundedCornerShape(3.dp)),
                            color = ColorProgramming,
                            trackColor = MaterialTheme.colorScheme.surface
                        )
                    }
                }
            }

            // Status Filter Chips
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(statusOptions) { status ->
                    CategoryChip(
                        text = status,
                        isSelected = statusFilter == status,
                        onClick = { viewModel.setTaskStatusFilter(status) }
                    )
                }
            }

            // Tasks List
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                if (filteredTasks.isEmpty()) {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 40.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "No tasks found for selected filter.",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                } else {
                    items(filteredTasks, key = { it.id }) { task ->
                        TaskItemCard(
                            task = task,
                            onToggle = { viewModel.toggleTaskStatus(task) },
                            onEdit = { editingTask = task },
                            onDelete = { taskToDelete = task }
                        )
                    }
                }
            }
        }
    }

    // Add / Edit Task Dialog
    if (showAddDialog || editingTask != null) {
        val isEditing = editingTask != null
        var title by remember { mutableStateOf(editingTask?.title ?: "") }
        var subjectName by remember {
            mutableStateOf(editingTask?.subjectName ?: (subjects.firstOrNull()?.name ?: "Database Management Systems"))
        }
        var description by remember { mutableStateOf(editingTask?.description ?: "") }
        var date by remember { mutableStateOf(editingTask?.date ?: "2026-10-10") }
        var startTime by remember { mutableStateOf(editingTask?.startTime ?: "10:00 AM") }
        var durationMinutes by remember { mutableStateOf((editingTask?.durationMinutes ?: 60).toString()) }
        var priority by remember { mutableStateOf(editingTask?.priority ?: "Medium") }

        AlertDialog(
            onDismissRequest = {
                showAddDialog = false
                editingTask = null
            },
            title = { Text(if (isEditing) "Edit Study Task" else "Schedule New Task") },
            text = {
                Column(
                    verticalArrangement = Arrangement.spacedBy(10.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    OutlinedTextField(
                        value = title,
                        onValueChange = { title = it },
                        label = { Text("Task Title") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth().testTag("task_title_input")
                    )

                    // Subject Selector
                    Text("Select Subject:", style = MaterialTheme.typography.labelSmall)
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        items(subjects.take(6)) { sub ->
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (subjectName == sub.name) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                                modifier = Modifier.clickable { subjectName = sub.name }
                            ) {
                                Text(
                                    text = sub.code.ifBlank { sub.name.take(8) },
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                    style = MaterialTheme.typography.labelSmall
                                )
                            }
                        }
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = date,
                            onValueChange = { date = it },
                            label = { Text("Date (YYYY-MM-DD)") },
                            modifier = Modifier.weight(1.3f)
                        )
                        OutlinedTextField(
                            value = startTime,
                            onValueChange = { startTime = it },
                            label = { Text("Start Time") },
                            modifier = Modifier.weight(1f)
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = durationMinutes,
                            onValueChange = { durationMinutes = it },
                            label = { Text("Duration (mins)") },
                            modifier = Modifier.weight(1f)
                        )
                    }

                    // Priority
                    Text("Priority:", style = MaterialTheme.typography.labelSmall)
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        listOf("High", "Medium", "Low").forEach { p ->
                            FilterChip(
                                selected = priority == p,
                                onClick = { priority = p },
                                label = { Text(p) }
                            )
                        }
                    }

                    OutlinedTextField(
                        value = description,
                        onValueChange = { description = it },
                        label = { Text("Task Notes / Chapters") },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (title.isNotBlank()) {
                            val task = StudyTask(
                                id = editingTask?.id ?: 0,
                                title = title.trim(),
                                subjectName = subjectName,
                                description = description.trim(),
                                date = date.trim(),
                                startTime = startTime.trim(),
                                durationMinutes = durationMinutes.toIntOrNull() ?: 60,
                                priority = priority,
                                status = editingTask?.status ?: "Pending"
                            )
                            if (isEditing) {
                                viewModel.updateTask(task)
                            } else {
                                viewModel.addTask(task)
                            }
                            showAddDialog = false
                            editingTask = null
                        }
                    },
                    modifier = Modifier.testTag("save_task_button")
                ) {
                    Text("Save Task")
                }
            },
            dismissButton = {
                TextButton(onClick = {
                    showAddDialog = false
                    editingTask = null
                }) {
                    Text("Cancel")
                }
            }
        )
    }

    // Delete Task Dialog
    if (taskToDelete != null) {
        AlertDialog(
            onDismissRequest = { taskToDelete = null },
            title = { Text("Delete Task") },
            text = { Text("Delete study task '${taskToDelete?.title}'?") },
            confirmButton = {
                Button(
                    onClick = {
                        taskToDelete?.id?.let { viewModel.deleteTask(it) }
                        taskToDelete = null
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error)
                ) {
                    Text("Delete")
                }
            },
            dismissButton = {
                TextButton(onClick = { taskToDelete = null }) {
                    Text("Cancel")
                }
            }
        )
    }
}

@Composable
fun TaskItemCard(
    task: StudyTask,
    onToggle: () -> Unit,
    onEdit: () -> Unit,
    onDelete: () -> Unit
) {
    val isCompleted = task.status == "Completed"

    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = onToggle,
                modifier = Modifier.size(40.dp)
            ) {
                Icon(
                    imageVector = when (task.status) {
                        "Completed" -> Icons.Default.CheckCircle
                        "In Progress" -> Icons.Default.PlayCircleFilled
                        else -> Icons.Outlined.RadioButtonUnchecked
                    },
                    contentDescription = "Status",
                    tint = when (task.status) {
                        "Completed" -> ColorProgramming
                        "In Progress" -> ColorMedPriority
                        else -> MaterialTheme.colorScheme.outline
                    },
                    modifier = Modifier.size(26.dp)
                )
            }

            Spacer(modifier = Modifier.width(8.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        text = task.title,
                        style = MaterialTheme.typography.bodyLarge.copy(
                            fontWeight = FontWeight.Bold,
                            textDecoration = if (isCompleted) TextDecoration.LineThrough else TextDecoration.None
                        ),
                        color = if (isCompleted) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.onSurface,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }

                Text(
                    text = "${task.subjectName} • ${task.date} at ${task.startTime} (${task.durationMinutes}m)",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                if (task.description.isNotBlank()) {
                    Text(
                        text = task.description,
                        style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                        color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f),
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            Column(horizontalAlignment = Alignment.End) {
                PriorityBadge(priority = task.priority)
                Row {
                    IconButton(onClick = onEdit, modifier = Modifier.size(30.dp)) {
                        Icon(Icons.Default.Edit, contentDescription = "Edit", modifier = Modifier.size(16.dp))
                    }
                    IconButton(onClick = onDelete, modifier = Modifier.size(30.dp)) {
                        Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", modifier = Modifier.size(16.dp), tint = MaterialTheme.colorScheme.error)
                    }
                }
            }
        }
    }
}

package com.example.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.Subject
import com.example.ui.components.CategoryChip
import com.example.ui.components.PriorityBadge
import com.example.ui.theme.*
import com.example.ui.viewmodel.MainViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SubjectsScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val subjects by viewModel.allSubjects.collectAsState()
    val categoryFilter by viewModel.subjectCategoryFilter.collectAsState()

    var showAddDialog by remember { mutableStateOf(false) }
    var editingSubject by remember { mutableStateOf<Subject?>(null) }
    var subjectToDelete by remember { mutableStateOf<Subject?>(null) }

    val categories = listOf("All", "Core CSE", "Programming", "Aptitude", "Reasoning", "English")
    val filteredSubjects = if (categoryFilter == "All") {
        subjects
    } else {
        subjects.filter { it.category == categoryFilter }
    }

    Scaffold(
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = { showAddDialog = true },
                icon = { Icon(Icons.Default.Add, contentDescription = "Add Subject") },
                text = { Text("Add Subject") },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary,
                modifier = Modifier.testTag("add_subject_fab")
            )
        },
        modifier = modifier.fillMaxSize()
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Category Filter Pills
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 10.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(categories) { cat ->
                    CategoryChip(
                        text = cat,
                        isSelected = categoryFilter == cat,
                        onClick = { viewModel.setSubjectCategoryFilter(cat) }
                    )
                }
            }

            // Subject Cards List
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(filteredSubjects, key = { it.id }) { subject ->
                    SubjectCard(
                        subject = subject,
                        onEdit = { editingSubject = subject },
                        onDelete = { subjectToDelete = subject }
                    )
                }
            }
        }
    }

    // Add / Edit Dialog
    if (showAddDialog || editingSubject != null) {
        val isEditing = editingSubject != null
        var name by remember { mutableStateOf(editingSubject?.name ?: "") }
        var code by remember { mutableStateOf(editingSubject?.code ?: "CS") }
        var category by remember { mutableStateOf(editingSubject?.category ?: "Core CSE") }
        var description by remember { mutableStateOf(editingSubject?.description ?: "") }
        var examDate by remember { mutableStateOf(editingSubject?.examDate ?: "2026-11-20") }
        var priority by remember { mutableStateOf(editingSubject?.priority ?: "High") }
        var totalTopics by remember { mutableStateOf((editingSubject?.totalTopics ?: 10).toString()) }
        var completedTopics by remember { mutableStateOf((editingSubject?.completedTopics ?: 0).toString()) }

        AlertDialog(
            onDismissRequest = {
                showAddDialog = false
                editingSubject = null
            },
            title = { Text(if (isEditing) "Edit Subject" else "Add New Subject") },
            text = {
                Column(
                    verticalArrangement = Arrangement.spacedBy(10.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    OutlinedTextField(
                        value = name,
                        onValueChange = { name = it },
                        label = { Text("Subject Name") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth().testTag("subject_name_input")
                    )
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = code,
                            onValueChange = { code = it },
                            label = { Text("Code") },
                            modifier = Modifier.weight(1f)
                        )
                        OutlinedTextField(
                            value = examDate,
                            onValueChange = { examDate = it },
                            label = { Text("Exam Date (YYYY-MM-DD)") },
                            modifier = Modifier.weight(2f)
                        )
                    }

                    // Category dropdown / pills
                    Text("Category:", style = MaterialTheme.typography.labelMedium)
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        items(listOf("Core CSE", "Programming", "Aptitude", "Reasoning", "English")) { cat ->
                            Surface(
                                shape = RoundedCornerShape(12.dp),
                                color = if (category == cat) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                                modifier = Modifier.clickable { category = cat }
                            ) {
                                Text(
                                    text = cat,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                    style = MaterialTheme.typography.bodySmall
                                )
                            }
                        }
                    }

                    // Priority
                    Text("Priority:", style = MaterialTheme.typography.labelMedium)
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        listOf("High", "Medium", "Low").forEach { p ->
                            FilterChip(
                                selected = priority == p,
                                onClick = { priority = p },
                                label = { Text(p) }
                            )
                        }
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = completedTopics,
                            onValueChange = { completedTopics = it },
                            label = { Text("Completed Topics") },
                            modifier = Modifier.weight(1f)
                        )
                        OutlinedTextField(
                            value = totalTopics,
                            onValueChange = { totalTopics = it },
                            label = { Text("Total Topics") },
                            modifier = Modifier.weight(1f)
                        )
                    }

                    OutlinedTextField(
                        value = description,
                        onValueChange = { description = it },
                        label = { Text("Syllabus / Key Topics") },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (name.isNotBlank()) {
                            val sub = Subject(
                                id = editingSubject?.id ?: 0,
                                name = name.trim(),
                                code = code.trim(),
                                category = category,
                                description = description.trim(),
                                examDate = examDate.trim(),
                                priority = priority,
                                totalTopics = totalTopics.toIntOrNull() ?: 10,
                                completedTopics = completedTopics.toIntOrNull() ?: 0
                            )
                            if (isEditing) {
                                viewModel.updateSubject(sub)
                            } else {
                                viewModel.addSubject(sub)
                            }
                            showAddDialog = false
                            editingSubject = null
                        }
                    },
                    modifier = Modifier.testTag("save_subject_button")
                ) {
                    Text("Save")
                }
            },
            dismissButton = {
                TextButton(onClick = {
                    showAddDialog = false
                    editingSubject = null
                }) {
                    Text("Cancel")
                }
            }
        )
    }

    // Delete confirmation dialog
    if (subjectToDelete != null) {
        AlertDialog(
            onDismissRequest = { subjectToDelete = null },
            title = { Text("Delete Subject") },
            text = { Text("Are you sure you want to remove '${subjectToDelete?.name}' from your syllabus?") },
            confirmButton = {
                Button(
                    onClick = {
                        subjectToDelete?.id?.let { viewModel.deleteSubject(it) }
                        subjectToDelete = null
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error)
                ) {
                    Text("Delete")
                }
            },
            dismissButton = {
                TextButton(onClick = { subjectToDelete = null }) {
                    Text("Cancel")
                }
            }
        )
    }
}

@Composable
fun SubjectCard(
    subject: Subject,
    onEdit: () -> Unit,
    onDelete: () -> Unit
) {
    val progress = if (subject.totalTopics > 0) {
        (subject.completedTopics.toFloat() / subject.totalTopics.toFloat()).coerceIn(0f, 1f)
    } else 0f
    val percentText = (progress * 100).toInt()

    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = subject.name,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                    Text(
                        text = "${subject.code} • ${subject.category}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    PriorityBadge(priority = subject.priority)
                    Spacer(modifier = Modifier.width(4.dp))
                    IconButton(onClick = onEdit, modifier = Modifier.size(32.dp)) {
                        Icon(Icons.Default.Edit, contentDescription = "Edit", modifier = Modifier.size(18.dp))
                    }
                    IconButton(onClick = onDelete, modifier = Modifier.size(32.dp)) {
                        Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", modifier = Modifier.size(18.dp), tint = MaterialTheme.colorScheme.error)
                    }
                }
            }

            if (subject.description.isNotBlank()) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = subject.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Progress bar and syllabus stats
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Syllabus Progress: ${subject.completedTopics}/${subject.totalTopics} topics ($percentText%)",
                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.SemiBold),
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = "Exam: ${subject.examDate}",
                    style = MaterialTheme.typography.labelSmall,
                    color = PrimaryLight
                )
            }
            Spacer(modifier = Modifier.height(6.dp))
            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(8.dp)
                    .clip(RoundedCornerShape(4.dp)),
                color = when {
                    progress >= 0.8f -> ColorProgramming
                    progress >= 0.5f -> PrimaryLight
                    else -> ColorMedPriority
                },
                trackColor = MaterialTheme.colorScheme.surfaceVariant
            )
        }
    }
}

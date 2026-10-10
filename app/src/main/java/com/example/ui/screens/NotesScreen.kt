package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.StudyNote
import com.example.ui.components.CategoryChip
import com.example.ui.theme.*
import com.example.ui.viewmodel.MainViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NotesScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val notes by viewModel.allNotes.collectAsState()
    val subjects by viewModel.allSubjects.collectAsState()
    val searchQuery by viewModel.noteSearchQuery.collectAsState()
    val context = LocalContext.current

    var selectedCategoryFilter by remember { mutableStateOf("All") }
    var showAddDialog by remember { mutableStateOf(false) }
    var editingNote by remember { mutableStateOf<StudyNote?>(null) }
    var noteToDelete by remember { mutableStateOf<StudyNote?>(null) }
    var viewingNote by remember { mutableStateOf<StudyNote?>(null) }

    val categories = listOf("All", "Important", "Concept", "Formula", "Interview")

    val filteredNotes = notes.filter { note ->
        val matchesCategory = if (selectedCategoryFilter == "All") true else note.category == selectedCategoryFilter
        val matchesSearch = if (searchQuery.isBlank()) true else {
            note.title.contains(searchQuery, ignoreCase = true) ||
                    note.content.contains(searchQuery, ignoreCase = true) ||
                    note.subjectName.contains(searchQuery, ignoreCase = true) ||
                    note.tags.contains(searchQuery, ignoreCase = true)
        }
        matchesCategory && matchesSearch
    }

    Scaffold(
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = { showAddDialog = true },
                icon = { Icon(Icons.Default.Add, contentDescription = "Add Note") },
                text = { Text("New Note") },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary,
                modifier = Modifier.testTag("add_note_fab")
            )
        },
        modifier = modifier.fillMaxSize()
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Search Bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { viewModel.setNoteSearchQuery(it) },
                placeholder = { Text("Search notes by title, keyword, tag...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = "Search") },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { viewModel.setNoteSearchQuery("") }) {
                            Icon(Icons.Default.Close, contentDescription = "Clear")
                        }
                    }
                },
                singleLine = true,
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 10.dp)
                    .testTag("note_search_bar")
            )

            // Category Filter Pills
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(categories) { cat ->
                    CategoryChip(
                        text = cat,
                        isSelected = selectedCategoryFilter == cat,
                        onClick = { selectedCategoryFilter = cat }
                    )
                }
            }

            // Notes List
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                if (filteredNotes.isEmpty()) {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 40.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "No notes found matching your criteria.",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                } else {
                    items(filteredNotes, key = { it.id }) { note ->
                        NoteCard(
                            note = note,
                            onClick = { viewingNote = note },
                            onEdit = { editingNote = note },
                            onDelete = { noteToDelete = note },
                            onCopy = {
                                val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                                val clip = ClipData.newPlainText("Study Note", "${note.title}\n\n${note.content}")
                                clipboard.setPrimaryClip(clip)
                                Toast.makeText(context, "Note copied to clipboard!", Toast.LENGTH_SHORT).show()
                            }
                        )
                    }
                }
            }
        }
    }

    // View Note Dialog
    if (viewingNote != null) {
        val note = viewingNote!!
        AlertDialog(
            onDismissRequest = { viewingNote = null },
            title = {
                Column {
                    Text(text = note.title, style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold))
                    Text(
                        text = "${note.subjectName} • ${note.category}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            },
            text = {
                Column(modifier = Modifier.fillMaxWidth()) {
                    Text(
                        text = note.content,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(14.dp))
                    Text(
                        text = "Tags: ${note.tags}",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            },
            confirmButton = {
                TextButton(onClick = { viewingNote = null }) {
                    Text("Close")
                }
            }
        )
    }

    // Add / Edit Dialog
    if (showAddDialog || editingNote != null) {
        val isEditing = editingNote != null
        var title by remember { mutableStateOf(editingNote?.title ?: "") }
        var subjectName by remember {
            mutableStateOf(editingNote?.subjectName ?: (subjects.firstOrNull()?.name ?: "DBMS"))
        }
        var content by remember { mutableStateOf(editingNote?.content ?: "") }
        var category by remember { mutableStateOf(editingNote?.category ?: "Important") }
        var tags by remember { mutableStateOf(editingNote?.tags ?: "cse,exam") }

        AlertDialog(
            onDismissRequest = {
                showAddDialog = false
                editingNote = null
            },
            title = { Text(if (isEditing) "Edit Study Note" else "Create Study Note") },
            text = {
                Column(
                    verticalArrangement = Arrangement.spacedBy(10.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    OutlinedTextField(
                        value = title,
                        onValueChange = { title = it },
                        label = { Text("Note Title") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth().testTag("note_title_input")
                    )

                    // Subject Selector
                    Text("Subject:", style = MaterialTheme.typography.labelSmall)
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

                    // Category
                    Text("Category:", style = MaterialTheme.typography.labelSmall)
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        listOf("Important", "Concept", "Formula", "Interview").forEach { cat ->
                            FilterChip(
                                selected = category == cat,
                                onClick = { category = cat },
                                label = { Text(cat, fontSize = 12.sp) }
                            )
                        }
                    }

                    OutlinedTextField(
                        value = tags,
                        onValueChange = { tags = it },
                        label = { Text("Tags (comma-separated)") },
                        modifier = Modifier.fillMaxWidth()
                    )

                    OutlinedTextField(
                        value = content,
                        onValueChange = { content = it },
                        label = { Text("Note Content / Code / Formulae") },
                        minLines = 4,
                        maxLines = 8,
                        modifier = Modifier.fillMaxWidth().testTag("note_content_input")
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (title.isNotBlank()) {
                            val note = StudyNote(
                                id = editingNote?.id ?: 0,
                                title = title.trim(),
                                subjectName = subjectName,
                                content = content.trim(),
                                category = category,
                                tags = tags.trim(),
                                updatedAt = System.currentTimeMillis()
                            )
                            if (isEditing) {
                                viewModel.updateNote(note)
                            } else {
                                viewModel.addNote(note)
                            }
                            showAddDialog = false
                            editingNote = null
                        }
                    },
                    modifier = Modifier.testTag("save_note_button")
                ) {
                    Text("Save Note")
                }
            },
            dismissButton = {
                TextButton(onClick = {
                    showAddDialog = false
                    editingNote = null
                }) {
                    Text("Cancel")
                }
            }
        )
    }

    // Delete confirmation
    if (noteToDelete != null) {
        AlertDialog(
            onDismissRequest = { noteToDelete = null },
            title = { Text("Delete Note") },
            text = { Text("Delete note '${noteToDelete?.title}'?") },
            confirmButton = {
                Button(
                    onClick = {
                        noteToDelete?.id?.let { viewModel.deleteNote(it) }
                        noteToDelete = null
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error)
                ) {
                    Text("Delete")
                }
            },
            dismissButton = {
                TextButton(onClick = { noteToDelete = null }) {
                    Text("Cancel")
                }
            }
        )
    }
}

@Composable
fun NoteCard(
    note: StudyNote,
    onClick: () -> Unit,
    onEdit: () -> Unit,
    onDelete: () -> Unit,
    onCopy: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = note.title,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                    Text(
                        text = "${note.subjectName} • ${note.category}",
                        style = MaterialTheme.typography.bodySmall,
                        color = PrimaryLight
                    )
                }
                Row {
                    IconButton(onClick = onCopy, modifier = Modifier.size(32.dp)) {
                        Icon(Icons.Default.ContentCopy, contentDescription = "Copy", modifier = Modifier.size(16.dp))
                    }
                    IconButton(onClick = onEdit, modifier = Modifier.size(32.dp)) {
                        Icon(Icons.Default.Edit, contentDescription = "Edit", modifier = Modifier.size(16.dp))
                    }
                    IconButton(onClick = onDelete, modifier = Modifier.size(32.dp)) {
                        Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", modifier = Modifier.size(16.dp), tint = MaterialTheme.colorScheme.error)
                    }
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = note.content,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis
            )

            if (note.tags.isNotBlank()) {
                Spacer(modifier = Modifier.height(10.dp))
                LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    items(note.tags.split(",")) { tag ->
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = MaterialTheme.colorScheme.surfaceVariant
                        ) {
                            Text(
                                text = "#${tag.trim()}",
                                style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp),
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}

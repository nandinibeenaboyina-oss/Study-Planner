package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.UserProfile
import com.example.ui.components.SectionHeader
import com.example.ui.theme.*
import com.example.ui.viewmodel.MainViewModel

@Composable
fun ProfileSettingsScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val profile by viewModel.userProfile.collectAsState()
    val isDarkMode by viewModel.isDarkMode.collectAsState()

    var isEditingProfile by remember { mutableStateOf(false) }

    var name by remember(profile) { mutableStateOf(profile?.name ?: "") }
    var email by remember(profile) { mutableStateOf(profile?.email ?: "") }
    var rollNumber by remember(profile) { mutableStateOf(profile?.rollNumber ?: "") }
    var semester by remember(profile) { mutableStateOf(profile?.semester ?: "Semester 6") }
    var branch by remember(profile) { mutableStateOf(profile?.branch ?: "B.Tech CSE") }
    var targetCgpa by remember(profile) { mutableStateOf((profile?.targetCgpa ?: 9.2).toString()) }
    var currentCgpa by remember(profile) { mutableStateOf((profile?.currentCgpa ?: 8.75).toString()) }
    var bio by remember(profile) { mutableStateOf(profile?.bio ?: "") }

    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = modifier
            .fillMaxSize()
            .testTag("settings_screen")
    ) {
        // Profile Card
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        modifier = Modifier
                            .size(72.dp)
                            .clip(CircleShape)
                            .background(PrimaryLight),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = "Avatar",
                            tint = Color.White,
                            modifier = Modifier.size(40.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = profile?.name ?: "Alex Sharma",
                        style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "${profile?.rollNumber ?: "22BCE1048"} • ${profile?.branch ?: "B.Tech CSE"}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = profile?.bio ?: "Aspiring Full Stack Engineer & SDE.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        fontSize = 13.sp
                    )

                    Spacer(modifier = Modifier.height(16.dp))
                    OutlinedButton(
                        onClick = { isEditingProfile = !isEditingProfile },
                        modifier = Modifier.testTag("edit_profile_toggle")
                    ) {
                        Icon(
                            imageVector = if (isEditingProfile) Icons.Default.Close else Icons.Default.Edit,
                            contentDescription = "Edit Profile"
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(if (isEditingProfile) "Cancel Edit" else "Edit Student Profile")
                    }
                }
            }
        }

        // Edit Profile Form
        if (isEditingProfile) {
            item {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Text(
                            text = "Update Student Information",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                        )
                        OutlinedTextField(
                            value = name,
                            onValueChange = { name = it },
                            label = { Text("Full Name") },
                            modifier = Modifier.fillMaxWidth().testTag("profile_name_input")
                        )
                        OutlinedTextField(
                            value = email,
                            onValueChange = { email = it },
                            label = { Text("Email Address") },
                            modifier = Modifier.fillMaxWidth()
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedTextField(
                                value = rollNumber,
                                onValueChange = { rollNumber = it },
                                label = { Text("Roll Number") },
                                modifier = Modifier.weight(1f)
                            )
                            OutlinedTextField(
                                value = semester,
                                onValueChange = { semester = it },
                                label = { Text("Semester") },
                                modifier = Modifier.weight(1f)
                            )
                        }
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedTextField(
                                value = targetCgpa,
                                onValueChange = { targetCgpa = it },
                                label = { Text("Target CGPA") },
                                modifier = Modifier.weight(1f)
                            )
                            OutlinedTextField(
                                value = currentCgpa,
                                onValueChange = { currentCgpa = it },
                                label = { Text("Current CGPA") },
                                modifier = Modifier.weight(1f)
                            )
                        }
                        OutlinedTextField(
                            value = bio,
                            onValueChange = { bio = it },
                            label = { Text("Short Bio / Aspirations") },
                            modifier = Modifier.fillMaxWidth()
                        )
                        Button(
                            onClick = {
                                val updated = UserProfile(
                                    id = profile?.id ?: 1,
                                    name = name.trim(),
                                    email = email.trim(),
                                    rollNumber = rollNumber.trim(),
                                    semester = semester.trim(),
                                    branch = branch.trim(),
                                    targetCgpa = targetCgpa.toDoubleOrNull() ?: 9.0,
                                    currentCgpa = currentCgpa.toDoubleOrNull() ?: 8.5,
                                    bio = bio.trim()
                                )
                                viewModel.updateProfile(updated)
                                isEditingProfile = false
                            },
                            modifier = Modifier.fillMaxWidth().testTag("save_profile_button")
                        ) {
                            Text("Save Profile Changes")
                        }
                    }
                }
            }
        }

        // Appearance / Theme
        item {
            SectionHeader(title = "Appearance & Theme")
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Choose Theme Mode",
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold)
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        FilterChip(
                            selected = isDarkMode == null,
                            onClick = { viewModel.setDarkMode(null) },
                            label = { Text("System") },
                            modifier = Modifier.weight(1f)
                        )
                        FilterChip(
                            selected = isDarkMode == false,
                            onClick = { viewModel.setDarkMode(false) },
                            label = { Text("Light") },
                            modifier = Modifier.weight(1f)
                        )
                        FilterChip(
                            selected = isDarkMode == true,
                            onClick = { viewModel.setDarkMode(true) },
                            label = { Text("Dark") },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }

        // App Information
        item {
            SectionHeader(title = "About Student Study Planner")
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Text(
                        text = "CSE Study Planner & Exam Preparation",
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold)
                    )
                    Text(
                        text = "Version 1.0 • Built with Kotlin, Jetpack Compose, Room SQLite & Google Gemini AI",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = "Tailored for B.Tech Computer Science & Engineering students preparing for university exams, GATE, and campus placement drives.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

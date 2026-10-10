package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.PlacementResource
import com.example.ui.components.CategoryChip
import com.example.ui.theme.*
import com.example.ui.viewmodel.MainViewModel

@Composable
fun PlacementScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val resources by viewModel.allPlacementResources.collectAsState()
    val activeTab by viewModel.placementTab.collectAsState()
    val onlyBookmarked by viewModel.onlyBookmarkedPlacement.collectAsState()

    val tabs = listOf("Technical", "HR Interview", "Programming Practice", "Company Guide")

    val filteredResources = resources.filter { res ->
        val matchesTab = res.category == activeTab
        val matchesBookmark = if (onlyBookmarked) res.isBookmarked else true
        matchesTab && matchesBookmark
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .testTag("placement_screen")
    ) {
        // Tab Selection Header
        ScrollableTabRow(
            selectedTabIndex = tabs.indexOf(activeTab).coerceAtLeast(0),
            edgePadding = 16.dp,
            containerColor = MaterialTheme.colorScheme.surface,
            contentColor = MaterialTheme.colorScheme.primary,
            modifier = Modifier.fillMaxWidth()
        ) {
            tabs.forEach { tab ->
                Tab(
                    selected = activeTab == tab,
                    onClick = { viewModel.setPlacementTab(tab) },
                    text = {
                        Text(
                            text = tab,
                            fontWeight = if (activeTab == tab) FontWeight.Bold else FontWeight.Normal
                        )
                    }
                )
            }
        }

        // Bookmark Toggle Row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "${filteredResources.size} Resources Available",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            FilterChip(
                selected = onlyBookmarked,
                onClick = { viewModel.togglePlacementBookmarkFilter() },
                leadingIcon = {
                    Icon(
                        imageVector = if (onlyBookmarked) Icons.Default.Bookmark else Icons.Outlined.BookmarkBorder,
                        contentDescription = "Bookmarks",
                        modifier = Modifier.size(16.dp)
                    )
                },
                label = { Text("Bookmarked Only", fontSize = 12.sp) }
            )
        }

        // Resources List
        LazyColumn(
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp),
            modifier = Modifier.fillMaxSize()
        ) {
            if (filteredResources.isEmpty()) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 40.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = if (onlyBookmarked) "No bookmarked resources in this category." else "No questions found.",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            } else {
                items(filteredResources, key = { it.id }) { resource ->
                    PlacementItemCard(
                        resource = resource,
                        onToggleBookmark = { viewModel.toggleResourceBookmark(resource) }
                    )
                }
            }
        }
    }
}

@Composable
fun PlacementItemCard(
    resource: PlacementResource,
    onToggleBookmark: () -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

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
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = when (resource.difficulty.lowercase()) {
                        "easy" -> ColorProgramming.copy(alpha = 0.15f)
                        "hard" -> ColorHighPriority.copy(alpha = 0.15f)
                        else -> ColorMedPriority.copy(alpha = 0.15f)
                    }
                ) {
                    Text(
                        text = "${resource.topic} • ${resource.difficulty.uppercase()}",
                        color = when (resource.difficulty.lowercase()) {
                            "easy" -> ColorProgramming
                            "hard" -> ColorHighPriority
                            else -> ColorMedPriority
                        },
                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                    )
                }

                IconButton(
                    onClick = onToggleBookmark,
                    modifier = Modifier.size(32.dp)
                ) {
                    Icon(
                        imageVector = if (resource.isBookmarked) Icons.Default.Bookmark else Icons.Outlined.BookmarkBorder,
                        contentDescription = "Bookmark",
                        tint = if (resource.isBookmarked) ColorAptitude else MaterialTheme.colorScheme.outline
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = resource.title,
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                color = MaterialTheme.colorScheme.onSurface
            )

            if (resource.question.isNotBlank()) {
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = resource.question,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Expand / Collapse Answer Button
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { expanded = !expanded }
                    .padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = if (expanded) "Hide Solution / Answer" else "View Detailed Answer",
                    style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                    color = PrimaryLight
                )
                Icon(
                    imageVector = if (expanded) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                    contentDescription = "Toggle answer",
                    tint = PrimaryLight
                )
            }

            AnimatedVisibility(visible = expanded) {
                Column(modifier = Modifier.padding(top = 10.dp)) {
                    Surface(
                        shape = RoundedCornerShape(10.dp),
                        color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = resource.answer,
                            style = MaterialTheme.typography.bodySmall.copy(lineHeight = 20.sp),
                            color = MaterialTheme.colorScheme.onSurface,
                            modifier = Modifier.padding(12.dp)
                        )
                    }

                    if (resource.codeSnippet.isNotBlank()) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = BackgroundDark,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = resource.codeSnippet,
                                fontFamily = FontFamily.Monospace,
                                fontSize = 12.sp,
                                color = Color(0xFF67E8F9),
                                modifier = Modifier.padding(12.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}

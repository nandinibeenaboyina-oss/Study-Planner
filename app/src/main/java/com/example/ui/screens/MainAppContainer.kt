package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
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
import com.example.ui.theme.PrimaryLight
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MainViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainAppContainer(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val currentScreen by viewModel.currentScreen.collectAsState()
    val userProfile by viewModel.userProfile.collectAsState()
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    // Collect user snackbar feedback
    LaunchedEffect(Unit) {
        viewModel.userMessage.collect { message ->
            snackbarHostState.showSnackbar(message)
        }
    }

    // Intercept back button
    BackHandler {
        val handled = viewModel.handleBackPress()
        if (!handled && drawerState.isOpen) {
            scope.launch { drawerState.close() }
        }
    }

    val primaryBottomTabs = listOf(
        AppScreen.DASHBOARD to (Icons.Default.Dashboard to Icons.Outlined.Dashboard),
        AppScreen.SUBJECTS to (Icons.Default.MenuBook to Icons.Outlined.MenuBook),
        AppScreen.TASKS to (Icons.Default.CalendarToday to Icons.Outlined.CalendarToday),
        AppScreen.QUIZZES to (Icons.Default.Quiz to Icons.Outlined.Quiz),
        AppScreen.AI_ASSISTANT to (Icons.Default.AutoAwesome to Icons.Outlined.AutoAwesome)
    )

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet(
                modifier = Modifier.width(300.dp)
            ) {
                // Drawer Header
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(PrimaryLight)
                        .padding(20.dp)
                ) {
                    Column {
                        Box(
                            modifier = Modifier
                                .size(48.dp)
                                .clip(CircleShape)
                                .background(Color.White.copy(alpha = 0.2f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                Icons.Default.School,
                                contentDescription = "Student Icon",
                                tint = Color.White,
                                modifier = Modifier.size(28.dp)
                            )
                        }
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = userProfile?.name ?: "Alex Sharma",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = Color.White
                        )
                        Text(
                            text = "${userProfile?.branch ?: "B.Tech CSE"} • ${userProfile?.semester ?: "Sem 6"}",
                            style = MaterialTheme.typography.bodySmall,
                            color = Color.White.copy(alpha = 0.85f)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // All 9 Modules in Drawer
                val allDrawerScreens = listOf(
                    AppScreen.DASHBOARD to Icons.Default.Dashboard,
                    AppScreen.SUBJECTS to Icons.Default.MenuBook,
                    AppScreen.TASKS to Icons.Default.CalendarToday,
                    AppScreen.NOTES to Icons.Default.Description,
                    AppScreen.QUIZZES to Icons.Default.Quiz,
                    AppScreen.PLACEMENT to Icons.Default.WorkOutline,
                    AppScreen.AI_ASSISTANT to Icons.Default.AutoAwesome,
                    AppScreen.REPORTS to Icons.Default.BarChart,
                    AppScreen.SETTINGS to Icons.Default.Person
                )

                allDrawerScreens.forEach { (screen, icon) ->
                    NavigationDrawerItem(
                        icon = { Icon(icon, contentDescription = screen.title) },
                        label = { Text(screen.title) },
                        selected = currentScreen == screen,
                        onClick = {
                            scope.launch { drawerState.close() }
                            viewModel.navigateTo(screen)
                        },
                        modifier = Modifier
                            .padding(NavigationDrawerItemDefaults.ItemPadding)
                            .testTag("drawer_item_${screen.name.lowercase()}")
                    )
                }
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Column {
                            Text(
                                text = currentScreen.title,
                                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                            )
                            Text(
                                text = "B.Tech CSE Study Planner",
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    },
                    navigationIcon = {
                        IconButton(
                            onClick = { scope.launch { drawerState.open() } },
                            modifier = Modifier.testTag("nav_drawer_button")
                        ) {
                            Icon(Icons.Default.Menu, contentDescription = "Open Navigation Menu")
                        }
                    },
                    actions = {
                        IconButton(
                            onClick = { viewModel.navigateTo(AppScreen.AI_ASSISTANT) },
                            modifier = Modifier.testTag("topbar_ai_button")
                        ) {
                            Icon(
                                Icons.Default.AutoAwesome,
                                contentDescription = "AI Assistant",
                                tint = PrimaryLight
                            )
                        }
                        IconButton(
                            onClick = { viewModel.navigateTo(AppScreen.SETTINGS) },
                            modifier = Modifier.testTag("topbar_profile_button")
                        ) {
                            Icon(Icons.Default.AccountCircle, contentDescription = "Profile")
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = MaterialTheme.colorScheme.surface
                    )
                )
            },
            bottomBar = {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface,
                    tonalElevation = 6.dp,
                    windowInsets = WindowInsets.navigationBars,
                    modifier = Modifier.testTag("main_bottom_nav")
                ) {
                    primaryBottomTabs.forEach { (screen, icons) ->
                        val isSelected = currentScreen == screen
                        NavigationBarItem(
                            icon = {
                                Icon(
                                    imageVector = if (isSelected) icons.first else icons.second,
                                    contentDescription = screen.title
                                )
                            },
                            label = { Text(screen.title, fontSize = 10.sp, maxLines = 1) },
                            selected = isSelected,
                            onClick = { viewModel.navigateTo(screen) },
                            modifier = Modifier.testTag("bottom_tab_${screen.name.lowercase()}")
                        )
                    }
                }
            },
            snackbarHost = { SnackbarHost(snackbarHostState) },
            modifier = modifier.fillMaxSize()
        ) { paddingValues ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
            ) {
                when (currentScreen) {
                    AppScreen.DASHBOARD -> DashboardScreen(
                        viewModel = viewModel,
                        onNavigate = { viewModel.navigateTo(it) }
                    )
                    AppScreen.SUBJECTS -> SubjectsScreen(viewModel = viewModel)
                    AppScreen.TASKS -> TasksScreen(viewModel = viewModel)
                    AppScreen.NOTES -> NotesScreen(viewModel = viewModel)
                    AppScreen.QUIZZES -> QuizzesScreen(viewModel = viewModel)
                    AppScreen.PLACEMENT -> PlacementScreen(viewModel = viewModel)
                    AppScreen.AI_ASSISTANT -> AiAssistantScreen(viewModel = viewModel)
                    AppScreen.REPORTS -> ReportsScreen(viewModel = viewModel)
                    AppScreen.SETTINGS -> ProfileSettingsScreen(viewModel = viewModel)
                }
            }
        }
    }
}

package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.ui.screens.MainAppContainer
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.viewmodel.MainViewModel

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      val mainViewModel: MainViewModel = viewModel()
      val isDarkModePref by mainViewModel.isDarkMode.collectAsState()
      val systemDark = isSystemInDarkTheme()
      val darkTheme = isDarkModePref ?: systemDark

      MyApplicationTheme(darkTheme = darkTheme) {
        MainAppContainer(
          viewModel = mainViewModel,
          modifier = Modifier.fillMaxSize()
        )
      }
    }
  }
}

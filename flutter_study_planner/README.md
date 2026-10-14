# CSE Study Planner - Flutter & Dart Mobile Application

A complete Flutter mobile application port of the **CSE Study Planner & Exam Preparation System**.

Built with Flutter 3, Material 3, Google Fonts (Inter), and the Obsidian Black & Radiant Violet design system.

---

## 📱 Features Included

1. **📚 2-Step Subject & Syllabus Navigation:**
   - **Step 1:** Tap any subject (DBMS, OS, CN, DSA, ML, Software Engineering, Aptitude) to open its syllabus overview.
   - **Step 2:** Tap any syllabus unit to expand related topics.
   - **Direct Actions per Topic:**
     - 📺 **YouTube Video Lecture** button (opens directly in YouTube / browser via `url_launcher`)
     - 📄 **Google Notes Link** button (opens curated Google / GeeksforGeeks study notes)
     - 🤖 **Ask AI Coach** button (pre-fills topic into the AI tutor)
     - ☑️ **Completion Checkbox** (instantly updates subject syllabus progress)

2. **🤖 AI Study Coach:**
   - Ask **ANY** question across **ANY** CSE subject (DBMS, OS, Networks, Programming, Aptitude).
   - Formatted answers with headings, bullet points, and code formatting.
   - Copy answers with 1 tap or select from quick prompt chips.
   - Supports live Gemini API key or offline knowledge engine.

3. **⏱️ Focus Study Timer:**
   - Pomodoro (25m), Deep Work (50m), Power Hour (45m), and Stopwatch.
   - Subject tagging and automatic study session logging.

4. **📝 Study Task Planner & Timetable:**
   - Create, filter, prioritize, and track study tasks.

5. **📖 Study Notes Repository:**
   - Subject-wise notes, search bar, category chips (`Important`, `Concept`, `Formula`, `Interview`), and tag filters.

6. **🏆 Timed Exam Quizzes:**
   - 2-minute timed MCQs, question stepper, instant explanation display, and score percentage.

7. **📊 Progress & Analytics:**
   - Total study hours, syllabus coverage metrics, and daily hours bar chart.

8. **🌌 Radiant Violet & Obsidian Dark Theme:**
   - Exact hex palette matching the web app: Background `#090714`, Card Surface `#141026`, Primary Violet `#8B5CF6`, Accent `#7C3AED`.

---

## 🚀 How to Run the Flutter App

### Prerequisites:
- [Flutter SDK](https://docs.flutter.dev/get-started/install) (version 3.0.0 or higher)
- Android Studio or VS Code with Flutter & Dart extensions

### Step 1: Open the Flutter Project
```bash
cd flutter_study_planner
```

### Step 2: Get Dependencies
```bash
flutter pub get
```

### Step 3: Run on Device / Emulator / Web
```bash
# Run on connected Android / iOS device or emulator
flutter run

# Or run as Flutter Web in Chrome
flutter run -d chrome
```

### Step 4: Build Release APK for Android
```bash
flutter build apk --release
```
The generated APK will be at:
`build/app/outputs/flutter-apk/app-release.apk`

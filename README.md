# Student Study Planner & Exam Preparation System

A full-featured study planning, exam preparation, and campus placement system built with modern Android (Kotlin + Jetpack Compose) and SQLite Room Database.

## Live Access & Deployment
- **Web Browser Link (Streaming Emulator):** The app is running live and accessible directly in your browser at the **Shared App URL** and **Development App URL** provided in your AI Studio session.
- **GitHub & Export:** You can export this project as a ZIP or push directly to GitHub via the settings menu in the AI Studio editor.

---

## Key Modules & Features

### 1. Dashboard
- **Student Profile Overview:** Displays greeting, branch (B.Tech CSE), semester, target CGPA, and exam countdowns.
- **Statistics Cards:** Total Subjects, Pending Tasks, Completed Tasks, and Total Study Hours logged.
- **Study Rhythm & Schedule:** Interactive daily task list with single-tap completion toggles.
- **Quick-Access Action Cards:** Instant navigation to AI Assistant, Practice Quizzes, Placement Prep, Study Planner, and Notes.

### 2. Subject Management
- **Pre-populated CSE Curriculum:** Pre-configured with DBMS, Operating Systems, Computer Networks, Data Structures & Algorithms, Data Mining, Machine Learning, Quantitative Aptitude, Logical Reasoning, and Verbal Ability.
- **Category Organization:** Core CSE, Programming, Aptitude, Reasoning, and English.
- **Full CRUD Support:** Add, edit, and delete subjects with exam dates, priorities (High, Medium, Low), and syllabus completion tracking.

### 3. Study Task Planner
- **Timetable & Task Management:** Task title, subject, description, target date, start time, duration (minutes), and priority.
- **Status Lifecycle:** `Pending` ➔ `In Progress` ➔ `Completed`.
- **Search & Filtering:** Real-time search by keywords, filter by status or priority.
- **Progress Meter:** Visual indicator of completed tasks percentage.

### 4. Study Notes
- **Categorized Revision Sheets:** Organize notes into `Important`, `Concept`, `Formula`, and `Interview`.
- **Searchable:** Instant search across note titles, content, subjects, and `#tags`.
- **Clipboard Export:** One-tap copy note content for quick revision and sharing.

### 5. Exam Preparation & Interactive Quizzes
- **Topic-Specific Quizzes:** DBMS, Operating Systems, Computer Networks, Programming, Data Mining, Aptitude, Logical Reasoning, and English Grammar.
- **MCQ Exam Engine:** 4 multiple-choice options, live countdown timer, interactive question palette (1..N), and instant score calculation.
- **Review & Explanations:** Detailed answer rationales and explanations for every question.
- **Persistent Attempt History:** Tracks past quiz scores, accuracy percentages, and duration in the Room database.

### 6. Placement Preparation
- **Technical Interview Questions:** Deep-dive answers on OS, DBMS, OOP, and Networks.
- **HR Interview Questions:** Structured answers using the STAR (Situation, Task, Action, Result) framework.
- **Coding Practice:** Algorithm problems (Two Sum, Reverse Linked List) with time/space complexities and clean code snippets.
- **Company Guides:** Hiring patterns, test blueprints, and strategies for TCS NQT, Amazon SDE, and Infosys.
- **Bookmarking:** Save questions to review before interviews.

### 7. AI Study Assistant
- **Gemini AI Integration:** Powered by Google's `gemini-3.5-flash` model.
- **Academic Tutoring:** Ask questions on computer science concepts, debugging, SQL queries, and exam strategy.
- **Offline Intelligence Mode:** Pre-loaded with comprehensive explanations and study plans if an API key is not configured.

### 8. Progress Reports & Analytics
- **Study Hours Chart:** Daily distribution bar chart over the past 7 days.
- **Syllabus Mastery:** Subject-by-subject progress meters.
- **One-Tap Report Export:** Generates and copies a full academic progress summary to the clipboard.

### 9. Student Profile & Settings
- **Profile Management:** Edit full name, roll number, semester, target CGPA, and bio.
- **Appearance:** Toggle between System Default, Light Mode, and Dark Mode.

---

## Technical Stack
- **UI Framework:** Jetpack Compose (Material Design 3)
- **Local Persistence:** Room Database with Kotlin Symbol Processing (KSP)
- **Architecture:** Clean Architecture + MVVM (`StateFlow`, `collectAsStateWithLifecycle`)
- **Networking:** OkHttp & Retrofit
- **AI Engine:** Google Gemini REST API (`gemini-3.5-flash`)

---

## Configuration & Environment Variables

To enable real-time Gemini AI queries:
1. Open the **Secrets panel** in Google AI Studio.
2. Add your `GEMINI_API_KEY`.
3. The key is automatically injected via `.env.example` into `BuildConfig.GEMINI_API_KEY` at build time.

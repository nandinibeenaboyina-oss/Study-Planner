# Student Study Planner & Exam Preparation System

A full-featured study planning, exam preparation, syllabus tracking, and AI tutoring web application built for B.Tech Computer Science & Engineering students.

---

## 🚀 Live App & Deployment

### Deploying on Vercel (Recommended - 100% Free & Instant)
Vercel has generous free tier limits and deploys in less than 60 seconds with zero configuration:
1. Push your repository to **GitHub** (or ensure latest commits are pushed).
2. Go to **[vercel.com](https://vercel.com)** and sign in with your **GitHub** account.
3. Click **"Add New..."** ➔ **"Project"**.
4. Find and select your **`student-study-planner`** repository and click **"Import"**.
5. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. *(Optional)* Under **Environment Variables**, add `VITE_GEMINI_API_KEY` if you want to use a custom Gemini API key.
7. Click **"Deploy"**!
8. Within 30 seconds, Vercel gives you your permanent live URL (e.g. `https://your-project.vercel.app`) with automatic HTTPS and global CDN.

---

### Deploying on Render (Web Service)
If using Render:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node server.js`
- **Port:** `10000` (or leave default `$PORT`)


---

## ✨ Features & Architecture

### 1. 📚 2-Step Subject Syllabus & Topic Navigation
- **Step 1 (Click on Subject):** 
  - Clicking any subject card (DBMS, Operating Systems, Computer Networks, DSA, Machine Learning, Data Mining, Software Engineering, Aptitude) opens its dedicated **Syllabus Overview**.
  - Displays course code, category, exam date, overall syllabus progress percentage, and list of syllabus units.
- **Step 2 (Click on Syllabus Unit):**
  - Clicking on any syllabus unit expands its **Related Topics**.
  - **▶ YouTube Video Link:** 1-click button opening the curated video lecture in a new tab.
  - **📄 Google Notes Link:** 1-click button opening the corresponding Google search, PDF notes, and GeeksforGeeks tutorial in a new tab.
  - **✨ Ask AI Coach:** Direct button to instantly ask the AI Study Coach to explain that exact topic.
  - **Topic Completion Toggle:** Mark topics completed to update subject progress in real time.
  - **Add Custom Units & Topics:** Easily add custom syllabus units and new topics with custom YouTube and Google notes URLs.

### 2. 🤖 AI Study Coach (Ask ANY Question on ANY Subject)
- Ask any conceptual question, viva doubt, derivation, or code pattern across **any CSE subject**:
  - DBMS (Normalization, Transactions, 2PL, B+ Trees)
  - Operating Systems (Virtual Memory, Deadlocks, Bankers Algorithm, Scheduling)
  - Computer Networks (Subnetting, TCP 3-Way Handshake, Routing)
  - DSA & Programming (Dynamic Programming, Graph Algorithms, Stacks, Trees)
  - Machine Learning & Data Mining (Gradient Descent, SVM, Apriori)
  - Aptitude & Reasoning (Time & Work shortcuts, Trains, Permutations)
- **Multi-Source Engine:** Calls live Gemini API if `VITE_GEMINI_API_KEY` is provided, with an intelligent offline CSE knowledge engine answering all queries with structured explanations, diagrams, and formulas.

### 3. ⏱️ Focus Study Timer
- Pomodoro (25m), Deep Work (50m), Power Hour (45m), and open stopwatch.
- Logs study sessions directly to progress reports and study logs.

### 4. 📝 Study Task Planner & Calendar Timetable
- Manage daily and weekly study tasks with priority badges, overdue indicators, and calendar date filter.

### 5. 📖 Study Notes
- Rich notes management with search, subject tagging, and category filters.

### 6. 🏆 Timed Exam Quizzes & MCQs
- Timed practice quizzes across DBMS, OS, Networks, Programming, Aptitude, and Logical Reasoning with instant scoring, timer, and detailed explanations.

### 7. 📊 Progress Reports & Analytics
- Visual tracking of daily study hours, subject syllabus completion rates, and quiz scores.

### 8. 🌌 Obsidian Black & Radiant Violet UI
- Deep dark theme (`#090714`) with glowing violet accents (`#8b5cf6`, `#7c3aed`), responsive across desktop, tablet, and mobile.

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build and run production server
npm run build
npm start
```

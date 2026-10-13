# Student Study Planner & Exam Preparation System

A full-featured study planning, exam preparation, syllabus tracking, and AI tutoring web application built for B.Tech Computer Science & Engineering students.

---

## 🚀 Live App & Deployment on Render

Your app can be deployed on Render as a **Web Service**:
- **Environment / Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node server.js`
- **Health Check Path:** `/health`
- **Environment Variables:**
  - `NODE_ENV=production`
  - `PORT=10000`
  - `VITE_GEMINI_API_KEY` (Optional for live Gemini AI API)

### To Deploy / Update on Render:
1. Push your updated code to your **GitHub** repository.
2. In Render, select your web service and click **Manual Deploy > Deploy latest commit** (or Render auto-deploys if automatic deployments are enabled).
3. If using Docker, Render will detect the included `Dockerfile` and run the multi-stage build automatically.

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

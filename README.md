# Student Study Planner & Exam Preparation System

A full-featured study planning, exam preparation, and campus placement web application for B.Tech CSE students.

---

## 🚀 How to Deploy on Render (To Generate a Live Web Link)

Render supports deploying this repository directly from GitHub with zero configuration. You can use either **Docker (recommended)**, **Node Web Service**, or **Blueprint**.

### Method 1: Deploy with Docker (Recommended - Easiest & Automatic)
1. Push this repository to your **GitHub** account (or use **Push to GitHub** from AI Studio).
2. Go to [Render.com](https://render.com) and log in.
3. Click **New +** > **Web Service**.
4. Select your GitHub repository.
5. Render will automatically detect the **`Dockerfile`**.
6. Set:
   - **Environment:** Docker
   - **Plan:** Free
7. Click **Deploy Web Service**.
8. Render will build and deploy the container and provide your live public URL:  
   👉 `https://student-study-planner.onrender.com`

---

### Method 2: Deploy as a Node.js Web Service on Render
If you choose Node runtime instead of Docker:
1. In Render dashboard, click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the following fields:
   - **Name:** `student-study-planner`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node server.js`
   - **Plan:** Free
4. Click **Deploy Web Service**.

---

### Method 3: One-Click Render Blueprint
This repository includes a `render.yaml` file:
1. In Render, select **New +** > **Blueprint**.
2. Connect this repository.
3. Render reads `render.yaml` and configures the build, start commands, health checks, and port (`10000`) automatically.
4. Click **Apply**.

---

## 💻 How to Run Locally

### Running the Web Application
```bash
# 1. Install dependencies
npm install

# 2. Start local development server (with hot reload)
npm run dev

# 3. Or build and run the production server
npm run build
npm start
```
The application will be live at `http://localhost:5173` (dev) or `http://localhost:10000` (production).

---

## 📱 Features & Modules

1. **Dashboard**
   - Student profile overview: Name, Roll Number, Branch (B.Tech CSE), Semester, and CGPA metrics.
   - Real-time stat cards: Total Subjects, Pending Tasks, Completed Tasks, and Total Study Hours.
   - Today's study schedule with quick-completion toggles.
   - Upcoming exam countdown and alert banners.

2. **Subject Management**
   - Pre-loaded with B.Tech CSE curriculum: DBMS, Operating Systems, Computer Networks, Data Structures & Algorithms, Data Mining, Machine Learning, Quantitative Aptitude, and Logical Reasoning.
   - Categorized by Core CSE, Programming, Aptitude, Reasoning, and English.
   - Full CRUD support with topic progress tracking.

3. **Study Task Planner**
   - Schedule tasks with start time, duration, and priority (High, Medium, Low).
   - Filter by status (`Pending`, `In Progress`, `Completed`) or priority.
   - Visual completion progress meter.

4. **Study Notes & Formulas**
   - Categorized notes: `Important`, `Concept`, `Formula`, and `Interview`.
   - Tagging system (`#dbms`, `#os`, `#gate`).
   - One-click copy note content to clipboard.

5. **Exam Preparation & Quizzes**
   - Timed MCQ tests for DBMS, OS, Networks, Programming, Aptitude, and Reasoning.
   - Interactive question palette, countdown timer, and automatic scoring.
   - Detailed answer explanations after submission.
   - Persistent attempt history and performance trends.

6. **Placement Preparation Hub**
   - Technical interview questions and answers.
   - HR behavioral interview questions using the STAR framework.
   - Coding practice problems (e.g. Two Sum) with code solutions.
   - Company exam patterns for TCS NQT, Amazon SDE, and Infosys.
   - Bookmarking to save questions for revision.

7. **AI Study Assistant**
   - Ask conceptual questions about computer science and algorithms.
   - Request 7-day revision plans for upcoming exams.
   - Built-in intelligent offline knowledge mode.

8. **Progress Reports & Analytics**
   - 7-day study session distribution chart.
   - Subject-wise syllabus completion bars.
   - One-click progress report export.

9. **Settings & Student Profile**
   - Edit personal details and target CGPA.
   - Switch between Light and Dark mode.
   - LocalStorage persistence.

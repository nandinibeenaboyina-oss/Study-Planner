export interface UserProfile {
  name: string;
  email: string;
  rollNumber: string;
  semester: string;
  branch: string;
  targetCgpa: number;
  currentCgpa: number;
  bio: string;
  dailyGoalHours: number;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  youtubeUrl: string;
  notesUrl: string;
  isCompleted: boolean;
}

export interface SyllabusUnit {
  id: string;
  unitNumber: string; // e.g. "Unit 1"
  unitTitle: string;  // e.g. "Foundations & Relational Architecture"
  topics: SyllabusTopic[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  category: 'Core CSE' | 'Programming' | 'Aptitude' | 'Reasoning' | 'English';
  description: string;
  examDate: string; // YYYY-MM-DD
  priority: 'High' | 'Medium' | 'Low';
  totalTopics: number;
  completedTopics: number;
  colorHex: string;
  units: SyllabusUnit[];
}

export interface StudyTask {
  id: string;
  title: string;
  subjectName: string;
  description: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  durationMinutes: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface StudyNote {
  id: string;
  title: string;
  subjectName: string;
  content: string;
  category: 'Important' | 'Concept' | 'Formula' | 'Interview';
  tags: string[];
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  durationSeconds: number;
  completedAt: string;
}

export interface StudyLog {
  date: string;
  minutesStudied: number;
  subjectName: string;
}

export interface ChatMessage {
  id: string;
  isUser: boolean;
  text: string;
  subjectTag?: string;
  timestamp: string;
}

export type ActiveTab = 
  | 'dashboard'
  | 'subjects'
  | 'ai-assistant'
  | 'timer'
  | 'planner'
  | 'notes'
  | 'quizzes'
  | 'reports'
  | 'settings';

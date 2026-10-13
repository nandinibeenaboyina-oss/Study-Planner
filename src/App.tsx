import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Subjects } from './components/Subjects';
import { StudyPlanner } from './components/StudyPlanner';
import { StudyNotes } from './components/StudyNotes';
import { Quizzes } from './components/Quizzes';
import { AiAssistant } from './components/AiAssistant';
import { ProgressReports } from './components/ProgressReports';
import { Settings } from './components/Settings';
import { StudyTimer } from './components/StudyTimer';

import { 
  UserProfile, 
  Subject, 
  StudyTask, 
  StudyNote, 
  QuizQuestion, 
  QuizAttempt, 
  StudyLog, 
  ActiveTab 
} from './types';

import { 
  initialProfile, 
  initialSubjects, 
  initialTasks, 
  initialNotes, 
  initialQuizQuestions, 
  initialStudyLogs 
} from './data/initialData';

export const App: React.FC = () => {
  // Theme state default dark with black & violet
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Persistent States from LocalStorage
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user_profile_v3');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('study_subjects_v3');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    const saved = localStorage.getItem('study_tasks_v3');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [notes, setNotes] = useState<StudyNote[]>(() => {
    const saved = localStorage.getItem('study_notes_v3');
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [quizQuestions] = useState<QuizQuestion[]>(() => {
    const saved = localStorage.getItem('quiz_questions_v3');
    return saved ? JSON.parse(saved) : initialQuizQuestions;
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('quiz_attempts_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [studyLogs, setStudyLogs] = useState<StudyLog[]>(() => {
    const saved = localStorage.getItem('study_logs_v3');
    return saved ? JSON.parse(saved) : initialStudyLogs;
  });

  // Prompt/topic to pre-fill in AI Assistant
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');

  // Save to LocalStorage on changes
  useEffect(() => { localStorage.setItem('user_profile_v3', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('study_subjects_v3', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('study_tasks_v3', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('study_notes_v3', JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem('quiz_attempts_v3', JSON.stringify(quizAttempts)); }, [quizAttempts]);
  useEffect(() => { localStorage.setItem('study_logs_v3', JSON.stringify(studyLogs)); }, [studyLogs]);

  // Navigation states
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Subject Actions
  const handleAddSubject = (newSub: Omit<Subject, 'id'>) => {
    const sub: Subject = { ...newSub, id: `sub-${Date.now()}` };
    setSubjects(prev => [sub, ...prev]);
  };

  const handleEditSubject = (updated: Subject) => {
    setSubjects(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  // Task Actions
  const handleAddTask = (newTask: Omit<StudyTask, 'id'>) => {
    const task: StudyTask = { ...newTask, id: `task-${Date.now()}` };
    setTasks(prev => [task, ...prev]);
  };

  const handleEditTask = (updated: StudyTask) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Pending' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'Pending';
        if (nextStatus === 'Completed') {
          handleLogStudyTime(t.date, t.durationMinutes, t.subjectName);
        }
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Note Actions
  const handleAddNote = (newNote: Omit<StudyNote, 'id' | 'updatedAt'>) => {
    const note: StudyNote = { ...newNote, id: `note-${Date.now()}`, updatedAt: '2026-10-10' };
    setNotes(prev => [note, ...prev]);
  };

  const handleEditNote = (updated: StudyNote) => {
    setNotes(prev => prev.map(n => n.id === updated.id ? updated : n));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // Quiz Attempt Action
  const handleSaveQuizAttempt = (att: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
    const newAttempt: QuizAttempt = {
      ...att,
      id: `att-${Date.now()}`,
      completedAt: new Date().toLocaleDateString()
    };
    setQuizAttempts(prev => [newAttempt, ...prev]);
  };

  // Study Log Action
  const handleLogStudyTime = (date: string, minutes: number, subjectName: string) => {
    const newLog: StudyLog = { date, minutesStudied: minutes, subjectName };
    setStudyLogs(prev => [newLog, ...prev]);
  };

  // Navigation with prefilled AI prompt
  const handleAskAiAboutTopic = (topicTitle: string, subjectName: string) => {
    setAiInitialQuery(`Explain "${topicTitle}" in ${subjectName} with key concepts, exam numerical/diagram points, and concise summary.`);
    setActiveTab('ai-assistant');
  };

  // Reset to Initial Samples
  const handleResetData = () => {
    setProfile(initialProfile);
    setSubjects(initialSubjects);
    setTasks(initialTasks);
    setNotes(initialNotes);
    setStudyLogs(initialStudyLogs);
    setQuizAttempts([]);
    localStorage.clear();
  };

  return (
    <div className="min-h-screen violet-glow-bg bg-[#090714] text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        profile={profile}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          profile={profile}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <Dashboard
              profile={profile}
              subjects={subjects}
              tasks={tasks}
              studyLogs={studyLogs}
              onToggleTask={handleToggleTaskStatus}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'subjects' && (
            <Subjects
              subjects={subjects}
              onAddSubject={handleAddSubject}
              onEditSubject={handleEditSubject}
              onDeleteSubject={handleDeleteSubject}
              onAskAi={handleAskAiAboutTopic}
            />
          )}

          {activeTab === 'timer' && (
            <StudyTimer
              subjects={subjects}
              onLogStudyTime={handleLogStudyTime}
            />
          )}

          {activeTab === 'planner' && (
            <StudyPlanner
              tasks={tasks}
              subjects={subjects}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onToggleStatus={handleToggleTaskStatus}
            />
          )}

          {activeTab === 'notes' && (
            <StudyNotes
              notes={notes}
              subjects={subjects}
              onAddNote={handleAddNote}
              onEditNote={handleEditNote}
              onDeleteNote={handleDeleteNote}
            />
          )}

          {activeTab === 'quizzes' && (
            <Quizzes
              questions={quizQuestions}
              attempts={quizAttempts}
              onSaveAttempt={handleSaveQuizAttempt}
            />
          )}

          {activeTab === 'ai-assistant' && (
            <AiAssistant 
              subjects={subjects} 
              initialQuery={aiInitialQuery}
              onClearInitialQuery={() => setAiInitialQuery('')}
            />
          )}

          {activeTab === 'reports' && (
            <ProgressReports
              profile={profile}
              subjects={subjects}
              tasks={tasks}
              quizAttempts={quizAttempts}
              studyLogs={studyLogs}
              onLogStudyTime={handleLogStudyTime}
            />
          )}

          {activeTab === 'settings' && (
            <Settings
              profile={profile}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onUpdateProfile={setProfile}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;

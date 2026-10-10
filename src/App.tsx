import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Subjects } from './components/Subjects';
import { StudyPlanner } from './components/StudyPlanner';
import { StudyNotes } from './components/StudyNotes';
import { Quizzes } from './components/Quizzes';
import { PlacementPrep } from './components/PlacementPrep';
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
  PlacementResource, 
  StudyLog, 
  ActiveTab 
} from './types';

import { 
  initialProfile, 
  initialSubjects, 
  initialTasks, 
  initialNotes, 
  initialQuizQuestions, 
  initialPlacementResources, 
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
    const saved = localStorage.getItem('user_profile_v2');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('study_subjects_v2');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    const saved = localStorage.getItem('study_tasks_v2');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [notes, setNotes] = useState<StudyNote[]>(() => {
    const saved = localStorage.getItem('study_notes_v2');
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    const saved = localStorage.getItem('quiz_questions_v2');
    return saved ? JSON.parse(saved) : initialQuizQuestions;
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('quiz_attempts_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [placementResources, setPlacementResources] = useState<PlacementResource[]>(() => {
    const saved = localStorage.getItem('placement_resources_v2');
    return saved ? JSON.parse(saved) : initialPlacementResources;
  });

  const [studyLogs, setStudyLogs] = useState<StudyLog[]>(() => {
    const saved = localStorage.getItem('study_logs_v2');
    return saved ? JSON.parse(saved) : initialStudyLogs;
  });

  // Save to LocalStorage on changes
  useEffect(() => { localStorage.setItem('user_profile_v2', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('study_subjects_v2', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('study_tasks_v2', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('study_notes_v2', JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem('quiz_attempts_v2', JSON.stringify(quizAttempts)); }, [quizAttempts]);
  useEffect(() => { localStorage.setItem('placement_resources_v2', JSON.stringify(placementResources)); }, [placementResources]);
  useEffect(() => { localStorage.setItem('study_logs_v2', JSON.stringify(studyLogs)); }, [studyLogs]);

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

  // Placement Bookmark Action
  const handleTogglePlacementBookmark = (id: string) => {
    setPlacementResources(prev => prev.map(r => r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r));
  };

  // Study Log Action
  const handleLogStudyTime = (date: string, minutes: number, subjectName: string) => {
    const newLog: StudyLog = { date, minutesStudied: minutes, subjectName };
    setStudyLogs(prev => [newLog, ...prev]);
  };

  // Reset to Initial Samples
  const handleResetData = () => {
    setProfile(initialProfile);
    setSubjects(initialSubjects);
    setTasks(initialTasks);
    setNotes(initialNotes);
    setPlacementResources(initialPlacementResources);
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

          {activeTab === 'placement' && (
            <PlacementPrep
              resources={placementResources}
              onToggleBookmark={handleTogglePlacementBookmark}
            />
          )}

          {activeTab === 'ai-assistant' && (
            <AiAssistant subjects={subjects} />
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

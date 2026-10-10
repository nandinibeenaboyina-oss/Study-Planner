import React from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Brain,
  Award
} from 'lucide-react';
import { UserProfile, Subject, StudyTask, StudyLog, ActiveTab } from '../types';

interface DashboardProps {
  profile: UserProfile;
  subjects: Subject[];
  tasks: StudyTask[];
  studyLogs: StudyLog[];
  onToggleTask: (taskId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  subjects,
  tasks,
  studyLogs,
  onToggleTask,
  setActiveTab
}) => {
  const pendingTasks = tasks.filter(t => t.status !== 'Completed').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const totalMinutes = studyLogs.reduce((acc, log) => acc + log.minutesStudied, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Today's Date
  const todayStr = '2026-10-10';
  const todaysTasks = tasks.filter(t => t.date === todayStr || t.status === 'In Progress');

  // Upcoming Exams
  const sortedExams = [...subjects].sort((a, b) => a.examDate.localeCompare(b.examDate)).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 md:p-8 text-white shadow-lg shadow-indigo-500/10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> B.Tech CSE Semester 6 Edition
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, {profile.name}! 👋
          </h2>
          <p className="mt-2 text-blue-100 text-sm md:text-base leading-relaxed">
            You have <strong className="text-white underline">{pendingTasks} study tasks</strong> remaining today. Your next major exam is <span className="font-semibold text-amber-300">{sortedExams[0]?.name || 'DBMS'}</span> on {sortedExams[0]?.examDate || 'Nov 15'}.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('planner')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2"
            >
              Open Study Planner <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur transition-colors border border-white/20 flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-cyan-300" /> Ask AI Study Assistant
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Subjects</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{subjects.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Core & Placements</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pending Tasks</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/30">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{pendingTasks}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">To complete today</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Completed Tasks</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{completedTasks}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sessions finished</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Study Hours</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalHours} hrs</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Past 7 days logged</p>
        </div>
      </div>

      {/* 3. Quick Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('quizzes')}
          className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-transparent border border-amber-200 dark:border-amber-900/40 text-left hover:border-amber-400 transition-all group"
        >
          <Award className="w-6 h-6 text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Exam Quizzes</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">MCQs & timed test</p>
        </button>

        <button
          onClick={() => setActiveTab('placement')}
          className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-transparent border border-emerald-200 dark:border-emerald-900/40 text-left hover:border-emerald-400 transition-all group"
        >
          <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Placement Prep</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Technical & HR Qs</p>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-transparent border border-indigo-200 dark:border-indigo-900/40 text-left hover:border-indigo-400 transition-all group"
        >
          <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Study Notes</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Formulas & guides</p>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-transparent border border-blue-200 dark:border-blue-900/40 text-left hover:border-blue-400 transition-all group"
        >
          <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Progress Reports</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Syllabus analytics</p>
        </button>
      </div>

      {/* 4. Two-Column Layout: Today's Tasks & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule (2 cols on large screens) */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Today's Study Schedule</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Click circle to mark completed</p>
            </div>
            <button
              onClick={() => setActiveTab('planner')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View Full Timetable <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {todaysTasks.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No tasks scheduled for today.</p>
            ) : (
              todaysTasks.slice(0, 4).map((task) => {
                const isDone = task.status === 'Completed';
                return (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-70'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                          isDone 
                            ? 'bg-emerald-600 text-white' 
                            : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${
                          isDone ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'
                        }`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {task.subjectName} • {task.startTime} ({task.durationMinutes}m)
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                      task.priority === 'High'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : task.priority === 'Medium'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                        : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Upcoming Examinations Countdown */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Upcoming Exams</h3>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-3">
              {sortedExams.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{sub.code}</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{sub.examDate}</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">{sub.name}</h5>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Syllabus covered:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {Math.round((sub.completedTopics / sub.totalTopics) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{ width: `${(sub.completedTopics / sub.totalTopics) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('subjects')}
            className="w-full mt-4 py-2.5 rounded-xl border border-blue-600/30 text-blue-600 dark:text-blue-400 font-semibold text-xs hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
          >
            Manage All Subjects
          </button>
        </div>
      </div>
    </div>
  );
};

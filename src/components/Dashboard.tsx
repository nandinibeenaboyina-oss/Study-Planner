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
  Award,
  Timer,
  Youtube,
  FileText
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
      {/* 1. Welcome Banner in Black & Glowing Violet */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#170c36] via-[#241352] to-[#140a30] p-6 md:p-8 text-white shadow-xl shadow-purple-950/20 border border-[#3b236e]/60">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-xs font-bold text-violet-300 mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> B.Tech CSE Semester 6 Portal
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Welcome back, {profile.name}! 👋
          </h2>
          <p className="mt-2 text-violet-200 text-sm md:text-base leading-relaxed">
            You have <strong className="text-white underline">{pendingTasks} study tasks</strong> scheduled today. Next exam: <span className="font-bold text-amber-300">{sortedExams[0]?.name || 'DBMS'}</span> on {sortedExams[0]?.examDate || 'Nov 15'}.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('timer')}
              className="px-4 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
            >
              <Timer className="w-4 h-4 text-violet-200" /> Start Study Timer
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className="px-4 py-2.5 rounded-xl bg-[#241747] hover:bg-[#2d1d57] text-white font-semibold text-sm transition-all border border-violet-500/30 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-violet-300" /> Syllabus & YouTube Videos
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur transition-all border border-white/20 flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-cyan-300" /> Ask AI Tutor
            </button>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Key Metrics Row in Dark Violet & Black Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#120d24] border border-[#2a1f4a] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Subjects</span>
            <div className="p-2 rounded-xl bg-violet-950/60 text-violet-400 border border-violet-800/40">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{subjects.length}</p>
          <p className="text-xs text-slate-400 mt-1">With YouTube & Notes</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#120d24] border border-[#2a1f4a] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Tasks</span>
            <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{pendingTasks}</p>
          <p className="text-xs text-slate-400 mt-1">Due today</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#120d24] border border-[#2a1f4a] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed</span>
            <div className="p-2 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{completedTasks}</p>
          <p className="text-xs text-slate-400 mt-1">Tasks finished</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#120d24] border border-[#2a1f4a] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Study Time</span>
            <div className="p-2 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{totalHours} hrs</p>
          <p className="text-xs text-slate-400 mt-1">Logged sessions</p>
        </div>
      </div>

      {/* 3. Quick Feature Cards with Violet Borders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('timer')}
          className="p-4 rounded-2xl bg-[#120d24] border border-[#2a1f4a] text-left hover:border-violet-500 transition-all group shadow-sm"
        >
          <Timer className="w-6 h-6 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-white">Focus Timer</h4>
          <p className="text-xs text-slate-400 mt-0.5">25m Pomodoro & Clock</p>
        </button>

        <button
          onClick={() => setActiveTab('subjects')}
          className="p-4 rounded-2xl bg-[#120d24] border border-[#2a1f4a] text-left hover:border-violet-500 transition-all group shadow-sm"
        >
          <BookOpen className="w-6 h-6 text-red-400 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-white">Syllabus & Videos</h4>
          <p className="text-xs text-slate-400 mt-0.5">YouTube & Google Notes</p>
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className="p-4 rounded-2xl bg-[#120d24] border border-[#2a1f4a] text-left hover:border-violet-500 transition-all group shadow-sm"
        >
          <Award className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-white">Exam Quizzes</h4>
          <p className="text-xs text-slate-400 mt-0.5">Timed MCQ Practice</p>
        </button>

        <button
          onClick={() => setActiveTab('ai-assistant')}
          className="p-4 rounded-2xl bg-[#120d24] border border-[#2a1f4a] text-left hover:border-violet-500 transition-all group shadow-sm"
        >
          <Sparkles className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-white">AI Study Coach</h4>
          <p className="text-xs text-slate-400 mt-0.5">Instant Concept Doubts & Solutions</p>
        </button>
      </div>

      {/* 4. Two-Column Layout: Today's Tasks & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#120d24] border border-[#2a1f4a] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-white">Today's Study Schedule</h3>
              <p className="text-xs text-slate-400">Click checkmark to toggle completed</p>
            </div>
            <button
              onClick={() => setActiveTab('planner')}
              className="text-xs font-bold text-violet-400 hover:underline flex items-center gap-1"
            >
              Open Timetable <ArrowRight className="w-3.5 h-3.5" />
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
                        ? 'bg-[#150f29]/50 border-violet-950/40 opacity-70'
                        : 'bg-[#16102e] border-[#2b1f4c] hover:border-violet-600/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                          isDone 
                            ? 'bg-emerald-600 text-white' 
                            : 'border-2 border-slate-600 hover:border-emerald-500'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${
                          isDone ? 'line-through text-slate-400' : 'text-white'
                        }`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {task.subjectName} • {task.startTime} ({task.durationMinutes}m)
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                      task.priority === 'High'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : task.priority === 'Medium'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Upcoming Examinations */}
        <div className="p-6 rounded-3xl bg-[#120d24] border border-[#2a1f4a] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-white">Upcoming Exams</h3>
              <AlertCircle className="w-4 h-4 text-violet-400" />
            </div>

            <div className="space-y-3">
              {sortedExams.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-2xl bg-[#17102e] border border-[#2c1f4e]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-violet-400">{sub.code}</span>
                    <span className="text-xs font-semibold text-slate-400">{sub.examDate}</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mt-1">{sub.name}</h5>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                    <span>Syllabus covered:</span>
                    <span className="font-bold text-violet-300">
                      {Math.round((sub.completedTopics / (sub.totalTopics || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-[#20153d] h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="bg-violet-500 h-full rounded-full transition-all"
                      style={{ width: `${(sub.completedTopics / (sub.totalTopics || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('subjects')}
            className="w-full mt-4 py-2.5 rounded-xl border border-violet-700/60 text-violet-300 hover:text-white font-bold text-xs hover:bg-violet-950/60 transition-colors"
          >
            Open Syllabus & Topics
          </button>
        </div>
      </div>
    </div>
  );
};

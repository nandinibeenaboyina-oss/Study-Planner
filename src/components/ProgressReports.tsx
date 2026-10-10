import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  Clock, 
  Share2, 
  Plus, 
  Copy, 
  Check
} from 'lucide-react';
import { Subject, StudyTask, QuizAttempt, StudyLog, UserProfile } from '../types';

interface ProgressReportsProps {
  profile: UserProfile;
  subjects: Subject[];
  tasks: StudyTask[];
  quizAttempts: QuizAttempt[];
  studyLogs: StudyLog[];
  onLogStudyTime: (date: string, minutes: number, subjectName: string) => void;
}

export const ProgressReports: React.FC<ProgressReportsProps> = ({
  profile,
  subjects,
  tasks,
  quizAttempts,
  studyLogs,
  onLogStudyTime
}) => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logHours, setLogHours] = useState('2.0');
  const [logSubject, setLogSubject] = useState(subjects[0]?.name || 'DBMS');
  const [copied, setCopied] = useState(false);

  const totalMinutes = studyLogs.reduce((acc, l) => acc + l.minutesStudied, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const totalTasks = tasks.length;
  const taskRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const avgQuizScore = quizAttempts.length > 0 
    ? Math.round(quizAttempts.reduce((acc, a) => acc + a.scorePercentage, 0) / quizAttempts.length)
    : 0;

  const handleCopyReport = () => {
    const report = `🎓 B.Tech CSE Student Progress Report
Name: ${profile.name} (${profile.rollNumber})
Semester: ${profile.semester} | Branch: ${profile.branch}
----------------------------------------
Total Study Time: ${totalHours} Hours
Tasks Completed: ${completedTasks} / ${totalTasks} (${taskRate}%)
Average Quiz Score: ${avgQuizScore}%
Target CGPA: ${profile.targetCgpa} (Current: ${profile.currentCgpa})
----------------------------------------
Subject Syllabus Coverage:
${subjects.map(s => `- ${s.name} (${s.code}): ${Math.round((s.completedTopics / (s.totalTopics || 1)) * 100)}% (Exam: ${s.examDate})`).join('\n')}
`;
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minutes = Math.round(parseFloat(logHours) * 60) || 60;
    const today = '2026-10-10';
    onLogStudyTime(today, minutes, logSubject);
    setIsLogModalOpen(false);
  };

  // Recent 7 Days Logs for visualization
  const recentLogs = [...studyLogs].reverse().slice(0, 7);
  const maxMinutes = Math.max(...recentLogs.map(l => l.minutesStudied), 180);

  return (
    <div className="space-y-6">
      {/* Header & Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            Academic Analytics & Progress Reports
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Study hours logged, subject syllabus completion, and quiz trends
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
          >
            <Plus className="w-4 h-4" /> Log Study Hours
          </button>
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Report Copied!' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* High-Level Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Study Time</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-2">{totalHours} hrs</p>
          <p className="text-xs text-slate-500 mt-1">Logged across all subjects</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tasks Completed</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">{taskRate}%</p>
          <p className="text-xs text-slate-500 mt-1">{completedTasks} of {totalTasks} finished</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Average Quiz Score</span>
          <p className="text-2xl font-black text-amber-500 mt-2">{avgQuizScore}%</p>
          <p className="text-xs text-slate-500 mt-1">{quizAttempts.length} quizzes taken</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Academic Standing</span>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-2">{profile.currentCgpa} CGPA</p>
          <p className="text-xs text-slate-500 mt-1">Target: {profile.targetCgpa} CGPA</p>
        </div>
      </div>

      {/* Daily Study Hours Distribution Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
          Recent Study Session History (Past 7 Days)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Daily hours logged per subject session
        </p>

        <div className="flex items-end justify-between gap-3 h-48 pt-6">
          {recentLogs.map((log, idx) => {
            const heightPercent = Math.max(15, Math.round((log.minutesStudied / maxMinutes) * 100));
            const hoursVal = (log.minutesStudied / 60).toFixed(1);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {hoursVal}h
                </span>
                <div
                  className="w-full max-w-[42px] bg-blue-600 dark:bg-blue-500 rounded-2xl transition-all duration-300 group-hover:bg-blue-700"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {log.date.slice(5)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject-Wise Syllabus Completion */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
          Subject-Wise Syllabus Completion
        </h3>

        <div className="space-y-4">
          {subjects.map((sub) => {
            const pct = Math.round((sub.completedTopics / (sub.totalTopics || 1)) * 100);
            return (
              <div key={sub.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {sub.name} ({sub.code})
                  </span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">
                    {sub.completedTopics} / {sub.totalTopics} topics ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-blue-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Log Hours Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Log Study Session
            </h3>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hours Studied
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="12"
                  required
                  value={logHours}
                  onChange={(e) => setLogHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={logSubject}
                  onChange={(e) => setLogSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

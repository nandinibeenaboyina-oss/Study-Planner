import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Sparkles, CheckCircle2, Flame, Award } from 'lucide-react';
import { Subject } from '../types';

interface StudyTimerProps {
  subjects: Subject[];
  onLogStudyTime: (date: string, minutes: number, subjectName: string) => void;
}

export const StudyTimer: React.FC<StudyTimerProps> = ({
  subjects,
  onLogStudyTime
}) => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || 'Database Management Systems');
  const [mode, setMode] = useState<'pomodoro' | 'deepwork' | 'custom' | 'stopwatch'>('pomodoro');
  
  // Durations in seconds
  const modeDurations = {
    pomodoro: 25 * 60,
    deepwork: 50 * 60,
    custom: 45 * 60,
    stopwatch: 0
  };

  const [timeLeft, setTimeLeft] = useState(modeDurations.pomodoro);
  const [totalDuration, setTotalDuration] = useState(modeDurations.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (mode === 'stopwatch') {
          setTimeLeft(prev => prev + 1);
        } else {
          setTimeLeft(prev => {
            if (prev <= 1) {
              handleTimerComplete();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode, totalDuration]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    setShowCelebration(true);
    const minutesCompleted = Math.round(totalDuration / 60);
    const today = '2026-10-10';
    onLogStudyTime(today, minutesCompleted, selectedSubject);
    setCompletedSessions(prev => prev + 1);
    setTimeout(() => setShowCelebration(false), 5000);
  };

  const switchMode = (newMode: 'pomodoro' | 'deepwork' | 'custom' | 'stopwatch') => {
    setIsRunning(false);
    setMode(newMode);
    const dur = modeDurations[newMode];
    setTotalDuration(dur);
    setTimeLeft(dur);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'stopwatch' ? 0 : totalDuration);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const progressPercent = mode === 'stopwatch' 
    ? 100 
    : Math.round(((totalDuration - timeLeft) / (totalDuration || 1)) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-violet-400" /> Focus Study Timer & Stopwatch
        </h2>
        <p className="text-sm text-slate-400">
          Boost concentration with timed Pomodoro sessions. Hours log automatically to your progress reports.
        </p>
      </div>

      {/* Main Timer Center Card */}
      <div className="p-8 rounded-3xl bg-[#120d24] border border-[#2a1f4a] shadow-xl shadow-purple-950/20 relative overflow-hidden text-center space-y-6">
        {/* Glow ambient circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 relative z-10">
          {[
            { id: 'pomodoro', label: '25m Pomodoro' },
            { id: 'deepwork', label: '50m Deep Work' },
            { id: 'custom', label: '45m Power Hour' },
            { id: 'stopwatch', label: 'Open Stopwatch' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === m.id
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-[#191230] text-slate-400 hover:text-white border border-[#2a1f4a]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Subject Selector */}
        <div className="relative z-10 max-w-sm mx-auto">
          <label className="block text-xs font-bold text-slate-400 mb-1">
            Studying Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#2a1f4a] bg-[#191230] text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 font-medium"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.name}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>

        {/* Big Circular / Glowing Countdown Display */}
        <div className="relative z-10 py-4">
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center rounded-full border-4 border-violet-900/40 bg-[#17102e] shadow-2xl shadow-violet-900/40">
            {/* Circular Progress Stroke (SVG) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                className="text-violet-950/60"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - (mode === 'stopwatch' ? 1 : progressPercent / 100))}
                strokeLinecap="round"
                className="text-violet-500 transition-all duration-500"
                fill="transparent"
              />
            </svg>

            <div className="text-center space-y-1">
              <span className="font-mono text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-md">
                {formatTime(timeLeft)}
              </span>
              <p className="text-xs uppercase tracking-widest font-extrabold text-violet-400">
                {mode === 'stopwatch' ? 'Stopwatch Elapsed' : isRunning ? 'Focus Session Active' : 'Ready'}
              </p>
            </div>
          </div>
        </div>

        {/* Controls: Play / Pause / Reset */}
        <div className="flex items-center justify-center gap-4 relative z-10">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm text-white shadow-lg flex items-center gap-2.5 transition-all transform hover:scale-105 ${
              isRunning 
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30' 
                : 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/40'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause Session' : 'Start Focus Session'}
          </button>

          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl bg-[#191230] border border-[#2a1f4a] text-slate-400 hover:text-white transition-colors"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Celebration Notification */}
        {showCelebration && (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-sm font-bold flex items-center justify-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Session Complete! {Math.round(totalDuration / 60)} minutes logged to {selectedSubject}. 🎉
          </div>
        )}
      </div>

      {/* Focus Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#120d24] border border-[#2a1f4a] flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-violet-900/30 text-violet-400">
            <Flame className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Completed Today</p>
            <p className="text-xl font-black text-white">{completedSessions} Focus Sessions</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#120d24] border border-[#2a1f4a] flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-violet-900/30 text-violet-400">
            <Award className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Subject</p>
            <p className="text-sm font-extrabold text-white truncate max-w-[170px]">{selectedSubject}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#120d24] border border-[#2a1f4a] flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-violet-900/30 text-violet-400">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Study Tip</p>
            <p className="text-xs text-slate-300 font-medium">Take a 5-min water break after every Pomodoro.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

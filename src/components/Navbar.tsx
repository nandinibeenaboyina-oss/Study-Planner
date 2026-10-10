import React from 'react';
import { Sun, Moon, Bell, Menu, GraduationCap, Timer } from 'lucide-react';
import { UserProfile, ActiveTab } from '../types';

interface NavbarProps {
  profile: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  toggleSidebar: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  darkMode,
  setDarkMode,
  toggleSidebar,
  setActiveTab
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0d091a]/95 backdrop-blur-md border-b border-[#241a3d] px-4 lg:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-300 hover:bg-[#1a1233] lg:hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-violet-600/30">
            <GraduationCap className="w-5 h-5 text-violet-100" />
          </div>
          <div>
            <h1 className="text-base font-black text-white leading-tight flex items-center gap-1.5">
              CSE Study Planner
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-violet-900/60 text-violet-300 border border-violet-700/50 hidden sm:inline">
                B.Tech
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Exam Prep, Syllabus & Notes Portal
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Focus Timer Button */}
        <button
          onClick={() => setActiveTab('timer')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-950/80 hover:bg-violet-900/80 border border-violet-700/60 text-violet-300 hover:text-white transition-all text-xs font-bold shadow-sm shadow-violet-900/30"
          title="Open Study Timer"
        >
          <Timer className="w-4 h-4 text-violet-400" />
          <span className="hidden sm:inline">Study Timer</span>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setActiveTab('planner')}
          className="relative p-2 rounded-xl text-slate-300 hover:bg-[#1a1233] transition-colors"
          title="Upcoming Deadlines"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full animate-ping" />
        </button>

        {/* Profile Pill */}
        <button
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#1a1233] transition-colors border border-[#2a1f4a]"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-sm">
            {profile.name.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-slate-200 hidden md:inline">
            {profile.name}
          </span>
        </button>
      </div>
    </header>
  );
};

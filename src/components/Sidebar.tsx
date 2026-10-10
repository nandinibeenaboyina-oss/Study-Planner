import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  FileText, 
  CheckSquare, 
  Briefcase, 
  Sparkles, 
  BarChart3, 
  Settings as SettingsIcon,
  X
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  profile
}) => {
  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects' as ActiveTab, label: 'My Subjects', icon: BookOpen },
    { id: 'planner' as ActiveTab, label: 'Study Planner', icon: CalendarDays },
    { id: 'notes' as ActiveTab, label: 'Study Notes', icon: FileText },
    { id: 'quizzes' as ActiveTab, label: 'Quizzes & MCQs', icon: CheckSquare },
    { id: 'placement' as ActiveTab, label: 'Placement Prep', icon: Briefcase },
    { id: 'ai-assistant' as ActiveTab, label: 'AI Study Coach', icon: Sparkles, badge: 'AI' },
    { id: 'reports' as ActiveTab, label: 'Progress Reports', icon: BarChart3 },
    { id: 'settings' as ActiveTab, label: 'Student Settings', icon: SettingsIcon }
  ];

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[57px] left-0 h-screen lg:h-[calc(100vh-57px)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 lg:z-10 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 lg:hidden">
          <span className="font-bold text-slate-800 dark:text-white">Navigation</span>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Mini Profile Info in Sidebar */}
        <div className="p-4 mx-3 my-2 rounded-2xl bg-blue-50 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/50">
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Student Profile</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{profile.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{profile.rollNumber} • {profile.semester}</p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Quick Status */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-300">Target Goal: {profile.targetCgpa} CGPA</p>
          <p>Current: {profile.currentCgpa} CGPA</p>
        </div>
      </aside>
    </>
  );
};

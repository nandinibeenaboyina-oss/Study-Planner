import React, { useState } from 'react';
import { User, Sun, Moon, RotateCcw, Save, ShieldCheck, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsProps {
  profile: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onResetData: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  profile,
  darkMode,
  setDarkMode,
  onUpdateProfile,
  onResetData
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [rollNumber, setRollNumber] = useState(profile.rollNumber);
  const [semester, setSemester] = useState(profile.semester);
  const [branch, setBranch] = useState(profile.branch);
  const [targetCgpa, setTargetCgpa] = useState(profile.targetCgpa.toString());
  const [currentCgpa, setCurrentCgpa] = useState(profile.currentCgpa.toString());
  const [bio, setBio] = useState(profile.bio);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      email,
      rollNumber,
      semester,
      branch,
      targetCgpa: parseFloat(targetCgpa) || 9.0,
      currentCgpa: parseFloat(currentCgpa) || 8.5,
      bio
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
          Student Profile & App Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your personal details, academic goals, and theme preferences
        </p>
      </div>

      {/* Profile Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{branch} • {semester}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Roll Number / Student ID
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Semester
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={targetCgpa}
                onChange={(e) => setTargetCgpa(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Current CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={currentCgpa}
                onChange={(e) => setCurrentCgpa(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Short Bio / Career Goals
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Changes Saved!' : 'Save Profile Changes'}
          </button>
        </form>
      </div>

      {/* Theme Preference Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Theme Appearance</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Toggle between light and dark modes</p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Reset Data Danger Zone */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Reset Demo Data</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Restore default subjects, notes, and tasks</p>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset all subjects, tasks, and notes to default samples?')) {
              onResetData();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs font-bold"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );
};

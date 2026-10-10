import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  PlayCircle, 
  AlertTriangle, 
  Trash2, 
  Edit3,
  Calendar
} from 'lucide-react';
import { StudyTask, Subject } from '../types';

interface StudyPlannerProps {
  tasks: StudyTask[];
  subjects: Subject[];
  onAddTask: (task: Omit<StudyTask, 'id'>) => void;
  onEditTask: (task: StudyTask) => void;
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  tasks,
  subjects,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleStatus
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<StudyTask | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [subjectName, setSubjectName] = useState(subjects[0]?.name || 'Database Management Systems');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-10-10');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [priority, setPriority] = useState<StudyTask['priority']>('Medium');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                          task.subjectName.toLowerCase().includes(search.toLowerCase()) ||
                          task.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const openAddModal = () => {
    setEditingTask(null);
    setTitle('');
    setSubjectName(subjects[0]?.name || 'Database Management Systems');
    setDescription('');
    setDate('2026-10-10');
    setStartTime('10:00 AM');
    setDurationMinutes(60);
    setPriority('Medium');
    setIsModalOpen(true);
  };

  const openEditModal = (task: StudyTask) => {
    setEditingTask(task);
    setTitle(task.title);
    setSubjectName(task.subjectName);
    setDescription(task.description);
    setDate(task.date);
    setStartTime(task.startTime);
    setDurationMinutes(task.durationMinutes);
    setPriority(task.priority);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      onEditTask({
        ...editingTask,
        title,
        subjectName,
        description,
        date,
        startTime,
        durationMinutes: Number(durationMinutes),
        priority
      });
    } else {
      onAddTask({
        title,
        subjectName,
        description,
        date,
        startTime,
        durationMinutes: Number(durationMinutes),
        priority,
        status: 'Pending'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            Study Task Planner & Timetable
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Organize study sessions, set priorities, and track task completion
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Schedule New Task
        </button>
      </div>

      {/* Progress Bar Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
            Total Task Progress: {completedCount} / {totalTasks} Completed
          </span>
          <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks by topic, subject, keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Task Items List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
            No study tasks found matching the criteria. Click "Schedule New Task" to add one!
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'Completed';
            const isInProgress = task.status === 'In Progress';
            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/60 shadow-sm hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => onToggleStatus(task.id)}
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-amber-500 text-white'
                        : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                    }`}
                    title="Click to toggle status (Pending -> In Progress -> Completed)"
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : isInProgress ? <PlayCircle className="w-4 h-4" /> : null}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className={`text-base font-bold ${
                        isDone ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'
                      }`}>
                        {task.title}
                      </h4>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        task.status === 'Completed'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                          : task.status === 'In Progress'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {task.status}
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        task.priority === 'High'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : task.priority === 'Medium'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                          : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                      {task.subjectName} • {task.date} at {task.startTime} ({task.durationMinutes} mins)
                    </p>

                    {task.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 self-end sm:self-center">
                  <button
                    onClick={() => openEditModal(task)}
                    className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="Edit task"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {editingTask ? 'Edit Study Task' : 'Schedule New Study Task'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Practice B+ Tree Insertion"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="e.g. 10:00 AM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as StudyTask['priority'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Task Description / Sub-topics
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Specific chapter problems, reference links, textbook pages..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  {editingTask ? 'Save Changes' : 'Schedule Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

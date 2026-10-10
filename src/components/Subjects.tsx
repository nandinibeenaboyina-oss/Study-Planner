import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  BookOpen, 
  Youtube, 
  ExternalLink, 
  CheckCircle2, 
  Circle,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Subject, SyllabusTopic } from '../types';

interface SubjectsProps {
  subjects: Subject[];
  onAddSubject: (subject: Omit<Subject, 'id'>) => void;
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (id: string) => void;
}

export const Subjects: React.FC<SubjectsProps> = ({
  subjects,
  onAddSubject,
  onEditSubject,
  onDeleteSubject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(subjects[0]?.id || null);

  // New Topic Form modal/state inside expanded subject
  const [addingTopicSubjectId, setAddingTopicSubjectId] = useState<string | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicUnit, setNewTopicUnit] = useState('Unit 1');
  const [newTopicYoutube, setNewTopicYoutube] = useState('');
  const [newTopicNotes, setNewTopicNotes] = useState('');

  // Form states for subject
  const [name, setName] = useState('');
  const [code, setCode] = useState('CS');
  const [category, setCategory] = useState<Subject['category']>('Core CSE');
  const [description, setDescription] = useState('');
  const [examDate, setExamDate] = useState('2026-11-20');
  const [priority, setPriority] = useState<Subject['priority']>('High');

  const categories = ['All', 'Core CSE', 'Programming', 'Aptitude', 'Reasoning', 'English'];

  const filteredSubjects = selectedCategory === 'All' 
    ? subjects 
    : subjects.filter(s => s.category === selectedCategory);

  const openAddModal = () => {
    setEditingSubject(null);
    setName('');
    setCode('CS305');
    setCategory('Core CSE');
    setDescription('');
    setExamDate('2026-11-20');
    setPriority('High');
    setIsModalOpen(true);
  };

  const openEditModal = (sub: Subject) => {
    setEditingSubject(sub);
    setName(sub.name);
    setCode(sub.code);
    setCategory(sub.category);
    setDescription(sub.description);
    setExamDate(sub.examDate);
    setPriority(sub.priority);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingSubject) {
      onEditSubject({
        ...editingSubject,
        name,
        code,
        category,
        description,
        examDate,
        priority
      });
    } else {
      onAddSubject({
        name,
        code,
        category,
        description,
        examDate,
        priority,
        totalTopics: 5,
        completedTopics: 0,
        colorHex: '#8b5cf6',
        syllabusTopics: [
          {
            id: `top-${Date.now()}-1`,
            title: 'Foundations & Core Principles',
            unit: 'Unit 1',
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' tutorial')}`,
            notesUrl: `https://www.google.com/search?q=${encodeURIComponent(name + ' notes pdf geeksforgeeks')}`,
            isCompleted: false
          }
        ]
      });
    }
    setIsModalOpen(false);
  };

  const toggleTopicCompletion = (subject: Subject, topicId: string) => {
    const updatedTopics = (subject.syllabusTopics || []).map(t => {
      if (t.id === topicId) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });

    const completed = updatedTopics.filter(t => t.isCompleted).length;
    onEditSubject({
      ...subject,
      syllabusTopics: updatedTopics,
      completedTopics: completed,
      totalTopics: updatedTopics.length
    });
  };

  const handleAddSyllabusTopic = (subject: Subject) => {
    if (!newTopicTitle.trim()) return;
    const newTopic: SyllabusTopic = {
      id: `top-${Date.now()}`,
      title: newTopicTitle.trim(),
      unit: newTopicUnit.trim() || 'Unit 1',
      youtubeUrl: newTopicYoutube.trim() || `https://www.youtube.com/results?search_query=${encodeURIComponent(newTopicTitle + ' ' + subject.name)}`,
      notesUrl: newTopicNotes.trim() || `https://www.google.com/search?q=${encodeURIComponent(newTopicTitle + ' notes geeksforgeeks')}`,
      isCompleted: false
    };

    const currentTopics = subject.syllabusTopics || [];
    const updatedTopics = [...currentTopics, newTopic];
    onEditSubject({
      ...subject,
      syllabusTopics: updatedTopics,
      totalTopics: updatedTopics.length
    });

    setAddingTopicSubjectId(null);
    setNewTopicTitle('');
    setNewTopicYoutube('');
    setNewTopicNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-violet-400" /> B.Tech Syllabus, YouTube & Notes Directory
          </h2>
          <p className="text-sm text-slate-400">
            Click on any topic to directly open the matching YouTube lecture or Google study notes!
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'bg-[#120d24] text-slate-400 border border-[#2a1f4a] hover:text-white hover:border-violet-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subject Cards with Expandable Syllabus */}
      <div className="space-y-4">
        {filteredSubjects.map((sub) => {
          const isExpanded = expandedSubjectId === sub.id;
          const topics = sub.syllabusTopics || [];
          const progressPct = topics.length > 0 
            ? Math.round((topics.filter(t => t.isCompleted).length / topics.length) * 100)
            : 0;

          return (
            <div
              key={sub.id}
              className="rounded-3xl bg-[#120d24] border border-[#2a1f4a] shadow-lg overflow-hidden transition-all"
            >
              {/* Subject Summary Header */}
              <div 
                onClick={() => setExpandedSubjectId(isExpanded ? null : sub.id)}
                className="p-6 cursor-pointer hover:bg-[#181130] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-violet-900/40 text-violet-300 border border-violet-700/50">
                      {sub.code} • {sub.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      sub.priority === 'High' ? 'bg-red-950 text-red-400 border border-red-800' :
                      sub.priority === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {sub.priority} Priority
                    </span>
                    <span className="text-xs text-slate-400 ml-auto md:ml-0 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" /> Exam: {sub.examDate}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-white">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {sub.description}
                  </p>
                </div>

                {/* Progress bar & Toggle */}
                <div className="flex items-center gap-4">
                  <div className="w-40 md:w-48 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Syllabus:</span>
                      <span className="text-violet-400 font-extrabold">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-[#1e153a] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-violet-500 h-full rounded-full transition-all duration-300 shadow-sm shadow-violet-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(sub);
                      }}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-violet-900/30"
                      title="Edit subject"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSubject(sub.id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-950/40"
                      title="Delete subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-violet-400 hover:text-white rounded-lg"
                      title="Toggle syllabus"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible Syllabus with YouTube and Google Notes links */}
              {isExpanded && (
                <div className="border-t border-[#2a1f4a] p-6 bg-[#0e091e] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-violet-300 uppercase tracking-wider flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Topics Syllabus & Direct Resource Links
                      </h4>
                      <p className="text-xs text-slate-400">
                        Tap video for YouTube lecture, tap notes for Google study guides
                      </p>
                    </div>

                    <button
                      onClick={() => setAddingTopicSubjectId(sub.id)}
                      className="px-3 py-1.5 rounded-xl bg-violet-950 hover:bg-violet-900 border border-violet-700/60 text-violet-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Topic
                    </button>
                  </div>

                  {/* Syllabus Topics List */}
                  <div className="space-y-2.5">
                    {topics.length === 0 ? (
                      <p className="text-xs text-slate-500 py-3 text-center">No syllabus topics added yet.</p>
                    ) : (
                      topics.map((topic) => (
                        <div
                          key={topic.id}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            topic.isCompleted
                              ? 'bg-[#150f29]/60 border-violet-950/60 opacity-80'
                              : 'bg-[#16102e] border-[#2d224e] hover:border-violet-600/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleTopicCompletion(sub, topic.id)}
                              className="text-violet-400 hover:text-violet-300 transition-colors"
                              title={topic.isCompleted ? 'Mark Pending' : 'Mark Completed'}
                            >
                              {topic.isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-500" />
                              )}
                            </button>

                            <div>
                              <p className={`text-sm font-bold ${
                                topic.isCompleted ? 'line-through text-slate-400' : 'text-white'
                              }`}>
                                {topic.title}
                              </p>
                              {topic.unit && (
                                <span className="text-[10px] font-semibold text-violet-400">
                                  {topic.unit}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick Link Buttons: YouTube & Google Notes */}
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {/* YouTube Video Link */}
                            <a
                              href={topic.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/40 border border-red-500/40 text-red-300 hover:text-red-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                              title="Watch YouTube video tutorial"
                            >
                              <Youtube className="w-4 h-4 text-red-400" />
                              <span>YouTube Video</span>
                              <ExternalLink className="w-3 h-3 text-red-400" />
                            </a>

                            {/* Google Notes Link */}
                            <a
                              href={topic.notesUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                              title="Open Google search notes & documentation"
                            >
                              <FileText className="w-4 h-4 text-violet-400" />
                              <span>Google Notes</span>
                              <ExternalLink className="w-3 h-3 text-violet-400" />
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Topic Inline Sub-Form */}
                  {addingTopicSubjectId === sub.id && (
                    <div className="p-4 rounded-2xl bg-[#191136] border border-violet-700/60 space-y-3 mt-4">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                        Add New Topic to {sub.name}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          value={newTopicTitle}
                          onChange={(e) => setNewTopicTitle(e.target.value)}
                          placeholder="Topic Title (e.g. B+ Tree Deletion)"
                          className="px-3 py-2 rounded-xl border border-[#2a1f4a] bg-[#120d24] text-xs text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                        />
                        <input
                          type="text"
                          value={newTopicUnit}
                          onChange={(e) => setNewTopicUnit(e.target.value)}
                          placeholder="Unit (e.g. Unit 3)"
                          className="px-3 py-2 rounded-xl border border-[#2a1f4a] bg-[#120d24] text-xs text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="url"
                          value={newTopicYoutube}
                          onChange={(e) => setNewTopicYoutube(e.target.value)}
                          placeholder="Custom YouTube URL (leave empty for auto search)"
                          className="px-3 py-2 rounded-xl border border-[#2a1f4a] bg-[#120d24] text-xs text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                        />
                        <input
                          type="url"
                          value={newTopicNotes}
                          onChange={(e) => setNewTopicNotes(e.target.value)}
                          placeholder="Custom Notes URL (leave empty for auto search)"
                          className="px-3 py-2 rounded-xl border border-[#2a1f4a] bg-[#120d24] text-xs text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setAddingTopicSubjectId(null)}
                          className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSyllabusTopic(sub)}
                          className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold"
                        >
                          Save Topic
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#120d24] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#2a1f4a] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingSubject ? 'Edit Subject' : 'Add New Subject'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Distributed Database Systems"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a1f4a] bg-[#191230] text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. CS401"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a1f4a] bg-[#191230] text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Subject['category'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a1f4a] bg-[#191230] text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="Core CSE">Core CSE</option>
                    <option value="Programming">Programming</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Exam Date (YYYY-MM-DD)
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a1f4a] bg-[#191230] text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Subject['priority'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a1f4a] bg-[#191230] text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Syllabus Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of syllabus units and key topics..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#2a1f4a] bg-[#191230] text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/30"
                >
                  {editingSubject ? 'Update Subject' : 'Add Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

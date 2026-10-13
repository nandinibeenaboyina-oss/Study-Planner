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
  ChevronUp,
  ArrowLeft,
  Search,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { Subject, SyllabusUnit, SyllabusTopic } from '../types';

interface SubjectsProps {
  subjects: Subject[];
  onAddSubject: (subject: Omit<Subject, 'id'>) => void;
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (id: string) => void;
  onAskAi?: (topicTitle: string, subjectName: string) => void;
}

export const Subjects: React.FC<SubjectsProps> = ({
  subjects,
  onAddSubject,
  onEditSubject,
  onDeleteSubject,
  onAskAi
}) => {
  // Navigation / Drill-down state
  // null = showing all subjects; string = viewing specific subject's syllabus
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  
  // Expanded units within the selected subject (array of unit IDs)
  const [expandedUnitIds, setExpandedUnitIds] = useState<string[]>([]);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  // Add Unit Modal
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [newUnitNumber, setNewUnitNumber] = useState('Unit 1');
  const [newUnitTitle, setNewUnitTitle] = useState('');

  // Add Topic Modal
  const [addingTopicUnitId, setAddingTopicUnitId] = useState<string | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicYoutube, setNewTopicYoutube] = useState('');
  const [newTopicNotes, setNewTopicNotes] = useState('');

  // Subject Form States
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('CS301');
  const [formCategory, setFormCategory] = useState<Subject['category']>('Core CSE');
  const [formDescription, setFormDescription] = useState('');
  const [formExamDate, setFormExamDate] = useState('2026-11-20');
  const [formPriority, setFormPriority] = useState<Subject['priority']>('High');

  const categories = ['All', 'Core CSE', 'Programming', 'Aptitude', 'Reasoning', 'English'];

  // Current active subject if drilled down
  const activeSubject = subjects.find(s => s.id === selectedSubjectId);

  // Filtered subjects list
  const filteredSubjects = subjects.filter(sub => {
    const matchesCat = selectedCategory === 'All' || sub.category === selectedCategory;
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // When opening a subject, expand its first unit by default
  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    const sub = subjects.find(s => s.id === subjectId);
    if (sub && sub.units && sub.units.length > 0) {
      setExpandedUnitIds([sub.units[0].id]);
    } else {
      setExpandedUnitIds([]);
    }
  };

  const toggleUnitExpand = (unitId: string) => {
    setExpandedUnitIds(prev => 
      prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
    );
  };

  const openAddSubjectModal = () => {
    setEditingSubject(null);
    setFormName('');
    setFormCode('CS305');
    setFormCategory('Core CSE');
    setFormDescription('');
    setFormExamDate('2026-11-25');
    setFormPriority('High');
    setIsSubjectModalOpen(true);
  };

  const openEditSubjectModal = (sub: Subject) => {
    setEditingSubject(sub);
    setFormName(sub.name);
    setFormCode(sub.code);
    setFormCategory(sub.category);
    setFormDescription(sub.description);
    setFormExamDate(sub.examDate);
    setFormPriority(sub.priority);
    setIsSubjectModalOpen(true);
  };

  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingSubject) {
      onEditSubject({
        ...editingSubject,
        name: formName.trim(),
        code: formCode.trim(),
        category: formCategory,
        description: formDescription.trim(),
        examDate: formExamDate,
        priority: formPriority
      });
    } else {
      // Create new subject with starter unit and topic
      const defaultUnitId = `u-${Date.now()}`;
      const defaultTopicId = `top-${Date.now()}`;
      const newSubject: Omit<Subject, 'id'> = {
        name: formName.trim(),
        code: formCode.trim(),
        category: formCategory,
        description: formDescription.trim(),
        examDate: formExamDate,
        priority: formPriority,
        totalTopics: 1,
        completedTopics: 0,
        colorHex: '#8b5cf6',
        units: [
          {
            id: defaultUnitId,
            unitNumber: 'Unit 1',
            unitTitle: 'Foundations & Overview',
            topics: [
              {
                id: defaultTopicId,
                title: `${formName} Core Concepts`,
                youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(formName + ' tutorial gate smashers')}`,
                notesUrl: `https://www.google.com/search?q=${encodeURIComponent(formName + ' notes pdf geeksforgeeks')}`,
                isCompleted: false
              }
            ]
          }
        ]
      };
      onAddSubject(newSubject);
    }
    setIsSubjectModalOpen(false);
  };

  // Toggle completion of a topic
  const handleToggleTopic = (topicId: string) => {
    if (!activeSubject) return;

    const updatedUnits = activeSubject.units.map(unit => ({
      ...unit,
      topics: unit.topics.map(t => t.id === topicId ? { ...t, isCompleted: !t.isCompleted } : t)
    }));

    const total = updatedUnits.reduce((acc, u) => acc + u.topics.length, 0);
    const completed = updatedUnits.reduce((acc, u) => acc + u.topics.filter(t => t.isCompleted).length, 0);

    onEditSubject({
      ...activeSubject,
      units: updatedUnits,
      totalTopics: total,
      completedTopics: completed
    });
  };

  // Add new Unit to active subject
  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubject || !newUnitTitle.trim()) return;

    const newUnit: SyllabusUnit = {
      id: `u-${Date.now()}`,
      unitNumber: newUnitNumber.trim() || `Unit ${activeSubject.units.length + 1}`,
      unitTitle: newUnitTitle.trim(),
      topics: []
    };

    const updatedUnits = [...activeSubject.units, newUnit];
    onEditSubject({
      ...activeSubject,
      units: updatedUnits
    });

    setExpandedUnitIds(prev => [...prev, newUnit.id]);
    setNewUnitTitle('');
    setIsAddUnitModalOpen(false);
  };

  // Add new Topic to a specific unit
  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubject || !addingTopicUnitId || !newTopicTitle.trim()) return;

    const newTopic: SyllabusTopic = {
      id: `top-${Date.now()}`,
      title: newTopicTitle.trim(),
      youtubeUrl: newTopicYoutube.trim() || `https://www.youtube.com/results?search_query=${encodeURIComponent(newTopicTitle.trim() + ' ' + activeSubject.name)}`,
      notesUrl: newTopicNotes.trim() || `https://www.google.com/search?q=${encodeURIComponent(newTopicTitle.trim() + ' notes geeksforgeeks')}`,
      isCompleted: false
    };

    const updatedUnits = activeSubject.units.map(unit => {
      if (unit.id === addingTopicUnitId) {
        return {
          ...unit,
          topics: [...unit.topics, newTopic]
        };
      }
      return unit;
    });

    const total = updatedUnits.reduce((acc, u) => acc + u.topics.length, 0);
    const completed = updatedUnits.reduce((acc, u) => acc + u.topics.filter(t => t.isCompleted).length, 0);

    onEditSubject({
      ...activeSubject,
      units: updatedUnits,
      totalTopics: total,
      completedTopics: completed
    });

    setNewTopicTitle('');
    setNewTopicYoutube('');
    setNewTopicNotes('');
    setAddingTopicUnitId(null);
  };

  // Delete a topic
  const handleDeleteTopic = (unitId: string, topicId: string) => {
    if (!activeSubject) return;

    const updatedUnits = activeSubject.units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          topics: unit.topics.filter(t => t.id !== topicId)
        };
      }
      return unit;
    });

    const total = updatedUnits.reduce((acc, u) => acc + u.topics.length, 0);
    const completed = updatedUnits.reduce((acc, u) => acc + u.topics.filter(t => t.isCompleted).length, 0);

    onEditSubject({
      ...activeSubject,
      units: updatedUnits,
      totalTopics: total,
      completedTopics: completed
    });
  };

  // ==========================================================
  // VIEW 2: SUBJECT SYLLABUS & TOPICS VIEW (After Clicking Subject)
  // ==========================================================
  if (activeSubject) {
    const progressPercent = activeSubject.totalTopics > 0 
      ? Math.round((activeSubject.completedTopics / activeSubject.totalTopics) * 100) 
      : 0;

    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setSelectedSubjectId(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#17102e] hover:bg-violet-900/40 border border-violet-800/40 text-violet-300 hover:text-white transition-all text-sm font-semibold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to All Subjects</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openEditSubjectModal(activeSubject)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1a1235] hover:bg-[#25194d] border border-violet-900/40 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Subject</span>
            </button>
            <button
              onClick={() => {
                setNewUnitNumber(`Unit ${activeSubject.units.length + 1}`);
                setNewUnitTitle('');
                setIsAddUnitModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Syllabus Unit</span>
            </button>
          </div>
        </div>

        {/* Subject Header Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#160f2e] via-[#120b24] to-[#0d081b] border border-violet-800/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-violet-950 text-violet-300 border border-violet-800/60 uppercase tracking-wider">
                  {activeSubject.code}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#20153d] text-slate-300 border border-violet-900/40">
                  {activeSubject.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  activeSubject.priority === 'High' ? 'bg-red-950/80 text-red-300 border border-red-800/60' :
                  activeSubject.priority === 'Medium' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60' :
                  'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                }`}>
                  {activeSubject.priority} Priority
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {activeSubject.name}
              </h1>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {activeSubject.description}
              </p>

              <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span>Exam Date: <strong className="text-slate-200">{activeSubject.examDate}</strong></span>
              </div>
            </div>

            {/* Progress Gauge */}
            <div className="bg-[#1b1238] border border-violet-800/50 rounded-2xl p-5 min-w-[220px] text-center shadow-md">
              <p className="text-xs font-bold text-violet-300 uppercase tracking-wider">Syllabus Completion</p>
              <div className="text-3xl font-black text-white mt-1">
                {progressPercent}%
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {activeSubject.completedTopics} of {activeSubject.totalTopics} Topics Completed
              </p>
              <div className="w-full bg-[#0d081b] rounded-full h-2.5 mt-3 overflow-hidden border border-violet-900/40">
                <div 
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus Section Guide */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-violet-400" />
              <span>Syllabus Breakdown ({activeSubject.units.length} Units)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click on each unit below to expand and access direct YouTube tutorials and Google notes for each topic.
            </p>
          </div>
        </div>

        {/* Units & Topics Accordion List */}
        <div className="space-y-4">
          {activeSubject.units.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-[#120d24] border border-[#241a3d] p-6">
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-base font-semibold text-slate-300">No syllabus units added yet</p>
              <p className="text-xs text-slate-400 mt-1">Add your first unit to organize syllabus topics with YouTube and Google notes links.</p>
              <button
                onClick={() => {
                  setNewUnitNumber('Unit 1');
                  setNewUnitTitle('');
                  setIsAddUnitModalOpen(true);
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md transition-all inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add First Unit</span>
              </button>
            </div>
          ) : (
            activeSubject.units.map((unit) => {
              const isExpanded = expandedUnitIds.includes(unit.id);
              const unitTotal = unit.topics.length;
              const unitCompleted = unit.topics.filter(t => t.isCompleted).length;
              const unitPercent = unitTotal > 0 ? Math.round((unitCompleted / unitTotal) * 100) : 0;

              return (
                <div 
                  key={unit.id}
                  className="rounded-2xl bg-[#120d24] border border-[#271d42] hover:border-violet-700/60 transition-all shadow-md overflow-hidden"
                >
                  {/* Clickable Unit Header (Click on Syllabus Unit) */}
                  <div
                    onClick={() => toggleUnitExpand(unit.id)}
                    className="p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-[#181130] transition-colors select-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-violet-950 text-violet-300 border border-violet-800/60">
                        {unit.unitNumber}
                      </span>
                      <div>
                        <h3 className="font-bold text-base text-white hover:text-violet-300 transition-colors">
                          {unit.unitTitle}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {unitCompleted}/{unitTotal} topics completed • {unitPercent}% done
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-violet-400 hidden sm:inline-block font-medium">
                        {isExpanded ? 'Hide topics' : 'Click to view topics & links'}
                      </span>
                      <div className="p-1.5 rounded-lg bg-[#1f153a] text-slate-300">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Related Topics List */}
                  {isExpanded && (
                    <div className="p-4 md:p-5 pt-0 border-t border-[#22183c] bg-[#0c0818]/60 space-y-3">
                      <div className="flex items-center justify-between pt-3 pb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Topics in {unit.unitNumber}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAddingTopicUnitId(unit.id);
                            setNewTopicTitle('');
                            setNewTopicYoutube('');
                            setNewTopicNotes('');
                          }}
                          className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Topic</span>
                        </button>
                      </div>

                      {unit.topics.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs">
                          No topics added for this unit yet. Click "+ Add Topic" above.
                        </div>
                      ) : (
                        unit.topics.map((topic) => (
                          <div 
                            key={topic.id}
                            className={`p-3.5 md:p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                              topic.isCompleted 
                                ? 'bg-[#151d29]/60 border-emerald-900/50 text-slate-300' 
                                : 'bg-[#150f29] border-[#291e45] text-white hover:border-violet-700/60'
                            }`}
                          >
                            {/* Checkbox & Title */}
                            <div className="flex items-start gap-3 flex-1">
                              <button
                                onClick={() => handleToggleTopic(topic.id)}
                                className="mt-0.5 text-violet-400 hover:text-violet-300 transition-colors"
                                title={topic.isCompleted ? 'Mark Pending' : 'Mark Completed'}
                              >
                                {topic.isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-400 hover:text-violet-400" />
                                )}
                              </button>
                              <div>
                                <span className={`text-sm font-semibold ${topic.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                                  {topic.title}
                                </span>
                                {topic.isCompleted && (
                                  <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                                    Done
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Direct YouTube Video & Google Notes Links */}
                            <div className="flex flex-wrap items-center gap-2 pl-8 md:pl-0">
                              {/* YouTube Video Link */}
                              <a
                                href={topic.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/80 border border-red-800/60 text-red-300 hover:text-white text-xs font-semibold transition-all group shadow-sm"
                                title="Watch related video tutorial on YouTube"
                              >
                                <Youtube className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                                <span>YouTube Video</span>
                                <ExternalLink className="w-3 h-3 text-red-400/80" />
                              </a>

                              {/* Google Notes Link */}
                              <a
                                href={topic.notesUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/70 hover:bg-blue-900/80 border border-blue-800/60 text-blue-300 hover:text-white text-xs font-semibold transition-all group shadow-sm"
                                title="Open Google notes, PDFs & GeeksforGeeks"
                              >
                                <FileText className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                                <span>Google Notes</span>
                                <ExternalLink className="w-3 h-3 text-blue-400/80" />
                              </a>

                              {/* Ask AI Coach Shortcut */}
                              {onAskAi && (
                                <button
                                  onClick={() => onAskAi(topic.title, activeSubject.name)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-950/80 hover:bg-violet-900 border border-violet-800/60 text-violet-300 hover:text-white text-xs font-semibold transition-all group shadow-sm"
                                  title="Ask AI Study Coach to explain this topic"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                                  <span>Ask AI Coach</span>
                                </button>
                              )}

                              {/* Delete topic button */}
                              <button
                                onClick={() => handleDeleteTopic(unit.id, topic.id)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors ml-1"
                                title="Delete Topic"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal: Add Topic to Unit */}
        {addingTopicUnitId && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#150f29] border border-violet-800/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-scaleUp">
              <h3 className="text-lg font-bold text-white mb-1">Add Topic to Syllabus</h3>
              <p className="text-xs text-slate-400 mb-4">
                Include direct YouTube video and Google notes link so you can study with 1-click.
              </p>

              <form onSubmit={handleAddTopic} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Topic Title *</label>
                  <input
                    type="text"
                    required
                    value={newTopicTitle}
                    onChange={e => setNewTopicTitle(e.target.value)}
                    placeholder="e.g. B+ Tree Insertion & Deletion"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">YouTube Video Link (Optional)</label>
                  <input
                    type="url"
                    value={newTopicYoutube}
                    onChange={e => setNewTopicYoutube(e.target.value)}
                    placeholder="https://www.youtube.com/... (auto-generated if empty)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Google Notes / PDF Link (Optional)</label>
                  <input
                    type="url"
                    value={newTopicNotes}
                    onChange={e => setNewTopicNotes(e.target.value)}
                    placeholder="https://www.google.com/... (auto-generated if empty)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setAddingTopicUnitId(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md"
                  >
                    Save Topic
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Syllabus Unit */}
        {isAddUnitModalOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#150f29] border border-violet-800/60 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-scaleUp">
              <h3 className="text-lg font-bold text-white mb-1">Add New Syllabus Unit</h3>
              <p className="text-xs text-slate-400 mb-4">
                Define a unit or module in the syllabus for {activeSubject.name}.
              </p>

              <form onSubmit={handleAddUnit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Unit Number</label>
                  <input
                    type="text"
                    required
                    value={newUnitNumber}
                    onChange={e => setNewUnitNumber(e.target.value)}
                    placeholder="e.g. Unit 3 or Module C"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Unit Title</label>
                  <input
                    type="text"
                    required
                    value={newUnitTitle}
                    onChange={e => setNewUnitTitle(e.target.value)}
                    placeholder="e.g. Normalization & Schema Refinement"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddUnitModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md"
                  >
                    Create Unit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================
  // VIEW 1: ALL SUBJECTS GRID (Step 1: First click on Subject)
  // ==========================================================
  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-8 h-8 text-violet-400" />
            <span>Syllabus & Subjects Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Click on any subject to explore its full syllabus, video tutorials on YouTube, and Google notes!
          </p>
        </div>

        <button
          onClick={openAddSubjectModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Subject</span>
        </button>
      </div>

      {/* Filter by Category & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-[#150f26] text-slate-400 hover:text-white hover:bg-[#1f153a] border border-violet-900/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects or codes..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#140e26] border border-[#261b42] text-white text-xs focus:border-violet-500 outline-none"
          />
        </div>
      </div>

      {/* Subjects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => {
          const progressPercent = subject.totalTopics > 0 
            ? Math.round((subject.completedTopics / subject.totalTopics) * 100) 
            : 0;
          const unitCount = subject.units ? subject.units.length : 0;

          return (
            <div
              key={subject.id}
              onClick={() => handleSelectSubject(subject.id)}
              className="p-6 rounded-3xl bg-[#120d24] border border-[#271d42] hover:border-violet-600/80 transition-all duration-200 cursor-pointer group shadow-lg hover:shadow-violet-600/10 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500" 
              />

              <div>
                {/* Header: Code & Priority */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-[#1d143a] text-violet-300 border border-violet-800/50">
                      {subject.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {subject.category}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    subject.priority === 'High' ? 'bg-red-950/80 text-red-300 border border-red-800/50' :
                    subject.priority === 'Medium' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/50' :
                    'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                  }`}>
                    {subject.priority}
                  </span>
                </div>

                {/* Subject Title */}
                <h3 className="text-lg font-black text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                  {subject.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>

                {/* Units & Topics badges */}
                <div className="flex items-center gap-3 mt-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-medium bg-[#1a1233] px-2.5 py-1 rounded-lg border border-violet-900/30">
                    <Layers className="w-3.5 h-3.5 text-violet-400" />
                    {unitCount} Syllabus Units
                  </span>
                  <span className="font-medium bg-[#1a1233] px-2.5 py-1 rounded-lg border border-violet-900/30">
                    {subject.totalTopics} Topics
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">Progress</span>
                    <span className="text-violet-300 font-bold">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#0a0714] rounded-full h-2 overflow-hidden border border-violet-900/30">
                    <div
                      className="bg-gradient-to-r from-violet-600 to-fuchsia-500 h-2 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-[#201738] flex items-center justify-between">
                <span className="text-xs font-bold text-violet-400 group-hover:text-violet-300 flex items-center gap-1">
                  <span>View Syllabus & Links</span>
                  <span>→</span>
                </span>

                <div 
                  className="flex items-center gap-1"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => openEditSubjectModal(subject)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e153b] transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteSubject(subject.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add or Edit Subject */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#150f29] border border-violet-800/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-scaleUp">
            <h3 className="text-lg font-bold text-white mb-1">
              {editingSubject ? 'Edit Subject' : 'Add New Subject'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter subject details for B.Tech CSE examination & syllabus planning.
            </p>

            <form onSubmit={handleSaveSubject} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Subject Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. Distributed Systems"
                    className="w-full px-3 py-2 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-xs focus:border-violet-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Course Code</label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    placeholder="e.g. CS401"
                    className="w-full px-3 py-2 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-xs focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as Subject['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-xs focus:border-violet-500 outline-none"
                  >
                    <option value="Core CSE">Core CSE</option>
                    <option value="Programming">Programming</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={e => setFormPriority(e.target.value as Subject['priority'])}
                    className="w-full px-3 py-2 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-xs focus:border-violet-500 outline-none"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Exam Date</label>
                <input
                  type="date"
                  value={formExamDate}
                  onChange={e => setFormExamDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-xs focus:border-violet-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description / Key Topics</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Summary of syllabus and main examination focus..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0e0a1a] border border-[#2b1f4c] text-white text-xs focus:border-violet-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsSubjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md"
                >
                  {editingSubject ? 'Save Changes' : 'Create Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;

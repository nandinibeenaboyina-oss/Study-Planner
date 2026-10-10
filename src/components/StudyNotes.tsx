import React, { useState } from 'react';
import { Plus, Search, Tag, Copy, Check, Edit3, Trash2, BookOpen } from 'lucide-react';
import { StudyNote, Subject } from '../types';

interface StudyNotesProps {
  notes: StudyNote[];
  subjects: Subject[];
  onAddNote: (note: Omit<StudyNote, 'id' | 'updatedAt'>) => void;
  onEditNote: (note: StudyNote) => void;
  onDeleteNote: (id: string) => void;
}

export const StudyNotes: React.FC<StudyNotesProps> = ({
  notes,
  subjects,
  onAddNote,
  onEditNote,
  onDeleteNote
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [subjectName, setSubjectName] = useState(subjects[0]?.name || 'Database Management Systems');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<StudyNote['category']>('Important');
  const [tagInput, setTagInput] = useState('exam,dbms');

  const categories = ['All', 'Important', 'Concept', 'Formula', 'Interview'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
                          note.content.toLowerCase().includes(search.toLowerCase()) ||
                          note.subjectName.toLowerCase().includes(search.toLowerCase()) ||
                          note.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openAddModal = () => {
    setEditingNote(null);
    setTitle('');
    setSubjectName(subjects[0]?.name || 'Database Management Systems');
    setContent('');
    setCategory('Important');
    setTagInput('exam,cse');
    setIsModalOpen(true);
  };

  const openEditModal = (note: StudyNote) => {
    setEditingNote(note);
    setTitle(note.title);
    setSubjectName(note.subjectName);
    setContent(note.content);
    setCategory(note.category);
    setTagInput(note.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);

    if (editingNote) {
      onEditNote({
        ...editingNote,
        title,
        subjectName,
        content,
        category,
        tags,
        updatedAt: '2026-10-10'
      });
    } else {
      onAddNote({
        title,
        subjectName,
        content,
        category,
        tags
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
            Study Notes & Cheat Sheets
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Formulas, algorithm proofs, and concise revision notes
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Study Note
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes by keyword, topic, or tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Masonry / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full p-8 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
            No notes match your filter. Click "Create Study Note" to add one!
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                    note.category === 'Important' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                    note.category === 'Formula' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                    note.category === 'Interview' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                    'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {note.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(note.id, `${note.title}\n\n${note.content}`)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                      title="Copy note"
                    >
                      {copiedId === note.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => openEditModal(note)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                      title="Edit note"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                  {note.title}
                </h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  {note.subjectName}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line line-clamp-6 mb-4 font-mono bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {note.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">
                  Updated: {note.updatedAt}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {editingNote ? 'Edit Study Note' : 'Create Study Note'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. ACID Properties in DBMS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Important">Important</option>
                    <option value="Concept">Concept</option>
                    <option value="Formula">Formula</option>
                    <option value="Interview">Interview</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="e.g. transactions, acid, gate"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Note Content / Formulae / Summary
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write clear definitions, points, or algorithm steps..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
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
                  {editingNote ? 'Save Note' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

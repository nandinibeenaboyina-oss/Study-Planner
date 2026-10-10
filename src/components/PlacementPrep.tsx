import React, { useState } from 'react';
import { 
  Briefcase, 
  Bookmark, 
  BookmarkCheck, 
  Code2, 
  UserCheck, 
  Building2, 
  ChevronDown, 
  ChevronUp,
  Search
} from 'lucide-react';
import { PlacementResource } from '../types';

interface PlacementPrepProps {
  resources: PlacementResource[];
  onToggleBookmark: (id: string) => void;
}

export const PlacementPrep: React.FC<PlacementPrepProps> = ({
  resources,
  onToggleBookmark
}) => {
  const [activeTab, setActiveTab] = useState<PlacementResource['category']>('Technical');
  const [search, setSearch] = useState('');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(resources[0]?.id || null);

  const tabs: PlacementResource['category'][] = [
    'Technical',
    'HR Interview',
    'Programming Practice',
    'Company Guide'
  ];

  const filtered = resources.filter(r => {
    const matchesTab = r.category === activeTab;
    const matchesBookmark = bookmarkedOnly ? r.isBookmarked : true;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                          r.topic.toLowerCase().includes(search.toLowerCase()) ||
                          r.question.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesBookmark && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
          Campus Placement Preparation Hub
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Technical interviews, HR questions, programming algorithms, and company hiring guides
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search and Bookmark Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by topic, keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
            bookmarkedOnly
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-amber-400'
          }`}
        >
          {bookmarkedOnly ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          Saved Only
        </button>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
            No questions found for this filter.
          </div>
        ) : (
          filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden transition-all"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(item.id);
                      }}
                      className="text-slate-400 hover:text-amber-500 transition-colors p-1"
                      title="Bookmark question"
                    >
                      {item.isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5 text-amber-500" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          {item.topic}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.difficulty === 'Hard' ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                          item.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        }`}>
                          {item.difficulty}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/40 dark:bg-slate-900/30">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Question / Scenario:
                      </p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {item.question}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Model Answer & Interview Tips:
                      </p>
                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                        {item.answer}
                      </div>
                    </div>

                    {item.codeSnippet && (
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Code Solution:
                        </p>
                        <pre className="p-4 rounded-2xl bg-slate-950 text-cyan-300 text-xs font-mono overflow-x-auto border border-slate-800">
                          <code>{item.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

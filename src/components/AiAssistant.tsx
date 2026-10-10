import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Trash2, Lightbulb } from 'lucide-react';
import { ChatMessage, Subject } from '../types';

interface AiAssistantProps {
  subjects: Subject[];
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ subjects }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      isUser: false,
      text: 'Hello! I am your AI Study Coach for B.Tech CSE. Ask me any conceptual question about DBMS, Operating Systems, Computer Networks, DSA, or request a custom 7-day exam revision plan!',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'Explain Virtual Memory in OS',
    '7-Day DBMS Revision Plan',
    'Explain B+ Trees with Example',
    '4 Coffman Deadlock Conditions',
    'Top 5 SQL Interview Questions',
    'How to prepare for TCS NQT?'
  ];

  const handleSend = (textToSend?: string) => {
    const question = textToSend || input;
    if (!question.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      isUser: true,
      text: question.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    // AI Response simulation / offline generator
    setTimeout(() => {
      const response = generateOfflineResponse(question);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        text: response,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
    }, 600);
  };

  const generateOfflineResponse = (query: string): string => {
    const lower = query.toLowerCase();

    if (lower.includes('virtual memory') || lower.includes('paging')) {
      return `🧠 Virtual Memory & Paging (OS Concept)

• Definition: An abstraction where the OS maps large contiguous virtual address spaces into physical memory frames.
• Key Elements:
  - Page Table: Maps Virtual Page Numbers (VPN) to Physical Frame Numbers (PFN).
  - TLB (Translation Lookaside Buffer): High-speed hardware cache holding recent translations.
  - Page Fault: Interrupt raised by MMU when a page isn't present in physical RAM.
• Exam Formula: Effective Memory Access Time (EMAT) = Hit_Ratio * (TLB + RAM) + (1 - Hit_Ratio) * (TLB + 2*RAM + Fault_Time).
• Pro-tip: Belady's Anomaly occurs in FIFO, never in LRU!`;
    }

    if (lower.includes('b+') || lower.includes('tree') || lower.includes('index')) {
      return `🗄️ B+ Tree Indexing in DBMS

• Why B+ Trees?
  1. High fan-out reduces tree height, minimizing costly disk block I/O reads.
  2. All actual records/pointers reside exclusively in leaf nodes; internal nodes only store navigation keys.
  3. Leaf nodes form a doubly linked list, making Range Queries O(log N + K) exceptionally fast.
• Time Complexity: Search, Insert, and Delete are all O(log N).`;
    }

    if (lower.includes('deadlock') || lower.includes('banker')) {
      return `🔒 Four Coffman Deadlock Conditions

1. Mutual Exclusion: At least one resource must be held exclusively.
2. Hold and Wait: A process holds resources while requesting more.
3. No Preemption: Resources cannot be forcibly revoked before task completion.
4. Circular Wait: A closed loop where P0 waits for P1, and Pn waits for P0.

*Banker's Algorithm Formula:* Need[i][j] = Max[i][j] - Allocation[i][j]. The system is in a Safe State if there exists a sequence of processes that can all terminate safely.`;
    }

    if (lower.includes('plan') || lower.includes('revision') || lower.includes('schedule')) {
      return `📅 7-Day B.Tech CSE Strategic Exam Framework

• Days 1–2: High-Yield Theory
  - DBMS: Normalization (3NF vs BCNF), Transaction ACID & 2-Phase Locking.
  - OS: Process Synchronization (Peterson's, Semaphores), Deadlock Prevention.
• Days 3–4: Numericals & Calculations
  - Networks: Subnetting calculations (/24, /27, /28) & TCP sequence windows.
  - OS: CPU scheduling Gantt charts (Round Robin, SJF) & Page replacement faults.
• Days 5–6: Coding & Placement Patterns
  - Top 15 DSA patterns: Two Pointers, Sliding Window, DFS/BFS, Dynamic Programming.
• Day 7: Active Recall & Timed Mock Quizzes
  - Take 2 timed quizzes in the Quizzes tab and review incorrect explanations.`;
    }

    return `💡 Study Coach Strategy for "${query.slice(0, 30)}..."

1. Break down the core theoretical definitions and draw architectural block diagrams.
2. Solve at least 3 numerical / algorithmic problems (e.g. state transitions, Gantt charts, B-tree insertions).
3. Test yourself: Take a quick practice quiz in the Quizzes tab to measure retention!
4. Ask yourself: "How would I explain this in 60 seconds during a technical interview?"`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5 text-cyan-200" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">
              AI Study Assistant & Tutor
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant explanations, revision blueprints, and code debugging
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Clear chat history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-2xl ${m.isUser ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              m.isUser 
                ? 'bg-blue-600 text-white' 
                : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300'
            }`}>
              {m.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-line ${
              m.isUser
                ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                : 'bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 max-w-lg">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-500 animate-pulse border border-slate-200 dark:border-slate-800">
              AI Study Assistant is formulating the answer...
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {samplePrompts.map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 border border-slate-200 dark:border-slate-700"
          >
            <Lightbulb className="w-3 h-3 text-amber-500" /> {p}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask any CSE question, algorithm doubt, or syllabus advice..."
          className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="absolute right-2 top-2 p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

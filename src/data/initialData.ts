import { UserProfile, Subject, StudyTask, StudyNote, QuizQuestion, PlacementResource, StudyLog } from '../types';

export const initialProfile: UserProfile = {
  name: 'Alex Sharma',
  email: 'alex.cse@college.edu',
  rollNumber: '22BCE1048',
  semester: 'Semester 6',
  branch: 'B.Tech Computer Science & Engineering',
  targetCgpa: 9.2,
  currentCgpa: 8.75,
  bio: 'Preparing for Campus Placements & GATE CSE. Passionate about Backend, Distributed Systems & DSA.',
  dailyGoalHours: 4.5
};

export const initialSubjects: Subject[] = [
  {
    id: 'sub-1',
    name: 'Database Management Systems',
    code: 'CS301',
    category: 'Core CSE',
    description: 'Relational Model, SQL, Normalization (1NF-BCNF), ACID, Indexing & B+ Trees.',
    examDate: '2026-11-15',
    priority: 'High',
    totalTopics: 12,
    completedTopics: 9,
    colorHex: '#2563eb'
  },
  {
    id: 'sub-2',
    name: 'Operating Systems',
    code: 'CS302',
    category: 'Core CSE',
    description: 'Process Scheduling, Synchronization & Semaphores, Deadlocks, Virtual Memory & Paging.',
    examDate: '2026-11-18',
    priority: 'High',
    totalTopics: 10,
    completedTopics: 7,
    colorHex: '#3b82f6'
  },
  {
    id: 'sub-3',
    name: 'Computer Networks',
    code: 'CS303',
    category: 'Core CSE',
    description: 'OSI & TCP/IP Stack, Routing Protocols (OSPF, BGP), Flow Control, Subnetting, DNS & HTTP.',
    examDate: '2026-11-22',
    priority: 'Medium',
    totalTopics: 10,
    completedTopics: 6,
    colorHex: '#0284c7'
  },
  {
    id: 'sub-4',
    name: 'Data Structures & Algorithms',
    code: 'CS201',
    category: 'Programming',
    description: 'Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Greedy, Time Complexities.',
    examDate: '2026-11-25',
    priority: 'High',
    totalTopics: 16,
    completedTopics: 13,
    colorHex: '#10b981'
  },
  {
    id: 'sub-5',
    name: 'Data Mining & Warehousing',
    code: 'CS401',
    category: 'Core CSE',
    description: 'ETL Pipelines, Association Rules (Apriori), K-Means Clustering, Classification & Overfitting.',
    examDate: '2026-11-28',
    priority: 'Medium',
    totalTopics: 8,
    completedTopics: 5,
    colorHex: '#8b5cf6'
  },
  {
    id: 'sub-6',
    name: 'Machine Learning',
    code: 'CS402',
    category: 'Core CSE',
    description: 'Supervised/Unsupervised Learning, Linear Regression, SVM, Decision Trees, Neural Networks.',
    examDate: '2026-12-02',
    priority: 'Medium',
    totalTopics: 10,
    completedTopics: 6,
    colorHex: '#6366f1'
  },
  {
    id: 'sub-7',
    name: 'Quantitative Aptitude',
    code: 'APT101',
    category: 'Aptitude',
    description: 'Percentages, Profit & Loss, Speed-Time-Distance, Permutations & Combinations, Probability.',
    examDate: '2026-11-10',
    priority: 'High',
    totalTopics: 14,
    completedTopics: 10,
    colorHex: '#f59e0b'
  },
  {
    id: 'sub-8',
    name: 'Logical Reasoning',
    code: 'LR101',
    category: 'Reasoning',
    description: 'Number Series, Syllogisms, Blood Relations, Coding-Decoding, Seating Arrangements.',
    examDate: '2026-11-12',
    priority: 'Medium',
    totalTopics: 12,
    completedTopics: 8,
    colorHex: '#d97706'
  }
];

export const initialTasks: StudyTask[] = [
  {
    id: 'task-1',
    title: 'Revise DBMS B+ Trees & Indexing',
    subjectName: 'Database Management Systems',
    description: 'Practice insertion and deletion numericals for B+ tree indices of order 4.',
    date: '2026-10-10',
    startTime: '09:00 AM',
    durationMinutes: 90,
    priority: 'High',
    status: 'In Progress'
  },
  {
    id: 'task-2',
    title: 'Solve 5 Dynamic Programming Problems',
    subjectName: 'Data Structures & Algorithms',
    description: '0/1 Knapsack, Coin Change, Longest Common Subsequence, Edit Distance.',
    date: '2026-10-10',
    startTime: '11:30 AM',
    durationMinutes: 120,
    priority: 'High',
    status: 'Pending'
  },
  {
    id: 'task-3',
    title: 'OS Banker\'s Algorithm Deadlock Avoidance',
    subjectName: 'Operating Systems',
    description: 'Solve 4 numerical problems finding Safe Sequences using allocation and need matrices.',
    date: '2026-10-10',
    startTime: '03:00 PM',
    durationMinutes: 60,
    priority: 'Medium',
    status: 'Pending'
  },
  {
    id: 'task-4',
    title: 'Speed, Time & Train Problems Practice',
    subjectName: 'Quantitative Aptitude',
    description: 'Solve 20 placement questions from previous company papers.',
    date: '2026-10-10',
    startTime: '05:00 PM',
    durationMinutes: 60,
    priority: 'Medium',
    status: 'Completed'
  },
  {
    id: 'task-5',
    title: 'Computer Networks Subnetting (/26 and /28)',
    subjectName: 'Computer Networks',
    description: 'Calculate network address, broadcast IP, and usable hosts for classless IPs.',
    date: '2026-10-11',
    startTime: '10:00 AM',
    durationMinutes: 75,
    priority: 'Medium',
    status: 'Pending'
  }
];

export const initialNotes: StudyNote[] = [
  {
    id: 'note-1',
    title: 'ACID Properties in Relational Databases',
    subjectName: 'Database Management Systems',
    content: `Atomicity: All operations in a transaction succeed or all roll back (managed via Undo logs).
Consistency: The database remains in a valid state satisfying integrity constraints.
Isolation: Concurrent transactions execute as if serial (achieved through 2-Phase Locking or MVCC).
Durability: Committed updates survive system crashes (ensured by Write-Ahead Logging WAL / Redo logs).`,
    category: 'Important',
    tags: ['dbms', 'transactions', 'acid', 'placement'],
    updatedAt: '2026-10-10'
  },
  {
    id: 'note-2',
    title: 'Four Coffman Conditions for Deadlock',
    subjectName: 'Operating Systems',
    content: `1. Mutual Exclusion: At least one resource held in non-shareable mode.
2. Hold and Wait: A process holds resources while requesting additional resources.
3. No Preemption: Resources cannot be forcibly seized; must be voluntarily released.
4. Circular Wait: Closed loop chain of processes where each waits on the next.
*Deadlock Prevention works by invalidating at least one of these four conditions.*`,
    category: 'Formula',
    tags: ['os', 'deadlock', 'interview'],
    updatedAt: '2026-10-09'
  },
  {
    id: 'note-3',
    title: 'TCP 3-Way Handshake & Teardown',
    subjectName: 'Computer Networks',
    content: `Connection Establishment:
1. Client -> SYN (seq=x)
2. Server -> SYN-ACK (seq=y, ack=x+1)
3. Client -> ACK (seq=x+1, ack=y+1)

Connection Termination (4-Way):
1. Client -> FIN
2. Server -> ACK
3. Server -> FIN
4. Client -> ACK (Enters TIME_WAIT for 2*MSL to ensure clean closure)`,
    category: 'Concept',
    tags: ['networks', 'tcp', 'protocols', 'gate'],
    updatedAt: '2026-10-08'
  }
];

export const initialQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'DBMS',
    question: 'Which normal form strictly eliminates transitive functional dependencies for non-prime attributes?',
    options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
    correctIndex: 2,
    explanation: '3NF requires that the relation is in 2NF and contains no transitive functional dependencies (X -> Y and Y -> Z where Z is non-prime).'
  },
  {
    id: 'q-2',
    category: 'DBMS',
    question: 'In database transaction management, which mechanism guarantees the Atomicity and Durability properties?',
    options: ['Two-Phase Locking (2PL)', 'Write-Ahead Logging (WAL)', 'Timestamp Ordering Protocol', 'Wait-Die Scheme'],
    correctIndex: 1,
    explanation: 'Write-Ahead Logging (WAL) ensures Atomicity (via Undo records) and Durability (via Redo records) before changes are written to the database disk.'
  },
  {
    id: 'q-3',
    category: 'Operating Systems',
    question: 'What phenomenon occurs when excessive page faults cause the operating system to spend more time swapping pages than executing instructions?',
    options: ['Starvation', 'Internal Fragmentation', 'Thrashing', 'Belady\'s Anomaly'],
    correctIndex: 2,
    explanation: 'Thrashing occurs when the total working sets of active processes exceed available physical memory, forcing continuous page faults and disk I/O.'
  },
  {
    id: 'q-4',
    category: 'Operating Systems',
    question: 'Belady\'s Anomaly can occur in which page replacement algorithm?',
    options: ['Optimal Page Replacement', 'Least Recently Used (LRU)', 'First-In, First-Out (FIFO)', 'Least Frequently Used (LFU)'],
    correctIndex: 2,
    explanation: 'Belady\'s Anomaly is the counter-intuitive phenomenon where increasing the number of page frames results in more page faults under FIFO.'
  },
  {
    id: 'q-5',
    category: 'Computer Networks',
    question: 'How many usable host IP addresses are available in an IPv4 subnet with a /27 prefix?',
    options: ['32', '30', '28', '62'],
    correctIndex: 1,
    explanation: '/27 has 32 - 27 = 5 host bits. Total addresses = 2^5 = 32. Subtracting 2 for Network Address and Broadcast IP leaves 30 usable host addresses.'
  },
  {
    id: 'q-6',
    category: 'Programming',
    question: 'What is the amortized time complexity of inserting an element into a dynamic array (like std::vector or ArrayList)?',
    options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
    correctIndex: 2,
    explanation: 'Although individual resizing operations take O(N), because capacity doubles, the cost spread over N insertions yields O(1) amortized time.'
  },
  {
    id: 'q-7',
    category: 'Aptitude',
    question: 'A pipe fills a tank in 6 hours, while another empties it in 8 hours. If both are opened together, how long will it take to fill the tank?',
    options: ['14 hours', '24 hours', '18 hours', '20 hours'],
    correctIndex: 1,
    explanation: 'Net fill rate = 1/6 - 1/8 = (4 - 3)/24 = 1/24 tank per hour. Therefore, it takes 24 hours to fill the tank.'
  },
  {
    id: 'q-8',
    category: 'Logical Reasoning',
    question: 'Find the next number in the sequence: 3, 7, 15, 31, 63, ?',
    options: ['125', '127', '129', '131'],
    correctIndex: 1,
    explanation: 'The pattern is (x * 2) + 1: 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1=127.'
  }
];

export const initialPlacementResources: PlacementResource[] = [
  {
    id: 'place-1',
    category: 'Technical',
    title: 'Explain the Difference Between a Process and a Thread',
    topic: 'Operating Systems',
    difficulty: 'Easy',
    question: 'What is the fundamental architectural difference between processes and threads?',
    answer: `A Process is an executing instance with its own virtual address space, heap, file descriptors, and security tokens. Inter-Process Communication (IPC) requires OS primitives (pipes, sockets, shared memory).
A Thread is a lightweight dispatch unit sharing the code, data, and heap segments of its parent process, but maintaining its own Program Counter (PC), registers, and stack. Context switching between threads is significantly faster.`,
    isBookmarked: true
  },
  {
    id: 'place-2',
    category: 'Technical',
    title: 'What is Indexing in SQL and When Should You NOT Create an Index?',
    topic: 'DBMS',
    difficulty: 'Medium',
    question: 'How do B-Tree indexes speed up lookups, and what are their trade-offs?',
    answer: `B-Tree indexes sort column keys into balanced trees, dropping lookup time from O(N) full table scans to O(log N) tree traversals.
When to avoid indexes:
1. Small tables (table scans are already fast in cache).
2. Write-heavy tables with high INSERT/UPDATE frequency (each write requires index balancing).
3. Columns with low cardinality (e.g. Gender with 2-3 distinct values).
4. Columns rarely queried in WHERE or JOIN clauses.`,
    codeSnippet: `CREATE INDEX idx_student_email ON students(email);\nEXPLAIN SELECT * FROM students WHERE email = 'alex@cse.edu';`,
    isBookmarked: true
  },
  {
    id: 'place-3',
    category: 'HR Interview',
    title: 'Tell Me About Yourself (Software Engineer Pitch)',
    topic: 'Behavioral',
    difficulty: 'Easy',
    question: 'How to structure "Tell me about yourself" for campus software engineering recruitment?',
    answer: `Use the Present-Past-Future Formula:
1. Present: State your current status: "I am a final-year B.Tech CSE student passionate about distributed backend systems and algorithm optimization."
2. Past: Mention 1-2 concrete achievements: "I recently built a full-stack student exam planner and solved 350+ DSA problems on LeetCode."
3. Future: Connect your ambitions to the company: "I am excited about your cloud engineering team and would love to contribute to resilient microservices here."`,
    isBookmarked: true
  },
  {
    id: 'place-4',
    category: 'Programming Practice',
    title: 'Two Sum Problem (Optimal Hash Map)',
    topic: 'Data Structures',
    difficulty: 'Easy',
    question: 'Given an array of integers nums and target, return indices of two numbers that add up to target.',
    answer: `Optimal Approach: Iterate through nums while storing {number: index} in a Hash Map. For each element num, compute complement = target - num. If complement is in the map, return [map[complement], currentIndex]. Time: O(N), Space: O(N).`,
    codeSnippet: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    isBookmarked: false
  },
  {
    id: 'place-5',
    category: 'Company Guide',
    title: 'TCS National Qualifier Test (NQT) Structure & Tips',
    topic: 'Company Pattern',
    difficulty: 'Medium',
    question: 'What is the syllabus and strategy for TCS NQT (Ninja / Digital / Prime)?',
    answer: `Foundation Section: Verbal Ability (25m), Reasoning Ability (25m), Numerical Ability (25m).
Advanced Section (Digital/Prime): Advanced Quantitative & Reasoning (35m), Advanced Coding (2 problems in 90m: Strings, Arrays, DP).
Tip: Digital cutoff requires passing all test cases on both coding questions with optimal time complexity (O(N) or O(N log N)).`,
    isBookmarked: true
  }
];

export const initialStudyLogs: StudyLog[] = [
  { date: '2026-10-09', minutesStudied: 240, subjectName: 'DBMS' },
  { date: '2026-10-08', minutesStudied: 180, subjectName: 'DSA' },
  { date: '2026-10-07', minutesStudied: 210, subjectName: 'Operating Systems' },
  { date: '2026-10-06', minutesStudied: 150, subjectName: 'Networks' },
  { date: '2026-10-05', minutesStudied: 270, subjectName: 'Aptitude' },
  { date: '2026-10-04', minutesStudied: 180, subjectName: 'Programming' },
  { date: '2026-10-03', minutesStudied: 120, subjectName: 'Data Mining' }
];

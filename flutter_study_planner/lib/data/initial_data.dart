import '../models/user_profile.dart';
import '../models/subject.dart';
import '../models/study_task.dart';
import '../models/study_note.dart';
import '../models/quiz.dart';
import '../models/study_log.dart';

class InitialData {
  static UserProfile get profile => UserProfile(
    name: 'Alex Sharma',
    email: 'alex.cse@college.edu',
    rollNumber: '22BCE1048',
    semester: 'Semester 6',
    branch: 'B.Tech Computer Science & Engineering',
    targetCgpa: 9.2,
    currentCgpa: 8.75,
    bio: 'Preparing for Semester University Exams & CSE Technical Placements. Focused on Core Systems & Algorithms.',
    dailyGoalHours: 4.5,
  );

  static List<Subject> get subjects => [
    Subject(
      id: 'sub-1',
      name: 'Database Management Systems',
      code: 'CS301',
      category: 'Core CSE',
      description: 'Relational Model, SQL, Normalization (1NF-BCNF), ACID, Concurrency Control & B+ Trees.',
      examDate: '2026-11-15',
      priority: 'High',
      colorHex: '#8b5cf6',
      units: [
        SyllabusUnit(
          id: 'dbms-u1',
          unitNumber: 'Unit 1',
          unitTitle: 'Foundations & Database Architecture',
          topics: [
            SyllabusTopic(
              id: 'dbms-t1',
              title: '3-Tier Architecture & Data Independence',
              youtubeUrl: 'https://www.youtube.com/results?search_query=dbms+architecture+3+tier+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=dbms+3+tier+architecture+geeksforgeeks+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'dbms-t2',
              title: 'ER Modeling & Relational Schema Mapping',
              youtubeUrl: 'https://www.youtube.com/results?search_query=er+model+to+relational+mapping+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=er+diagram+to+relational+model+notes+pdf',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'dbms-u2',
          unitNumber: 'Unit 2',
          unitTitle: 'Relational Model & Advanced SQL',
          topics: [
            SyllabusTopic(
              id: 'dbms-t3',
              title: 'Relational Algebra (Selection, Projection, Joins)',
              youtubeUrl: 'https://www.youtube.com/results?search_query=relational+algebra+in+dbms+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=relational+algebra+operators+geeksforgeeks',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'dbms-t4',
              title: 'Complex SQL Queries, Nested Subqueries & Views',
              youtubeUrl: 'https://www.youtube.com/results?search_query=sql+nested+subqueries+and+joins+tutorial',
              notesUrl: 'https://www.google.com/search?q=sql+subqueries+joins+cheatsheet+geeksforgeeks',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'dbms-u3',
          unitNumber: 'Unit 3',
          unitTitle: 'Normalization & Schema Refinement',
          topics: [
            SyllabusTopic(
              id: 'dbms-t5',
              title: 'Functional Dependencies & Closure of Attributes',
              youtubeUrl: 'https://www.youtube.com/results?search_query=functional+dependency+closure+attribute+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=functional+dependencies+in+dbms+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'dbms-t6',
              title: 'Normal Forms (1NF, 2NF, 3NF & BCNF Decomposition)',
              youtubeUrl: 'https://www.youtube.com/results?search_query=normalization+dbms+1nf+2nf+3nf+bcnf+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=normalization+in+dbms+geeksforgeeks+notes',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'dbms-u4',
          unitNumber: 'Unit 4',
          unitTitle: 'Transactions & Concurrency Control',
          topics: [
            SyllabusTopic(
              id: 'dbms-t7',
              title: 'Transaction ACID Properties & Schedules',
              youtubeUrl: 'https://www.youtube.com/results?search_query=acid+properties+dbms+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=acid+properties+transactions+dbms+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'dbms-t8',
              title: 'Two-Phase Locking (2PL) Protocol & Deadlock Handling',
              youtubeUrl: 'https://www.youtube.com/results?search_query=two+phase+locking+2pl+dbms+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=two+phase+locking+concurrency+control+geeksforgeeks',
              isCompleted: false,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'dbms-u5',
          unitNumber: 'Unit 5',
          unitTitle: 'File Storage & Indexing Mechanisms',
          topics: [
            SyllabusTopic(
              id: 'dbms-t9',
              title: 'B-Tree & B+ Tree Indexing Operations',
              youtubeUrl: 'https://www.youtube.com/results?search_query=b+plus+tree+insertion+deletion+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=b+plus+tree+indexing+notes+geeksforgeeks',
              isCompleted: false,
            ),
            SyllabusTopic(
              id: 'dbms-t10',
              title: 'Hashing Techniques: Static vs Extendible Hashing',
              youtubeUrl: 'https://www.youtube.com/results?search_query=extendible+hashing+dbms+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=extendible+hashing+in+dbms+notes',
              isCompleted: false,
            ),
          ],
        ),
      ],
    ),
    Subject(
      id: 'sub-2',
      name: 'Operating Systems',
      code: 'CS302',
      category: 'Core CSE',
      description: 'Process Scheduling, Synchronization & Semaphores, Deadlocks, Virtual Memory & Paging.',
      examDate: '2026-11-18',
      priority: 'High',
      colorHex: '#7c3aed',
      units: [
        SyllabusUnit(
          id: 'os-u1',
          unitNumber: 'Unit 1',
          unitTitle: 'Process Management & System Calls',
          topics: [
            SyllabusTopic(
              id: 'os-t1',
              title: 'Process Lifecycle, PCB & Context Switching',
              youtubeUrl: 'https://www.youtube.com/results?search_query=process+state+and+pcb+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=process+states+and+pcb+geeksforgeeks+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'os-t2',
              title: 'Multithreading & User vs Kernel Threads',
              youtubeUrl: 'https://www.youtube.com/results?search_query=user+level+threads+vs+kernel+level+threads+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=user+threads+vs+kernel+threads+notes',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'os-u2',
          unitNumber: 'Unit 2',
          unitTitle: 'CPU Scheduling Algorithms',
          topics: [
            SyllabusTopic(
              id: 'os-t3',
              title: 'Non-Preemptive & Preemptive Scheduling (FCFS, SJF, SRTF)',
              youtubeUrl: 'https://www.youtube.com/results?search_query=sjf+scheduling+algorithm+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=cpu+scheduling+algorithms+notes+pdf+geeksforgeeks',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'os-t4',
              title: 'Round Robin & Multilevel Feedback Queue Scheduling',
              youtubeUrl: 'https://www.youtube.com/results?search_query=round+robin+scheduling+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=round+robin+scheduling+algorithm+notes',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'os-u3',
          unitNumber: 'Unit 3',
          unitTitle: 'Process Synchronization & Concurrency',
          topics: [
            SyllabusTopic(
              id: 'os-t5',
              title: 'Critical Section Problem & Peterson Solution',
              youtubeUrl: 'https://www.youtube.com/results?search_query=critical+section+problem+peterson+solution+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=critical+section+peterson+solution+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'os-t6',
              title: 'Semaphores & Classical Synchronization Problems (Dining Philosophers, Readers-Writers)',
              youtubeUrl: 'https://www.youtube.com/results?search_query=semaphores+dining+philosophers+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=semaphores+producer+consumer+problem+geeksforgeeks',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'os-u4',
          unitNumber: 'Unit 4',
          unitTitle: 'Deadlocks: Characterization & Resolution',
          topics: [
            SyllabusTopic(
              id: 'os-t7',
              title: '4 Coffman Conditions & Deadlock Prevention',
              youtubeUrl: 'https://www.youtube.com/results?search_query=deadlock+conditions+and+prevention+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=deadlock+conditions+prevention+notes',
              isCompleted: false,
            ),
            SyllabusTopic(
              id: 'os-t8',
              title: 'Banker Algorithm for Deadlock Avoidance',
              youtubeUrl: 'https://www.youtube.com/results?search_query=banker+algorithm+deadlock+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=bankers+algorithm+geeksforgeeks+notes',
              isCompleted: false,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'os-u5',
          unitNumber: 'Unit 5',
          unitTitle: 'Memory Management & Virtual Memory',
          topics: [
            SyllabusTopic(
              id: 'os-t9',
              title: 'Paging, Segmentation, TLB & Effective Memory Access Time',
              youtubeUrl: 'https://www.youtube.com/results?search_query=paging+and+tlb+operating+system+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=paging+in+operating+system+notes',
              isCompleted: false,
            ),
            SyllabusTopic(
              id: 'os-t10',
              title: 'Page Replacement Algorithms (FIFO, LRU, Optimal) & Thrashing',
              youtubeUrl: 'https://www.youtube.com/results?search_query=page+replacement+algorithms+lru+fifo+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=page+replacement+algorithms+lru+optimal+geeksforgeeks',
              isCompleted: false,
            ),
          ],
        ),
      ],
    ),
    Subject(
      id: 'sub-3',
      name: 'Computer Networks',
      code: 'CS303',
      category: 'Core CSE',
      description: 'OSI & TCP/IP Stack, Subnetting, Routing Protocols, TCP Flow/Congestion Control & DNS/HTTP.',
      examDate: '2026-11-22',
      priority: 'Medium',
      colorHex: '#6366f1',
      units: [
        SyllabusUnit(
          id: 'cn-u1',
          unitNumber: 'Unit 1',
          unitTitle: 'Network Models & Physical Layer',
          topics: [
            SyllabusTopic(
              id: 'cn-t1',
              title: 'OSI 7-Layer Reference Model vs TCP/IP Suite',
              youtubeUrl: 'https://www.youtube.com/results?search_query=osi+model+7+layers+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=osi+model+layers+geeksforgeeks+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'cn-t2',
              title: 'Data Link Layer: Framing & CRC Error Detection',
              youtubeUrl: 'https://www.youtube.com/results?search_query=cyclic+redundancy+check+crc+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=crc+error+detection+notes+pdf',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'cn-u2',
          unitNumber: 'Unit 2',
          unitTitle: 'Network Layer: Addressing & Routing',
          topics: [
            SyllabusTopic(
              id: 'cn-t3',
              title: 'IPv4 Subnetting, CIDR & Masking Calculations',
              youtubeUrl: 'https://www.youtube.com/results?search_query=ip+addressing+subnetting+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=subnetting+cidr+calculations+geeksforgeeks',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'cn-t4',
              title: 'Routing Algorithms: Distance Vector vs Link State (Dijkstra)',
              youtubeUrl: 'https://www.youtube.com/results?search_query=distance+vector+vs+link+state+routing+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=dijkstra+link+state+routing+geeksforgeeks',
              isCompleted: false,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'cn-u3',
          unitNumber: 'Unit 3',
          unitTitle: 'Transport Layer Protocols',
          topics: [
            SyllabusTopic(
              id: 'cn-t5',
              title: 'TCP 3-Way Handshake & 4-Way Connection Teardown',
              youtubeUrl: 'https://www.youtube.com/results?search_query=tcp+3+way+handshake+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=tcp+connection+handshake+teardown+notes',
              isCompleted: false,
            ),
            SyllabusTopic(
              id: 'cn-t6',
              title: 'TCP Flow Control & Congestion Control (Slow Start, AIMD)',
              youtubeUrl: 'https://www.youtube.com/results?search_query=tcp+congestion+control+aimd+gate+smashers',
              notesUrl: 'https://www.google.com/search?q=tcp+congestion+control+slow+start+geeksforgeeks',
              isCompleted: false,
            ),
          ],
        ),
      ],
    ),
    Subject(
      id: 'sub-4',
      name: 'Data Structures & Algorithms',
      code: 'CS201',
      category: 'Programming',
      description: 'Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Greedy & Time Complexity.',
      examDate: '2026-11-25',
      priority: 'High',
      colorHex: '#10b981',
      units: [
        SyllabusUnit(
          id: 'dsa-u1',
          unitNumber: 'Unit 1',
          unitTitle: 'Complexity & Linear Data Structures',
          topics: [
            SyllabusTopic(
              id: 'dsa-t1',
              title: 'Asymptotic Notations & Master Theorem',
              youtubeUrl: 'https://www.youtube.com/results?search_query=master+theorem+algorithm+abdul+bari',
              notesUrl: 'https://www.google.com/search?q=asymptotic+analysis+master+theorem+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'dsa-t2',
              title: 'Arrays, Two Pointers & Sliding Window Patterns',
              youtubeUrl: 'https://www.youtube.com/results?search_query=sliding+window+technique+striver',
              notesUrl: 'https://www.google.com/search?q=sliding+window+two+pointer+patterns+leetcode+notes',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'dsa-u2',
          unitNumber: 'Unit 2',
          unitTitle: 'Trees & Graph Algorithms',
          topics: [
            SyllabusTopic(
              id: 'dsa-t3',
              title: 'Binary Search Trees (BST), AVL Rotations & Heaps',
              youtubeUrl: 'https://www.youtube.com/results?search_query=avl+tree+rotations+abdul+bari',
              notesUrl: 'https://www.google.com/search?q=avl+tree+rotations+heap+notes+geeksforgeeks',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'dsa-t4',
              title: 'Shortest Path (Dijkstra) & Minimum Spanning Tree',
              youtubeUrl: 'https://www.youtube.com/results?search_query=dijkstra+algorithm+abdul+bari',
              notesUrl: 'https://www.google.com/search?q=dijkstra+kruskal+prims+algorithm+notes',
              isCompleted: false,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'dsa-u3',
          unitNumber: 'Unit 3',
          unitTitle: 'Dynamic Programming & Greedy Approaches',
          topics: [
            SyllabusTopic(
              id: 'dsa-t5',
              title: '0/1 Knapsack, Longest Common Subsequence (LCS) & Coin Change',
              youtubeUrl: 'https://www.youtube.com/results?search_query=0+1+knapsack+dynamic+programming+abdul+bari',
              notesUrl: 'https://www.google.com/search?q=0+1+knapsack+problem+dp+notes+geeksforgeeks',
              isCompleted: false,
            ),
          ],
        ),
      ],
    ),
    Subject(
      id: 'sub-5',
      name: 'Machine Learning',
      code: 'CS402',
      category: 'Core CSE',
      description: 'Supervised Learning, Regression, Classification, Decision Trees, SVM, Clustering & Neural Networks.',
      examDate: '2026-12-02',
      priority: 'Medium',
      colorHex: '#a855f7',
      units: [
        SyllabusUnit(
          id: 'ml-u1',
          unitNumber: 'Unit 1',
          unitTitle: 'Supervised Learning & Regression',
          topics: [
            SyllabusTopic(
              id: 'ml-t1',
              title: 'Linear & Logistic Regression, Cost Function & Gradient Descent',
              youtubeUrl: 'https://www.youtube.com/results?search_query=linear+regression+gradient+descent+statquest',
              notesUrl: 'https://www.google.com/search?q=linear+regression+gradient+descent+notes',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'ml-u2',
          unitNumber: 'Unit 2',
          unitTitle: 'Tree Models, SVM & Neural Networks',
          topics: [
            SyllabusTopic(
              id: 'ml-t2',
              title: 'Decision Trees, Random Forests & Boosting (XGBoost)',
              youtubeUrl: 'https://www.youtube.com/results?search_query=random+forest+adaboost+xgboost+statquest',
              notesUrl: 'https://www.google.com/search?q=ensemble+learning+random+forest+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'ml-t3',
              title: 'Support Vector Machines (SVM) & Kernel Trick',
              youtubeUrl: 'https://www.youtube.com/results?search_query=support+vector+machines+statquest',
              notesUrl: 'https://www.google.com/search?q=svm+kernel+trick+notes+geeksforgeeks',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'ml-t4',
              title: 'Multilayer Perceptron, Activation Functions & Backpropagation',
              youtubeUrl: 'https://www.youtube.com/results?search_query=neural+networks+backpropagation+3blue1brown',
              notesUrl: 'https://www.google.com/search?q=neural+network+backpropagation+notes+pdf',
              isCompleted: false,
            ),
          ],
        ),
      ],
    ),
    Subject(
      id: 'sub-6',
      name: 'Quantitative Aptitude & Logic',
      code: 'APT101',
      category: 'Aptitude',
      description: 'Percentages, Profit & Loss, Speed-Time-Distance, Permutations & Combinations, Data Interpretation.',
      examDate: '2026-11-10',
      priority: 'High',
      colorHex: '#f59e0b',
      units: [
        SyllabusUnit(
          id: 'apt-u1',
          unitNumber: 'Unit 1',
          unitTitle: 'Arithmetic Aptitude Shortcuts',
          topics: [
            SyllabusTopic(
              id: 'apt-t1',
              title: 'Percentages, Profit & Loss, Discount Formulas',
              youtubeUrl: 'https://www.youtube.com/results?search_query=percentage+profit+and+loss+tricks+career+ride',
              notesUrl: 'https://www.google.com/search?q=percentage+profit+and+loss+shortcuts+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'apt-t2',
              title: 'Time & Work, Pipes & Cisterns Shortcuts',
              youtubeUrl: 'https://www.youtube.com/results?search_query=time+and+work+shortcuts+feel+free+to+learn',
              notesUrl: 'https://www.google.com/search?q=time+and+work+formulas+shortcuts+notes',
              isCompleted: true,
            ),
          ],
        ),
        SyllabusUnit(
          id: 'apt-u2',
          unitNumber: 'Unit 2',
          unitTitle: 'Kinematics & Probability',
          topics: [
            SyllabusTopic(
              id: 'apt-t3',
              title: 'Speed, Time, Distance & Relative Velocity in Trains',
              youtubeUrl: 'https://www.youtube.com/results?search_query=speed+time+distance+trains+aptitude+tricks',
              notesUrl: 'https://www.google.com/search?q=speed+time+distance+trains+formulas+notes',
              isCompleted: true,
            ),
            SyllabusTopic(
              id: 'apt-t4',
              title: 'Permutations & Combinations (Arrangements & Selections)',
              youtubeUrl: 'https://www.youtube.com/results?search_query=permutations+and+combinations+placement+aptitude',
              notesUrl: 'https://www.google.com/search?q=permutation+combination+formulas+notes',
              isCompleted: true,
            ),
          ],
        ),
      ],
    ),
  ];

  static List<StudyTask> get tasks => [
    StudyTask(
      id: 'task-1',
      title: 'Revise DBMS B+ Trees & Indexing',
      subjectName: 'Database Management Systems',
      description: 'Practice insertion and deletion numericals for B+ tree indices of order 4.',
      date: '2026-10-10',
      startTime: '09:00 AM',
      durationMinutes: 90,
      priority: 'High',
      status: 'In Progress',
    ),
    StudyTask(
      id: 'task-2',
      title: 'Solve 5 Dynamic Programming Problems',
      subjectName: 'Data Structures & Algorithms',
      description: '0/1 Knapsack, Coin Change, Longest Common Subsequence, Edit Distance.',
      date: '2026-10-10',
      startTime: '11:30 AM',
      durationMinutes: 120,
      priority: 'High',
      status: 'Pending',
    ),
    StudyTask(
      id: 'task-3',
      title: 'OS Banker\'s Algorithm Deadlock Avoidance',
      subjectName: 'Operating Systems',
      description: 'Solve 4 numerical problems finding Safe Sequences using allocation and need matrices.',
      date: '2026-10-10',
      startTime: '03:00 PM',
      durationMinutes: 60,
      priority: 'Medium',
      status: 'Pending',
    ),
    StudyTask(
      id: 'task-4',
      title: 'Speed, Time & Train Problems Practice',
      subjectName: 'Quantitative Aptitude & Logic',
      description: 'Solve 20 placement questions from previous company papers.',
      date: '2026-10-10',
      startTime: '05:00 PM',
      durationMinutes: 60,
      priority: 'Medium',
      status: 'Completed',
    ),
  ];

  static List<StudyNote> get notes => [
    StudyNote(
      id: 'note-1',
      title: 'ACID Properties in Relational Databases',
      subjectName: 'Database Management Systems',
      content: 'Atomicity: All operations in a transaction succeed or all roll back (managed via Undo logs).\nConsistency: The database remains in a valid state satisfying integrity constraints.\nIsolation: Concurrent transactions execute as if serial (achieved through 2-Phase Locking or MVCC).\nDurability: Committed updates survive system crashes (ensured by Write-Ahead Logging WAL / Redo logs).',
      category: 'Important',
      tags: ['dbms', 'transactions', 'acid', 'placement'],
      updatedAt: '2026-10-10',
    ),
    StudyNote(
      id: 'note-2',
      title: 'Four Coffman Conditions for Deadlock',
      subjectName: 'Operating Systems',
      content: '1. Mutual Exclusion: At least one resource held in non-shareable mode.\n2. Hold and Wait: A process holds resources while requesting additional resources.\n3. No Preemption: Resources cannot be forcibly seized; must be voluntarily released.\n4. Circular Wait: Closed loop chain of processes where each waits on the next.\n*Deadlock Prevention works by invalidating at least one of these four conditions.*',
      category: 'Formula',
      tags: ['os', 'deadlock', 'interview'],
      updatedAt: '2026-10-09',
    ),
    StudyNote(
      id: 'note-3',
      title: 'TCP 3-Way Handshake & Teardown',
      subjectName: 'Computer Networks',
      content: 'Connection Establishment:\n1. Client -> SYN (seq=x)\n2. Server -> SYN-ACK (seq=y, ack=x+1)\n3. Client -> ACK (seq=x+1, ack=y+1)\n\nConnection Termination (4-Way):\n1. Client -> FIN\n2. Server -> ACK\n3. Server -> FIN\n4. Client -> ACK (Enters TIME_WAIT for 2*MSL to ensure clean closure)',
      category: 'Concept',
      tags: ['networks', 'tcp', 'protocols', 'gate'],
      updatedAt: '2026-10-08',
    ),
  ];

  static List<QuizQuestion> get quizQuestions => [
    QuizQuestion(
      id: 'q-1',
      category: 'DBMS',
      question: 'Which normal form strictly eliminates transitive functional dependencies for non-prime attributes?',
      options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
      correctIndex: 2,
      explanation: '3NF requires that the relation is in 2NF and contains no transitive functional dependencies (X -> Y and Y -> Z where Z is non-prime).',
    ),
    QuizQuestion(
      id: 'q-2',
      category: 'DBMS',
      question: 'In database transaction management, which mechanism guarantees the Atomicity and Durability properties?',
      options: ['Two-Phase Locking (2PL)', 'Write-Ahead Logging (WAL)', 'Timestamp Ordering Protocol', 'Wait-Die Scheme'],
      correctIndex: 1,
      explanation: 'Write-Ahead Logging (WAL) ensures Atomicity (via Undo records) and Durability (via Redo records) before changes are written to disk.',
    ),
    QuizQuestion(
      id: 'q-3',
      category: 'Operating Systems',
      question: 'What phenomenon occurs when excessive page faults cause the operating system to spend more time swapping pages than executing instructions?',
      options: ['Starvation', 'Internal Fragmentation', 'Thrashing', 'Belady\'s Anomaly'],
      correctIndex: 2,
      explanation: 'Thrashing occurs when the total working sets of active processes exceed available physical memory, forcing continuous page faults and disk I/O.',
    ),
    QuizQuestion(
      id: 'q-4',
      category: 'Operating Systems',
      question: 'Belady\'s Anomaly can occur in which page replacement algorithm?',
      options: ['Optimal Page Replacement', 'Least Recently Used (LRU)', 'First-In, First-Out (FIFO)', 'Least Frequently Used (LFU)'],
      correctIndex: 2,
      explanation: 'Belady\'s Anomaly is the counter-intuitive phenomenon where increasing the number of page frames results in more page faults under FIFO.',
    ),
    QuizQuestion(
      id: 'q-5',
      category: 'Computer Networks',
      question: 'How many usable host IP addresses are available in an IPv4 subnet with a /27 prefix?',
      options: ['32', '30', '28', '62'],
      correctIndex: 1,
      explanation: '/27 has 32 - 27 = 5 host bits. Total addresses = 2^5 = 32. Subtracting 2 for Network Address and Broadcast IP leaves 30 usable host addresses.',
    ),
    QuizQuestion(
      id: 'q-6',
      category: 'Programming',
      question: 'What is the amortized time complexity of inserting an element into a dynamic array (like std::vector or ArrayList)?',
      options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
      correctIndex: 2,
      explanation: 'Although individual resizing operations take O(N), because capacity doubles, the cost spread over N insertions yields O(1) amortized time.',
    ),
    QuizQuestion(
      id: 'q-7',
      category: 'Aptitude',
      question: 'A pipe fills a tank in 6 hours, while another empties it in 8 hours. If both are opened together, how long will it take to fill the tank?',
      options: ['14 hours', '24 hours', '18 hours', '20 hours'],
      correctIndex: 1,
      explanation: 'Net fill rate = 1/6 - 1/8 = (4 - 3)/24 = 1/24 tank per hour. Therefore, it takes 24 hours to fill the tank.',
    ),
  ];

  static List<StudyLog> get studyLogs => [
    StudyLog(date: '2026-10-09', minutesStudied: 240, subjectName: 'DBMS'),
    StudyLog(date: '2026-10-08', minutesStudied: 180, subjectName: 'DSA'),
    StudyLog(date: '2026-10-07', minutesStudied: 210, subjectName: 'Operating Systems'),
    StudyLog(date: '2026-10-06', minutesStudied: 150, subjectName: 'Networks'),
    StudyLog(date: '2026-10-05', minutesStudied: 270, subjectName: 'Aptitude'),
    StudyLog(date: '2026-10-04', minutesStudied: 180, subjectName: 'Programming'),
    StudyLog(date: '2026-10-03', minutesStudied: 120, subjectName: 'Data Mining'),
  ];
}

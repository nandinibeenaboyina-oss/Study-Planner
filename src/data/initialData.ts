import { UserProfile, Subject, StudyTask, StudyNote, QuizQuestion, StudyLog } from '../types';

export const initialProfile: UserProfile = {
  name: 'Alex Sharma',
  email: 'alex.cse@college.edu',
  rollNumber: '22BCE1048',
  semester: 'Semester 6',
  branch: 'B.Tech Computer Science & Engineering',
  targetCgpa: 9.2,
  currentCgpa: 8.75,
  bio: 'Preparing for Semester University Exams & CSE Technical Placements. Focused on Core Systems & Algorithms.',
  dailyGoalHours: 4.5
};

export const initialSubjects: Subject[] = [
  {
    id: 'sub-1',
    name: 'Database Management Systems',
    code: 'CS301',
    category: 'Core CSE',
    description: 'Relational Model, SQL, Normalization (1NF-BCNF), ACID, Concurrency Control & B+ Trees.',
    examDate: '2026-11-15',
    priority: 'High',
    totalTopics: 10,
    completedTopics: 7,
    colorHex: '#8b5cf6',
    units: [
      {
        id: 'dbms-u1',
        unitNumber: 'Unit 1',
        unitTitle: 'Foundations & Database Architecture',
        topics: [
          {
            id: 'dbms-t1',
            title: '3-Tier Architecture & Data Independence',
            youtubeUrl: 'https://www.youtube.com/results?search_query=dbms+architecture+3+tier+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=dbms+3+tier+architecture+geeksforgeeks+notes',
            isCompleted: true
          },
          {
            id: 'dbms-t2',
            title: 'ER Modeling & Relational Schema Mapping',
            youtubeUrl: 'https://www.youtube.com/results?search_query=er+model+to+relational+mapping+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=er+diagram+to+relational+model+notes+pdf',
            isCompleted: true
          }
        ]
      },
      {
        id: 'dbms-u2',
        unitNumber: 'Unit 2',
        unitTitle: 'Relational Model & Advanced SQL',
        topics: [
          {
            id: 'dbms-t3',
            title: 'Relational Algebra (Selection, Projection, Joins)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=relational+algebra+in+dbms+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=relational+algebra+operators+geeksforgeeks',
            isCompleted: true
          },
          {
            id: 'dbms-t4',
            title: 'Complex SQL Queries, Nested Subqueries & Views',
            youtubeUrl: 'https://www.youtube.com/results?search_query=sql+nested+subqueries+and+joins+tutorial',
            notesUrl: 'https://www.google.com/search?q=sql+subqueries+joins+cheatsheet+geeksforgeeks',
            isCompleted: true
          }
        ]
      },
      {
        id: 'dbms-u3',
        unitNumber: 'Unit 3',
        unitTitle: 'Normalization & Schema Refinement',
        topics: [
          {
            id: 'dbms-t5',
            title: 'Functional Dependencies & Closure of Attributes',
            youtubeUrl: 'https://www.youtube.com/results?search_query=functional+dependency+closure+attribute+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=functional+dependencies+in+dbms+notes',
            isCompleted: true
          },
          {
            id: 'dbms-t6',
            title: 'Normal Forms (1NF, 2NF, 3NF & BCNF Decomposition)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=normalization+dbms+1nf+2nf+3nf+bcnf+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=normalization+in+dbms+geeksforgeeks+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'dbms-u4',
        unitNumber: 'Unit 4',
        unitTitle: 'Transactions & Concurrency Control',
        topics: [
          {
            id: 'dbms-t7',
            title: 'Transaction ACID Properties & Schedules',
            youtubeUrl: 'https://www.youtube.com/results?search_query=acid+properties+dbms+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=acid+properties+transactions+dbms+notes',
            isCompleted: true
          },
          {
            id: 'dbms-t8',
            title: 'Two-Phase Locking (2PL) Protocol & Deadlock Handling',
            youtubeUrl: 'https://www.youtube.com/results?search_query=two+phase+locking+2pl+dbms+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=two+phase+locking+concurrency+control+geeksforgeeks',
            isCompleted: false
          }
        ]
      },
      {
        id: 'dbms-u5',
        unitNumber: 'Unit 5',
        unitTitle: 'File Storage & Indexing Mechanisms',
        topics: [
          {
            id: 'dbms-t9',
            title: 'B-Tree & B+ Tree Indexing Operations',
            youtubeUrl: 'https://www.youtube.com/results?search_query=b+plus+tree+insertion+deletion+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=b+plus+tree+indexing+notes+geeksforgeeks',
            isCompleted: false
          },
          {
            id: 'dbms-t10',
            title: 'Hashing Techniques: Static vs Extendible Hashing',
            youtubeUrl: 'https://www.youtube.com/results?search_query=extendible+hashing+dbms+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=extendible+hashing+in+dbms+notes',
            isCompleted: false
          }
        ]
      }
    ]
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
    completedTopics: 6,
    colorHex: '#7c3aed',
    units: [
      {
        id: 'os-u1',
        unitNumber: 'Unit 1',
        unitTitle: 'Process Management & System Calls',
        topics: [
          {
            id: 'os-t1',
            title: 'Process Lifecycle, PCB & Context Switching',
            youtubeUrl: 'https://www.youtube.com/results?search_query=process+state+and+pcb+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=process+states+and+pcb+geeksforgeeks+notes',
            isCompleted: true
          },
          {
            id: 'os-t2',
            title: 'Multithreading & User vs Kernel Threads',
            youtubeUrl: 'https://www.youtube.com/results?search_query=user+level+threads+vs+kernel+level+threads+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=user+threads+vs+kernel+threads+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'os-u2',
        unitNumber: 'Unit 2',
        unitTitle: 'CPU Scheduling Algorithms',
        topics: [
          {
            id: 'os-t3',
            title: 'Non-Preemptive & Preemptive Scheduling (FCFS, SJF, SRTF)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=sjf+scheduling+algorithm+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=cpu+scheduling+algorithms+notes+pdf+geeksforgeeks',
            isCompleted: true
          },
          {
            id: 'os-t4',
            title: 'Round Robin & Multilevel Feedback Queue Scheduling',
            youtubeUrl: 'https://www.youtube.com/results?search_query=round+robin+scheduling+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=round+robin+scheduling+algorithm+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'os-u3',
        unitNumber: 'Unit 3',
        unitTitle: 'Process Synchronization & Concurrency',
        topics: [
          {
            id: 'os-t5',
            title: 'Critical Section Problem & Peterson Solution',
            youtubeUrl: 'https://www.youtube.com/results?search_query=critical+section+problem+peterson+solution+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=critical+section+peterson+solution+notes',
            isCompleted: true
          },
          {
            id: 'os-t6',
            title: 'Semaphores & Classical Synchronization Problems (Dining Philosophers, Readers-Writers)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=semaphores+dining+philosophers+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=semaphores+producer+consumer+problem+geeksforgeeks',
            isCompleted: true
          }
        ]
      },
      {
        id: 'os-u4',
        unitNumber: 'Unit 4',
        unitTitle: 'Deadlocks: Characterization & Resolution',
        topics: [
          {
            id: 'os-t7',
            title: '4 Coffman Conditions & Deadlock Prevention',
            youtubeUrl: 'https://www.youtube.com/results?search_query=deadlock+conditions+and+prevention+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=deadlock+conditions+prevention+notes',
            isCompleted: false
          },
          {
            id: 'os-t8',
            title: 'Banker Algorithm for Deadlock Avoidance',
            youtubeUrl: 'https://www.youtube.com/results?search_query=banker+algorithm+deadlock+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=bankers+algorithm+geeksforgeeks+notes',
            isCompleted: false
          }
        ]
      },
      {
        id: 'os-u5',
        unitNumber: 'Unit 5',
        unitTitle: 'Memory Management & Virtual Memory',
        topics: [
          {
            id: 'os-t9',
            title: 'Paging, Segmentation, TLB & Effective Memory Access Time',
            youtubeUrl: 'https://www.youtube.com/results?search_query=paging+and+tlb+operating+system+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=paging+in+operating+system+notes',
            isCompleted: false
          },
          {
            id: 'os-t10',
            title: 'Page Replacement Algorithms (FIFO, LRU, Optimal) & Thrashing',
            youtubeUrl: 'https://www.youtube.com/results?search_query=page+replacement+algorithms+lru+fifo+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=page+replacement+algorithms+lru+optimal+geeksforgeeks',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'sub-3',
    name: 'Computer Networks',
    code: 'CS303',
    category: 'Core CSE',
    description: 'OSI & TCP/IP Stack, Subnetting, Routing Protocols, TCP Flow/Congestion Control & DNS/HTTP.',
    examDate: '2026-11-22',
    priority: 'Medium',
    totalTopics: 8,
    completedTopics: 4,
    colorHex: '#6366f1',
    units: [
      {
        id: 'cn-u1',
        unitNumber: 'Unit 1',
        unitTitle: 'Network Models & Physical Layer',
        topics: [
          {
            id: 'cn-t1',
            title: 'OSI 7-Layer Reference Model vs TCP/IP Suite',
            youtubeUrl: 'https://www.youtube.com/results?search_query=osi+model+7+layers+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=osi+model+layers+geeksforgeeks+notes',
            isCompleted: true
          },
          {
            id: 'cn-t2',
            title: 'Data Link Layer: Framing & CRC Error Detection',
            youtubeUrl: 'https://www.youtube.com/results?search_query=cyclic+redundancy+check+crc+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=crc+error+detection+notes+pdf',
            isCompleted: true
          }
        ]
      },
      {
        id: 'cn-u2',
        unitNumber: 'Unit 2',
        unitTitle: 'Data Link Flow Control Protocols',
        topics: [
          {
            id: 'cn-t3',
            title: 'Sliding Window Protocols (Stop & Wait, Go-Back-N, Selective Repeat)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=sliding+window+protocol+go+back+n+selective+repeat+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=sliding+window+protocol+gbn+sr+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'cn-u3',
        unitNumber: 'Unit 3',
        unitTitle: 'Network Layer: Addressing & Routing',
        topics: [
          {
            id: 'cn-t4',
            title: 'IPv4 Subnetting, CIDR & Masking Calculations',
            youtubeUrl: 'https://www.youtube.com/results?search_query=ip+addressing+subnetting+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=subnetting+cidr+calculations+geeksforgeeks',
            isCompleted: true
          },
          {
            id: 'cn-t5',
            title: 'Routing Algorithms: Distance Vector (Bellman-Ford) vs Link State (Dijkstra)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=distance+vector+vs+link+state+routing+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=dijkstra+link+state+routing+geeksforgeeks',
            isCompleted: false
          }
        ]
      },
      {
        id: 'cn-u4',
        unitNumber: 'Unit 4',
        unitTitle: 'Transport Layer Protocols',
        topics: [
          {
            id: 'cn-t6',
            title: 'TCP 3-Way Handshake & 4-Way Connection Teardown',
            youtubeUrl: 'https://www.youtube.com/results?search_query=tcp+3+way+handshake+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=tcp+connection+handshake+teardown+notes',
            isCompleted: false
          },
          {
            id: 'cn-t7',
            title: 'TCP Flow Control & Congestion Control (Slow Start, AIMD)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=tcp+congestion+control+aimd+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=tcp+congestion+control+slow+start+geeksforgeeks',
            isCompleted: false
          }
        ]
      },
      {
        id: 'cn-u5',
        unitNumber: 'Unit 5',
        unitTitle: 'Application Layer Services',
        topics: [
          {
            id: 'cn-t8',
            title: 'DNS Resolution, HTTP/1.1 vs HTTP/2, FTP & SMTP',
            youtubeUrl: 'https://www.youtube.com/results?search_query=dns+resolution+and+http+computer+networks+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=dns+and+http+protocols+notes+pdf',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'sub-4',
    name: 'Data Structures & Algorithms',
    code: 'CS201',
    category: 'Programming',
    description: 'Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Greedy & Time Complexity.',
    examDate: '2026-11-25',
    priority: 'High',
    totalTopics: 8,
    completedTopics: 6,
    colorHex: '#10b981',
    units: [
      {
        id: 'dsa-u1',
        unitNumber: 'Unit 1',
        unitTitle: 'Complexity & Linear Data Structures',
        topics: [
          {
            id: 'dsa-t1',
            title: 'Asymptotic Notations (Big-O, Omega, Theta) & Master Theorem',
            youtubeUrl: 'https://www.youtube.com/results?search_query=master+theorem+algorithm+abdul+bari',
            notesUrl: 'https://www.google.com/search?q=asymptotic+analysis+master+theorem+notes',
            isCompleted: true
          },
          {
            id: 'dsa-t2',
            title: 'Arrays, Two Pointers & Sliding Window Patterns',
            youtubeUrl: 'https://www.youtube.com/results?search_query=sliding+window+technique+striver',
            notesUrl: 'https://www.google.com/search?q=sliding+window+two+pointer+patterns+leetcode+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'dsa-u2',
        unitNumber: 'Unit 2',
        unitTitle: 'Linked Lists, Stacks & Queues',
        topics: [
          {
            id: 'dsa-t3',
            title: 'Singly, Doubly & Circular Linked Lists Implementation',
            youtubeUrl: 'https://www.youtube.com/results?search_query=linked+list+data+structure+abdul+bari',
            notesUrl: 'https://www.google.com/search?q=linked+list+operations+geeksforgeeks+notes',
            isCompleted: true
          },
          {
            id: 'dsa-t4',
            title: 'Stack Applications: Infix to Postfix & Monotonic Stacks',
            youtubeUrl: 'https://www.youtube.com/results?search_query=infix+to+postfix+conversion+using+stack+abdul+bari',
            notesUrl: 'https://www.google.com/search?q=stack+applications+monotonic+stack+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'dsa-u3',
        unitNumber: 'Unit 3',
        unitTitle: 'Trees & Priority Queues',
        topics: [
          {
            id: 'dsa-t5',
            title: 'Binary Search Trees (BST), AVL Rotations & Heaps',
            youtubeUrl: 'https://www.youtube.com/results?search_query=avl+tree+rotations+abdul+bari',
            notesUrl: 'https://www.google.com/search?q=avl+tree+rotations+heap+notes+geeksforgeeks',
            isCompleted: true
          }
        ]
      },
      {
        id: 'dsa-u4',
        unitNumber: 'Unit 4',
        unitTitle: 'Graph Algorithms',
        topics: [
          {
            id: 'dsa-t6',
            title: 'Graph Traversals (BFS, DFS) & Topological Sort',
            youtubeUrl: 'https://www.youtube.com/results?search_query=graph+traversal+bfs+dfs+abdul+bari',
            notesUrl: 'https://www.google.com/search?q=bfs+dfs+topological+sort+notes',
            isCompleted: true
          },
          {
            id: 'dsa-t7',
            title: 'Shortest Path (Dijkstra, Bellman-Ford) & Minimum Spanning Tree (Kruskal, Prim)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=dijkstra+algorithm+abdul+bari',
            notesUrl: 'https://www.google.com/search?q=dijkstra+kruskal+prims+algorithm+notes',
            isCompleted: false
          }
        ]
      },
      {
        id: 'dsa-u5',
        unitNumber: 'Unit 5',
        unitTitle: 'Dynamic Programming & Greedy Approaches',
        topics: [
          {
            id: 'dsa-t8',
            title: '0/1 Knapsack, Longest Common Subsequence (LCS) & Coin Change',
            youtubeUrl: 'https://www.youtube.com/results?search_query=0+1+knapsack+dynamic+programming+abdul+bari',
            notesUrl: 'https://www.google.com/search?q=0+1+knapsack+problem+dp+notes+geeksforgeeks',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'sub-5',
    name: 'Machine Learning',
    code: 'CS402',
    category: 'Core CSE',
    description: 'Supervised Learning, Regression, Classification, Decision Trees, SVM, Clustering & Neural Networks.',
    examDate: '2026-12-02',
    priority: 'Medium',
    totalTopics: 6,
    completedTopics: 4,
    colorHex: '#a855f7',
    units: [
      {
        id: 'ml-u1',
        unitNumber: 'Unit 1',
        unitTitle: 'Supervised Learning & Regression',
        topics: [
          {
            id: 'ml-t1',
            title: 'Linear & Logistic Regression, Cost Function & Gradient Descent',
            youtubeUrl: 'https://www.youtube.com/results?search_query=linear+regression+gradient+descent+statquest',
            notesUrl: 'https://www.google.com/search?q=linear+regression+gradient+descent+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'ml-u2',
        unitNumber: 'Unit 2',
        unitTitle: 'Tree Models & Ensembles',
        topics: [
          {
            id: 'ml-t2',
            title: 'Decision Trees (ID3, C4.5), Entropy & Information Gain',
            youtubeUrl: 'https://www.youtube.com/results?search_query=decision+trees+entropy+information+gain+statquest',
            notesUrl: 'https://www.google.com/search?q=decision+trees+entropy+notes+geeksforgeeks',
            isCompleted: true
          },
          {
            id: 'ml-t3',
            title: 'Random Forests, Bagging & Boosting (AdaBoost, XGBoost)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=random+forest+adaboost+xgboost+statquest',
            notesUrl: 'https://www.google.com/search?q=ensemble+learning+random+forest+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'ml-u3',
        unitNumber: 'Unit 3',
        unitTitle: 'Support Vector Machines & Unsupervised Clustering',
        topics: [
          {
            id: 'ml-t4',
            title: 'Support Vector Machines (SVM), Hyperplanes & Kernel Trick',
            youtubeUrl: 'https://www.youtube.com/results?search_query=support+vector+machines+statquest',
            notesUrl: 'https://www.google.com/search?q=svm+kernel+trick+notes+geeksforgeeks',
            isCompleted: true
          },
          {
            id: 'ml-t5',
            title: 'K-Means Clustering & Principal Component Analysis (PCA)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=k+means+clustering+pca+statquest',
            notesUrl: 'https://www.google.com/search?q=k+means+clustering+pca+notes',
            isCompleted: false
          }
        ]
      },
      {
        id: 'ml-u4',
        unitNumber: 'Unit 4',
        unitTitle: 'Deep Learning & Neural Networks',
        topics: [
          {
            id: 'ml-t6',
            title: 'Multilayer Perceptron, Activation Functions & Backpropagation',
            youtubeUrl: 'https://www.youtube.com/results?search_query=neural+networks+backpropagation+3blue1brown',
            notesUrl: 'https://www.google.com/search?q=neural+network+backpropagation+notes+pdf',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'sub-6',
    name: 'Data Mining & Warehousing',
    code: 'CS405',
    category: 'Core CSE',
    description: 'ETL, Data Preprocessing, OLAP Cubes, Association Rules (Apriori), FP-Tree & Cluster Analysis.',
    examDate: '2026-12-05',
    priority: 'Medium',
    totalTopics: 5,
    completedTopics: 3,
    colorHex: '#3b82f6',
    units: [
      {
        id: 'dm-u1',
        unitNumber: 'Unit 1',
        unitTitle: 'Data Warehousing & OLAP Architecture',
        topics: [
          {
            id: 'dm-t1',
            title: 'Data Warehouse Architecture, ETL Pipelines & Schema Models (Star, Snowflake)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=data+warehouse+architecture+star+snowflake+schema+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=data+warehouse+star+snowflake+schema+geeksforgeeks',
            isCompleted: true
          },
          {
            id: 'dm-t2',
            title: 'OLAP Operations: Roll-up, Drill-down, Slice, Dice & Pivot',
            youtubeUrl: 'https://www.youtube.com/results?search_query=olap+operations+roll+up+drill+down+slice+dice+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=olap+operations+data+warehouse+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'dm-u2',
        unitNumber: 'Unit 2',
        unitTitle: 'Association Rule Mining',
        topics: [
          {
            id: 'dm-t3',
            title: 'Apriori Algorithm & FP-Growth Frequent Pattern Trees',
            youtubeUrl: 'https://www.youtube.com/results?search_query=apriori+algorithm+data+mining+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=apriori+algorithm+fp+growth+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'dm-u3',
        unitNumber: 'Unit 3',
        unitTitle: 'Classification & Clustering in Data Mining',
        topics: [
          {
            id: 'dm-t4',
            title: 'Data Preprocessing: Cleaning, Integration, Reduction & Transformation',
            youtubeUrl: 'https://www.youtube.com/results?search_query=data+preprocessing+techniques+data+mining+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=data+preprocessing+steps+geeksforgeeks',
            isCompleted: false
          },
          {
            id: 'dm-t5',
            title: 'Hierarchical & Density-Based Clustering (DBSCAN)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=dbscan+clustering+algorithm+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=dbscan+clustering+notes+pdf',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'sub-7',
    name: 'Software Engineering',
    code: 'CS304',
    category: 'Core CSE',
    description: 'SDLC Methodologies, Agile Scrum, Requirement Engineering, UML Diagrams, Software Testing & CI/CD.',
    examDate: '2026-12-08',
    priority: 'Low',
    totalTopics: 5,
    completedTopics: 4,
    colorHex: '#06b6d4',
    units: [
      {
        id: 'se-u1',
        unitNumber: 'Unit 1',
        unitTitle: 'Software Process Models & Agile',
        topics: [
          {
            id: 'se-t1',
            title: 'Waterfall, Spiral, V-Model & Agile Scrum Framework',
            youtubeUrl: 'https://www.youtube.com/results?search_query=agile+vs+waterfall+model+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=software+engineering+process+models+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'se-u2',
        unitNumber: 'Unit 2',
        unitTitle: 'Requirements & UML Design',
        topics: [
          {
            id: 'se-t2',
            title: 'Functional vs Non-Functional Requirements & SRS Standards',
            youtubeUrl: 'https://www.youtube.com/results?search_query=software+requirements+specification+srs+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=srs+software+engineering+notes',
            isCompleted: true
          },
          {
            id: 'se-t3',
            title: 'UML Diagrams: Use Case, Class, Sequence & Activity Diagrams',
            youtubeUrl: 'https://www.youtube.com/results?search_query=uml+diagrams+class+sequence+use+case+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=uml+diagrams+geeksforgeeks+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'se-u3',
        unitNumber: 'Unit 3',
        unitTitle: 'Testing, Quality & Maintenance',
        topics: [
          {
            id: 'se-t4',
            title: 'Black-box vs White-box Testing (Equivalence Partitioning, Boundary Value)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=black+box+vs+white+box+testing+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=black+box+white+box+testing+notes',
            isCompleted: true
          },
          {
            id: 'se-t5',
            title: 'Cyclomatic Complexity & Integration/Regression Testing',
            youtubeUrl: 'https://www.youtube.com/results?search_query=cyclomatic+complexity+software+engineering+gate+smashers',
            notesUrl: 'https://www.google.com/search?q=cyclomatic+complexity+formula+notes',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'sub-8',
    name: 'Quantitative Aptitude & Logic',
    code: 'APT101',
    category: 'Aptitude',
    description: 'Percentages, Profit & Loss, Speed-Time-Distance, Permutations & Combinations, Data Interpretation.',
    examDate: '2026-11-10',
    priority: 'High',
    totalTopics: 6,
    completedTopics: 4,
    colorHex: '#f59e0b',
    units: [
      {
        id: 'apt-u1',
        unitNumber: 'Unit 1',
        unitTitle: 'Commercial & Arithmetic Aptitude',
        topics: [
          {
            id: 'apt-t1',
            title: 'Percentages, Profit & Loss, Discount Formulas',
            youtubeUrl: 'https://www.youtube.com/results?search_query=percentage+profit+and+loss+tricks+career+ride',
            notesUrl: 'https://www.google.com/search?q=percentage+profit+and+loss+shortcuts+notes',
            isCompleted: true
          },
          {
            id: 'apt-t2',
            title: 'Time & Work, Pipes & Cisterns Shortcuts',
            youtubeUrl: 'https://www.youtube.com/results?search_query=time+and+work+shortcuts+feel+free+to+learn',
            notesUrl: 'https://www.google.com/search?q=time+and+work+formulas+shortcuts+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'apt-u2',
        unitNumber: 'Unit 2',
        unitTitle: 'Speed, Time & Kinematics',
        topics: [
          {
            id: 'apt-t3',
            title: 'Speed, Time, Distance & Relative Velocity in Trains',
            youtubeUrl: 'https://www.youtube.com/results?search_query=speed+time+distance+trains+aptitude+tricks',
            notesUrl: 'https://www.google.com/search?q=speed+time+distance+trains+formulas+notes',
            isCompleted: true
          }
        ]
      },
      {
        id: 'apt-u3',
        unitNumber: 'Unit 3',
        unitTitle: 'Probability & Combinatorics',
        topics: [
          {
            id: 'apt-t4',
            title: 'Permutations & Combinations (Arrangements & Selections)',
            youtubeUrl: 'https://www.youtube.com/results?search_query=permutations+and+combinations+placement+aptitude',
            notesUrl: 'https://www.google.com/search?q=permutation+combination+formulas+notes',
            isCompleted: true
          },
          {
            id: 'apt-t5',
            title: 'Conditional Probability & Bayes Theorem',
            youtubeUrl: 'https://www.youtube.com/results?search_query=probability+bayes+theorem+aptitude+tricks',
            notesUrl: 'https://www.google.com/search?q=probability+formulas+shortcuts+geeksforgeeks',
            isCompleted: false
          }
        ]
      },
      {
        id: 'apt-u4',
        unitNumber: 'Unit 4',
        unitTitle: 'Data Interpretation & Logical Reasoning',
        topics: [
          {
            id: 'apt-t6',
            title: 'Pie Charts, Bar Graphs & Table Analysis',
            youtubeUrl: 'https://www.youtube.com/results?search_query=data+interpretation+pie+chart+bar+graph+tricks',
            notesUrl: 'https://www.google.com/search?q=data+interpretation+shortcuts+notes',
            isCompleted: false
          }
        ]
      }
    ]
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
    subjectName: 'Quantitative Aptitude & Logic',
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

export const initialStudyLogs: StudyLog[] = [
  { date: '2026-10-09', minutesStudied: 240, subjectName: 'DBMS' },
  { date: '2026-10-08', minutesStudied: 180, subjectName: 'DSA' },
  { date: '2026-10-07', minutesStudied: 210, subjectName: 'Operating Systems' },
  { date: '2026-10-06', minutesStudied: 150, subjectName: 'Networks' },
  { date: '2026-10-05', minutesStudied: 270, subjectName: 'Aptitude' },
  { date: '2026-10-04', minutesStudied: 180, subjectName: 'Programming' },
  { date: '2026-10-03', minutesStudied: 120, subjectName: 'Data Mining' }
];

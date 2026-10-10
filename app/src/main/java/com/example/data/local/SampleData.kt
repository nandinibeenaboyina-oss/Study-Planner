package com.example.data.local

import com.example.data.model.*

object SampleData {

    fun getDefaultProfile(): UserProfile = UserProfile(
        id = 1,
        name = "Alex Sharma",
        email = "alex.cse@btech.edu",
        rollNumber = "22BCE1048",
        semester = "Semester 6",
        branch = "B.Tech Computer Science & Engineering",
        targetCgpa = 9.2,
        currentCgpa = 8.75,
        bio = "Preparing for On-Campus Placement Drives & GATE CSE 2027.",
        dailyGoalHours = 4.5f
    )

    fun getDefaultSubjects(): List<Subject> = listOf(
        Subject(
            name = "Database Management Systems",
            code = "CS301",
            category = "Core CSE",
            description = "Relational models, SQL, Normalization (1NF-BCNF), Transactions, Indexing & B+ Trees.",
            examDate = "2026-11-15",
            priority = "High",
            totalTopics = 12,
            completedTopics = 9,
            colorHex = "#2563EB"
        ),
        Subject(
            name = "Operating Systems",
            code = "CS302",
            category = "Core CSE",
            description = "Process scheduling, Synchronization & Semaphores, Deadlocks, Virtual Memory & Paging.",
            examDate = "2026-11-18",
            priority = "High",
            totalTopics = 10,
            completedTopics = 7,
            colorHex = "#3B82F6"
        ),
        Subject(
            name = "Computer Networks",
            code = "CS303",
            category = "Core CSE",
            description = "OSI & TCP/IP stack, Routing protocols (OSPF, BGP), Flow/Congestion control, Sockets.",
            examDate = "2026-11-22",
            priority = "Medium",
            totalTopics = 10,
            completedTopics = 6,
            colorHex = "#0284C7"
        ),
        Subject(
            name = "Data Structures & Algorithms",
            code = "CS201",
            category = "Programming",
            description = "Arrays, Linked Lists, Trees, Graphs, DP, Greedy, Divide & Conquer, Time Complexity.",
            examDate = "2026-11-25",
            priority = "High",
            totalTopics = 16,
            completedTopics = 13,
            colorHex = "#10B981"
        ),
        Subject(
            name = "Data Mining & Warehousing",
            code = "CS401",
            category = "Core CSE",
            description = "ETL pipelines, Association rule mining (Apriori), K-Means clustering, Classification.",
            examDate = "2026-11-28",
            priority = "Medium",
            totalTopics = 8,
            completedTopics = 5,
            colorHex = "#8B5CF6"
        ),
        Subject(
            name = "Machine Learning",
            code = "CS402",
            category = "Core CSE",
            description = "Supervised & unsupervised learning, Linear regression, SVM, Neural networks, Loss metrics.",
            examDate = "2026-12-02",
            priority = "Medium",
            totalTopics = 10,
            completedTopics = 6,
            colorHex = "#6366F1"
        ),
        Subject(
            name = "Software Engineering",
            code = "CS304",
            category = "Core CSE",
            description = "Agile methodologies, SDLC models, Design Patterns, Testing (Unit, Integration), CI/CD.",
            examDate = "2026-12-05",
            priority = "Low",
            totalTopics = 8,
            completedTopics = 7,
            colorHex = "#14B8A6"
        ),
        Subject(
            name = "Quantitative Aptitude",
            code = "APT101",
            category = "Aptitude",
            description = "Percentages, Profit & Loss, Speed-Distance-Time, Permutations & Combinations, Probability.",
            examDate = "2026-11-10",
            priority = "High",
            totalTopics = 14,
            completedTopics = 10,
            colorHex = "#F59E0B"
        ),
        Subject(
            name = "Logical Reasoning",
            code = "LR101",
            category = "Reasoning",
            description = "Number series, Syllogisms, Blood relations, Direction sense, Coding-decoding, Seating arrangement.",
            examDate = "2026-11-12",
            priority = "Medium",
            totalTopics = 12,
            completedTopics = 8,
            colorHex = "#D97706"
        ),
        Subject(
            name = "English Verbal Ability",
            code = "ENG101",
            category = "English",
            description = "Reading comprehension, Sentence correction, Vocabulary, Active-Passive, Idioms.",
            examDate = "2026-11-14",
            priority = "Low",
            totalTopics = 8,
            completedTopics = 6,
            colorHex = "#EC4899"
        )
    )

    fun getDefaultTasks(): List<StudyTask> = listOf(
        StudyTask(
            title = "Revise DBMS B+ Trees & Indexing",
            subjectName = "Database Management Systems",
            description = "Practice insertion and deletion algorithms for B+ tree indices of order 4.",
            date = "2026-10-10",
            startTime = "09:00 AM",
            durationMinutes = 90,
            priority = "High",
            status = "In Progress"
        ),
        StudyTask(
            title = "Solve 5 LeetCode DP Problems",
            subjectName = "Data Structures & Algorithms",
            description = "0/1 Knapsack, Coin Change, Longest Common Subsequence, Edit Distance.",
            date = "2026-10-10",
            startTime = "11:30 AM",
            durationMinutes = 120,
            priority = "High",
            status = "Pending"
        ),
        StudyTask(
            title = "OS Banker's Algorithm Deadlock Avoidance",
            subjectName = "Operating Systems",
            description = "Solve 4 safety state numerical problems with allocation and need matrices.",
            date = "2026-10-10",
            startTime = "03:00 PM",
            durationMinutes = 60,
            priority = "Medium",
            status = "Pending"
        ),
        StudyTask(
            title = "Quantitative Aptitude: Speed, Time & Trains",
            subjectName = "Quantitative Aptitude",
            description = "Practice 20 placement questions from RS Aggarwal & prep portals.",
            date = "2026-10-10",
            startTime = "05:00 PM",
            durationMinutes = 60,
            priority = "Medium",
            status = "Completed"
        ),
        StudyTask(
            title = "Computer Networks: Subnetting & CIDR",
            subjectName = "Computer Networks",
            description = "Calculate network ID, broadcast IP, and usable hosts for /26 and /28 subnets.",
            date = "2026-10-11",
            startTime = "10:00 AM",
            durationMinutes = 75,
            priority = "Medium",
            status = "Pending"
        ),
        StudyTask(
            title = "Apriori Algorithm & Association Rules",
            subjectName = "Data Mining & Warehousing",
            description = "Compute Support, Confidence, and Lift for sample transaction dataset.",
            date = "2026-10-11",
            startTime = "02:00 PM",
            durationMinutes = 60,
            priority = "Low",
            status = "Pending"
        )
    )

    fun getDefaultNotes(): List<StudyNote> = listOf(
        StudyNote(
            title = "ACID Properties in DBMS",
            subjectName = "Database Management Systems",
            content = "Atomicity: All-or-nothing (Undo logs).\nConsistency: Database preserves integrity constraints before & after.\nIsolation: Concurrent transactions execute as if sequential (2PL, Multi-version Concurrency Control MVCC).\nDurability: Committed updates survive system crashes (Redo logs / Write-Ahead Logging WAL).",
            category = "Important",
            tags = "dbms,transactions,acid,gate",
            colorTag = "#DBEAFE"
        ),
        StudyNote(
            title = "Four Coffman Conditions for Deadlock",
            subjectName = "Operating Systems",
            content = "1. Mutual Exclusion: At least one resource held non-shareably.\n2. Hold and Wait: Process holds resource while waiting for another.\n3. No Preemption: Resources cannot be forcibly seized.\n4. Circular Wait: P0 waits for P1, P1 waits for P2... Pn waits for P0.\n*Deadlock prevention eliminates at least one condition.",
            category = "Formula",
            tags = "os,deadlock,interview",
            colorTag = "#FEF3C7"
        ),
        StudyNote(
            title = "TCP 3-Way Handshake & Teardown",
            subjectName = "Computer Networks",
            content = "Connection Establishment:\n1. Client -> SYN (seq=x)\n2. Server -> SYN-ACK (seq=y, ack=x+1)\n3. Client -> ACK (seq=x+1, ack=y+1)\n\nTermination (4-Way):\n1. FIN -> 2. ACK -> 3. FIN -> 4. ACK with TIME_WAIT state.",
            category = "Concept",
            tags = "networks,tcp,handshake,placement",
            colorTag = "#D1FAE5"
        ),
        StudyNote(
            title = "Quick Select Algorithm for K-th Largest",
            subjectName = "Data Structures & Algorithms",
            content = "Average Time Complexity: O(N), Worst Case: O(N^2).\nPartition array around pivot (Lomuto or Hoare). If pivot index == N - K, return array[pivot]. If pivot index < N - K, search right sub-array; else search left.",
            category = "Interview",
            tags = "dsa,algorithms,sorting,faang",
            colorTag = "#FCE7F3"
        )
    )

    fun getDefaultQuizQuestions(): List<QuizQuestion> = listOf(
        // DBMS
        QuizQuestion(
            category = "DBMS",
            question = "Which normal form strictly eliminates transitive functional dependencies?",
            optionA = "First Normal Form (1NF)",
            optionB = "Second Normal Form (2NF)",
            optionC = "Third Normal Form (3NF)",
            optionD = "Boyce-Codd Normal Form (BCNF)",
            correctOptionIndex = 2,
            explanation = "3NF requires the relation to be in 2NF and have no transitive dependencies (i.e. if X -> Y and Y -> Z where Z is non-prime, then X -> Z is a transitive dependency that 3NF removes)."
        ),
        QuizQuestion(
            category = "DBMS",
            question = "In transaction management, which mechanism ensures the Atomicity and Durability properties?",
            optionA = "Two-Phase Locking (2PL)",
            optionB = "Write-Ahead Logging (WAL)",
            optionC = "Timestamp Ordering Protocol",
            optionD = "Deadlock Detection Graph",
            correctOptionIndex = 1,
            explanation = "Write-Ahead Logging (WAL) ensures Atomicity (via Undo logs on abort) and Durability (via Redo logs after commit) before dirty pages are written to disk."
        ),
        QuizQuestion(
            category = "DBMS",
            question = "Why are B+ trees preferred over Binary Search Trees for database indices?",
            optionA = "B+ trees use less RAM memory",
            optionB = "B+ trees have lower depth and minimize expensive disk I/O operations",
            optionC = "Binary search trees are faster for range queries",
            optionD = "B+ trees do not require balanced height",
            correctOptionIndex = 1,
            explanation = "B+ trees have a high branching factor (fan-out), which drastically reduces tree height, meaning fewer disk block reads are required to locate a record."
        ),

        // Operating Systems
        QuizQuestion(
            category = "Operating Systems",
            question = "What phenomenon occurs when excessive page faults cause the OS to spend more time swapping pages than executing instructions?",
            optionA = "Starvation",
            optionB = "Belady's Anomaly",
            optionC = "Thrashing",
            optionD = "Internal Fragmentation",
            correctOptionIndex = 2,
            explanation = "Thrashing happens when the sum of working sets of active processes exceeds available physical memory frames, causing continuous disk swapping."
        ),
        QuizQuestion(
            category = "Operating Systems",
            question = "Which CPU scheduling algorithm is non-preemptive and guarantees minimum average waiting time among non-preemptive algorithms?",
            optionA = "First-Come, First-Served (FCFS)",
            optionB = "Shortest Job First (SJF)",
            optionC = "Round Robin (RR)",
            optionD = "Priority Scheduling",
            correctOptionIndex = 1,
            explanation = "Shortest Job First (SJF) is mathematically optimal with respect to minimum average waiting time for a given set of stationary processes."
        ),
        QuizQuestion(
            category = "Operating Systems",
            question = "Belady's Anomaly is observed in which page replacement algorithm?",
            optionA = "Least Recently Used (LRU)",
            optionB = "Optimal Page Replacement (OPT)",
            optionC = "First-In, First-Out (FIFO)",
            optionD = "Least Frequently Used (LFU)",
            correctOptionIndex = 2,
            explanation = "Belady's Anomaly is the counter-intuitive phenomenon where increasing physical page frames increases page faults under FIFO page replacement."
        ),

        // Computer Networks
        QuizQuestion(
            category = "Computer Networks",
            question = "Which layer of the OSI model is responsible for end-to-end reliability, flow control, and segmentation?",
            optionA = "Data Link Layer",
            optionB = "Network Layer",
            optionC = "Transport Layer",
            optionD = "Session Layer",
            correctOptionIndex = 2,
            explanation = "The Transport Layer (Layer 4, e.g. TCP) provides end-to-end communication, segmentation, flow control, and error recovery."
        ),
        QuizQuestion(
            category = "Computer Networks",
            question = "How many usable host IP addresses are available in a subnet with mask /27?",
            optionA = "32",
            optionB = "30",
            optionC = "28",
            optionD = "62",
            correctOptionIndex = 1,
            explanation = "/27 leaves 32 - 27 = 5 host bits. Total addresses = 2^5 = 32. Subtracting 2 for Network ID and Broadcast IP gives 30 usable host IPs."
        ),

        // Programming
        QuizQuestion(
            category = "Programming",
            question = "In Java, what happens when you attempt to override a 'static' method in a child class?",
            optionA = "Compilation error occurs",
            optionB = "The method is overridden polymorphically",
            optionC = "Method Hiding occurs instead of dynamic dispatch",
            optionD = "Runtime exception is thrown",
            correctOptionIndex = 2,
            explanation = "Static methods are bound at compile time based on reference type; defining a static method with identical signature in a subclass hides the parent method rather than overriding it."
        ),
        QuizQuestion(
            category = "Programming",
            question = "What is the amortized time complexity of inserting an element into a dynamic array (e.g. ArrayList / std::vector)?",
            optionA = "O(N)",
            optionB = "O(log N)",
            optionC = "O(1)",
            optionD = "O(N log N)",
            correctOptionIndex = 2,
            explanation = "Although occasional array resizing copies N elements taking O(N), because capacity doubles, the cost spread over N insertions yields O(1) amortized time."
        ),

        // Data Mining
        QuizQuestion(
            category = "Data Mining",
            question = "What metric in Association Rule Mining measures how frequently an itemset appears in all transactions?",
            optionA = "Confidence",
            optionB = "Support",
            optionC = "Lift",
            optionD = "Leverage",
            correctOptionIndex = 1,
            explanation = "Support is the fraction of total transactions in the dataset that contain the itemset."
        ),
        QuizQuestion(
            category = "Data Mining",
            question = "Which clustering algorithm requires you to specify the number of clusters 'K' beforehand and is sensitive to outliers?",
            optionA = "DBSCAN",
            optionB = "Agglomerative Hierarchical Clustering",
            optionC = "K-Means",
            optionD = "OPTICS",
            correctOptionIndex = 2,
            explanation = "K-Means requires pre-specifying K and computes centroids using mean vectors, making centroids susceptible to distortion from extreme outliers."
        ),

        // Quantitative Aptitude
        QuizQuestion(
            category = "Aptitude",
            question = "A pipe can fill a tank in 6 hours, and another pipe can empty it in 8 hours. If both pipes are opened together, how long will it take to fill the empty tank?",
            optionA = "14 hours",
            optionB = "24 hours",
            optionC = "18 hours",
            optionD = "20 hours",
            correctOptionIndex = 1,
            explanation = "Net fill rate per hour = 1/6 - 1/8 = (4 - 3)/24 = 1/24. Thus, it takes 24 hours to fill the tank."
        ),
        QuizQuestion(
            category = "Aptitude",
            question = "A train 180 meters long is traveling at 72 km/h. How many seconds will it take to pass an electric pole?",
            optionA = "9 seconds",
            optionB = "10 seconds",
            optionC = "12 seconds",
            optionD = "8 seconds",
            correctOptionIndex = 0,
            explanation = "Speed in m/s = 72 * (5/18) = 20 m/s. Time to cross pole = Distance / Speed = 180 / 20 = 9 seconds."
        ),

        // Logical Reasoning
        QuizQuestion(
            category = "Logical Reasoning",
            question = "Find the missing number in the series: 3, 7, 15, 31, 63, ?",
            optionA = "125",
            optionB = "127",
            optionC = "129",
            optionD = "131",
            correctOptionIndex = 1,
            explanation = "Pattern is (x * 2) + 1: 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1=127."
        ),
        QuizQuestion(
            category = "Logical Reasoning",
            question = "Pointing to a photograph, Rohit said, 'She is the daughter of the only son of my grandfather.' How is the girl in the photograph related to Rohit?",
            optionA = "Aunt",
            optionB = "Mother",
            optionC = "Sister",
            optionD = "Daughter",
            correctOptionIndex = 2,
            explanation = "The only son of Rohit's grandfather is Rohit's father. The daughter of Rohit's father is Rohit's sister."
        ),

        // English Grammar
        QuizQuestion(
            category = "English Grammar",
            question = "Identify the correct sentence:",
            optionA = "Neither of the candidates have submitted their resume.",
            optionB = "Neither of the candidates has submitted their resume.",
            optionC = "Neither of the candidates are submitting their resume.",
            optionD = "Neither of candidates have submitted resumes.",
            correctOptionIndex = 1,
            explanation = "'Neither of' takes a singular verb ('has submitted')."
        )
    )

    fun getDefaultPlacementResources(): List<PlacementResource> = listOf(
        PlacementResource(
            category = "Technical",
            title = "Explain Differences Between Process and Thread",
            topic = "Operating Systems",
            difficulty = "Easy",
            question = "What is the primary difference between a process and a thread in modern operating systems?",
            answer = "A Process is an executing instance of a program with its own independent virtual address space, memory, file descriptors, and security context. Context switching between processes is relatively heavy.\nA Thread is a lightweight execution unit inside a process that shares the code, data, and heap segments of the parent process, but has its own Program Counter (PC), CPU registers, and stack memory. Context switching between threads is faster.",
            codeSnippet = "",
            isBookmarked = true
        ),
        PlacementResource(
            category = "Technical",
            title = "What is the Diamond Problem in C++ and how is it resolved?",
            topic = "Object-Oriented Programming",
            difficulty = "Medium",
            question = "How does multiple inheritance lead to ambiguity in C++, and how does virtual inheritance solve it?",
            answer = "When class D inherits from both B and C, which both inherit from base class A, class D receives two duplicate copies of class A's members, leading to compiler ambiguity.\nResolution: Use 'virtual public A' when inheriting in classes B and C. The compiler ensures only a single shared instance of base class A exists in class D.",
            codeSnippet = "class A { public: int x; };\nclass B : virtual public A {};\nclass C : virtual public A {};\nclass D : public B, public C {}; // Only 1 copy of x",
            isBookmarked = false
        ),
        PlacementResource(
            category = "Technical",
            title = "Explain Indexing in SQL & When NOT to use an Index",
            topic = "DBMS",
            difficulty = "Medium",
            question = "How do B-Tree indexes accelerate queries, and in which scenarios should an index be avoided?",
            answer = "B-Tree indexes sort column keys into a multi-level balanced tree, reducing search time from O(N) full table scan to O(log N) tree traversal.\nWhen to avoid indexes:\n1. Small tables where scanning pages is already fast.\n2. Frequently updated/inserted columns (heavy write overhead).\n3. Columns with low cardinality (e.g. Gender with only 2 values).\n4. Columns rarely queried in WHERE, JOIN, or ORDER BY clauses.",
            codeSnippet = "CREATE INDEX idx_student_email ON students(email);\nEXPLAIN SELECT * FROM students WHERE email = 'test@cse.edu';",
            isBookmarked = true
        ),
        PlacementResource(
            category = "HR Interview",
            title = "Tell Me About Yourself (Software Engineer Pitch)",
            topic = "HR Behavioral",
            difficulty = "Easy",
            question = "How to answer 'Tell me about yourself' effectively for campus recruitment?",
            answer = "Structure your pitch using the Present-Past-Future model:\n1. Present: State your current status (e.g., 'I am a final-year B.Tech CSE student passionate about backend systems and distributed databases').\n2. Past: Highlight 1-2 major technical achievements or internships (e.g., 'I recently developed a collaborative study management system using Android & Kotlin, and solved 350+ DSA problems on LeetCode').\n3. Future: Connect your skills to the hiring company (e.g., 'I admire your engineering scale in fintech and would love to contribute to resilient cloud solutions here').",
            codeSnippet = "",
            isBookmarked = true
        ),
        PlacementResource(
            category = "HR Interview",
            title = "Conflict Resolution with a Team Member (STAR Method)",
            topic = "HR Behavioral",
            difficulty = "Medium",
            question = "Describe a situation where you had a disagreement with a project teammate and how you resolved it.",
            answer = "Situation: During our 5th-semester capstone project, our frontend and backend leads disagreed on REST vs GraphQL API format.\nTask: As the backend developer, I needed to keep the project on schedule without alienating team members.\nAction: I scheduled a 30-minute sync, benchmarked our mobile bandwidth limits, and proposed REST for simpler CRUD modules while adopting GraphQL for nested analytics.\nResult: We delivered the project two days before the submission deadline with 98% test coverage.",
            codeSnippet = "",
            isBookmarked = false
        ),
        PlacementResource(
            category = "Programming Practice",
            title = "Two Sum Problem (Optimal Hash Map)",
            topic = "Data Structures & Algorithms",
            difficulty = "Easy",
            question = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            answer = "Optimal Approach: Use a Hash Map to store each number and its index. For each element num, compute complement = target - num. If complement is already in the map, return [map[complement], currentIndex]. Time: O(N), Space: O(N).",
            codeSnippet = "fun twoSum(nums: IntArray, target: Int): IntArray {\n    val map = HashMap<Int, Int>()\n    for ((i, num) in nums.withIndex()) {\n        val comp = target - num\n        if (map.containsKey(comp)) {\n            return intArrayOf(map[comp]!!, i)\n        }\n        map[num] = i\n    }\n    return intArrayOf()\n}",
            isBookmarked = true
        ),
        PlacementResource(
            category = "Programming Practice",
            title = "Reverse a Linked List (Iterative)",
            topic = "Data Structures & Algorithms",
            difficulty = "Easy",
            question = "Reverse a singly linked list in-place and return the new head pointer.",
            answer = "Maintain three pointers: prev (null), curr (head), and next. In each step, store curr.next in next, set curr.next to prev, move prev to curr, and curr to next. Time: O(N), Space: O(1).",
            codeSnippet = "fun reverseList(head: ListNode?): ListNode? {\n    var prev: ListNode? = null\n    var curr = head\n    while (curr != null) {\n        val next = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next\n    }\n    return prev\n}",
            isBookmarked = false
        ),
        PlacementResource(
            category = "Company Guide",
            title = "TCS National Qualifier Test (NQT) Pattern & Strategy",
            topic = "Company Pattern",
            difficulty = "Medium",
            question = "What is the examination pattern and preparation strategy for TCS NQT (Ninja & Digital)?",
            answer = "Sections:\n1. Foundation Section: Verbal Ability (25 mins), Reasoning Ability (25 mins), Numerical Ability (25 mins).\n2. Advanced Section (for Digital / Prime): Advanced Quantitative & Reasoning (35 mins), Advanced Coding (2 problems in 90 mins: Arrays, Strings, DP).\nStrategy: Digital cutoff requires solving both coding problems with optimal time complexity (O(N) or O(N log N)). Practice Java/C++ standard library templates.",
            codeSnippet = "",
            isBookmarked = true
        ),
        PlacementResource(
            category = "Company Guide",
            title = "Amazon SDE-1 Campus Hiring Architecture",
            topic = "Company Pattern",
            difficulty = "Hard",
            question = "What are the key stages for Amazon SDE-1 campus placement?",
            answer = "Round 1: Online Assessment (OA) with 2 DSA problems + Work Style Assessment (Amazon 16 Leadership Principles).\nRound 2 & 3: Technical rounds covering Trees, Graphs, DP, Heaps, and Time/Space complexity trade-offs.\nRound 4: Bar Raiser round focusing heavily on Leadership Principles (Customer Obsession, Ownership, Bias for Action) using STAR stories.",
            codeSnippet = "",
            isBookmarked = true
        )
    )

    fun getDefaultStudyLogs(): List<StudyLog> = listOf(
        StudyLog(date = "2026-10-09", minutesStudied = 240, subjectName = "DBMS"),
        StudyLog(date = "2026-10-08", minutesStudied = 180, subjectName = "DSA"),
        StudyLog(date = "2026-10-07", minutesStudied = 210, subjectName = "Operating Systems"),
        StudyLog(date = "2026-10-06", minutesStudied = 150, subjectName = "Networks"),
        StudyLog(date = "2026-10-05", minutesStudied = 270, subjectName = "Aptitude"),
        StudyLog(date = "2026-10-04", minutesStudied = 180, subjectName = "Programming"),
        StudyLog(date = "2026-10-03", minutesStudied = 120, subjectName = "Data Mining")
    )
}

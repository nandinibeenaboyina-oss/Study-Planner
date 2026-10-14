import 'dart:convert';
import 'package:http/http.dart' as http;

class AiCoachService {
  static const String geminiApiKey = ''; // Optional API Key

  static Future<String> askQuestion(String query) async {
    final lower = query.toLowerCase();

    // 1. Try Gemini API if an API key is configured
    if (geminiApiKey.isNotEmpty) {
      try {
        final url = Uri.parse(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$geminiApiKey',
        );
        final response = await http.post(
          url,
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'contents': [
              {
                'parts': [
                  {
                    'text':
                        'You are an expert AI Study Coach for Computer Science & Engineering college students. Provide a structured, clear, and comprehensive explanation with headings, bullet points, and code/formulas where helpful for this question: $query'
                  }
                ]
              }
            ]
          }),
        );
        if (response.statusCode == 200) {
          final data = jsonDecode(response.body);
          final candidateText =
              data['candidates']?[0]?['content']?['parts']?[0]?['text'];
          if (candidateText != null && candidateText.toString().isNotEmpty) {
            return candidateText;
          }
        }
      } catch (_) {
        // Fall back to offline knowledge base
      }
    }

    // 2. Comprehensive Offline Knowledge Engine for CSE
    if (lower.contains('normalization') || lower.contains('bcnf') || lower.contains('3nf')) {
      return '''### 📚 Normalization in Relational Database Systems (1NF to BCNF)

Normalization is the systematic process of organizing relational database tables to **minimize redundancy** and **eliminate insertion, update, and deletion anomalies**.

#### 1. First Normal Form (1NF)
* **Rule:** Every attribute must contain only **atomic (indivisible) values**. No repeating groups or multi-valued attributes (like arrays or comma-separated lists).
* **Fix:** Split multi-valued attributes into separate rows with composite primary keys.

#### 2. Second Normal Form (2NF)
* **Rule:** The relation must be in **1NF**, and **no non-prime attribute may be partially dependent** on any candidate key.
* **Equation:** Every non-prime attribute $A$ must depend on the whole candidate key $X$, not a proper subset of $X$.

#### 3. Third Normal Form (3NF)
* **Rule:** Must be in **2NF**, and **no non-prime attribute may be transitively dependent** on a candidate key.
* **Condition:** For every non-trivial functional dependency $X \\rightarrow Y$, either:
  1. $X$ is a **Super Key**, OR
  2. $Y$ is a **Prime Attribute** (part of some candidate key).

#### 4. Boyce-Codd Normal Form (BCNF)
* **Rule:** Stricter version of 3NF. For every non-trivial functional dependency $X \\rightarrow Y$, **$X$ MUST be a Super Key**.
* **Key Distinction:** 3NF allows $Y$ to be prime even if $X$ is not a superkey; BCNF forbids this, eliminating all remaining redundancy based on functional dependencies.''';
    }

    if (lower.contains('virtual memory') || lower.contains('paging') || lower.contains('tlb')) {
      return '''### 🧠 Virtual Memory, Paging & TLB Architecture

Virtual Memory separates the logical memory perceived by a user process from physical memory (RAM).

#### 1. Paging Mechanism
* **Page:** Fixed-size block in logical memory (typically 4 KB).
* **Frame:** Fixed-size block in physical memory (same size as a page).
* **Page Table:** Maintained per-process by the OS to map Virtual Page Numbers (VPN) to Physical Frame Numbers (PFN).

#### 2. Address Translation Formula
* Virtual Address: `[ Page Number (p) | Offset (d) ]`
* Frame Number `f = PageTable[p]`
* Physical Address: `[ Frame Number (f) | Offset (d) ]`

#### 3. Translation Lookaside Buffer (TLB)
* An ultra-fast hardware associative cache in the CPU MMU storing recent page-table translations.
* **TLB Hit:** Memory access takes **1 cycle**.
* **TLB Miss:** CPU accesses the Page Table in RAM, updates the TLB, and accesses the target frame (2 memory accesses).
* **Effective Access Time (EAT):**
  $$EAT = (h \\times (t_{TLB} + t_{RAM})) + ((1 - h) \\times (t_{TLB} + 2 \\times t_{RAM}))$$
  *(where $h$ is the TLB hit ratio).*''';
    }

    if (lower.contains('deadlock') || lower.contains('banker') || lower.contains('coffman')) {
      return '''### 🔒 Deadlock Conditions & Banker's Algorithm

A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.

#### 1. The 4 Coffman Conditions (Must ALL hold simultaneously):
1. **Mutual Exclusion:** At least one resource is held in non-shareable mode.
2. **Hold and Wait:** A process is holding at least one resource and requesting additional resources.
3. **No Preemption:** Resources cannot be forcibly seized; only voluntarily released.
4. **Circular Wait:** A closed chain of processes exists: $P_0 \\rightarrow P_1 \\rightarrow P_2 \\dots \\rightarrow P_0$.

#### 2. Banker's Algorithm (Deadlock Avoidance)
* Uses vectors: **Available**, **Max**, **Allocation**, and **Need**.
* **Need Matrix Calculation:**
  $$\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]$$
* **Safety Condition:** A state is safe if there exists an execution sequence $\\langle P_1, P_2, \\dots, P_n \\rangle$ such that for each $P_i$, its needed resources can be satisfied by current Available plus resources already held by preceding processes.''';
    }

    if (lower.contains('tcp') || lower.contains('handshake') || lower.contains('osi')) {
      return '''### 🌐 TCP 3-Way Handshake & Connection Teardown

Transmission Control Protocol (TCP) is a connection-oriented, reliable transport layer protocol.

#### 1. Connection Establishment (3-Way Handshake)
```
Client                              Server
  |                                   |  (LISTEN)
  | -------- SYN (seq = x) ---------> |
  |                                   |  (SYN_RCVD)
  | <--- SYN-ACK (seq=y, ack=x+1) --- |
  | (ESTABLISHED)                     |
  | -------- ACK (ack = y+1) -------> |
  |                                   |  (ESTABLISHED)
```

#### 2. Connection Teardown (4-Way Termination)
1. **Client $\\rightarrow$ FIN:** Client signals it has finished sending data.
2. **Server $\\rightarrow$ ACK:** Server acknowledges the close request.
3. **Server $\\rightarrow$ FIN:** Server finishes its pending transmissions and requests close.
4. **Client $\\rightarrow$ ACK:** Client confirms and enters `TIME_WAIT` for $2 \\times \\text{MSL}$ (Maximum Segment Lifetime) before destroying the socket.''';
    }

    if (lower.contains('dijkstra') || lower.contains('shortest path') || lower.contains('bellman')) {
      return '''### 🚀 Dijkstra's Algorithm vs Bellman-Ford

#### 1. Dijkstra's Algorithm
* **Approach:** Greedy algorithm using a Priority Queue / Min-Heap.
* **Time Complexity:** $O((V + E) \\log V)$ with adjacency list and binary heap.
* **Constraint:** Does **NOT** work with negative weight edges or negative cycles.

#### 2. Bellman-Ford Algorithm
* **Approach:** Dynamic Programming; relaxes all edges $|V| - 1$ times.
* **Time Complexity:** $O(V \\times E)$.
* **Advantage:** Works with negative weight edges and detects **negative weight cycles** (if a relaxation succeeds on the $|V|$-th iteration).''';
    }

    // Default intelligent tutoring response
    return '''### 💡 AI Study Coach Explanation: "$query"

Here is a structured breakdown for your CSE exam and interview preparation:

#### 1. Key Concept & Definition
This topic is fundamental in Computer Science & Engineering. Understanding the core principles, state transitions, and edge cases is critical for university theory exams, competitive tests (like GATE), and technical interviews.

#### 2. Important Principles to Remember
* **Theoretical Foundation:** Always start your answers by stating the standard formal definition and the underlying problem it solves.
* **Trade-offs:** Analyze time complexity vs space complexity, throughput vs latency, or accuracy vs computational overhead.
* **Practical Application:** Connect the theory to modern production systems (e.g., Linux kernel internals, PostgreSQL indexes, or cloud networking).

#### 3. Pro Exam Tips
* Draw clean block diagrams or flowcharts in your university answer sheets.
* Write out mathematical notations and formulas explicitly.
* For coding implementations, ensure you handle boundary conditions (null pointers, empty inputs, and integer overflow).

*Feel free to ask a follow-up question or ask for a specific code sample in C++, Java, or Python!*''';
  }
}

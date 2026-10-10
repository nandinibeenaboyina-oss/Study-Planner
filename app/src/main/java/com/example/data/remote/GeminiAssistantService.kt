package com.example.data.remote

import android.util.Log
import com.example.BuildConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.TimeUnit

object GeminiAssistantService {
    private const val TAG = "GeminiAssistant"
    private const val BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent"

    private val client = OkHttpClient.Builder()
        .connectTimeout(60, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(60, TimeUnit.SECONDS)
        .build()

    fun isApiKeyConfigured(): Boolean {
        val key = BuildConfig.GEMINI_API_KEY
        return key.isNotBlank() && key != "MY_GEMINI_API_KEY"
    }

    suspend fun generateStudyResponse(prompt: String, cseContext: String = ""): Result<String> = withContext(Dispatchers.IO) {
        val apiKey = BuildConfig.GEMINI_API_KEY

        if (!isApiKeyConfigured()) {
            return@withContext Result.success(getSmartOfflineResponse(prompt))
        }

        try {
            val systemInstructions = "You are an expert B.Tech Computer Science & Engineering study coach and AI tutor. " +
                    "Explain concepts with clarity, provide code snippets (C++, Java, Python, SQL) where relevant, " +
                    "and provide concise revision plans and exam tips tailored for CSE students. Context: $cseContext"

            val fullPrompt = "$systemInstructions\n\nStudent Question:\n$prompt"

            val requestJson = JSONObject().apply {
                val contentsArray = JSONArray().apply {
                    val contentObj = JSONObject().apply {
                        val partsArray = JSONArray().apply {
                            val partObj = JSONObject().apply {
                                put("text", fullPrompt)
                            }
                            put(partObj)
                        }
                        put("parts", partsArray)
                    }
                    put(contentObj)
                }
                put("contents", contentsArray)

                val genConfig = JSONObject().apply {
                    put("temperature", 0.7)
                    put("topP", 0.95)
                    put("maxOutputTokens", 2048)
                }
                put("generationConfig", genConfig)
            }

            val requestBody = requestJson.toString().toRequestBody("application/json; charset=utf-8".toMediaType())
            val request = Request.Builder()
                .url("$BASE_URL?key=$apiKey")
                .post(requestBody)
                .build()

            val response = client.newCall(request).execute()
            val responseString = response.body?.string() ?: ""

            if (!response.isSuccessful) {
                Log.e(TAG, "API Error: ${response.code} - $responseString")
                return@withContext Result.success(
                    "⚠️ API Notice (${response.code}): Unable to contact Gemini online. Here is an offline CSE guide:\n\n" +
                            getSmartOfflineResponse(prompt)
                )
            }

            val jsonResponse = JSONObject(responseString)
            val candidates = jsonResponse.optJSONArray("candidates")
            if (candidates != null && candidates.length() > 0) {
                val firstCandidate = candidates.getJSONObject(0)
                val content = firstCandidate.optJSONObject("content")
                val parts = content?.optJSONArray("parts")
                if (parts != null && parts.length() > 0) {
                    val text = parts.getJSONObject(0).optString("text", "")
                    return@withContext Result.success(text)
                }
            }

            Result.success("Received empty response from study assistant. Please try rephrasing.")
        } catch (e: Exception) {
            Log.e(TAG, "Exception calling Gemini", e)
            Result.success(
                "⚡ Offline Assistant Mode Active:\n\n${getSmartOfflineResponse(prompt)}"
            )
        }
    }

    private fun getSmartOfflineResponse(prompt: String): String {
        val lower = prompt.lowercase()
        return when {
            lower.contains("virtual memory") || lower.contains("paging") -> """
                🧠 **Virtual Memory & Paging (OS Concept)**
                
                • **Definition:** An abstraction mapping large virtual addresses into physical RAM frames.
                • **Key Components:**
                  - **Page Table:** Maps Virtual Page Number (VPN) to Physical Frame Number (PFN).
                  - **TLB (Translation Lookaside Buffer):** Fast hardware cache storing recent page translations.
                  - **Page Fault:** Exception triggered when a referenced page is not resident in physical RAM.
                • **Formulas:**
                  - Effective Memory Access Time (EMAT) = `Hit Ratio * (TLB_time + RAM_time) + (1 - Hit Ratio) * (TLB_time + 2*RAM_time + Fault_time)`
                • **Exam Tip:** Remember Belady's Anomaly occurs in FIFO page replacement, never in LRU or Optimal.
            """.trimIndent()

            lower.contains("b+ tree") || lower.contains("indexing") -> """
                🗄️ **B+ Tree Indexing in DBMS**
                
                • **Why B+ Trees?**
                  1. High fan-out reduces tree height, minimizing costly disk I/O operations.
                  2. All data pointers reside in leaf nodes; internal nodes only store index keys.
                  3. Leaf nodes are linked via a doubly linked list, making **Range Queries O(log N + K)** exceptionally fast.
                • **Complexity:** Search, Insert, Delete all take **O(log N)** disk block accesses.
            """.trimIndent()

            lower.contains("plan") || lower.contains("revision") || lower.contains("schedule") -> """
                📅 **7-Day Strategic CSE Exam Revision Framework**
                
                • **Days 1–2 (High-Weightage Core Theory):**
                  - DBMS: Normalization (3NF vs BCNF), Transaction ACID & 2PL.
                  - OS: Process Synchronization (Peterson's, Semaphores), Deadlock Coffman conditions.
                • **Days 3–4 (Numericals & System Design):**
                  - Networks: Subnetting calculations (/24, /27, /28) & TCP sequence window sizes.
                  - OS: CPU scheduling Gantt charts (Round Robin, SJF) & Page replacement faults.
                • **Days 5–6 (Coding & Practice):**
                  - Top 15 DSA patterns: Two Pointers, Sliding Window, DFS/BFS, Dynamic Programming.
                • **Day 7 (Mock Assessment):**
                  - Take 2 timed quizzes and review wrong answers. Sleep at least 7 hours before exam day!
            """.trimIndent()

            lower.contains("deadlock") -> """
                🔒 **Operating Systems: Deadlock Fundamentals**
                
                • **4 Coffman Conditions (Must all hold simultaneously):**
                  1. **Mutual Exclusion:** Resource held exclusively.
                  2. **Hold and Wait:** Holding a resource while requesting another.
                  3. **No Preemption:** Resources cannot be forcibly revoked.
                  4. **Circular Wait:** Closed chain of processes waiting on each other.
                • **Banker's Algorithm Formula:**
                  - `Need[i][j] = Max[i][j] - Allocation[i][j]`
                  - System is in a **Safe State** if a sequence `<P1, P2, ... Pn>` exists where each process can finish with available resources.
            """.trimIndent()

            lower.contains("sql") || lower.contains("query") -> """
                💻 **Essential SQL Commands for Placements**
                
                ```sql
                -- 2nd Highest Salary using Subquery
                SELECT MAX(salary) FROM Employees 
                WHERE salary < (SELECT MAX(salary) FROM Employees);

                -- N-th Highest Salary using DENSE_RANK()
                WITH RankedSalaries AS (
                  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank
                  FROM Employees
                )
                SELECT salary FROM RankedSalaries WHERE rank = 2;
                ```
            """.trimIndent()

            else -> """
                💡 **CSE Study Strategy & Advice**
                
                To master **${prompt.take(35)}...**:
                
                1. **Break down the core theory:** Write definitions, architecture diagrams, and mathematical invariants in your own words.
                2. **Solve 3 numerical/practical problems:** For CSE subjects, exams prioritize algorithm traces (e.g. Dijkstra, Banker's, Apriori, Normalization steps).
                3. **Active Recall & Testing:** Take a subject quiz on this topic right away in the Quizzes tab to test your retention.
                4. **Interview Alignment:** Ask yourself, "How would I explain this in 60 seconds to a technical interviewer?"
                
                *(Tip: You can configure your custom Gemini API key in AI Studio Secrets to unlock dynamic real-time AI responses!)*
            """.trimIndent()
        }
    }
}

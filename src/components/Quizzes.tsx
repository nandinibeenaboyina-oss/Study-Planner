import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  BookOpen,
  BrainCircuit,
  History
} from 'lucide-react';
import { QuizQuestion, QuizAttempt } from '../types';

interface QuizzesProps {
  questions: QuizQuestion[];
  attempts: QuizAttempt[];
  onSaveAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => void;
}

export const Quizzes: React.FC<QuizzesProps> = ({
  questions,
  attempts,
  onSaveAttempt
}) => {
  const categories = ['DBMS', 'Operating Systems', 'Computer Networks', 'Programming', 'Aptitude', 'Logical Reasoning'];
  const [selectedCategory, setSelectedCategory] = useState<string>('DBMS');

  // Quiz active state
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(180); // seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeQuestions = questions.filter(q => q.category === selectedCategory);

  // Timer
  useEffect(() => {
    let timer: any;
    if (isQuizActive && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isQuizActive && !isSubmitted) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [isQuizActive, isSubmitted, timeLeft]);

  const startQuiz = (cat: string) => {
    setSelectedCategory(cat);
    const qCount = questions.filter(q => q.category === cat).length || 5;
    setTimeLeft(qCount * 60);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setIsQuizActive(true);
  };

  const selectAnswer = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const percentage = activeQuestions.length > 0 ? Math.round((correct / activeQuestions.length) * 100) : 0;
    const duration = (activeQuestions.length * 60) - timeLeft;

    onSaveAttempt({
      category: selectedCategory,
      totalQuestions: activeQuestions.length,
      correctAnswers: correct,
      scorePercentage: percentage,
      durationSeconds: Math.max(duration, 10)
    });
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // --- Render Quiz Active / Results Mode ---
  if (isQuizActive) {
    const currentQ = activeQuestions[currentIndex];
    let correctCount = 0;
    if (isSubmitted) {
      activeQuestions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) correctCount++;
      });
    }

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-slate-900 dark:text-white">
              {selectedCategory} Quiz
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold">
              Q {currentIndex + 1} of {activeQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-bold ${
                timeLeft < 30 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300 animate-pulse'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
              }`}>
                <Clock className="w-4 h-4" />
                {formatTime(timeLeft)}
              </div>
            )}
            <button
              onClick={() => setIsQuizActive(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Results Banner if Submitted */}
        {isSubmitted && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg text-center">
            <Award className="w-12 h-12 mx-auto mb-2 text-amber-300" />
            <h3 className="text-2xl font-black">
              Score: {correctCount} / {activeQuestions.length} ({Math.round((correctCount / activeQuestions.length) * 100)}%)
            </h3>
            <p className="text-sm text-blue-100 mt-1">
              {correctCount === activeQuestions.length 
                ? 'Outstanding! Complete mastery of this topic.'
                : 'Good attempt! Review the question explanations below to strengthen weak areas.'}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => startQuiz(selectedCategory)}
                className="px-4 py-2 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-sm hover:bg-blue-50"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => setIsQuizActive(false)}
                className="px-4 py-2 rounded-xl bg-white/20 text-white font-bold text-xs hover:bg-white/30 backdrop-blur"
              >
                Back to Quizzes Hub
              </button>
            </div>
          </div>
        )}

        {/* Question Palette (1..N) */}
        <div className="flex items-center gap-2 overflow-x-auto p-2 bg-slate-100 dark:bg-slate-800/60 rounded-2xl">
          {activeQuestions.map((_, idx) => {
            const isAnswered = selectedAnswers[idx] !== undefined;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow'
                    : isAnswered
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        {currentQ && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                Question {currentIndex + 1}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {currentQ.question}
              </h3>
            </div>

            {/* 4 Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                const isCorrect = currentQ.correctIndex === optIdx;

                let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-slate-800';
                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 shadow-sm';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => selectAnswer(optIdx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm font-medium">{opt}</span>
                    </div>

                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-blue-700 dark:text-blue-300 block mb-1">💡 Detailed Explanation:</strong>
                {currentQ.explanation}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/60">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              {currentIndex === activeQuestions.length - 1 && !isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
                  disabled={currentIndex === activeQuestions.length - 1}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 flex items-center gap-1"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Render Quiz Hub & Topic Selection ---
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
          Interactive Practice Quizzes & MCQs
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Curated question banks for B.Tech CSE subjects and campus placements
        </p>
      </div>

      {/* Quiz Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = questions.filter(q => q.category === cat).length;
          return (
            <div
              key={cat}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                  {cat}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {count} Multiple Choice Questions available
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">Timed 60s/Q</span>
                <button
                  onClick={() => startQuiz(cat)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  Start Quiz <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Attempt History Section */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Recent Quiz Attempts</h3>
        </div>

        {attempts.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 text-center">No quiz attempts recorded yet. Start one above!</p>
        ) : (
          <div className="space-y-2">
            {attempts.slice(0, 5).map((att) => (
              <div
                key={att.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{att.category}</span>
                  <span className="text-slate-400 ml-2">
                    {att.correctAnswers} of {att.totalQuestions} correct ({att.durationSeconds}s)
                  </span>
                </div>
                <span className={`font-black px-2.5 py-1 rounded-lg ${
                  att.scorePercentage >= 75
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                }`}>
                  {att.scorePercentage}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

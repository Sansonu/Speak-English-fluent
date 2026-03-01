"use client";

import { useState, useEffect } from "react";
import { curriculum, hotTopics, circumlocutionObjects, circumlocutionPlaces } from "@/lib/curriculum";
import Link from "next/link";

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<"drills" | "roleplay" | "topics" | "questions" | "live">("drills");
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [circumlocutionType, setCircumlocutionType] = useState<"objects" | "places">("objects");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [practiceQuestions, setPracticeQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [liveSessions, setLiveSessions] = useState<any[]>([]);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadPracticeQuestions = async () => {
    try {
      const res = await fetch('/api/questions?type=practice');
      const data = await res.json();
      setPracticeQuestions(data || []);
    } catch (error) {
      console.error("Failed to load practice questions:", error);
      setPracticeQuestions([]);
    }
  };

  const loadLiveSessions = async () => {
    try {
      const res = await fetch('/api/live-sessions');
      const data = await res.json();
      setLiveSessions(data || []);
      if (data && data.length > 0) {
        setCurrentSession(data[0]);
      }
    } catch (error) {
      console.error("Failed to load live sessions:", error);
      setLiveSessions([]);
    }
  };

  useEffect(() => {
    // Load data after a short delay to ensure DB is ready
    setTimeout(() => {
      loadPracticeQuestions();
      loadLiveSessions();
      setIsLoading(false);
    }, 100);
  }, []);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % practiceQuestions.length);
  };

  const nextSession = () => {
    setCurrentSession((prev: any) => {
      const currentIndex = liveSessions.findIndex(s => s.id === prev?.id);
      const nextIndex = (currentIndex + 1) % liveSessions.length;
      return liveSessions[nextIndex] || null;
    });
  };

  // Sound drills from Phase 1
  const soundDrills = curriculum
    .filter(c => c.soundDrill)
    .map(c => ({
      day: c.day,
      focus: c.soundDrill!.focus,
      words: c.soundDrill!.words,
      sentences: c.soundDrill!.sentences
    }));

  // Current circumlocution item
  const currentItems = circumlocutionType === "objects" ? circumlocutionObjects : circumlocutionPlaces;
  const currentItem = currentItems[currentItemIndex];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const nextCircumlocutionItem = () => {
    setShowAnswer(false);
    setCurrentItemIndex((prev) => (prev + 1) % currentItems.length);
  };

  const nextDrill = () => {
    setCurrentDrillIndex((prev) => (prev + 1) % soundDrills.length);
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Practice Mode</h1>
          <p className="text-neutral-400 text-lg">
            Interactive exercises to improve your English speaking
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("drills")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "drills"
                ? "bg-emerald-500 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            🔊 Sound Drills
          </button>
          <button
            onClick={() => setActiveTab("roleplay")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "roleplay"
                ? "bg-purple-500 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            💡 Circumlocution
          </button>
          <button
            onClick={() => setActiveTab("topics")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "topics"
                ? "bg-blue-500 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            🔥 Hot Topics
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "questions"
                ? "bg-yellow-500 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            📝 Practice Questions
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "live"
                ? "bg-red-500 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            🎛️ Live Learning
          </button>
        </div>

        {/* Sound Drills Tab */}
        {activeTab === "drills" && soundDrills.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🔊</span>
                  <div>
                    <h2 className="text-xl font-bold">Sound Drill</h2>
                    <p className="text-neutral-400 text-sm">Day {soundDrills[currentDrillIndex].day}</p>
                  </div>
                </div>
                <button
                  onClick={nextDrill}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm"
                >
                  Next Drill →
                </button>
              </div>

              <h3 className="text-2xl font-bold text-emerald-400 mb-6">
                {soundDrills[currentDrillIndex].focus}
              </h3>

              {/* Words */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-neutral-400 mb-3">Practice Words</h4>
                <div className="flex flex-wrap gap-2">
                  {soundDrills[currentDrillIndex].words.map((word, i) => (
                    <button
                      key={i}
                      onClick={() => speak(word)}
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                    >
                      {word} 🎤
                    </button>
                  ))}
                </div>
              </div>

              {/* Sentences */}
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-3">Practice Sentences</h4>
                <div className="space-y-2">
                  {soundDrills[currentDrillIndex].sentences.map((sentence, i) => (
                    <button
                      key={i}
                      onClick={() => speak(sentence)}
                      className="block w-full text-left px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                    >
                      &quot;{sentence}&quot; 🎤
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-700">
                <Link
                  href={`/day/${soundDrills[currentDrillIndex].day}`}
                  className="inline-flex items-center gap-2 text-emerald-400 hover:underline"
                >
                  View full lesson for Day {soundDrills[currentDrillIndex].day} →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Practice Questions Tab */}
        {activeTab === "questions" && (
          <div className="max-w-3xl mx-auto">
            {practiceQuestions.length > 0 ? (
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📝</span>
                    <div>
                      <h2 className="text-xl font-bold">Practice Questions</h2>
                      <p className="text-neutral-400 text-sm">{currentQuestionIndex + 1} of {practiceQuestions.length}</p>
                    </div>
                  </div>
                  <button
                    onClick={nextQuestion}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm"
                  >
                    Next Question →
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">
                    {practiceQuestions[currentQuestionIndex].question}
                  </h3>
                  <p className="text-neutral-400 mb-4">
                    Category: {practiceQuestions[currentQuestionIndex].category} | Difficulty: {practiceQuestions[currentQuestionIndex].difficulty}
                  </p>
                  <div className="p-4 bg-neutral-800 rounded-lg">
                    <p className="text-neutral-300">Answer: {practiceQuestions[currentQuestionIndex].answer}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-700">
                  <button
                    onClick={() => speak(practiceQuestions[currentQuestionIndex].question)}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm"
                  >
                    Read Question 🎤
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700 text-center">
                <p className="text-neutral-400">No practice questions yet.</p>
                <p className="text-neutral-500 text-sm mt-2">
                  Visit the <Link href="/admin" className="text-yellow-400 hover:underline">Admin Dashboard</Link> to add questions.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Live Learning Tab */}
        {activeTab === "live" && (
          <div className="max-w-3xl mx-auto">
            {liveSessions.length > 0 ? (
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎹</span>
                    <div>
                      <h2 className="text-xl font-bold">Live Learning Sessions</h2>
                      <p className="text-neutral-400 text-sm">Join interactive sessions</p>
                    </div>
                  </div>
                  <button
                    onClick={nextSession}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm"
                  >
                    Next Session →
                  </button>
                </div>

                {currentSession && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">
                      {currentSession.title}
                    </h3>
                    <p className="text-neutral-400 mb-4">
                      {currentSession.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-neutral-800 p-4 rounded-lg">
                        <p className="text-neutral-300 font-medium">Category:</p>
                        <p className="text-neutral-400">{currentSession.category}</p>
                      </div>
                      <div className="bg-neutral-800 p-4 rounded-lg">
                        <p className="text-neutral-300 font-medium">Difficulty:</p>
                        <p className="text-neutral-400">{currentSession.difficulty}</p>
                      </div>
                      <div className="bg-neutral-800 p-4 rounded-lg">
                        <p className="text-neutral-300 font-medium">Participants:</p>
                        <p className="text-neutral-400">{currentSession.current_participants}/{currentSession.max_participants}</p>
                      </div>
                      <div className="bg-neutral-800 p-4 rounded-lg">
                        <p className="text-neutral-300 font-medium">Status:</p>
                        <p className="text-neutral-400">
                          {currentSession.is_active ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Join session logic would go here
                        console.log('Joining session:', currentSession.id);
                      }}
                      className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors mt-4"
                    >
                      Join Session
                    </button>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-neutral-700">
                  <p className="text-neutral-400 text-sm">
                    🎯 Join live sessions to practice speaking with others in real-time!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700 text-center">
                <p className="text-neutral-400">No active live sessions.</p>
                <p className="text-neutral-500 text-sm mt-2">
                  Visit the <Link href="/admin" className="text-red-400 hover:underline">Admin Dashboard</Link> to create a session.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Circumlocution Tab */}
        {activeTab === "roleplay" && currentItems.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">💡</span>
                  <div>
                    <h2 className="text-xl font-bold">Circumlocution Game</h2>
                    <p className="text-neutral-400 text-sm">Describe without naming!</p>
                  </div>
                </div>
              </div>

              {/* Type Selector */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => { setCircumlocutionType("objects"); setCurrentItemIndex(0); setShowAnswer(false); }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    circumlocutionType === "objects"
                      ? "bg-purple-500 text-white"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  Objects
                </button>
                <button
                  onClick={() => { setCircumlocutionType("places"); setCurrentItemIndex(0); setShowAnswer(false); }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    circumlocutionType === "places"
                      ? "bg-purple-500 text-white"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  Places
                </button>
              </div>

              {/* Hint */}
              <div className="mb-8">
                <p className="text-neutral-400 mb-2">Describe this:</p>
                <p className="text-2xl font-bold text-purple-300 mb-4">
                  {currentItem.hint}
                </p>
                <button
                  onClick={() => speak(currentItem.hint)}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg"
                >
                  Read Hint 🔊
                </button>
              </div>

              {/* Answer */}
              <div className="mb-6">
                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Show Answer
                  </button>
                ) : (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                    <p className="text-emerald-300 font-bold text-xl">{currentItem.answer}</p>
                  </div>
                )}
              </div>

              <button
                onClick={nextCircumlocutionItem}
                className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-xl transition-colors"
              >
                Next Item →
              </button>

              <div className="mt-8 pt-6 border-t border-neutral-700">
                <p className="text-neutral-400 text-sm">
                  💡 Tip: This skill helps you communicate even when you do not know the exact word!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hot Topics Tab */}
        {activeTab === "topics" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔥</span>
                <div>
                  <h2 className="text-xl font-bold">Hot Topics</h2>
                  <p className="text-neutral-400 text-sm">60-second speaking challenges</p>
                </div>
              </div>

              <p className="text-neutral-400 mb-6">
                Pick a topic and speak for 60 seconds without stopping. Record yourself and listen back!
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {hotTopics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => speak(topic)}
                    className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-left transition-colors"
                  >
                    <span className="block text-white font-medium">{topic}</span>
                    <span className="text-sm text-neutral-400">🔊 Listen</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <h4 className="font-semibold text-blue-300 mb-2">How to do this exercise:</h4>
                <ol className="text-neutral-400 text-sm space-y-1">
                  <li>1. Choose a topic</li>
                  <li>2. Set a timer for 60 seconds</li>
                  <li>3. Speak continuously - do not stop!</li>
                  <li>4. Record yourself</li>
                  <li>5. Listen back and note improvements</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

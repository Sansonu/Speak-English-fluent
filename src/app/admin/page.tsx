"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"questions" | "mcqs" | "live">("questions");
  const [questionForm, setQuestionForm] = useState({
    question: "",
    answer: "",
    category: "vocabulary",
    difficulty: 1
  });
  const [mcqForm, setMcqForm] = useState({
    question: "",
    options: "",
    correctAnswer: "",
    explanation: "",
    category: "vocabulary",
    difficulty: 1
  });
  const [liveForm, setLiveForm] = useState({
    title: "",
    description: "",
    category: "general",
    difficulty: 1,
    maxParticipants: 10
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [mcqs, setMcqs] = useState<any[]>([]);
  const [liveSessions, setLiveSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadQuestions = async () => {
    try {
      const res = await fetch('/api/questions?type=practice');
      const data = await res.json();
      setQuestions(data || []);
    } catch (error) {
      console.error("Failed to load questions:", error);
      setQuestions([]);
    }
  };

  const loadMCQs = async () => {
    try {
      const res = await fetch('/api/questions?type=mcq');
      const data = await res.json();
      setMcqs(data || []);
    } catch (error) {
      console.error("Failed to load MCQs:", error);
      setMcqs([]);
    }
  };

  const loadLiveSessions = async () => {
    try {
      const res = await fetch('/api/live-sessions');
      const data = await res.json();
      setLiveSessions(data || []);
    } catch (error) {
      console.error("Failed to load live sessions:", error);
      setLiveSessions([]);
    }
  };

  useEffect(() => {
    // Load data on mount
    const fetchData = async () => {
      await loadQuestions();
      await loadMCQs();
      await loadLiveSessions();
    };
    fetchData();
  }, []);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...questionForm, type: 'practice' })
      });
      setMessage("Question added successfully!");
      setQuestionForm({ question: "", answer: "", category: "vocabulary", difficulty: 1 });
      loadQuestions();
    } catch (error) {
      setMessage("Failed to add question");
    }
    setLoading(false);
  };

  const handleAddMCQ = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mcqForm, type: 'mcq' })
      });
      setMessage("MCQ added successfully!");
      setMcqForm({ question: "", options: "", correctAnswer: "", explanation: "", category: "vocabulary", difficulty: 1 });
      loadMCQs();
    } catch (error) {
      setMessage("Failed to add MCQ");
    }
    setLoading(false);
  };

  const handleCreateLiveSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/live-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(liveForm)
      });
      setMessage("Live session created successfully!");
      setLiveForm({ title: "", description: "", category: "general", difficulty: 1, maxParticipants: 10 });
      loadLiveSessions();
    } catch (error) {
      setMessage("Failed to create live session");
    }
    setLoading(false);
  };

  const handleDeleteQuestion = async (id: number) => {
    try {
      await fetch(`/api/questions?id=${id}&type=practice`, { method: 'DELETE' });
      loadQuestions();
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleDeleteMCQ = async (id: number) => {
    try {
      await fetch(`/api/questions?id=${id}&type=mcq`, { method: 'DELETE' });
      loadMCQs();
    } catch (error) {
      console.error("Failed to delete MCQ:", error);
    }
  };

  const handleDeleteSession = async (id: number) => {
    try {
      await fetch(`/api/live-sessions?id=${id}`, { method: 'DELETE' });
      loadLiveSessions();
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-neutral-400 text-lg">
            Manage practice questions, MCQs, and live learning sessions
          </p>
        </div>

        {message && (
          <div className="max-w-3xl mx-auto mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
            <p className="text-green-300 text-center">{message}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
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
            onClick={() => setActiveTab("mcqs")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "mcqs"
                ? "bg-blue-500 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            ❓ MCQs
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "live"
                ? "bg-red-500 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            🎛️ Live Sessions
          </button>
        </div>

        {/* Practice Questions Tab */}
        {activeTab === "questions" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Add Question Form */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <h2 className="text-xl font-bold mb-6">Add New Question</h2>
              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Question</label>
                  <textarea
                    value={questionForm.question}
                    onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Answer</label>
                  <textarea
                    value={questionForm.answer}
                    onChange={(e) => setQuestionForm({ ...questionForm, answer: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    rows={2}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Category</label>
                    <select
                      value={questionForm.category}
                      onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    >
                      <option value="vocabulary">Vocabulary</option>
                      <option value="grammar">Grammar</option>
                      <option value="pronunciation">Pronunciation</option>
                      <option value="conversation">Conversation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Difficulty (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={questionForm.difficulty}
                      onChange={(e) => setQuestionForm({ ...questionForm, difficulty: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Question"}
                </button>
              </form>
            </div>

            {/* Questions List */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <h2 className="text-xl font-bold mb-6">Existing Questions ({questions.length})</h2>
              <div className="space-y-4">
                {questions.map((q: any) => (
                  <div key={q.id} className="p-4 bg-neutral-800 rounded-lg flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{q.question}</p>
                      <p className="text-neutral-400 text-sm mt-1">Answer: {q.answer}</p>
                      <p className="text-neutral-500 text-xs mt-1">
                        {q.category} | Difficulty: {q.difficulty}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {questions.length === 0 && (
                  <p className="text-neutral-400 text-center">No questions yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MCQs Tab */}
        {activeTab === "mcqs" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Add MCQ Form */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <h2 className="text-xl font-bold mb-6">Add New MCQ</h2>
              <form onSubmit={handleAddMCQ} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Question</label>
                  <textarea
                    value={mcqForm.question}
                    onChange={(e) => setMcqForm({ ...mcqForm, question: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Options (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={mcqForm.options}
                    onChange={(e) => setMcqForm({ ...mcqForm, options: e.target.value })}
                    placeholder="Option 1, Option 2, Option 3, Option 4"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Correct Answer</label>
                  <input
                    type="text"
                    value={mcqForm.correctAnswer}
                    onChange={(e) => setMcqForm({ ...mcqForm, correctAnswer: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Explanation (optional)</label>
                  <textarea
                    value={mcqForm.explanation}
                    onChange={(e) => setMcqForm({ ...mcqForm, explanation: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Category</label>
                    <select
                      value={mcqForm.category}
                      onChange={(e) => setMcqForm({ ...mcqForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    >
                      <option value="vocabulary">Vocabulary</option>
                      <option value="grammar">Grammar</option>
                      <option value="pronunciation">Pronunciation</option>
                      <option value="conversation">Conversation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Difficulty (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={mcqForm.difficulty}
                      onChange={(e) => setMcqForm({ ...mcqForm, difficulty: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add MCQ"}
                </button>
              </form>
            </div>

            {/* MCQs List */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <h2 className="text-xl font-bold mb-6">Existing MCQs ({mcqs.length})</h2>
              <div className="space-y-4">
                {mcqs.map((m: any) => (
                  <div key={m.id} className="p-4 bg-neutral-800 rounded-lg flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{m.question}</p>
                      <p className="text-neutral-400 text-sm mt-1">Answer: {m.correct_answer}</p>
                      <p className="text-neutral-500 text-xs mt-1">
                        {m.category} | Difficulty: {m.difficulty}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMCQ(m.id)}
                      className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {mcqs.length === 0 && (
                  <p className="text-neutral-400 text-center">No MCQs yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Sessions Tab */}
        {activeTab === "live" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Create Live Session Form */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <h2 className="text-xl font-bold mb-6">Create Live Session</h2>
              <form onSubmit={handleCreateLiveSession} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Session Title</label>
                  <input
                    type="text"
                    value={liveForm.title}
                    onChange={(e) => setLiveForm({ ...liveForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                  <textarea
                    value={liveForm.description}
                    onChange={(e) => setLiveForm({ ...liveForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Category</label>
                    <select
                      value={liveForm.category}
                      onChange={(e) => setLiveForm({ ...liveForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    >
                      <option value="general">General</option>
                      <option value="pronunciation">Pronunciation</option>
                      <option value="conversation">Conversation</option>
                      <option value="grammar">Grammar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Difficulty</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={liveForm.difficulty}
                      onChange={(e) => setLiveForm({ ...liveForm, difficulty: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Max Participants</label>
                    <input
                      type="number"
                      min="2"
                      max="50"
                      value={liveForm.maxParticipants}
                      onChange={(e) => setLiveForm({ ...liveForm, maxParticipants: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Session"}
                </button>
              </form>
            </div>

            {/* Live Sessions List */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <h2 className="text-xl font-bold mb-6">Active Sessions ({liveSessions.length})</h2>
              <div className="space-y-4">
                {liveSessions.map((s: any) => (
                  <div key={s.id} className="p-4 bg-neutral-800 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{s.title}</p>
                        <p className="text-neutral-400 text-sm mt-1">{s.description}</p>
                        <p className="text-neutral-500 text-xs mt-1">
                          {s.category} | Difficulty: {s.difficulty} | 
                          Participants: {s.current_participants}/{s.max_participants}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteSession(s.id)}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {liveSessions.length === 0 && (
                  <p className="text-neutral-400 text-center">No active sessions</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

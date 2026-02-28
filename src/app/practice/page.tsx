"use client";

import { useState } from "react";
import { curriculum, hotTopics, circumlocutionObjects, circumlocutionPlaces } from "@/lib/curriculum";
import Link from "next/link";

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<"drills" | "roleplay" | "topics">("drills");
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [circumlocutionType, setCircumlocutionType] = useState<"objects" | "places">("objects");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

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
        <div className="flex justify-center gap-2 mb-8">
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
        </div>

        {/* Sound Drills Tab */}
        {activeTab === "drills" && (
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
                      {word} 🔊
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
                      &quot;{sentence}&quot; 🔊
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

        {/* Circumlocution Tab */}
        {activeTab === "roleplay" && (
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

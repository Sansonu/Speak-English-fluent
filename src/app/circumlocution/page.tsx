"use client";

import { circumlocutionObjects, circumlocutionPlaces } from "@/lib/curriculum";
import { useState } from "react";

export default function CircumlocutionPage() {
  const [type, setType] = useState<"objects" | "places">("objects");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const items = type === "objects" ? circumlocutionObjects : circumlocutionPlaces;
  const current = items[currentIndex];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const next = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm mb-4">
            <span>💡</span>
            <span>Fluency Skill Builder</span>
          </div>
          <h1 className="text-4xl font-bold">Circumlocution Game</h1>
          <p className="text-neutral-400 mt-2">Describe without naming - a key fluency skill!</p>
        </div>

        {/* Type Selector */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => { setType("objects"); setCurrentIndex(0); setShowAnswer(false); }}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              type === "objects" ? "bg-purple-500 text-white" : "bg-neutral-800 text-neutral-400"
            }`}
          >
            📦 Objects
          </button>
          <button
            onClick={() => { setType("places"); setCurrentIndex(0); setShowAnswer(false); }}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              type === "places" ? "bg-purple-500 text-white" : "bg-neutral-800 text-neutral-400"
            }`}
          >
            📍 Places
          </button>
        </div>

        {/* Game Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-12 border border-neutral-700 text-center">
          <p className="text-neutral-400 mb-4">Describe this:</p>
          
          <p className="text-2xl md:text-3xl font-bold text-purple-300 mb-8">
            {current.hint}
          </p>

          <button
            onClick={() => speak(current.hint)}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg mb-6"
          >
            🔊 Read Hint
          </button>

          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xl rounded-xl transition-colors"
            >
              Show Answer
            </button>
          ) : (
            <div className="p-6 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-2xl">
              <p className="text-emerald-300 font-bold text-3xl">{current.answer}</p>
            </div>
          )}

          <button
            onClick={next}
            className="mt-8 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-xl transition-colors"
          >
            Next Item →
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
          <h3 className="font-semibold mb-4">Why practice circumlocution?</h3>
          <ul className="space-y-2 text-neutral-400">
            <li>• Builds confidence when you do not know a word</li>
            <li>• Trains your brain to think in English</li>
            <li>• Essential skill for fluent conversations</li>
            <li>• Used by advanced speakers constantly</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

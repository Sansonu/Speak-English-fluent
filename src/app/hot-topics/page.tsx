"use client";

import { hotTopics } from "@/lib/curriculum";
import { useState } from "react";

export default function HotTopicsPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const nextTopic = () => {
    setCurrentIndex((prev) => (prev + 1) % hotTopics.length);
  };

  const currentTopic = hotTopics[currentIndex];

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm mb-4">
            <span>🔥</span>
            <span>60-Second Challenge</span>
          </div>
          <h1 className="text-4xl font-bold">Hot Topics</h1>
          <p className="text-neutral-400 mt-2">Speak for 60 seconds on this topic</p>
        </div>

        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-12 border border-neutral-700 text-center">
          <p className="text-3xl md:text-4xl font-bold text-white mb-8">
            {currentTopic}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => speak(currentTopic)}
              disabled={isPlaying}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-700 text-white font-semibold rounded-xl transition-colors"
            >
              {isPlaying ? "🔊 Playing..." : "🔊 Listen"}
            </button>
            <button
              onClick={nextTopic}
              className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-xl transition-colors"
            >
              Next Topic →
            </button>
          </div>
        </div>

        <div className="mt-8 bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
          <h3 className="font-semibold mb-4">How to use:</h3>
          <ol className="space-y-2 text-neutral-400">
            <li>1. Click &quot;Listen&quot; to hear the topic</li>
            <li>2. Start speaking immediately for 60 seconds</li>
            <li>3. Do not stop - keep talking!</li>
            <li>4. Record yourself and listen back</li>
            <li>5. Note improvements for next time</li>
          </ol>
        </div>
      </div>
    </main>
  );
}

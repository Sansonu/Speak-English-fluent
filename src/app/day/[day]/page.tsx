"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import { useProgressStore, getPhaseName, getPhaseColor } from "@/lib/progress";
import { useState, useEffect } from "react";

export default function DayPage() {
  const params = useParams();
  const day = parseInt(params.day as string);
  
  const {
    progress,
    currentDay,
    setCurrentDay,
    markDayComplete,
    setSpokeWithoutPrompting,
    setUsedWordOfDay,
    setSubmittedHomework,
    wordOfDay
  } = useProgressStore();

  const dayContent = curriculum.find(c => c.day === day);
  const dayProgress = progress[day] || { completed: false, spokeWithoutPrompting: false, usedWordOfDay: false, submittedHomework: false };
  
  // Sound drill playback state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Vocabulary practice state
  const [vocabChecked, setVocabChecked] = useState<Record<string, boolean>>({});
  
  // Sentence practice
  const [customSentence, setCustomSentence] = useState("");

  // Set current day on mount
  useEffect(() => {
    setCurrentDay(day);
  }, [day, setCurrentDay]);

  if (!dayContent) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Day not found</h1>
          <Link href="/curriculum" className="text-emerald-400 hover:underline">
            View all days
          </Link>
        </div>
      </div>
    );
  }

  const phaseColors: Record<number, string> = {
    1: "bg-emerald-500",
    2: "bg-blue-500",
    3: "bg-purple-500",
    4: "bg-amber-500"
  };

  const phaseTextColors: Record<number, string> = {
    1: "text-emerald-400",
    2: "text-blue-400",
    3: "text-purple-400",
    4: "text-amber-400"
  };

  const handleMarkComplete = () => {
    markDayComplete(day);
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href={day > 1 ? `/day/${day - 1}` : "/"} 
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>{day > 1 ? `Day ${day - 1}` : "Dashboard"}</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full ${phaseColors[dayContent.phase]} text-white text-sm font-medium`}>
              {dayContent.phaseName}
            </span>
            <span className="text-neutral-400">Day {day}</span>
          </div>
          
          <Link 
            href={day < 45 ? `/day/${day + 1}` : "/"} 
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span>{day < 45 ? `Day ${day + 1}` : "Complete!"}</span>
            <span>→</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Day {day}: {dayContent.phaseName}
          </h1>
          <p className="text-neutral-400">{dayContent.duration}</p>
        </div>

        {/* Progress Tracking */}
        <div className="bg-neutral-900/50 rounded-2xl p-4 mb-8 border border-neutral-800">
          <h3 className="text-sm font-medium text-neutral-400 mb-4">Today&apos;s Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dayProgress.spokeWithoutPrompting}
                onChange={(e) => setSpokeWithoutPrompting(day, e.target.checked)}
                className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm">Spoke without prompting</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dayProgress.usedWordOfDay}
                onChange={(e) => setUsedWordOfDay(day, e.target.checked)}
                className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm">Used word of day</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dayProgress.submittedHomework}
                onChange={(e) => setSubmittedHomework(day, e.target.checked)}
                className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm">Homework done</span>
            </label>
            <button
              onClick={handleMarkComplete}
              disabled={dayProgress.completed}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                dayProgress.completed
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              {dayProgress.completed ? "✓ Completed" : "Mark Complete"}
            </button>
          </div>
        </div>

        {/* Sound Drill Section */}
        {dayContent.soundDrill && (
          <section className="mb-8">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 border border-neutral-700">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔊</span>
                <div>
                  <h2 className="text-xl font-bold">Sound Drill: {dayContent.soundDrill.focus}</h2>
                  <p className="text-neutral-400 text-sm">{dayContent.soundDrill.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Words */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-400 mb-3">Practice Words</h3>
                  <div className="flex flex-wrap gap-2">
                    {dayContent.soundDrill.words.map((word, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          // Simple speech synthesis
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance(word);
                            utterance.rate = 0.8;
                            speechSynthesis.speak(utterance);
                          }
                        }}
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white transition-colors"
                      >
                        {word} 🔊
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sentences */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-400 mb-3">Practice Sentences</h3>
                  <div className="space-y-2">
                    {dayContent.soundDrill.sentences.map((sentence, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance(sentence);
                            utterance.rate = 0.8;
                            speechSynthesis.speak(utterance);
                          }
                        }}
                        className="block w-full text-left px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 transition-colors"
                      >
                        &quot;{sentence}&quot; 🔊
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Minimal Pairs */}
              {dayContent.soundDrill.minimalPairs && (
                <div className="mt-6 pt-6 border-t border-neutral-700">
                  <h3 className="text-sm font-medium text-neutral-400 mb-3">Minimal Pairs (listen & repeat)</h3>
                  <div className="flex flex-wrap gap-3">
                    {dayContent.soundDrill.minimalPairs.map((pair, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            const words = pair.split('/');
                            words.forEach(w => {
                              const utterance = new SpeechSynthesisUtterance(w.trim());
                              utterance.rate = 0.8;
                              speechSynthesis.speak(utterance);
                            });
                          }
                        }}
                        className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-300"
                      >
                        {pair}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Vocabulary Section */}
        {dayContent.vocabulary && (
          <section className="mb-8">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 border border-neutral-700">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📝</span>
                <div>
                  <h2 className="text-xl font-bold">Vocabulary: {dayContent.vocabulary.topic}</h2>
                  <p className="text-neutral-400 text-sm">{dayContent.vocabulary.words.length} words to learn</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {dayContent.vocabulary.words.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(word);
                        speechSynthesis.speak(utterance);
                      }
                      setVocabChecked(prev => ({ ...prev, [word]: !prev[word] }));
                    }}
                    className={`px-4 py-3 rounded-lg text-left transition-all ${
                      vocabChecked[word]
                        ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                        : "bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white"
                    }`}
                  >
                    <span className="block">{word}</span>
                    {vocabChecked[word] && <span className="text-xs text-emerald-400">✓</span>}
                  </button>
                ))}
              </div>

              {/* Custom Sentence */}
              <div className="mt-6 pt-6 border-t border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Create Your Own Sentence</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={customSentence}
                    onChange={(e) => setCustomSentence(e.target.value)}
                    placeholder={`Use today's vocabulary words...`}
                    className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => {
                      if (customSentence && 'speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(customSentence);
                        speechSynthesis.speak(utterance);
                      }
                    }}
                    disabled={!customSentence}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-700 disabled:text-neutral-500 text-white font-medium rounded-lg transition-colors"
                  >
                    Speak 🔊
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Scenario / Sentence Frames */}
        {dayContent.scenario && (
          <section className="mb-8">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 border border-neutral-700">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎤</span>
                <div>
                  <h2 className="text-xl font-bold">Scenario: {dayContent.scenario.theme}</h2>
                  <p className="text-neutral-400 text-sm">Practice these sentence frames</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {dayContent.scenario.frames.map((frame, i) => (
                  <div
                    key={i}
                    className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700"
                  >
                    <p className="text-blue-300 font-medium">{frame}</p>
                    <button
                      onClick={() => {
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance(frame);
                          utterance.rate = 0.8;
                          speechSynthesis.speak(utterance);
                        }
                      }}
                      className="mt-2 text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      Listen 🔊
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-700">
                <h3 className="text-lg font-semibold mb-2">Output: {dayContent.scenario.output}</h3>
                <p className="text-neutral-400">Practice speaking aloud with your own words!</p>
              </div>
            </div>
          </section>
        )}

        {/* Fluency Skill */}
        {dayContent.fluencySkill && (
          <section className="mb-8">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 border border-neutral-700">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">💬</span>
                <div>
                  <h2 className="text-xl font-bold">Fluency Skill: {dayContent.fluencySkill.skill}</h2>
                  <p className="text-neutral-400 text-sm">{dayContent.fluencySkill.topic}</p>
                </div>
              </div>

              <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <h3 className="text-lg font-semibold mb-2">Format: {dayContent.fluencySkill.format}</h3>
                <p className="text-neutral-400">
                  Focus on flowing naturally without translation. Use circumlocution if you do not know a word!
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Homework */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-2xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl font-bold">Today&apos;s Homework</h2>
            </div>
            <p className="text-lg text-amber-300">{dayContent.homework}</p>
            <p className="text-neutral-400 mt-2">
              Recording yourself is the fastest way to build self-awareness. Listen back and note your progress!
            </p>
          </div>
        </section>

        {/* Word of Day Reminder */}
        {wordOfDay && (
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">✨ Word of the Day</h3>
                  <p className="text-blue-400 text-xl font-bold">{wordOfDay}</p>
                </div>
                <button
                  onClick={() => setUsedWordOfDay(day, true)}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                >
                  I Used It! ✓
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-8 border-t border-neutral-800">
          <Link 
            href={day > 1 ? `/day/${day - 1}` : "/"} 
            className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
          >
            <span>←</span>
            <span>{day > 1 ? `Day ${day - 1}` : "Dashboard"}</span>
          </Link>
          
          {dayProgress.completed ? (
            <Link 
              href={day < 45 ? `/day/${day + 1}` : "/"} 
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
            >
              <span>Next Day</span>
              <span>→</span>
            </Link>
          ) : (
            <button
              onClick={handleMarkComplete}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
            >
              <span>Mark as Complete</span>
              <span>✓</span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

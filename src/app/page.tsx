"use client";

import { curriculum, hotTopics, circumlocutionObjects } from "@/lib/curriculum";
import { useProgressStore, getPhaseName, getPhaseDescription, getPhaseColor } from "@/lib/progress";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { 
    currentDay, 
    setCurrentDay, 
    progress, 
    getCompletedDaysCount,
    wordOfDay,
    setWordOfDay,
    markWordOfDayUsed,
    wordOfDayUsed
  } = useProgressStore();
  
  const [randomWord, setRandomWord] = useState("");
  const completedDays = getCompletedDaysCount();
  const currentPhase = getPhaseName(currentDay);
  const currentPhaseNum = currentDay <= 10 ? 1 : currentDay <= 25 ? 2 : currentDay <= 38 ? 3 : 4;
  const phaseDescription = getPhaseDescription(currentPhaseNum);

  // Get today's curriculum
  const todayContent = curriculum.find(c => c.day === currentDay);

  // Set a random word for the day
  useEffect(() => {
    const words = [
      "eloquent", "fluent", "confident", "articulate", "proficient",
      "vocabulary", "pronunciation", "intonation", "circumlocution",
      "persuasion", "eloquence", "spontaneity", "conversational"
    ];
    if (!wordOfDay) {
      setWordOfDay(words[Math.floor(Math.random() * words.length)]);
    }
  }, [wordOfDay, setWordOfDay]);

  // Get phase data
  const phases = [
    { 
      name: "Foundation", 
      days: "1-10", 
      color: "bg-emerald-500", 
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      icon: "🔤"
    },
    { 
      name: "Construction", 
      days: "11-25", 
      color: "bg-blue-500", 
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: "🏗️"
    },
    { 
      name: "Fluency", 
      days: "26-38", 
      color: "bg-purple-500", 
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      icon: "💬"
    },
    { 
      name: "Advanced Polish", 
      days: "39-45", 
      color: "bg-amber-500", 
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      icon: "🎯"
    },
  ];

  // Calculate phase progress
  const getPhaseProgress = (phaseNum: number) => {
    let start = 1, end = 10;
    if (phaseNum === 2) { start = 11; end = 25; }
    if (phaseNum === 3) { start = 26; end = 38; }
    if (phaseNum === 4) { start = 39; end = 45; }
    
    const total = end - start + 1;
    let completed = 0;
    for (let i = start; i <= end; i++) {
      if (progress[i]?.completed) completed++;
    }
    return { completed, total };
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          {/* Welcome Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-4">
              <span>🎯</span>
              <span>Day {currentDay} of 45</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span>{currentPhase} Phase</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              English Speaking Mastery
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              {phaseDescription}
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
              <div className="text-3xl font-bold text-white mb-1">{completedDays}</div>
              <div className="text-sm text-neutral-400">Days Completed</div>
            </div>
            <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
              <div className="text-3xl font-bold text-emerald-400 mb-1">{45 - completedDays}</div>
              <div className="text-sm text-neutral-400">Days Remaining</div>
            </div>
            <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
              <div className="text-3xl font-bold text-blue-400 mb-1">{currentDay}</div>
              <div className="text-sm text-neutral-400">Current Day</div>
            </div>
            <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
              <div className="text-3xl font-bold text-purple-400 mb-1">{Math.round((completedDays / 45) * 100)}%</div>
              <div className="text-sm text-neutral-400">Progress</div>
            </div>
          </div>

          {/* Today's Lesson Card */}
          {todayContent && (
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 border border-neutral-700/50 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Today&apos;s Lesson</h2>
                <span className="text-sm text-neutral-400">{todayContent.duration}</span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sound Drill */}
                {todayContent.soundDrill && (
                  <div className="bg-neutral-950/50 rounded-2xl p-5 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🔊</span>
                      <h3 className="font-semibold text-white">Sound Drill</h3>
                    </div>
                    <p className="text-emerald-400 font-medium mb-2">{todayContent.soundDrill.focus}</p>
                    <p className="text-sm text-neutral-400">{todayContent.soundDrill.description}</p>
                  </div>
                )}

                {/* Vocabulary */}
                {todayContent.vocabulary && (
                  <div className="bg-neutral-950/50 rounded-2xl p-5 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">📝</span>
                      <h3 className="font-semibold text-white">Vocabulary</h3>
                    </div>
                    <p className="text-blue-400 font-medium mb-2">{todayContent.vocabulary.topic}</p>
                    <p className="text-sm text-neutral-400">{todayContent.vocabulary.words.length} words to learn</p>
                  </div>
                )}

                {/* Output */}
                {todayContent.scenario && (
                  <div className="bg-neutral-950/50 rounded-2xl p-5 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🎤</span>
                      <h3 className="font-semibold text-white">Speak It Out</h3>
                    </div>
                    <p className="text-purple-400 font-medium mb-2">{todayContent.scenario.theme}</p>
                    <p className="text-sm text-neutral-400">{todayContent.scenario.output}</p>
                  </div>
                )}

                {/* Fluency */}
                {todayContent.fluencySkill && (
                  <div className="bg-neutral-950/50 rounded-2xl p-5 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">💬</span>
                      <h3 className="font-semibold text-white">Fluency Skill</h3>
                    </div>
                    <p className="text-amber-400 font-medium mb-2">{todayContent.fluencySkill.skill}</p>
                    <p className="text-sm text-neutral-400">{todayContent.fluencySkill.topic}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link 
                  href={`/day/${currentDay}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
                >
                  <span>Start Today&apos;s Lesson</span>
                  <span>→</span>
                </Link>
                <Link 
                  href="/curriculum"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-colors"
                >
                  <span>View Full Curriculum</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Phases Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Program Phases</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => {
            const { completed, total } = getPhaseProgress(index + 1);
            const isActive = currentPhaseNum === index + 1;
            
            return (
              <div 
                key={phase.name}
                className={`relative rounded-2xl p-6 border transition-all ${
                  isActive 
                    ? `${phase.bg} ${phase.border} ring-2 ring-offset-2 ring-offset-neutral-950 ring-${phase.color.replace('bg-', '')}`
                    : "bg-neutral-900/50 border-neutral-800"
                }`}
              >
                {isActive && (
                  <div className="absolute -top-3 left-4">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      CURRENT
                    </span>
                  </div>
                )}
                
                <div className="text-3xl mb-3">{phase.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">{phase.name}</h3>
                <p className="text-sm text-neutral-400 mb-4">Days {phase.days}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Progress</span>
                    <span className="font-medium">{completed}/{total}</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${phase.color} rounded-full transition-all`}
                      style={{ width: `${(completed / total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Word of the Day */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl p-8 border border-blue-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✨</span>
                <h2 className="text-2xl font-bold">Word of the Day</h2>
              </div>
              <p className="text-blue-400 text-lg font-semibold mb-2">{wordOfDay || "Loading..."}</p>
              <p className="text-neutral-400">
                Use this word in a sentence today! This builds your active vocabulary.
              </p>
            </div>
            <button 
              onClick={() => {
                const words = [
                  "eloquent", "fluent", "confident", "articulate", "proficient",
                  "vocabulary", "pronunciation", "intonation", "circumlocution",
                  "persuasion", "eloquence", "spontaneity", "conversational"
                ];
                setRandomWord(words[Math.floor(Math.random() * words.length)]);
                setWordOfDay(randomWord || words[0]);
                markWordOfDayUsed();
              }}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
            >
              Use My Word ✓
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Quick Actions</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/practice"
            className="group bg-neutral-900 hover:bg-neutral-800 rounded-2xl p-6 border border-neutral-800 transition-all hover:border-emerald-500/50"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">Practice Mode</h3>
            <p className="text-neutral-400 text-sm">
              Sound drills, role-plays, and interactive exercises
            </p>
          </Link>
          
          <Link 
            href="/hot-topics"
            className="group bg-neutral-900 hover:bg-neutral-800 rounded-2xl p-6 border border-neutral-800 transition-all hover:border-purple-500/50"
          >
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">Hot Topics</h3>
            <p className="text-neutral-400 text-sm">
              60-second speaking challenges on random topics
            </p>
          </Link>
          
          <Link 
            href="/circumlocution"
            className="group bg-neutral-900 hover:bg-neutral-800 rounded-2xl p-6 border border-neutral-800 transition-all hover:border-amber-500/50"
          >
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">Circumlocution</h3>
            <p className="text-neutral-400 text-sm">
              Describe without naming - build fluency skills
            </p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-500">
          <p>45-Day English Speaking Mastery Program</p>
          <p className="text-sm mt-2">New Input → Structured Practice → Real Output</p>
        </div>
      </footer>
    </main>
  );
}

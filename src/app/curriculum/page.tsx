"use client";

import { curriculum } from "@/lib/curriculum";
import { useProgressStore, getPhaseName } from "@/lib/progress";
import Link from "next/link";
import { useEffect } from "react";

export default function CurriculumPage() {
  const { progress, getCompletedDaysCount, setCurrentDay } = useProgressStore();
  const completedDays = getCompletedDaysCount();

  // Group by phase
  const phases = [
    { name: "Foundation", days: "1-10", phase: 1, description: "Mouth mechanics + survival vocabulary" },
    { name: "Construction", days: "11-25", phase: 2, description: "Sentence frames + role-play" },
    { name: "Fluency", days: "26-38", phase: 3, description: "No-translation rule + circumlocution" },
    { name: "Advanced Polish", days: "39-45", phase: 4, description: "Student-led + real-world simulation" },
  ];

  const getDayContent = (day: number) => {
    return curriculum.find(c => c.day === day);
  };

  const getDaySummary = (day: number) => {
    const content = getDayContent(day);
    if (!content) return "";
    
    if (content.vocabulary) return content.vocabulary.topic;
    if (content.scenario) return content.scenario.theme;
    if (content.fluencySkill) return content.fluencySkill.skill;
    return "";
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Full Curriculum</h1>
          <p className="text-neutral-400 text-lg">
            45 days of structured English speaking practice
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-medium">{completedDays}/45 days completed</span>
          </div>
        </div>

        {/* Phase Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {phases.map((phase, index) => {
            const phaseDays = curriculum.filter(c => c.phase === phase.phase);
            const completed = phaseDays.filter(d => progress[d.day]?.completed).length;
            const total = phaseDays.length;
            const percentage = Math.round((completed / total) * 100);
            
            const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-amber-500"];
            const borderColors = ["border-emerald-500/30", "border-blue-500/30", "border-purple-500/30", "border-amber-500/30"];
            
            return (
              <div 
                key={phase.phase}
                className={`bg-neutral-900 rounded-2xl p-6 border ${borderColors[index]}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{["🔤", "🏗️", "💬", "🎯"][index]}</span>
                  <span className="text-sm text-neutral-400">Days {phase.days}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{phase.name}</h3>
                <p className="text-sm text-neutral-400 mb-4">{phase.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Progress</span>
                    <span>{completed}/{total}</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colors[index]} rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Days List */}
        <div className="space-y-8">
          {phases.map((phase, pIndex) => {
            const phaseDays = curriculum.filter(c => c.phase === phase.phase);
            const colors = ["emerald", "blue", "purple", "amber"];
            const color = colors[pIndex];
            
            return (
              <div key={phase.phase} className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full bg-${color}-500 text-white text-sm font-medium`}>
                    Phase {phase.phase}
                  </span>
                  <h2 className="text-xl font-bold">{phase.name}</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {phaseDays.map((day) => {
                    const isCompleted = progress[day.day]?.completed;
                    
                    return (
                      <Link
                        key={day.day}
                        href={`/day/${day.day}`}
                        className={`relative p-4 rounded-xl border transition-all hover:scale-105 ${
                          isCompleted
                            ? `bg-${color}-500/10 border-${color}-500/30`
                            : "bg-neutral-800/50 border-neutral-700 hover:border-neutral-600"
                        }`}
                      >
                        {isCompleted && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                            ✓
                          </div>
                        )}
                        <div className="text-lg font-bold mb-1">Day {day.day}</div>
                        <div className={`text-sm ${isCompleted ? `text-${color}-400` : 'text-neutral-400'}`}>
                          {getDaySummary(day.day)}
                        </div>
                        <div className="text-xs text-neutral-500 mt-2">{day.duration}</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

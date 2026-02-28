"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DayProgress {
  completed: boolean;
  spokeWithoutPrompting: boolean;
  usedWordOfDay: boolean;
  submittedHomework: boolean;
}

interface ProgressState {
  progress: Record<number, DayProgress>;
  currentDay: number;
  wordOfDay: string;
  wordOfDayUsed: boolean;
  streak: number;
  
  // Actions
  markDayComplete: (day: number) => void;
  setSpokeWithoutPrompting: (day: number, value: boolean) => void;
  setUsedWordOfDay: (day: number, value: boolean) => void;
  setSubmittedHomework: (day: number, value: boolean) => void;
  setCurrentDay: (day: number) => void;
  setWordOfDay: (word: string) => void;
  markWordOfDayUsed: () => void;
  getCompletedDaysCount: () => number;
  getCurrentPhase: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      currentDay: 1,
      wordOfDay: "",
      wordOfDayUsed: false,
      streak: 0,

      markDayComplete: (day: number) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [day]: {
              ...state.progress[day],
              completed: true,
            },
          },
        })),

      setSpokeWithoutPrompting: (day: number, value: boolean) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [day]: {
              ...state.progress[day],
              spokeWithoutPrompting: value,
            },
          },
        })),

      setUsedWordOfDay: (day: number, value: boolean) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [day]: {
              ...state.progress[day],
              usedWordOfDay: value,
            },
          },
        })),

      setSubmittedHomework: (day: number, value: boolean) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [day]: {
              ...state.progress[day],
              submittedHomework: value,
            },
          },
        })),

      setCurrentDay: (day: number) => set({ currentDay: day }),

      setWordOfDay: (word: string) => set({ wordOfDay: word, wordOfDayUsed: false }),

      markWordOfDayUsed: () => set({ wordOfDayUsed: true }),

      getCompletedDaysCount: () => {
        const { progress } = get();
        return Object.values(progress).filter((p) => p.completed).length;
      },

      getCurrentPhase: () => {
        const { currentDay } = get();
        if (currentDay <= 10) return 1;
        if (currentDay <= 25) return 2;
        if (currentDay <= 38) return 3;
        return 4;
      },
    }),
    {
      name: "english-mastery-progress",
    }
  )
);

// Helper to get the phase name
export function getPhaseName(day: number): string {
  if (day <= 10) return "Foundation";
  if (day <= 25) return "Construction";
  if (day <= 38) return "Fluency";
  return "Advanced Polish";
}

// Helper to get phase description
export function getPhaseDescription(phase: number): string {
  switch (phase) {
    case 1:
      return "Build confidence, basic sounds, and survival vocabulary";
    case 2:
      return "Build sentence patterns, tense confidence, scenario-specific language";
    case 3:
      return "Think in English, drop the translate-then-speak habit";
    case 4:
      return "Confidence, natural vocabulary, real-world readiness";
    default:
      return "";
  }
}

// Helper to get phase color
export function getPhaseColor(phase: number): string {
  switch (phase) {
    case 1:
      return "bg-emerald-500";
    case 2:
      return "bg-blue-500";
    case 3:
      return "bg-purple-500";
    case 4:
      return "bg-amber-500";
    default:
      return "bg-gray-500";
  }
}

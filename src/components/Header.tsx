"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum } from "@/lib/curriculum";
import { useProgressStore, getPhaseName } from "@/lib/progress";

export function Header() {
  const pathname = usePathname();
  const { currentDay, progress, getCompletedDaysCount } = useProgressStore();
  const completedDays = getCompletedDaysCount();
  const currentPhase = getPhaseName(currentDay);

  const navItems = [
    { href: "/", label: "Dashboard", icon: "🏠" },
    { href: "/curriculum", label: "Curriculum", icon: "📚" },
    { href: "/practice", label: "Practice", icon: "🎯" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <span className="text-xl">🎓</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">English Mastery</h1>
              <p className="text-xs text-neutral-400">45-Day Program</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  }`}
                >
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden text-lg">{item.icon}</span>
                </Link>
              );
            })}
          </nav>

          {/* Progress Badge */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-neutral-400">Day {currentDay} • {currentPhase}</p>
              <p className="text-sm font-semibold text-white">{completedDays}/45 completed</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center relative">
              <svg className="w-10 h-10 -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-neutral-700"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${(completedDays / 45) * 100.53} 100.53`}
                  strokeLinecap="round"
                  className="text-emerald-500"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import React from 'react';
import { X, CheckCircle2, Circle, Flame, Calendar, Sparkles, Trophy, RotateCcw } from 'lucide-react';
import { MANTRAS_DATA } from '../data/mantrasData';

export default function DailyTrackerModal({
  isOpen,
  onClose,
  completedPrayers,
  onToggleComplete,
  streakCount,
  onResetToday
}) {
  if (!isOpen) return null;

  const total = MANTRAS_DATA.length;
  const done = completedPrayers.length;
  const isAllDone = done === total;
  const percentage = Math.round((done / total) * 100);

  const todayDate = new Intl.DateTimeFormat('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-sacred)] p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-sacred)] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              🪔
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">
                नित्य नियम दैनिक प्रगति
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Daily Sadhana & Prayer Routine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Date & Streak Banner */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-sacred)] flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[var(--accent-saffron)] shrink-0" />
            <div>
              <span className="text-[10px] text-[var(--text-secondary)] block font-medium">आज का दिन:</span>
              <span className="text-xs font-bold text-[var(--text-primary)] font-devanagari">
                {todayDate}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-amber-500/30 flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-500 shrink-0 animate-bounce" />
            <div>
              <span className="text-[10px] text-[var(--text-secondary)] block font-medium">दैनिक साधना लय:</span>
              <span className="text-sm font-extrabold text-[var(--accent-saffron)] font-heading">
                {streakCount} {streakCount === 1 ? 'दिन' : 'दिन'} Streak
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="mt-5 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-sacred)]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[var(--text-primary)] font-devanagari">
              आज की पूर्णता: <span className="text-[var(--accent-saffron)] font-bold">{done}/{total} पाठ</span>
            </span>
            <span className="font-bold text-[var(--accent-saffron)]">{percentage}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {isAllDone && (
            <div className="mt-3 p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-center text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>शुभम्! आज का संपूर्ण नित्य नियम संपन्न हुआ।</span>
            </div>
          )}
        </div>

        {/* Checklist of 6 Mantras */}
        <div className="mt-5 space-y-2 max-h-60 overflow-y-auto">
          <span className="text-xs font-bold text-[var(--text-secondary)] block mb-1">
            स्तोत्र व पाठ चेकलिस्ट:
          </span>
          {MANTRAS_DATA.map((mantra) => {
            const isDone = completedPrayers.includes(mantra.id);

            return (
              <div
                key={mantra.id}
                onClick={() => onToggleComplete(mantra.id)}
                className={`cursor-pointer p-3 rounded-2xl border flex items-center justify-between transition ${
                  isDone
                    ? 'bg-amber-500/15 border-amber-500/40 text-[var(--text-primary)]'
                    : 'bg-[var(--bg-secondary)]/60 border-[var(--border-sacred)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-[var(--text-secondary)] opacity-50 shrink-0" />
                  )}
                  <div>
                    <span className={`text-xs sm:text-sm font-devanagari block ${isDone ? 'font-bold line-through opacity-85' : 'font-semibold'}`}>
                      {mantra.number}. {mantra.title}
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)]">
                      {mantra.category} • {mantra.estimatedMinutes} मिनट
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-[var(--accent-saffron)]">
                  {isDone ? 'पूर्ण' : 'बाकी'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-[var(--border-sacred)] pt-4 text-xs">
          <button
            onClick={onResetToday}
            className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-red-500 transition font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>आज की स्थिति रीसेट करें</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-sm"
          >
            हो गया
          </button>
        </div>

      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { MANTRAS_DATA } from '../data/mantrasData';

export default function MantraNav({ activeId, completedPrayers, isZenMode }) {
  if (isZenMode) return null;

  const scrollToMantra = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-14 sm:top-16 z-30 w-full bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-sacred)]/70 py-2 px-3 overflow-x-auto no-scrollbar no-print shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max">
        {MANTRAS_DATA.map((mantra) => {
          const isActive = activeId === mantra.id;
          const isDone = completedPrayers.includes(mantra.id);

          return (
            <button
              key={mantra.id}
              onClick={() => scrollToMantra(mantra.id)}
              className={`group flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-orange-500/20 scale-[1.03] ring-1 sm:ring-2 ring-amber-400/50'
                  : isDone
                  ? 'bg-amber-500/15 text-[var(--accent-saffron)] border border-amber-500/30 hover:bg-amber-500/25'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-sacred)] hover:border-[var(--accent-gold)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold shrink-0 ${
                isActive 
                  ? 'bg-white text-orange-700' 
                  : isDone 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-black/10 dark:bg-white/10'
              }`}>
                {isDone ? <Check className="w-2 sm:w-2.5 h-2 sm:h-2.5" /> : mantra.number}
              </span>
              <span className="font-devanagari whitespace-nowrap">
                {mantra.title.replace('श्री ', '').split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

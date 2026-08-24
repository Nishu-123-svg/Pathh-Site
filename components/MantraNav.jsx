'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { MANTRAS_DATA } from '../data/mantrasData';

export default function MantraNav({ activeId, completedPrayers, isZenMode }) {
  if (isZenMode) return null;

  const scrollToMantra = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-16 sm:top-20 z-30 w-full bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-sacred)]/60 py-2.5 px-4 overflow-x-auto no-scrollbar no-print">
      <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-2 min-w-max">
        {MANTRAS_DATA.map((mantra) => {
          const isActive = activeId === mantra.id;
          const isDone = completedPrayers.includes(mantra.id);

          return (
            <button
              key={mantra.id}
              onClick={() => scrollToMantra(mantra.id)}
              className={`group flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-orange-500/20 scale-105 ring-2 ring-amber-400/50'
                  : isDone
                  ? 'bg-amber-500/15 text-[var(--accent-saffron)] border border-amber-500/30 hover:bg-amber-500/25'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-sacred)] hover:border-[var(--accent-gold)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isActive 
                  ? 'bg-white text-orange-700' 
                  : isDone 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-black/10 dark:bg-white/10'
              }`}>
                {isDone ? <Check className="w-2.5 h-2.5" /> : mantra.number}
              </span>
              <span className="font-devanagari">{mantra.title.replace('श्री ', '').split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ArrowUp } from 'lucide-react';

export default function AutoScroller({ isZenMode }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [speed, setSpeed] = useState(1);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    if (isScrolling) {
      const step = () => {
        window.scrollBy({ top: speed, behavior: 'auto' });
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 5) {
          setIsScrolling(false);
        }
      };
      scrollIntervalRef.current = setInterval(step, 40);
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isScrolling, speed]);

  const toggleScrolling = () => {
    setIsScrolling(!isScrolling);
  };

  const scrollToTop = () => {
    setIsScrolling(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cycleSpeed = () => {
    if (speed === 1) setSpeed(2);
    else if (speed === 2) setSpeed(0.5);
    else setSpeed(1);
  };

  return (
    <aside 
      aria-label="Hands-free auto scroll tools"
      className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1 p-1 sm:p-1.5 rounded-full bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-sacred)] shadow-xl transition-all duration-300 no-print ${
        isZenMode ? 'opacity-30 hover:opacity-100' : ''
      }`}
    >
      {/* Play / Pause Auto Scroll */}
      <button
        onClick={toggleScrolling}
        className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition shadow-sm ${
          isScrolling
            ? 'bg-amber-600 text-white animate-pulse'
            : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-amber-500/20'
        }`}
        title={isScrolling ? "ऑटो-स्क्रॉल रोकें" : "हाथ-मुक्त स्वतः स्क्रॉल चालू करें"}
      >
        {isScrolling ? (
          <>
            <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">रोकें</span>
          </>
        ) : (
          <>
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">स्वतः स्क्रॉल</span>
          </>
        )}
      </button>

      {/* Speed Multiplier */}
      {isScrolling && (
        <button
          onClick={cycleSpeed}
          className="px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[var(--bg-secondary)] border border-[var(--border-sacred)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          title="स्क्रॉल गति बदलें"
        >
          {speed}x
        </button>
      )}

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="p-1.5 sm:p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-sacred)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
        title="शीर्ष पर जाएं"
      >
        <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </aside>
  );
}

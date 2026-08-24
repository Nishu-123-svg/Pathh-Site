'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ArrowUp, FastForward } from 'lucide-react';

export default function AutoScroller({ isZenMode }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [speed, setSpeed] = useState(1); // 1 = normal (~1px per frame/timer), 2 = fast, 0.5 = slow
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    if (isScrolling) {
      const step = () => {
        window.scrollBy({ top: speed, behavior: 'auto' });
        // Check if reached bottom
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
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-sacred)] shadow-2xl transition-all duration-300 no-print ${
        isZenMode ? 'opacity-40 hover:opacity-100' : ''
      }`}
    >
      {/* Play / Pause Auto Scroll */}
      <button
        onClick={toggleScrolling}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition shadow-sm ${
          isScrolling
            ? 'bg-amber-600 text-white animate-pulse'
            : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-amber-500/20'
        }`}
        title={isScrolling ? "ऑटो-स्क्रॉल रोकें (Pause Auto-Scroll)" : "हाथ-मुक्त स्वतः स्क्रॉल चालू करें (Auto-Scroll)"}
      >
        {isScrolling ? (
          <>
            <Pause className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">रोकें</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">स्वतः स्क्रॉल</span>
          </>
        )}
      </button>

      {/* Speed Multiplier */}
      {isScrolling && (
        <button
          onClick={cycleSpeed}
          className="px-2.5 py-1.5 rounded-full text-[11px] font-bold bg-[var(--bg-secondary)] border border-[var(--border-sacred)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          title="स्क्रॉल गति बदलें (Change Speed)"
        >
          {speed}x
        </button>
      )}

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-sacred)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
        title="शीर्ष पर जाएं (Back to Top)"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </aside>
  );
}

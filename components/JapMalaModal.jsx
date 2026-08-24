'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award,
  ChevronRight,
  Plus
} from 'lucide-react';
import { playMalaClick, playCelebrationGong } from '../utils/soundEngine';

const PRESET_MANTRAS = [
  "ॐ गं गणपतये नमः",
  "ॐ नमः शिवाय",
  "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे",
  "ॐ नमो भगवते वासुदेवाय",
  "श्री हनुमते नमः",
  "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्"
];

export default function JapMalaModal({ isOpen, onClose, defaultMantra = "ॐ गं गणपतये नमः" }) {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [rounds, setRounds] = useState(0);
  const [totalChants, setTotalChants] = useState(0);
  const [selectedMantra, setSelectedMantra] = useState(defaultMantra);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCompletedRound, setIsCompletedRound] = useState(false);

  useEffect(() => {
    if (defaultMantra) {
      setSelectedMantra(defaultMantra);
    }
  }, [defaultMantra]);

  const handleIncrement = useCallback(() => {
    if (soundEnabled) playMalaClick();
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(25); } catch (_) {}
    }

    setCount((prev) => {
      const next = prev + 1;
      setTotalChants((t) => t + 1);

      if (next >= target) {
        setRounds((r) => r + 1);
        setIsCompletedRound(true);
        playCelebrationGong();
        try {
          if (typeof window !== 'undefined') {
            import('canvas-confetti').then((mod) => {
              const confetti = mod.default;
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ea580c', '#d97706', '#fbbf24']
              });
            });
          }
        } catch (_) {}
        return 0;
      }
      return next;
    });
  }, [target, soundEnabled]);

  // Keyboard shortcut: Spacebar to count
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleIncrement();
      } else if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleIncrement, onClose]);

  const handleReset = () => {
    setCount(0);
    setIsCompletedRound(false);
  };

  const handleFullReset = () => {
    setCount(0);
    setRounds(0);
    setTotalChants(0);
    setIsCompletedRound(false);
  };

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-sacred)] p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-sacred)] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              📿
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">
                डिजिटल जप माला
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Digital Jap Mala (Chanting Counter)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-full border border-[var(--border-sacred)] ${
                soundEnabled ? 'text-amber-600 bg-[var(--bg-secondary)]' : 'text-zinc-400'
              }`}
              title={soundEnabled ? "ध्वनि बंद करें" : "ध्वनि चालू करें"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selected Mantra Banner */}
        <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
          <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">जप हेतु मंत्र:</p>
          <p className="text-base sm:text-lg font-bold font-devanagari text-[var(--accent-saffron)]">
            {selectedMantra}
          </p>
        </div>

        {/* Target Milestone Selector */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-xs text-[var(--text-secondary)] font-semibold mr-1">लक्ष्य मनके:</span>
          {[11, 21, 54, 108].map((t) => (
            <button
              key={t}
              onClick={() => { setTarget(t); setCount(0); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                target === t
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm'
                  : 'bg-[var(--bg-secondary)] border border-[var(--border-sacred)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Interactive Center Bead Ring & Counter Button */}
        <div className="my-6 flex flex-col items-center justify-center">
          <button
            onClick={handleIncrement}
            className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-card)] border-4 border-amber-500/80 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            {/* Circular Progress SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-amber-500/20"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-amber-600 dark:stroke-amber-400 transition-all duration-200"
                strokeWidth="6"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <span className="text-xs text-[var(--text-secondary)] font-semibold uppercase tracking-wider mb-1">
              मनका (Count)
            </span>
            <span className="text-5xl sm:text-6xl font-extrabold text-[var(--text-primary)] font-heading">
              {count}
            </span>
            <span className="text-xs text-[var(--accent-saffron)] font-bold mt-1">
              / {target} (माला)
            </span>
            <span className="text-[10px] text-[var(--text-secondary)] mt-2 opacity-75">
              टैप करें या Space दबाएं
            </span>
          </button>
        </div>

        {/* Stats Row: Mala Rounds & Total Chants */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-sacred)]">
            <span className="text-[11px] text-[var(--text-secondary)] block">पूर्ण माला (Rounds)</span>
            <span className="text-xl font-extrabold text-[var(--accent-saffron)] font-heading">
              {rounds}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-sacred)]">
            <span className="text-[11px] text-[var(--text-secondary)] block">कुल मंत्र जप (Total)</span>
            <span className="text-xl font-extrabold text-[var(--accent-gold)] font-heading">
              {totalChants}
            </span>
          </div>
        </div>

        {/* Quick Mantra Presets */}
        <div className="mt-4">
          <span className="text-[11px] text-[var(--text-secondary)] font-semibold block mb-2">
            अन्य पवित्र मंत्र चुनें:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {PRESET_MANTRAS.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedMantra(m)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-devanagari transition text-left truncate max-w-full ${
                  selectedMantra === m
                    ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-sacred)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-5 flex items-center justify-between border-t border-[var(--border-sacred)] pt-4 text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>वर्तमान चक्र रीसेट</span>
          </button>

          <button
            onClick={handleFullReset}
            className="text-red-500/80 hover:text-red-600 transition font-medium"
          >
            सभी रीसेट करें
          </button>
        </div>

      </div>
    </div>
  );
}

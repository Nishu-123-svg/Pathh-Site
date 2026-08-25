'use client';

import React, { useState } from 'react';
import { Bell, Flame } from 'lucide-react';
import { playTempleBell, playMalaClick } from '../utils/soundEngine';

export default function TempleDiya({ isZenMode }) {
  const [isLit, setIsLit] = useState(true);
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [isOfferingPushpa, setIsOfferingPushpa] = useState(false);
  const [offeringText, setOfferingText] = useState('');

  const handleRingBell = () => {
    setIsBellRinging(true);
    playTempleBell();
    setTimeout(() => setIsBellRinging(false), 900);
  };

  const handleFlowerOffering = async () => {
    setIsOfferingPushpa(true);
    playMalaClick();
    setOfferingText('॥ 🌸 श्री चरणेषु पुष्पसमर्पणम् ॥');

    // Temple Flower Shower (पुष्प वृष्टि) via safe client-side canvas-confetti
    try {
      if (typeof window !== 'undefined') {
        const confetti = (await import('canvas-confetti')).default;
        
        // Left petal burst
        confetti({
          particleCount: 24,
          angle: 60,
          spread: 50,
          origin: { x: 0.2, y: 0.4 },
          colors: ['#f97316', '#fbbf24', '#f43f5e', '#fb7185', '#ffffff', '#e11d48'],
          ticks: 180,
          gravity: 0.8,
          scalar: 1.1,
          shapes: ['circle']
        });

        // Right petal burst
        confetti({
          particleCount: 24,
          angle: 120,
          spread: 50,
          origin: { x: 0.8, y: 0.4 },
          colors: ['#f97316', '#fbbf24', '#f43f5e', '#fb7185', '#ffffff', '#e11d48'],
          ticks: 180,
          gravity: 0.8,
          scalar: 1.1,
          shapes: ['circle']
        });

        // Center shower from above
        setTimeout(() => {
          confetti({
            particleCount: 30,
            spread: 70,
            origin: { x: 0.5, y: 0.2 },
            colors: ['#f59e0b', '#fb923c', '#ec4899', '#f43f5e', '#fffbeb'],
            ticks: 200,
            gravity: 0.6,
            scalar: 1.2,
          });
        }, 200);
      }
    } catch (e) {
      console.warn("Confetti error:", e);
    }

    setTimeout(() => {
      setIsOfferingPushpa(false);
    }, 2000);

    setTimeout(() => {
      setOfferingText('');
    }, 2800);
  };

  if (isZenMode) return null;

  return (
    <div className="relative overflow-hidden pt-5 pb-7 sm:pt-10 sm:pb-12 px-3 sm:px-6 text-center border-b border-[var(--border-sacred)] bg-gradient-to-b from-[var(--bg-secondary)]/60 to-[var(--bg-primary)] no-print">
      
      {/* Background Sacred Mandala SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 dark:opacity-10">
        <svg className="w-80 h-80 sm:w-96 sm:h-96 animate-spin-slow text-[var(--accent-gold)]" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
          <polygon points="50,10 62,38 90,50 62,62 50,90 38,62 10,50 38,38" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
      </div>

      {/* Floating Pushpa Samarpan Sanskrit Banner */}
      {offeringText && (
        <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-amber-950/90 text-amber-100 border border-amber-400/40 shadow-2xl backdrop-blur-md font-devanagari font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2">
            <span>{offeringText}</span>
          </div>
        </div>
      )}

      {/* Sacred Header */}
      <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-semibold shadow-sm">
          <span>॥ ॐ श्री गणेशाय नमः ॥ ॐ नमो भगवते वासुदेवाय ॥</span>
        </div>

        <div className="py-1 px-1 overflow-visible">
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black font-devanagari text-amber-700 dark:text-amber-300 tracking-wide drop-shadow-sm leading-tight sm:leading-normal py-1">
            नित्य नियम एवं पावन स्तुति
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-devanagari max-w-xl mx-auto leading-relaxed px-2">
          प्रतिदिन प्रातः एवं सायं कालीन साधना हेतु संपूर्ण ६ स्तोत्र, चालीसा, माहात्म्य व आरती का सतत प्रवाह।
        </p>

        {/* Sacred Altar Widgets: Diya, Bell, Pushpa Offering (Grid 3 cols on mobile) */}
        <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-6 max-w-xs sm:max-w-none mx-auto">
          
          {/* 1. Interactive Ceremonial Diya */}
          <div 
            onClick={() => setIsLit(!isLit)}
            className="group cursor-pointer flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-sacred)] hover:border-amber-500 shadow-sm hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 min-h-[90px] sm:min-h-[110px]"
            title={isLit ? "दीपक प्रज्वलित है (Click to extinguish)" : "दीपक जलाएं (Click to light Diya)"}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-end">
              {/* Flame */}
              {isLit ? (
                <div className="relative mb-0.5 sm:mb-1">
                  <div className="w-4 h-6 sm:w-5 sm:h-7 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 rounded-full animate-flame-flicker diya-glow" />
                  <div className="absolute top-1 left-0.5 w-2 h-3.5 bg-white/70 rounded-full blur-[1px]" />
                </div>
              ) : (
                <div className="w-1.5 h-2.5 bg-zinc-600 rounded-full mb-1 opacity-50" />
              )}
              {/* Diya Clay Pot */}
              <div className="w-8 sm:w-10 h-3 sm:h-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-b-full border-t border-amber-500 shadow-sm" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[var(--text-secondary)] mt-1 flex items-center gap-0.5 sm:gap-1">
              <Flame className="w-3 h-3 text-orange-500 shrink-0" />
              <span className="whitespace-nowrap">{isLit ? "दीप प्रज्वलित" : "दीप जलाएं"}</span>
            </span>
          </div>

          {/* 2. Interactive Brass Temple Bell */}
          <button
            onClick={handleRingBell}
            className="group flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-sacred)] hover:border-amber-500 shadow-sm hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 min-h-[90px] sm:min-h-[110px]"
            title="घंटी की पावन ध्वनि सुनें (Ring Temple Bell)"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform ${isBellRinging ? 'rotate-12 scale-110' : 'group-hover:rotate-6'}`}>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 flex items-center justify-center text-amber-950 shadow-sm border border-amber-300/40">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[var(--text-secondary)] mt-1 flex items-center gap-0.5 sm:gap-1">
              <Bell className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">घंटी बजाएं</span>
            </span>
          </button>

          {/* 3. Sacred Pushpa Offering (पुष्प अर्पण) */}
          <button
            onClick={handleFlowerOffering}
            className="group flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-sacred)] hover:border-rose-400 shadow-sm hover:shadow-rose-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 min-h-[90px] sm:min-h-[110px]"
            title="श्री चरणों में पुष्प अर्पित करें (Offer Sacred Flowers)"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform ${isOfferingPushpa ? 'scale-125 rotate-45' : 'group-hover:scale-110'}`}>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-500 via-rose-500 to-red-600 flex items-center justify-center text-white shadow-sm border border-rose-300/40">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.5C12 2.5 9 6.5 9 10.5C9 13.5 10.5 15.5 12 16.5C13.5 15.5 15 13.5 15 10.5C15 6.5 12 2.5 12 2.5Z" fill="#fff1f2" />
                  <path d="M7 6C7 6 4.5 9.5 5 12.5C5.5 15.5 8 16.5 9.5 17C8.5 15.5 8 13.5 8.5 11C9 8.5 10 7 10 7C10 7 7.5 6 7 6Z" fill="#fecdd3" opacity="0.95" />
                  <path d="M17 6C17 6 19.5 9.5 19 12.5C18.5 15.5 16 16.5 14.5 17C15.5 15.5 16 13.5 15.5 11C15 8.5 14 7 14 7C14 7 16 6 17 6Z" fill="#fecdd3" opacity="0.95" />
                  <path d="M3.5 10.5C3.5 10.5 2 13 3 15.5C4 18 7 18 8.5 18C7 17 6 15 6.5 13C7 11 8 10 8 10C8 10 4.5 10 3.5 10.5Z" fill="#fda4af" opacity="0.9" />
                  <path d="M20.5 10.5C20.5 10.5 22 13 21 15.5C20 18 17 18 15.5 18C17 17 18 15 17.5 13C17 11 16 10 16 10C16 10 19.5 10 20.5 10.5Z" fill="#fda4af" opacity="0.9" />
                  <ellipse cx="12" cy="18.5" rx="5" ry="1.5" fill="#ea580c" />
                </svg>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[var(--text-secondary)] mt-1 flex items-center gap-0.5 sm:gap-1 group-hover:text-rose-600 transition-colors">
              <span>🌸</span> <span className="whitespace-nowrap">पुष्प अर्पण</span>
            </span>
          </button>

        </div>

      </div>

    </div>
  );
}

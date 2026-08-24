'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  Menu, 
  X, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';
import { playTempleBell, toggleOmDrone } from '../utils/soundEngine';
import { MANTRAS_DATA } from '../data/mantrasData';

export default function Navbar({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  isZenMode,
  setIsZenMode,
  completedCount,
  onOpenJapMala,
  onOpenDailyTracker,
  activeId
}) {
  const [isOmPlaying, setIsOmPlaying] = useState(false);
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);

  const handleRingBell = () => {
    setIsBellRinging(true);
    playTempleBell();
    setTimeout(() => setIsBellRinging(false), 800);
  };

  const handleToggleDrone = () => {
    const newState = !isOmPlaying;
    toggleOmDrone(newState);
    setIsOmPlaying(newState);
  };

  const cycleTheme = () => {
    if (theme === 'theme-saffron') setTheme('theme-sandalwood');
    else if (theme === 'theme-sandalwood') setTheme('theme-dark');
    else setTheme('theme-saffron');
  };

  const themeLabel = {
    'theme-saffron': 'स्वर्ण सांध्य (Saffron)',
    'theme-sandalwood': 'चंदन प्रातः (Sandalwood)',
    'theme-dark': 'निशा ध्यान (Night Dark)',
  }[theme];

  const scrollToMantra = (id) => {
    setMobileMenuOpen(false);
    setNavDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isZenMode) {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-amber-200 border border-amber-500/30 text-xs shadow-lg transition-all">
        <span>ध्यान मोड (Zen Mode)</span>
        <button
          onClick={() => setIsZenMode(false)}
          className="p-1 hover:bg-white/20 rounded-full transition"
          title="Exit Zen Mode"
        >
          <Minimize2 className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg-card)]/90 border-b border-[var(--border-sacred)] transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Sacred Title */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleRingBell}
              className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 text-white shadow-md hover:shadow-amber-500/40 transition-transform active:scale-95 ${
                isBellRinging ? 'animate-bounce' : ''
              }`}
              title="पवित्र घंटी बजाएं (Ring Temple Bell)"
            >
              <span className="text-xl sm:text-2xl font-bold font-sanskrit">ॐ</span>
              {isBellRinging && (
                <span className="absolute -inset-1 rounded-full border-2 border-amber-400 animate-ping" />
              )}
            </button>

            <div>
              <a href="#top" className="flex items-baseline space-x-2">
                <h1 className="text-lg sm:text-2xl font-bold font-devanagari text-amber-700 dark:text-amber-300 tracking-wide py-0.5">
                  नित्य नियम पूजा
                </h1>
              </a>
              <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium">
                ६ पावन मंत्र एवं नित्य पाठ संग्रह
              </p>
            </div>
          </div>

          {/* Center: Quick Mantra Jumper (Desktop) */}
          <div className="hidden lg:flex items-center relative">
            <div className="relative">
              <button
                onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-secondary)] border border-[var(--border-sacred)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>पाठ सूची (Select Mantra)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${navDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {navDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[var(--bg-card)] border border-[var(--border-sacred)] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-sacred)]">
                    ६ नित्य स्तोत्र व मंत्र
                  </div>
                  {MANTRAS_DATA.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToMantra(item.id)}
                      className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between hover:bg-[var(--bg-secondary)] transition ${
                        activeId === item.id ? 'font-bold text-[var(--accent-saffron)] bg-[var(--bg-secondary)]/70' : 'text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-[10px]">
                          {item.number}
                        </span>
                        <span className="truncate">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-[var(--text-secondary)] ml-2 whitespace-nowrap">
                        {item.estimatedMinutes} min
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            
            {/* Daily Progress Tracker Button */}
            <button
              onClick={onOpenDailyTracker}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-[var(--text-primary)] hover:bg-amber-500/25 transition shadow-sm"
              title="दैनिक नियम स्थिति (Daily Sadhana Progress)"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">नियम:</span>
              <span className="font-bold text-[var(--accent-saffron)]">{completedCount}/6</span>
            </button>

            {/* Jap Mala Counter Launcher */}
            <button
              onClick={onOpenJapMala}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition"
              title="जप माला काउंटर (Digital Jap Mala 108)"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">जप माला</span>
            </button>

            {/* Temple Bell Direct Ring */}
            <button
              onClick={handleRingBell}
              className={`p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition ${
                isBellRinging ? 'text-amber-500 scale-110' : ''
              }`}
              title="घंटी बजाएं (Ring Temple Bell)"
            >
              <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>

            {/* 432Hz Om Ambient Sound Toggle */}
            <button
              onClick={handleToggleDrone}
              className={`p-2 rounded-full border border-[var(--border-sacred)] transition ${
                isOmPlaying 
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/30' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent-gold)]'
              }`}
              title={isOmPlaying ? 'ॐ ध्यान ध्वनि बंद करें' : 'ॐ ध्यान ध्वनि चालू करें (432Hz Ambient Tanpura)'}
            >
              {isOmPlaying ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-[var(--text-secondary)]" />
              )}
            </button>

            {/* Font Size Adjuster (+ / -) */}
            <div className="hidden sm:flex items-center border border-[var(--border-sacred)] bg-[var(--bg-secondary)] rounded-full px-1 py-0.5 text-xs font-bold">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="px-2 py-0.5 rounded-full hover:bg-[var(--bg-card)] text-[var(--text-secondary)] transition"
                title="अक्षर छोटा करें (Smaller font)"
              >
                A-
              </button>
              <span className="px-1 text-[11px] text-[var(--text-secondary)]">{fontSize}</span>
              <button
                onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                className="px-2 py-0.5 rounded-full hover:bg-[var(--bg-card)] text-[var(--text-secondary)] transition"
                title="अक्षर बड़ा करें (Larger font)"
              >
                A+
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition"
              title={`थीम बदलें: ${themeLabel}`}
            >
              {theme === 'theme-dark' ? (
                <Moon className="w-4 h-4 text-amber-300" />
              ) : (
                <Sun className="w-4 h-4 text-amber-600" />
              )}
            </button>

            {/* Zen Mode Toggle */}
            <button
              onClick={() => setIsZenMode(true)}
              className="hidden md:flex p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition"
              title="ध्यान मोड (Full Focus Zen Mode)"
            >
              <Maximize2 className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-card)] border-b border-[var(--border-sacred)] px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] px-2 pt-2">
            ६ नित्य पाठ सूची
          </div>
          <div className="grid grid-cols-1 gap-1">
            {MANTRAS_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToMantra(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between transition ${
                  activeId === item.id 
                    ? 'bg-amber-500/20 text-[var(--accent-saffron)] font-bold' 
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-xs">
                    {item.number}
                  </span>
                  <span>{item.title}</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)]">{item.estimatedMinutes}m</span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[var(--border-sacred)] text-xs text-[var(--text-secondary)]">
            <span>अक्षर आकार (Font Size):</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="px-3 py-1 rounded-lg border border-[var(--border-sacred)] bg-[var(--bg-secondary)] font-bold"
              >
                A-
              </button>
              <span className="font-bold text-[var(--text-primary)]">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                className="px-3 py-1 rounded-lg border border-[var(--border-sacred)] bg-[var(--bg-secondary)] font-bold"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

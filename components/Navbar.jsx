'use client';

import React, { useState } from 'react';
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
  ChevronDown,
  Flame,
  Printer,
  Share2
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
      const navOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isZenMode) {
    return (
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-amber-200 border border-amber-500/40 text-xs shadow-xl transition-all">
        <span>ध्यान मोड (Zen)</span>
        <button
          onClick={() => setIsZenMode(false)}
          className="p-1 hover:bg-white/20 rounded-full transition"
          title="Exit Zen Mode"
        >
          <Minimize2 className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg-card)]/95 border-b border-[var(--border-sacred)] transition-colors no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Left: Brand Logo & Title (Never wraps on mobile) */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button 
              onClick={handleRingBell}
              className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 text-white shadow-sm hover:shadow-amber-500/40 transition-transform active:scale-95 shrink-0 ${
                isBellRinging ? 'animate-bounce' : ''
              }`}
              title="पवित्र घंटी बजाएं (Ring Temple Bell)"
            >
              <span className="text-base sm:text-xl font-bold font-sanskrit">ॐ</span>
              {isBellRinging && (
                <span className="absolute -inset-1 rounded-full border-2 border-amber-400 animate-ping" />
              )}
            </button>

            <a href="#top" className="flex flex-col justify-center">
              <span className="text-base sm:text-xl font-bold font-devanagari text-amber-700 dark:text-amber-300 tracking-wide whitespace-nowrap leading-none">
                नित्य नियम पूजा
              </span>
              <span className="hidden sm:block text-[10px] text-[var(--text-secondary)] font-medium mt-0.5 whitespace-nowrap">
                ६ पावन मंत्र एवं नित्य पाठ संग्रह
              </span>
            </a>
          </div>

          {/* Center: Quick Mantra Jumper Dropdown (Desktop only) */}
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
                        {item.estimatedMinutes}m
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Essential Toolbar Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Daily Progress Tracker Button (Always visible) */}
            <button
              onClick={onOpenDailyTracker}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-[var(--text-primary)] hover:bg-amber-500/25 transition shadow-sm shrink-0"
              title="दैनिक नियम स्थिति (Daily Sadhana Progress)"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-bold text-[var(--accent-saffron)]">{completedCount}/6</span>
            </button>

            {/* Jap Mala Counter Launcher (Always visible) */}
            <button
              onClick={onOpenJapMala}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm hover:shadow-orange-500/30 active:scale-95 transition shrink-0"
              title="जप माला काउंटर (Digital Jap Mala 108)"
            >
              <span className="text-xs">📿</span>
              <span className="hidden sm:inline">जप माला</span>
            </button>

            {/* Desktop Only Controls (Hidden on mobile to keep navbar 1-line clean) */}
            <div className="hidden md:flex items-center space-x-1.5">
              
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
              <div className="flex items-center border border-[var(--border-sacred)] bg-[var(--bg-secondary)] rounded-full px-1 py-0.5 text-xs font-bold">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className="px-2 py-0.5 rounded-full hover:bg-[var(--bg-card)] text-[var(--text-secondary)] transition"
                  title="अक्षर छोटा करें"
                >
                  A-
                </button>
                <span className="px-1 text-[11px] text-[var(--text-secondary)]">{fontSize}</span>
                <button
                  onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                  className="px-2 py-0.5 rounded-full hover:bg-[var(--bg-card)] text-[var(--text-secondary)] transition"
                  title="अक्षर बड़ा करें"
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
                className="p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition"
                title="ध्यान मोड (Full Focus Zen Mode)"
              >
                <Maximize2 className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </div>

            {/* Mobile Drawer Menu Button (Always on right on mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition shrink-0"
              title="मेनू खोलें"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Sliding Drawer Menu */}
      {mobileMenuOpen && (
        <div className="bg-[var(--bg-card)] border-b border-[var(--border-sacred)] px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Quick Audio & Ritual Toolbar */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            <button
              onClick={handleRingBell}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[var(--border-sacred)] bg-[var(--bg-secondary)] hover:border-amber-500 transition text-[var(--text-primary)]"
            >
              <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
              <span className="text-[10px] font-bold">घंटी</span>
            </button>

            <button
              onClick={handleToggleDrone}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition ${
                isOmPlaying 
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md' 
                  : 'border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-primary)]'
              }`}
            >
              {isOmPlaying ? <Volume2 className="w-4 h-4 mb-1 animate-pulse" /> : <VolumeX className="w-4 h-4 mb-1 text-[var(--text-secondary)]" />}
              <span className="text-[10px] font-bold">ॐ ध्वनि</span>
            </button>

            <button
              onClick={cycleTheme}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[var(--border-sacred)] bg-[var(--bg-secondary)] hover:border-amber-500 transition text-[var(--text-primary)]"
            >
              {theme === 'theme-dark' ? <Moon className="w-4 h-4 text-amber-300 mb-1" /> : <Sun className="w-4 h-4 text-amber-600 mb-1" />}
              <span className="text-[10px] font-bold">थीम</span>
            </button>

            <button
              onClick={() => { setIsZenMode(true); setMobileMenuOpen(false); }}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[var(--border-sacred)] bg-[var(--bg-secondary)] hover:border-amber-500 transition text-[var(--text-primary)]"
            >
              <Maximize2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
              <span className="text-[10px] font-bold">ध्यान मोड</span>
            </button>
          </div>

          {/* Font Size Selector Row */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-sacred)] text-xs">
            <span className="font-semibold text-[var(--text-secondary)]">अक्षर आकार (Font Size):</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="px-3 py-1 rounded-lg border border-[var(--border-sacred)] bg-[var(--bg-card)] font-bold text-[var(--text-primary)] shadow-sm"
              >
                A-
              </button>
              <span className="font-bold text-[var(--accent-saffron)] min-w-[2.5rem] text-center">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                className="px-3 py-1 rounded-lg border border-[var(--border-sacred)] bg-[var(--bg-card)] font-bold text-[var(--text-primary)] shadow-sm"
              >
                A+
              </button>
            </div>
          </div>

          {/* 6 Mantras List */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] px-1">
              ६ नित्य पाठ सूची:
            </div>
            {MANTRAS_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToMantra(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition ${
                  activeId === item.id 
                    ? 'bg-amber-500/20 text-[var(--accent-saffron)] font-bold border border-amber-500/30' 
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-[10px]">
                    {item.number}
                  </span>
                  <span className="font-devanagari">{item.title}</span>
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] font-medium">{item.estimatedMinutes}m</span>
              </button>
            ))}
          </div>

        </div>
      )}
    </header>
  );
}

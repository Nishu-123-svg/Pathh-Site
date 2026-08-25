'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MantraNav from '../components/MantraNav';
import TempleDiya from '../components/TempleDiya';
import MantraCard from '../components/MantraCard';
import JapMalaModal from '../components/JapMalaModal';
import DailyTrackerModal from '../components/DailyTrackerModal';
import AutoScroller from '../components/AutoScroller';
import Footer from '../components/Footer';
import { MANTRAS_DATA } from '../data/mantrasData';

export default function Home() {
  const [theme, setTheme] = useState('theme-saffron');
  const [fontSize, setFontSize] = useState(18);
  const [isZenMode, setIsZenMode] = useState(false);
  const [completedPrayers, setCompletedPrayers] = useState([]);
  const [streakCount, setStreakCount] = useState(1);
  const [activeId, setActiveId] = useState(MANTRAS_DATA[0].id);

  // Modals state
  const [isJapMalaOpen, setIsJapMalaOpen] = useState(false);
  const [japMalaMantra, setJapMalaMantra] = useState('ॐ गं गणपतये नमः');
  const [isDailyTrackerOpen, setIsDailyTrackerOpen] = useState(false);

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('nitya_theme');
      if (savedTheme) setTheme(savedTheme);

      const savedFontSize = localStorage.getItem('nitya_font_size');
      if (savedFontSize) setFontSize(Number(savedFontSize));

      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem('nitya_today_date');
      const savedCompleted = localStorage.getItem('nitya_completed_prayers');
      const savedStreak = localStorage.getItem('nitya_streak_count');

      if (savedDate === todayStr && savedCompleted) {
        setCompletedPrayers(JSON.parse(savedCompleted));
      } else {
        // New day: check streak
        if (savedDate) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          if (savedDate === yesterdayStr && savedCompleted && JSON.parse(savedCompleted).length > 0) {
            const currentStreak = Number(savedStreak || 1);
            setStreakCount(currentStreak + 1);
            localStorage.setItem('nitya_streak_count', String(currentStreak + 1));
          }
        }
        localStorage.setItem('nitya_today_date', todayStr);
        localStorage.setItem('nitya_completed_prayers', JSON.stringify([]));
      }

      if (savedStreak) setStreakCount(Number(savedStreak));
    } catch (e) {
      console.warn('Storage load error:', e);
    }
  }, []);

  // Sync theme changes to document body class & storage
  useEffect(() => {
    try {
      document.documentElement.className = theme;
      localStorage.setItem('nitya_theme', theme);
    } catch (_) {}
  }, [theme]);

  // Sync font size
  useEffect(() => {
    try {
      localStorage.setItem('nitya_font_size', String(fontSize));
    } catch (_) {}
  }, [fontSize]);

  // Intersection Observer for continuous scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const mantra of MANTRAS_DATA) {
        const el = document.getElementById(mantra.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(mantra.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleComplete = (id) => {
    setCompletedPrayers((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [...prev, id];
      }
      try {
        localStorage.setItem('nitya_completed_prayers', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };

  const handleResetToday = () => {
    setCompletedPrayers([]);
    try {
      localStorage.setItem('nitya_completed_prayers', JSON.stringify([]));
    } catch (_) {}
  };

  const openJapMalaWith = (mantraName) => {
    setJapMalaMantra(mantraName);
    setIsJapMalaOpen(true);
  };

  return (
    <div className={`min-h-screen ${theme} flex flex-col justify-between`}>
      <a id="top" className="sr-only">Top of Page</a>

      {/* Main Navigation Bar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        isZenMode={isZenMode}
        setIsZenMode={setIsZenMode}
        completedCount={completedPrayers.length}
        onOpenJapMala={() => setIsJapMalaOpen(true)}
        onOpenDailyTracker={() => setIsDailyTrackerOpen(true)}
        activeId={activeId}
      />

      {/* Sacred Diya and Ceremonial Altar */}
      <TempleDiya isZenMode={isZenMode} />

      {/* Sticky Progress & Mantra Navigation */}
      <MantraNav
        activeId={activeId}
        completedPrayers={completedPrayers}
        isZenMode={isZenMode}
      />

      {/* Continuous Main Prayer Flow */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-12 space-y-8 sm:space-y-16">
        {MANTRAS_DATA.map((mantra) => (
          <MantraCard
            key={mantra.id}
            mantra={mantra}
            fontSize={fontSize}
            isCompleted={completedPrayers.includes(mantra.id)}
            onToggleComplete={handleToggleComplete}
            onOpenJapMalaWith={openJapMalaWith}
          />
        ))}
      </main>

      {/* Floating Auto-Scroller Controller */}
      <AutoScroller isZenMode={isZenMode} />

      {/* Sacred Footer */}
      <Footer isZenMode={isZenMode} />

      {/* Jap Mala Counter Modal */}
      <JapMalaModal
        isOpen={isJapMalaOpen}
        onClose={() => setIsJapMalaOpen(false)}
        defaultMantra={japMalaMantra}
      />

      {/* Daily Progress Tracker Modal */}
      <DailyTrackerModal
        isOpen={isDailyTrackerOpen}
        onClose={() => setIsDailyTrackerOpen(false)}
        completedPrayers={completedPrayers}
        onToggleComplete={handleToggleComplete}
        streakCount={streakCount}
        onResetToday={handleResetToday}
      />
    </div>
  );
}

'use client';

import React from 'react';
import { Printer, Heart, ArrowUp, Share2, Sparkles } from 'lucide-react';
import { MANTRAS_DATA } from '../data/mantrasData';

export default function Footer({ isZenMode }) {
  if (isZenMode) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'नित्य नियम पूजा - ६ पावन मन्त्र एवं स्तुति संग्रह',
        text: 'दैनिक पूजा व साधना हेतु ६ पावन मंत्र, चालीसा, स्तोत्र व माहात्म्य।',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('साइट लिंक कॉपी कर लिया गया है!');
    }
  };

  return (
    <footer className="border-t border-[var(--border-sacred)] bg-[var(--bg-secondary)]/80 pt-12 pb-16 px-4 sm:px-6 mt-20 no-print">
      <div className="max-w-5xl mx-auto space-y-10 text-center">
        
        {/* Shanti Mantra */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-sacred)] shadow-md max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[var(--accent-saffron)] tracking-widest uppercase">
            ॥ शान्ति मन्त्र ॥
          </span>
          <p className="text-base sm:text-lg font-bold font-devanagari text-[var(--text-primary)] leading-relaxed">
            ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।<br />
            वनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥
          </p>
          <p className="text-sm font-extrabold text-[var(--accent-gold)] font-heading">
            ॥ ॐ शान्तिः शान्तिः शान्तिः ॥
          </p>
        </div>

        {/* 6 Mantras Quick Directory */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            ६ पावन स्तोत्र व पाठ संग्रह:
          </span>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {MANTRAS_DATA.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-sacred)] text-[var(--text-primary)] hover:border-amber-500 hover:text-[var(--accent-saffron)] transition"
              >
                {item.number}. {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* Action Buttons: Print & Share */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-sacred)] text-[var(--text-primary)] hover:border-amber-500 transition shadow-sm"
            title="प्रिंट / PDF सेव करें"
          >
            <Printer className="w-3.5 h-3.5 text-amber-600" />
            <span>प्रिंट / PDF सेव करें</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-sacred)] text-[var(--text-primary)] hover:border-amber-500 transition shadow-sm"
            title="मित्रों व परिजनों के साथ साझा करें"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-600" />
            <span>साझा करें</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-sacred)] text-[var(--text-primary)] hover:border-amber-500 transition shadow-sm"
            title="ऊपर जाएं"
          >
            <ArrowUp className="w-3.5 h-3.5 text-amber-600" />
            <span>शीर्ष पर जाएं</span>
          </button>
        </div>

        {/* Dedication and Copyright */}
        <div className="pt-6 border-t border-[var(--border-sacred)]/60 text-xs text-[var(--text-secondary)] space-y-1">
          <p className="flex items-center justify-center gap-1">
            <span>सर्वभूतहिते रताः • नित्य नियम पावन साधना</span>
          </p>
          <p className="opacity-75">
            सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
          </p>
        </div>

      </div>
    </footer>
  );
}

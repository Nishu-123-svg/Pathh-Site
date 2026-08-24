'use client';

import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  CheckCheck, 
  Volume2, 
  VolumeX, 
  Languages, 
  HelpCircle, 
  Sparkles, 
  Share2,
  Clock
} from 'lucide-react';
import { playCelebrationGong } from '../utils/soundEngine';

export default function MantraCard({
  mantra,
  fontSize,
  isCompleted,
  onToggleComplete,
  onOpenJapMalaWith
}) {
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [showMeanings, setShowMeanings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    let fullText = `${mantra.title}\n\n`;
    mantra.sections.forEach((sec) => {
      if (sec.badge) fullText += `${sec.badge}\n`;
      if (sec.lines) fullText += sec.lines.join('\n') + '\n\n';
      if (sec.verses) {
        sec.verses.forEach((v) => {
          fullText += v.lines.join('\n') + '\n\n';
        });
      }
      if (sec.stanzas) {
        sec.stanzas.forEach((s) => {
          fullText += s.lines.join('\n') + '\n\n';
        });
      }
      if (sec.paragraphs) {
        fullText += sec.paragraphs.join('\n\n') + '\n\n';
      }
    });

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleDone = async () => {
    const nextState = !isCompleted;
    onToggleComplete(mantra.id);
    if (nextState) {
      playCelebrationGong();
      try {
        if (typeof window !== 'undefined') {
          const confetti = (await import('canvas-confetti')).default;
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#ea580c', '#d97706', '#fbbf24', '#f59e0b']
          });
        }
      } catch (_) {}
    }
  };

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();

      let textToRead = `${mantra.title}। `;
      mantra.sections.forEach((sec) => {
        if (sec.lines) textToRead += sec.lines.join(' ') + ' ';
        if (sec.verses) {
          sec.verses.forEach((v) => {
            textToRead += v.lines.join(' ') + ' ';
          });
        }
        if (sec.stanzas) {
          sec.stanzas.forEach((s) => {
            textToRead += s.lines.join(' ') + ' ';
          });
        }
        if (sec.paragraphs) {
          textToRead += sec.paragraphs.join(' ') + ' ';
        }
      });

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85; // Calming devotional pace

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <article
      id={mantra.id}
      className={`mantra-section scroll-mt-28 relative rounded-3xl bg-[var(--bg-card)] border-2 transition-all duration-300 overflow-hidden shadow-lg ${
        isCompleted
          ? 'border-amber-500/60 ring-1 ring-amber-500/20'
          : 'border-[var(--border-sacred)] hover:border-amber-400/80'
      }`}
    >
      {/* Decorative Golden Corner Flourishes */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none border-t-2 border-l-2 border-[var(--accent-gold)] rounded-tl-2xl m-2" />
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t-2 border-r-2 border-[var(--accent-gold)] rounded-tr-2xl m-2" />
      <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none border-b-2 border-l-2 border-[var(--accent-gold)] rounded-bl-2xl m-2" />
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none border-b-2 border-r-2 border-[var(--accent-gold)] rounded-br-2xl m-2" />

      {/* Header Banner */}
      <div className="px-6 py-6 sm:px-10 sm:py-8 border-b border-[var(--border-sacred)] bg-gradient-to-b from-[var(--bg-secondary)]/70 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-xs shadow-sm">
                {mantra.number}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-[var(--accent-saffron)] border border-amber-500/30">
                {mantra.category}
              </span>
              <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {mantra.estimatedMinutes} मिनट
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold font-devanagari text-[var(--text-primary)] tracking-wide leading-snug sm:leading-normal py-1">
              {mantra.title}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium italic">
              {mantra.transliterationTitle} • <span className="not-italic font-semibold text-[var(--accent-saffron)]">{mantra.deity}</span>
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2 pt-2 sm:pt-0 no-print">
            
            {/* Mark Completed Button */}
            <button
              onClick={handleToggleDone}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${
                isCompleted
                  ? 'bg-amber-600 text-white shadow-amber-600/30'
                  : 'bg-[var(--bg-secondary)] border border-[var(--border-sacred)] text-[var(--text-primary)] hover:border-amber-500'
              }`}
              title={isCompleted ? "नियम पूर्ण हुआ" : "नियम पूर्ण चिह्नित करें"}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isCompleted ? "पाठ पूर्ण ✓" : "पूर्ण चिह्नित करें"}</span>
            </button>

            {/* Jap Mala Direct Link */}
            <button
              onClick={() => onOpenJapMalaWith(mantra.title)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-[var(--accent-saffron)] hover:bg-amber-500/25 transition"
              title="इस मंत्र के लिए जप माला खोलें"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">जप करें</span>
            </button>

            {/* Read Aloud / TTS */}
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-full border border-[var(--border-sacred)] transition ${
                isSpeaking 
                  ? 'bg-orange-500 text-white border-orange-600 animate-pulse' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              title={isSpeaking ? "स्वर पाठ रोकें" : "स्वर पाठ सुनें (Text-to-Speech)"}
            >
              {isSpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Toggle Transliteration (Romanized) */}
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className={`p-2 rounded-full border transition ${
                showTransliteration
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              title="रोमन लिपि / Transliteration चालू/बंद करें"
            >
              <Languages className="w-3.5 h-3.5" />
            </button>

            {/* Toggle Meaning */}
            <button
              onClick={() => setShowMeanings(!showMeanings)}
              className={`p-2 rounded-full border transition ${
                showMeanings
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              title="भावार्थ / Meaning चालू/बंद करें"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-full border border-[var(--border-sacred)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
              title="संपूर्ण पाठ कॉपी करें"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

          </div>

        </div>

        {/* Intro Description */}
        {mantra.description && (
          <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] font-devanagari">
            {mantra.description}
          </p>
        )}
      </div>

      {/* Verses Content Section */}
      <div 
        className="px-6 py-8 sm:px-12 sm:py-12 space-y-8 font-devanagari text-[var(--text-primary)] leading-loose text-center"
        style={{ fontSize: `${fontSize}px` }}
      >
        {mantra.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-6 max-w-4xl mx-auto">
            
            {/* Section Badge / Header */}
            {section.badge && (
              <div className="flex items-center justify-center my-4">
                <span className="inline-block px-4 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--accent-saffron)] text-xs sm:text-sm font-bold border border-[var(--border-sacred)] shadow-sm">
                  {section.badge}
                </span>
              </div>
            )}

            {/* Standalone Doha / Shloka / Mantra Lines */}
            {section.lines && (
              <div className="space-y-2 py-2">
                {section.lines.map((line, lIdx) => (
                  <p 
                    key={lIdx} 
                    className={`font-semibold tracking-wide ${
                      line === "" ? "h-3" : "hover:text-[var(--accent-saffron)] transition-colors"
                    }`}
                  >
                    {line}
                  </p>
                ))}

                {/* Transliteration */}
                {showTransliteration && section.transliteration && (
                  <div className="pt-2 text-xs sm:text-sm font-serif text-[var(--text-secondary)] opacity-85 italic space-y-1">
                    {section.transliteration.map((tLine, tIdx) => (
                      <p key={tIdx}>{tLine}</p>
                    ))}
                  </div>
                )}

                {/* Meaning */}
                {showMeanings && section.meaning && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-[var(--text-secondary)] font-normal text-left sm:text-center leading-relaxed">
                    <span className="font-bold text-[var(--accent-saffron)]">भावार्थ: </span>
                    {section.meaning}
                  </div>
                )}
              </div>
            )}

            {/* Chaupai Verses Collection */}
            {section.verses && (
              <div className="space-y-6">
                {section.verses.map((verse, vIdx) => (
                  <div 
                    key={vIdx} 
                    className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)]/40 hover:bg-[var(--bg-secondary)]/80 border border-[var(--border-sacred)]/50 transition-colors duration-200"
                  >
                    <div className="space-y-1.5">
                      {verse.lines.map((line, lIdx) => (
                        <p key={lIdx} className="font-semibold tracking-wide">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Aarti Stanzas */}
            {section.stanzas && (
              <div className="space-y-6">
                {section.stanzas.map((stanza, stIdx) => (
                  <div 
                    key={stIdx} 
                    className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-sacred)]"
                  >
                    <div className="space-y-2">
                      {stanza.lines.map((line, lIdx) => (
                        <p 
                          key={lIdx} 
                          className={`font-semibold tracking-wide ${
                            lIdx === 0 || lIdx === 1 ? "text-[var(--accent-saffron)] font-bold" : ""
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prose (Gita Mahatmya Narrative) */}
            {section.paragraphs && (
              <div className="space-y-5 text-left leading-relaxed text-sm sm:text-base font-normal">
                {section.paragraphs.map((para, pIdx) => (
                  <p 
                    key={pIdx} 
                    className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)]/40 border border-[var(--border-sacred)]/60 indent-4"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Bottom Footer Accent */}
      <div className="px-6 py-4 border-t border-[var(--border-sacred)] bg-[var(--bg-secondary)]/30 flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span className="font-sanskrit">॥ श्री शुभमस्तु ॥</span>
        <button
          onClick={handleToggleDone}
          className="hover:text-[var(--accent-saffron)] font-bold transition flex items-center gap-1"
        >
          {isCompleted ? "✓ पूर्ण हुआ" : "पूर्ण करें →"}
        </button>
      </div>

    </article>
  );
}

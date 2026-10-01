/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DialogueLine, Language } from '../types/game';
import { CharacterAvatar } from './CharacterAvatar';
import { translations } from '../data/locales';
import { sound } from '../utils/audio';
import { ChevronLeft, ChevronRight, FastForward } from 'lucide-react';

interface DialogueBoxProps {
  dialogue: DialogueLine;
  language: Language;
  onNext: () => void;
  isLastLine: boolean;
  integrity?: number;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogue,
  language,
  onNext,
  isLastLine,
  integrity = 100,
}) => {
  const t = translations[language];
  const fullText = dialogue.text[language] || dialogue.text.ar;
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= fullText.length) {
        setDisplayedText(fullText.slice(0, idx));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleSkipOrNext = () => {
    if (isTyping) {
      sound.playClick();
      setDisplayedText(fullText);
      setIsTyping(false);
    } else {
      sound.playClick();
      onNext();
    }
  };

  const getSpeakerDisplayName = (key: string) => {
    switch (key) {
      case 'yassine':
        return t.speakerYassine;
      case 'amina':
        return t.speakerAmina;
      case 'fatima':
        return t.speakerFatima;
      case 'bouchaib':
        return t.speakerBouchaib;
      case 'allal':
        return t.speakerAllal;
      case 'larbi':
        return t.speakerLarbi;
      case 'inspector':
        return t.speakerInspector;
      default:
        return t.speakerNarrator;
    }
  };

  return (
    <div
      onClick={handleSkipOrNext}
      className="w-full bg-stone-900/95 border border-stone-800 rounded-2xl p-4 shadow-xl cursor-pointer select-none active:bg-stone-900 transition-colors"
    >
      {/* Speaker header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <CharacterAvatar
            speaker={dialogue.speaker}
            mood={dialogue.mood}
            size="md"
            integrity={integrity}
          />
          <div>
            <div className="text-sm font-bold text-amber-300">
              {getSpeakerDisplayName(dialogue.speaker)}
            </div>
            {dialogue.mood && (
              <div className="text-[11px] text-stone-400">
                {dialogue.mood === 'stressed' && (language === 'ar' ? 'تحت ضغط شديد' : language === 'ary' ? 'مضغوط ومخبل' : 'Sous tension')}
                {dialogue.mood === 'worried' && (language === 'ar' ? 'قلق وتساؤل' : language === 'ary' ? 'حيرة وتخمام' : 'Inquiet')}
                {dialogue.mood === 'corrupt' && (language === 'ar' ? 'نظرة مريبة وإغراء' : language === 'ary' ? 'عينيه على التدوار' : 'Regard intéressé')}
                {dialogue.mood === 'serious' && (language === 'ar' ? 'جدية وحزم' : language === 'ary' ? 'معقول وهيبة' : 'Sérieux')}
                {dialogue.mood === 'happy' && (language === 'ar' ? 'اطمئنان ودعاء' : language === 'ary' ? 'رضا وسعادة' : 'Serein')}
              </div>
            )}
          </div>
        </div>

        {/* Skip button if typing */}
        {isTyping && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDisplayedText(fullText);
              setIsTyping(false);
            }}
            className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 px-2 py-1 rounded bg-stone-800/80"
          >
            <FastForward className="w-3 h-3" />
            <span>{t.skipTypewriter}</span>
          </button>
        )}
      </div>

      {/* Spoken Dialogue Text */}
      <div className="text-stone-100 text-sm sm:text-base leading-relaxed min-h-[48px] pr-1">
        {displayedText}
        {isTyping && <span className="inline-block w-1.5 h-4 bg-amber-400 mr-1 animate-pulse" />}
      </div>

      {/* Tap prompt */}
      <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
        <span className="text-[11px] text-stone-400">
          {isTyping ? (language === 'fr' ? 'Touchez pour passer' : 'المس لإظهار النص') : (language === 'fr' ? 'Touchez pour continuer' : 'المس للمتابعة')}
        </span>
        <div className="flex items-center gap-1 text-amber-400 font-medium">
          <span>{isLastLine ? t.continue : t.next}</span>
          {language === 'fr' ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </div>
      </div>
    </div>
  );
};

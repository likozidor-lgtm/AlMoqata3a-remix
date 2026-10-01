/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types/game';
import { translations } from '../data/locales';
import { sound } from '../utils/audio';
import { Play, PlayCircle, Settings, Info, Scale, Stamp, Globe, BookOpen } from 'lucide-react';

interface TitleScreenProps {
  hasSavedGame: boolean;
  savedStageNumber: number;
  language: Language;
  onStartNewGame: () => void;
  onContinueGame: () => void;
  onOpenSettings: () => void;
  onLanguageChange: (lang: Language) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  hasSavedGame,
  savedStageNumber,
  language,
  onStartNewGame,
  onContinueGame,
  onOpenSettings,
  onLanguageChange,
}) => {
  const t = translations[language];
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between items-center px-4 py-8 max-w-md mx-auto text-stone-100 select-none">
      {/* Top Bar with Language toggle */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono tracking-wider font-semibold">
          <Stamp className="w-4 h-4" />
          <span>المقاطعة الحضرية</span>
        </div>

        {/* Quick Language switch buttons */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
          <button
            onClick={() => {
              sound.playClick();
              onLanguageChange('ar');
            }}
            className={`px-2 py-1 rounded-lg transition-all ${
              language === 'ar' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            فصحى
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onLanguageChange('ary');
            }}
            className={`px-2 py-1 rounded-lg transition-all ${
              language === 'ary' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            دارجة
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onLanguageChange('fr');
            }}
            className={`px-2 py-1 rounded-lg transition-all ${
              language === 'fr' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            FR
          </button>
        </div>
      </div>

      {/* Main Title Centerpiece */}
      <div className="text-center my-auto py-6 space-y-4">
        {/* Emblem / Moroccan Official Seal motif */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-600/30 to-stone-900 border-2 border-amber-500/60 p-4 shadow-xl flex items-center justify-center relative">
          <Scale className="w-10 h-10 text-amber-400" />
          <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-stone-950 border border-amber-500/50 text-[10px] text-amber-300 font-mono">
            ALMOQATA3A
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100 font-serif">
            {t.gameTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xs mx-auto leading-relaxed">
            {t.gameSubtitle}
          </p>
        </div>

        {/* Ambient quote */}
        <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800/80 max-w-xs mx-auto">
          <p className="text-[11px] text-amber-200/80 italic leading-relaxed">
            "الموظف بين مطرقة الضمير وسندان ضغوط الحياة.. كل قرار له ثمن أخلاقي ومالي."
          </p>
        </div>
      </div>

      {/* Action Buttons Menu (Large touch hitboxes >= 48px) */}
      <div className="w-full space-y-2.5">
        {hasSavedGame && (
          <button
            onClick={() => {
              sound.playClick();
              onContinueGame();
            }}
            className="w-full min-h-[50px] py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
          >
            <PlayCircle className="w-5 h-5" />
            <span>{t.continueStory} (المرحلة {savedStageNumber})</span>
          </button>
        )}

        <button
          onClick={() => {
            sound.playClick();
            onStartNewGame();
          }}
          className={`w-full min-h-[50px] py-3 px-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all ${
            hasSavedGame
              ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
              : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{t.startStory}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setShowAbout(true);
            }}
            className="min-h-[44px] py-2.5 px-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
          >
            <Info className="w-4 h-4 text-amber-400" />
            <span>{t.aboutGame}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="min-h-[44px] py-2.5 px-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>{t.settings}</span>
          </button>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-700 rounded-3xl p-5 shadow-2xl text-stone-100 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <h3>{t.aboutGame}</h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              لعبة <strong>"طريق الموظف" (AlMoqata3a)</strong> هي محاكاة قصصية اجتماعية واقعية تدور أحداثها داخل أروقة الإدارة المحلية المغربية.
            </p>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200/90 leading-relaxed font-semibold">
              {t.coreMessage}
            </div>

            <p className="text-[11px] text-stone-400 leading-relaxed">
              جميع الشخصيات والأماكن خيالية تحترم الإدارة والمواطنين، وتهدف إلى تسليط الضوء على المعضلات الأخلاقية والإنسانية دون تبرير للفساد أو استسلام لليأس.
            </p>

            <button
              onClick={() => {
                sound.playClick();
                setShowAbout(false);
              }}
              className="w-full min-h-[44px] py-2 rounded-xl bg-stone-800 text-stone-200 text-xs font-bold hover:bg-stone-700 mt-2"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

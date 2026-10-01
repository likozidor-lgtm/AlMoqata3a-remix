/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Ending, CharacterStats, DecisionRecord, Language } from '../types/game';
import { translations } from '../data/locales';
import { sound } from '../utils/audio';
import {
  Trophy,
  Flame,
  Coins,
  ShieldCheck,
  Heart,
  RotateCcw,
  Sparkles,
  Quote,
  CheckCircle2,
  AlertOctagon,
  Scale,
} from 'lucide-react';

interface SummaryModalProps {
  ending: Ending;
  finalStats: CharacterStats;
  peakStress: number;
  decisions: DecisionRecord[];
  language: Language;
  onPlayAgain: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  ending,
  finalStats,
  peakStress,
  decisions,
  language,
  onPlayAgain,
}) => {
  const t = translations[language];

  const title = ending.title[language] || ending.title.ar;
  const subtitle = ending.subtitle[language] || ending.subtitle.ar;
  const description = ending.description[language] || ending.description.ar;
  const moralQuote = ending.moralQuote[language] || ending.moralQuote.ar;
  const badge = ending.ratingBadge[language] || ending.ratingBadge.ar;

  const getToneStyle = () => {
    switch (ending.verdictTone) {
      case 'triumph':
        return 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300';
      case 'redemption':
        return 'border-sky-500/80 bg-sky-950/40 text-sky-300';
      case 'downfall':
        return 'border-rose-600/80 bg-rose-950/40 text-rose-300';
      case 'tragedy':
        return 'border-amber-600/80 bg-amber-950/40 text-amber-300';
      case 'cynical':
      default:
        return 'border-purple-600/80 bg-purple-950/40 text-purple-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-stone-900 border border-stone-700 rounded-3xl p-5 sm:p-6 shadow-2xl my-auto text-stone-100 flex flex-col space-y-4">
        {/* Ending Badge & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/40 bg-amber-950/50 text-amber-300">
            <Trophy className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-serif tracking-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 italic font-medium">
            "{subtitle}"
          </p>
        </div>

        {/* Narrative Verdict Box */}
        <div className={`p-4 rounded-2xl border ${getToneStyle()} leading-relaxed text-xs sm:text-sm text-stone-200`}>
          {description}
        </div>

        {/* Ending Moral Quote */}
        <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 flex items-start gap-2">
          <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs italic text-amber-200/90 font-medium">
            {moralQuote}
          </p>
        </div>

        {/* Career & Life Stats Scorecard */}
        <div className="bg-stone-950 p-3 rounded-2xl border border-stone-800">
          <div className="text-[11px] font-bold text-stone-400 mb-2 uppercase tracking-wider">
            {t.finalReportTitle}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 block">{t.money}</span>
              <span className="text-xs sm:text-sm font-bold text-amber-300">
                {finalStats.money} {t.moroccanDirham}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 block">{t.integrity}</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400">
                {finalStats.integrity}%
              </span>
            </div>

            <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 block">أعلى ضغط</span>
              <span className="text-xs sm:text-sm font-bold text-rose-400">
                {peakStress}%
              </span>
            </div>

            <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 block">{t.familySatisfaction}</span>
              <span className="text-xs sm:text-sm font-bold text-pink-400">
                {finalStats.familySatisfaction}%
              </span>
            </div>
          </div>
        </div>

        {/* Core Philosophical Message */}
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 text-center">
          <Scale className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <p className="text-[11px] sm:text-xs text-amber-200 font-semibold leading-relaxed">
            {t.coreMessage}
          </p>
        </div>

        {/* Play Again Button (Touch Hitbox >= 48px) */}
        <button
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="w-full min-h-[50px] py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.playAgain}</span>
        </button>
      </div>
    </div>
  );
};

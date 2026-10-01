/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Choice, Language } from '../types/game';
import { translations } from '../data/locales';
import { sound } from '../utils/audio';
import {
  Coins,
  ShieldCheck,
  Flame,
  Heart,
  Users,
  AlertTriangle,
  Scale,
  Sparkles,
} from 'lucide-react';

interface DecisionCardProps {
  choices: Choice[];
  language: Language;
  onSelectChoice: (choice: Choice) => void;
  disabled?: boolean;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
  choices,
  language,
  onSelectChoice,
  disabled = false,
}) => {
  const t = translations[language];
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleChoiceClick = (choice: Choice) => {
    if (disabled || selectedId) return;

    setSelectedId(choice.id);

    // Audio cue matching choice tone
    if (choice.moralWeight === 'honest') {
      sound.playSuccessChime();
    } else if (choice.moralWeight === 'corrupt') {
      sound.playDramaticChord();
    } else {
      sound.playClick();
    }

    setTimeout(() => {
      onSelectChoice(choice);
      setSelectedId(null);
    }, 350);
  };

  const getButtonBorderTone = (weight: Choice['moralWeight'], isSelected: boolean) => {
    if (isSelected) {
      return 'border-amber-400 bg-amber-950/70 scale-[0.98] ring-2 ring-amber-400/40';
    }
    switch (weight) {
      case 'honest':
        return 'border-emerald-700/60 bg-emerald-950/30 hover:border-emerald-500 hover:bg-emerald-950/50';
      case 'corrupt':
        return 'border-rose-900/60 bg-rose-950/30 hover:border-rose-700 hover:bg-rose-950/50';
      case 'reform':
        return 'border-sky-800/60 bg-sky-950/30 hover:border-sky-600 hover:bg-sky-950/50';
      default:
        return 'border-amber-800/60 bg-stone-900/70 hover:border-amber-600 hover:bg-stone-850';
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Scale className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-bold text-amber-300 tracking-wide">
          {t.decisionPrompt}
        </span>
      </div>

      <div className="space-y-2.5">
        {choices.map((choice, idx) => {
          const isSelected = selectedId === choice.id;
          const choiceText = choice.text[language] || choice.text.ar;

          return (
            <button
              key={choice.id}
              onClick={() => handleChoiceClick(choice)}
              disabled={disabled || selectedId !== null}
              className={`w-full min-h-[58px] p-3 rounded-2xl border text-right transition-all duration-200 flex flex-col justify-between select-none active:scale-[0.99] ${getButtonBorderTone(
                choice.moralWeight,
                isSelected
              )}`}
            >
              <div className="flex items-start justify-between gap-3 w-full">
                <span className="text-xs sm:text-sm font-semibold text-stone-100 leading-snug">
                  {choiceText}
                </span>

                {/* Moral Tag indicator */}
                <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium border bg-stone-950/60 border-stone-800 text-stone-400">
                  {choice.moralWeight === 'honest' && (language === 'ar' ? 'مسار نزيه' : language === 'ary' ? 'طريق المعقول' : 'Choix intègre')}
                  {choice.moralWeight === 'corrupt' && (language === 'ar' ? 'طريق الرشوة' : language === 'ary' ? 'طريق التدوار' : 'Voie illicite')}
                  {choice.moralWeight === 'reform' && (language === 'ar' ? 'تراجع وإصلاح' : language === 'ary' ? 'توبة وإصلاح' : 'Réforme & Vérité')}
                  {choice.moralWeight === 'compromise' && (language === 'ar' ? 'تنازل / ضغط' : language === 'ary' ? 'حل وسط' : 'Compromis')}
                </span>
              </div>

              {/* Anticipated Stat Impacts */}
              <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center gap-3 text-[11px] text-stone-400 font-mono">
                {choice.statChanges.money !== undefined && (
                  <span className={`flex items-center gap-1 ${choice.statChanges.money > 0 ? 'text-amber-300' : 'text-stone-400'}`}>
                    <Coins className="w-3 h-3" />
                    <span>{choice.statChanges.money > 0 ? `+${choice.statChanges.money}` : choice.statChanges.money} {t.moroccanDirham}</span>
                  </span>
                )}
                {choice.statChanges.integrity !== undefined && (
                  <span className={`flex items-center gap-1 ${choice.statChanges.integrity > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <ShieldCheck className="w-3 h-3" />
                    <span>{choice.statChanges.integrity > 0 ? `+${choice.statChanges.integrity}` : choice.statChanges.integrity}%</span>
                  </span>
                )}
                {choice.statChanges.stress !== undefined && (
                  <span className={`flex items-center gap-1 ${choice.statChanges.stress < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    <Flame className="w-3 h-3" />
                    <span>{choice.statChanges.stress > 0 ? `+${choice.statChanges.stress}` : choice.statChanges.stress}%</span>
                  </span>
                )}
                {choice.statChanges.legalDanger !== undefined && choice.statChanges.legalDanger > 0 && (
                  <span className="flex items-center gap-1 text-rose-400">
                    <AlertTriangle className="w-3 h-3" />
                    <span>+{choice.statChanges.legalDanger}%</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

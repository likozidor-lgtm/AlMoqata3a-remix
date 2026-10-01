/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CharacterStats, Language } from '../types/game';
import { translations } from '../data/locales';
import {
  Coins,
  ShieldCheck,
  Flame,
  Heart,
  Users,
  AlertTriangle,
  Volume2,
  VolumeX,
  History,
  Settings,
  Stamp,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderHUDProps {
  stats: CharacterStats;
  currentStageId: number;
  totalStages: number;
  language: Language;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onReturnTitle: () => void;
  onOpenDesk?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  stats,
  currentStageId,
  totalStages,
  language,
  soundEnabled,
  onToggleSound,
  onOpenHistory,
  onOpenSettings,
  onReturnTitle,
  onOpenDesk,
}) => {
  const t = translations[language];

  // Stress spike tracking & shake animation state
  const [isStressShaking, setIsStressShaking] = useState(false);
  const [stressGain, setStressGain] = useState<number | null>(null);
  const prevStressRef = useRef<number>(stats.stress);

  useEffect(() => {
    if (stats.stress > prevStressRef.current) {
      const delta = stats.stress - prevStressRef.current;
      setStressGain(delta);
      setIsStressShaking(true);

      const timer = setTimeout(() => {
        setIsStressShaking(false);
        setStressGain(null);
      }, 750);

      prevStressRef.current = stats.stress;
      return () => clearTimeout(timer);
    } else {
      prevStressRef.current = stats.stress;
    }
  }, [stats.stress]);

  // Helper color tags for gauges
  const getIntegrityColor = (val: number) => {
    if (val >= 75) return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
    if (val >= 40) return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
    return 'text-rose-400 bg-rose-950/60 border-rose-800/80';
  };

  const getStressColor = (val: number) => {
    if (val >= 70) return 'text-rose-400 bg-rose-950/60 border-rose-800/80';
    if (val >= 40) return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
    return 'text-sky-400 bg-sky-950/60 border-sky-800/80';
  };

  const getLegalColor = (val: number) => {
    if (val >= 60) return 'text-rose-400 bg-rose-950/60 border-rose-800/80 animate-pulse';
    if (val >= 25) return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
    return 'text-stone-400 bg-stone-900/60 border-stone-800';
  };

  return (
    <header className="w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800 sticky top-0 z-30 transition-all select-none">
      {/* Top Zone: Identity & Global Controls */}
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-between">
        {/* Identity & Current Stage */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onReturnTitle();
            }}
            className="text-right group focus-visible:outline-none"
            title="الرجوع للقائمة"
          >
            <div className="text-xs text-amber-400/90 font-semibold tracking-wide">
              {language === 'fr' ? 'Yassine · Fonctionnaire' : 'ياسين · موظف المقاطعة'}
            </div>
            <div className="text-[11px] text-stone-400">
              {t.stage} {currentStageId} / {totalStages}
            </div>
          </button>
        </div>

        {/* Global Action Icons (Touch Hitbox >= 44px) */}
        <div className="flex items-center gap-1">
          {onOpenDesk && (
            <button
              onClick={() => {
                sound.playPaper();
                onOpenDesk();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-950/70 border border-amber-700/80 text-amber-300 hover:text-amber-200 hover:bg-amber-900 active:scale-95 transition-all"
              aria-label={t.deskMode}
              title={t.deskMode}
            >
              <Stamp className="w-4 h-4 text-amber-400" />
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:bg-stone-800 active:scale-95 transition-all"
            aria-label={soundEnabled ? t.off : t.on}
            title={t.soundEffects}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenHistory();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:bg-stone-800 active:scale-95 transition-all"
            aria-label={t.decisionHistory}
            title={t.decisionHistory}
          >
            <History className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:bg-stone-800 active:scale-95 transition-all"
            aria-label={t.settings}
            title={t.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Zone: The 6 Life Indicators (مؤشرات الحياة) */}
      <div className="max-w-md mx-auto px-2 pb-2">
        <div className="grid grid-cols-6 gap-1 text-center font-mono">
          {/* 1. Money (المال) */}
          <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-stone-900/80 border border-stone-800/80">
            <Coins className="w-3.5 h-3.5 text-amber-400 mb-0.5" />
            <span className="text-[10px] text-stone-400 leading-none">{t.money}</span>
            <span className="text-[11px] font-bold text-amber-300 tabular-nums">
              {stats.money}
            </span>
          </div>

          {/* 2. Integrity (النزاهة) */}
          <div className={`flex flex-col items-center justify-center p-1 rounded-lg border ${getIntegrityColor(stats.integrity)}`}>
            <ShieldCheck className="w-3.5 h-3.5 mb-0.5" />
            <span className="text-[10px] opacity-80 leading-none">{t.integrity}</span>
            <span className="text-[11px] font-bold tabular-nums">
              {stats.integrity}%
            </span>
          </div>

          {/* 3. Stress (الضغط) */}
          <div
            className={`relative flex flex-col items-center justify-center p-1 rounded-lg border transition-all duration-200 ${getStressColor(
              stats.stress
            )} ${
              isStressShaking
                ? 'animate-stress-shake border-rose-500 bg-rose-950/80 ring-1 ring-rose-400/60'
                : ''
            }`}
          >
            {/* Transient floating delta (+X) indicating the surge in stress */}
            {isStressShaking && stressGain !== null && stressGain > 0 && (
              <span
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-1 py-0.2 text-[9px] font-bold text-rose-300 bg-rose-950/95 border border-rose-600/80 rounded shadow-md z-10 whitespace-nowrap animate-bounce"
                aria-live="polite"
              >
                +{stressGain}%
              </span>
            )}
            <Flame
              className={`w-3.5 h-3.5 mb-0.5 transition-transform ${
                isStressShaking ? 'animate-flame-shake text-rose-400' : ''
              }`}
            />
            <span className="text-[10px] opacity-80 leading-none">{t.stress}</span>
            <span className="text-[11px] font-bold tabular-nums">
              {stats.stress}%
            </span>
          </div>

          {/* 4. Family Satisfaction (رضا الأسرة) */}
          <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-pink-950/40 border border-pink-900/60 text-pink-300">
            <Heart className="w-3.5 h-3.5 text-pink-400 mb-0.5" />
            <span className="text-[10px] text-stone-400 leading-none">{t.familySatisfaction}</span>
            <span className="text-[11px] font-bold tabular-nums">
              {stats.familySatisfaction}%
            </span>
          </div>

          {/* 5. Trust (الثقة) */}
          <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-sky-950/40 border border-sky-900/60 text-sky-300">
            <Users className="w-3.5 h-3.5 text-sky-400 mb-0.5" />
            <span className="text-[10px] text-stone-400 leading-none">{t.trust}</span>
            <span className="text-[11px] font-bold tabular-nums">
              {stats.trust}%
            </span>
          </div>

          {/* 6. Legal Danger (الخطر القانوني) */}
          <div className={`flex flex-col items-center justify-center p-1 rounded-lg border ${getLegalColor(stats.legalDanger)}`}>
            <AlertTriangle className="w-3.5 h-3.5 mb-0.5" />
            <span className="text-[10px] opacity-80 leading-none">{t.legalDanger}</span>
            <span className="text-[11px] font-bold tabular-nums">
              {stats.legalDanger}%
            </span>
          </div>
        </div>

        {/* Progress micro-bar */}
        <div className="w-full bg-stone-800 h-1 rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${(currentStageId / totalStages) * 100}%` }}
          />
        </div>
      </div>
    </header>
  );
};

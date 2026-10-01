/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types/game';
import { translations } from '../data/locales';
import { sound } from '../utils/audio';
import { Settings, Volume2, VolumeX, Music, Globe, Trash2, X, Check } from 'lucide-react';

interface SettingsModalProps {
  language: Language;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onLanguageChange: (lang: Language) => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  language,
  soundEnabled,
  musicEnabled,
  onLanguageChange,
  onToggleSound,
  onToggleMusic,
  onResetProgress,
  onClose,
}) => {
  const t = translations[language];
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-stone-900 border border-stone-700 rounded-3xl p-5 shadow-2xl text-stone-100 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-stone-100 text-base">{t.settings}</h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-stone-300 font-semibold">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{t.language}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                onLanguageChange('ar');
              }}
              className={`min-h-[44px] px-2 py-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                language === 'ar'
                  ? 'border-amber-400 bg-amber-950/70 text-amber-300 font-bold'
                  : 'border-stone-800 bg-stone-950 text-stone-400'
              }`}
            >
              <span>العربية</span>
              <span className="text-[10px] opacity-75">الفصحى</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onLanguageChange('ary');
              }}
              className={`min-h-[44px] px-2 py-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                language === 'ary'
                  ? 'border-amber-400 bg-amber-950/70 text-amber-300 font-bold'
                  : 'border-stone-800 bg-stone-950 text-stone-400'
              }`}
            >
              <span>الدارجة</span>
              <span className="text-[10px] opacity-75">المغربية</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onLanguageChange('fr');
              }}
              className={`min-h-[44px] px-2 py-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                language === 'fr'
                  ? 'border-amber-400 bg-amber-950/70 text-amber-300 font-bold'
                  : 'border-stone-800 bg-stone-950 text-stone-400'
              }`}
            >
              <span>Français</span>
              <span className="text-[10px] opacity-75">Langue</span>
            </button>
          </div>
        </div>

        {/* Audio Toggles */}
        <div className="space-y-2 pt-2 border-t border-stone-800">
          {/* Sound FX */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950/80 border border-stone-800">
            <div className="flex items-center gap-2 text-xs text-stone-200">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>{t.soundEffects}</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onToggleSound();
              }}
              className={`min-h-[38px] px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                soundEnabled
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-800 text-stone-400'
              }`}
            >
              {soundEnabled ? t.on : t.off}
            </button>
          </div>

          {/* Music */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950/80 border border-stone-800">
            <div className="flex items-center gap-2 text-xs text-stone-200">
              <Music className="w-4 h-4 text-amber-400" />
              <span>{t.music}</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onToggleMusic();
              }}
              className={`min-h-[38px] px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                musicEnabled
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-800 text-stone-400'
              }`}
            >
              {musicEnabled ? t.on : t.off}
            </button>
          </div>
        </div>

        {/* Reset Game Section */}
        <div className="pt-2 border-t border-stone-800">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full min-h-[44px] py-2 rounded-xl border border-rose-900/60 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 text-xs font-medium flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.resetProgress}</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-rose-950/90 border border-rose-700 text-center space-y-2">
              <p className="text-[11px] text-rose-200">{t.resetConfirmText}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    onResetProgress();
                    setConfirmReset(false);
                    onClose();
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
                >
                  {t.confirm}
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

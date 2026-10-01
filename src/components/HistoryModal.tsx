/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DecisionRecord, Language } from '../types/game';
import { translations } from '../data/locales';
import { sound } from '../utils/audio';
import { History, X, ShieldCheck, Flame, Coins, CheckCircle, Scale } from 'lucide-react';

interface HistoryModalProps {
  decisions: DecisionRecord[];
  language: Language;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  decisions,
  language,
  onClose,
}) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-stone-900 border border-stone-700 rounded-3xl p-5 shadow-2xl text-stone-100 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-stone-100 text-base">{t.decisionHistory}</h3>
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

        {/* Scrollable Timeline */}
        <div className="my-3 overflow-y-auto space-y-3 pr-1">
          {decisions.length === 0 ? (
            <div className="p-8 text-center text-stone-500 text-xs">
              لم تسجل أي قرارات بعد. ابدأ المرحلة الأولى لرؤية سجلك.
            </div>
          ) : (
            decisions.map((record, idx) => {
              const stageTitle = record.stageTitle[language] || record.stageTitle.ar;
              const choiceText = record.choiceText[language] || record.choiceText.ar;

              return (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 text-xs">{stageTitle}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border bg-stone-900 text-stone-400">
                      {record.moralWeight === 'honest' && 'نزاهة'}
                      {record.moralWeight === 'corrupt' && 'رشوة'}
                      {record.moralWeight === 'reform' && 'إصلاح'}
                      {record.moralWeight === 'compromise' && 'تنازل'}
                    </span>
                  </div>

                  <p className="text-stone-200 leading-relaxed font-medium">
                    {choiceText}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-stone-400 font-mono pt-1 border-t border-stone-800/60">
                    {record.statChanges.integrity !== undefined && (
                      <span className={record.statChanges.integrity > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        نزاهة: {record.statChanges.integrity > 0 ? `+${record.statChanges.integrity}` : record.statChanges.integrity}%
                      </span>
                    )}
                    {record.statChanges.money !== undefined && (
                      <span className={record.statChanges.money > 0 ? 'text-amber-300' : 'text-stone-400'}>
                        مال: {record.statChanges.money > 0 ? `+${record.statChanges.money}` : record.statChanges.money}
                      </span>
                    )}
                    {record.statChanges.stress !== undefined && (
                      <span className={record.statChanges.stress < 0 ? 'text-emerald-400' : 'text-amber-400'}>
                        ضغط: {record.statChanges.stress > 0 ? `+${record.statChanges.stress}` : record.statChanges.stress}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full mt-auto py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-stone-100 text-xs font-semibold"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};

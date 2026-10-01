/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types/game';
import { translations } from '../data/locales';
import { sound } from '../utils/audio';
import {
  Wallet,
  Home,
  ShoppingBag,
  Zap,
  Bus,
  HeartPulse,
  PiggyBank,
  Check,
  AlertCircle,
} from 'lucide-react';

interface BudgetingModalProps {
  salary: number;
  language: Language;
  onConfirmBudget: (allocation: {
    rent: number;
    food: number;
    utilities: number;
    transport: number;
    health: number;
    savings: number;
  }) => void;
}

export const BudgetingModal: React.FC<BudgetingModalProps> = ({
  salary,
  language,
  onConfirmBudget,
}) => {
  const t = translations[language];

  // Default suggested expenses
  const [rent, setRent] = useState(1400);
  const [food, setFood] = useState(1100);
  const [utilities, setUtilities] = useState(400);
  const [transport, setTransport] = useState(300);
  const [health, setHealth] = useState(450);
  const [savings, setSavings] = useState(150);

  const totalExpenses = rent + food + utilities + transport + health + savings;
  const balance = salary - totalExpenses;

  const handleApply = () => {
    sound.playSuccessChime();
    onConfirmBudget({ rent, food, utilities, transport, health, savings });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-stone-900 border border-stone-700 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
          <Wallet className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-bold text-stone-100 text-sm sm:text-base">
              {t.budgetingTitle}
            </h3>
            <p className="text-[11px] text-stone-400">{t.budgetingSubtitle}</p>
          </div>
        </div>

        {/* Salary & Balance Overview */}
        <div className="my-3 p-3 rounded-2xl bg-stone-950 border border-stone-800 grid grid-cols-3 gap-2 text-center font-mono">
          <div>
            <span className="text-[10px] text-stone-400 block">{t.salaryLabel}</span>
            <span className="text-sm font-bold text-amber-300 tabular-nums">
              {salary} {t.moroccanDirham}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-stone-400 block">{t.expensesTotal}</span>
            <span className="text-sm font-bold text-stone-200 tabular-nums">
              {totalExpenses} {t.moroccanDirham}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-stone-400 block">{t.remainingLabel}</span>
            <span
              className={`text-sm font-bold tabular-nums ${
                balance >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {balance >= 0 ? `+${balance}` : balance} {t.moroccanDirham}
            </span>
          </div>
        </div>

        {balance < 0 && (
          <div className="mb-3 p-2 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              {language === 'ar'
                ? 'تحذير: المصاريف تتجاوز الراتب بـ ' + Math.abs(balance) + ' درهم! ستضطر للاقتراض أو زيادة الضغط.'
                : language === 'ary'
                ? 'رد بالك: المصاريف فايتة الخلصة بـ ' + Math.abs(balance) + ' درهم! غادير عجز وستريس.'
                : 'Attention : Déficit de ' + Math.abs(balance) + ' MAD ! Risque d’endettement.'}
            </span>
          </div>
        )}

        {/* Sliders / Allocation Rows */}
        <div className="space-y-3 my-2 text-xs">
          {/* Rent */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
            <div className="flex justify-between items-center mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-stone-200">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                {language === 'ar' ? 'الكراء والسكن' : language === 'ary' ? 'الكراء والدار' : 'Loyer & Logement'}
              </span>
              <span className="font-mono font-bold text-amber-300">{rent} {t.moroccanDirham}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="2000"
              step="50"
              value={rent}
              onChange={(e) => {
                sound.playClick();
                setRent(Number(e.target.value));
              }}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
            />
          </div>

          {/* Food */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
            <div className="flex justify-between items-center mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-stone-200">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'ar' ? 'التغذية وقفّة السوق' : language === 'ary' ? 'قفة السيمانة والماكلة' : 'Alimentation & Marché'}
              </span>
              <span className="font-mono font-bold text-emerald-300">{food} {t.moroccanDirham}</span>
            </div>
            <input
              type="range"
              min="700"
              max="1600"
              step="50"
              value={food}
              onChange={(e) => {
                sound.playClick();
                setFood(Number(e.target.value));
              }}
              className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
            />
          </div>

          {/* Utilities */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
            <div className="flex justify-between items-center mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-stone-200">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                {language === 'ar' ? 'فواتير الماء، الكهرباء والإنترنت' : language === 'ary' ? 'الما، الضو والويفي' : 'Eau, Électricité & Net'}
              </span>
              <span className="font-mono font-bold text-sky-300">{utilities} {t.moroccanDirham}</span>
            </div>
            <input
              type="range"
              min="200"
              max="600"
              step="20"
              value={utilities}
              onChange={(e) => {
                sound.playClick();
                setUtilities(Number(e.target.value));
              }}
              className="w-full accent-sky-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
            />
          </div>

          {/* Transport */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
            <div className="flex justify-between items-center mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-stone-200">
                <Bus className="w-3.5 h-3.5 text-yellow-400" />
                {language === 'ar' ? 'النقل والتنقل للعمل' : language === 'ary' ? 'الطوبيس والطاكسيات' : 'Transport'}
              </span>
              <span className="font-mono font-bold text-yellow-300">{transport} {t.moroccanDirham}</span>
            </div>
            <input
              type="range"
              min="150"
              max="500"
              step="25"
              value={transport}
              onChange={(e) => {
                sound.playClick();
                setTransport(Number(e.target.value));
              }}
              className="w-full accent-yellow-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
            />
          </div>

          {/* Health / Mother's medicine */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
            <div className="flex justify-between items-center mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-stone-200">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                {language === 'ar' ? 'أدوية الوالدة والصحة' : language === 'ary' ? 'دوا الوالدة وسبيطار' : 'Santé & Médicaments'}
              </span>
              <span className="font-mono font-bold text-rose-300">{health} {t.moroccanDirham}</span>
            </div>
            <input
              type="range"
              min="100"
              max="800"
              step="50"
              value={health}
              onChange={(e) => {
                sound.playClick();
                setHealth(Number(e.target.value));
              }}
              className="w-full accent-rose-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
            />
          </div>

          {/* Savings */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
            <div className="flex justify-between items-center mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-stone-200">
                <PiggyBank className="w-3.5 h-3.5 text-purple-400" />
                {language === 'ar' ? 'ادخار وطوارئ الغد' : language === 'ary' ? 'حبة مخبية للزمان' : 'Épargne de secours'}
              </span>
              <span className="font-mono font-bold text-purple-300">{savings} {t.moroccanDirham}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="25"
              value={savings}
              onChange={(e) => {
                sound.playClick();
                setSavings(Number(e.target.value));
              }}
              className="w-full accent-purple-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleApply}
          className="w-full mt-3 min-h-[48px] py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
        >
          <Check className="w-4 h-4" />
          <span>{t.applyBudget}</span>
        </button>
      </div>
    </div>
  );
};

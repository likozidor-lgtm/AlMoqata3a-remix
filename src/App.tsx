/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CharacterStats,
  Choice,
  DecisionRecord,
  Ending,
  GameSaveState,
  Language,
  LocalizedText,
} from './types/game';
import { GAME_CHAPTERS, ENDINGS_DATA } from './data/chapters';
import { translations } from './data/locales';
import { sound } from './utils/audio';
import { HeaderHUD } from './components/HeaderHUD';
import { SceneBackground } from './components/SceneBackground';
import { DialogueBox } from './components/DialogueBox';
import { DecisionCard } from './components/DecisionCard';
import { DossierStampModal } from './components/DossierStampModal';
import { AdministrativeDesk } from './components/AdministrativeDesk';
import { BudgetingModal } from './components/BudgetingModal';
import { SummaryModal } from './components/SummaryModal';
import { SettingsModal } from './components/SettingsModal';
import { HistoryModal } from './components/HistoryModal';
import { TitleScreen } from './components/TitleScreen';
import {
  FileText,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Coins,
  CheckCircle,
  Scale,
  Stamp,
  BookOpen,
  Home,
} from 'lucide-react';

const STORAGE_KEY = 'almoqata3a_game_save_v1';

const INITIAL_STATS: CharacterStats = {
  money: 500,
  integrity: 100,
  stress: 20,
  familySatisfaction: 70,
  trust: 100,
  legalDanger: 0,
};

export default function App() {
  // Screen / Game Phase
  const [phase, setPhase] = useState<'TITLE' | 'PLAYING' | 'SUMMARY'>('TITLE');
  // Primary gameplay mode: Desk is front and center; Story is secondary journal or intermission
  const [viewMode, setViewMode] = useState<'DESK' | 'HOME_INTERMISSION' | 'STORY_JOURNAL'>('DESK');

  // Core Game State
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [stats, setStats] = useState<CharacterStats>(INITIAL_STATS);
  const [peakStress, setPeakStress] = useState<number>(20);
  const [totalBribesAccepted, setTotalBribesAccepted] = useState<number>(0);
  const [decisionsHistory, setDecisionsHistory] = useState<DecisionRecord[]>([]);
  const [delayedQueue, setDelayedQueue] = useState<
    Array<{
      triggerStageId: number;
      title: LocalizedText;
      description: LocalizedText;
      statChanges: Partial<CharacterStats>;
    }>
  >([]);

  // Modals & Interactive Overlays
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Immediate Consequence Display State
  const [immediateConsequence, setImmediateConsequence] = useState<{
    text: LocalizedText;
    choice: Choice;
  } | null>(null);

  // Delayed Consequence Alert Modal
  const [activeDelayedAlert, setActiveDelayedAlert] = useState<{
    title: LocalizedText;
    description: LocalizedText;
    statChanges: Partial<CharacterStats>;
  } | null>(null);

  // Audio & Settings State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [language, setLanguage] = useState<Language>('ar');

  // Final Unlocked Ending
  const [currentEnding, setCurrentEnding] = useState<Ending | null>(null);

  // Saved Game Detection
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [savedStageNumber, setSavedStageNumber] = useState(1);

  // Check saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GameSaveState = JSON.parse(saved);
        if (parsed.currentStageId && parsed.currentStageId >= 1) {
          setHasSavedGame(true);
          setSavedStageNumber(parsed.currentStageId);
          setLanguage(parsed.language || 'ar');
          setSoundEnabled(parsed.soundEnabled ?? true);
          setMusicEnabled(parsed.musicEnabled ?? true);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  // Sync Audio Engine with user settings
  useEffect(() => {
    sound.setMuted(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (musicEnabled && soundEnabled && phase === 'PLAYING') {
      sound.startBGM();
    } else {
      sound.stopBGM();
    }
  }, [musicEnabled, soundEnabled, phase]);

  // Current Chapter Object
  const currentChapter =
    GAME_CHAPTERS.find((ch) => ch.id === currentStageId) || GAME_CHAPTERS[0];
  const t = translations[language];

  // Save Progress to localStorage
  const saveCurrentGame = (
    stageId: number,
    updatedStats: CharacterStats,
    history: DecisionRecord[],
    delays: any[],
    endingId?: string
  ) => {
    try {
      const stateToSave: GameSaveState = {
        currentStageId: stageId,
        stats: updatedStats,
        peakStress: Math.max(peakStress, updatedStats.stress),
        totalBribesAccepted,
        decisionsHistory: history,
        activeDelayedConsequences: delays,
        completedEnding: endingId as any,
        soundEnabled,
        musicEnabled,
        language,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      setHasSavedGame(true);
      setSavedStageNumber(stageId);
    } catch {
      // Storage error fallback
    }
  };

  // Start New Game Handler - Directly launches the player into Moqata3a Office Desk
  const handleStartNewGame = () => {
    setCurrentStageId(3); // Start Day 1 directly on the inspection counter desk!
    setDialogueIndex(0);
    setStats(INITIAL_STATS);
    setPeakStress(20);
    setTotalBribesAccepted(0);
    setDecisionsHistory([]);
    setDelayedQueue([]);
    setImmediateConsequence(null);
    setActiveDelayedAlert(null);
    setCurrentEnding(null);

    saveCurrentGame(3, INITIAL_STATS, [], []);
    setViewMode('DESK');
    setPhase('PLAYING');
  };

  // Continue Game Handler
  const handleContinueGame = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GameSaveState = JSON.parse(saved);
        setCurrentStageId(parsed.currentStageId || 3);
        setStats(parsed.stats || INITIAL_STATS);
        setPeakStress(parsed.peakStress || 20);
        setTotalBribesAccepted(parsed.totalBribesAccepted || 0);
        setDecisionsHistory(parsed.decisionsHistory || []);
        setDelayedQueue(parsed.activeDelayedConsequences || []);
        setDialogueIndex(0);
        setImmediateConsequence(null);
        setActiveDelayedAlert(null);
        setViewMode('DESK');
        setPhase('PLAYING');
        return;
      }
    } catch {}
    handleStartNewGame();
  };

  // Reset Progress
  const handleResetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedGame(false);
    setSavedStageNumber(1);
    setStats(INITIAL_STATS);
    setDecisionsHistory([]);
    setDelayedQueue([]);
    setCurrentStageId(1);
    setDialogueIndex(0);
    setPhase('TITLE');
  };

  // Advance Dialogues
  const handleNextDialogue = () => {
    if (dialogueIndex < currentChapter.dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      // Finished dialogue, now prompt choices or interactive feature
      if (currentChapter.interactiveType === 'budgeting') {
        setIsBudgetModalOpen(true);
      } else if (
        currentChapter.interactiveType === 'stamp_dossier' &&
        currentChapter.dossier
      ) {
        // Optional user preview of dossier
      }
    }
  };

  // Apply Choice Logic
  const handleSelectChoice = (choice: Choice) => {
    // Calculate new stats with bounding
    const newStats: CharacterStats = {
      money: Math.max(0, stats.money + (choice.statChanges.money || 0)),
      integrity: Math.max(
        0,
        Math.min(100, stats.integrity + (choice.statChanges.integrity || 0))
      ),
      stress: Math.max(
        0,
        Math.min(100, stats.stress + (choice.statChanges.stress || 0))
      ),
      familySatisfaction: Math.max(
        0,
        Math.min(
          100,
          stats.familySatisfaction +
            (choice.statChanges.familySatisfaction || 0)
        )
      ),
      trust: Math.max(
        0,
        Math.min(100, stats.trust + (choice.statChanges.trust || 0))
      ),
      legalDanger: Math.max(
        0,
        Math.min(100, stats.legalDanger + (choice.statChanges.legalDanger || 0))
      ),
    };

    setStats(newStats);
    setPeakStress((prev) => Math.max(prev, newStats.stress));

    if (choice.moralWeight === 'corrupt') {
      setTotalBribesAccepted((prev) => prev + 1);
    }

    // Register decision record
    const record: DecisionRecord = {
      stageId: currentChapter.stageNumber,
      stageTitle: currentChapter.title,
      choiceText: choice.text,
      moralWeight: choice.moralWeight,
      statChanges: choice.statChanges,
      timestamp: new Date().toLocaleTimeString(),
    };
    const updatedHistory = [...decisionsHistory, record];
    setDecisionsHistory(updatedHistory);

    // Queue delayed consequence if present
    let updatedDelays = [...delayedQueue];
    if (choice.delayedEffect) {
      updatedDelays.push(choice.delayedEffect);
      setDelayedQueue(updatedDelays);
    }

    // Show immediate consequence panel
    setImmediateConsequence({
      text: choice.consequenceText,
      choice,
    });

    saveCurrentGame(
      currentStageId,
      newStats,
      updatedHistory,
      updatedDelays
    );
  };

  // Proceed to Next Chapter after viewing immediate consequence
  const handleProceedAfterConsequence = () => {
    setImmediateConsequence(null);

    // Check if any delayed consequences are due for the NEXT stage
    const nextStageId = currentStageId + 1;

    // Check if game has concluded (all 10 chapters completed)
    if (nextStageId > GAME_CHAPTERS.length) {
      concludeGame();
      return;
    }

    const dueIndex = delayedQueue.findIndex(
      (item) => item.triggerStageId === nextStageId
    );
    if (dueIndex !== -1) {
      const dueItem = delayedQueue[dueIndex];
      const remainingDelays = delayedQueue.filter((_, idx) => idx !== dueIndex);
      setDelayedQueue(remainingDelays);

      // Apply delayed stat impacts
      const updatedStats: CharacterStats = {
        money: Math.max(0, stats.money + (dueItem.statChanges.money || 0)),
        integrity: Math.max(
          0,
          Math.min(100, stats.integrity + (dueItem.statChanges.integrity || 0))
        ),
        stress: Math.max(
          0,
          Math.min(100, stats.stress + (dueItem.statChanges.stress || 0))
        ),
        familySatisfaction: Math.max(
          0,
          Math.min(
            100,
            stats.familySatisfaction +
              (dueItem.statChanges.familySatisfaction || 0)
          )
        ),
        trust: Math.max(
          0,
          Math.min(100, stats.trust + (dueItem.statChanges.trust || 0))
        ),
        legalDanger: Math.max(
          0,
          Math.min(
            100,
            stats.legalDanger + (dueItem.statChanges.legalDanger || 0)
          )
        ),
      };
      setStats(updatedStats);
      setActiveDelayedAlert(dueItem);
    }

    setCurrentStageId(nextStageId);
    setDialogueIndex(0);
    saveCurrentGame(nextStageId, stats, decisionsHistory, delayedQueue);
  };

  // Endings Calculator & Epilogue Determination
  const concludeGame = () => {
    let resolvedEnding: Ending = ENDINGS_DATA.INTEGRITY;

    const lastDecision = decisionsHistory[decisionsHistory.length - 1];
    const isExposeChosen = lastDecision?.choiceText.ar.includes('توثيق محاولة الرشوة') || lastDecision?.moralWeight === 'reform';
    const isBouchaibPassChosen = lastDecision?.choiceText.ar.includes('المناورة الإدارية') || lastDecision?.choiceText.ar.includes('بوشعيب');
    const isBigBribeCrushChosen = lastDecision?.moralWeight === 'corrupt';

    // 1. Legal Exposure / Investigation
    if (stats.legalDanger >= 55 || (totalBribesAccepted >= 2 && stats.trust < 50)) {
      resolvedEnding = ENDINGS_DATA.EXPOSURE;
    }
    // 2. Reform / Redemption
    else if (isExposeChosen || (stats.integrity >= 50 && totalBribesAccepted > 0 && decisionsHistory.some(d => d.moralWeight === 'reform'))) {
      resolvedEnding = ENDINGS_DATA.REFORM;
    }
    // 3. Administrative Hypocrisy
    else if (isBouchaibPassChosen || (stats.integrity >= 35 && stats.integrity <= 65 && totalBribesAccepted === 1)) {
      resolvedEnding = ENDINGS_DATA.ADMINISTRATIVE_HYPOCRISY;
    }
    // 4. The Fall
    else if (stats.integrity < 50 || isBigBribeCrushChosen || totalBribesAccepted >= 2) {
      resolvedEnding = ENDINGS_DATA.THE_FALL;
    }
    // 5. Integrity & Honor
    else {
      resolvedEnding = ENDINGS_DATA.INTEGRITY;
    }

    setCurrentEnding(resolvedEnding);
    setPhase('SUMMARY');

    // Audio sting
    if (resolvedEnding.verdictTone === 'triumph' || resolvedEnding.verdictTone === 'redemption') {
      sound.playSuccessChime();
    } else {
      sound.playDramaticChord();
    }

    saveCurrentGame(
      currentStageId,
      stats,
      decisionsHistory,
      delayedQueue,
      resolvedEnding.id
    );
  };

  // Dossier Stamp Application (Applies stat changes directly and records decision)
  const handleApplyDossierStamp = (
    action: 'approve' | 'reject' | 'expedite'
  ) => {
    let moneyDelta = 0;
    let integrityDelta = 0;
    let stressDelta = 0;
    let trustDelta = 0;
    let legalDangerDelta = 0;

    if (action === 'approve') {
      moneyDelta = 10;
      integrityDelta = 1;
      stressDelta = -2;
      trustDelta = 2;
    } else if (action === 'reject') {
      integrityDelta = 2;
      stressDelta = 1;
      trustDelta = 1;
    } else if (action === 'expedite') {
      moneyDelta = 300;
      integrityDelta = -15;
      stressDelta = 10;
      trustDelta = -5;
      legalDangerDelta = 15;
      setTotalBribesAccepted((prev) => prev + 1);
    }

    setStats((prev) => ({
      money: Math.max(0, prev.money + moneyDelta),
      integrity: Math.max(0, Math.min(100, prev.integrity + integrityDelta)),
      stress: Math.max(0, Math.min(100, prev.stress + stressDelta)),
      familySatisfaction: Math.min(100, prev.familySatisfaction + (action === 'expedite' ? 5 : 1)),
      trust: Math.max(0, Math.min(100, prev.trust + trustDelta)),
      legalDanger: Math.max(0, Math.min(100, prev.legalDanger + legalDangerDelta)),
    }));
  };

  // Budget Application
  const handleConfirmBudget = (allocation: {
    rent: number;
    food: number;
    utilities: number;
    transport: number;
    health: number;
    savings: number;
  }) => {
    setIsBudgetModalOpen(false);

    const totalExp =
      allocation.rent +
      allocation.food +
      allocation.utilities +
      allocation.transport +
      allocation.health +
      allocation.savings;
    const deficit = Math.max(0, totalExp - 3800);

    // If deficit was incurred, add realistic stress
    if (deficit > 0) {
      const addedStress = Math.min(30, Math.floor(deficit / 20));
      setStats((prev) => ({
        ...prev,
        stress: Math.min(100, prev.stress + addedStress),
      }));
    }
  };

  // Check if character is currently at work in the administrative office vs at home with family
  const isAtWork = currentChapter.sceneType === 'office';
  const isAtHome =
    currentChapter.sceneType === 'home' ||
    currentChapter.sceneType === 'study' ||
    currentChapter.sceneType === 'street';

  // Automatically close desk modal if scene shifts away from work (e.g. going home)
  useEffect(() => {
    if (!isAtWork && isDossierModalOpen) {
      setIsDossierModalOpen(false);
    }
  }, [currentStageId, isAtWork, isDossierModalOpen]);

  const isDialogueCompleted =
    dialogueIndex >= currentChapter.dialogues.length - 1;

  return (
    <div
      dir={language === 'fr' ? 'ltr' : 'rtl'}
      className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between font-sans selection:bg-amber-500/30"
    >
      {/* Title Phase View */}
      {phase === 'TITLE' && (
        <TitleScreen
          hasSavedGame={hasSavedGame}
          savedStageNumber={savedStageNumber}
          language={language}
          onStartNewGame={handleStartNewGame}
          onContinueGame={handleContinueGame}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onLanguageChange={setLanguage}
        />
      )}

      {/* Main Core Gameplay: The Administrative Desk (Front and Center) */}
      {phase === 'PLAYING' && viewMode === 'DESK' && (
        <AdministrativeDesk
          dossier={currentChapter.dossier}
          language={language}
          stats={stats}
          currentStageId={currentStageId}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onOpenHistory={() => setIsHistoryModalOpen(true)}
          onOpenStoryJournal={() => setViewMode('STORY_JOURNAL')}
          onOpenHomeIntermission={() => setViewMode('HOME_INTERMISSION')}
          onApplyStamp={handleApplyDossierStamp}
          onClose={() => setViewMode('HOME_INTERMISSION')}
          onDrinkTea={() =>
            setStats((prev) => ({
              ...prev,
              stress: Math.max(0, prev.stress - 6),
            }))
          }
          onCitizenChange={(citizen, count) => {
            // Record processed count in history if needed
            if (count % 4 === 0) {
              // End of standard workday shift prompt
              sound.playChime();
            }
          }}
        />
      )}

      {/* Secondary Story Intermission: Home with Family & Financial Reflection */}
      {phase === 'PLAYING' && viewMode === 'HOME_INTERMISSION' && (
        <div className="flex-1 flex flex-col max-w-lg mx-auto w-full p-4 space-y-4 justify-between animate-in fade-in duration-300 min-h-screen">
          {/* Top Bar with return to desk */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-900 border border-stone-800 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏡</span>
              <div>
                <h3 className="text-sm font-bold text-amber-300">استراحة المساء · في المنزل مع الأسرة</h3>
                <p className="text-[10px] text-stone-400">بعيداً عن الأوراق والمكاتب الإدارية</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playPaper();
                setViewMode('DESK');
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 shadow cursor-pointer active:scale-95 transition-all"
            >
              <span>الذهاب إلى العمل 🏛️</span>
            </button>
          </div>

          <SceneBackground sceneType="home" stressLevel={stats.stress} />

          {/* Home family discussion / financial reflection */}
          <div className="p-4 rounded-2xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-stone-800 pb-2">
              <span className="font-bold text-stone-200">الوضعية المالية للموظف:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{stats.money} درهم</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed italic">
              "الزوجة أمينة: الله يحفظك أ ياسين.. كاين مصاريف الكراء وفاتورة الضو والما، وكنتمناو هاد الشهر يدوز على خير وبالمعقول."
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
              <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
                <div className="text-stone-400 text-[10px]">النزاهة</div>
                <div className="font-bold text-emerald-400 font-mono text-sm">{stats.integrity}%</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
                <div className="text-stone-400 text-[10px]">التوتر</div>
                <div className="font-bold text-rose-400 font-mono text-sm">{stats.stress}%</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
                <div className="text-stone-400 text-[10px]">رضا الأسرة</div>
                <div className="font-bold text-amber-300 font-mono text-sm">{stats.familySatisfaction}%</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
                <div className="text-stone-400 text-[10px]">الخطر القانوني</div>
                <div className="font-bold text-rose-500 font-mono text-sm">{stats.legalDanger}%</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                sound.playSip();
                setStats((prev) => ({
                  ...prev,
                  stress: Math.max(0, prev.stress - 12),
                }));
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <span>شرب كأس أتاي مشحر مع الأسرة ☕ (-12% توتر)</span>
            </button>

            <button
              onClick={() => setIsBudgetModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <span>تدبير ميزانية الشهر والمصاريف 📊</span>
            </button>

            <button
              onClick={() => {
                sound.playPaper();
                setViewMode('DESK');
              }}
              className="w-full min-h-[50px] py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              <span>بدء دوام العمل وفحص وثائق المواطنين بالمكتب 🏛️</span>
            </button>
          </div>
        </div>
      )}

      {/* Secondary Story Journal (Modal on demand) */}
      {phase === 'PLAYING' && viewMode === 'STORY_JOURNAL' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-stone-900 border border-amber-600/80 rounded-3xl p-5 shadow-2xl text-stone-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-amber-300">يوميات ومذكرات الموظف ياسين (أحداث القصة)</h3>
              </div>
              <button
                onClick={() => setViewMode('DESK')}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              هنا تُسجل يوميات الموظف ياسين كقصة ثانوية توثق مساره في المقاطعة، بينما ينصب التركيز الأساسي على تدقيق الملفات ومطابقة وثائق المواطنين على طاولة المكتب.
            </p>

            {/* Decisions summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400">سجل القرارات المتخذة بالمكتب:</h4>
              {decisionsHistory.length === 0 ? (
                <div className="text-xs text-stone-400 italic p-3 rounded-xl bg-stone-950 border border-stone-800">
                  لم تتخذ قرارات حاسمة بعد. ابدأ بفحص الوثائق والأختام على طاولة المكتب!
                </div>
              ) : (
                decisionsHistory.slice(-5).map((record, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-stone-400 text-[10px]">
                      <span>{record.stageTitle[language] || record.stageTitle.ar}</span>
                      <span className="font-mono">{record.timestamp}</span>
                    </div>
                    <div className="text-stone-200 font-medium">{record.choiceText[language] || record.choiceText.ar}</div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('DESK');
              }}
              className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1 shadow cursor-pointer active:scale-95 transition-all"
            >
              <span>العودة لطاولة الفحص الإداري 🔍</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Budgeting Modal */}
      {isBudgetModalOpen && (
        <BudgetingModal
          salary={3800}
          language={language}
          onConfirmBudget={handleConfirmBudget}
        />
      )}

      {/* Decision History Modal */}
      {isHistoryModalOpen && (
        <HistoryModal
          decisions={decisionsHistory}
          language={language}
          onClose={() => setIsHistoryModalOpen(false)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <SettingsModal
          language={language}
          soundEnabled={soundEnabled}
          musicEnabled={musicEnabled}
          onLanguageChange={setLanguage}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onToggleMusic={() => setMusicEnabled(!musicEnabled)}
          onResetProgress={handleResetProgress}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}
    </div>
  );
}

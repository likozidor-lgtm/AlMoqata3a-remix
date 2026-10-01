/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'ar' | 'ary' | 'fr';

export interface LocalizedText {
  ar: string;   // العربية الفصحى
  ary: string;  // الدارجة المغربية
  fr: string;   // Français
}

export interface CharacterStats {
  money: number;              // المال بالدرهم (MAD)
  integrity: number;          // النزاهة (0 - 100)
  stress: number;             // الضغط النفسي (0 - 100)
  familySatisfaction: number; // رضا الأسرة / الزوجة (0 - 100)
  trust: number;              // الثقة والاحترام الاجتماعي (0 - 100)
  legalDanger: number;        // الخطر القانوني والشبهات (0 - 100)
}

export type SpeakerKey =
  | 'yassine'
  | 'amina'
  | 'fatima'
  | 'bouchaib'
  | 'allal'
  | 'larbi'
  | 'inspector'
  | 'narrator';

export interface DialogueLine {
  speaker: SpeakerKey;
  text: LocalizedText;
  mood?: 'neutral' | 'happy' | 'stressed' | 'worried' | 'serious' | 'corrupt' | 'angry';
}

export interface Choice {
  id: string;
  text: LocalizedText;
  moralWeight: 'honest' | 'compromise' | 'corrupt' | 'reform';
  statChanges: Partial<CharacterStats>;
  consequenceText: LocalizedText;
  delayedEffect?: {
    triggerStageId: number;
    title: LocalizedText;
    description: LocalizedText;
    statChanges: Partial<CharacterStats>;
  };
}

export interface DossierData {
  dossierNumber: string;
  citizenName: LocalizedText;
  requestType: LocalizedText;
  statusNotes: LocalizedText;
  bribeOffer?: number; // In MAD if someone offered a bribe
  bribePrompt?: LocalizedText;
  standardProcessingTime: LocalizedText;
  applicantBackground: LocalizedText;
}

export interface Chapter {
  id: number;
  stageNumber: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  sceneType: 'study' | 'street' | 'office' | 'waiting_hall' | 'home' | 'investigation';
  yearPeriod: string;
  dialogues: DialogueLine[];
  interactiveType?: 'none' | 'stamp_dossier' | 'budgeting';
  dossier?: DossierData;
  choices: Choice[];
}

export type EndingId =
  | 'INTEGRITY'
  | 'REFORM'
  | 'THE_FALL'
  | 'EXPOSURE'
  | 'ADMINISTRATIVE_HYPOCRISY';

export interface Ending {
  id: EndingId;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  moralQuote: LocalizedText;
  ratingBadge: LocalizedText;
  verdictTone: 'triumph' | 'redemption' | 'tragedy' | 'downfall' | 'cynical';
}

export interface DecisionRecord {
  stageId: number;
  stageTitle: LocalizedText;
  choiceText: LocalizedText;
  moralWeight: 'honest' | 'compromise' | 'corrupt' | 'reform';
  statChanges: Partial<CharacterStats>;
  timestamp: string;
}

export interface GameSaveState {
  currentStageId: number;
  stats: CharacterStats;
  peakStress: number;
  totalBribesAccepted: number;
  decisionsHistory: DecisionRecord[];
  activeDelayedConsequences: Array<{
    triggerStageId: number;
    title: LocalizedText;
    description: LocalizedText;
    statChanges: Partial<CharacterStats>;
  }>;
  completedEnding?: EndingId;
  soundEnabled: boolean;
  musicEnabled: boolean;
  language: Language;
}

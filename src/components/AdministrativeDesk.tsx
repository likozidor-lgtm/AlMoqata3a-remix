/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { DossierData, Language, CharacterStats } from '../types/game';
import { translations } from '../data/locales';
import { sound } from '../utils/audio';
import { CitizenPhoto } from './CitizenPhoto';
import {
  FileText,
  X,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ZoomIn,
  Users,
  ArrowRight,
  Coins,
  Scale,
  Flame,
  Heart,
  AlertTriangle,
  BookOpen,
  Home,
  Volume2,
  VolumeX,
  Settings,
  History,
} from 'lucide-react';

interface StampedMark {
  id: string;
  type: 'approve' | 'reject';
  x: number;
  y: number;
  rotation: number;
  onDocument: boolean;
}

interface CitizenCase {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  quote: string;
  reason: string;
  photoUrl?: string;
  application: {
    type: 'new' | 'renew' | 'lost';
    fullName: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    gender: 'أنثى' | 'ذكر';
    status: 'متزوج(ة)' | 'عازب(ة)';
    currentAddress: string;
    occupation: string;
    checklist: {
      birthCert: boolean;
      residenceProof: boolean;
      marriageCert?: boolean;
      oldId?: boolean;
      policeReport?: boolean;
      occupationProof?: boolean;
    };
  };
  attachedDocs: {
    birthCertificate?: {
      fullName: string;
      firstName: string;
      lastName: string;
      father: string;
      mother: string;
      dob: string;
      pob: string;
    };
    marriageCertificate?: {
      husband: string;
      wife: string;
      marriageDate: string;
      place: string;
      consent: string;
    };
    waterBill?: {
      consumerName: string;
      refNo: string;
      address: string;
      units: string;
    };
    universityCertificate?: {
      studentName: string;
      degree: string;
      university: string;
      year: string;
    };
    oldIdCard?: {
      name: string;
      nom: string;
      prenom: string;
      cin: string;
      dob: string;
      expiry: string;
      address: string;
      isExpired: boolean;
    };
  };
  hasDiscrepancy: boolean;
  discrepancyReason: string;
  bribeOffer?: number;
}

// Roster of varied, authentic Moroccan citizens with illustrated biometric face portraits (Never real photos)
const CITIZEN_QUEUE: CitizenCase[] = [
  {
    id: 'case_mourabit',
    name: 'محمد المرابط',
    firstName: 'محمد',
    lastName: 'المرابط',
    quote: 'الله يرحم الوالدين أ وليدي.. هادي ساعتين وأنا واقف فالصف، وها وراقي كلهم كاملين مكمولين.',
    reason: 'شهادة السكنى ومطابقة وثائق إدارية للتقاعد.',
    application: {
      type: 'renew',
      fullName: 'محمد المرابط',
      firstName: 'محمد',
      lastName: 'المرابط',
      birthDate: '02/05/1954',
      birthPlace: 'فاس البالي',
      gender: 'ذكر',
      status: 'متزوج(ة)',
      currentAddress: 'حي سيدي بوجيدة، درب الجامع رقم 8، فاس',
      occupation: 'متقاعد (Retraité)',
      checklist: {
        birthCert: true,
        residenceProof: true,
        oldId: true,
      },
    },
    attachedDocs: {
      birthCertificate: {
        fullName: 'محمد المرابط',
        firstName: 'محمد',
        lastName: 'المرابط',
        father: 'أحمد المرابط',
        mother: 'فاطمة التازي',
        dob: '02/05/1954',
        pob: 'فاس البالي',
      },
      waterBill: {
        consumerName: 'محمد المرابط',
        refNo: 'RADEEF-102948',
        address: 'حي سيدي بوجيدة، درب الجامع رقم 8، فاس',
        units: '12.40 وحدة',
      },
      oldIdCard: {
        name: 'EL MOURABIT MOHAMMED',
        nom: 'EL MOURABIT',
        prenom: 'MOHAMMED',
        cin: 'C 192847',
        dob: '02.05.1954',
        expiry: '10/2024',
        address: 'Fes, Sidi Boujida',
        isExpired: true,
      },
    },
    hasDiscrepancy: false,
    discrepancyReason: 'الملف كامل ومستوفٍ لكل الشروط القانونية ومعه طوابع بريدية سليمة. القرار المستحق: [مقبول].',
  },
  {
    id: 'case_alaa',
    name: 'آلاء السبتي',
    firstName: 'آلاء',
    lastName: 'السبتي',
    quote: 'السلام عليكم.. محتاجة نجدد لاكارط ناسيونال وها كاع الوثائق المطلوبة فالدوسي.',
    reason: 'انتهاء صلاحية البطاقة السابقة وموعد قنصلي عاجل.',
    application: {
      type: 'renew',
      fullName: 'آلاء السبتي',
      firstName: 'آلاء',
      lastName: 'السبتي',
      birthDate: '14/07/1992',
      birthPlace: 'فاس المدينة',
      gender: 'أنثى',
      status: 'متزوج(ة)',
      currentAddress: 'حي السلام، زنقة 22، رقم 10، فاس',
      occupation: 'محاسبة معتمدة',
      checklist: {
        birthCert: true,
        residenceProof: true,
        marriageCert: true,
        oldId: true,
        occupationProof: true,
      },
    },
    attachedDocs: {
      birthCertificate: {
        fullName: 'آلاء السبتي',
        firstName: 'آلاء',
        lastName: 'السبتي',
        father: 'مصطفى السبتي',
        mother: 'سلمى الإدريسي',
        dob: '14/07/1992',
        pob: 'فاس المدينة',
      },
      marriageCertificate: {
        husband: 'أمين التازي',
        wife: 'آلاء السبتي',
        marriageDate: '27/09/2022',
        place: 'فاس',
        consent: 'عقد رضائي موثق بقسم قضاء الأسرة',
      },
      waterBill: {
        consumerName: 'آلاء السبتي',
        refNo: 'RADEEF-849201',
        address: 'حي السلام، زنقة 22، رقم 10، فاس',
        units: '30.31 وحدة',
      },
      universityCertificate: {
        studentName: 'آلاء السبتي',
        degree: 'إجازة في العلوم الاقتصادية والتدبير',
        university: 'جامعة سيدي محمد بن عبد الله - فاس',
        year: '2014',
      },
      oldIdCard: {
        name: 'ESSEBTI ALAA',
        nom: 'ESSEBTI',
        prenom: 'ALAA',
        cin: 'BK 748291',
        dob: '14.07.1992',
        expiry: '09/2024',
        address: 'Fes, Hay Salam',
        isExpired: true,
      },
    },
    hasDiscrepancy: false,
    discrepancyReason: 'جميع الوثائق مطابقة وسليمة 100%. القرار المستحق: [مقبول].',
  },
  {
    id: 'case_tarek',
    name: 'طارق الزروالي',
    firstName: 'طارق',
    lastName: 'الزروالي',
    quote: 'عفاك أ سيدي دوز ليا الوراق.. راه قالي الوالد سير دير بطاقة جديدة.',
    reason: 'I think I am old enough for this (بلغت السن القانوني حسب قوله).',
    application: {
      type: 'new',
      fullName: 'طارق الزروالي',
      firstName: 'طارق',
      lastName: 'الزروالي',
      birthDate: '06/03/2009',
      birthPlace: 'مكناس',
      gender: 'ذكر',
      status: 'متزوج(ة)',
      currentAddress: 'حي الزيتون، زنقة 5، مكناس',
      occupation: 'طالب جامعي (Collage Student)',
      checklist: {
        birthCert: true,
        residenceProof: true,
        marriageCert: true,
        oldId: true,
        occupationProof: true,
      },
    },
    attachedDocs: {
      birthCertificate: {
        fullName: 'طارق الزروالي',
        firstName: 'طارق',
        lastName: 'الزروالي',
        father: 'عبد الله الزروالي',
        mother: 'فاطمة الزهراء العلوي',
        dob: '06/03/2009',
        pob: 'مكناس',
      },
      marriageCertificate: {
        husband: 'طارق الزروالي',
        wife: 'سلمى الفاسي',
        marriageDate: '01/01/2024',
        place: 'مكناس',
        consent: 'بدون إذن قاضي الأسرة لقاصر',
      },
      waterBill: {
        consumerName: 'عبد الله الزروالي',
        refNo: 'RADEM-110294',
        address: 'حي الزيتون، زنقة 5، مكناس',
        units: '18.40 وحدة',
      },
      oldIdCard: {
        name: 'EZZARWALI TAREK',
        nom: 'EZZARWALI',
        prenom: 'TAREK',
        cin: 'CD 928371',
        dob: '06.03.2009',
        expiry: '06/2025',
        address: 'Meknes, Hay Zitoun',
        isExpired: false,
      },
    },
    hasDiscrepancy: true,
    discrepancyReason: 'تناقض في السن والحالة العائلية: مولود سنة 2009 (15 سنة فقط) ويدعي أنه متزوج وطالب جامعي بدون وصاية قانونية! القرار المستحق: [مرفوض].',
  },
  {
    id: 'case_doaa',
    name: 'دعاء الشاوي',
    firstName: 'دعاء',
    lastName: 'الشاوي',
    quote: 'توضرات ليا لاكارط فالتاكسي.. عفاك خرجو ليا وحدة جديدة راني محتاجاها.',
    reason: 'تجديد نظير ضائع (Lost ID - I blame the taxi).',
    application: {
      type: 'lost',
      fullName: 'دعاء الشاوي',
      firstName: 'دعاء',
      lastName: 'الشاوي',
      birthDate: '31/05/2001',
      birthPlace: 'الدار البيضاء',
      gender: 'أنثى',
      status: 'عازب(ة)',
      currentAddress: 'حي عين السبع، زنقة القدس 14، الدار البيضاء',
      occupation: 'مؤثرة رقمية (Gen Z)',
      checklist: {
        birthCert: true,
        residenceProof: true,
        oldId: true,
        policeReport: true, // Marked as attached on form, but missing from envelope!
      },
    },
    attachedDocs: {
      birthCertificate: {
        fullName: 'دعاء الشاوي',
        firstName: 'دعاء',
        lastName: 'الشاوي',
        father: 'أحمد الشاوي',
        mother: 'كنزة بوشارب',
        dob: '31/05/2001',
        pob: 'الدار البيضاء',
      },
      waterBill: {
        consumerName: 'أحمد الشاوي',
        refNo: 'LYDEC-993810',
        address: 'حي حسان، شارع النصر، الرباط', // Address mismatch!
        units: '22.10 وحدة',
      },
      oldIdCard: {
        name: 'CHAOUI DOAA',
        nom: 'CHAOUI',
        prenom: 'DOAA',
        cin: 'BE 394812',
        dob: '31.05.2001',
        expiry: '04/2024',
        address: 'Casablanca, Ain Sebaa',
        isExpired: true,
      },
    },
    hasDiscrepancy: true,
    discrepancyReason: 'عدم تطابق العنوان (الاستمارة بالدار البيضاء والفاتورة بالرباط) + عدم إرفاق محضر الشرطة الخاص بالضياع + مهنة Gen Z غير مقبولة إدارياً. القرار المستحق: [مرفوض].',
  },
  {
    id: 'case_sherif',
    name: 'شريف المنصوري',
    firstName: 'شريف',
    lastName: 'المنصوري',
    quote: 'صباح الخير أخويا الموظف.. ها الملف كامل وفيه بركة صغيرة تحت الدف تدور الحركة.',
    reason: 'تجديد عاجل مع عرض إكرامية.',
    application: {
      type: 'renew',
      fullName: 'شريف المنصوري',
      firstName: 'شريف',
      lastName: 'المنصوري',
      birthDate: '27/01/1995',
      birthPlace: 'القنيطرة',
      gender: 'ذكر',
      status: 'عازب(ة)',
      currentAddress: 'حي البساتين، زنقة 19، القنيطرة',
      occupation: 'موظف أمن خاص',
      checklist: {
        birthCert: true,
        residenceProof: true,
        oldId: true,
      },
    },
    attachedDocs: {
      birthCertificate: {
        fullName: 'شريف المنصوري',
        firstName: 'شريف',
        lastName: 'المنصوري',
        father: 'عمر المنصوري',
        mother: 'حفصة التازي',
        dob: '27/01/1995',
        pob: 'القنيطرة',
      },
      waterBill: {
        consumerName: 'شريف المنصوري',
        refNo: 'RAK-402911',
        address: 'حي البساتين، زنقة 19، القنيطرة',
        units: '14.80 وحدة',
      },
      oldIdCard: {
        name: 'MANSOURI CHERIF',
        nom: 'MANSOURI',
        prenom: 'CHERIF',
        cin: 'K 519283',
        dob: '27.01.1995',
        expiry: '08/2024',
        address: 'Kenitra, Hay Bassatine',
        isExpired: true,
      },
    },
    hasDiscrepancy: false,
    discrepancyReason: 'الوثائق سليمة تماماً، لكن هناك ظرف رشوة مدسوس بقيمة 200 درهم تحت الملف.',
    bribeOffer: 200,
  },
  {
    id: 'case_bakkari',
    name: 'علال البكاري',
    firstName: 'علال',
    lastName: 'البكاري',
    quote: 'هاك أ سي ياسين تقهوى بها وسربي ليا هاد الوريقة دغيا قبل ما يفوتني المارشيه.',
    reason: 'رخصة إدارية مستعجلة لصفقة تجارية.',
    application: {
      type: 'renew',
      fullName: 'علال البكاري',
      firstName: 'علال',
      lastName: 'البكاري',
      birthDate: '15/09/1980',
      birthPlace: 'سلا',
      gender: 'ذكر',
      status: 'متزوج(ة)',
      currentAddress: 'حي بطانة، زنقة 3، سلا',
      occupation: 'مقاول أشغال صغرى (طاشرون)',
      checklist: {
        birthCert: true,
        residenceProof: true,
        oldId: true,
      },
    },
    attachedDocs: {
      birthCertificate: {
        fullName: 'علال البكاري',
        firstName: 'علال',
        lastName: 'البكاري',
        father: 'إدريس البكاري',
        mother: 'زهرة بناني',
        dob: '15/09/1980',
        pob: 'سلا',
      },
      waterBill: {
        consumerName: 'علال البكاري',
        refNo: 'REDAL-772910',
        address: 'حي بطانة، زنقة 3، سلا',
        units: '25.60 وحدة',
      },
      oldIdCard: {
        name: 'EL BAKKARI ALLAL',
        nom: 'EL BAKKARI',
        prenom: 'ALLAL',
        cin: 'A 492019',
        dob: '15.09.1980',
        expiry: '11/2024',
        address: 'Sale, Hay Bettana',
        isExpired: true,
      },
    },
    hasDiscrepancy: true,
    discrepancyReason: 'تنقصه معاينة تقنية ميدانية للمهندس ويحاول دفع رشوة 300 درهم لتجاوز القانون! القرار المستحق: [مرفوض].',
    bribeOffer: 300,
  },
  {
    id: 'case_tazi',
    name: 'خديجة التازي',
    firstName: 'خديجة',
    lastName: 'التازي',
    quote: 'عفاك أ وليدي.. هاد الأرض هي مأوانا الوحيد أنا واليتامى، والسمسار باغي ياكلنا فحلالنا.',
    reason: 'تأكيد حق الملكية وحماية أرض اليتامى من السلب والتزوير.',
    application: {
      type: 'renew',
      fullName: 'خديجة التازي',
      firstName: 'خديجة',
      lastName: 'التازي',
      birthDate: '12/11/1975',
      birthPlace: 'الرباط',
      gender: 'أنثى',
      status: 'متزوج(ة)',
      currentAddress: 'حي يعقوب المنصور، زنقة 11، رقم 4، الرباط',
      occupation: 'أرملة (تنوب عن أبنائها القاصرين)',
      checklist: {
        birthCert: true,
        residenceProof: true,
        oldId: true,
      },
    },
    attachedDocs: {
      birthCertificate: {
        fullName: 'خديجة التازي',
        firstName: 'خديجة',
        lastName: 'التازي',
        father: 'عمر التازي',
        mother: 'كنزة المريني',
        dob: '12/11/1975',
        pob: 'الرباط',
      },
      waterBill: {
        consumerName: 'خديجة التازي',
        refNo: 'REDAL-339210',
        address: 'حي يعقوب المنصور، زنقة 11، رقم 4، الرباط',
        units: '16.50 وحدة',
      },
      oldIdCard: {
        name: 'TAZI KHADIJA',
        nom: 'TAZI',
        prenom: 'KHADIJA',
        cin: 'A 294810',
        dob: '12.11.1975',
        expiry: '12/2026',
        address: 'Rabat, Yacoub El Mansour',
        isExpired: false,
      },
    },
    hasDiscrepancy: false,
    discrepancyReason: 'الملف قانوني 100% ومستوفٍ لكل العقود والوثائق. محاولة الرشوة معروضة من طرف سمسار عقاري نافذ لإسقاط حقها. القرار العادل والنزيه: [مقبول] مع حماية اليتامى.',
    bribeOffer: 15000,
  },
];

const INITIAL_POSITIONS = {
  folder: { x: 260, y: 70 },
  form: { x: 225, y: 35 },
  birthCert: { x: 35, y: 190 },
  marriageCert: { x: 35, y: 345 },
  waterBill: { x: 415, y: 35 },
  diploma: { x: 605, y: 35 },
  idCard: { x: 455, y: 185 },
  stampApprove: { x: 630, y: 250 },
  stampReject: { x: 740, y: 250 },
  magnifier: { x: 410, y: 320 },
  marker: { x: 590, y: 195 },
  uvLamp: { x: 10, y: 380 },
  teaGlass: { x: 770, y: 35 },
  bribe: { x: 370, y: 220 },
};

interface AdministrativeDeskProps {
  dossier?: DossierData;
  language: Language;
  stats?: CharacterStats;
  currentStageId?: number;
  onApplyStamp: (actionType: 'approve' | 'reject' | 'expedite') => void;
  onClose: () => void;
  onDrinkTea?: () => void;
  onOpenSettings?: () => void;
  onOpenHistory?: () => void;
  onOpenStoryJournal?: () => void;
  onOpenHomeIntermission?: () => void;
  onToggleSound?: () => void;
  soundEnabled?: boolean;
  onCitizenChange?: (citizen: CitizenCase, count: number) => void;
}

export const AdministrativeDesk: React.FC<AdministrativeDeskProps> = ({
  dossier,
  language,
  stats,
  currentStageId,
  onApplyStamp,
  onClose,
  onDrinkTea,
  onOpenSettings,
  onOpenHistory,
  onOpenStoryJournal,
  onOpenHomeIntermission,
  onToggleSound,
  soundEnabled = true,
  onCitizenChange,
}) => {
  const t = translations[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const prevStageRef = useRef<number | undefined>(currentStageId);

  // Match initial citizen based on current stage or dossier
  const getInitialCitizenIndex = () => {
    if (dossier?.citizenName?.ar) {
      const name = dossier.citizenName.ar;
      if (name.includes('المرابط')) return CITIZEN_QUEUE.findIndex((c) => c.id === 'case_mourabit');
      if (name.includes('البكاري')) return CITIZEN_QUEUE.findIndex((c) => c.id === 'case_bakkari');
      if (name.includes('التازي')) return CITIZEN_QUEUE.findIndex((c) => c.id === 'case_tazi');
      if (name.includes('المنصوري')) return CITIZEN_QUEUE.findIndex((c) => c.id === 'case_sherif');
    }
    if (currentStageId === 3) return CITIZEN_QUEUE.findIndex((c) => c.id === 'case_mourabit');
    if (currentStageId === 6) return CITIZEN_QUEUE.findIndex((c) => c.id === 'case_bakkari');
    if (currentStageId === 7) return CITIZEN_QUEUE.findIndex((c) => c.id === 'case_sherif');
    if (currentStageId === 10) return CITIZEN_QUEUE.findIndex((c) => c.id === 'case_tazi');
    return 0;
  };

  // Active Citizen Queue State
  const [currentCitizenIndex, setCurrentCitizenIndex] = useState<number>(() => {
    const idx = getInitialCitizenIndex();
    return idx >= 0 ? idx : 0;
  });
  const [processedCount, setProcessedCount] = useState<number>(1);
  const [deskScore, setDeskScore] = useState<{ correct: number; errors: number }>({ correct: 0, errors: 0 });

  // Dossier Folder State: Documents start tucked inside the folder until opened
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);

  // Arrival notification banner when a new citizen is called
  const [newCitizenNotice, setNewCitizenNotice] = useState<string | null>(null);

  // Synchronize citizen files ONLY when currentStageId changes externally
  useEffect(() => {
    if (currentStageId !== undefined && currentStageId !== prevStageRef.current) {
      prevStageRef.current = currentStageId;
      const idx = getInitialCitizenIndex();
      if (idx >= 0) {
        setCurrentCitizenIndex(idx);
        setIsFolderOpen(false);
        setPositions(INITIAL_POSITIONS);
        setPlacedStamps([]);
        setHighlightedFields([]);
        setBribePocketed(false);
        setStampedActionFinal(null);
      }
    }
  }, [currentStageId]);

  // Inspection feedback notification banner
  const [verdictFeedback, setVerdictFeedback] = useState<{
    text: string;
    isCorrect: boolean;
  } | null>(null);

  // Shutter intake animation state
  const [isShutterOpen, setIsShutterOpen] = useState(true);
  const [isServingNext, setIsServingNext] = useState(false);

  // Latest player decision saved for story synchronization
  const [latestAction, setLatestAction] = useState<'approve' | 'reject' | 'expedite' | null>(null);

  // Active citizen record
  const currentCitizen = CITIZEN_QUEUE[currentCitizenIndex % CITIZEN_QUEUE.length];

  // Tool coordinates and z-indices on the desk
  const [positions, setPositions] = useState(INITIAL_POSITIONS);

  const [topZ, setTopZ] = useState<Record<string, number>>({
    folder: 10,
    birthCert: 11,
    marriageCert: 12,
    waterBill: 13,
    diploma: 14,
    form: 15,
    idCard: 16,
    bribe: 17,
    uvLamp: 18,
    teaGlass: 19,
    stampApprove: 20,
    stampReject: 21,
    marker: 22,
    magnifier: 28,
  });

  // Interactive desk state
  const [placedStamps, setPlacedStamps] = useState<StampedMark[]>([]);
  const [activeStampTool, setActiveStampTool] = useState<'approve' | 'reject' | null>(null);
  const [isMarkerActive, setIsMarkerActive] = useState<boolean>(false);
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);
  const [isUVOn, setIsUVOn] = useState(false);
  const [teaSips, setTeaSips] = useState(3);
  const [teaFeedback, setTeaFeedback] = useState(false);
  const [bribePocketed, setBribePocketed] = useState(false);
  const [stampedActionFinal, setStampedActionFinal] = useState<'approve' | 'reject' | 'expedite' | null>(null);
  const [activePiston, setActivePiston] = useState<'approve' | 'reject' | null>(null);
  const [showHelpHint, setShowHelpHint] = useState(true);

  // Optical Magnification Power State (1.5x / 2.0x / 3.0x)
  const [zoomLevel, setZoomLevel] = useState<number>(2.0);

  // Dragging management with PointerCapture
  const dragInfo = useRef<{
    itemKey: string | null;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    hasMoved: boolean;
  }>({
    itemKey: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
  });

  // Bring item to top of stack
  const bringToFront = (key: string) => {
    setTopZ((prev) => {
      const maxZ = Math.max(...Object.values(prev), 20);
      return { ...prev, [key]: maxZ + 1 };
    });
  };

  const handlePointerDown = (e: React.PointerEvent, key: string) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    bringToFront(key);

    const initialPos = positions[key as keyof typeof positions] || { x: 0, y: 0 };
    dragInfo.current = {
      itemKey: key,
      startX: e.clientX,
      startY: e.clientY,
      initialX: initialPos.x,
      initialY: initialPos.y,
      hasMoved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragInfo.current.itemKey) return;
    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragInfo.current.hasMoved = true;
    }

    const key = dragInfo.current.itemKey as keyof typeof positions;
    const newX = Math.max(5, Math.min(840, dragInfo.current.initialX + dx));
    const newY = Math.max(5, Math.min(580, dragInfo.current.initialY + dy));

    setPositions((prev) => ({
      ...prev,
      [key]: { x: newX, y: newY },
    }));
  };

  // Stamp the form reliably at its current location
  const applyStampToForm = (type: 'approve' | 'reject') => {
    sound.playStamp();
    setActivePiston(type);
    setStampedActionFinal(type);
    setLatestAction(type);
    setActiveStampTool(null);

    // If folder was closed, automatically open it to show the stamped document!
    if (!isFolderOpen) {
      setIsFolderOpen(true);
      setPositions((prev) => ({
        ...prev,
        folder: { x: 25, y: 35 },
      }));
    }

    const newMark: StampedMark = {
      id: `stamp-form-${Date.now()}-${Math.random()}`,
      type,
      x: 0,
      y: 0,
      rotation: Math.floor(Math.random() * 6) - 3,
      onDocument: true,
    };
    setPlacedStamps((prev) => [...prev, newMark]);

    setTimeout(() => {
      setActivePiston(null);
    }, 280);
  };

  // Stamp the wooden table surface at given coordinates (leaves ink on desk, does NOT stamp document)
  const applyStampToTable = (type: 'approve' | 'reject', x: number, y: number) => {
    sound.playStamp();
    setActivePiston(type);
    const newStamp: StampedMark = {
      id: `stamp-table-${Date.now()}-${Math.random()}`,
      type,
      x: Math.max(10, Math.min(800, x - 55)),
      y: Math.max(10, Math.min(520, y - 25)),
      rotation: Math.floor(Math.random() * 8) - 4,
      onDocument: false,
    };
    setPlacedStamps((prev) => [...prev, newStamp]);

    setTimeout(() => {
      setActivePiston(null);
    }, 280);
  };

  // Coordinate check: verify if a point (x, y) is within the application form bounds
  const isCoordOverForm = (x: number, y: number): boolean => {
    if (!isFolderOpen) return false;
    const formPos = positions.form;
    const formWidth = 340;
    const formHeight = 620;
    return (
      x >= formPos.x &&
      x <= formPos.x + formWidth &&
      y >= formPos.y &&
      y <= formPos.y + formHeight
    );
  };

  // Check if a physical stamp tool is currently placed over the document or near the stamping zone
  const isStampOverDocument = (type: 'approve' | 'reject'): boolean => {
    if (!isFolderOpen) return false;
    const key = type === 'approve' ? 'stampApprove' : 'stampReject';
    const stampPos = positions[key];
    const stampCenterX = stampPos.x + 45;
    const stampCenterY = stampPos.y + 40;
    const formPos = positions.form;
    const formWidth = 340;
    const formHeight = 620;

    // Tolerance of 25px around the document to ensure natural usability
    return (
      stampCenterX >= formPos.x - 25 &&
      stampCenterX <= formPos.x + formWidth + 25 &&
      stampCenterY >= formPos.y - 25 &&
      stampCenterY <= formPos.y + formHeight + 25
    );
  };

  // Clicking the piston button on physical stamp tool:
  // If placed over or near the document -> stamps the document with official "مقاطعة بني مكادة" decision!
  // If placed on the wooden desk table -> stamps the table only (does NOT stamp the document)!
  const handleStampPistonClick = (type: 'approve' | 'reject') => {
    const key = type === 'approve' ? 'stampApprove' : 'stampReject';
    const stampPos = positions[key];
    const stampCenterX = stampPos.x + 45;
    const stampCenterY = stampPos.y + 40;

    if (isStampOverDocument(type)) {
      // The stamp tool is placed on the document / near the stamping zone:
      applyStampToForm(type);
    } else {
      // The stamp tool is OUTSIDE the document (on the table):
      // Stamps the wooden table surface directly under the stamp! Document is NOT stamped!
      applyStampToTable(type, stampCenterX, stampCenterY);
    }
  };

  const triggerStamp = (type: 'approve' | 'reject') => {
    handleStampPistonClick(type);
  };

  const handleToggleStampTool = (type: 'approve' | 'reject') => {
    sound.playClick();
    setIsMarkerActive(false);
    setActiveStampTool((prev) => (prev === type ? null : type));
  };

  const handleToggleMarkerTool = () => {
    sound.playMarker();
    setActiveStampTool(null);
    setIsMarkerActive((prev) => !prev);
  };

  const handleClearHighlights = () => {
    sound.playPaper();
    setHighlightedFields([]);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragInfo.current.itemKey) {
      const key = dragInfo.current.itemKey;
      const moved = dragInfo.current.hasMoved;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}

      // If user dragged a stamp tool over the form and dropped it onto the document:
      if (moved && (key === 'stampApprove' || key === 'stampReject')) {
        const type = key === 'stampApprove' ? 'approve' : 'reject';
        if (isStampOverDocument(type)) {
          applyStampToForm(type);
        }
      }

      dragInfo.current.itemKey = null;
    }
  };

  // Stamping click on desk surface: detects whether click hit the form or the wooden table
  const handleDeskSurfacePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeStampTool) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (isCoordOverForm(clickX, clickY)) {
      // Click was over the document: stamps the document!
      applyStampToForm(activeStampTool);
    } else {
      // Click was OUTSIDE the document on the wooden table:
      // Stamps the wooden table at the clicked spot! Document is NOT stamped!
      applyStampToTable(activeStampTool, clickX, clickY);
    }
  };

  // Toggle Highlight on Document text with Marker
  const toggleHighlightField = (fieldId: string) => {
    sound.playMarker();
    setHighlightedFields((prev) =>
      prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]
    );
  };

  // Helper for marker highlighting CSS across all documents (Authentic fluorescent yellow marker)
  const getHighlightClass = (fieldId: string) => {
    const isHighlighted = highlightedFields.includes(fieldId);
    return `transition-all duration-150 select-none ${
      isHighlighted
        ? 'bg-yellow-300 text-stone-950 font-black px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(250,204,21,0.85)] border-b-2 border-yellow-500 ring-1 ring-yellow-400'
        : isMarkerActive
        ? 'cursor-pointer hover:bg-yellow-200/70 hover:ring-1 hover:ring-yellow-400 rounded'
        : 'cursor-pointer hover:bg-yellow-100/50 rounded'
    }`;
  };

  // UV Lamp Toggle
  const toggleUVLamp = () => {
    sound.playSwitch();
    setIsUVOn((prev) => !prev);
  };

  // Moroccan Mint Tea Sip with calming feedback
  const handleSipTea = () => {
    if (teaSips <= 0) return;
    sound.playSip();
    setTeaSips((prev) => prev - 1);
    setTeaFeedback(true);
    if (onDrinkTea) {
      onDrinkTea();
    }
    setTimeout(() => setTeaFeedback(false), 1400);
  };

  // Cycle zoom magnification levels (1.5x -> 2.0x -> 3.0x)
  const handleCycleZoom = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setZoomLevel((prev) => (prev === 1.5 ? 2.0 : prev === 2.0 ? 3.0 : 1.5));
  };

  // Advance to Next Citizen: changes files and documents to the next citizen in the queue!
  const handleFinalNext = () => {
    sound.playBuzzer();

    // Check accuracy of the decision
    const expectedAction = currentCitizen.hasDiscrepancy ? 'reject' : 'approve';
    const playerAction = bribePocketed ? 'expedite' : stampedActionFinal || 'approve';

    const isCorrectDecision =
      (currentCitizen.hasDiscrepancy && playerAction === 'reject') ||
      (!currentCitizen.hasDiscrepancy && (playerAction === 'approve' || playerAction === 'expedite'));

    if (isCorrectDecision) {
      sound.playChime();
      setDeskScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setVerdictFeedback({
        text: `✓ قرار سليم! فحص ملف (${currentCitizen.name}): ${currentCitizen.discrepancyReason}`,
        isCorrect: true,
      });
    } else {
      sound.playAlert();
      setDeskScore((prev) => ({ ...prev, errors: prev.errors + 1 }));
      setVerdictFeedback({
        text: `✗ انتبه للتدقيق! (${currentCitizen.name}): ${currentCitizen.discrepancyReason}`,
        isCorrect: false,
      });
    }

    // Save decision for story synchronization
    setLatestAction(playerAction);

    // Brief pneumatic shutter animation
    setIsShutterOpen(false);
    setIsServingNext(true);
    sound.playShutter();

    // ADVANCE TO NEXT CITIZEN IMMEDIATELY & SWITCH ALL FILES
    setTimeout(() => {
      const nextIndex = (currentCitizenIndex + 1) % CITIZEN_QUEUE.length;
      const nextCitizen = CITIZEN_QUEUE[nextIndex];
      const newCount = processedCount + 1;

      setCurrentCitizenIndex(nextIndex);
      setProcessedCount(newCount);
      setIsFolderOpen(false);
      setPositions(INITIAL_POSITIONS);
      setPlacedStamps([]);
      setHighlightedFields([]);
      setBribePocketed(false);
      setStampedActionFinal(null);
      setTeaSips(3);

      setIsShutterOpen(true);
      setIsServingNext(false);
      sound.playShutter();
      sound.playPaper();

      // Notify parent to apply consequences & synchronize citizen files
      onApplyStamp(playerAction);
      if (onCitizenChange) {
        onCitizenChange(nextCitizen, newCount);
      }

      // Clear previous verdict and announce new citizen's arrival with full Moroccan Name details
      setVerdictFeedback(null);
      setNewCitizenNotice(
        `📁 ملف جديد: ${nextCitizen.name} (النسب: ${nextCitizen.lastName} · الاسم الشخصي: ${nextCitizen.firstName})`
      );
      setTimeout(() => setNewCitizenNotice(null), 3500);
    }, 450);
  };

  // End shift and go home with family
  const handleReturnToStory = () => {
    sound.playClick();
    const actionToApply = latestAction || stampedActionFinal || 'approve';
    onApplyStamp(actionToApply);
    if (onOpenHomeIntermission) {
      onOpenHomeIntermission();
    } else {
      onClose();
    }
  };

  // Reset/Clear stamps
  const handleClearStamps = () => {
    sound.playPaper();
    setPlacedStamps([]);
    setStampedActionFinal(null);
  };

  // Central Desk Content Renderer
  const renderDeskItems = (isMagnified: boolean) => {
    const app = currentCitizen.application;
    const docs = currentCitizen.attachedDocs;

    return (
      <>

        {/* 1. MANILA DOSSIER FOLDER (حافظة الوثائق الرسمية) */}
        <div
          onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'folder') : undefined}
          className={`absolute select-none transition-all duration-300 ${
            !isFolderOpen
              ? 'w-[320px] sm:w-[360px] min-h-[380px] bg-gradient-to-br from-amber-200 via-amber-100 to-amber-200 border-4 border-amber-700/80 rounded-2xl shadow-2xl p-5 cursor-pointer hover:border-amber-500 z-25'
              : 'w-[195px] h-[230px] bg-amber-200/90 border-2 border-amber-600/70 rounded-r-xl rounded-l-sm shadow-xl p-2.5 z-10'
          } ${!isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
          style={{
            left: `${positions.folder.x}px`,
            top: `${positions.folder.y}px`,
            zIndex: !isFolderOpen ? 25 : isMagnified ? 10 : topZ.folder,
            boxShadow: !isFolderOpen ? '0 20px 45px rgba(0,0,0,0.75)' : '3px 6px 14px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header & Seal */}
          <div className="flex items-center justify-between border-b-2 border-amber-500/80 pb-1 mb-2">
            <div className="text-[8px] font-black text-amber-950 uppercase tracking-wider">
              المملكة المغربية · وزارة الداخلية
            </div>
            <div className="text-[7.5px] font-mono font-bold text-amber-800 bg-amber-300/80 px-1 py-0.5 rounded">
              MQ-2024
            </div>
          </div>

          <div className="text-xs font-black text-amber-950 flex items-center gap-1.5 mb-1.5">
            <span className="text-base">{isFolderOpen ? '📂' : '📁'}</span>
            <span>ملف المراجعة والتدقيق الإداري</span>
          </div>

          <div className="space-y-1 text-[10px] text-amber-900 bg-amber-50/90 p-3 rounded-xl border border-amber-300/80 mb-2">
            <div>المواطن(ة): <strong className="text-stone-950 font-bold text-xs">{currentCitizen.name}</strong></div>
            <div>رقم الطلب: <span className="font-mono font-bold text-amber-950">#{(currentCitizenIndex + 1).toString().padStart(4, '0')}-{currentCitizen.lastName}</span></div>
            <div className="text-[9.5px] text-stone-700 pt-1 border-t border-amber-200">
              الغاية: <span className="italic font-medium">{currentCitizen.reason}</span>
            </div>
          </div>

          {!isFolderOpen ? (
            <div className="space-y-2.5 mt-3">
              <div className="p-2.5 rounded-xl bg-amber-900/10 border border-amber-600/30 text-[10px] text-amber-950 text-center font-bold">
                🔒 كافة الوثائق والمستندات محفوظة بالكامل داخل هذا الملف
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playPaper();
                  setIsFolderOpen(true);
                  setPositions((prev) => ({
                    ...prev,
                    folder: { x: 25, y: 35 },
                  }));
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer border border-amber-400 animate-pulse"
              >
                <span>📂 انقر هنا لفتح الملف واستخراج كافة الوثائق على المكتب</span>
              </button>
            </div>
          ) : (
            <div className="space-y-1.5 mt-2">
              <div className="text-[8.5px] text-emerald-800 font-bold flex items-center gap-1">
                <span>✓ تم استخراج الوثائق على الطاولة</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playPaper();
                  setIsFolderOpen(false);
                  setPositions((prev) => ({
                    ...prev,
                    folder: { x: 250, y: 40 },
                  }));
                }}
                className="w-full py-1 rounded-lg bg-amber-300/90 hover:bg-amber-400 text-stone-900 text-[8px] font-bold border border-amber-500 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>📁 إعادة الوثائق إلى الحافظة</span>
              </button>
            </div>
          )}
        </div>

        {/* DOCUMENTS CONCEALED INSIDE FOLDER UNTIL EXTRACTED */}
        {isFolderOpen && (
          <>

        {/* 2. THE MAIN APPLICATION FORM (الاستمارة الإدارية الرسمية) */}
        <div
          onPointerDown={!isMagnified ? (e) => {
            if (activeStampTool) {
              e.stopPropagation();
              applyStampToForm(activeStampTool);
              return;
            }
            handlePointerDown(e, 'form');
          } : undefined}
          onClick={!isMagnified && activeStampTool ? (e) => {
            e.stopPropagation();
            applyStampToForm(activeStampTool);
          } : undefined}
          className={`absolute w-[320px] sm:w-[340px] bg-[#faf6eb] text-stone-900 rounded-sm shadow-2xl border border-stone-400 p-3 select-none font-sans ${
            !isMagnified
              ? activeStampTool
                ? 'cursor-crosshair ring-2 ring-amber-400 hover:ring-4 hover:ring-amber-500'
                : 'cursor-grab active:cursor-grabbing'
              : 'pointer-events-none'
          }`}
          style={{
            left: `${positions.form.x}px`,
            top: `${positions.form.y}px`,
            zIndex: isMagnified ? 15 : topZ.form,
            boxShadow: '4px 6px 18px rgba(0,0,0,0.55)',
          }}
        >
          {/* Header & Barcode */}
          <div className="flex items-center justify-between border-b-2 border-stone-800 pb-1 mb-1.5">
            <div className="text-right">
              <div className="text-[8px] font-bold text-stone-600 tracking-wider">
                المملكة المغربية · وزارة الداخلية
              </div>
              <div className="text-[11px] font-black text-stone-900 leading-tight">
                إستمارة تصحيح الإمضاء والوثائق
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-3 flex items-end gap-0.5 opacity-80">
                <div className="w-1 h-full bg-stone-900" />
                <div className="w-0.5 h-full bg-stone-900" />
                <div className="w-1.5 h-full bg-stone-900" />
                <div className="w-0.5 h-full bg-stone-900" />
                <div className="w-1 h-full bg-stone-900" />
              </div>
              <span className="text-[7px] font-mono font-bold">CNIE-2024</span>
            </div>
          </div>

          {/* Checkboxes Row */}
          <div className="flex items-center gap-2 text-[9px] text-stone-700 pb-1 border-b border-stone-300">
            <label className="flex items-center gap-0.5">
              <input type="checkbox" readOnly checked={app.type === 'new'} className="accent-stone-800 w-3 h-3" />
              <span>طلب جديد</span>
            </label>
            <label className="flex items-center gap-0.5">
              <input type="checkbox" readOnly checked={app.type === 'renew'} className="accent-stone-800 w-3 h-3" />
              <span>تجديد</span>
            </label>
            <label className="flex items-center gap-0.5">
              <input type="checkbox" readOnly checked={app.type === 'lost'} className="accent-stone-800 w-3 h-3" />
              <span>بدل ضائع</span>
            </label>
          </div>

          {/* Reason note */}
          <div className="text-[9px] text-stone-500 italic py-0.5 border-b border-stone-200">
            السبب المعلن: "{currentCitizen.reason}"
          </div>

          {/* Personal Data Fields: Moroccan Civil Registry standard (النسب والاسم الشخصي) */}
          <div className="space-y-1 text-[10px] pt-1">
            <div className="text-[7.5px] text-stone-600 font-medium py-0.5 px-1 bg-stone-100/90 rounded border border-stone-200 text-center">
              الحالة المدنية المغربية: الاسم العائلي (النسب) + الاسم الشخصي فقط (بدون اسم أوسط)
            </div>
            <div className="grid grid-cols-2 gap-1 border-b border-stone-200/80 pb-0.5">
              <div
                onClick={!isMagnified ? () => toggleHighlightField('lastName') : undefined}
                className={`p-0.5 rounded transition-all ${getHighlightClass('lastName')}`}
                title="انقر لتظليله بقلم الماركور"
              >
                <span className="text-stone-500 font-medium">النسب (الاسم العائلي): </span>
                <span className="font-extrabold text-stone-900">{app.lastName}</span>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('firstName') : undefined}
                className={`p-0.5 rounded transition-all ${getHighlightClass('firstName')}`}
                title="انقر لتظليله بقلم الماركور"
              >
                <span className="text-stone-500 font-medium">الاسم الشخصي: </span>
                <span className="font-extrabold text-stone-900">{app.firstName}</span>
              </div>
            </div>

            <div
              onClick={!isMagnified ? () => toggleHighlightField('date') : undefined}
              className={`p-0.5 rounded transition-all ${getHighlightClass('date')}`}
              title="انقر لتظليله بقلم الماركور"
            >
              <span className="text-stone-500 font-medium">تاريخ ومكان الازدياد: </span>
              <span className="font-bold text-stone-800">{app.birthDate} · {app.birthPlace}</span>
            </div>

            <div
              onClick={!isMagnified ? () => toggleHighlightField('status') : undefined}
              className={`p-0.5 rounded transition-all ${getHighlightClass('status')}`}
              title="انقر لتظليله بقلم الماركور"
            >
              <span className="text-stone-500 font-medium">الجنس / الحالة: </span>
              <span className="font-bold text-stone-800">{app.gender} · {app.status}</span>
            </div>

            <div
              onClick={!isMagnified ? () => toggleHighlightField('address') : undefined}
              className={`p-0.5 rounded transition-all ${getHighlightClass('address')}`}
              title="انقر لتظليله بقلم الماركور"
            >
              <span className="text-stone-500 font-medium">العنوان الحالي: </span>
              <span className="font-semibold text-stone-800">{app.currentAddress}</span>
            </div>

            <div
              onClick={!isMagnified ? () => toggleHighlightField('occupation') : undefined}
              className={`p-0.5 rounded transition-all ${getHighlightClass('occupation')}`}
              title="انقر لتظليله بقلم الماركور"
            >
              <span className="text-stone-500 font-medium">المهنة: </span>
              <span className="font-extrabold text-stone-900">{app.occupation}</span>
            </div>

            {/* Checklist of Attached Documents */}
            <div className="pt-1 border-t border-stone-300">
              <span className="text-[9px] text-stone-600 font-bold block mb-0.5">
                المستندات المرفقة (ATTACHED DOCS):
              </span>
              <div className="grid grid-cols-2 gap-0.5 text-[9px] text-stone-700">
                <div
                  onClick={!isMagnified ? () => toggleHighlightField('doc_birth') : undefined}
                  className={`flex items-center gap-1 p-0.5 rounded ${getHighlightClass('doc_birth')}`}
                  title="انقر للتظليل"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                  <span>عقد الازدياد</span>
                </div>
                <div
                  onClick={!isMagnified ? () => toggleHighlightField('doc_res') : undefined}
                  className={`flex items-center gap-1 p-0.5 rounded ${getHighlightClass('doc_res')}`}
                  title="انقر للتظليل"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                  <span>فاتورة الماء (السكنى)</span>
                </div>
                {app.checklist.marriageCert && (
                  <div
                    onClick={!isMagnified ? () => toggleHighlightField('doc_marriage') : undefined}
                    className={`flex items-center gap-1 p-0.5 rounded ${getHighlightClass('doc_marriage')}`}
                    title="انقر للتظليل"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                    <span>عقد الزواج</span>
                  </div>
                )}
                {app.checklist.oldId && (
                  <div
                    onClick={!isMagnified ? () => toggleHighlightField('doc_oldid') : undefined}
                    className={`flex items-center gap-1 p-0.5 rounded ${getHighlightClass('doc_oldid')}`}
                    title="انقر للتظليل"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                    <span>البطاقة القديمة</span>
                  </div>
                )}
                {app.checklist.policeReport && (
                  <div
                    onClick={!isMagnified ? () => toggleHighlightField('doc_police') : undefined}
                    className={`flex items-center gap-1 p-0.5 rounded ${getHighlightClass('doc_police')}`}
                    title="انقر للتظليل"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                    <span>محضر الشرطة</span>
                  </div>
                )}
              </div>
            </div>

            {/* Designated Stamping Zone - Official Arrondissement Stamp (مقاطعة بني مكادة) */}
            <div
              className={`mt-1.5 p-1.5 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-center min-h-[58px] relative overflow-hidden transition-all ${
                stampedActionFinal
                  ? stampedActionFinal === 'approve'
                    ? 'border-emerald-600 bg-emerald-500/10'
                    : 'border-rose-600 bg-rose-500/10'
                  : isStampOverDocument('approve') || isStampOverDocument('reject')
                  ? 'border-amber-500 bg-amber-200/50 ring-2 ring-amber-400 animate-pulse'
                  : 'border-stone-400 bg-stone-100/60 hover:bg-amber-100/60'
              }`}
            >
              {stampedActionFinal ? (
                /* Compact imprint matching exact stamp dimensions (96px x 40px) */
                <div
                  className={`w-[96px] h-[40px] border border-current rounded-sm p-1 font-black text-center shadow-sm select-none transform rotate-[-1.5deg] animate-in zoom-in-95 duration-150 flex flex-col justify-between ${
                    stampedActionFinal === 'approve'
                      ? 'border-emerald-700 text-emerald-950 bg-emerald-600/15'
                      : 'border-rose-700 text-rose-950 bg-rose-600/15'
                  }`}
                  style={{
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  <div className="flex items-center justify-between text-[6px] font-bold border-b border-current pb-0.5 opacity-90">
                    <span>المملكة المغربية</span>
                    <span className="text-[5px]">★</span>
                    <span>بني مكادة</span>
                  </div>
                  <div className="text-[10px] font-black tracking-wider uppercase my-auto">
                    {stampedActionFinal === 'approve' ? '★ مـقـبـول ★' : '★ مـرفـوض ★'}
                  </div>
                  <div className="flex items-center justify-between text-[5.5px] font-mono opacity-80 border-t border-current pt-0.5">
                    <span>التاريخ: {new Date().toISOString().slice(2, 10)}</span>
                    <span>BMK-0482</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-0.5 w-full">
                  <div className="text-[7.5px] font-black tracking-wider text-stone-600 uppercase flex items-center gap-1">
                    <span>منطقة الختم</span>
                    <span className="text-[7px] text-stone-500 font-normal">(مقاطعة بني مكادة)</span>
                  </div>
                  <div className="text-[6.5px] text-stone-500">
                    ضع الختم هنا أو اضغط:
                  </div>
                  <div className="flex items-center justify-center gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyStampToForm('approve');
                      }}
                      className="px-2 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-black text-[8px] shadow-sm active:scale-95 transition-all cursor-pointer"
                      title="ختم الاستمارة بموافقة مقاطعة بني مكادة"
                    >
                      ✓ مقبول
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyStampToForm('reject');
                      }}
                      className="px-2 py-0.5 rounded bg-rose-700 hover:bg-rose-600 text-white font-black text-[8px] shadow-sm active:scale-95 transition-all cursor-pointer"
                      title="ختم الاستمارة برفض مقاطعة بني مكادة"
                    >
                      ✗ مرفوض
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Placed Stamps overlay on the form - Compact exact 96px x 40px footprint */}
            {placedStamps
              .filter((s) => s.onDocument)
              .map((stamp) => (
                <div
                  key={stamp.id}
                  className={`absolute pointer-events-none select-none w-[96px] h-[40px] border border-current rounded-sm p-1 font-black text-center shadow-sm animate-in zoom-in-95 duration-150 flex flex-col justify-between ${
                    stamp.type === 'approve'
                      ? 'border-emerald-700 text-emerald-950 bg-emerald-500/15'
                      : 'border-rose-700 text-rose-950 bg-rose-500/15'
                  }`}
                  style={{
                    left: `${stamp.x || 120}px`,
                    top: `${stamp.y || 450}px`,
                    transform: `rotate(${stamp.rotation}deg)`,
                    zIndex: 25,
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  <div className="flex items-center justify-between text-[6px] font-bold border-b border-current pb-0.5 opacity-90">
                    <span>المملكة المغربية</span>
                    <span className="text-[5px]">★</span>
                    <span>بني مكادة</span>
                  </div>
                  <div className="text-[10px] font-black tracking-wider uppercase my-auto">
                    {stamp.type === 'approve' ? '★ مـقـبـول ★' : '★ مـرفـوض ★'}
                  </div>
                  <div className="flex items-center justify-between text-[5.5px] font-mono opacity-80 border-t border-current pt-0.5">
                    <span>التاريخ: {new Date().toISOString().slice(2, 10)}</span>
                    <span>BMK-0482</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Secret Fluorescent Watermark (revealed by UV Lamp) */}
          {isUVOn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-dashed border-cyan-400/90 rounded-2xl p-3 text-center transform -rotate-6 bg-cyan-950/20 backdrop-blur-[1px] shadow-[0_0_20px_rgba(34,211,238,0.7)] animate-pulse">
                <div className="text-cyan-300 font-mono text-[9px] tracking-widest uppercase font-bold">
                  ★ ROYAUME DU MAROC · SÉCURITÉ OFFICIELLE ★
                </div>
                <div className="text-cyan-200 font-extrabold text-xs">
                  مستند معتمد برقم تسلسلي مطابق
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. BIRTH CERTIFICATE (عقد الازدياد الرسمي) */}
        {docs.birthCertificate && (
          <div
            onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'birthCert') : undefined}
            className={`absolute w-[200px] bg-cyan-50/95 text-stone-900 border-2 border-cyan-500/70 rounded-md p-2 shadow-lg text-[9px] select-none ${
              !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
            }`}
            style={{
              left: `${positions.birthCert.x}px`,
              top: `${positions.birthCert.y}px`,
              zIndex: isMagnified ? 11 : topZ.birthCert,
            }}
          >
            <div className="border-b border-cyan-400 pb-1 mb-1 font-extrabold text-cyan-950 flex justify-between">
              <span>عقد الازدياد (الحالة المدنية)</span>
              <span className="text-emerald-700">✓ رسمي</span>
            </div>
            <div className="space-y-0.5">
              <div
                onClick={!isMagnified ? () => toggleHighlightField('birth_lastName') : undefined}
                className={getHighlightClass('birth_lastName')}
                title="انقر للتظليل بالماركور"
              >
                النسب: <strong>{docs.birthCertificate.lastName}</strong>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('birth_firstName') : undefined}
                className={getHighlightClass('birth_firstName')}
                title="انقر للتظليل بالماركور"
              >
                الاسم الشخصي: <strong>{docs.birthCertificate.firstName}</strong>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('birth_father') : undefined}
                className={getHighlightClass('birth_father')}
                title="انقر للتظليل بالماركور"
              >
                الأب: <span>{docs.birthCertificate.father}</span>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('birth_mother') : undefined}
                className={getHighlightClass('birth_mother')}
                title="انقر للتظليل بالماركور"
              >
                الأم: <span>{docs.birthCertificate.mother}</span>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('birth_dob') : undefined}
                className={getHighlightClass('birth_dob')}
                title="انقر للتظليل بالماركور"
              >
                الازدياد: <strong className="font-mono">{docs.birthCertificate.dob}</strong>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('birth_pob') : undefined}
                className={getHighlightClass('birth_pob')}
                title="انقر للتظليل بالماركور"
              >
                المكان: <span>{docs.birthCertificate.pob}</span>
              </div>
            </div>
            <div className="mt-1 pt-1 border-t border-cyan-300 text-[8px] text-cyan-800 text-center font-bold">
              ختم وتوقيع ضابط الحالة المدنية
            </div>
          </div>
        )}

        {/* 4. MARRIAGE CERTIFICATE (وثيقة عقد الزواج) */}
        {docs.marriageCertificate && (
          <div
            onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'marriageCert') : undefined}
            className={`absolute w-[210px] bg-pink-50/95 text-stone-900 border-2 border-pink-400/80 rounded-md p-2 shadow-lg text-[9px] select-none ${
              !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
            }`}
            style={{
              left: `${positions.marriageCert.x}px`,
              top: `${positions.marriageCert.y}px`,
              zIndex: isMagnified ? 12 : topZ.marriageCert,
            }}
          >
            <div className="border-b border-pink-300 pb-1 mb-1 font-extrabold text-pink-950 flex justify-between">
              <span>عقد الزواج الرسمي (ACTE DE MARIAGE)</span>
              <span>💍</span>
            </div>
            <div className="space-y-0.5">
              <div
                onClick={!isMagnified ? () => toggleHighlightField('marriage_husband') : undefined}
                className={getHighlightClass('marriage_husband')}
                title="انقر للتظليل بالماركور"
              >
                الزوج: <strong>{docs.marriageCertificate.husband}</strong>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('marriage_wife') : undefined}
                className={getHighlightClass('marriage_wife')}
                title="انقر للتظليل بالماركور"
              >
                الزوجة: <strong>{docs.marriageCertificate.wife}</strong>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('marriage_date') : undefined}
                className={getHighlightClass('marriage_date')}
                title="انقر للتظليل بالماركور"
              >
                تاريخ العقد: <span className="font-mono">{docs.marriageCertificate.marriageDate}</span>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('marriage_place') : undefined}
                className={getHighlightClass('marriage_place')}
                title="انقر للتظليل بالماركور"
              >
                المكان: <span>{docs.marriageCertificate.place}</span>
              </div>
              <div className="text-[8px] text-pink-800 italic">{docs.marriageCertificate.consent}</div>
            </div>
          </div>
        )}

        {/* 5. WATER / UTILITY BILL (فاتورة الماء والكهرباء / إثبات السكنى) */}
        {docs.waterBill && (
          <div
            onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'waterBill') : undefined}
            className={`absolute w-[180px] bg-sky-50 text-stone-900 border-2 border-sky-400 rounded-md p-2 shadow-lg text-[9px] select-none ${
              !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
            }`}
            style={{
              left: `${positions.waterBill.x}px`,
              top: `${positions.waterBill.y}px`,
              zIndex: isMagnified ? 13 : topZ.waterBill,
            }}
          >
            <div className="border-b border-sky-300 pb-0.5 mb-1 font-extrabold text-sky-900 flex justify-between">
              <span>فاتورة الماء (WATER BILL)</span>
              <span>💧</span>
            </div>
            <div className="space-y-0.5">
              <div
                onClick={!isMagnified ? () => toggleHighlightField('water_name') : undefined}
                className={getHighlightClass('water_name')}
                title="انقر للتظليل بالماركور"
              >
                المشترك: <strong>{docs.waterBill.consumerName}</strong>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('water_ref') : undefined}
                className={getHighlightClass('water_ref')}
                title="انقر للتظليل بالماركور"
              >
                الرقم: <span className="font-mono text-[8px]">{docs.waterBill.refNo}</span>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('water_address') : undefined}
                className={getHighlightClass('water_address')}
                title="انقر للتظليل بالماركور"
              >
                العنوان: <span className="font-bold text-sky-950">{docs.waterBill.address}</span>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('water_units') : undefined}
                className={getHighlightClass('water_units')}
                title="انقر للتظليل بالماركور"
              >
                الاستهلاك: <span>{docs.waterBill.units}</span>
              </div>
            </div>
          </div>
        )}

        {/* 6. UNIVERSITY DIPLOMA (الشهادة الجامعية) */}
        {docs.universityCertificate && (
          <div
            onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'diploma') : undefined}
            className={`absolute w-[200px] bg-amber-50 text-stone-900 border-2 border-amber-500/80 rounded-md p-2 shadow-lg text-[9px] select-none ${
              !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
            }`}
            style={{
              left: `${positions.diploma.x}px`,
              top: `${positions.diploma.y}px`,
              zIndex: isMagnified ? 14 : topZ.diploma,
            }}
          >
            <div className="text-center font-extrabold text-amber-950 border-b border-amber-300 pb-0.5 mb-1 text-[8px] tracking-wider uppercase">
              CERTIFICATE · الدبلوم الجامعي
            </div>
            <div className="text-center space-y-0.5">
              <div
                onClick={!isMagnified ? () => toggleHighlightField('diploma_student') : undefined}
                className={getHighlightClass('diploma_student')}
                title="انقر للتظليل بالماركور"
              >
                <strong className="text-stone-900">{docs.universityCertificate.studentName}</strong>
              </div>
              <div
                onClick={!isMagnified ? () => toggleHighlightField('diploma_degree') : undefined}
                className={getHighlightClass('diploma_degree')}
                title="انقر للتظليل بالماركور"
              >
                <span className="text-amber-900 font-medium text-[8px]">{docs.universityCertificate.degree}</span>
              </div>
              <div className="text-[7px] text-stone-600">{docs.universityCertificate.university} · {docs.universityCertificate.year}</div>
            </div>
          </div>
        )}

        {/* 7. NATIONAL ID CARD (بطاقة التعريف الوطنية CNIE) */}
        {docs.oldIdCard && (
          <div
            onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'idCard') : undefined}
            className={`absolute w-[190px] h-[120px] bg-gradient-to-br from-sky-100 via-sky-50 to-emerald-50 rounded-xl border border-sky-300 p-2 select-none shadow-xl text-stone-900 overflow-hidden ${
              !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
            }`}
            style={{
              left: `${positions.idCard.x}px`,
              top: `${positions.idCard.y}px`,
              zIndex: isMagnified ? 16 : topZ.idCard,
            }}
          >
            <div className="flex items-center justify-between border-b border-sky-300 pb-0.5 mb-1">
              <div className="text-[7px] font-extrabold text-emerald-900">
                المملكة المغربية · ROYAUME DU MAROC
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600/30 flex items-center justify-center text-[6px] text-emerald-900 font-bold">
                ★
              </div>
            </div>
            <div className="flex gap-1.5 items-center">
              <CitizenPhoto citizenId={currentCitizen.id} gender={currentCitizen.application.gender} name={currentCitizen.name} size="idCard" hasWatermark={true} />
              <div className="text-[8px] space-y-0.5 leading-tight flex-1">
                <div
                  onClick={!isMagnified ? () => toggleHighlightField('id_nom') : undefined}
                  className={getHighlightClass('id_nom')}
                  title="انقر للتظليل بالماركور"
                >
                  Nom: <strong className="text-stone-900 font-bold">{docs.oldIdCard.nom || docs.oldIdCard.name}</strong>
                </div>
                <div
                  onClick={!isMagnified ? () => toggleHighlightField('id_prenom') : undefined}
                  className={getHighlightClass('id_prenom')}
                  title="انقر للتظليل بالماركور"
                >
                  Prénom: <strong className="text-stone-900">{docs.oldIdCard.prenom || ''}</strong>
                </div>
                <div
                  onClick={!isMagnified ? () => toggleHighlightField('id_dob') : undefined}
                  className={getHighlightClass('id_dob')}
                  title="انقر للتظليل بالماركور"
                >
                  Né(e) le: <span>{docs.oldIdCard.dob}</span>
                </div>
                <div
                  onClick={!isMagnified ? () => toggleHighlightField('id_cin') : undefined}
                  className={getHighlightClass('id_cin')}
                  title="انقر للتظليل بالماركور"
                >
                  CIN: <span className="font-mono font-black">{docs.oldIdCard.cin}</span>
                </div>
                <div
                  onClick={!isMagnified ? () => toggleHighlightField('id_expiry') : undefined}
                  className={getHighlightClass('id_expiry')}
                  title="انقر للتظليل بالماركور"
                >
                  <span className="text-[7px] text-rose-700 font-bold">Val: {docs.oldIdCard.expiry} {docs.oldIdCard.isExpired ? '(EXPIRED)' : ''}</span>
                </div>
              </div>
            </div>
            {isUVOn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-purple-900/30">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.9)] text-emerald-300 font-bold text-[9px] animate-spin">
                  ★ CNIE ★
                </div>
              </div>
            )}
          </div>
        )}

        {/* 8. BRIBE ENVELOPE / CASH (if citizen offered bribe) */}
        {currentCitizen.bribeOffer && !bribePocketed && (
          <div
            onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'bribe') : undefined}
            className={`absolute w-[160px] bg-amber-100 border-2 border-amber-400 rounded-lg p-2 shadow-xl text-stone-900 ${
              !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
            }`}
            style={{
              left: `${positions.bribe.x}px`,
              top: `${positions.bribe.y}px`,
              zIndex: isMagnified ? 17 : topZ.bribe,
            }}
          >
            <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 border-b border-amber-300 pb-0.5">
              <span>ظرف إكرامية 💸</span>
              <span className="text-emerald-700 font-extrabold font-mono">
                {currentCitizen.bribeOffer} DH
              </span>
            </div>
            <p className="text-[8px] text-stone-700 mt-1 leading-tight">
              مبلغ نقدي مدسوس لتسريع الإجراءات وتجاوز الدور.
            </p>
            {!isMagnified && (
              <div className="mt-1.5 flex gap-1">
                <button
                  onClick={() => {
                    sound.playClick();
                    setBribePocketed(true);
                  }}
                  className="w-full py-0.5 text-[8px] font-bold bg-amber-600 hover:bg-amber-500 text-stone-950 rounded shadow active:scale-95 cursor-pointer"
                >
                  وضع في الجيب (+{currentCitizen.bribeOffer} DH)
                </button>
              </div>
            )}
          </div>
        )}
        </>
        )}

        {/* 9. REALISTIC TRODAT-STYLE AUTOMATIC APPROVAL STAMP [مقبول - مقاطعة بني مكادة] */}
        <div
          onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'stampApprove') : undefined}
          className={`absolute w-[96px] flex flex-col items-center select-none ${
            !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          } ${activeStampTool === 'approve' ? 'ring-4 ring-emerald-400 rounded-xl scale-105' : ''}`}
          style={{
            left: `${positions.stampApprove.x}px`,
            top: `${positions.stampApprove.y}px`,
            zIndex: isMagnified ? 20 : topZ.stampApprove,
          }}
        >
          {/* Main Stamp Machine Body (Slides down into grey base when pressed) */}
          <div
            onClick={!isMagnified ? () => triggerStamp('approve') : undefined}
            className={`w-[96px] transition-transform duration-100 cursor-pointer flex flex-col items-center ${
              activePiston === 'approve' ? 'translate-y-2.5 scale-[0.98]' : 'hover:-translate-y-0.5'
            }`}
            title={isStampOverDocument('approve') ? 'ختم الاستمارة بموافقة مقاطعة بني مكادة' : 'ختم على سطح الطاولة (الختم خارج الاستمارة)'}
          >
            {/* 1. TOP ACRYLIC VIEWING WINDOW (النافذة الشفافة العلوية كما في الصورة) */}
            <div className="w-full h-11 bg-white/25 border-2 border-white/60 rounded-t-lg backdrop-blur-[2px] p-0.5 shadow-md relative overflow-hidden bg-gradient-to-b from-white/40 via-white/15 to-transparent">
              {/* White paper label index card inside window */}
              <div className="w-full h-full bg-[#fafaf9] border border-stone-300 rounded-[3px] p-0.5 flex flex-col justify-between text-stone-900 shadow-inner">
                <div className="flex justify-between items-center text-[5.5px] font-bold text-stone-600 leading-none">
                  <span>المملكة المغربية</span>
                  <span className="text-[5px]">★</span>
                  <span>بني مكادة</span>
                </div>
                <div className="flex items-center justify-between my-auto px-0.5">
                  <span className="text-[5.5px] font-mono text-stone-500">BMK</span>
                  <span className="px-1.5 py-0.2 bg-emerald-600 text-white font-black text-[7px] rounded-xs shadow-xs tracking-wider">
                    مـقـبـول
                  </span>
                  <span className="text-[6px] text-emerald-800 font-bold">✓</span>
                </div>
                <div className="flex items-center justify-between text-[5px] font-mono text-stone-500 border-t border-stone-200 pt-0.2">
                  <span>التاريخ: ... / ... / 2024</span>
                  <span>تأشيرة</span>
                </div>
              </div>
              {/* Acrylic Glass Sheen Reflection */}
              <div className="absolute top-0 right-1 w-6 h-full bg-white/30 transform skew-x-12 pointer-events-none" />
            </div>

            {/* 2. PLASTIC CASING BODY (Classic Office Royal Blue - بحال الصورة بالضبط) */}
            <div className="w-full h-13 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 border-x-2 border-blue-900 shadow-xl relative flex flex-col justify-between p-1">
              {/* Subtle top bevel groove */}
              <div className="w-full h-0.5 bg-blue-400/40 rounded-full" />

              {/* Side Grip Texture: Matrix of embossed dots on left side (كما في الصورة) */}
              <div className="absolute left-1 top-2.5 flex flex-col gap-0.5 pointer-events-none opacity-60">
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                </div>
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                </div>
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-blue-950/80 shadow-inner" />
                </div>
              </div>

              {/* Red side locking button on left side (الزر الدائري الأحمر كما في الصورة) */}
              <div className="absolute left-1.5 bottom-2.5 w-3 h-3 rounded-full bg-red-600 border border-red-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_1px_3px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none">
                <div className="w-1 h-1 rounded-full bg-red-400" />
              </div>

              {/* Center Stamp Machine Brand / Text */}
              <div className="text-center font-bold text-white tracking-widest text-[8px] drop-shadow-sm font-sans mr-1">
                <div className="text-blue-200 text-[6.5px]">مقاطعة بني مكادة</div>
                <div className="font-mono text-[6.5px] text-white/90">TRODAT · STAMP</div>
              </div>

              {/* Bottom edge highlight */}
              <div className="w-full h-0.5 bg-blue-950/60" />
            </div>

            {/* 3. GREY COLLAR BASE (القاعدة السفلية الرمادية) */}
            <div className="w-full h-5 bg-gradient-to-b from-stone-400 to-stone-500 border-2 border-stone-600 rounded-b-md shadow-inner flex items-center justify-center relative overflow-hidden">
              <div className="w-16 h-2 bg-stone-900/80 rounded-xs shadow-inner" />
            </div>
          </div>

          {/* Quick Toggle / Pick up Button */}
          {!isMagnified && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleStampTool('approve');
              }}
              className="mt-1 px-2 py-0.5 rounded text-[8px] font-bold bg-blue-900/90 hover:bg-blue-800 text-blue-200 border border-blue-500 shadow cursor-pointer active:scale-95"
            >
              {activeStampTool === 'approve' ? '✓ الختم بيدك' : 'مسك الختم ✋'}
            </button>
          )}
        </div>

        {/* 10. REALISTIC TRODAT-STYLE AUTOMATIC REJECTION STAMP [مرفوض - مقاطعة بني مكادة] */}
        <div
          onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'stampReject') : undefined}
          className={`absolute w-[96px] flex flex-col items-center select-none ${
            !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          } ${activeStampTool === 'reject' ? 'ring-4 ring-rose-400 rounded-xl scale-105' : ''}`}
          style={{
            left: `${positions.stampReject.x}px`,
            top: `${positions.stampReject.y}px`,
            zIndex: isMagnified ? 21 : topZ.stampReject,
          }}
        >
          {/* Main Stamp Machine Body (Slides down into grey base when pressed) */}
          <div
            onClick={!isMagnified ? () => triggerStamp('reject') : undefined}
            className={`w-[96px] transition-transform duration-100 cursor-pointer flex flex-col items-center ${
              activePiston === 'reject' ? 'translate-y-2.5 scale-[0.98]' : 'hover:-translate-y-0.5'
            }`}
            title={isStampOverDocument('reject') ? 'ختم الاستمارة برفض مقاطعة بني مكادة' : 'ختم على سطح الطاولة (الختم خارج الاستمارة)'}
          >
            {/* 1. TOP ACRYLIC VIEWING WINDOW (النافذة الشفافة العلوية) */}
            <div className="w-full h-11 bg-white/25 border-2 border-white/60 rounded-t-lg backdrop-blur-[2px] p-0.5 shadow-md relative overflow-hidden bg-gradient-to-b from-white/40 via-white/15 to-transparent">
              {/* White paper label index card inside window */}
              <div className="w-full h-full bg-[#fafaf9] border border-stone-300 rounded-[3px] p-0.5 flex flex-col justify-between text-stone-900 shadow-inner">
                <div className="flex justify-between items-center text-[5.5px] font-bold text-stone-600 leading-none">
                  <span>المملكة المغربية</span>
                  <span className="text-[5px]">★</span>
                  <span>بني مكادة</span>
                </div>
                <div className="flex items-center justify-between my-auto px-0.5">
                  <span className="text-[5.5px] font-mono text-stone-500">BMK</span>
                  <span className="px-1.5 py-0.2 bg-rose-600 text-white font-black text-[7px] rounded-xs shadow-xs tracking-wider">
                    مـرفـوض
                  </span>
                  <span className="text-[6px] text-rose-800 font-bold">✗</span>
                </div>
                <div className="flex items-center justify-between text-[5.5px] font-mono text-stone-500 border-t border-stone-200 pt-0.2">
                  <span>التاريخ: ... / ... / 2024</span>
                  <span>تأشيرة</span>
                </div>
              </div>
              {/* Acrylic Glass Sheen Reflection */}
              <div className="absolute top-0 right-1 w-6 h-full bg-white/30 transform skew-x-12 pointer-events-none" />
            </div>

            {/* 2. PLASTIC CASING BODY (Office Dark Slate Blue with Red accent) */}
            <div className="w-full h-13 bg-gradient-to-r from-slate-800 via-blue-950 to-slate-900 border-x-2 border-slate-950 shadow-xl relative flex flex-col justify-between p-1">
              {/* Subtle top bevel groove */}
              <div className="w-full h-0.5 bg-rose-400/40 rounded-full" />

              {/* Side Grip Texture: Matrix of embossed dots on left side */}
              <div className="absolute left-1 top-2.5 flex flex-col gap-0.5 pointer-events-none opacity-60">
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                </div>
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                </div>
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-stone-950/80 shadow-inner" />
                </div>
              </div>

              {/* Red side locking button on left side */}
              <div className="absolute left-1.5 bottom-2.5 w-3 h-3 rounded-full bg-red-600 border border-red-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_1px_3px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none">
                <div className="w-1 h-1 rounded-full bg-red-400" />
              </div>

              {/* Center Stamp Machine Brand / Text */}
              <div className="text-center font-bold text-white tracking-widest text-[8px] drop-shadow-sm font-sans mr-1">
                <div className="text-rose-300 text-[6.5px]">مقاطعة بني مكادة</div>
                <div className="font-mono text-[6.5px] text-white/90">TRODAT · STAMP</div>
              </div>

              {/* Bottom edge highlight */}
              <div className="w-full h-0.5 bg-slate-950/60" />
            </div>

            {/* 3. GREY COLLAR BASE (القاعدة السفلية الرمادية) */}
            <div className="w-full h-5 bg-gradient-to-b from-stone-400 to-stone-500 border-2 border-stone-600 rounded-b-md shadow-inner flex items-center justify-center relative overflow-hidden">
              <div className="w-16 h-2 bg-stone-900/80 rounded-xs shadow-inner" />
            </div>
          </div>

          {/* Quick Toggle / Pick up Button */}
          {!isMagnified && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleStampTool('reject');
              }}
              className="mt-1 px-2 py-0.5 rounded text-[8px] font-bold bg-slate-900/90 hover:bg-slate-800 text-rose-200 border border-rose-500 shadow cursor-pointer active:scale-95"
            >
              {activeStampTool === 'reject' ? '✓ الختم بيدك' : 'مسك الختم ✋'}
            </button>
          )}
        </div>

        {/* 11. FLUORESCENT HIGHLIGHTER MARKER (قلم الماركور الفسفوري) */}
        <div
          onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'marker') : undefined}
          className={`absolute flex flex-col items-center select-none ${
            !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          } ${isMarkerActive ? 'ring-4 ring-yellow-400 rounded-xl scale-105 shadow-[0_0_20px_rgba(250,204,21,0.75)]' : ''}`}
          style={{
            left: `${positions.marker.x}px`,
            top: `${positions.marker.y}px`,
            zIndex: isMagnified ? 22 : topZ.marker,
          }}
        >
          {/* Highlighter Body (Stabilo style neon yellow) */}
          <div
            onClick={!isMagnified ? (e) => {
              e.stopPropagation();
              handleToggleMarkerTool();
            } : undefined}
            className="flex items-center gap-0.5 group cursor-pointer"
            title="انقر لمسك قلم الماركور والتظليل على الوثائق"
          >
            {/* Chisel tip */}
            <div className="w-3.5 h-4 bg-yellow-300 rounded-l-sm border-y border-l border-yellow-500 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-2.5 bg-yellow-400 transform -skew-x-12" />
            </div>
            {/* Pen body */}
            <div className="w-24 h-7 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 rounded-r-md border-2 border-yellow-500 shadow-xl flex items-center justify-between px-2 text-stone-950 font-black">
              <span className="text-[7.5px] font-mono tracking-wider">
                STABILO · MAROC
              </span>
              <span className="text-[9px]">🖊️</span>
            </div>
            {/* Black cap base */}
            <div className="w-3.5 h-6 bg-stone-900 rounded-r-md border border-stone-950 -ml-1 flex items-center justify-center">
              <div className="w-1 h-3 bg-stone-700 rounded-full" />
            </div>
          </div>

          {/* Interactive Button to Pick up / Put down Marker */}
          {!isMagnified && (
            <div className="mt-1 flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMarkerTool();
                }}
                className={`px-2 py-0.5 rounded text-[8px] font-black shadow cursor-pointer transition-all active:scale-95 flex items-center gap-1 ${
                  isMarkerActive
                    ? 'bg-yellow-400 text-stone-950 border border-yellow-600 ring-2 ring-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.8)]'
                    : 'bg-stone-900 hover:bg-stone-800 text-yellow-300 border border-yellow-500/70'
                }`}
                title="تفعيل/تعطيل وضع التظليل بالماركور"
              >
                <span>🖊️</span>
                <span>{isMarkerActive ? '✓ الماركور بيدك' : 'مسك الماركور'}</span>
              </button>

              {highlightedFields.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearHighlights();
                  }}
                  className="px-1.5 py-0.5 rounded text-[7.5px] font-bold bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-600 shadow cursor-pointer"
                  title="مسح كافة التظليلات عن الوثائق"
                >
                  مسح ({highlightedFields.length})
                </button>
              )}
            </div>
          )}
        </div>

        {/* 12. THE UV BLACKLIGHT LAMP (مصباح الأشعة البنفسجية) */}
        <div
          onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'uvLamp') : undefined}
          className={`absolute select-none flex flex-col items-center ${
            !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          }`}
          style={{
            left: `${positions.uvLamp.x}px`,
            top: `${positions.uvLamp.y}px`,
            zIndex: isMagnified ? 18 : topZ.uvLamp,
          }}
        >
          <div className="w-6 h-36 bg-stone-900 rounded-md border-2 border-stone-700 shadow-2xl p-1 flex flex-col items-center justify-between">
            <div className="w-full h-1 bg-stone-700 rounded-t" />
            <div
              className={`w-3 h-30 rounded-full transition-all duration-300 ${
                isUVOn
                  ? 'bg-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.95)]'
                  : 'bg-stone-800 border border-stone-700'
              }`}
            />
            <div className="w-full h-1 bg-stone-700 rounded-b" />
          </div>

          <div className="w-0.5 h-4 bg-stone-800 border-l border-stone-600" />

          {!isMagnified && (
            <button
              onClick={toggleUVLamp}
              className={`px-1.5 py-0.5 rounded bg-stone-900 border text-[8px] font-bold flex items-center gap-1 shadow-lg active:scale-95 transition-colors cursor-pointer ${
                isUVOn
                  ? 'border-purple-500 text-purple-300 bg-purple-950/70 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                  : 'border-stone-700 text-stone-400'
              }`}
              title="تشغيل/إطفاء ضوء الأشعة البنفسجية"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isUVOn ? 'bg-purple-400 animate-ping' : 'bg-stone-600'}`} />
              <span>UV {isUVOn ? 'ON' : 'OFF'}</span>
            </button>
          )}
        </div>

        {/* 13. MOROCCAN MINT TEA GLASS (كأس الشاي بالنعناع) */}
        <div
          onPointerDown={!isMagnified ? (e) => handlePointerDown(e, 'teaGlass') : undefined}
          className={`absolute select-none flex flex-col items-center ${
            !isMagnified ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          }`}
          style={{
            left: `${positions.teaGlass.x}px`,
            top: `${positions.teaGlass.y}px`,
            zIndex: isMagnified ? 19 : topZ.teaGlass,
          }}
        >
          <div
            onClick={!isMagnified ? handleSipTea : undefined}
            className={`relative w-12 h-16 rounded-b-lg border-2 border-amber-300/40 bg-gradient-to-t from-amber-800/85 via-amber-700/75 to-amber-600/60 p-1 flex flex-col justify-between items-center shadow-xl ${
              !isMagnified
                ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform'
                : 'pointer-events-none'
            }`}
            title="انقر لشرب أتاي مغربي مشحر لتخفيف الضغط"
          >
            <div className="w-full h-2 border-y border-amber-200/50 flex justify-around items-center">
              <div className="w-1 h-1 rounded-full bg-amber-200/60" />
              <div className="w-1 h-1 rounded-full bg-amber-200/60" />
              <div className="w-1 h-1 rounded-full bg-amber-200/60" />
            </div>
            <div className="text-[12px] -mt-1">🌿</div>
            <div
              className="w-full bg-amber-900/80 rounded-b transition-all duration-300"
              style={{ height: `${Math.max(4, teaSips * 12)}px` }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md select-none overflow-hidden"
      dir="rtl"
    >
      {/* Outer Desk Frame */}
      <div className="relative w-full max-w-5xl h-[94vh] max-h-[780px] bg-stone-900 border-4 border-amber-950/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Control Bar with Customers Counter & Shutter Status */}
        <header className="px-4 py-2 bg-stone-950/95 border-b border-stone-800 flex items-center justify-between text-xs z-30">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <FileText className="w-4 h-4" />
              <span>{t.deskMode}</span>
            </div>

            {/* Customers Counter Badge */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-200 font-mono text-[11px]">
              <Users className="w-3 h-3 text-amber-400" />
              <span>المراجع رقم: <strong>#{processedCount}</strong></span>
            </div>

            {/* Score accuracy */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-stone-400 font-mono">
              <span className="text-emerald-400 font-bold">✓ {deskScore.correct} سليم</span>
              <span className="text-rose-400 font-bold">✗ {deskScore.errors} أخطاء</span>
            </div>

            {/* Live Stats Indicators */}
            {stats && (
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-0.5 rounded-lg bg-stone-900 border border-stone-800 text-[10px]">
                <div className="flex items-center gap-1 font-mono text-amber-300 font-bold" title="المال والراتب">
                  <Coins className="w-3 h-3 text-amber-400" />
                  <span>{stats.money} DH</span>
                </div>
                <div className="w-[1px] h-3 bg-stone-700" />
                <div className="flex items-center gap-1 font-mono text-emerald-300" title="النزاهة المهنية">
                  <Scale className="w-3 h-3 text-emerald-400" />
                  <span>{stats.integrity}%</span>
                </div>
                <div className="w-[1px] h-3 bg-stone-700" />
                <div className={`flex items-center gap-1 font-mono ${stats.stress > 60 ? 'text-rose-400 font-bold animate-pulse' : 'text-stone-300'}`} title="التوتر">
                  <Flame className="w-3 h-3 text-rose-400" />
                  <span>{stats.stress}%</span>
                </div>
                <div className="w-[1px] h-3 bg-stone-700" />
                <div className="flex items-center gap-1 font-mono text-amber-300" title="رضا الأسرة">
                  <Heart className="w-3 h-3 text-amber-400" />
                  <span>{stats.familySatisfaction}%</span>
                </div>
                {stats.legalDanger > 0 && (
                  <>
                    <div className="w-[1px] h-3 bg-stone-700" />
                    <div className="flex items-center gap-1 font-mono text-rose-400 font-bold" title="شبهة التفتيش">
                      <AlertTriangle className="w-3 h-3 text-rose-500 animate-bounce" />
                      <span>{stats.legalDanger}%</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Story Journal button (Secondary Narrative) */}
            {onOpenStoryJournal && (
              <button
                onClick={onOpenStoryJournal}
                className="px-2 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 text-amber-300 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                title="مذكرات وقصة ياسين (أحداث ثانوية)"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">يوميات ياسين</span>
              </button>
            )}

            {/* Home Intermission button (End shift & rest) */}
            {onOpenHomeIntermission && (
              <button
                onClick={onOpenHomeIntermission}
                className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                title="استراحة المساء والعودة للمنزل"
              >
                <Home className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">المنزل</span>
              </button>
            )}

            <button
              onClick={() => setShowHelpHint((prev) => !prev)}
              className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
              title="دليل الأدوات"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">مساعدة</span>
            </button>

            {/* Marker Quick Toggle Button */}
            <button
              onClick={handleToggleMarkerTool}
              className={`px-2 py-1 rounded-lg text-[11px] flex items-center gap-1 transition-all cursor-pointer border ${
                isMarkerActive
                  ? 'bg-yellow-400 text-stone-950 border-yellow-500 font-black shadow-[0_0_12px_rgba(250,204,21,0.85)] ring-1 ring-yellow-300'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
              }`}
              title="قلم الماركور الفسفوري للتظليل على الوثائق"
            >
              <span>🖊️</span>
              <span className="hidden sm:inline">الماركور</span>
              {highlightedFields.length > 0 && (
                <span className="text-[9px] px-1 rounded-full bg-stone-950 text-yellow-300 font-mono font-bold">
                  {highlightedFields.length}
                </span>
              )}
            </button>

            <button
              onClick={handleClearStamps}
              className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
              title="مسح الأختام عن المكتب"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">مسح الأختام</span>
            </button>

            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                title={t.decisionHistory}
              >
                <History className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                title={t.settings}
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            )}

            {onToggleSound && (
              <button
                onClick={onToggleSound}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                title={soundEnabled ? t.off : t.on}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-stone-500" />}
              </button>
            )}

            <button
              onClick={handleReturnToStory}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-800 hover:bg-rose-900/60 text-stone-400 hover:text-rose-200 transition-colors cursor-pointer"
              title={t.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Citizen Intake Window & Dialogue Header */}
        <div className="bg-stone-950/80 border-b border-stone-800 px-4 py-1.5 flex items-center justify-between text-xs z-25">
          {/* Citizen Face, Name & Quote */}
          <div className="flex items-center gap-2.5">
            <CitizenPhoto citizenId={currentCitizen.id} gender={currentCitizen.application.gender} name={currentCitizen.name} size="sm" hasWatermark={false} />
            <div>
              <div className="font-extrabold text-stone-100 text-[11px]">
                {currentCitizen.name}
              </div>
              <div className="text-[10px] text-amber-200/90 italic">
                "{currentCitizen.quote}"
              </div>
            </div>
          </div>

          {/* Shutter status light */}
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isShutterOpen ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-500 animate-pulse'}`} />
            <span className="text-[10px] font-mono text-stone-400">
              {isShutterOpen ? 'الشباك مفتوح' : 'جارٍ الاستدعاء...'}
            </span>
          </div>
        </div>

        {/* Feedback Alert Banner if just evaluated */}
        {verdictFeedback && (
          <div
            className={`px-4 py-1 text-xs font-bold flex items-center justify-between z-30 transition-all ${
              verdictFeedback.isCorrect
                ? 'bg-emerald-950 border-b border-emerald-600 text-emerald-200'
                : 'bg-rose-950 border-b border-rose-600 text-rose-200'
            }`}
          >
            <span>{verdictFeedback.text}</span>
            <button
              onClick={() => setVerdictFeedback(null)}
              className="text-stone-400 hover:text-stone-100 text-xs px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* New Citizen Arrival Announcement */}
        {newCitizenNotice && (
          <div className="bg-amber-500 text-stone-950 px-4 py-1.5 text-xs font-black flex items-center justify-between z-30 shadow-md animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-stone-950" />
              <span>{newCitizenNotice}</span>
            </div>
            <span className="text-[10px] bg-stone-950/20 px-2 py-0.5 rounded font-mono font-bold">
              ✓ تم تبديل كافة الوثائق
            </span>
          </div>
        )}

        {/* The Wooden Tabletop Surface (سطح المكتب الخشبي) */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerDown={handleDeskSurfacePointerDown}
          className={`relative flex-1 w-full h-full overflow-hidden touch-none ${
            activeStampTool ? 'cursor-crosshair' : ''
          }`}
          style={{
            backgroundColor: '#3b2314',
            backgroundImage: `
              radial-gradient(ellipse at 50% 30%, rgba(255, 230, 180, 0.08) 0%, rgba(0, 0, 0, 0.45) 85%),
              repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.08) 0px, rgba(0, 0, 0, 0.08) 1px, transparent 1px, transparent 24px),
              linear-gradient(90deg, #321c0e 0%, #462817 25%, #3c2314 50%, #4b2b1a 75%, #321c0e 100%)
            `,
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.85)',
          }}
        >
          {/* Active Stamp Equipped Notification Tooltip Banner */}
          {activeStampTool && (
            <div
              className={`absolute top-2 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1.5 rounded-full bg-stone-950/95 border-2 shadow-2xl flex items-center gap-2.5 backdrop-blur-md animate-in fade-in duration-150 ${
                activeStampTool === 'approve' ? 'border-emerald-500 text-emerald-200' : 'border-rose-500 text-rose-200'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full animate-ping ${activeStampTool === 'approve' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              <span className="text-xs font-black">
                الختم بيدك ({activeStampTool === 'approve' ? 'مقبول - مقاطعة بني مكادة' : 'مرفوض - مقاطعة بني مكادة'}): انقر على الاستمارة لختمها، أو انقر على الطاولة
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStampTool(null);
                }}
                className="px-2 py-0.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-bold cursor-pointer"
              >
                إلغاء ✕
              </button>
            </div>
          )}

          {/* Active Marker Equipped Notification Tooltip Banner */}
          {isMarkerActive && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1.5 rounded-full bg-yellow-400 text-stone-950 border-2 border-yellow-600 shadow-2xl flex items-center gap-2.5 backdrop-blur-md animate-in fade-in duration-150 font-black text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-600 animate-ping" />
              <span>🖊️ الماركور بيدك: انقر على أي سطر أو معلومة في الاستمارة أو البطاقة لتظليله بالأصفر الفسفوري!</span>
              {highlightedFields.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHighlights}
                  className="px-2 py-0.5 rounded-full bg-stone-900 text-yellow-300 text-[10px] font-bold cursor-pointer hover:bg-stone-800"
                >
                  مسح ({highlightedFields.length})
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMarkerActive(false)}
                className="px-2 py-0.5 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white text-[10px] font-bold cursor-pointer"
              >
                إرجاع ✕
              </button>
            </div>
          )}

          {/* Stamps Placed on the Wooden Table Surface (مقاطعة بني مكادة - نفس حجم الختم 96px x 40px) */}
          {placedStamps
            .filter((s) => !s.onDocument)
            .map((stamp) => (
              <div
                key={stamp.id}
                className={`absolute pointer-events-none select-none w-[96px] h-[40px] border border-current rounded-sm p-1 font-black text-center shadow-md animate-in zoom-in-90 duration-150 backdrop-blur-[0.5px] flex flex-col justify-between ${
                  stamp.type === 'approve'
                    ? 'border-emerald-500/80 text-emerald-300 bg-emerald-950/70'
                    : 'border-rose-500/80 text-rose-300 bg-rose-950/70'
                }`}
                style={{
                  left: `${stamp.x}px`,
                  top: `${stamp.y}px`,
                  transform: `rotate(${stamp.rotation}deg)`,
                  zIndex: 6,
                  fontFamily: 'Courier New, monospace',
                }}
              >
                <div className="flex items-center justify-between text-[6px] font-bold border-b border-current pb-0.5 opacity-90">
                  <span>المملكة المغربية</span>
                  <span className="text-[5px]">★</span>
                  <span>بني مكادة</span>
                </div>
                <div className="text-[10px] font-black tracking-wider uppercase my-auto">
                  {stamp.type === 'approve' ? '★ مـقـبـول ★' : '★ مـرفـوض ★'}
                </div>
                <div className="flex items-center justify-between text-[5.5px] font-mono opacity-80 border-t border-current pt-0.5">
                  <span>التاريخ: {new Date().toISOString().slice(2, 10)}</span>
                  <span>BMK</span>
                </div>
              </div>
            ))}
          {/* Ambient UV Light Atmosphere Beam (when UV is turned ON) */}
          {isUVOn && (
            <div
              className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-500 animate-pulse"
              style={{
                background:
                  'radial-gradient(circle at 100px 200px, rgba(147, 51, 234, 0.35) 0%, rgba(88, 28, 135, 0.22) 50%, transparent 80%)',
                mixBlendMode: 'screen',
              }}
            />
          )}

          {/* Pneumatic intake hatch sliding shutter when serving next citizen */}
          {!isShutterOpen && (
            <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm z-35 flex items-center justify-center animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-stone-900 border border-amber-600/80 text-center shadow-2xl space-y-1">
                <div className="text-amber-400 font-extrabold text-sm animate-pulse">
                  جارٍ استدعاء المراجع التالي وتسليم ملفه...
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  PNEUMATIC SHUTTER INTAKE
                </div>
              </div>
            </div>
          )}

          {/* Interactive Desk Items Layer */}
          {renderDeskItems(false)}

          {/* 7. THE OPTICAL MAGNIFYING GLASS */}
          <div
            onPointerDown={(e) => handlePointerDown(e, 'magnifier')}
            className="absolute w-[150px] cursor-grab active:cursor-grabbing select-none flex flex-col items-center"
            style={{
              left: `${positions.magnifier.x}px`,
              top: `${positions.magnifier.y}px`,
              zIndex: topZ.magnifier,
              filter: 'drop-shadow(8px 18px 22px rgba(0, 0, 0, 0.75))',
            }}
          >
            {/* Circular Lens Frame & Glass */}
            <div className="relative w-[150px] h-[150px] rounded-full border-[5px] border-stone-900 bg-stone-900 overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.15)] flex items-center justify-center">
              {/* Inner Optical Magnified Desk Viewport */}
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  width: '1000px',
                  height: '750px',
                  left: 0,
                  top: 0,
                  backgroundColor: '#3b2314',
                  backgroundImage: `
                    radial-gradient(ellipse at 50% 30%, rgba(255, 230, 180, 0.08) 0%, rgba(0, 0, 0, 0.45) 85%),
                    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.08) 0px, rgba(0, 0, 0, 0.08) 1px, transparent 1px, transparent 24px),
                    linear-gradient(90deg, #321c0e 0%, #462817 25%, #3c2314 50%, #4b2b1a 75%, #321c0e 100%)
                  `,
                  transform: `translate(${75 - (positions.magnifier.x + 75) * zoomLevel}px, ${75 - (positions.magnifier.y + 75) * zoomLevel}px) scale(${zoomLevel})`,
                  transformOrigin: '0 0',
                }}
              >
                {renderDeskItems(true)}
              </div>

              {/* Convex Glass Curved Edge Refraction Vignette */}
              <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_24px_rgba(0,0,0,0.55),inset_0_0_8px_rgba(255,255,255,0.3)] border border-white/20" />

              {/* Specular Lens Reflection Glare 1 */}
              <div className="absolute top-2.5 left-4 w-9 h-5 rounded-full bg-white/35 transform -rotate-45 pointer-events-none filter blur-[0.5px]" />

              {/* Specular Lens Reflection Glare 2 */}
              <div className="absolute bottom-3 right-5 w-6 h-3 rounded-full bg-white/20 pointer-events-none filter blur-[0.5px]" />
            </div>

            {/* Sturdy Handle & Zoom Selector */}
            <div className="relative flex flex-col items-center -mt-1.5 z-10">
              <div className="w-5 h-16 bg-gradient-to-r from-stone-950 via-stone-800 to-stone-950 rounded-b-lg border-x border-b border-stone-950 shadow-2xl flex flex-col items-center justify-between py-1">
                <div className="w-3 h-1 bg-amber-500/60 rounded-full" />
                <div className="w-3.5 h-6 rounded bg-stone-900 border border-stone-700 flex items-center justify-center">
                  <span className="text-[7px] font-mono text-amber-300 font-bold">
                    {zoomLevel}x
                  </span>
                </div>
                <div className="w-3 h-1 bg-stone-700 rounded-full" />
              </div>

              {/* Zoom Level Switch Button */}
              <button
                onClick={handleCycleZoom}
                className="mt-1 px-2 py-0.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-amber-600/70 text-amber-300 text-[9px] font-bold shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                title="تغيير قوة التكبير (1.5x / 2.0x / 3.0x)"
              >
                <ZoomIn className="w-3 h-3 text-amber-400" />
                <span>تكبير:</span>
                <span className="font-mono text-white">{zoomLevel}x</span>
              </button>
            </div>
          </div>

          {/* Tea Feedback Floating Badge */}
          {teaFeedback && (
            <div
              className="absolute pointer-events-none px-2 py-1 rounded bg-emerald-900/95 text-emerald-200 font-bold text-xs border border-emerald-500 shadow-xl animate-bounce z-40"
              style={{
                left: `${positions.teaGlass.x - 10}px`,
                top: `${positions.teaGlass.y - 30}px`,
              }}
            >
              -5% توتر ☕ (أتاي مشحر وراحة بال)
            </div>
          )}

          {/* 11. BIG RED "التالي" BUTTON (زر التالي المكتبي - NEXT) */}
          <div className="absolute bottom-4 left-4 z-30 flex flex-col items-center">
            <button
              onClick={handleFinalNext}
              disabled={isServingNext}
              className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-rose-500 via-rose-600 to-rose-800 border-4 border-rose-300/80 text-white font-black text-xs sm:text-sm flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(225,29,72,0.6)] active:translate-y-1.5 active:shadow-[0_2px_8px_rgba(225,29,72,0.8)] transition-all cursor-pointer"
              title="اعتماد القرار واستدعاء المواطن التالي وتبديل الملفات"
            >
              <span className="tracking-wider uppercase drop-shadow">
                {t.nextCitizen}
              </span>
              <span className="text-[8px] opacity-80 font-normal">
                {stampedActionFinal ? (stampedActionFinal === 'approve' ? '✓ تأكيد' : '✗ رفض') : 'الموالي'}
              </span>
            </button>
            <span className="text-[9px] font-bold text-stone-300 mt-1 bg-stone-900/90 px-1.5 py-0.5 rounded border border-stone-700">
              المواطن التالي
            </span>
          </div>
        </div>

        {/* Bottom Status bar */}
        <footer className="px-4 py-2 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 z-20">
          <div className="flex items-center gap-2">
            <span>الحالة الحالية:</span>
            {stampedActionFinal ? (
              <span
                className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  stampedActionFinal === 'approve'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-rose-950 text-rose-300 border border-rose-700'
                }`}
              >
                {stampedActionFinal === 'approve' ? 'مختوم بالموافقة (APPROVED)' : 'مختوم بالرفض (DENIED)'}
              </span>
            ) : (
              <span className="text-amber-400 font-medium">بانتظار فحص المستندات والختم...</span>
            )}
            {bribePocketed && (
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold text-[10px]">
                + أخذ الإكرامية (+{currentCitizen.bribeOffer} DH)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[11px] text-stone-400">
              اضغط التالي للانتقال للمواطن الموالي · أو اضغط "العودة للمنزل" للاستراحة وتدبير الميزانية
            </span>
            <button
              onClick={handleReturnToStory}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-[11px] flex items-center gap-1 border border-stone-700 cursor-pointer"
            >
              <span>العودة للمنزل 🏡</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

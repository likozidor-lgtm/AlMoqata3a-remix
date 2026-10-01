/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types/game';

export interface UIStrings {
  gameTitle: string;
  gameSubtitle: string;
  startStory: string;
  continueStory: string;
  settings: string;
  aboutGame: string;
  decisionHistory: string;
  newGameConfirm: string;
  cancel: string;
  confirm: string;
  resetProgress: string;
  resetConfirmText: string;
  language: string;
  soundEffects: string;
  music: string;
  volume: string;
  on: string;
  off: string;
  money: string;
  integrity: string;
  stress: string;
  familySatisfaction: string;
  trust: string;
  legalDanger: string;
  next: string;
  continue: string;
  skipTypewriter: string;
  stage: string;
  decisionPrompt: string;
  decisionResult: string;
  delayedConsequenceTitle: string;
  examineDossier: string;
  stampDossier: string;
  dossierActionApprove: string;
  dossierActionReject: string;
  dossierActionExpedite: string;
  dossierStampHint: string;
  budgetingTitle: string;
  budgetingSubtitle: string;
  salaryLabel: string;
  expensesTotal: string;
  remainingLabel: string;
  applyBudget: string;
  endGameTitle: string;
  finalReportTitle: string;
  playAgain: string;
  coreMessage: string;
  speakerYassine: string;
  speakerAmina: string;
  speakerFatima: string;
  speakerBouchaib: string;
  speakerAllal: string;
  speakerLarbi: string;
  speakerInspector: string;
  speakerNarrator: string;
  statImpact: string;
  moroccanDirham: string;
  viewDetails: string;
  close: string;
  stageProgress: string;
  deskMode: string;
  stampApproveText: string;
  stampRejectText: string;
  nextCitizen: string;
  uvLight: string;
  magnifier: string;
  marker: string;
  mintTea: string;
  dragHint: string;
}

export const translations: Record<Language, UIStrings> = {
  ar: {
    gameTitle: 'AlMoqata3a',
    gameSubtitle: 'المقاطعة · محاكاة واقعية للمسؤولية والقرارات في الإدارة المغربية',
    startStory: 'ابدأ القصة',
    continueStory: 'متابعة المسار',
    settings: 'الإعدادات',
    aboutGame: 'حول اللعبة والرسالة',
    decisionHistory: 'سجل القرارات والآثار',
    newGameConfirm: 'بدء قصة جديدة؟ سيتم مسح التقدم المحفوظ.',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    resetProgress: 'إعادة ضبط اللعبة',
    resetConfirmText: 'هل أنت متأكد من مسح كافة القرارات والبدء من المرحلة الأولى؟',
    language: 'اللغة',
    soundEffects: 'المؤثرات الصوتية',
    music: 'الموسيقى الهادئة',
    volume: 'مستوى الصوت',
    on: 'مفعل',
    off: 'معطل',
    money: 'المال',
    integrity: 'النزاهة',
    stress: 'الضغط النفسي',
    familySatisfaction: 'رضا الأسرة',
    trust: 'الثقة المجتمعية',
    legalDanger: 'الخطر القانوني',
    next: 'متابعة',
    continue: 'استمرار',
    skipTypewriter: 'عرض النص كاملاً',
    stage: 'المرحلة',
    decisionPrompt: 'مفترق الطرق: اختر قرارك بعناية',
    decisionResult: 'النتيجة المباشرة لقرارك',
    delayedConsequenceTitle: 'أثر متأخر لقرار سابق ظهر للسطح!',
    examineDossier: 'فحص الملف الإداري والوثائق',
    stampDossier: 'وضع الختم الرسمي',
    dossierActionApprove: 'موافقة وتوقيع رسمي (وفق القانون)',
    dossierActionReject: 'رفض الملف لعدم استيفاء الشروط',
    dossierActionExpedite: 'تجاوز الدور وتسريع الملف استثنائياً',
    dossierStampHint: 'المس أو انقر على نوع الختم المراد تطبيقه على الوثيقة الإدارية:',
    budgetingTitle: 'توزيع الراتب والمصاريف الشهرية',
    budgetingSubtitle: 'الراتب محدد والمصاريف تتراكم.. حدد أولويات إنفاق الأسرة',
    salaryLabel: 'الراتب الشهري الصافي',
    expensesTotal: 'مجموع المصاريف المقررة',
    remainingLabel: 'الفائض أو العجز الشهري',
    applyBudget: 'اعتماد الميزانية الشهرية',
    endGameTitle: 'النهاية ومآل الموظف',
    finalReportTitle: 'التقرير الختامي للمسار المهني والأخلاقي',
    playAgain: 'إعادة التجربة بقرارات جديدة',
    coreMessage: 'الرسالة: "الفقر والضغط قد يفسران بعض الاختيارات، لكنهما لا يلغيَان مسؤولية الإنسان عن أفعاله."',
    speakerYassine: 'ياسين (الموظف)',
    speakerAmina: 'أمينة (الزوجة)',
    speakerFatima: 'الحاجة فاطمة (الأم)',
    speakerBouchaib: 'سي بوشعيب (زميل في المقاطعة)',
    speakerAllal: 'سي علال (مواطن)',
    speakerLarbi: 'سي العربي (رئيس المصلحة)',
    speakerInspector: 'المفتش بن قدور (التفتيش العام)',
    speakerNarrator: 'الراوي',
    statImpact: 'التأثير على مؤشرات الحياة',
    moroccanDirham: 'درهم',
    viewDetails: 'عرض التفاصيل',
    close: 'إغلاق',
    stageProgress: 'المسار الزمني للأحداث',
    deskMode: 'طاولة الفحص الإداري (المكتب)',
    stampApproveText: 'مقبول',
    stampRejectText: 'مرفوض',
    nextCitizen: 'التالي',
    uvLight: 'الأشعة البنفسجية UV',
    magnifier: 'العدسة المكبرة',
    marker: 'قلم التظليل الأحمر',
    mintTea: 'كأس أتاي بنعناع',
    dragHint: 'يمكنك تحريك وتجربة جميع الأدوات والملفات بحرية على طاولة المكتب',
  },
  ary: {
    gameTitle: 'طريق الموظف',
    gameSubtitle: 'AlMoqata3a · قصة موظف فالمقاطعة بين الضمير وضغوطات الزمان',
    startStory: 'بدا القصة من اللول',
    continueStory: 'كمّل المسار ديالك',
    settings: 'الإعدادات',
    aboutGame: 'على اللعبة والرسالة',
    decisionHistory: 'سجل القرارات ولي طرا',
    newGameConfirm: 'واش باغي تبدا من اللول؟ راه التقدم كلو غادي يتمسح.',
    cancel: 'إلغاء',
    confirm: 'واخا',
    resetProgress: 'مسح الحساب والبدية',
    resetConfirmText: 'واش متأكد باغي تمسح كولشي وتبدا من زيرو؟',
    language: 'اللغة',
    soundEffects: 'الأصوات',
    music: 'الموسيقى الهادية',
    volume: 'الصوت',
    on: 'شاعل',
    off: 'طافي',
    money: 'الفلوس',
    integrity: 'المعقول والنزاهة',
    stress: 'الضغط والستريس',
    familySatisfaction: 'رضا العائلة والدار',
    trust: 'الثقة ديال الناس',
    legalDanger: 'الخطر والتحقيق',
    next: 'زيد للقدام',
    continue: 'كمّل',
    skipTypewriter: 'بين الهضرة كاملة',
    stage: 'المرحلة',
    decisionPrompt: 'شنو غادي تختار؟ كل قرار عندو تمن',
    decisionResult: 'شنو وقع من بعد قرارك',
    delayedConsequenceTitle: 'عاقبة قديمة دابا عاد بانت!',
    examineDossier: 'حل الدوسي وشوف الأوراق',
    stampDossier: 'دير الكاشي (الطابع)',
    dossierActionApprove: 'موافقة بالقانون (طابع قانوني)',
    dossierActionReject: 'رفض حيت الشروط ناقصين',
    dossierActionExpedite: 'دوزو هو اللول تحت الطبلة',
    dossierStampHint: 'ورك على الكاشي لي باغي تضرب بيه الدوسي:',
    budgetingTitle: 'قسم الخلصة والمصاريف ديال الشهر',
    budgetingSubtitle: 'الخلصة محدودة والمصاريف كتر من القياس.. دير التوازن',
    salaryLabel: 'الخلصة الصافية دالشهر',
    expensesTotal: 'المجموع دالمصاريف',
    remainingLabel: 'شحال شاط ولا شحال خاص',
    applyBudget: 'فالييدي الميزانية دالشهر',
    endGameTitle: 'النهاية ومصير ياسين',
    finalReportTitle: 'التقرير النهائي ديال المسار والأخلاق',
    playAgain: 'عاود اللعبة بقرارات خرى',
    coreMessage: 'الرسالة: "الفقر والضغوطات يقدروا يفسروا بعض الأخطاء، ولكن ماعمرهوم كيحيدوا المسؤولية على الإنسان."',
    speakerYassine: 'ياسين',
    speakerAmina: 'أمينة (الزوجة)',
    speakerFatima: 'مي فاطمة (الوالدة)',
    speakerBouchaib: 'سي بوشعيب (كوليك فالخدمة)',
    speakerAllal: 'سي علال (مواطن)',
    speakerLarbi: 'سي العربي (الشاف دالمصلحة)',
    speakerInspector: 'المفتش بن قدور',
    speakerNarrator: 'الراوي',
    statImpact: 'الأثر على المؤشرات',
    moroccanDirham: 'درهم',
    viewDetails: 'شوف التفاصيل',
    close: 'سد',
    stageProgress: 'المسار ديال الأحداث',
    deskMode: 'طابلة الفحص والخدمة (البيرو)',
    stampApproveText: 'مقبول',
    stampRejectText: 'مرفوض',
    nextCitizen: 'التالي',
    uvLight: 'الضو البنفسجي UV',
    magnifier: 'المكبرة',
    marker: 'ستيلو ماركور حمر',
    mintTea: 'كاس أتاي مشحر بالنعناع',
    dragHint: 'حرك الخواتم، الدواسة، المكبرة والستيلو فوق البيرو كيف بغيتي',
  },
  fr: {
    gameTitle: 'La Voie du Fonctionnaire',
    gameSubtitle: 'AlMoqata3a · Simulation narrative de dilemmes et intégrité',
    startStory: 'Nouvelle Histoire',
    continueStory: 'Continuer',
    settings: 'Paramètres',
    aboutGame: 'À propos & Message',
    decisionHistory: 'Historique des choix',
    newGameConfirm: 'Commencer une nouvelle partie ? La progression sera réinitialisée.',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    resetProgress: 'Réinitialiser',
    resetConfirmText: 'Êtes-vous sûr de vouloir tout effacer et recommencer au chapitre 1 ?',
    language: 'Langue',
    soundEffects: 'Effets Sonores',
    music: 'Musique d’ambiance',
    volume: 'Volume',
    on: 'Activé',
    off: 'Désactivé',
    money: 'Argent',
    integrity: 'Intégrité',
    stress: 'Stress',
    familySatisfaction: 'Satisfaction Famille',
    trust: 'Confiance Publique',
    legalDanger: 'Risque Légal',
    next: 'Suivant',
    continue: 'Continuer',
    skipTypewriter: 'Tout afficher',
    stage: 'Étape',
    decisionPrompt: 'Carrefour de décision : choisissez avec soin',
    decisionResult: 'Conséquence immédiate',
    delayedConsequenceTitle: 'Conséquence différée refait surface !',
    examineDossier: 'Examiner le dossier administratif',
    stampDossier: 'Apposer le tampon officiel',
    dossierActionApprove: 'Approbation légale conforme',
    dossierActionReject: 'Rejet justifié du dossier',
    dossierActionExpedite: 'Accélération illégale en coulisses',
    dossierStampHint: 'Sélectionnez le tampon officiel à apposer sur le document :',
    budgetingTitle: 'Budget mensuel et charges du ménage',
    budgetingSubtitle: 'Salaire fixe face aux charges croissantes.. Équilibrez le foyer',
    salaryLabel: 'Salaire mensuel net',
    expensesTotal: 'Total des dépenses prévues',
    remainingLabel: 'Excédent / Déficit',
    applyBudget: 'Valider le budget mensuel',
    endGameTitle: 'Épilogue & Destin',
    finalReportTitle: 'Bilan final du parcours éthique et professionnel',
    playAgain: 'Rejouer avec de nouveaux choix',
    coreMessage: 'Message : "La précarité et la pression peuvent expliquer certains choix, mais elles n’annulent jamais la responsabilité de l’individu face à ses actes."',
    speakerYassine: 'Yassine (Fonctionnaire)',
    speakerAmina: 'Amina (Épouse)',
    speakerFatima: 'Fatima (Mère)',
    speakerBouchaib: 'Si Bouchaib (Collègue)',
    speakerAllal: 'Si Allal (Citoyen)',
    speakerLarbi: 'Si Larbi (Chef de service)',
    speakerInspector: 'Inspecteur Benkaddour',
    speakerNarrator: 'Narrateur',
    statImpact: 'Impact sur vos jauges de vie',
    moroccanDirham: 'MAD',
    viewDetails: 'Détails',
    close: 'Fermer',
    stageProgress: 'Chronologie des étapes',
    deskMode: 'Bureau d’inspection interactif',
    stampApproveText: 'VALIDE',
    stampRejectText: 'REJETÉ',
    nextCitizen: 'SUIVANT',
    uvLight: 'Lampe UV Sécurité',
    magnifier: 'Loupe grossissante',
    marker: 'Marqueur rouge',
    mintTea: 'Thé à la menthe',
    dragHint: 'Déplacez librement tous les tampons, dossiers et outils sur le bureau',
  },
};

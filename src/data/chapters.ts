/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, Ending } from '../types/game';

export const GAME_CHAPTERS: Chapter[] = [
  // المرحلة 1: الطفولة والطموح
  {
    id: 1,
    stageNumber: 1,
    title: {
      ar: 'المرحلة 1: الطفولة والطموح',
      ary: 'المرحلة 1: الصغر والطموح فالدرب',
      fr: 'Étape 1 : Enfance et Ambitions',
    },
    subtitle: {
      ar: 'أزقة حي شعبي مغربي بسيط.. وبداية تشكل الأحلام',
      ary: 'درب شعبي بسيط.. وتمارة والنية دالقراية',
      fr: 'Les ruelles d’un quartier populaire et les premiers rêves',
    },
    sceneType: 'street',
    yearPeriod: 'السنوات الأولى',
    dialogues: [
      {
        speaker: 'fatima',
        text: {
          ar: 'يا ياسين يا ولدي، العلم والنية الصافية هما رأس مال الفقير في هاد الدنيا.',
          ary: 'ياسين اولدي، القراية والمعقول هما راس مال الدرويش فهاد الدنيا.',
          fr: 'Mon fils Yassine, les études et la droiture sont le seul capital d’un homme honnête.',
        },
        mood: 'happy',
      },
      {
        speaker: 'yassine',
        text: {
          ar: 'سأدرس بجد يا أمي، سأحصل على وظيفة كريمة أخدم بها الناس وأرفع رأسك.',
          ary: 'غادي نقرا ونجيب الباك بميزة يا ميمتي، باش نخدم ونهز بيك وبخوتي.',
          fr: 'Je travaillerai dur mère, pour décrocher un poste digne, servir les gens et te rendre fière.',
        },
        mood: 'serious',
      },
      {
        speaker: 'narrator',
        text: {
          ar: 'يجد ياسين نفسه بين رفقة تلعب في الزقاق وتهمل المذاكرة، وبين طاولة دراسة متواضعة تنتظر صبره.',
          ary: 'ياسين بين الدراري لي شادين القنت فالدرب، وبين طبلة القراية والكتوبة لي كيتسناوه.',
          fr: 'Yassine est partagé entre les amis distraits dans la ruelle et sa modeste table d’étude.',
        },
        mood: 'neutral',
      },
    ],
    choices: [
      {
        id: 'c1_study_hard',
        text: {
          ar: 'الانكباب على الكتب والدراسة بجدية رغم قلة الإمكانيات وضيق البيت',
          ary: 'الصبر والقراية بتمارة وخا الدار ضيقة والضو ناقص',
          fr: 'Étudier avec rigueur malgré l’exiguïté du foyer et le manque de moyens',
        },
        moralWeight: 'honest',
        statChanges: {
          integrity: 5,
          stress: 5,
          familySatisfaction: 15,
          trust: 5,
        },
        consequenceText: {
          ar: 'حققت نتائج دراسية مشرفة ملأت قلب والدتك بالفخر وفتحت لك أبواب المعرفة.',
          ary: 'جبتي نقط واعرة فرحتي بيها الوالدة وحليتي بيبان المستقبل.',
          fr: 'Des résultats scolaires brillants qui ont comblé votre mère de fierté.',
        },
      },
      {
        id: 'c1_slacking',
        text: {
          ar: 'إهمال الدروس والبحث عن تسلية سريعة مع رفاق الدرب',
          ary: 'تلوح الكتوبة وتمشي تكمي الوقت مع صحاب الدرب فالتسكيع',
          fr: 'Délaisser les révisions pour tuer le temps avec les camarades du quartier',
        },
        moralWeight: 'compromise',
        statChanges: {
          integrity: -10,
          stress: 15,
          familySatisfaction: -15,
        },
        consequenceText: {
          ar: 'شعرت بتأنيب الضمير لاحقاً وعانيت في استدراك ما فاتك تحت ضغط الامتحانات.',
          ary: 'ندمتي من بعد وتعذبتي باش ترود وتلحق على البروغرام دالمتحانات.',
          fr: 'Le remords a suivi rapidement avec un stress accru pour rattraper le retard.',
        },
      },
    ],
  },

  // المرحلة 2: سنوات الدراسة والجامعة
  {
    id: 2,
    stageNumber: 2,
    title: {
      ar: 'المرحلة 2: سنوات الدراسة والجامعة',
      ary: 'المرحلة 2: لافاك والشهادة',
      fr: 'Étape 2 : Années d’Université',
    },
    subtitle: {
      ar: 'المدرجات، البحث، والتحضير لمباريات الوظيفة العمومية',
      ary: 'المدرجات، البيبليوتيك، والوجد لمباريات الوظيفة',
      fr: 'Amphithéâtres, rigueur et préparation aux concours administratifs',
    },
    sceneType: 'study',
    yearPeriod: 'مرحلة التحصيل والشباب',
    dialogues: [
      {
        speaker: 'yassine',
        text: {
          ar: 'المنافسة شديدة في المباريات، لكنني أؤمن أن الجهد النزيه يثمر في النهاية.',
          ary: 'الكونكور صعيب والمنافسة حامية، ولكن بالمعقول والخدمة ربي غادي يسهل.',
          fr: 'Le concours est difficile, mais je crois fermement que le mérite finit par payer.',
        },
        mood: 'serious',
      },
      {
        speaker: 'fatima',
        text: {
          ar: 'دعواتي لك ليل نهار يا ولدي. لا تطرق باباً فيه غش أو وساطة مشبوهة.',
          ary: 'دعيواتي معاك فكل ركعة اولدي. ماتمشيش فشي طريق فيها التدوار ولا المعرفة العوجة.',
          fr: 'Mes prières t’accompagnent. Ne cherche jamais de piston douteux ou de faux raccourci.',
        },
        mood: 'happy',
      },
      {
        speaker: 'narrator',
        text: {
          ar: 'عرض زميل شراء أسئلة مسربة لمباراة توظيف في الإدارة، فماذا ستقرر؟',
          ary: 'واحد السيد عرض عليك تسريبات دالكونكور بالفلوس، شنو غادير؟',
          fr: 'Un camarade propose d’acheter des fuites d’épreuves pour le concours public.',
        },
        mood: 'neutral',
      },
    ],
    choices: [
      {
        id: 'c2_honest_prep',
        text: {
          ar: 'رفض التسريبات والاعتماد التام على مجهودك ومراجعتك الشخصية',
          ary: 'ترفض التسريبات وتخدم بدراعك وراسك مرفوع',
          fr: 'Rejeter fermement la fraude et ne compter que sur son propre mérite',
        },
        moralWeight: 'honest',
        statChanges: {
          integrity: 10,
          stress: 10,
          trust: 10,
        },
        consequenceText: {
          ar: 'اجتزت الامتحان بضمير مرتاح، وورد اسمك في لائحة الناجحين باستحقاق نقي.',
          ary: 'دوزتي الامتحان وضميرك مهني، وخرج سميتك فالليستة بالاستحقاق ونية الوالدين.',
          fr: 'Succès mérité au concours avec une fierté intacte et un esprit serein.',
        },
      },
      {
        id: 'c2_cheat_leak',
        text: {
          ar: 'الاطلاع على التسريبات تحت وطأة الخوف من البطالة وضياع السنوات',
          ary: 'تشوف التسريبات حيت خايف من الشوماج وتمشي سنين فالهوا',
          fr: 'Consulter les fuites par panique du chômage et du temps perdu',
        },
        moralWeight: 'compromise',
        statChanges: {
          integrity: -20,
          legalDanger: 15,
          stress: 20,
        },
        consequenceText: {
          ar: 'نجحت، لكن إحساساً دفيناً بالذنب صاحبك.. وكأن الوظيفة بدأت بنقطة سوداء.',
          ary: 'نجحتي، ولكن غصة بقات فقلبك حيت حسيتي بلي بديتي مسارك بزلّة.',
          fr: 'Vous avez réussi mais une culpabilité sourde ternit vos premiers pas professionnels.',
        },
      },
    ],
  },

  // المرحلة 3: الحصول على الوظيفة في المقاطعة
  {
    id: 3,
    stageNumber: 3,
    title: {
      ar: 'المرحلة 3: تعيينك في المقاطعة',
      ary: 'المرحلة 3: الدخول للمقاطعة والبيرو الجديد',
      fr: 'Étape 3 : Entrée en Fonction à la Moqata3a',
    },
    subtitle: {
      ar: 'أول يوم في مكتب تصحيح الإمضاءات ومصلحة شؤون المواطنين',
      ary: 'النهار اللول فمكتب الحالة المدنية وتصحيح الإمضاءات',
      fr: 'Premier jour au bureau de légalisation et relations avec les usagers',
    },
    sceneType: 'office',
    yearPeriod: 'بداية المسار الإداري',
    interactiveType: 'stamp_dossier',
    dossier: {
      dossierNumber: 'MQ-2024/089',
      citizenName: {
        ar: 'محمد المرابط (متقاعد)',
        ary: 'محمد المرابط (متقاعد درويش)',
        fr: 'Mohammed El Mourabit (Retraité)',
      },
      requestType: {
        ar: 'شهادة السكنى ومطابقة وثائق إدارية',
        ary: 'شهادة السكنى ومطابقة الأوراق الإدارية',
        fr: 'Certificat de résidence et conformité de documents',
      },
      statusNotes: {
        ar: 'الملف كامل ومستوفٍ لكل الشروط القانونية ومعه طوابع بريدية سليمة.',
        ary: 'الدوسي كامل مكمول وماخاصو حتى ورقة، وكلشي قانوني.',
        fr: 'Dossier complet, conforme aux exigences réglementaires.',
      },
      standardProcessingTime: {
        ar: 'وفق الدور والترتيب العادل',
        ary: 'بالنوبة والصف القانوني',
        fr: 'Traitement selon l’ordre équitable',
      },
      applicantBackground: {
        ar: 'مواطن كبير في السن انتظر في الصف لأكثر من ساعة ونصف.',
        ary: 'راجل كبير مسكين واقف فالنوبة هادي ساعة ونص.',
        fr: 'Citoyen âgé patientant dans la file depuis plus d’une heure.',
      },
    },
    dialogues: [
      {
        speaker: 'larbi',
        text: {
          ar: 'أهلاً بك يا ياسين. المواطنون أمانة في أعناقنا، والنظام هنا خط أحمر.',
          ary: 'مرحبا بيك السي ياسين. المواطنين أمانة عندنا، والنظام هو كلشي.',
          fr: 'Bienvenue Yassine. Les citoyens sont une responsabilité sacrée, l’ordre avant tout.',
        },
        mood: 'serious',
      },
      {
        speaker: 'bouchaib',
        text: {
          ar: 'يا سي ياسين، لا تتعب نفسك بالمثالية الزائدة.. "دهن السير يسير" كما يقولون.',
          ary: 'يا السي ياسين، ماتزيرش راسك بزاف، راه الإدارة كتبغي شوية دالمرونة!',
          fr: 'Doucement Yassine, ne sois pas trop rigide, l’administration aime la souplesse.',
        },
        mood: 'corrupt',
      },
      {
        speaker: 'yassine',
        text: {
          ar: 'أقسمت على خدمة الصالح العام باحترام القانون والمساواة بين الجميع.',
          ary: 'حالف باش نخدم المواطنين بنيتي وبالقانون ومنفرقش بين الناس.',
          fr: 'J’ai prêté serment pour servir l’intérêt public en toute équité.',
        },
        mood: 'serious',
      },
    ],
    choices: [
      {
        id: 'c3_fair_queue',
        text: {
          ar: 'خدمة المواطنين باحترام الترتيب التام ورفض أي تجاوز بالوساطة',
          ary: 'تخدم الناس بالنوبة وما دوز حتى واحد بباك صاحبي ولا التقدام',
          fr: 'Servir scrupuleusement selon l’ordre d’arrivée sans aucun passe-droit',
        },
        moralWeight: 'honest',
        statChanges: {
          integrity: 10,
          trust: 15,
          stress: 5,
        },
        consequenceText: {
          ar: 'شعر المواطنون بالاحترام والعدل، واكتسبت سمعة الموظف النظيف من أسبوعك الأول.',
          ary: 'الناس فصال دالانتظار حسو بالاحترام وهضرو عليك بالخير والمعقول.',
          fr: 'Les usagers ont salué votre équité et votre probité dès la première semaine.',
        },
      },
      {
        id: 'c3_favor_friend',
        text: {
          ar: 'تمرير ملف أحد معارف رئيس المصلحة من تحت الطاولة لتجنب إحراجه',
          ary: 'دوز دوسي ديال واحد معرفة دالشاف باش ميبقاش فيه الحال وتكسب ودّه',
          fr: 'Faire passer le dossier d’un proche du chef pour flatter sa hiérarchie',
        },
        moralWeight: 'compromise',
        statChanges: {
          integrity: -15,
          trust: -10,
          stress: -5,
        },
        consequenceText: {
          ar: 'أرضيت رئيس المصلحة مؤقتاً، لكن نظرات المواطنين في قاعة الانتظار كانت مليئة بالخيبة.',
          ary: 'رضيتي الشاف، ولكن الناس لي شادين النوبة شافو فيك بنظرة حگرة وخيبة أمل.',
          fr: 'Le chef apprécie, mais les usagers qui attendaient ont ressenti l’injustice.',
        },
      },
    ],
  },

  // المرحلة 4: الزواج وبداية المسؤوليات
  {
    id: 4,
    stageNumber: 4,
    title: {
      ar: 'المرحلة 4: الزواج وبداية الأعباء',
      ary: 'المرحلة 4: الزواج وبداية تمارة دالحياة',
      fr: 'Étape 4 : Mariage et Premières Charges',
    },
    subtitle: {
      ar: 'تأسيس بيت الزوجية مع أمينة.. وتراكم مصاريف الكراء والتجهيز',
      ary: 'بنيتي عشك مع أمينة.. وبدا الكراء وتجهيز الدار والمسؤولية الكبيرة',
      fr: 'Foyer conjugal avec Amina, loyer et charges matérielles',
    },
    sceneType: 'home',
    yearPeriod: 'السنة الثانية من الوظيفة',
    dialogues: [
      {
        speaker: 'amina',
        text: {
          ar: 'الحمد لله على نعمة الستر يا ياسين، لكن مصاريف الكراء والعيش بدأت تلتهم الراتب بسرعة.',
          ary: 'الحمد لله على الستر أ ياسين، ولكن الكراء والمصروف راه كياكلوا الخلصة دغيا.',
          fr: 'Dieu merci pour la paix du foyer, mais le loyer et la vie quotidienne absorbent tout.',
        },
        mood: 'worried',
      },
      {
        speaker: 'yassine',
        text: {
          ar: 'سنقتصد يا أمينة، الحلال فيه بركة ولو كان قليلاً، وسنوفق بين واجباتنا بإذن الله.',
          ary: 'نزيروا الصمطة يا أمينة، الحلال وخا قليل فيه البركة وسيدي ربي ما يضيعناش.',
          fr: 'Nous ferons attention Amina. Le gain honnête apporte la bénédiction.',
        },
        mood: 'serious',
      },
      {
        speaker: 'narrator',
        text: {
          ar: 'تأتي نهاية الشهر وبقي في جيبك القليل، وصاحب البيت يطالب بزيادة واجب الكراء.',
          ary: 'وصل اللخر دالشهر والكونت خاوي، ومول الدار باغي يزيد فثمن الكراء.',
          fr: 'Fin de mois serrée et le propriétaire demande une hausse du loyer.',
        },
        mood: 'neutral',
      },
    ],
    choices: [
      {
        id: 'c4_honest_dialogue',
        text: {
          ar: 'الحوار مع الزوجة بشفافية وإعادة جدولة النفقات بالصبر والتضامن',
          ary: 'تهضر مع مرتك بصراحة، وتزيرو المصاريف بجوج بلا تسلاف ولا خروقات',
          fr: 'Dialogue transparent avec l’épouse et rationalisation stricte des dépenses',
        },
        moralWeight: 'honest',
        statChanges: {
          familySatisfaction: 10,
          stress: 10,
          money: -200,
        },
        consequenceText: {
          ar: 'تفهمت أمينة الوضع وقدرت صدقك، فتعززت المودة بينكما رغم ضيق الحال.',
          ary: 'أمينة تفهمات الموقف وقدرات صراحتك، وزادت المحبة والنية بيناتكم.',
          fr: 'Amina apprécie votre sincérité ; les liens du foyer en sortent renforcés.',
        },
      },
      {
        id: 'c4_hide_troubles',
        text: {
          ar: 'إخفاء الضائقة المالية والاقتراض من غرباء لإظهار صورة الرجل المقتدر',
          ary: 'تخبي عليها وتسلف باش تبان راجل مريش ومخاصك والو',
          fr: 'Cacher les difficultés financières et emprunter pour maintenir les apparences',
        },
        moralWeight: 'compromise',
        statChanges: {
          familySatisfaction: -5,
          stress: 25,
          money: 500,
        },
        consequenceText: {
          ar: 'وفرت مالاً مؤقتاً لكن الديون بدأت تطاردك وتثقل كاهلك بالقلق الليلي.',
          ary: 'درتي الفلوس دابا، ولكن الكريدي والربا بداو يخنقولك فخاطرك كل ليلة.',
          fr: 'Un répit éphémère mais les dettes commencent à asphyxier votre tranquillité.',
        },
      },
    ],
  },

  // المرحلة 5: الراتب لا يكفي (الميزانية التفاعلية)
  {
    id: 5,
    stageNumber: 5,
    title: {
      ar: 'المرحلة 5: الراتب لا يكفي',
      ary: 'المرحلة 5: الخلصة ما وافياش',
      fr: 'Étape 5 : Le Salaire Insuffisant',
    },
    subtitle: {
      ar: 'ارتفاع الأسعار، فواتير الكهرباء، وأدوية الوالدة.. كيف ستوزع 3800 درهم؟',
      ary: 'الغلاء، الما والضو، ودوا الوالدة.. كفاش غادي تقسم 3800 درهم؟',
      fr: 'Hausse des prix, factures et santé : comment répartir 3 800 MAD ?',
    },
    sceneType: 'home',
    yearPeriod: 'السنة الثالثة من الوظيفة',
    interactiveType: 'budgeting',
    dialogues: [
      {
        speaker: 'yassine',
        text: {
          ar: 'ثلاثة آلاف وثمانمائة درهم.. بين كراء، وفواتير، وقفّة السوق، لم يتبق شيء لادخار للطوارئ.',
          ary: '3800 درهم.. بين كراء، ضو، قفة السيمانة.. والو مابقا باش يدير بنادم حبة للزمان.',
          fr: '3 800 dirhams.. Loyer, factures, marché : impossible d’économiser pour les imprévus.',
        },
        mood: 'stressed',
      },
      {
        speaker: 'fatima',
        text: {
          ar: 'يا ولدي، وصفة طبيب العظام غالية هاد الشهر، إذا لم تستطع فلا تشغل بالك.',
          ary: 'اولدي الروشيتا دالراديو والدوا غالية، إلا ماقديتيش خليها لمرة خرى ماتشغلش بالك.',
          fr: 'Mon fils, mes radios et médicaments coûtent cher ce mois-ci, ne te surmène pas.',
        },
        mood: 'worried',
      },
    ],
    choices: [
      {
        id: 'c5_overtime_legal',
        text: {
          ar: 'البحث عن عمل مسائي شريف (مساعدة في متجر، كتابة وثائق حرة خارج الدوام)',
          ary: 'تقلب على خدمة حلال فالعشية (عون فحانوت ولا كتوبة) وتضحي براحتك',
          fr: 'Prendre un travail légal du soir après les heures de bureau au détriment du repos',
        },
        moralWeight: 'honest',
        statChanges: {
          money: 800,
          stress: 20,
          integrity: 5,
          familySatisfaction: 10,
        },
        consequenceText: {
          ar: 'تضاعف تعبك الجسدي، لكنك وفرت مصاريف الدواء دون أن تمد يدك لشبهة.',
          ary: 'هلكك العيا وتمارة ولكن جبتي الفلوس حلال وخليتي ضميرك نقي.',
          fr: 'Fatigue physique intense mais les dépenses de santé sont couvertes dignement.',
        },
      },
      {
        id: 'c5_cut_essentials',
        text: {
          ar: 'تقليص مصاريف الطعام وتأجيل أدوية والدتك لتفادي الديون',
          ary: 'تنقص من الماكلة ودوا الوالدة وتزير الصمطة حتى يعفو الله',
          fr: 'Réduire l’alimentation et reporter les soins médicaux pour éviter l’endettement',
        },
        moralWeight: 'compromise',
        statChanges: {
          money: 100,
          stress: 25,
          familySatisfaction: -20,
        },
        consequenceText: {
          ar: 'تأزمت صحة والدتك قليلاً وشعرت بالمرارة وأنت عاجز عن إسعادها.',
          ary: 'مرضات الوالدة شوية وحسيتي بالحكرة والحرقة وأنت مكتف اليدين.',
          fr: 'La santé maternelle décline, générant une amertume profonde et de la tristesse.',
        },
      },
      {
        id: 'c5_borrow_bank',
        text: {
          ar: 'طلب قرض استهلاكي من البنك برهون فوائد تقتطع مباشرة من الراتب',
          ary: 'دير كريدي كونسو فاللاكيس، والفوائد تاكل نص الخلصة كل شهر',
          fr: 'Contracter un crédit à la consommation avec de lourds intérêts mensuels',
        },
        moralWeight: 'compromise',
        statChanges: {
          money: 1500,
          stress: 30,
          familySatisfaction: 5,
        },
        consequenceText: {
          ar: 'انحلت الأزمة لأيام، لكن اقتطاعات البنك جعلت راتبك القادم أضيق مما كان.',
          ary: 'فوجتي هاد السيمانة، ولكن البنكة قطعات طرف كبير والشهر الجاي غايكون أظلم.',
          fr: 'Soulagement immédiat mais les traites futures étranglent encore plus votre budget.',
        },
      },
    ],
  },

  // المرحلة 6: أول اختبار (الرشوة المباشرة الأولى)
  {
    id: 6,
    stageNumber: 6,
    title: {
      ar: 'المرحلة 6: أول اختبار أخلاقي',
      ary: 'المرحلة 6: أول امتحان.. الكاشي والقهوة',
      fr: 'Étape 6 : La Première Tentation',
    },
    subtitle: {
      ar: 'مواطن مستعجل.. ظرف مغلق.. و300 درهم تحت الملف الإداري',
      ary: 'سي علال مزروب.. جوى فيه 300 درهم محطوط تحت الدوسي',
      fr: 'Usager pressé, enveloppe discrète et 300 dirhams sous le dossier',
    },
    sceneType: 'office',
    yearPeriod: 'نقطة التحول الأولى',
    interactiveType: 'stamp_dossier',
    dossier: {
      dossierNumber: 'MQ-2024/314',
      citizenName: {
        ar: 'سي علال البكاري (مقاول أشغال صغرى)',
        ary: 'سي علال البكاري (طاشرون)',
        fr: 'Si Allal El Bakkari (Entrepreneur)',
      },
      requestType: {
        ar: 'رخصة إدارية مستعجلة لصفقة تجارية',
        ary: 'شهادة إدارية ورخصة طارئة دالخدمة',
        fr: 'Autorisation administrative urgente pour un marché',
      },
      statusNotes: {
        ar: 'الملف تنقصه معاينة ميدانية روتينية، ويطلب ختمه فوراً دون انتظار موعد الجمعة.',
        ary: 'ناقصاه معاينة تقنية دالمهندس، وباغي الكاشي يخرج دابا دابا.',
        fr: 'Inspection technique en attente, exige une validation immédiate.',
      },
      bribeOffer: 300,
      bribePrompt: {
        ar: 'وضع ظرفاً فيه 300 درهم قائلاً: "هاك أسي ياسين تقهوى بها وسربي ليا هاد الوريقة"',
        ary: 'حط ظرف فيه 300 درهم وقال: "هاك السي ياسين قهيوة ديالك، وفك ليا هاد الورقة دغيا"',
        fr: 'Glisse 300 dirhams en disant : "Prenez un café Si Yassine et facilitez-moi ceci"',
      },
      standardProcessingTime: {
        ar: '3 إلى 5 أيام عمل وفق الإجراءات',
        ary: '3 أيام عمل بالقانون',
        fr: '3 à 5 jours selon la procédure normale',
      },
      applicantBackground: {
        ar: 'يقول إنه سيخسر عربون مشروعه إذا لم يختم الملف قبل ظهر اليوم.',
        ary: 'كيقول غيضيع فالعربون إلا ماتسيناتش قبل 12.',
        fr: 'Affirme risquer une pénalité financière majeure sans visa avant midi.',
      },
    },
    dialogues: [
      {
        speaker: 'allal',
        text: {
          ar: 'يا سي ياسين، أنا في ورطة حقيقية.. هاد المبلغ بسيط حق قهوتك وتعبك معنا، فقط ضع الختم.',
          ary: 'السي ياسين عتقني، هادي غير قهيوتك وتعبك معايا، ضرب الطابع وفكني الله يرحم الوالدين.',
          fr: 'Si Yassine sauvez-moi, ceci n’est qu’un café pour votre peine, tamponnez simplement.',
        },
        mood: 'worried',
      },
      {
        speaker: 'yassine',
        text: {
          ar: '(في نفسي: 300 درهم تسدد فاتورة الصيدلية المعلقة.. لكنه خرق للأمانة واليمين)',
          ary: '(فبالي: 300 درهم غادي تفك دوا الوالدة اليوم.. ولكن راه رشوة وخيانة للأمانة)',
          fr: '(En moi-même : 300 MAD couvriraient la pharmacie.. mais c’est un parjure impardonnable)',
        },
        mood: 'stressed',
      },
    ],
    choices: [
      {
        id: 'c6_refuse_strictly',
        text: {
          ar: 'رفض الظرف بحزم وإرجاعه للمواطن: "القانون يطبق بالترتيب ولا أقبل مالاً غير راتبي"',
          ary: 'ترفض الفلوس وتردها ليه: "هادشي ممنوع بالقانون، سير قاد وراقك وبالنوبة"',
          fr: 'Refuser catégoriquement l’enveloppe et exiger le respect strict de la procédure légale',
        },
        moralWeight: 'honest',
        statChanges: {
          integrity: 15,
          trust: 10,
          stress: -5,
          legalDanger: -5,
        },
        consequenceText: {
          ar: 'احمرّ وجه المواطن خجلاً واعتذر، وخرجت مرفوع الرأس رغم فراغ جيبك.',
          ary: 'حشم المواطن وجمع فلوسو، وبقيتي واقف راجل المعقول وخا الجيب ناشف.',
          fr: 'Le citoyen a retiré son argent confus ; vous restez debout, fidèle à vos valeurs.',
        },
      },
      {
        id: 'c6_take_without_favour',
        text: {
          ar: 'أخذ الظرف لكن مع معالجة الملف وفق وتيرته العادية دون تمييز',
          ary: 'تاخد الفلوس دالقهوة، ولكن تخليه يتسنى نوبتو العادية بحالو بحال الناس',
          fr: 'Prendre l’enveloppe tout en traitant le dossier au rythme habituel sans favoritisme',
        },
        moralWeight: 'corrupt',
        statChanges: {
          money: 300,
          integrity: -25,
          stress: 15,
          legalDanger: 10,
        },
        delayedEffect: {
          triggerStageId: 9,
          title: {
            ar: 'المواطن يتحدث في المقهى',
            ary: 'المواطن كيهضر فقهوة الحومة',
            fr: 'Rumeurs au café du quartier',
          },
          description: {
            ar: 'سي علال أخبر بعض معارفه أن موظف المقاطعة أخذ منه إكرامية دون أن يسرع له الملف.',
            ary: 'سي علال عاود فالحومة بلي ياسين خدا من عندو قهوة وماقضاش ليه الغرض دغيا.',
            fr: 'Le citoyen s’est plaint publiquement d’avoir payé sans passe-droit rapide.',
          },
          statChanges: {
            trust: -20,
            legalDanger: 15,
          },
        },
        consequenceText: {
          ar: 'وضعت المال في جيبك بخلسة، لكن دقات قلبك تسارعت وشعرت بالخزي كلما رن جرس الباب.',
          ary: 'خشيتي الفلوس فالجيب ويدك كترعد، وبقا قلبك كيضرب بالخلعة من أي واحد يشوفك.',
          fr: 'L’argent en poche, mais un sentiment amer d’humiliation et d’inquiétude vous envahit.',
        },
      },
      {
        id: 'c6_take_and_expedite',
        text: {
          ar: 'قبول المبلغ، وضع الختم فوراً وتجاوز المعاينة التقنية المطلوبة',
          ary: 'تاخد الـ300 درهم، تضرب الطابع دغيا وتفوت عليه المعاينة دالتقني',
          fr: 'Accepter les 300 MAD, apposer le tampon d’urgence et contourner l’inspection',
        },
        moralWeight: 'corrupt',
        statChanges: {
          money: 300,
          integrity: -35,
          legalDanger: 25,
          stress: 15,
        },
        delayedEffect: {
          triggerStageId: 8,
          title: {
            ar: 'خلل تقني في رخصة المقاول',
            ary: 'فضيحة فالرخصة لي طبعتي للسي علال',
            fr: 'Anomalie sur le permis validé à la hâte',
          },
          description: {
            ar: 'المشروع الذي ختمت رخصته دون معاينة واجه شكاية من الجيران وبدأ التحقيق في مصدر الموافقة.',
            ary: 'البني لي طبعتيلو بلا معاينة تشكاو منو الجيران واللجنة غاتقلب شكون سينى.',
            fr: 'Le chantier validé sans contrôle subit des plaintes de voisinage, l’audit remonte à votre visa.',
          },
          statChanges: {
            legalDanger: 20,
            stress: 20,
          },
        },
        consequenceText: {
          ar: 'شكرك المقاول بحرارة ومضى.. سقط الحاجز الأخلاقي الأول وفتحت باب التنازلات.',
          ary: 'المقاول فرح وخرج، ولكن نتا بديتي تسقط فالهاوية وبانلك المال الساهل.',
          fr: 'Le premier verrou moral a sauté : l’argent facile fait son entrée insidieuse.',
        },
      },
    ],
  },

  // المرحلة 7: الاعتياد وضغط الزملاء
  {
    id: 7,
    stageNumber: 7,
    title: {
      ar: 'المرحلة 7: الاعتياد وضغط البيئة',
      ary: 'المرحلة 7: التطبيع وكاس أتاي مع بوشعيب',
      fr: 'Étape 7 : L’Engrenage et la Pression des Pairs',
    },
    subtitle: {
      ar: 'كأس شاي بالنعناع مع سي بوشعيب.. وفلسفة "كلشي واكل، كلشي قاضي غرض"',
      ary: 'كاس دأتاي مشحر.. وبوشعيب كيقولك "حنا ماشي ملائكة، عيش اللحظة"',
      fr: 'Verre de thé avec Si Bouchaib et la théorie du "système généralisé"',
    },
    sceneType: 'office',
    yearPeriod: 'السنة الرابعة من الوظيفة',
    dialogues: [
      {
        speaker: 'bouchaib',
        text: {
          ar: 'يا سي ياسين، هل تظن أنك ستصلح العالم بمفردك؟ الإدارة شبكة، وإذا وقفت في وجه التيار سيلفظك.',
          ary: 'أ السي ياسين، واش باغي تصلح الإدارة بوحدك؟ الماء إلى كيجري غطس معاه ولا غايفرشك!',
          fr: 'Yassine, tu crois changer le monde seul ? Si tu résistes au courant, le réseau t’éjectera.',
        },
        mood: 'corrupt',
      },
      {
        speaker: 'yassine',
        text: {
          ar: 'لكن هذا مال حرام يا سي بوشعيب، ويضر المواطنين البسطاء الذين لا يملكون ثمن القهوة!',
          ary: 'ولكن هادشي حرام أسي بوشعيب وكياكل حق الناس الداروش لي ماعندهمش باش يدورو!',
          fr: 'Mais cet argent est illicite Bouchaib ! Il lèse les citoyens démunis sans piston.',
        },
        mood: 'stressed',
      },
      {
        speaker: 'bouchaib',
        text: {
          ar: 'المواطن يريد قضاء غرضه ويدفع برضاه.. هناك سماسرة ينتظرون ملفات عقارية، وفيها نصيب بـ 2000 درهم.',
          ary: 'المواطن باغي غرضو يتقضى وكيحط بخاطرو.. كاين وسيط جايب دوسي دالبني وفيه بركة ديال 2000 درهم.',
          fr: 'L’usager veut son papier et paie volontiers. Un intermédiaire propose un dossier avec 2 000 MAD.',
        },
        mood: 'corrupt',
      },
    ],
    choices: [
      {
        id: 'c7_resist_network',
        text: {
          ar: 'رفض عرض بوشعيب والتحذير من إقحامك في أي شبكة وساطة غير قانونية',
          ary: 'ترفض العرض ديال بوشعيب وتقوليه: "بعد مني ومن بيرويا، أنا بعيد على هادشي"',
          fr: 'Rejeter l’offre de Bouchaib et refuser d’être impliqué dans des arrangements occultes',
        },
        moralWeight: 'honest',
        statChanges: {
          integrity: 15,
          stress: 10,
          legalDanger: -5,
        },
        consequenceText: {
          ar: 'تجنبك بوشعيب ببرود ونعتك بالمعقد، لكن ضميرك ظل نقياً ونومك هادئاً.',
          ary: 'بوشعيب تبدل معاك ومبقاش كيهضر، ولكن بقيتي راجل مكيتباع ما كيتشرى.',
          fr: 'Bouchaib vous évite désormais avec dédain, mais votre conscience reste préservée.',
        },
      },
      {
        id: 'c7_join_network',
        text: {
          ar: 'الموافقة على تمرير الملف العقاري وتقاسم المبلغ (أخذ 1500 درهم)',
          ary: 'تقبل وتغمض عينك على الدوسي وتاخد نصيبك 1500 درهم مع بوشعيب',
          fr: 'Accepter de faciliter le dossier foncier et toucher votre part de 1 500 MAD',
        },
        moralWeight: 'corrupt',
        statChanges: {
          money: 1500,
          integrity: -30,
          legalDanger: 25,
          stress: 15,
        },
        consequenceText: {
          ar: 'اشتريت حاجيات للمنزل، لكن نظرتك لنفسك في المرآة بدأت تتغير وتفقد براءتها.',
          ary: 'شريتي للدار حوايج زوينين، ولكن ملي كتشوف فالمرايا كتحس براسك وليتي واحد خر.',
          fr: 'Le confort matériel s’améliore mais votre regard dans le miroir a perdu sa pureté.',
        },
      },
    ],
  },

  // المرحلة 8: الأزمة المالية الكبرى (مرض الوالدة أو حادث عائلي)
  {
    id: 8,
    stageNumber: 8,
    title: {
      ar: 'المرحلة 8: الابتلاء والأزمة المالية',
      ary: 'المرحلة 8: الامتحان الكبير.. الوالدة فالسبيطار',
      fr: 'Étape 8 : L’Épreuve et la Crise Familiale',
    },
    subtitle: {
      ar: 'عملية جراحية مستعجلة للوالدة تتطلب 6000 درهم في مصحة خاصة',
      ary: 'عملية طارئة لمي فاطمة خاصها 6000 درهم كاش دابا فلكلينيك',
      fr: 'Urgence chirurgicale pour votre mère : 6 000 MAD requis immédiatement',
    },
    sceneType: 'home',
    yearPeriod: 'السنة الخامسة من الوظيفة',
    dialogues: [
      {
        speaker: 'amina',
        text: {
          ar: 'يا ياسين، حالة الوالدة حرجة والمستشفى العمومي أعطانا موعداً بعد ستة أشهر! ماذا سنفعل؟',
          ary: 'ياسين عتق الوالدة حالتها صعيبة وسبيطار الحومة عطاونا رونديفو على 6 شهور! شنو غانديرو؟',
          fr: 'Yassine, l’état de mère est critique et l’hôpital public donne un rendez-vous dans six mois !',
        },
        mood: 'worried',
      },
      {
        speaker: 'yassine',
        text: {
          ar: 'أمي هي كل ما أملك.. لا يمكنني الانتظار ورؤيتها تتألم، لكن الحساب فارغ!',
          ary: 'ميمتي هي عويناتي.. مانقدرش نشوفها كتعذب، ولكن الجيب والكونت خاويين!',
          fr: 'Ma mère est toute ma vie.. Je ne peux pas la voir souffrir, mais les caisses sont vides !',
        },
        mood: 'stressed',
      },
      {
        speaker: 'narrator',
        text: {
          ar: 'يتصل سمسار عقارات معروف ويعرض عليك تسوية ملف تجزئة سكنية مخالفة مقابل 7000 درهم تسلم في يدك فوراً.',
          ary: 'صونا عليك واحد السمسار وعرض عليك يسوي دوسي دتجزئة عشوائية ويعطيك 7000 درهم كاش دابا.',
          fr: 'Un démarcheur influent vous contacte pour régulariser un lotissement illégal contre 7 000 MAD.',
        },
        mood: 'serious',
      },
    ],
    choices: [
      {
        id: 'c8_legal_solidarity',
        text: {
          ar: 'طرق أبواب العائلة، بيع ذهب أمينة برضاها، وطلب سلفة تضامنية من جمعية الموظفين',
          ary: 'تطلب مساعدة خوتك، تبيع أمينة الدمليج ديالها برضاها، ودير سلفة نقابية حلال',
          fr: 'Solliciter la solidarité familiale, vendre les bijoux d’Amina consentante et prêt d’honneur',
        },
        moralWeight: 'honest',
        statChanges: {
          money: -2000,
          integrity: 10,
          familySatisfaction: 15,
          stress: 15,
        },
        consequenceText: {
          ar: 'أجريت العملية بنجاح برزق حلال.. شعرت أمينة بفخر عظيم برجولتك ونزاهتك رغم المعاناة.',
          ary: 'دارت الوالدة العملية وبرات بالرزق الحلال، وأمينة حسات بلي متزوجة راجل حر وأصيل.',
          fr: 'Opération réussie avec des fonds propres et dignes. L’estime d’Amina à votre égard est immense.',
        },
      },
      {
        id: 'c8_take_big_bribe',
        text: {
          ar: 'قبول رشوة السمسار (7000 درهم) وتمرير ملف التجزئة المخالفة لإنقاذ أمك فوراً',
          ary: 'تاخد الـ7000 درهم دالسمسار وتسيني التجزئة العشوائية باش تعتق الوالدة دغيا',
          fr: 'Prendre les 7 000 MAD du démarcheur et approuver le lotissement frauduleux pour sauver mère',
        },
        moralWeight: 'corrupt',
        statChanges: {
          money: 7000,
          integrity: -40,
          legalDanger: 35,
          stress: 20,
        },
        delayedEffect: {
          triggerStageId: 10,
          title: {
            ar: 'ملف التجزئة العشوائية يصل لوزارة الداخلية',
            ary: 'الدوسي دالتجزئة العشوائية طالع للتفتيشية',
            fr: 'Le lotissement illégal remonte au ministère',
          },
          description: {
            ar: 'انهارت أساسات في التجزئة غير القانونية التي وقعتها، مما وضع توقيعك تحت مجهر التفتيش العام.',
            ary: 'ريبو شي حيوط فديك التجزئة العشوائية ولي كوليس كلهم حاطين عينهم على التوقيع ديالك.',
            fr: 'Des malfaçons sur le site frauduleux provoquent une enquête administrative directe sur votre visa.',
          },
          statChanges: {
            legalDanger: 30,
            stress: 25,
          },
        },
        consequenceText: {
          ar: 'تعافت والدتك جسدياً، لكنك بت تشعر أن صحتها شُريت بخراب مبادئك وأمن المواطنين.',
          ary: 'برات الوالدة، ولكن وليتي عايش بالخلعة وكل دقة فالباب كتقول البوليس جاو يدوني.',
          fr: 'Votre mère est guérie, mais vous vivez dans la terreur permanente de la convocation judiciaire.',
        },
      },
    ],
  },

  // المرحلة 9: الشك والتحول النفسي
  {
    id: 9,
    stageNumber: 9,
    title: {
      ar: 'المرحلة 9: الشك والمواجهة المنزلية',
      ary: 'المرحلة 9: الشك والصداع فالدار',
      fr: 'Étape 9 : Soupçons et Confrontation Familiale',
    },
    subtitle: {
      ar: 'أمينة تلاحظ تغير ملامحك وهاتفك الذي لا يتوقف.. وتساؤلات صامتة',
      ary: 'أمينة ردات البال للتغيير، النيميروات كيدوزو فالليل والهدوء تبدل بشك',
      fr: 'Amina perçoit votre fébrilité, appels nocturnes et silence tendu',
    },
    sceneType: 'home',
    yearPeriod: 'السنة السادسة من الوظيفة',
    dialogues: [
      {
        speaker: 'amina',
        text: {
          ar: 'ياسين، لم تعد ذلك الشاب الهادئ الذي تزوجته.. من أين هاته الهدايا والساعات؟ أرجوك قل لي الحقيقة.',
          ary: 'ياسين، مابقيتيش نتا هو داك الولد الدرويش لي تزوجت بيه.. منين هاد الفلوس والكادويات؟ واش واكل الحرام؟',
          fr: 'Yassine, tu as tellement changé.. D’où viennent ces montres et cet argent liquide ? Dis-moi la vérité.',
        },
        mood: 'worried',
      },
      {
        speaker: 'yassine',
        text: {
          ar: 'العمل متعب يا أمينة والمصاريف قاهرة.. ألا ترين أنني أفعل كل هذا من أجل مستقبلكما؟',
          ary: 'الخدمة قاصحة يا أمينة، والوقت صعيبة.. واش باغياني نخليكم كتعانيو فالفقر؟',
          fr: 'Le travail m’épuise Amina ! Ne vois-tu pas que je fais tout pour vous mettre à l’abri du besoin ?',
        },
        mood: 'stressed',
      },
      {
        speaker: 'larbi',
        text: {
          ar: 'سي ياسين، هناك بعض الملاحظات الرقابية وردت على مصلحتنا، احرص على نظافة مسطرتك.',
          ary: 'السي ياسين، راه وصلات هضرة من العمالة بلي كاين شي تساهل فالمقاطعة، رد بالك مزيان.',
          fr: 'Si Yassine, l’inspection régionale fait des remarques sur notre bureau. Soyez irréprochable.',
        },
        mood: 'serious',
      },
    ],
    choices: [
      {
        id: 'c9_repent_and_share',
        text: {
          ar: 'الاعتراف لأمينة بالضغوط والخطأ، والاتفاق معها على التراجع الصارم عن أي شبهة فوراً',
          ary: 'تصارح أمينة بالزلات لي وقعتي فيهم، وتعاهدها ترجع للمسار النقي وتوقف هاد السم',
          fr: 'Avouer les errements à Amina, faire amende honorable et décider d’un arrêt net et définitif',
        },
        moralWeight: 'reform',
        statChanges: {
          integrity: 20,
          familySatisfaction: 15,
          stress: -10,
          legalDanger: -10,
        },
        consequenceText: {
          ar: 'بكت أمينة لكنها ساندتك بقوة قائلة: "خبز وشاي بالحلال ولا قصور بالحرام". استعدت رشدك.',
          ary: 'بكات أمينة وقالتلك: "الخبز والما بالحلال ولا قصر بالحرام". حسيتي بروح جديدة رجعاتلك.',
          fr: 'Amina vous a serré la main avec émotion : "Du pain sec dans l’honneur vaut mieux que l’or illicite".',
        },
      },
      {
        id: 'c9_defensive_anger',
        text: {
          ar: 'الغضب والانفعال: "أنا سيد هذا البيت ولا يحق لأحد محاسبتي على تأمين راحتكم!"',
          ary: 'تغوت وتقلب الطبلة: "أنا لي كنجيب اللقمة وماتحاسبينيش، بغيتي نرجعو للكريدي؟"',
          fr: 'Réagir avec colère et orgueil pour étouffer les interrogations légitimes de votre femme',
        },
        moralWeight: 'corrupt',
        statChanges: {
          integrity: -15,
          familySatisfaction: -30,
          stress: 25,
        },
        consequenceText: {
          ar: 'ساد صمت بارد في بيتك، وانكسرت المودة والسكينة التي بنيتموها لسنوات.',
          ary: 'خيم البرود والدموع فالدار، وتشققات المحبة لي كانت بينكم بدات كتوسع.',
          fr: 'Un silence glacial s’est installé dans le foyer ; la tendresse laisse place à l’éloignement.',
        },
      },
    ],
  },

  // المرحلة 10: الملف الخطير (ذروة القصة والمصير النهائي)
  {
    id: 10,
    stageNumber: 10,
    title: {
      ar: 'المرحلة 10: الملف الخطير والمصير',
      ary: 'المرحلة 10: الدوسي الحامي والقرار الأخير',
      fr: 'Étape 10 : Le Dossier Critique et l’Heure de Vérité',
    },
    subtitle: {
      ar: 'أرض أرملة ضعيفة وأيتام.. ورجل نافذ يعرض 15,000 درهم لإسقاط حقوقهم',
      ary: 'أرض ديال هجالة ويتامى.. وطاشرون صحيح عارض 15 ألف درهم باش طمس الدوسي',
      fr: 'Le terrain d’une veuve et orphelins : 15 000 MAD pour étouffer leurs droits',
    },
    sceneType: 'office',
    yearPeriod: 'المنعرج المصيري النهائي',
    interactiveType: 'stamp_dossier',
    dossier: {
      dossierNumber: 'MQ-2024/999-URGENT',
      citizenName: {
        ar: 'خديجة التازي (أرملة تنوب عن أبنائها القاصرين)',
        ary: 'خديجة التازي (أرملة ويتامى)',
        fr: 'Khadija Tazi (Veuve représentant ses enfants mineurs)',
      },
      requestType: {
        ar: 'تأكيد حق الملكية الإدارية ورفع التعرض الباطل',
        ary: 'شهادة الملكية وحماية أرض اليتامى من السلب',
        fr: 'Confirmation de propriété foncière contre spoliation',
      },
      statusNotes: {
        ar: 'الملف قانوني 100% ومستوفٍ لكل العقود التاريخية والعدلية السليمة.',
        ary: 'الوراق كلهم قانونيين وعدليين ديال بصح، ولكن منعش عقاري نافذ باغي ياخد الأرض.',
        fr: 'Dossier juridiquement parfait, attestant les droits authentiques des héritiers.',
      },
      bribeOffer: 15000,
      bribePrompt: {
        ar: 'وسيط عقاري نافذ يضع حقيبة صغيرة بها 15 ألف درهم كاش: "ارفض هذا الملف واكتب أن الوثائق ناقصة ولك نصيبك فوراً"',
        ary: 'سمسار صحيح حط صاك فيه مليون ونص سنتيم كاش: "عوج هاد الدوسي وقول راهم ناقصين، وفلوسك معاك دابا"',
        fr: 'Un intermédiaire puissant pose 15 000 MAD en cash : "Rejetez le dossier en prétextant des pièces manquantes"',
      },
      standardProcessingTime: {
        ar: 'يتطلب التوقيع النهائي اليوم لتفادي سقوط الأجل القانوني',
        ary: 'خاصو يتوقع اليوم ولا حقوق اليتامى غاتمشي',
        fr: 'Validation requise aujourd’hui pour éviter la prescription',
      },
      applicantBackground: {
        ar: 'الأرملة تبكي في الخارج مع أطفالها، وتقول: "هذه الأرض هي مأوانا الوحيد بعد وفاة والدهم".',
        ary: 'الأرملة كتبكي برا مع وليداتها وتقول: "هاد الطرف دالأرض هو لي خلانا المرحوم باش نسترو ريوسنا".',
        fr: 'La veuve supplie en larmes : "C’est notre seul refuge laissé par leur défunt père".',
      },
    },
    dialogues: [
      {
        speaker: 'yassine',
        text: {
          ar: 'خمسة عشر ألف درهم.. مبلغ يسدد كل ديوني ويؤمن مصاريف سنة كاملة.. لكن على حساب دمعة أرملة وأيتام!',
          ary: 'مليون ونص كاش.. تفك كاع الكريديات وتخليني مريح عام.. ولكن على ظهر يتامى ودعوة مظلوم!',
          fr: '15 000 dirhams.. De quoi régler toutes mes dettes, mais au prix de la spoliation d’une famille démunie !',
        },
        mood: 'stressed',
      },
      {
        speaker: 'bouchaib',
        text: {
          ar: 'يا ياسين، صاحب الشأن رجل واصل ومحمي، إذا عاكسته ستفتح على نفسك أبواب جهنم.. خذ المال واحمِ نفسك.',
          ary: 'السي ياسين، داك المنعش واصل ومحمي مزيان، إلى وقفتي فدربو غايطيروك من البيرو.. خود الفلوس وبعد من الصداع.',
          fr: 'Yassine, ce promoteur a le bras long. Si tu lui résistes, tu risques ta carrière. Prends la somme.',
        },
        mood: 'corrupt',
      },
      {
        speaker: 'inspector',
        text: {
          ar: 'لجنة المفتشية العامة على وصول في جولة تفتيشية مفاجئة لفحص أرشيف ملفات المقاطعة.',
          ary: 'التفتيشية العامة دالداخلية راها كدور فالمصالح وكتقلب فالشوارف والدواسى دالمقاطعة.',
          fr: 'La commission d’inspection générale effectue une visite inopinée des registres municipaux.',
        },
        mood: 'serious',
      },
    ],
    choices: [
      {
        id: 'c10_justice_and_refuse',
        text: {
          ar: 'رفض الرشوة بحزم، توقيع الملف لصالح الأرملة فوراً، وتحدي التهديدات: "الحق يعلو ولا يُعلى عليه"',
          ary: 'ترمي الفلوس فالوجه، تسيني للأرملة واليتامى حقهم، وتواجه التهديد براس عالي',
          fr: 'Refuser l’argent, valider immédiatement les droits de la veuve et défier les pressions dans l’honneur',
        },
        moralWeight: 'honest',
        statChanges: {
          integrity: 35,
          trust: 30,
          stress: 10,
          legalDanger: -25,
        },
        consequenceText: {
          ar: 'انتصرت للحق.. دعت لك الأرملة بدموع الفرح، وشهد موظفو المقاطعة أنك رجل لم يرتشِ.',
          ary: 'نصرتي المظلوم، دعات معاك الأرملة دعوة من القلب، وتاريخ المقاطعة غايبقا عاقل على نزاهتك.',
          fr: 'La justice a triomphé. Les bénédictions de la famille protégée résonnent ; votre dignité est totale.',
        },
      },
      {
        id: 'c10_crush_and_bribe',
        text: {
          ar: 'أخذ الـ15,000 درهم وتزوير الملاحظات لرفض ملف الأرملة لصالح النافذ',
          ary: 'تاخد المليون ونص، وترفض دوسي الأرملة وتبيع ضميرك للمنعش النافذ',
          fr: 'Empocher les 15 000 MAD, falsifier le refus du dossier et écraser les droits des orphelins',
        },
        moralWeight: 'corrupt',
        statChanges: {
          money: 15000,
          integrity: -50,
          legalDanger: 45,
          familySatisfaction: -30,
        },
        consequenceText: {
          ar: 'ملأت جيبك، لكن بكاء الأرملة وأطفالها ظل كابوساً يطاردك في كل لحظة يقظة ومنام.',
          ary: 'عمرتي الجيب بالوسخ، ولكن بكا ديك المرة ووليداتها بقا كابوس كيقجك فكل ليلة.',
          fr: 'Les poches pleines, mais la détresse de cette famille hante désormais vos nuits à tout jamais.',
        },
      },
      {
        id: 'c10_expose_corruption',
        text: {
          ar: 'توثيق محاولة الرشوة والتعاون التام مع المفتش العام لفضح شبكة السمسار وإحقاق الحق',
          ary: 'تشد الدليل وتتعاون مع التفتيشية باش تفضح السمسار وتضمن حق الناس بالقانون',
          fr: 'Signaler la tentative de corruption et collaborer avec l’Inspection Générale pour assainir le service',
        },
        moralWeight: 'reform',
        statChanges: {
          integrity: 30,
          trust: 25,
          stress: 15,
          legalDanger: -30,
        },
        consequenceText: {
          ar: 'تدخلت الرقابة بحزم وتم إنصاف الضعفاء، وتحولت شجاعتك إلى نموذج مشرّف للموظف المغربي الصادق.',
          ary: 'دخلات الرقابة وتفكك اللوبي الفاسد، وحق اليتامى رجع، وتبتي راجل الإدارة النظيف.',
          fr: 'L’Inspection a agi, le réseau corrupteur est démantelé et les spoliés sont rétablis dans leurs droits.',
        },
      },
      {
        id: 'c10_pass_to_bouchaib',
        text: {
          ar: 'المناورة الإدارية: التهرب من التوقيع وإحالة الملف لبوشعيب ليمرره هو (النفاق الإداري)',
          ary: 'تلوح الدوسي لبوشعيب يدوزو هو، باش نتا تبان نقي قدام الناس والسيستيم يقضي غرضو',
          fr: 'Manœuvre hypocrite : refiler le dossier à Bouchaib pour garder les mains propres en façade',
        },
        moralWeight: 'compromise',
        statChanges: {
          integrity: -25,
          trust: -15,
          legalDanger: 15,
          stress: 20,
        },
        consequenceText: {
          ar: 'حفظت مظهرك الخارجي، لكنك صرت شريكاً بالصمت في منظومة الفساد الإداري.',
          ary: 'بينتي راسك معفونش، ولكن فالحقيقة ساهمتي بالسكوت فالظلم وضحكتي على راسك.',
          fr: 'L’apparence est sauve, mais votre complicité passive scelle votre hypocrisie morale.',
        },
      },
    ],
  },
];

export const ENDINGS_DATA: Record<string, Ending> = {
  INTEGRITY: {
    id: 'INTEGRITY',
    title: {
      ar: 'النهاية الأولى: النزاهة وشرف الموظف',
      ary: 'النهاية 1: المعقول والراس المرفوع',
      fr: 'Épilogue 1 : L’Intégrité & la Fierté',
    },
    subtitle: {
      ar: 'عشت كريماً، وخرجت بضمير مرتاح وسمعة كالذهب الخالص',
      ary: 'درويش ولكن حر، راجل ما كيتباع وما كيتشرى',
      fr: 'Modeste mais libre, la droiture comme plus grand héritage',
    },
    description: {
      ar: 'رفض ياسين السقوط في مستنقع الرشوة والمال الحرام رغم قسوة الظروف وضغط المصاريف. قد لا يكون قد جمع ثروات طائلة، لكنه كسب ما هو أثمن: راحة البال، احترام زوجته وأمه، حب المواطنين البسطاء، وضمير لا يعذبه حين يضع رأسه على وسادته.',
      ary: 'ياسين وقف راجل واخا الزمان زير عليه والمصاريف هلكاتو. ما دارش فيلات ولا طوموبيلات فارهة، ولكن دار راس مال كبير ديال الرضى والمعقول. وليداتو وميمتو عايشين بالحلال الصافي، وفالمقاطعة سميتو معروفة بالنزاهة والنية الطيبة.',
      fr: 'Yassine a bravé la précarité et les tentations sans jamais transiger avec son serment. Dépourvu de richesses matérielles indues, il a préservé l’essentiel : la paix intérieure, l’admiration de son épouse et la gratitude des citoyens démunis qu’il a protégés avec bravoure.',
    },
    moralQuote: {
      ar: '"النزاهة ليست غياباً للمغريات، بل هي الشجاعة في رفضها حين تصبح سهلة المنال."',
      ary: '"المعقول ماشي هو تكون بعيد على الطمع، المعقول هو ملي يجيك الطمع بين يديك وتدفعه حيت كتخاف الله."',
      fr: '"L’intégrité n’est pas l’absence de tentation, mais le courage de lui refuser l’accès."',
    },
    ratingBadge: {
      ar: 'مسار الشرف والكرامة',
      ary: 'راجل المعقول',
      fr: 'Parcours d’Honneur',
    },
    verdictTone: 'triumph',
  },

  REFORM: {
    id: 'REFORM',
    title: {
      ar: 'النهاية الثانية: الإصلاح والتوبة',
      ary: 'النهاية 2: الاعتراف بالزلّة والرجوع للطريق',
      fr: 'Épilogue 2 : La Rédemption & la Réforme',
    },
    subtitle: {
      ar: 'الانسان يخطئ.. والرجوع إلى الحق فضيلة وبطولة حقيقية',
      ary: 'الانسان ماشي معصوم، ولكن التراجع والشجاعة كترد الروح',
      fr: 'L’erreur est humaine, le repentir et la vérité sont une victoire',
    },
    description: {
      ar: 'أدرك ياسين في الوقت المناسب خطورة المنحدر الذي كان ينساق إليه. تحلى بالشجاعة فصارح أسرته، ووقف في وجه شبكة السماسرة، وساعد في إرساء العدالة. لم تكن رحلة التكفير عن الهفوات سهلة، لكنها أعادت له ولأسرته الطمأنينة والاحترام الصادق.',
      ary: 'ياسين فاق فوقت الشدة وعرف بلي الفلوس العوجة كترجع على مواليها بالخراب. تشجع، عترف، وعاون التفتيشية والمواطنين باش يرجع الحق لبلاصتو. طريق التوبة مابقاتش ساهلة، ولكن رجعات البركة لدارو ورتاح بالو من كوابيس الشك.',
      fr: 'Yassine a su stopper l’hémorragie morale avant l’irréparable. En affrontant la vérité, en dialoguant avec son épouse et en dénonçant les réseaux occultes, il a reconquis sa dignité. Une rédemption difficile mais admirable.',
    },
    moralQuote: {
      ar: '"الاعتراف بالخطأ وتصحيحه هو أعظم انتصار للإنسان على ضعفه."',
      ary: '"الرجوع للحق ماشي عيب، العيب هو تستمر فالغلط وأنت عارف راسك غادي للهاوية."',
      fr: '"Reconnaître ses égarements et réparer ses torts constitue la plus noble des victoires."',
    },
    ratingBadge: {
      ar: 'مسار التوبة والإصلاح',
      ary: 'توبة شجاعة',
      fr: 'Parcours de Rédemption',
    },
    verdictTone: 'redemption',
  },

  THE_FALL: {
    id: 'THE_FALL',
    title: {
      ar: 'النهاية الثالثة: السقوط وفقدان البوصلة',
      ary: 'النهاية 3: السقوط فالطمع وضياع الهوية',
      fr: 'Épilogue 3 : La Chute et la Déchéance Morale',
    },
    subtitle: {
      ar: 'امتلكت المال وسكنت الشقق.. وخسرت السلام الداخلي والأسرة',
      ary: 'عمرتي الجيوب، ولكن خويتي الدار من البركة وخسرتي كولشي',
      fr: 'Poches pleines d’argent facile mais foyer détruit et âme rongée',
    },
    description: {
      ar: 'استسلم ياسين تدريجياً لدوامة الإكراميات والرشاوى الكبرى بدعوى سد المصاريف ومواكبة متطلبات المظاهر. كثرت أمواله وحسابه البنكي، لكنه بات يعيش في شك دائم. تلاشت المودة مع زوجته أمينة، وابتعد عنه المخلصون، وصار موظفاً متبلداً لا يرى في المواطنين سوى أوراق نقدية.',
      ary: 'ياسين تبع طريق القهوة والتدوار حتى غرق. بدل الطوموبيل وشرا الحوايج الغاليين، ولكن الدار ولات باردة ومفيهاش روح. أمينة بعدات عليه حيت حلفات ماتاكل الحرام، وصحاب المعقول تباعدو منو. بقا بوحدو مع الفلوس والخلعة دالزمان.',
      fr: 'Piégé par l’appât du gain facile, Yassine a sacrifié son serment initial. Malgré une aisance matérielle superficielle, son couple a sombré dans la méfiance, le respect s’est évaporé et l’angoisse d’un contrôle inopiné ne le quitte plus jamais.',
    },
    moralQuote: {
      ar: '"ما نفع المال إذا كسبت العالم وخسرت نفسك وكرامتك؟"',
      ary: '"شنو غادير بالفلوس إلى خسرتي راحتك ودعاو فيك اليتامى والدراوش؟"',
      fr: '"Que sert à l’homme de gagner des richesses s’il en vient à perdre son âme ?"',
    },
    ratingBadge: {
      ar: 'سقوط الضمير',
      ary: 'طمع وخسارة',
      fr: 'Dérive Morale',
    },
    verdictTone: 'tragedy',
  },

  EXPOSURE: {
    id: 'EXPOSURE',
    title: {
      ar: 'النهاية الرابعة: الانكشاف والمساءلة القانونية',
      ary: 'النهاية 4: التحقيق والمسطرة القضائية',
      fr: 'Épilogue 4 : L’Audit & la Sanction Administrative',
    },
    subtitle: {
      ar: 'حبل الكذب والفساد قصير.. الملفات المزورة وصلت لطاولة القضاء',
      ary: 'طالت ولا قصرات، التفتيشية حطات يدها على التلاعبات',
      fr: 'Les irrégularités révélées au grand jour : destitution et poursuites',
    },
    description: {
      ar: 'ظن ياسين أن التواطؤ مع السماسرة وتمرير الملفات المخالفة لن يكتشف أبداً. لكن شكاوى المواطنين المتضررين ولجنة التفتيش الإداري فحصت الأرشيف بدقة. تم توقيفه عن العمل، وتجريده من الوظيفة العمومية، وفتح تحقيق قضائي بشأنه. عاد إلى نقطة الصفر خاسراً وظيفته وثقة أهله.',
      ary: 'كان كيحساب ليه بلي راه مطور والسيستيم غايحميه ديما. ولكن واحد النهار جات المفتشية وحلات الشوارف، وبانت التوقيعات لي مدوزة تحت الطبلة. توقف على الخدمة، مشا الصالير، وتبهدل قدام عائلتو وناسو فالحومة. ندم فاش مابقا ينفع الندم.',
      fr: 'L’illusion de l’impunité s’est écroulée. Une enquête rigoureuse de l’Inspection Générale a mis au jour les signatures frauduleuses et les pots-de-vin. Révocation immédiate, déchéance publique et poursuites judiciaires : le prix de la dérive administrative.',
    },
    moralQuote: {
      ar: '"الفساد كالسير على الجليد الرقيق.. مهما طال مسارك ستغرق حتماً."',
      ary: '"حبل التلاعب قصير، ولي بنا دارو بالحرام كتريب عليه على غفلة."',
      fr: '"La corruption est une dette différée : l’addition finit toujours par être réclamée."',
    },
    ratingBadge: {
      ar: 'العقاب والمحاسبة',
      ary: 'طاحت الصومعة',
      fr: 'Sanction Légale',
    },
    verdictTone: 'downfall',
  },

  ADMINISTRATIVE_HYPOCRISY: {
    id: 'ADMINISTRATIVE_HYPOCRISY',
    title: {
      ar: 'النهاية الخامسة: النفاق الإداري (المسار الرمادي)',
      ary: 'النهاية 5: النفاق الإداري.. وجه مع الناس ووجه فالمخبأ',
      fr: 'Épilogue 5 : L’Hypocrisie Administrative',
    },
    subtitle: {
      ar: 'لم تسرق مباشرة، لكنك صمتّ ومررت الملفات الفاسدة للآخرين',
      ary: 'ما كلتيش بيدك، ولكن خليتي غيرك ياكل وسكتي على المنكر',
      fr: 'Les mains propres en vitrine, mais complice silencieux du rouage',
    },
    description: {
      ar: 'اختار ياسين الطريق الرمادي: لم يقبض الرشوة بيده مباشرة، لكنه ترك بوشعيب والآخرين يعيثون فساداً وتغاضى عن صرخات المواطنين المحتاجين لكي لا يثير المشاكل. حافظ على منصبه وراتبه، لكنه تحول إلى شبح بيروقراطي فاقد للروح والمبدأ، شريك بالسكوت في كل مظلمة تقع في دائرته.',
      ary: 'ياسين فضل يلعبها ذكي: مكيشدش الرشوة فجيبو، ولكن كيدوز الدواسى للصحاب وكيسكت على المنكر باش يبقا راسو بارد. بقا فالبيرو شاد التيقار، ولكن تحول لموظف بارد وميت الضمير، كيغمض عينو على حق الدراوش باش يرضي الرؤساء.',
      fr: 'Yassine a épousé le cynisme bureaucratique. Refusant de toucher l’argent lui-même, il a fermé les yeux sur les exactions de ses collègues pour préserver sa tranquillité de carrière. Une respectabilité feinte qui masque une trahison silencieuse de l’éthique publique.',
    },
    moralQuote: {
      ar: '"الساكت عن الحق شيطان أخرس.. والحياد أمام الظلم هو انحياز للمعتدي."',
      ary: '"لي كيشوف المنكر ويسكت عليه باش يرضي الناس، راه شريك فيه وخا يبان نقي."',
      fr: '"La neutralité face à l’injustice n’est rien d’autre qu’une complicité silencieuse."',
    },
    ratingBadge: {
      ar: 'الموظف الصامت',
      ary: 'نفاق إداري',
      fr: 'Cynisme Bureaucratique',
    },
    verdictTone: 'cynical',
  },
};

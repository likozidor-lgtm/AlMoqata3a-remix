/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CitizenPhotoProps {
  citizenId: string;
  gender?: 'ذكر' | 'أنثى' | 'male' | 'female';
  name?: string;
  photoUrl?: string; // Kept for interface compatibility but user requested illustrated face only
  size?: 'sm' | 'md' | 'lg' | 'idCard';
  className?: string;
  hasWatermark?: boolean;
}

export const CitizenPhoto: React.FC<CitizenPhotoProps> = ({
  citizenId,
  gender,
  name,
  size = 'md',
  className = '',
  hasWatermark = true,
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 rounded-full';
      case 'md':
        return 'w-10 h-10 rounded-full';
      case 'lg':
        return 'w-14 h-14 rounded-xl';
      case 'idCard':
      default:
        return 'w-[44px] h-[58px] sm:w-[48px] sm:h-[64px] rounded-sm';
    }
  };

  const isIdCard = size === 'idCard';

  // Determine gender accurately to prevent any mismatch between name and face drawing
  const isFemale =
    citizenId === 'case_alaa' ||
    citizenId === 'case_doaa' ||
    citizenId === 'case_tazi' ||
    citizenId === 'alaa' ||
    citizenId === 'doaa' ||
    citizenId === 'tazi' ||
    gender === 'أنثى' ||
    gender === 'female' ||
    (name && (name.includes('آلاء') || name.includes('دعاء') || name.includes('خديجة') || name.includes('فاطمة') || name.includes('كنزة') || name.includes('سلمى')));

  const isKnownCitizen =
    citizenId === 'case_mourabit' ||
    citizenId === 'mourabit' ||
    citizenId === 'case_alaa' ||
    citizenId === 'alaa' ||
    citizenId === 'case_bakkari' ||
    citizenId === 'bakkari' ||
    citizenId === 'case_tazi' ||
    citizenId === 'tazi' ||
    citizenId === 'case_sherif' ||
    citizenId === 'sherif' ||
    citizenId === 'case_tarek' ||
    citizenId === 'tarek' ||
    citizenId === 'case_doaa' ||
    citizenId === 'doaa';

  return (
    <div
      className={`relative overflow-hidden bg-slate-200 border border-stone-400 shadow-sm shrink-0 select-none ${getDimensions()} ${className}`}
      title="صورة شمسية بيومترية للبطاقة الوطنية (رسم بيومتري للوجه)"
    >
      {/* 1. MOHAMMED EL MOURABIT (Elderly Retired Man - 70y, cream djellaba, grey beard) */}
      {(citizenId === 'case_mourabit' || citizenId === 'mourabit') && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          {/* Passport Background Gradient */}
          <defs>
            <linearGradient id="mourabitBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="djellabaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#e2d4b7" />
            </linearGradient>
            <linearGradient id="skinMourabit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f6d5b8" />
              <stop offset="100%" stopColor="#dcb394" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#mourabitBg)" />

          {/* Shoulders / Traditional Cream Djellaba */}
          <path d="M5 130 C15 95 30 85 50 85 C70 85 85 95 95 130 Z" fill="url(#djellabaGrad)" stroke="#c5b394" strokeWidth="1" />
          <path d="M45 85 L50 115 L55 85 Z" fill="#bfa07e" opacity="0.6" />
          {/* Djellaba Sfifa / Braid line */}
          <line x1="50" y1="85" x2="50" y2="130" stroke="#b4936f" strokeWidth="1.5" strokeDasharray="2 1" />
          {/* Hood folds behind neck */}
          <path d="M30 85 C32 75 68 75 70 85 C62 90 38 90 30 85 Z" fill="#d9c7a7" />

          {/* Neck */}
          <rect x="42" y="70" width="16" height="18" fill="url(#skinMourabit)" />
          <path d="M44 76 C48 80 52 80 56 76" stroke="#b89173" strokeWidth="1" fill="none" opacity="0.6" />

          {/* Head & Ears */}
          <ellipse cx="28" cy="50" rx="3.5" ry="6" fill="#e5baa0" />
          <ellipse cx="72" cy="50" rx="3.5" ry="6" fill="#e5baa0" />
          <ellipse cx="50" cy="48" rx="22" ry="26" fill="url(#skinMourabit)" />

          {/* White/Gray Hair */}
          <path d="M28 42 C28 22 72 22 72 42 C68 28 32 28 28 42 Z" fill="#e2e8f0" />
          <path d="M27 45 C26 35 32 26 50 25 C68 26 74 35 73 45 C70 32 30 32 27 45 Z" fill="#f8fafc" />

          {/* Forehead Wrinkles */}
          <path d="M36 34 Q50 32 64 34" stroke="#c0967a" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M38 38 Q50 36 62 38" stroke="#c0967a" strokeWidth="0.8" fill="none" opacity="0.7" />

          {/* Eyebrows (Gray/Bushy) */}
          <path d="M33 42 Q40 40 45 42" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M55 42 Q60 40 67 42" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Eyes & Crow's feet */}
          <ellipse cx="39" cy="46" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="39" cy="46" r="1.5" fill="#332418" />
          <ellipse cx="61" cy="46" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="61" cy="46" r="1.5" fill="#332418" />
          <path d="M32 46 L34 47 M68 46 L66 47" stroke="#b89173" strokeWidth="0.8" />

          {/* Nose */}
          <path d="M49 44 L48 55 Q50 58 52 55 L51 44" stroke="#b89173" strokeWidth="1" fill="none" />

          {/* Mustache (White/Gray) & Mouth */}
          <path d="M41 60 Q50 63 59 60 Q50 61 41 60 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
          <line x1="44" y1="64" x2="56" y2="64" stroke="#8c614b" strokeWidth="1" />
          {/* Chin stubble / short beard */}
          <path d="M42 66 C42 74 58 74 58 66 Z" fill="#e2e8f0" opacity="0.8" />
        </svg>
      )}

      {/* 2. ALAA ESSEBTI (Professional Accountant Woman) */}
      {(citizenId === 'case_alaa' || citizenId === 'alaa') && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="alaaBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="hijabGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5ebe0" />
              <stop offset="100%" stopColor="#d5bdaf" />
            </linearGradient>
            <linearGradient id="skinAlaa" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde2d0" />
              <stop offset="100%" stopColor="#f4c2a5" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#alaaBg)" />

          {/* Black Office Blazer */}
          <path d="M5 130 C15 98 30 90 50 90 C70 90 85 98 95 130 Z" fill="#1e293b" />
          {/* Inner Shirt V-neck */}
          <path d="M44 90 L50 110 L56 90 Z" fill="#ffffff" />

          {/* Hijab Drape over Shoulders */}
          <path d="M22 80 C22 105 40 115 50 115 C60 115 78 105 78 80 Z" fill="url(#hijabGrad)" />

          {/* Neck */}
          <rect x="44" y="68" width="12" height="16" fill="url(#skinAlaa)" />

          {/* Hijab framing face */}
          <path d="M22 55 C22 25 78 25 78 55 C78 78 65 85 50 85 C35 85 22 78 22 55 Z" fill="url(#hijabGrad)" stroke="#cbb2a1" strokeWidth="0.8" />

          {/* Face Oval */}
          <ellipse cx="50" cy="53" rx="17" ry="21" fill="url(#skinAlaa)" />

          {/* Hijab Underscarf Band */}
          <path d="M34 39 Q50 36 66 39 Q50 33 34 39 Z" fill="#d6ccc2" />

          {/* Eyebrows (Neat, curved) */}
          <path d="M37 45 Q43 43 47 45" stroke="#4a3528" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M53 45 Q57 43 63 45" stroke="#4a3528" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Eyes (Refined with eyeliner) */}
          <ellipse cx="42" cy="49" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="42" cy="49" r="1.6" fill="#2d1e15" />
          <path d="M38 48 Q42 46 46 48" stroke="#1c1917" strokeWidth="0.8" fill="none" />

          <ellipse cx="58" cy="49" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="58" cy="49" r="1.6" fill="#2d1e15" />
          <path d="M54 48 Q58 46 62 48" stroke="#1c1917" strokeWidth="0.8" fill="none" />

          {/* Soft Nose */}
          <path d="M49 47 L48 55 Q50 57 52 55" stroke="#cf9e84" strokeWidth="0.9" fill="none" />

          {/* Modest Smile / Lip Tint */}
          <path d="M45 63 Q50 66 55 63" stroke="#b9534c" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {/* 3. ALLAL EL BAKKARI (Contractor / Tachron) */}
      {(citizenId === 'case_bakkari' || citizenId === 'bakkari') && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="bakkariBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="skinBakkari" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e2ad8b" />
              <stop offset="100%" stopColor="#c58f6b" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#bakkariBg)" />

          {/* Work Polo Shirt (Dark Navy / Gray) */}
          <path d="M5 130 C15 95 30 85 50 85 C70 85 85 95 95 130 Z" fill="#334155" />
          <path d="M40 85 L47 105 L50 88 L53 105 L60 85 Z" fill="#1e293b" />
          <line x1="50" y1="92" x2="50" y2="115" stroke="#64748b" strokeWidth="1" />

          {/* Thick Strong Neck */}
          <rect x="40" y="68" width="20" height="20" fill="url(#skinBakkari)" />

          {/* Head & Ears */}
          <ellipse cx="26" cy="50" rx="3.5" ry="6" fill="#ba8462" />
          <ellipse cx="74" cy="50" rx="3.5" ry="6" fill="#ba8462" />
          <ellipse cx="50" cy="48" rx="23" ry="26" fill="url(#skinBakkari)" />

          {/* Short Dark Receding Hair */}
          <path d="M26 44 C26 24 74 24 74 44 C68 28 58 29 50 32 C42 29 32 28 26 44 Z" fill="#1e293b" />
          {/* Sideburns */}
          <path d="M26 42 L28 50 L31 46 Z" fill="#1e293b" />
          <path d="M74 42 L72 50 L69 46 Z" fill="#1e293b" />

          {/* Forehead wrinkles */}
          <path d="M37 36 Q50 35 63 36" stroke="#9d6745" strokeWidth="0.8" fill="none" opacity="0.6" />

          {/* Thick Eyebrows */}
          <path d="M33 42 Q40 39 46 42" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M54 42 Q60 39 67 42" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" fill="none" />

          {/* Intense Brown Eyes */}
          <ellipse cx="40" cy="47" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="40" cy="47" r="1.6" fill="#1c1917" />
          <ellipse cx="60" cy="47" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="60" cy="47" r="1.6" fill="#1c1917" />

          {/* Broad Nose */}
          <path d="M49 43 L47 55 Q50 58 53 55 L51 43" stroke="#9d6745" strokeWidth="1.2" fill="none" />

          {/* Heavy Mustache (Moroccan Tachron look) */}
          <path d="M38 61 Q50 64 62 61 Q50 62 38 61 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <line x1="43" y1="66" x2="57" y2="66" stroke="#713f28" strokeWidth="1.2" />

          {/* Square Sturdy Jaw shadow */}
          <path d="M32 58 C35 74 65 74 68 58" stroke="#8a5334" strokeWidth="0.7" fill="none" opacity="0.4" />
        </svg>
      )}

      {/* 4. KHADIJA TAZI (Humble Dignified Widow) */}
      {(citizenId === 'case_tazi' || citizenId === 'tazi') && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="taziBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="taziScarf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0f233a" />
            </linearGradient>
            <linearGradient id="skinTazi" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5cfb5" />
              <stop offset="100%" stopColor="#dbaa8c" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#taziBg)" />

          {/* Simple Dark Wool Coat / Djellaba */}
          <path d="M5 130 C15 98 30 90 50 90 C70 90 85 98 95 130 Z" fill="#334155" />

          {/* Dark Blue Modest Headscarf Folds */}
          <path d="M22 80 C22 108 40 118 50 118 C60 118 78 108 78 80 Z" fill="url(#taziScarf)" />

          {/* Neck */}
          <rect x="44" y="68" width="12" height="16" fill="url(#skinTazi)" />

          {/* Headscarf Frame */}
          <path d="M22 55 C22 25 78 25 78 55 C78 78 65 85 50 85 C35 85 22 78 22 55 Z" fill="url(#taziScarf)" />

          {/* Face Oval */}
          <ellipse cx="50" cy="54" rx="17" ry="21" fill="url(#skinTazi)" />

          {/* Gentle Eyebrows */}
          <path d="M37 46 Q43 44 47 46" stroke="#452c20" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M53 46 Q57 44 63 46" stroke="#452c20" strokeWidth="1.3" strokeLinecap="round" fill="none" />

          {/* Expressive Solemn Eyes (Reflecting life struggle & dignity) */}
          <ellipse cx="42" cy="50" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="42" cy="50" r="1.6" fill="#2d1c13" />
          <ellipse cx="58" cy="50" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="58" cy="50" r="1.6" fill="#2d1c13" />

          {/* Slight tired eye lines */}
          <path d="M39 53 Q42 55 45 53" stroke="#b48366" strokeWidth="0.7" fill="none" opacity="0.6" />
          <path d="M55 53 Q58 55 61 53" stroke="#b48366" strokeWidth="0.7" fill="none" opacity="0.6" />

          {/* Delicate Nose */}
          <path d="M49 47 L48 56 Q50 58 52 56" stroke="#b48366" strokeWidth="0.9" fill="none" />

          {/* Calm, patient mouth */}
          <line x1="45" y1="64" x2="55" y2="64" stroke="#874f38" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}

      {/* 5. CHERIF MANSOURI (Young Security Guard) */}
      {(citizenId === 'case_sherif' || citizenId === 'sherif') && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="sherifBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="skinSherif" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f3c9ab" />
              <stop offset="100%" stopColor="#d59e7e" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#sherifBg)" />

          {/* Navy Blue Security Uniform Shirt */}
          <path d="M5 130 C15 95 30 85 50 85 C70 85 85 95 95 130 Z" fill="#1e3a5f" />
          <path d="M40 85 L46 105 L50 88 L54 105 L60 85 Z" fill="#0f233a" />
          {/* Small security badge on chest */}
          <rect x="25" y="105" width="10" height="6" rx="1" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
          <line x1="50" y1="92" x2="50" y2="120" stroke="#475569" strokeWidth="1" />

          {/* Neck */}
          <rect x="42" y="68" width="16" height="18" fill="url(#skinSherif)" />

          {/* Head & Ears */}
          <ellipse cx="28" cy="50" rx="3.5" ry="6" fill="#c79172" />
          <ellipse cx="72" cy="50" rx="3.5" ry="6" fill="#c79172" />
          <ellipse cx="50" cy="48" rx="21" ry="25" fill="url(#skinSherif)" />

          {/* Short Military Fade Haircut */}
          <path d="M28 40 C28 22 72 22 72 40 C65 26 35 26 28 40 Z" fill="#0f172a" />

          {/* Sharp Eyebrows */}
          <path d="M34 42 Q40 40 46 42" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M54 42 Q60 40 66 42" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Alert Eyes */}
          <ellipse cx="40" cy="47" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="40" cy="47" r="1.6" fill="#1e293b" />
          <ellipse cx="60" cy="47" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="60" cy="47" r="1.6" fill="#1e293b" />

          {/* Straight Nose */}
          <path d="M49 44 L48 55 Q50 57 52 55 L51 44" stroke="#a97658" strokeWidth="1" fill="none" />

          {/* Light trimmed mustache / goatee */}
          <path d="M44 61 Q50 63 56 61" stroke="#0f172a" strokeWidth="1.2" fill="none" />
          <line x1="45" y1="65" x2="55" y2="65" stroke="#78350f" strokeWidth="1" />
        </svg>
      )}

      {/* 6. TAREK EZZARWALI (Young Student Boy) */}
      {(citizenId === 'case_tarek' || citizenId === 'tarek') && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="tarekBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="skinTarek" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fba667" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#tarekBg)" />

          {/* Casual Hoodie / T-Shirt */}
          <path d="M5 130 C15 95 30 88 50 88 C70 88 85 95 95 130 Z" fill="#b91c1c" />
          <path d="M42 88 L50 105 L58 88 Z" fill="#ffffff" />

          {/* Neck */}
          <rect x="43" y="68" width="14" height="20" fill="url(#skinTarek)" />

          {/* Head & Ears */}
          <ellipse cx="29" cy="50" rx="3.5" ry="6" fill="#e6965d" />
          <ellipse cx="71" cy="50" rx="3.5" ry="6" fill="#e6965d" />
          <ellipse cx="50" cy="48" rx="20" ry="24" fill="url(#skinTarek)" />

          {/* Modern Textured Youth Haircut */}
          <path d="M28 42 C26 22 74 22 72 42 C68 28 58 26 50 25 C42 26 32 28 28 42 Z" fill="#1c1917" />
          <path d="M35 25 Q50 18 65 25 Q50 22 35 25 Z" fill="#292524" />

          {/* Eyebrows */}
          <path d="M35 43 Q41 41 46 43" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M54 43 Q59 41 65 43" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Youthful Eyes */}
          <ellipse cx="41" cy="48" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="41" cy="48" r="1.6" fill="#292524" />
          <ellipse cx="59" cy="48" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="59" cy="48" r="1.6" fill="#292524" />

          {/* Nose & Mouth */}
          <path d="M49 46 L48 55 Q50 57 52 55" stroke="#c27745" strokeWidth="1" fill="none" />
          <line x1="45" y1="64" x2="55" y2="64" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}

      {/* 7. DOAA CHAOUI (Gen Z Young Woman) */}
      {(citizenId === 'case_doaa' || citizenId === 'doaa') && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="doaaBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="skinDoaa" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fca5a5" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#doaaBg)" />

          {/* Modern Pastel Shirt */}
          <path d="M5 130 C15 95 30 88 50 88 C70 88 85 95 95 130 Z" fill="#6366f1" />

          {/* Neck */}
          <rect x="44" y="68" width="12" height="18" fill="url(#skinDoaa)" />

          {/* Long Dark Brown Hair Behind Shoulders */}
          <path d="M22 45 C20 85 24 125 30 130 L70 130 C76 125 80 85 78 45 Z" fill="#292524" />

          {/* Head & Face */}
          <ellipse cx="28" cy="52" rx="3" ry="5" fill="#f87171" opacity="0.4" />
          <ellipse cx="72" cy="52" rx="3" ry="5" fill="#f87171" opacity="0.4" />
          <ellipse cx="50" cy="50" rx="19" ry="23" fill="url(#skinDoaa)" />

          {/* Front Hairstyle with bangs/parting */}
          <path d="M25 45 C25 22 75 22 75 45 C68 28 55 26 50 28 C45 26 32 28 25 45 Z" fill="#1c1917" />
          <path d="M25 45 C28 65 32 80 34 85" stroke="#1c1917" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M75 45 C72 65 68 80 66 85" stroke="#1c1917" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Thin styled eyebrows */}
          <path d="M37 45 Q42 43 46 45" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M54 45 Q58 43 63 45" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Eyes with Winged Liner */}
          <ellipse cx="42" cy="49" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="42" cy="49" r="1.6" fill="#451a03" />
          <path d="M38 48 Q42 46 46 48 L48 47" stroke="#000000" strokeWidth="0.8" fill="none" />

          <ellipse cx="58" cy="49" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="58" cy="49" r="1.6" fill="#451a03" />
          <path d="M54 48 Q58 46 62 48 L64 47" stroke="#000000" strokeWidth="0.8" fill="none" />

          {/* Soft Nose */}
          <path d="M49 48 L48 55 Q50 57 52 55" stroke="#fb7185" strokeWidth="0.8" fill="none" />

          {/* Lip Gloss Tint */}
          <path d="M45 63 Q50 66 55 63" stroke="#e11d48" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {/* 8. DYNAMIC FALLBACK: STRICTLY DRAWN MOROCCAN FEMALE PORTRAIT (Never real photo, 100% matched to gender) */}
      {!isKnownCitizen && isFemale && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="fallbackFemaleBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="fallbackScarf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#115e59" />
            </linearGradient>
            <linearGradient id="fallbackSkinF" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fba667" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#fallbackFemaleBg)" />
          <path d="M5 130 C15 95 30 88 50 88 C70 88 85 95 95 130 Z" fill="#0f172a" />
          <path d="M22 80 C22 108 40 118 50 118 C60 118 78 108 78 80 Z" fill="url(#fallbackScarf)" />
          <rect x="44" y="68" width="12" height="16" fill="url(#fallbackSkinF)" />
          <path d="M22 55 C22 25 78 25 78 55 C78 78 65 85 50 85 C35 85 22 78 22 55 Z" fill="url(#fallbackScarf)" />
          <ellipse cx="50" cy="54" rx="17" ry="21" fill="url(#fallbackSkinF)" />
          <path d="M37 46 Q43 44 47 46" stroke="#452c20" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M53 46 Q57 44 63 46" stroke="#452c20" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <ellipse cx="42" cy="50" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="42" cy="50" r="1.6" fill="#2d1c13" />
          <ellipse cx="58" cy="50" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="58" cy="50" r="1.6" fill="#2d1c13" />
          <path d="M49 47 L48 56 Q50 58 52 56" stroke="#b48366" strokeWidth="0.9" fill="none" />
          <path d="M45 64 Q50 67 55 64" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {/* 9. DYNAMIC FALLBACK: STRICTLY DRAWN MOROCCAN MALE PORTRAIT (Never real photo, 100% matched to gender) */}
      {!isKnownCitizen && !isFemale && (
        <svg viewBox="0 0 100 130" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="fallbackMaleBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="fallbackSkinM" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fba667" />
            </linearGradient>
          </defs>
          <rect width="100" height="130" fill="url(#fallbackMaleBg)" />
          <path d="M5 130 C15 95 30 85 50 85 C70 85 85 95 95 130 Z" fill="#1e293b" />
          <path d="M42 85 L50 105 L58 85 Z" fill="#ffffff" />
          <rect x="42" y="68" width="16" height="18" fill="url(#fallbackSkinM)" />
          <ellipse cx="28" cy="50" rx="3.5" ry="6" fill="#c79172" />
          <ellipse cx="72" cy="50" rx="3.5" ry="6" fill="#c79172" />
          <ellipse cx="50" cy="48" rx="21" ry="25" fill="url(#fallbackSkinM)" />
          <path d="M28 40 C28 22 72 22 72 40 C65 26 35 26 28 40 Z" fill="#0f172a" />
          <path d="M34 42 Q40 40 46 42" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M54 42 Q60 40 66 42" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="40" cy="47" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="40" cy="47" r="1.6" fill="#1e293b" />
          <ellipse cx="60" cy="47" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="60" cy="47" r="1.6" fill="#1e293b" />
          <path d="M49 44 L48 55 Q50 57 52 55 L51 44" stroke="#a97658" strokeWidth="1" fill="none" />
          <path d="M44 61 Q50 63 56 61" stroke="#0f172a" strokeWidth="1.2" fill="none" />
          <line x1="45" y1="65" x2="55" y2="65" stroke="#78350f" strokeWidth="1" />
        </svg>
      )}

      {/* Official Corner Security Hologram & Stamp Ring on Photo (Standard CNIE Biometric Feature) */}
      {isIdCard && hasWatermark && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Photo Paper Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />

          {/* Biometric Police Stamp Mark over bottom-right corner */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-emerald-700/60 flex items-center justify-center transform -rotate-12 pointer-events-none">
            <span className="text-[5px] font-black text-emerald-800/70 font-mono tracking-tighter">
              DGSN·مغ
            </span>
          </div>

          {/* Biometric Hologram Micro-strip */}
          <div className="absolute top-1 left-0 w-full h-[1px] bg-cyan-300/40 shadow-[0_0_2px_rgba(34,211,238,0.8)]" />
        </div>
      )}
    </div>
  );
};

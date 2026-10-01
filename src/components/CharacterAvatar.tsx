/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SpeakerKey } from '../types/game';

interface CharacterAvatarProps {
  speaker: SpeakerKey;
  mood?: 'neutral' | 'happy' | 'stressed' | 'worried' | 'serious' | 'corrupt' | 'angry';
  size?: 'sm' | 'md' | 'lg';
  integrity?: number;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  speaker,
  mood = 'neutral',
  size = 'md',
  integrity = 100,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  }[size];

  return (
    <div
      className={`${sizeClasses} relative rounded-full overflow-hidden shrink-0 border-2 shadow-md bg-stone-800 ${
        mood === 'stressed' || mood === 'worried'
          ? 'border-amber-500/80 ring-2 ring-amber-500/20'
          : mood === 'corrupt'
          ? 'border-rose-600/80 ring-2 ring-rose-600/20'
          : mood === 'happy'
          ? 'border-emerald-500/80 ring-2 ring-emerald-500/20'
          : 'border-stone-500/60'
      }`}
    >
      {/* Yassine - Protagonist */}
      {speaker === 'yassine' && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background tone changes if morally compromised */}
          <rect width="100" height="100" fill={integrity < 50 ? '#3f3f46' : '#1e293b'} />
          {/* Torso & Clerk Shirt */}
          <path d="M 20,100 L 20,80 Q 50,70 80,80 L 80,100 Z" fill={integrity < 50 ? '#52525b' : '#0369a1'} />
          <polygon points="40,80 50,96 60,80 50,74" fill="#f8fafc" />
          <polygon points="47,82 53,82 51,95 49,95" fill={integrity < 50 ? '#dc2626' : '#0284c7'} />
          {/* Neck & Head */}
          <rect x="42" y="60" width="16" height="16" fill="#fbcfe8" />
          <ellipse cx="50" cy="50" rx="22" ry="24" fill="#fbcfe8" />
          {/* Hair (Neat Moroccan clerk style) */}
          <path d="M 28,45 C 28,26 40,24 50,24 C 62,24 72,28 72,45 C 68,36 60,33 50,33 C 38,33 32,38 28,45 Z" fill="#18181b" />
          {/* Eyes & Eyebrows depending on mood */}
          {mood === 'stressed' || mood === 'worried' ? (
            <>
              {/* Slanted worried eyebrows */}
              <line x1="36" y1="44" x2="44" y2="47" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="64" y1="44" x2="56" y2="47" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="40" cy="51" r="2.5" fill="#18181b" />
              <circle cx="60" cy="51" r="2.5" fill="#18181b" />
              {/* Wavy nervous mouth */}
              <path d="M 43,65 Q 50,61 57,65" fill="none" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />
              {/* Sweat drop */}
              <circle cx="69" cy="42" r="2" fill="#38bdf8" />
            </>
          ) : mood === 'corrupt' ? (
            <>
              {/* Cynical furrowed brows */}
              <line x1="36" y1="46" x2="45" y2="45" stroke="#18181b" strokeWidth="3" />
              <line x1="64" y1="46" x2="55" y2="45" stroke="#18181b" strokeWidth="3" />
              <circle cx="41" cy="51" r="2.5" fill="#18181b" />
              <circle cx="59" cy="51" r="2.5" fill="#18181b" />
              {/* Asymmetric wry smirk */}
              <path d="M 44,66 Q 52,64 58,61" fill="none" stroke="#450a0a" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Calm, honest, determined look */}
              <line x1="35" y1="45" x2="45" y2="45" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="55" y1="45" x2="65" y2="45" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="40" cy="51" r="3" fill="#18181b" />
              <circle cx="60" cy="51" r="3" fill="#18181b" />
              <path d="M 44,64 Q 50,68 56,64" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      )}

      {/* Amina - Wife */}
      {speaker === 'amina' && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#4c0519" />
          {/* Dress / Caftan shoulders */}
          <path d="M 15,100 L 20,82 Q 50,75 80,82 L 85,100 Z" fill="#9f1239" />
          <polygon points="45,82 55,82 50,96" fill="#fbbf24" />
          {/* Head & Neck */}
          <rect x="43" y="60" width="14" height="15" fill="#fed7aa" />
          <ellipse cx="50" cy="50" rx="20" ry="22" fill="#fed7aa" />
          {/* Elegant Moroccan Scarf / Headwrap */}
          <path d="M 28,48 C 24,30 35,22 50,22 C 65,22 76,30 72,48 C 65,34 55,30 50,30 C 45,30 35,34 28,48 Z" fill="#be123c" />
          {/* Caring, expressive eyes with subtle kohl */}
          <ellipse cx="40" cy="49" rx="3.5" ry="3" fill="#18181b" />
          <ellipse cx="60" cy="49" rx="3.5" ry="3" fill="#18181b" />
          <line x1="35" y1="44" x2="45" y2="44" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          <line x1="55" y1="44" x2="65" y2="44" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          {/* Mouth */}
          <path d="M 44,64 Q 50,67 56,64" fill="none" stroke="#be123c" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {/* Fatima - Loving Mother */}
      {speaker === 'fatima' && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#14532d" />
          {/* Traditional Moroccan white/green Hijab & Djellaba */}
          <path d="M 15,100 L 20,80 Q 50,72 80,80 L 85,100 Z" fill="#15803d" />
          {/* Head wrap enveloping head */}
          <ellipse cx="50" cy="50" rx="28" ry="32" fill="#f8fafc" />
          <ellipse cx="50" cy="52" rx="18" ry="20" fill="#fed7aa" />
          {/* Gentle aged eyes & warm smile */}
          <path d="M 37,50 Q 42,47 47,50" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 53,50 Q 58,47 63,50" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          {/* Smile lines and loving mouth */}
          <path d="M 44,63 Q 50,67 56,63" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          <line x1="33" y1="52" x2="35" y2="55" stroke="#78350f" strokeWidth="1.5" />
          <line x1="67" y1="52" x2="65" y2="55" stroke="#78350f" strokeWidth="1.5" />
        </svg>
      )}

      {/* Si Bouchaib - Cynical Colleague */}
      {speaker === 'bouchaib' && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#365314" />
          <path d="M 15,100 L 20,80 Q 50,74 80,80 L 85,100 Z" fill="#65a30d" />
          <rect x="42" y="60" width="16" height="15" fill="#fde047" opacity="0.3" />
          <ellipse cx="50" cy="50" rx="24" ry="24" fill="#fed7aa" />
          {/* Balding hair on sides */}
          <path d="M 24,52 C 24,36 32,32 36,36 C 36,44 28,48 24,52 Z" fill="#52525b" />
          <path d="M 76,52 C 76,36 68,32 64,36 C 64,44 72,48 76,52 Z" fill="#52525b" />
          {/* Eyeglasses */}
          <circle cx="39" cy="48" r="8" fill="none" stroke="#18181b" strokeWidth="2" />
          <circle cx="61" cy="48" r="8" fill="none" stroke="#18181b" strokeWidth="2" />
          <line x1="47" y1="48" x2="53" y2="48" stroke="#18181b" strokeWidth="2" />
          <circle cx="39" cy="48" r="2.5" fill="#18181b" />
          <circle cx="61" cy="48" r="2.5" fill="#18181b" />
          {/* Thick characteristic Moroccan mustache */}
          <path d="M 36,60 Q 50,56 64,60 Q 50,66 36,60 Z" fill="#27272a" />
          {/* Smirk mouth */}
          <path d="M 44,68 Q 50,71 58,67" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {/* Si Allal - Citizen */}
      {speaker === 'allal' && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#713f12" />
          {/* Traditional Djellaba with hood down */}
          <path d="M 15,100 L 20,80 Q 50,75 80,80 L 85,100 Z" fill="#a16207" />
          <polygon points="44,80 50,92 56,80" fill="#ca8a04" />
          {/* Head & Traditional Moroccan wool cap (Tagiya/Rzza) */}
          <ellipse cx="50" cy="53" rx="22" ry="24" fill="#fcd34d" opacity="0.6" />
          <rect x="30" y="24" width="40" height="18" rx="6" fill="#78350f" />
          {/* Humble, anxious expression */}
          <ellipse cx="40" cy="52" rx="2.5" ry="3" fill="#18181b" />
          <ellipse cx="60" cy="52" rx="2.5" ry="3" fill="#18181b" />
          <line x1="36" y1="46" x2="44" y2="49" stroke="#451a03" strokeWidth="2" />
          <line x1="64" y1="46" x2="56" y2="49" stroke="#451a03" strokeWidth="2" />
          {/* Grey stubble & worried mouth */}
          <path d="M 43,67 Q 50,64 57,67" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {/* Si Larbi - Chief of Department */}
      {speaker === 'larbi' && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#1e1b4b" />
          {/* Formal Suit & Red tie */}
          <path d="M 15,100 L 20,80 Q 50,70 80,80 L 85,100 Z" fill="#312e81" />
          <polygon points="38,80 50,98 62,80" fill="#f8fafc" />
          <polygon points="47,82 53,82 51,96 49,96" fill="#dc2626" />
          <ellipse cx="50" cy="48" rx="22" ry="24" fill="#fed7aa" />
          {/* Salt & Pepper hair */}
          <path d="M 26,42 C 26,24 40,20 50,20 C 60,20 74,24 74,42 C 68,30 58,26 50,26 C 42,26 32,30 26,42 Z" fill="#64748b" />
          {/* Wire rim spectacles */}
          <rect x="33" y="44" width="13" height="10" rx="3" fill="none" stroke="#d97706" strokeWidth="2" />
          <rect x="54" y="44" width="13" height="10" rx="3" fill="none" stroke="#d97706" strokeWidth="2" />
          <line x1="46" y1="49" x2="54" y2="49" stroke="#d97706" strokeWidth="2" />
          <circle cx="39" cy="49" r="2.5" fill="#0f172a" />
          <circle cx="60" cy="49" r="2.5" fill="#0f172a" />
          {/* Stern administrative posture */}
          <line x1="44" y1="65" x2="56" y2="65" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {/* Inspector Benkaddour */}
      {speaker === 'inspector' && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#0f172a" />
          {/* Dark Charcoal suit & inspection badge */}
          <path d="M 15,100 L 20,80 Q 50,70 80,80 L 85,100 Z" fill="#18181b" />
          <polygon points="38,80 50,98 62,80" fill="#f8fafc" />
          <polygon points="48,82 52,82 51,96 49,96" fill="#0284c7" />
          <circle cx="30" cy="85" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="50" cy="48" rx="21" ry="23" fill="#fed7aa" />
          {/* Neat, sharp dark hair */}
          <path d="M 28,42 C 28,26 40,22 50,22 C 60,22 72,26 72,42 C 65,30 55,27 50,27 C 45,27 35,30 28,42 Z" fill="#09090b" />
          {/* Piercing, observant eyes */}
          <line x1="35" y1="44" x2="45" y2="44" stroke="#09090b" strokeWidth="3" />
          <line x1="55" y1="44" x2="65" y2="44" stroke="#09090b" strokeWidth="3" />
          <circle cx="40" cy="49" r="2.5" fill="#09090b" />
          <circle cx="60" cy="49" r="2.5" fill="#09090b" />
          {/* Uncompromising straight mouth */}
          <line x1="43" y1="64" x2="57" y2="64" stroke="#09090b" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {/* Narrator */}
      {speaker === 'narrator' && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#1c1917" />
          {/* Open antique book & fountain pen */}
          <polygon points="20,40 50,50 80,40 80,72 50,80 20,72" fill="#d97706" opacity="0.3" />
          <polygon points="22,42 49,50 49,77 22,70" fill="#fef3c7" />
          <polygon points="78,42 51,50 51,77 78,70" fill="#fef3c7" />
          {/* Feather quill */}
          <path d="M 50,15 Q 65,25 70,45 L 60,40 Z" fill="#38bdf8" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      )}
    </div>
  );
};

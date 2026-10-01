/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AlMoqata3aLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  layout?: 'vertical' | 'horizontal' | 'icon-only';
  className?: string;
  subtext?: string;
}

export const AlMoqata3aLogo: React.FC<AlMoqata3aLogoProps> = ({
  size = 'md',
  showText = true,
  layout = 'vertical',
  className = '',
  subtext,
}) => {
  // Determine pixel dimensions for the icon
  const iconDimensions = {
    xs: { w: 28, h: 28, text: 'text-xs', sub: 'text-[9px]' },
    sm: { w: 38, h: 38, text: 'text-sm', sub: 'text-[10px]' },
    md: { w: 54, h: 54, text: 'text-lg', sub: 'text-xs' },
    lg: { w: 80, h: 80, text: 'text-2xl', sub: 'text-sm' },
    hero: { w: 120, h: 120, text: 'text-4xl', sub: 'text-base' },
  }[size];

  const iconSvg = (
    <svg
      viewBox="0 0 160 160"
      width={iconDimensions.w}
      height={iconDimensions.h}
      className="drop-shadow-lg shrink-0 transition-transform duration-300 hover:scale-105"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer radial glow */}
        <radialGradient id="logoBgGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="70%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        {/* Stamp Blue Gradient */}
        <linearGradient id="stampBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="30%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>

        <linearGradient id="stampCapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>

        <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>

      {/* Badge Base Circle */}
      <rect width="160" height="160" rx="36" fill="url(#logoBgGrad)" stroke="#eab308" strokeWidth="2" />
      <circle cx="80" cy="80" r="72" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

      {/* Shadow under stamp */}
      <ellipse cx="80" cy="118" rx="42" ry="7" fill="#000000" opacity="0.6" />

      {/* 3D Realistic Automatic Stamp (Cachet Automatique) */}
      {/* Lower clear frame / paper contact skirt */}
      <path
        d="M 46 88 L 38 112 C 38 112 60 118 80 118 C 100 118 122 112 122 112 L 114 88 Z"
        fill="#334155"
        opacity="0.4"
        stroke="#475569"
        strokeWidth="1.2"
      />

      {/* Middle red ink reservoir line */}
      <rect x="46" y="84" width="68" height="6" rx="2" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />

      {/* Chrome side slide rods */}
      <rect x="44" y="66" width="4" height="22" rx="1" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.6" />
      <rect x="112" y="66" width="4" height="22" rx="1" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.6" />

      {/* Blue plastic main casing */}
      <rect x="49" y="48" width="62" height="38" rx="7" fill="url(#stampBlueGrad)" stroke="#1e3a8a" strokeWidth="1.2" />

      {/* Textured side grip dots */}
      <g fill="#1e40af" opacity="0.9">
        <circle cx="53" cy="58" r="1.2" />
        <circle cx="53" cy="64" r="1.2" />
        <circle cx="53" cy="70" r="1.2" />
        <circle cx="107" cy="58" r="1.2" />
        <circle cx="107" cy="64" r="1.2" />
        <circle cx="107" cy="70" r="1.2" />
      </g>

      {/* Top curved handle */}
      <path d="M 52 49 C 52 28, 108 28, 108 49 Z" fill="url(#stampCapGrad)" stroke="#1d4ed8" strokeWidth="1.2" />

      {/* Transparent Index Card Window on top handle */}
      <rect x="62" y="32" width="36" height="24" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
      <rect x="63" y="33" width="34" height="22" rx="2" fill="#fefce8" stroke="#facc15" strokeWidth="0.5" />
      
      {/* Label Card Text */}
      <text x="80" y="40" fontFamily="'Cairo', sans-serif" fontSize="4" fontWeight="bold" fill="#047857" textAnchor="middle">
        المغرب
      </text>
      <text x="80" y="47" fontFamily="sans-serif" fontSize="5" fontWeight="900" fill="#b91c1c" textAnchor="middle">
        AlMoqata3a
      </text>
      <text x="80" y="53" fontFamily="'Cairo', sans-serif" fontSize="4" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">
        المقاطعة
      </text>

      {/* Glass shine glare */}
      <path d="M 62 32 L 84 32 L 70 56 L 62 56 Z" fill="url(#glassReflect)" />

      {/* Red side lock switch */}
      <rect x="110" y="58" width="3" height="9" rx="1" fill="#ef4444" />

      {/* Official Placed Stamp Placard / Imprint in front */}
      <g transform="translate(80, 132)">
        <rect x="-56" y="-12" width="112" height="26" rx="5" fill="#090d16" stroke="#eab308" strokeWidth="1.2" />
        <rect x="-54" y="-10" width="108" height="22" rx="4" fill="#18181b" stroke="#ca8a04" strokeWidth="0.6" strokeDasharray="2 1.5" />

        {/* Green star emblems on left & right */}
        <text x="-44" y="3" fontSize="8" fill="#22c55e" textAnchor="middle">★</text>
        <text x="44" y="3" fontSize="8" fill="#22c55e" textAnchor="middle">★</text>

        {/* "ALMOQATA3A" Text */}
        <text
          x="0"
          y="3"
          fontFamily="'Cairo', 'Tajawal', system-ui, sans-serif"
          fontSize="10"
          fontWeight="900"
          fill="url(#goldTextGrad)"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          AlMoqata3a
        </text>
      </g>
    </svg>
  );

  if (layout === 'icon-only' || !showText) {
    return <div className={`inline-flex items-center justify-center ${className}`}>{iconSvg}</div>;
  }

  if (layout === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {iconSvg}
        <div className="flex flex-col">
          <div className={`font-black tracking-tight text-amber-300 font-serif leading-none ${iconDimensions.text}`}>
            AlMoqata3a
          </div>
          <div className={`text-stone-400 font-medium ${iconDimensions.sub}`}>
            {subtext || 'المقاطعة الحضرية'}
          </div>
        </div>
      </div>
    );
  }

  // Vertical layout (default for title/hero)
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {iconSvg}
      <div className="mt-2 flex flex-col items-center">
        <h1 className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-serif ${iconDimensions.text}`}>
          AlMoqata3a
        </h1>
        <p className={`text-stone-300 font-medium ${iconDimensions.sub}`}>
          {subtext || 'المقاطعة الحضرية · محاكاة واقعية'}
        </p>
      </div>
    </div>
  );
};

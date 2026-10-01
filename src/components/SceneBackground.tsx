/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SceneBackgroundProps {
  sceneType: 'study' | 'street' | 'office' | 'waiting_hall' | 'home' | 'investigation';
  stressLevel?: number;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ sceneType, stressLevel = 20 }) => {
  // Vignette darkness increases with stress
  const stressVignetteOpacity = Math.min(0.55, (stressLevel / 100) * 0.55);

  return (
    <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-2xl border border-stone-700/60 bg-stone-900 shadow-inner select-none transition-all duration-700">
      {sceneType === 'street' && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="wallOchre" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="60%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="wallBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          {/* Sky with warm dusk */}
          <rect width="800" height="450" fill="url(#skyGrad)" />
          {/* Distant minaret */}
          <rect x="380" y="80" width="36" height="180" fill="#78350f" opacity="0.6" />
          <polygon points="375,80 398,35 421,80" fill="#78350f" opacity="0.7" />
          <circle cx="398" cy="30" r="4" fill="#fbbf24" opacity="0.8" />
          {/* Traditional Derb Alley Walls */}
          {/* Left Wall */}
          <polygon points="0,110 320,180 320,450 0,450" fill="url(#wallOchre)" />
          {/* Right Wall */}
          <polygon points="800,100 480,180 480,450 800,450" fill="#78350f" />
          {/* Moroccan Horseshoe Arch in the center */}
          <path d="M 320,180 Q 400,130 480,180 L 480,450 L 320,450 Z" fill="#451a03" />
          <path d="M 335,220 C 335,160 465,160 465,220 L 465,450 L 335,450 Z" fill="#291205" />
          {/* Blue plinth on left wall (Moroccan traditional zellij/paint) */}
          <polygon points="0,320 320,340 320,450 0,450" fill="url(#wallBlue)" opacity="0.85" />
          {/* Moroccan Wrought Iron Lantern */}
          <path d="M 230,190 L 250,210 L 250,260 L 230,280 L 210,260 L 210,210 Z" fill="#1c1917" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="230" cy="235" r="8" fill="#fef08a" opacity="0.85" filter="drop-shadow(0 0 10px #f59e0b)" />
          {/* Ground Cobblestones */}
          <polygon points="0,410 320,390 480,390 800,410 800,450 0,450" fill="#3f2e21" />
          <line x1="400" y1="390" x2="400" y2="450" stroke="#261b13" strokeWidth="3" />
        </svg>
      )}

      {sceneType === 'study' && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="lampGlow" cx="65%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          {/* Room wall */}
          <rect width="800" height="450" fill="#292524" />
          <rect width="800" height="450" fill="url(#lampGlow)" />
          {/* Window showing starry Moroccan night */}
          <rect x="100" y="60" width="160" height="200" rx="80" fill="#0f172a" stroke="#78350f" strokeWidth="12" />
          <circle cx="160" cy="110" r="16" fill="#fef08a" opacity="0.8" />
          {/* Wooden Study Desk */}
          <rect x="60" y="270" width="680" height="180" fill="#451a03" />
          <rect x="40" y="260" width="720" height="24" rx="4" fill="#78350f" />
          {/* Books stacks */}
          <rect x="140" y="220" width="80" height="14" fill="#0284c7" rx="2" />
          <rect x="135" y="204" width="90" height="14" fill="#b91c1c" rx="2" />
          <rect x="145" y="190" width="70" height="12" fill="#047857" rx="2" />
          {/* Open textbook with notes */}
          <polygon points="280,240 370,230 460,240 450,262 370,256 290,262" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
          {/* Classic Moroccan mint tea glass */}
          <polygon points="510,215 528,215 524,250 514,250" fill="#15803d" opacity="0.75" stroke="#fbbf24" strokeWidth="1.5" />
          {/* Brass Desk Lamp */}
          <path d="M 620,260 L 620,160 L 560,170" fill="none" stroke="#ca8a04" strokeWidth="6" strokeLinecap="round" />
          <polygon points="540,165 575,150 565,190" fill="#eab308" />
          <circle cx="550" cy="180" r="14" fill="#fef08a" opacity="0.9" />
        </svg>
      )}

      {sceneType === 'office' && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="officeWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="woodDesk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#854d0e" />
              <stop offset="40%" stopColor="#713f12" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          {/* Wall of the Moqata3a */}
          <rect width="800" height="450" fill="url(#officeWall)" />
          {/* Moroccan administrative arched window */}
          <path d="M 280,40 C 280,0 520,0 520,40 L 520,180 L 280,180 Z" fill="#1e293b" stroke="#64748b" strokeWidth="8" />
          {/* Window blinds letting gentle light */}
          {[60, 80, 100, 120, 140, 160].map((y) => (
            <line key={y} x1="288" y1={y} x2="512" y2={y} stroke="#f8fafc" strokeWidth="3" opacity="0.25" />
          ))}
          {/* Wall Clock */}
          <circle cx="160" cy="90" r="32" fill="#f8fafc" stroke="#475569" strokeWidth="6" />
          <line x1="160" y1="90" x2="160" y2="70" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <line x1="160" y1="90" x2="175" y2="90" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="160" cy="90" r="3" fill="#dc2626" />
          {/* Filing Cabinets on the side */}
          <rect x="660" y="80" width="120" height="240" fill="#334155" stroke="#1e293b" strokeWidth="4" />
          <rect x="675" y="110" width="90" height="40" rx="2" fill="#475569" />
          <rect x="710" y="125" width="20" height="8" rx="2" fill="#cbd5e1" />
          <rect x="675" y="170" width="90" height="40" rx="2" fill="#475569" />
          <rect x="710" y="185" width="20" height="8" rx="2" fill="#cbd5e1" />
          <rect x="675" y="230" width="90" height="40" rx="2" fill="#475569" />
          <rect x="710" y="245" width="20" height="8" rx="2" fill="#cbd5e1" />
          {/* The Clerk's Main Wooden Desk */}
          <polygon points="0,260 800,260 800,450 0,450" fill="url(#woodDesk)" />
          <rect x="0" y="250" width="800" height="18" fill="#a16207" />
          {/* Official Moroccan Administrative Chemises (Folders) */}
          <rect x="80" y="270" width="140" height="110" rx="4" fill="#0369a1" stroke="#0284c7" strokeWidth="2" transform="rotate(-6 80 270)" />
          <rect x="85" y="280" width="140" height="110" rx="4" fill="#b91c1c" stroke="#dc2626" strokeWidth="2" transform="rotate(3 85 280)" />
          <rect x="90" y="290" width="140" height="110" rx="4" fill="#15803d" stroke="#16a34a" strokeWidth="2" transform="rotate(-2 90 290)" />
          {/* Inked Administrative Stamp Pad (الطابع والكاشي) */}
          <rect x="600" y="290" width="85" height="55" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <rect x="607" y="297" width="71" height="41" rx="4" fill="#1e3a8a" />
          {/* Wooden Hand Stamp standing */}
          <circle cx="560" cy="315" r="16" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <rect x="554" y="275" width="12" height="40" rx="4" fill="#b45309" />
          <circle cx="560" cy="275" r="8" fill="#d97706" />
          {/* Pen holder */}
          <rect x="480" y="290" width="36" height="50" rx="4" fill="#334155" />
          <line x1="492" y1="290" x2="480" y2="250" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
          <line x1="504" y1="290" x2="515" y2="245" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
        </svg>
      )}

      {sceneType === 'waiting_hall' && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          {/* Administrative Waiting Hall */}
          <rect width="800" height="450" fill="#1e293b" />
          {/* Tiled Floor */}
          <polygon points="0,300 800,300 800,450 0,450" fill="#334155" />
          {[100, 250, 400, 550, 700].map((x) => (
            <line key={x} x1={x} y1="300" x2={x - 80} y2="450" stroke="#1e293b" strokeWidth="3" />
          ))}
          {/* Service Wicket / Counter Window */}
          <rect x="120" y="60" width="560" height="180" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="6" />
          <text x="400" y="105" textAnchor="middle" fill="#38bdf8" fontSize="20" fontWeight="bold">مصلحة تصحيح الإمضاءات ومطابقة الوثائق</text>
          {/* Ticket number electronic display */}
          <rect x="340" y="130" width="120" height="50" rx="6" fill="#000000" stroke="#dc2626" strokeWidth="3" />
          <text x="400" y="165" textAnchor="middle" fill="#ef4444" fontSize="28" fontWeight="bold" fontFamily="monospace">A-042</text>
          {/* Wooden waiting benches */}
          <rect x="80" y="270" width="280" height="18" rx="4" fill="#78350f" />
          <rect x="100" y="288" width="14" height="60" fill="#451a03" />
          <rect x="330" y="288" width="14" height="60" fill="#451a03" />
          <rect x="440" y="270" width="280" height="18" rx="4" fill="#78350f" />
          <rect x="460" y="288" width="14" height="60" fill="#451a03" />
          <rect x="690" y="288" width="14" height="60" fill="#451a03" />
          {/* Bulletin Board with papers */}
          <rect x="20" y="90" width="80" height="120" rx="4" fill="#a16207" stroke="#78350f" strokeWidth="4" />
          <rect x="30" y="105" width="25" height="35" fill="#f8fafc" />
          <rect x="60" y="115" width="30" height="40" fill="#fef08a" />
          <rect x="32" y="150" width="30" height="45" fill="#e2e8f0" />
        </svg>
      )}

      {sceneType === 'home' && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="homeWarmth" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#78350f" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1c1917" stopOpacity="0.85" />
            </radialGradient>
          </defs>
          {/* Wall with subtle Moroccan ochre/warm beige */}
          <rect width="800" height="450" fill="#292524" />
          <rect width="800" height="450" fill="url(#homeWarmth)" />
          {/* Moroccan Salon Cushions (Sedari) along the back */}
          <rect x="40" y="230" width="720" height="90" rx="8" fill="#991b1b" stroke="#b91c1c" strokeWidth="4" />
          {/* Pillows / Mkhayed with geometric Moroccan embroidery */}
          {[80, 220, 360, 500, 640].map((px, idx) => (
            <g key={idx}>
              <rect x={px} y="180" width="85" height="75" rx="6" fill={idx % 2 === 0 ? '#b45309' : '#1e3a8a'} stroke="#fbbf24" strokeWidth="2" />
              <polygon points={`${px + 42},${195} ${px + 65},${217} ${px + 42},${240} ${px + 20},${217}`} fill="#fef08a" opacity="0.6" />
            </g>
          ))}
          {/* Traditional Round Moroccan Brass Table (Tbla) */}
          <ellipse cx="400" cy="360" rx="160" ry="60" fill="#d97706" stroke="#fbbf24" strokeWidth="5" />
          <ellipse cx="400" cy="360" rx="140" ry="50" fill="#b45309" stroke="#92400e" strokeWidth="2" />
          {/* Classic Silver Teapot (البراد المغربي) */}
          <path d="M 380,350 Q 370,320 395,305 L 405,305 Q 430,320 420,350 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="400" cy="305" rx="12" ry="5" fill="#cbd5e1" />
          <circle cx="400" cy="298" r="4" fill="#fbbf24" />
          {/* Spout */}
          <path d="M 418,335 Q 438,320 440,300" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          {/* Handle */}
          <path d="M 382,320 Q 360,335 382,345" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          {/* Mint tea glasses with colored patterns */}
          <rect x="345" y="340" width="16" height="24" rx="2" fill="#15803d" stroke="#fef08a" strokeWidth="1.5" />
          <rect x="445" y="340" width="16" height="24" rx="2" fill="#0284c7" stroke="#fef08a" strokeWidth="1.5" />
        </svg>
      )}

      {sceneType === 'investigation' && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          {/* Austere, high-contrast Inspection Office */}
          <rect width="800" height="450" fill="#090d16" />
          {/* Stark directional light */}
          <polygon points="400,0 200,450 600,450" fill="#f8fafc" opacity="0.08" />
          {/* Wall Inspection Seal / Justice Scales */}
          <circle cx="400" cy="110" r="50" fill="#1e293b" stroke="#334155" strokeWidth="4" />
          {/* Scales of Justice */}
          <line x1="400" y1="80" x2="400" y2="135" stroke="#94a3b8" strokeWidth="3" />
          <line x1="365" y1="92" x2="435" y2="92" stroke="#94a3b8" strokeWidth="3" />
          <path d="M 365,92 L 350,115 L 380,115 Z" fill="#64748b" />
          <path d="M 435,92 L 420,115 L 450,115 Z" fill="#64748b" />
          {/* Large formal mahogany conference desk */}
          <polygon points="40,280 760,280 800,450 0,450" fill="#18181b" />
          <rect x="20" y="270" width="760" height="15" fill="#27272a" />
          {/* Official Audit Dossiers (Red marked) */}
          <rect x="310" y="300" width="180" height="120" rx="4" fill="#450a0a" stroke="#dc2626" strokeWidth="3" />
          <text x="400" y="350" textAnchor="middle" fill="#f87171" fontSize="16" fontWeight="bold">المفتشية العامة</text>
          <text x="400" y="375" textAnchor="middle" fill="#fca5a5" fontSize="13">ملف تدقيق سري</text>
        </svg>
      )}

      {/* Psychological stress vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle, transparent 40%, rgba(15, 23, 42, 0.95) 100%)',
          opacity: stressVignetteOpacity,
        }}
      />
    </div>
  );
};

import React from 'react';

interface LogoProps {
  className?: string;
}

export const OpnLogo: React.FC<LogoProps> = ({ className = 'h-24 w-auto' }) => {
  return (
    <svg
      viewBox="0 0 600 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="O.P.N. Italia Lavoro - Organismo Paritetico Nazionale"
    >
      <defs>
        {/* Soft Italian Flag Swoosh gradient */}
        <linearGradient id="opn-swoosh-grad" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.35" />
        </linearGradient>

        {/* OPN Letter Gradient */}
        <linearGradient id="opn-cyan-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="60%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        {/* Tricolor Bottom Strip */}
        <linearGradient id="opn-tricolor" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="30%" stopColor="#16a34a" />
          <stop offset="35%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>

        <filter id="opn-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#0c4a6e" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Background Stylized Swoosh (Italian Tricolor Arc) */}
      <path
        d="M 120,160 C 100,50 320,10 420,110 C 470,160 410,250 320,250 C 230,250 140,240 120,160 Z"
        fill="url(#opn-swoosh-grad)"
      />

      {/* Big OPN letters with border and drop shadow */}
      <g filter="url(#opn-glow)">
        {/* Letter O */}
        <path
          d="M 28,140 C 28,95 55,62 100,62 C 145,62 172,95 172,140 C 172,185 145,218 100,218 C 55,218 28,185 28,140 Z M 68,140 C 68,168 80,186 100,186 C 120,186 132,168 132,140 C 132,112 120,94 100,94 C 80,94 68,112 68,140 Z"
          fill="url(#opn-cyan-fill)"
          stroke="#0369a1"
          strokeWidth="3.5"
        />
        {/* Dot after O */}
        <rect x="178" y="202" width="13" height="13" fill="url(#opn-cyan-fill)" stroke="#0369a1" strokeWidth="2.5" />

        {/* Letter P */}
        <path
          d="M 205,65 C 235,65 260,70 280,85 C 298,99 308,120 308,145 C 308,170 298,190 280,203 C 265,214 245,218 220,218 L 220,175 C 232,175 244,172 252,166 C 260,160 265,152 265,142 C 265,130 258,118 245,110 C 235,103 222,100 205,100 L 205,65 Z"
          fill="url(#opn-cyan-fill)"
          stroke="#0369a1"
          strokeWidth="3.5"
        />
        <path
          d="M 205,65 L 205,218 L 235,218 L 235,65 Z"
          fill="url(#opn-cyan-fill)"
          stroke="#0369a1"
          strokeWidth="3.5"
        />
        {/* Dot after P */}
        <rect x="314" y="202" width="13" height="13" fill="url(#opn-cyan-fill)" stroke="#0369a1" strokeWidth="2.5" />

        {/* Letter N */}
        <path
          d="M 345,65 L 345,218 L 382,218 L 382,130 C 382,100 400,90 415,105 C 428,117 435,138 435,160 L 435,218 L 472,218 L 472,145 C 472,115 460,88 440,75 C 422,63 400,63 378,74 L 378,65 Z"
          fill="url(#opn-cyan-fill)"
          stroke="#0369a1"
          strokeWidth="3.5"
        />
        {/* Dot after N */}
        <rect x="478" y="202" width="13" height="13" fill="url(#opn-cyan-fill)" stroke="#0369a1" strokeWidth="2.5" />
      </g>

      {/* Side Text: ORGANISMO PARITETICO NAZIONALE */}
      <g fill="#0284c7" fontFamily="sans-serif" fontWeight="700">
        <text x="502" y="160" fontSize="16" letterSpacing="0.05em">
          ORGANISMO
        </text>
        <text x="502" y="180" fontSize="16" letterSpacing="0.05em">
          PARITETICO
        </text>
        <text x="502" y="200" fontSize="16" letterSpacing="0.05em">
          NAZIONALE
        </text>
      </g>

      {/* Bottom Tricolor Ribbon Strip */}
      <rect
        x="10"
        y="250"
        width="580"
        height="22"
        rx="4"
        fill="url(#opn-tricolor)"
        stroke="#cbd5e1"
        strokeWidth="1"
      />

      {/* ITALIA LAVORO in bold dark navy uppercase over tricolor banner */}
      <text
        x="300"
        y="266"
        textAnchor="middle"
        fill="#075985"
        fontSize="17"
        fontFamily="sans-serif"
        fontWeight="900"
        letterSpacing="0.65em"
      >
        ITALIA LAVORO
      </text>
    </svg>
  );
};

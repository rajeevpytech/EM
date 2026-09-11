import React from 'react';

interface LogoProps {
  className?: string;
}

export const AnfosLogo: React.FC<LogoProps> = ({ className = 'h-24 w-auto' }) => {
  return (
    <svg
      viewBox="0 0 540 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ANFOS - Associazione Nazionale Formatori della Sicurezza sul Lavoro"
    >
      <defs>
        {/* Circular text path for top arch */}
        <path
          id="anfos-arch-path"
          d="M 120,165 A 145,145 0 0,1 420,165"
          fill="none"
        />
        {/* Ribbon gradients */}
        <linearGradient id="anfos-ribbon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="anfos-ribbon-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>
        <filter id="anfos-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Curved Upper Text: ASSOCIAZIONE PROFESSIONALE AI SENSI DELLA LEGGE 4/2013 */}
      <text
        fill="#1e293b"
        fontSize="13"
        fontFamily="sans-serif"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        <textPath href="#anfos-arch-path" startOffset="50%" textAnchor="middle">
          ASSOCIAZIONE PROFESSIONALE AI SENSI DELLA LEGGE 4/2013
        </textPath>
      </text>

      {/* Main Green Circle */}
      <g filter="url(#anfos-shadow)">
        <circle cx="270" cy="115" r="54" fill="#15803d" />
      </g>

      {/* Inner White Styled Text ANFOS */}
      <g fill="#ffffff" fontFamily="'Impact', 'Arial Black', sans-serif">
        {/* A */}
        <text x="230" y="132" fontSize="42" fontWeight="900" textAnchor="middle" letterSpacing="-2">
          A
        </text>
        {/* N */}
        <text x="250" y="132" fontSize="42" fontWeight="900" textAnchor="middle" letterSpacing="-2">
          N
        </text>
        {/* F */}
        <text x="270" y="132" fontSize="42" fontWeight="900" textAnchor="middle" letterSpacing="-2">
          F
        </text>
        {/* O */}
        <text x="290" y="132" fontSize="42" fontWeight="900" textAnchor="middle" letterSpacing="-2">
          O
        </text>
        {/* S */}
        <text x="310" y="132" fontSize="42" fontWeight="900" textAnchor="middle" letterSpacing="-2">
          S
        </text>
      </g>

      {/* Subtitle text below circle */}
      <text
        x="270"
        y="185"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="12.5"
        fontFamily="sans-serif"
        fontWeight="800"
        letterSpacing="-0.01em"
      >
        Associazione Nazionale Formatori
      </text>
      <text
        x="270"
        y="201"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="12.5"
        fontFamily="sans-serif"
        fontWeight="800"
        letterSpacing="-0.01em"
      >
        della Sicurezza sul Lavoro
      </text>

      {/* Green Ribbon - Centro di Formazione & Sede Territoriale Periferica */}
      {/* Swallowtail Left Wings */}
      <polygon
        points="105,218 150,202 150,248 105,248 122,233"
        fill="#15803d"
      />
      {/* Swallowtail Right Wings */}
      <polygon
        points="435,218 390,202 390,248 435,248 418,233"
        fill="#15803d"
      />

      {/* Ribbon Fold Shadows */}
      <polygon points="150,236 170,236 170,246" fill="url(#anfos-ribbon-dark)" />
      <polygon points="390,236 370,236 370,246" fill="url(#anfos-ribbon-dark)" />

      {/* Top Banner: CENTRO DI FORMAZIONE */}
      <g filter="url(#anfos-shadow)">
        <rect
          x="165"
          y="200"
          width="210"
          height="25"
          rx="2"
          fill="#ffffff"
          stroke="#15803d"
          strokeWidth="1.5"
        />
        <text
          x="270"
          y="217"
          textAnchor="middle"
          fill="#15803d"
          fontSize="11.5"
          fontFamily="sans-serif"
          fontWeight="900"
          letterSpacing="0.08em"
        >
          CENTRO DI FORMAZIONE
        </text>
      </g>

      {/* Bottom Main Green Banner: SEDE TERRITORIALE PERIFERICA */}
      <g filter="url(#anfos-shadow)">
        <rect
          x="150"
          y="223"
          width="240"
          height="38"
          rx="3"
          fill="url(#anfos-ribbon-grad)"
        />
        {/* Bevel highlight */}
        <line x1="151" y1="224" x2="389" y2="224" stroke="#86efac" strokeWidth="1.5" opacity="0.8" />
        <text
          x="270"
          y="239"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="10.5"
          fontFamily="sans-serif"
          fontWeight="700"
          letterSpacing="0.1em"
        >
          SEDE TERRITORIALE
        </text>
        <text
          x="270"
          y="254"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="15"
          fontFamily="sans-serif"
          fontWeight="900"
          letterSpacing="0.12em"
        >
          PERIFERICA
        </text>
      </g>

      {/* Bottom Base Line */}
      <line x1="75" y1="285" x2="235" y2="285" stroke="#16a34a" strokeWidth="1.5" />
    </svg>
  );
};

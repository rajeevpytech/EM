import React from 'react';

interface LogoProps {
  className?: string;
}

export const DanLogo: React.FC<LogoProps> = ({ className = 'h-24 w-auto' }) => {
  return (
    <svg
      viewBox="0 0 520 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EDAN Partner - International Safety & First Aid Partner"
    >
      {/* Red Square Emblem (left) */}
      <g>
        <rect x="15" y="15" width="135" height="135" fill="#dc2626" rx="2" />

        {/* Diagonal White Band */}
        <polygon points="15,150 15,95 150,15 150,70" fill="#ffffff" />

        {/* White Cross in top right triangle */}
        <path
          d="M 95,35 L 110,35 L 110,20 L 122,20 L 122,35 L 137,35 L 137,47 L 122,47 L 122,62 L 110,62 L 110,47 L 95,47 Z"
          fill="#ffffff"
        />

        {/* White "E" in bottom left triangle */}
        <text
          x="32"
          y="135"
          fill="#ffffff"
          fontSize="48"
          fontFamily="'Arial Black', 'Helvetica', sans-serif"
          fontWeight="900"
        >
          E
        </text>
      </g>

      {/* Red "DAN" bold letters */}
      <g fill="#dc2626" fontFamily="'Arial Black', 'Helvetica', sans-serif" fontWeight="900">
        {/* D */}
        <path d="M 175,15 L 235,15 C 275,15 295,42 295,82.5 C 295,123 275,150 235,150 L 175,150 Z M 215,50 L 215,115 L 232,115 C 252,115 260,103 260,82.5 C 260,62 252,50 232,50 Z" />

        {/* A */}
        <path d="M 335,15 L 385,15 L 430,150 L 388,150 L 378,118 L 342,118 L 332,150 L 290,150 Z M 350,90 L 370,90 L 360,54 Z" />

        {/* N */}
        <path d="M 445,15 L 478,15 L 530,105 L 530,15 L 565,15 L 565,150 L 532,150 L 480,60 L 480,150 L 445,150 Z" />
      </g>

      {/* Registered trademark symbol ® */}
      <circle cx="585" cy="30" r="11" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <text
        x="585"
        y="34"
        textAnchor="middle"
        fill="#dc2626"
        fontSize="12"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        R
      </text>

      {/* Solid Black Dividing Line */}
      <line x1="15" y1="168" x2="585" y2="168" stroke="#000000" strokeWidth="4" />

      {/* Clean Black Text "Partner" */}
      <text
        x="15"
        y="218"
        fill="#000000"
        fontSize="46"
        fontFamily="'Helvetica Neue', 'Arial', sans-serif"
        fontWeight="500"
        letterSpacing="-0.02em"
      >
        Partner
      </text>
    </svg>
  );
};

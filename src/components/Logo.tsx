import React from 'react';
import { getStoredImages } from '../utils/imageStore';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  customLogoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
  customLogoUrl,
}) => {
  const isDark = variant === 'dark'; // dark logo on light bg
  const mainColor = isDark ? '#000000' : '#FFFFFF';
  const subtitleColor = isDark ? '#1F2937' : '#E2E8F0';

  // If admin has set a custom image URL or there's a stored one, use that image
  const effectiveLogoUrl = customLogoUrl || getStoredImages().headerLogoUrl;

  const dimensions = {
    sm: { height: 48, width: 175 },
    md: { height: 62, width: 230 },
    lg: { height: 76, width: 285 },
  }[size];

  if (effectiveLogoUrl) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={effectiveLogoUrl}
          alt="E.M. Safety Logo"
          style={{ height: `${dimensions.height}px`, width: 'auto' }}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center select-none transition-transform ${className}`}
      style={{ height: `${dimensions.height}px` }}
    >
      <svg
        viewBox="0 0 460 180"
        style={{ height: `${dimensions.height}px`, width: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
      >
        {/* Top Part: E and M */}
        <g stroke={mainColor} strokeWidth="5.5" strokeLinecap="square">
          {/* E: 3 parallel horizontal lines */}
          <line x1="12" y1="22" x2="68" y2="22" />
          <line x1="12" y1="52" x2="68" y2="52" />
          <line x1="12" y1="82" x2="68" y2="82" />

          {/* M: sharp architectural lines with central V touching base */}
          <polyline
            points="84,84 84,20 120,74 156,20 156,84"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
          />
        </g>

        {/* Top Right: Consulenze e Formazioni */}
        {showSubtitle && (
          <text
            x="176"
            y="64"
            fill={subtitleColor}
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="26"
            fontWeight="400"
            letterSpacing="0.01em"
          >
            Consulenze e Formazioni
          </text>
        )}

        {/* Bottom Part: "Safety" stylized with precise cut letterforms */}
        <g
          stroke={mainColor}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* S */}
          <path d="M 36,112 C 26,106 12,113 12,125 C 12,137 36,137 36,149 C 36,160 20,165 12,157" />
          {/* a */}
          <circle cx="62" cy="138" r="14" />
          <line x1="76" y1="124" x2="76" y2="152" />
          {/* f */}
          <path d="M 102,110 C 96,110 92,114 92,122 L 92,152" />
          <line x1="84" y1="128" x2="100" y2="128" />
          {/* e */}
          <path d="M 116,138 L 140,138 C 140,126 129,124 128,124 C 116,124 116,134 116,141 C 116,150 126,153 138,151" />
          {/* t */}
          <line x1="156" y1="114" x2="156" y2="150" />
          <path d="M 156,150 C 156,153 159,153 164,153" />
          <line x1="148" y1="126" x2="164" y2="126" />
          {/* y */}
          <polyline points="178,126 189,151 200,126" />
          <line x1="189" y1="151" x2="182" y2="166" />
        </g>
      </svg>
    </div>
  );
};

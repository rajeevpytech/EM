import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GsapBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);
  const meshRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Fluid, ultra-smooth floating motion on Ambient Corporate Glow Orbs
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=55',
          y: '-=35',
          scale: 1.12,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=45',
          y: '+=40',
          scale: 0.94,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: '+=35',
          y: '+=30',
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3,
        });
      }

      if (orb4Ref.current) {
        gsap.to(orb4Ref.current, {
          x: '-=30',
          y: '-=25',
          scale: 1.08,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
      }

      // 2. Blueprint Safety Nodes & Connecting Geometry pulse & drift
      if (nodesRef.current) {
        const circles = nodesRef.current.querySelectorAll('.gsap-node');
        const lines = nodesRef.current.querySelectorAll('.gsap-line');
        const halos = nodesRef.current.querySelectorAll('.gsap-halo');

        circles.forEach((circle, i) => {
          gsap.to(circle, {
            y: i % 2 === 0 ? '-=12' : '+=14',
            x: i % 3 === 0 ? '+=10' : '-=10',
            duration: 5 + (i % 3) * 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.4,
          });
        });

        halos.forEach((halo, i) => {
          gsap.to(halo, {
            scale: 1.4,
            opacity: 0.1,
            transformOrigin: 'center center',
            duration: 3 + (i % 2) * 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5,
          });
        });

        lines.forEach((line, i) => {
          gsap.to(line, {
            strokeDashoffset: '-=48',
            duration: 12 + i * 2,
            repeat: -1,
            ease: 'none',
          });
        });
      }

      // 3. Ambient slow rotation of central geometric safety polygon
      const poly = containerRef.current?.querySelector('.gsap-polygon');
      if (poly) {
        gsap.to(poly, {
          rotation: 360,
          transformOrigin: 'center center',
          duration: 80,
          repeat: -1,
          ease: 'none',
        });
      }

      // 4. Subtle, high-precision mouse parallax effect (calibrated to be non-distracting)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const normX = (clientX / window.innerWidth - 0.5) * 24;
        const normY = (clientY / window.innerHeight - 0.5) * 24;

        if (meshRef.current) {
          gsap.to(meshRef.current, {
            x: normX * 0.4,
            y: normY * 0.4,
            duration: 2,
            ease: 'power2.out',
          });
        }

        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            x: normX * 0.9,
            y: normY * 0.9,
            duration: 2.4,
            ease: 'power2.out',
          });
        }

        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, {
            x: -normX * 0.7,
            y: -normY * 0.7,
            duration: 2.8,
            ease: 'power2.out',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
    >
      {/* Ambient Gradient Mesh Orbs in E.M. Safety Corporate Palette */}
      {/* Orb 1: Forest Green (#1B4332) */}
      <div
        ref={orb1Ref}
        className="absolute -top-24 left-1/4 w-[420px] sm:w-[680px] h-[420px] sm:h-[680px] rounded-full bg-gradient-to-br from-[#1B4332]/10 via-[#2D6A4F]/6 to-transparent blur-3xl opacity-80 transform-gpu"
      />

      {/* Orb 2: Midnight Slate (#0B192C) */}
      <div
        ref={orb2Ref}
        className="absolute top-1/4 -right-24 w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] rounded-full bg-gradient-to-bl from-[#0B192C]/7 via-[#1B4332]/5 to-transparent blur-3xl opacity-75 transform-gpu"
      />

      {/* Orb 3: Sage Emerald (#40916C) */}
      <div
        ref={orb3Ref}
        className="absolute bottom-6 left-10 w-[350px] sm:w-[520px] h-[350px] sm:h-[520px] rounded-full bg-gradient-to-tr from-[#40916C]/8 via-[#52B788]/4 to-transparent blur-3xl opacity-70 transform-gpu"
      />

      {/* Orb 4: Subtle Warm Gold Shimmer (#C5A880) */}
      <div
        ref={orb4Ref}
        className="absolute top-1/2 left-1/3 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#C5A880]/5 to-transparent blur-3xl opacity-50 transform-gpu"
      />

      {/* GSAP SVG Safety Architecture Geometry */}
      <svg
        ref={meshRef}
        viewBox="0 0 1400 800"
        className="absolute inset-0 w-full h-full opacity-40 sm:opacity-55"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gsapCorporateLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B4332" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#0B192C" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.06" />
          </linearGradient>

          <pattern id="gsapSubtleCorporateGrid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#1B4332"
              strokeWidth="0.5"
              strokeOpacity="0.04"
            />
            {/* Coordinate micro-cross at grid intersections */}
            <circle cx="64" cy="0" r="0.75" fill="#0B192C" fillOpacity="0.08" />
          </pattern>
        </defs>

        {/* Technical Blueprint Grid Base */}
        <rect width="100%" height="100%" fill="url(#gsapSubtleCorporateGrid)" />

        {/* Rotating Geometric Safety Shield / Hexagon Mesh */}
        <g className="gsap-polygon" opacity="0.35">
          <polygon
            points="700,100 880,200 880,400 700,500 520,400 520,200"
            fill="none"
            stroke="url(#gsapCorporateLineGrad)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <polygon
            points="700,150 830,225 830,375 700,450 570,375 570,225"
            fill="none"
            stroke="#1B4332"
            strokeWidth="0.75"
            strokeOpacity="0.12"
          />
          <circle
            cx="700"
            cy="300"
            r="160"
            fill="none"
            stroke="#0B192C"
            strokeWidth="0.6"
            strokeOpacity="0.08"
            strokeDasharray="4 8"
          />
        </g>

        {/* Floating Node Mesh (connected safety compliance points) */}
        <g ref={nodesRef}>
          {/* Connecting dashed vector lines */}
          <line
            x1="220"
            y1="180"
            x2="450"
            y2="240"
            stroke="#1B4332"
            strokeWidth="1"
            strokeOpacity="0.18"
            strokeDasharray="4 4"
            className="gsap-line"
          />
          <line
            x1="450"
            y1="240"
            x2="700"
            y2="180"
            stroke="#1B4332"
            strokeWidth="1"
            strokeOpacity="0.18"
            strokeDasharray="4 4"
            className="gsap-line"
          />
          <line
            x1="700"
            y1="180"
            x2="950"
            y2="270"
            stroke="#2D6A4F"
            strokeWidth="1"
            strokeOpacity="0.18"
            strokeDasharray="4 4"
            className="gsap-line"
          />
          <line
            x1="950"
            y1="270"
            x2="1180"
            y2="200"
            stroke="#0B192C"
            strokeWidth="1"
            strokeOpacity="0.16"
            strokeDasharray="4 4"
            className="gsap-line"
          />

          {/* Node 1: D.Lgs. 81/08 */}
          <g>
            <circle
              cx="220"
              cy="180"
              r="12"
              fill="none"
              stroke="#1B4332"
              strokeWidth="0.8"
              strokeOpacity="0.2"
              className="gsap-halo"
            />
            <circle
              cx="220"
              cy="180"
              r="4.5"
              fill="#1B4332"
              fillOpacity="0.4"
              stroke="#1B4332"
              strokeWidth="1.5"
              className="gsap-node"
            />
            <text
              x="220"
              y="204"
              textAnchor="middle"
              className="fill-[#1B4332]/40 text-[9px] font-mono tracking-widest uppercase select-none"
            >
              81/08
            </text>
          </g>

          {/* Node 2: DVR */}
          <g>
            <circle
              cx="450"
              cy="240"
              r="14"
              fill="none"
              stroke="#0B192C"
              strokeWidth="0.8"
              strokeOpacity="0.18"
              className="gsap-halo"
            />
            <circle
              cx="450"
              cy="240"
              r="5"
              fill="#0B192C"
              fillOpacity="0.35"
              stroke="#1B4332"
              strokeWidth="1.5"
              className="gsap-node"
            />
            <text
              x="450"
              y="266"
              textAnchor="middle"
              className="fill-[#0B192C]/40 text-[9px] font-mono tracking-widest uppercase select-none"
            >
              DVR
            </text>
          </g>

          {/* Node 3: ISO 45001 */}
          <g>
            <circle
              cx="700"
              cy="180"
              r="16"
              fill="none"
              stroke="#1B4332"
              strokeWidth="1"
              strokeOpacity="0.22"
              className="gsap-halo"
            />
            <circle
              cx="700"
              cy="180"
              r="6"
              fill="#1B4332"
              fillOpacity="0.45"
              stroke="#0B192C"
              strokeWidth="1.5"
              className="gsap-node"
            />
            <text
              x="700"
              y="162"
              textAnchor="middle"
              className="fill-[#1B4332]/50 text-[9px] font-mono tracking-widest uppercase select-none font-bold"
            >
              ISO 45001
            </text>
          </g>

          {/* Node 4: SGI */}
          <g>
            <circle
              cx="950"
              cy="270"
              r="12"
              fill="none"
              stroke="#2D6A4F"
              strokeWidth="0.8"
              strokeOpacity="0.2"
              className="gsap-halo"
            />
            <circle
              cx="950"
              cy="270"
              r="4.5"
              fill="#2D6A4F"
              fillOpacity="0.4"
              stroke="#2D6A4F"
              strokeWidth="1.5"
              className="gsap-node"
            />
            <text
              x="950"
              y="294"
              textAnchor="middle"
              className="fill-[#2D6A4F]/40 text-[9px] font-mono tracking-widest uppercase select-none"
            >
              SGI
            </text>
          </g>

          {/* Node 5: RSPP */}
          <g>
            <circle
              cx="1180"
              cy="200"
              r="14"
              fill="none"
              stroke="#0B192C"
              strokeWidth="0.8"
              strokeOpacity="0.18"
              className="gsap-halo"
            />
            <circle
              cx="1180"
              cy="200"
              r="5.5"
              fill="#0B192C"
              fillOpacity="0.35"
              stroke="#1B4332"
              strokeWidth="1.5"
              className="gsap-node"
            />
            <text
              x="1180"
              y="226"
              textAnchor="middle"
              className="fill-[#0B192C]/40 text-[9px] font-mono tracking-widest uppercase select-none"
            >
              RSPP
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

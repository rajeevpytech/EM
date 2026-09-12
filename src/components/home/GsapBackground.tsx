import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GsapBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const meshRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Only run GSAP animations in browser environment
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Fluid floating motion on Ambient Glow Orbs
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=60',
          y: '-=40',
          scale: 1.15,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=50',
          y: '+=45',
          scale: 0.9,
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: '+=40',
          y: '+=35',
          duration: 8,
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

        circles.forEach((circle, i) => {
          gsap.to(circle, {
            y: i % 2 === 0 ? '-=16' : '+=18',
            x: i % 3 === 0 ? '+=12' : '-=14',
            opacity: 0.85,
            duration: 4 + (i % 3) * 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: i * 0.3,
          });
        });

        lines.forEach((line, i) => {
          gsap.to(line, {
            strokeDashoffset: '-=40',
            duration: 8 + i * 2,
            repeat: -1,
            ease: 'none',
          });
        });
      }

      // 3. Ambient rotation of central geometric safety polygon
      const poly = containerRef.current?.querySelector('.gsap-polygon');
      if (poly) {
        gsap.to(poly, {
          rotation: 360,
          transformOrigin: 'center center',
          duration: 45,
          repeat: -1,
          ease: 'none',
        });
      }

      // 4. Subtle mouse parallax effect for depth
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const normX = (clientX / window.innerWidth - 0.5) * 30;
        const normY = (clientY / window.innerHeight - 0.5) * 30;

        if (meshRef.current) {
          gsap.to(meshRef.current, {
            x: normX * 0.6,
            y: normY * 0.6,
            duration: 2,
            ease: 'power2.out',
          });
        }

        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            x: normX * 1.2,
            y: normY * 1.2,
            duration: 2.5,
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
      className="absolute inset-0 overflow-hidden pointer-events-none -z-0 select-none"
    >
      {/* Ambient Gradient Mesh Orbs */}
      <div
        ref={orb1Ref}
        className="absolute -top-24 left-1/4 w-[420px] sm:w-[650px] h-[420px] sm:h-[650px] rounded-full bg-gradient-to-br from-blue-200/30 via-indigo-100/20 to-transparent blur-3xl opacity-75 transform-gpu"
      />
      <div
        ref={orb2Ref}
        className="absolute top-1/3 -right-24 w-[380px] sm:w-[580px] h-[380px] sm:h-[580px] rounded-full bg-gradient-to-bl from-sky-200/25 via-blue-100/15 to-transparent blur-3xl opacity-60 transform-gpu"
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-10 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tr from-slate-200/30 via-blue-50/20 to-transparent blur-3xl opacity-60 transform-gpu"
      />

      {/* GSAP SVG Safety Architecture Geometry */}
      <svg
        ref={meshRef}
        viewBox="0 0 1400 800"
        className="absolute inset-0 w-full h-full opacity-40 sm:opacity-50"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gsapLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A66C2" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#0B192C" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0A66C2" stopOpacity="0.05" />
          </linearGradient>
          <pattern id="gsapSubtleGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#0A66C2"
              strokeWidth="0.5"
              strokeOpacity="0.05"
            />
          </pattern>
        </defs>

        {/* Technical Blueprint Grid Base */}
        <rect width="100%" height="100%" fill="url(#gsapSubtleGrid)" />

        {/* Rotating Geometric Safety Shield Mesh */}
        <g className="gsap-polygon" opacity="0.4">
          <polygon
            points="700,120 860,210 860,390 700,480 540,390 540,210"
            fill="none"
            stroke="url(#gsapLineGrad)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <polygon
            points="700,160 820,230 820,370 700,440 580,370 580,230"
            fill="none"
            stroke="#0A66C2"
            strokeWidth="0.75"
            strokeOpacity="0.15"
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
            stroke="#0A66C2"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
            className="gsap-line"
          />
          <line
            x1="450"
            y1="240"
            x2="700"
            y2="180"
            stroke="#0A66C2"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
            className="gsap-line"
          />
          <line
            x1="700"
            y1="180"
            x2="950"
            y2="270"
            stroke="#0A66C2"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
            className="gsap-line"
          />
          <line
            x1="950"
            y1="270"
            x2="1180"
            y2="200"
            stroke="#0A66C2"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
            className="gsap-line"
          />

          {/* Node circles */}
          <circle
            cx="220"
            cy="180"
            r="4"
            fill="#0A66C2"
            fillOpacity="0.4"
            stroke="#0A66C2"
            strokeWidth="1.5"
            className="gsap-node"
          />
          <circle
            cx="450"
            cy="240"
            r="5"
            fill="#0B192C"
            fillOpacity="0.3"
            stroke="#0A66C2"
            strokeWidth="1.5"
            className="gsap-node"
          />
          <circle
            cx="700"
            cy="180"
            r="6"
            fill="#0A66C2"
            fillOpacity="0.45"
            stroke="#0B192C"
            strokeWidth="1.5"
            className="gsap-node"
          />
          <circle
            cx="950"
            cy="270"
            r="4.5"
            fill="#0A66C2"
            fillOpacity="0.35"
            stroke="#0A66C2"
            strokeWidth="1.5"
            className="gsap-node"
          />
          <circle
            cx="1180"
            cy="200"
            r="5.5"
            fill="#0B192C"
            fillOpacity="0.4"
            stroke="#0A66C2"
            strokeWidth="1.5"
            className="gsap-node"
          />
        </g>
      </svg>
    </div>
  );
};

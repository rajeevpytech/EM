import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GsapHomeAtmosphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<SVGSVGElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Organic drifting of ambient glowing orbs
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=80',
          y: '-=60',
          scale: 1.12,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=70',
          y: '+=80',
          scale: 0.92,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: '+=50',
          y: '+=70',
          scale: 1.08,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 4,
        });
      }

      if (orb4Ref.current) {
        gsap.to(orb4Ref.current, {
          x: '-=40',
          y: '-=50',
          duration: 22,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      }

      // 2. Subtle scanning ambient beam (ultra-slow, faint, evokes compliance scanning)
      if (beamRef.current) {
        gsap.fromTo(
          beamRef.current,
          { top: '-10%', opacity: 0 },
          {
            top: '110%',
            opacity: 0.05,
            duration: 24,
            repeat: -1,
            ease: 'power1.inOut',
            repeatDelay: 8,
          }
        );
      }

      // 3. Subtle floating particles & crosshairs
      if (particlesRef.current) {
        const dots = particlesRef.current.querySelectorAll('.gsap-atm-dot');
        dots.forEach((dot, idx) => {
          gsap.to(dot, {
            y: idx % 2 === 0 ? '-=25' : '+=30',
            x: idx % 3 === 0 ? '+=20' : '-=18',
            opacity: 0.4,
            duration: 6 + (idx % 4) * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.4,
          });
        });

        const rings = particlesRef.current.querySelectorAll('.gsap-atm-ring');
        rings.forEach((ring, idx) => {
          gsap.to(ring, {
            scale: 1.3,
            transformOrigin: 'center center',
            opacity: 0.15,
            duration: 4 + idx * 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.7,
          });
        });
      }

      // 4. Subtle mouse parallax lag (non-blocking, passive)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const normX = (clientX / window.innerWidth - 0.5) * 40;
        const normY = (clientY / window.innerHeight - 0.5) * 40;

        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            x: normX * 0.8,
            y: normY * 0.8,
            duration: 2.5,
            ease: 'power2.out',
          });
        }
        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, {
            x: -normX * 0.6,
            y: -normY * 0.6,
            duration: 3,
            ease: 'power2.out',
          });
        }
        if (particlesRef.current) {
          gsap.to(particlesRef.current, {
            x: normX * 0.3,
            y: normY * 0.3,
            duration: 2,
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
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none"
    >
      {/* Ambient Corporate Glow Orbs in E.M. Safety Palette */}
      {/* Orb 1: Forest Green (#1B4332) */}
      <div
        ref={orb1Ref}
        className="absolute -top-32 right-10 w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] rounded-full bg-gradient-to-br from-[#1B4332]/12 via-[#2D6A4F]/8 to-transparent blur-3xl transform-gpu"
      />

      {/* Orb 2: Midnight Slate (#0B192C) */}
      <div
        ref={orb2Ref}
        className="absolute top-1/3 -left-32 w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] rounded-full bg-gradient-to-tr from-[#0B192C]/8 via-[#1E293B]/6 to-transparent blur-3xl transform-gpu"
      />

      {/* Orb 3: Sage Emerald (#40916C) */}
      <div
        ref={orb3Ref}
        className="absolute top-2/3 right-1/4 w-[400px] lg:w-[550px] h-[400px] lg:h-[550px] rounded-full bg-gradient-to-tl from-[#40916C]/9 via-[#52B788]/5 to-transparent blur-3xl transform-gpu"
      />

      {/* Orb 4: Subtle Champagne Gold (#C5A880) - ultra-soft high-end tone */}
      <div
        ref={orb4Ref}
        className="absolute bottom-10 left-1/3 w-[350px] lg:w-[480px] h-[350px] lg:h-[480px] rounded-full bg-gradient-to-r from-[#C5A880]/5 to-transparent blur-3xl transform-gpu"
      />

      {/* Faint Scanning Compliance Beam */}
      <div
        ref={beamRef}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1B4332]/25 to-transparent blur-xs transform-gpu"
      />

      {/* Subtle Geometric Constellation & Crosshairs Vector Layer */}
      <svg
        ref={particlesRef}
        viewBox="0 0 1600 1000"
        className="absolute inset-0 w-full h-full opacity-35"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="homeAtmosphereGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="0.8" fill="#1B4332" fillOpacity="0.1" />
            <path
              d="M 45 50 L 55 50 M 50 45 L 50 55"
              stroke="#0B192C"
              strokeWidth="0.4"
              strokeOpacity="0.06"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#homeAtmosphereGrid)" />

        {/* Floating Safety System Micro-Nodes */}
        <g>
          {/* Node 1 */}
          <circle cx="280" cy="220" r="3.5" fill="#1B4332" fillOpacity="0.3" className="gsap-atm-dot" />
          <circle cx="280" cy="220" r="10" fill="none" stroke="#1B4332" strokeWidth="0.7" strokeOpacity="0.15" className="gsap-atm-ring" />

          {/* Node 2 */}
          <circle cx="820" cy="160" r="3" fill="#0B192C" fillOpacity="0.25" className="gsap-atm-dot" />
          <circle cx="820" cy="160" r="8" fill="none" stroke="#0B192C" strokeWidth="0.6" strokeOpacity="0.12" className="gsap-atm-ring" />

          {/* Node 3 */}
          <circle cx="1340" cy="380" r="4" fill="#2D6A4F" fillOpacity="0.3" className="gsap-atm-dot" />
          <circle cx="1340" cy="380" r="12" fill="none" stroke="#2D6A4F" strokeWidth="0.8" strokeOpacity="0.15" className="gsap-atm-ring" />

          {/* Node 4 */}
          <circle cx="480" cy="650" r="3.5" fill="#1B4332" fillOpacity="0.25" className="gsap-atm-dot" />
          <circle cx="480" cy="650" r="9" fill="none" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.12" className="gsap-atm-ring" />

          {/* Node 5 */}
          <circle cx="1120" cy="720" r="3" fill="#0B192C" fillOpacity="0.2" className="gsap-atm-dot" />
          <circle cx="1120" cy="720" r="8" fill="none" stroke="#0B192C" strokeWidth="0.5" strokeOpacity="0.1" className="gsap-atm-ring" />

          {/* Subtle connecting lines with low opacity */}
          <line
            x1="280"
            y1="220"
            x2="820"
            y2="160"
            stroke="#1B4332"
            strokeWidth="0.6"
            strokeOpacity="0.08"
            strokeDasharray="4 6"
          />
          <line
            x1="820"
            y1="160"
            x2="1340"
            y2="380"
            stroke="#2D6A4F"
            strokeWidth="0.6"
            strokeOpacity="0.08"
            strokeDasharray="4 6"
          />
        </g>
      </svg>
    </div>
  );
};

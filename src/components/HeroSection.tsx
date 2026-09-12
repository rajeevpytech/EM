import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  ChevronDown,
  Camera,
  ImageIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteImages } from '../utils/imageStore';
import { useAdminStore, getAdminAuthStatus } from '../utils/adminStore';
import { GsapBackground } from './home/GsapBackground';

interface HeroSectionProps {
  onConsultancyClick: () => void;
  onCoursesClick: () => void;
  onOpenAdminMedia?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onConsultancyClick,
  onCoursesClick,
  onOpenAdminMedia,
}) => {
  const [siteImages] = useSiteImages();
  const { siteInfo } = useAdminStore();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    setIsAdminLoggedIn(getAdminAuthStatus());
  }, []);

  const heroImageSrc = siteImages.heroSlideMilan || '/hero-milan.jpg';

  return (
    <section className="relative pt-4 sm:pt-6 pb-14 sm:pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* GSAP Fluid Animated Geometric Mesh Background */}
      <GsapBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-xs font-bold text-[#0B192C] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse" />
              <span className="uppercase tracking-wider text-[11px]">
                {siteInfo.heroBadge || 'TREVISO • MILANO — PRESIDIO NAZIONALE'}
              </span>
            </div>

            {/* Slogan & Main Headline */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm md:text-base font-bold text-[#0A66C2] tracking-wide uppercase">
                Consulenze e Formazioni di Alto Livello
              </p>
              <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.14] text-[#0B192C] tracking-tight">
                {siteInfo.heroTitle || (
                  <>
                    Costruiamo Sistemi che trasformano la{' '}
                    <span className="text-[#0A66C2] underline decoration-[#0A66C2]/40 underline-offset-8">
                      compliance
                    </span>{' '}
                    in Valore aggiunto.
                  </>
                )}
              </h1>
            </div>

            {/* Descriptive paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {siteInfo.heroSubtitle ||
                'Dalla valutazione dei rischi (D.Lgs. 81/08) ai Sistemi di Gestione Integrati (ISO 45001, 14001, 9001). Affianchiamo datori di lavoro, RSPP e HSE Manager con soluzioni operative concrete, non burocrazia.'}
            </p>

            {/* CTA Buttons with responsive motion and full-width on mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConsultancyClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#0A66C2] hover:bg-[#004182] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <span>Richiedi una Consulenza</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCoursesClick}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-[#0B192C] bg-white hover:bg-slate-100 border-2 border-[#0B192C] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer text-center"
              >
                Scopri il Catalogo Corsi
              </motion.button>
            </div>

            {/* Value Checkpoints - Responsive 1-col on mobile, 3-col on desktop */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-700 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
                <span>Docenti Qualificati</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0A66C2] shrink-0" />
                <span>Risposta entro 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
                <span>Milano & Treviso</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase featuring Piazza Gae Aulenti Milan */}
          <div className="lg:col-span-6 mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-xl bg-slate-900 group">
              {/* Photo Box */}
              <div className="relative w-full overflow-hidden bg-slate-950">
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={heroImageSrc}
                  alt="Hub Direzionale Milano - Piazza Gae Aulenti"
                  className="w-full h-auto block select-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
                  }}
                />

                {/* Top Location Badge Strip */}
                <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-[#0A66C2] text-white shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    SEDE CENTRALE
                  </span>
                  <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-black/70 backdrop-blur-md text-white border border-white/20">
                    Milano • Piazza Gae Aulenti
                  </span>
                </div>

                {/* Direct Admin Image Change Button */}
                {onOpenAdminMedia && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenAdminMedia}
                    className={`absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold backdrop-blur-md shadow-lg transition-all cursor-pointer ${
                      isAdminLoggedIn
                        ? 'bg-amber-500/90 hover:bg-amber-600 text-slate-950 border-amber-300'
                        : 'bg-black/70 hover:bg-black/90 text-white border-white/20 hover:border-[#0A66C2]'
                    }`}
                    title="Modifica o carica una nuova immagine per la copertina"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cambia Immagine</span>
                    <span className="text-[10px] bg-black/20 px-1 py-0.5 rounded font-mono">
                      {isAdminLoggedIn ? 'Admin' : 'Accedi'}
                    </span>
                  </motion.button>
                )}
              </div>

              {/* Informative Ribbon below the photo */}
              <div className="p-3.5 sm:p-4 bg-[#0B192C] text-white border-t border-slate-800">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#70B5F9]">
                        E.M. SAFETY • HUB DIREZIONALE
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span className="text-[10px] font-medium text-slate-300">
                        Presidio Milano & Treviso
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">
                      Consulenza Direzionale, Medicina del Lavoro e Sistemi di Gestione SGI
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-lg bg-[#1E3E62] border border-blue-400/30 text-[#70B5F9]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold">100% Conforme</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats floating ribbon below hero image */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 px-2 font-medium gap-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                Presidio Milano: Piazza Gae Aulenti
              </span>
              <span>Sede Treviso: Servizi Operativi & Formazione</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 sm:pt-12 flex flex-col items-center justify-center text-slate-400">
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-slate-500 mb-1">
            SCORRI PER APPROFONDIRE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#0A66C2]" />
        </div>
      </div>
    </section>
  );
};

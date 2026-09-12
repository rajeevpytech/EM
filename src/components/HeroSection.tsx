import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  ChevronDown,
  Camera,
  Layers,
  GraduationCap,
  FileCheck2,
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
    <section className="relative pt-6 sm:pt-10 pb-14 sm:pb-20 lg:pt-12 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white/85 to-slate-50/60">
      {/* GSAP Fluid Animated Geometric Mesh Background */}
      <GsapBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {/* Breadcrumb / Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
              <span className="uppercase tracking-widest text-[10px] sm:text-[11px]">
                • CONSULENZA E FORMAZIONE • TREVISO • MILANO
              </span>
            </div>

            {/* Approved Hero Title */}
            <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px] font-bold leading-[1.14] text-[#0B192C] tracking-tight">
              Costruiamo Sistemi che trasformano la{' '}
              <span className="text-[#1B4332] underline decoration-[#1B4332]/30 underline-offset-8">
                compliance
              </span>{' '}
              in Valore aggiunto
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Scopri i servizi di consulenza e i percorsi formativi di E.M Safety. Partiamo dalle esigenze della tua azienda e troviamo insieme il percorso più adatto per garantire sicurezza reale e vantaggio competitivo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConsultancyClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#1B4332] hover:bg-[#143326] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <span>Richiedi una consulenza</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCoursesClick}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-[#0B192C] bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-[#0B192C] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer text-center"
              >
                Scopri i corsi
              </motion.button>
            </div>

            {/* 3 Checkpoints from Reference */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-700 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Docenti qualificati</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Risposta entro 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Sedi a Treviso e Milano</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-photo Showcase Matching Reference 1 */}
          <div className="lg:col-span-6 mt-4 lg:mt-0">
            <div className="relative space-y-3">
              {/* Main Hero Photo: Modern Architectural Engineering Hub (Piazza Gae Aulenti replacement) */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
                <div className="relative w-full aspect-16/10 overflow-hidden bg-slate-950">
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={heroImageSrc}
                    alt="Hub Direzionale E.M Safety - Ingegneria della sicurezza e conformità industriale"
                    className="w-full h-full object-cover select-none group-hover:scale-103 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Location Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-[#1B4332] text-white shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      SEDE DIREZIONALE
                    </span>
                    <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-black/60 backdrop-blur-md text-white border border-white/20">
                      Milano • Piazza Gae Aulenti
                    </span>
                  </div>

                  {/* Floating White D.Lgs 81/08 Badge matching reference */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-xl border border-slate-200 text-left pointer-events-none z-10">
                    <span className="block text-[9px] font-extrabold uppercase tracking-wider text-[#1B4332]">
                      SICUREZZA SUL LAVORO
                    </span>
                    <span className="block text-sm font-bold text-[#0B192C] leading-tight">
                      D.Lgs. 81/08
                    </span>
                    <span className="block text-[10px] text-slate-500 font-medium">
                      Consulenza DVR • RSPP • Formazione
                    </span>
                  </div>

                  {/* Direct Admin Image Change Button */}
                  {onOpenAdminMedia && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onOpenAdminMedia}
                      className={`absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold backdrop-blur-md shadow-lg transition-all cursor-pointer ${
                        isAdminLoggedIn
                          ? 'bg-amber-500/90 hover:bg-amber-600 text-slate-950 border-amber-300'
                          : 'bg-black/60 hover:bg-black/90 text-white border-white/20 hover:border-emerald-400'
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

                  {/* Bottom Text in Main Image */}
                  <div className="absolute bottom-3 inset-x-3 text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#E5A93C]">
                        SICUREZZA SUL LAVORO • D.LGS. 81/08
                      </p>
                      <p className="text-sm font-bold text-white leading-tight">
                        Ingegneria HSE & Sistemi di Gestione SGI
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>100% Conforme</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting 3 Photographs Grid (Consultancy, Training, Documentation) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {/* 1. Workplace Safety Consultation */}
                <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200 group shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80"
                    alt="Consulenza tecnica sulla sicurezza sul lavoro e audit di reparto"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-1.5 inset-x-1.5 text-white">
                    <span className="block text-[9px] sm:text-[10px] font-bold leading-tight line-clamp-1">
                      Consulenza & Audit
                    </span>
                  </div>
                </div>

                {/* 2. Professional Training */}
                <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200 group shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80"
                    alt="Corsi di formazione accreditati per lavoratori, preposti e dirigenti"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-1.5 inset-x-1.5 text-white">
                    <span className="block text-[9px] sm:text-[10px] font-bold leading-tight line-clamp-1">
                      Corsi Accreditati
                    </span>
                  </div>
                </div>

                {/* 3. Engineering & Compliance Documentation */}
                <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200 group shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80"
                    alt="Documentazione di conformità tecnica, DVR e Sistemi ISO"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-1.5 inset-x-1.5 text-white">
                    <span className="block text-[9px] sm:text-[10px] font-bold leading-tight line-clamp-1">
                      DVR & Sistemi ISO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 sm:pt-12 flex flex-col items-center justify-center text-slate-400">
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-slate-500 mb-1">
            SCORRI PER APPROFONDIRE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#1B4332]" />
        </div>
      </div>
    </section>
  );
};

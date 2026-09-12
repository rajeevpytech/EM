import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteImages } from '../utils/imageStore';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  const [siteImages] = useSiteImages();

  const points = [
    'Analisi dei rischi reali nei reparti, non solo burocrazia',
    'Formazione esperienziale che le persone applicano davvero',
    'Un referente tecnico e RSPP dedicato alla tua azienda',
    'Presenza operativa capillare a Treviso, Milano e tutto il Nord Italia',
  ];

  return (
    <section id="chi-siamo" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Image with floating badge and subtle motion hover */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 sm:aspect-16/11 bg-slate-100 border border-slate-200 group"
            >
              <img
                src={siteImages.aboutImage || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80'}
                alt="Consulenti e tecnici della sicurezza E.M Safety"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-[#0B192C]/30 to-transparent pointer-events-none" />

              {/* Technical CAD Blueprint Vector Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

              {/* Floating Approach Badge on Top Right */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg border border-slate-200 text-right">
                <span className="block text-[10px] font-bold tracking-wider uppercase text-[#1B4332]">
                  APPROCCIO CERTIFICATO
                </span>
                <span className="font-serif-display text-sm font-bold text-[#0B192C]">
                  Concreto e su misura
                </span>
              </div>

              {/* Bottom tag */}
              <div className="absolute bottom-4 left-4 bg-[#0B192C]/90 backdrop-blur-md text-white rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-2 border border-white/10 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Oltre 450 aziende seguite stabilmente</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Copy & Bullets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
                CHI SIAMO • ESPERIENZA TRENTENNALE
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
                Un approccio concreto alla sicurezza sul lavoro
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Da oltre 30 anni affianchiamo datori di lavoro, RSPP e responsabili HR con soluzioni ingegneristiche e gestionali. 
                Rendiamo gli ambienti di lavoro sicuri e conformi, trasformando l'obbligo di legge in un autentico vantaggio competitivo.
              </p>
            </div>

            {/* 4 Points in a 2x2 grid with rounded checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[#1B4332] shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-800 leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#0B192C] hover:bg-[#1B4332] transition-colors shadow-md cursor-pointer"
              >
                <span>Scopri la nostra storia</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

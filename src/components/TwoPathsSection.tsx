import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useSiteImages } from '../utils/imageStore';

interface TwoPathsSectionProps {
  onSelectConsultancy: () => void;
  onSelectCourses: () => void;
}

export const TwoPathsSection: React.FC<TwoPathsSectionProps> = ({
  onSelectConsultancy,
  onSelectCourses,
}) => {
  const [siteImages] = useSiteImages();

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
            DUE PERCORSI OPERATIVI
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
            Da dove vuoi partire?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl">
            Scegli tra percorsi di consulenza integrata su misura per la tua conformità aziendale o la formazione professionale accreditata.
          </p>
        </div>

        {/* Two large split cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Consulenza */}
          <div
            onClick={onSelectConsultancy}
            className="group relative h-[400px] sm:h-[450px] rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:border-[#0A66C2]/50"
          >
            {/* Background image */}
            <img
              src={siteImages.twoPathsConsultancy}
              alt="Consulenza aziendale sicurezza"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80';
              }}
            />
            {/* Dark navy gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/95 via-[#0B192C]/50 to-black/30" />

            {/* Top row: badge & arrow */}
            <div className="absolute top-6 inset-x-6 flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#0A66C2] text-white shadow-md">
                CONSULENZA TECNICA
              </span>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-[#0A66C2] group-hover:border-[#0A66C2] group-hover:text-white transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 inset-x-6 text-white space-y-2.5">
              <span className="text-xs font-semibold text-[#70B5F9] uppercase tracking-wider">
                D.Lgs. 81/08 • Sistemi ISO 45001 • RSPP Esterno
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold">
                Cerchi una consulenza aziendale?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                Audit sul campo, DVR, indagini fonometriche, valutazione rischi interferenziali e certificazione dei sistemi.
              </p>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#70B5F9] group-hover:text-white transition-colors pt-1">
                <span>Esplora i servizi di consulenza</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: Formazione */}
          <div
            onClick={onSelectCourses}
            className="group relative h-[400px] sm:h-[450px] rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:border-[#0A66C2]/50"
          >
            {/* Background image */}
            <img
              src={siteImages.twoPathsCourses}
              alt="Corsi di formazione sicurezza"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80';
              }}
            />
            {/* Dark navy gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/95 via-[#0B192C]/50 to-black/30" />

            {/* Top row: badge & arrow */}
            <div className="absolute top-6 inset-x-6 flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#1E3E62] text-white border border-slate-400/40 shadow-md">
                FORMAZIONE ACCREDITATA
              </span>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-[#0A66C2] group-hover:border-[#0A66C2] group-hover:text-white transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 inset-x-6 text-white space-y-2.5">
              <span className="text-xs font-semibold text-[#70B5F9] uppercase tracking-wider">
                Catalogo 40+ Corsi • Aula, E-learning & Aziendale
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold">
                Cerchi un corso o aggiornamento?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                RSPP, RLS, Antincendio Livello 1-2-3, Primo Soccorso, Carrellisti, PLE e percorsi Nuovo Accordo 2026.
              </p>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#70B5F9] group-hover:text-white transition-colors pt-1">
                <span>Consulta il catalogo completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

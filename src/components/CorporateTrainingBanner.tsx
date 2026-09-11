import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';

interface CorporateTrainingBannerProps {
  onCorporateRequest: () => void;
  onQuoteRequest: () => void;
}

export const CorporateTrainingBanner: React.FC<CorporateTrainingBannerProps> = ({
  onCorporateRequest,
  onQuoteRequest,
}) => {
  return (
    <section className="bg-[#0B192C] py-14 sm:py-16 text-white border-y border-[#1E3E62] relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#0A66C2]/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#70B5F9]">
              <Building2 className="w-4 h-4 text-[#0A66C2]" />
              <span>PIANI AZIENDALI & FINANZIATI</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
              Formazione su misura per la tua azienda
            </h2>
            <p className="text-sm text-slate-300">
              Progettiamo corsi dedicati presso la tua sede con orari flessibili e supporto per i Fondi Interprofessionali (Fondimpresa, For.Te, Fondirigenti).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onCorporateRequest}
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-all shadow-md cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
            >
              <span>Richiedi piano aziendale</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onQuoteRequest}
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#152B44] hover:bg-[#1E3E62] border border-slate-600 transition-all cursor-pointer whitespace-nowrap"
            >
              Richiedi un preventivo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

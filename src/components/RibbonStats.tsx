import React from 'react';
import { useAdminStore } from '../utils/adminStore';

export const RibbonStats: React.FC = () => {
  const { siteInfo } = useAdminStore();

  const topics = [
    'D.LGS. 81/08',
    'FORMAZIONE RSPP',
    'ANTINCENDIO',
    'PRIMO SOCCORSO',
    'DVR E VALUTAZIONE RISCHI',
    'HACCP',
    'FORMAZIONE AZIENDALE',
    'SICUREZZA SUL LAVORO',
  ];

  const stats = [
    {
      value: siteInfo.statYears || '15+',
      label: siteInfo.statYearsLabel || 'anni di esperienza al fianco delle imprese',
    },
    {
      value: siteInfo.statAreas || '6',
      label: siteInfo.statAreasLabel || 'aree di consulenza specialistica e audit',
    },
    {
      value: siteInfo.statModes || '3',
      label: siteInfo.statModesLabel || 'modalità: in aula, presso azienda, e-learning',
    },
    {
      value: siteInfo.statResponse || '24h',
      label: siteInfo.statResponseLabel || 'tempo medio di prima risposta operativa',
    },
  ];

  return (
    <section className="bg-[#0B192C] text-white py-10 lg:py-12 border-y border-[#1E3E62]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top ribbon of topics with LinkedIn blue bullets */}
        <div className="overflow-hidden pb-8 border-b border-[#1E3E62]/80">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-bold tracking-wider text-slate-200 uppercase">
            {topics.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="text-[#0A66C2] text-base leading-none">•</span>
                <span className="hover:text-[#70B5F9] transition-colors">{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 text-center sm:text-left">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center sm:items-start group">
              <span className="font-serif-display text-4xl sm:text-5xl font-bold text-white group-hover:text-[#70B5F9] transition-colors tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-[200px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


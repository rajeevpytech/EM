import React from 'react';
import { motion } from 'motion/react';
import {
  History,
  ArrowRight,
  ShieldCheck,
  Building2,
  Award,
  Sparkles,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useSiteImages } from '../utils/imageStore';

interface OurStorySectionProps {
  onExploreFullStory: () => void;
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({ onExploreFullStory }) => {
  const [siteImages] = useSiteImages();

  const defaultMilestones = [
    {
      year: '2014',
      tag: 'FONDAZIONE',
      title: 'Fondazione nel Polo Veneto',
      desc: 'Nasce E.M Safety a Treviso per offrire ingegneria della sicurezza, rilievi strumentali specialistici e audit di prima linea per le imprese del territorio.',
      icon: Compass,
    },
    {
      year: '2018',
      tag: 'ACCREDITAMENTO',
      title: 'Accreditamento Formazione',
      desc: 'Convenzionamento paritetico nazionale (ANFOS e O.P.N. Italia Lavoro), apertura delle aule didattiche dedicate e rilascio attestati a valore legale su scala nazionale.',
      icon: Award,
    },
    {
      year: '2022',
      tag: 'HUB DIREZIONALE',
      title: 'Sede Esecutiva a Milano',
      desc: 'Inaugurazione del presidio esecutivo in Piazza Gae Aulenti a Milano per affiancare grandi gruppi industriali, governance ESG e Sistemi di Gestione SGI.',
      icon: Building2,
    },
    {
      year: '2026',
      tag: 'INNOVAZIONE CONTINUA',
      title: 'Adeguamento 4.0 & Portale Cloud',
      desc: 'Lancio della piattaforma cloud scadenziario, calcolatore integrato sanzioni/sgravi INAIL e recepimento del Nuovo Accordo Stato-Regioni.',
      icon: Sparkles,
    },
  ];

  // Merge with any custom milestones from admin store if available
  const activeMilestones = defaultMilestones;

  return (
    <section id="la-nostra-storia" className="py-20 sm:py-28 bg-[#0B192C] text-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <History className="w-3.5 h-3.5" />
              <span>LA NOSTRA EVOLUZIONE SUL CAMPO (2014 - 2026)</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Un percorso fondato su serietà tecnica e presenza continua
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Non siamo semplici compilatori di fascicoli burocratici. Dal 2014 traduciamo la complessa normativa italiana in processi snelli, proteggendo la salute delle persone e il patrimonio dei datori di lavoro.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onExploreFullStory}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#1B4332] hover:bg-[#143326] transition-all shadow-lg hover:shadow-emerald-900/20 cursor-pointer"
            >
              <span>Esplora la Cronistoria Completa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Milestone Cards Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activeMilestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-display text-3xl font-bold text-[#E5A93C] group-hover:scale-105 transition-transform inline-block">
                      {m.year}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block">
                    {m.tag}
                  </span>

                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

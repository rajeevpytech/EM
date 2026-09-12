import React from 'react';
import { ShieldCheck, GraduationCap, Clock, ArrowRight, Shield, Award, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

interface TwoPathsSectionProps {
  onSelectConsultancy: () => void;
  onSelectCourses: () => void;
  onSelectSupport?: () => void;
}

export const TwoPathsSection: React.FC<TwoPathsSectionProps> = ({
  onSelectConsultancy,
  onSelectCourses,
  onSelectSupport,
}) => {
  const cards = [
    {
      id: 'consultancy',
      badge: 'CONSULENZA DIREZIONALE',
      icon: ShieldCheck,
      title: 'Consulenza aziendale & Sistemi HSE',
      description:
        'Progettazione e mantenimento di Sistemi Qualità, Ambiente, Sicurezza (SGI). Audit ispettivi, DVR specialistici, valutazione Rischi e assunzione incarico RSPP esterno.',
      actionLabel: 'Esplora la consulenza',
      tag: 'D.Lgs. 81/08',
      onClick: onSelectConsultancy,
    },
    {
      id: 'courses',
      badge: 'CENTRO ACCREDITATO',
      icon: GraduationCap,
      title: 'Formazione & Corsi Obbligatori',
      description:
        'Catalogo completo Accordo Stato-Regioni. Formazione Lavoratori (Basso, Medio, Alto rischio), Preposti, Dirigenti, RLS, Antincendio e Primo Soccorso. In aula o FAD sincrona.',
      actionLabel: 'Vedi prossimi corsi',
      tag: 'Attestati Validi',
      onClick: onSelectCourses,
    },
    {
      id: 'support',
      badge: 'SCADENZIARIO & TUTELA',
      icon: Headphones,
      title: 'Supporto & Monitoraggio Continuo',
      description:
        'Un affiancamento costante per non perdere mai una scadenza formativa o di rinnovo documentale. Monitoraggio legislativo attivo con alert preventivi per il datore di lavoro.',
      actionLabel: 'Contatta un referente',
      tag: 'Helpdesk 24/48h',
      onClick: onSelectSupport || onSelectConsultancy,
    },
  ];

  return (
    <section id="come-possiamo-aiutarti" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
              ORIENTAMENTO IMMEDIATO
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
              Come possiamo aiutarti?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
              Individua il percorso necessario per la tua realtà aziendale: soluzioni per Datori di Lavoro, RSPP, responsabili QHSE e direzioni HR.
            </p>
          </div>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0B192C] group-hover:bg-[#1B4332] group-hover:text-white group-hover:border-[#1B4332] transition-colors shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="inline-block text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                    {card.badge}
                  </span>

                  <h3 className="text-xl font-bold text-[#0B192C] tracking-tight group-hover:text-[#1B4332] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={card.onClick}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B4332] hover:text-[#143326] transition-colors cursor-pointer group-hover:underline"
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {card.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

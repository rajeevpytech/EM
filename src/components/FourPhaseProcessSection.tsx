import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Calendar,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface FourPhaseProcessSectionProps {
  onSelectPhaseAction?: (phaseTitle: string) => void;
}

export const FourPhaseProcessSection: React.FC<FourPhaseProcessSectionProps> = ({
  onSelectPhaseAction,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const phases = [
    {
      num: 1,
      icon: FileText,
      title: 'Confronto iniziale & analisi del fabbisogno',
      description:
        'Analizziamo l’assetto societario, i DVR vigenti, le matricole e le mansioni per identificare le priorità di conformità o certificazione.',
      footerTag: 'FASE PRELIMINARE',
      deliverables: [
        'Checklist ispettiva preliminare con scoring di conformità',
        'Verifica scadenze imminenti (visite mediche, nomine, attestati)',
        'Mappatura dei rischi non formalizzati nel documento vigente',
      ],
    },
    {
      num: 2,
      icon: Calendar,
      title: 'Piano concordato & calendarizzazione flessibile',
      description:
        'Definiamo un cronoprogramma sostenibile per la produzione aziendale: sessioni frazionate, date dedicate in loco o aule virtuali.',
      footerTag: 'PIANIFICAZIONE',
      deliverables: [
        'Calendario modulare concordato sui turni aziendali',
        'Scelta aula fisica o FAD sincrona accreditata',
        'Assegnazione del referente tecnico dedicato',
      ],
    },
    {
      num: 3,
      icon: GraduationCap,
      title: 'Esecuzione qualificata con docenti ed esperti',
      description:
        'Interventi guidati esclusivamente da tecnici qualificati con oltre 5 anni di esperienza di cantiere e docenti con abilitazione ministeriale.',
      footerTag: 'EROGAZIONE',
      deliverables: [
        'Docenti formatori qualificati ex D.I. 6/3/2013',
        'Didattica esperienziale e simulazioni pratiche',
        'Rilevazioni strumentali e audit di reparto sul campo',
      ],
    },
    {
      num: 4,
      icon: ShieldCheck,
      title: 'Rilascio documentale & promemoria scadenze',
      description:
        'Invio rapido di attestati conformi e verbali di prova. Inserimento nel registro scadenze E.M Safety con avviso per futuri aggiornamenti.',
      footerTag: 'CHIUSURA & TUTELA CONTINUA',
      deliverables: [
        'Attestati numerati e registrati con validità legale',
        'Inserimento nello scadenziario cloud proattivo',
        'Report finale asseverato per RSPP e Datore di Lavoro',
      ],
    },
  ];

  return (
    <section id="percorso-fasi" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Reference */}
        <div className="max-w-3xl space-y-2 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
            PROCESSO OPERATIVO
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
            Il nostro metodo di lavoro in 4 fasi
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Dalla prima telefonata al rilascio della documentazione certificata: linearità, zero burocrazia inutile e certezza del risultato.
          </p>
        </div>

        {/* 4 Cards Grid Matching Reference Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            const isExpanded = selectedPhase === idx;

            return (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setSelectedPhase(isExpanded ? null : idx)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isExpanded
                    ? 'bg-slate-50 border-[#1B4332] shadow-lg ring-1 ring-[#1B4332]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar: Dark Number Badge on Left + Clean Outline Icon on Right */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#0B192C] text-white flex items-center justify-center font-serif-display text-lg font-bold shadow-xs">
                      {phase.num}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-slate-200/80 flex items-center justify-center text-slate-600 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-display text-lg font-bold text-[#0B192C] mb-3 leading-snug group-hover:text-[#1B4332] transition-colors">
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {phase.description}
                  </p>

                  {/* Expanded Deliverables if clicked */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 mt-4 border-t border-slate-200 space-y-2"
                      >
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Output Specifici
                        </span>
                        {phase.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectPhaseAction) onSelectPhaseAction(phase.title);
                          }}
                          className="mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-[#1B4332] hover:bg-[#143326] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Approfondisci fase {phase.num}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Tag Matching Reference */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-[#1B4332] transition-colors">
                    {phase.footerTag}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-[#1B4332]' : ''
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

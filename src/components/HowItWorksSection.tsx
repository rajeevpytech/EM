import React from 'react';
import { motion } from 'motion/react';
import { PhoneCall, Calendar, Award, FileCheck2, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '1',
      icon: PhoneCall,
      tag: 'FASE PRELIMINARE',
      title: 'Confronto iniziale & analisi del fabbisogno',
      description:
        'Analizziamo l’assetto societario, i DVR vigenti, le matricole e le mansioni per identificare le priorità di conformità o certificazione.',
    },
    {
      num: '2',
      icon: Calendar,
      tag: 'PIANIFICAZIONE',
      title: 'Piano concordato & calendarizzazione flessibile',
      description:
        'Definiamo un cronoprogramma sostenibile per la produzione aziendale: sessioni frazionate, date dedicate in loco o aule virtuali.',
    },
    {
      num: '3',
      icon: Award,
      tag: 'EROGAZIONE',
      title: 'Esecuzione qualificata con docenti ed esperti',
      description:
        'Interventi guidati esclusivamente da tecnici qualificati con oltre 5 anni di esperienza di cantiere e docenti con abilitazione ministeriale.',
    },
    {
      num: '4',
      icon: FileCheck2,
      tag: 'CHIUSURA & TUTELA CONTINUA',
      title: 'Rilascio documentale & promemoria scadenze',
      description:
        'Invio rapido di attestati conformi e verbali di prova. Inserimento nel registro scadenze E.M Safety con avviso per futuri aggiornamenti.',
    },
  ];

  return (
    <section id="metodo-lavoro" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
            PROCESSO OPERATIVO
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
            Il nostro metodo di lavoro in 4 fasi
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Dalla prima telefonata al rilascio della certificazione protetta: linearità, zero burocrazia inutile e certezza del risultato.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0B192C] group-hover:bg-[#1B4332] group-hover:text-white group-hover:border-[#1B4332] transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif-display text-2xl font-bold text-slate-300 group-hover:text-[#E5A93C] transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                    {step.tag}
                  </span>

                  <h3 className="text-base font-bold text-[#0B192C] tracking-tight leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
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

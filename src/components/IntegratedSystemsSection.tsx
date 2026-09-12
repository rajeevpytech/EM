import React from 'react';
import { motion } from 'motion/react';
import { Layers, ClipboardCheck, Users, BarChart3, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface IntegratedSystemsSectionProps {
  onConsultancyClick?: () => void;
  onOpenConsultation?: () => void;
}

export const IntegratedSystemsSection: React.FC<IntegratedSystemsSectionProps> = ({
  onConsultancyClick,
  onOpenConsultation,
}) => {
  const handleConsultancy = onOpenConsultation || onConsultancyClick;

  const modules = [
    {
      num: '01',
      icon: Layers,
      title: 'Sistemi di Gestione Integrati (SGI)',
      description:
        'Progettiamo e implementiamo sistemi integrati Qualità (ISO 9001), Ambiente (ISO 14001), Energia (ISO 50001) e Sicurezza (ISO 45001) — costruiti per essere effettivamente usati dall’organico operativo, non solo per superare la certificazione.',
      bullet: 'Riduzione dei costi di non-conformità',
    },
    {
      num: '02',
      icon: ClipboardCheck,
      title: 'Audit e verifiche ispettive',
      description:
        'Conduciamo audit interni e di seconda parte (su fornitori critici) per misurare l’efficacia reale del sistema di gestione, identificare tempestivamente le aree di miglioramento e anticipare le non conformità prima delle verifiche degli enti di controllo.',
      bullet: 'Checklist rigorose per settori complessi',
    },
    {
      num: '03',
      icon: Users,
      title: 'Cultura organizzativa e coinvolgimento',
      description:
        'Un sistema funziona quando le persone lo capiscono e lo condividono. Supportiamo le organizzazioni nel trasformare la compliance da obbligo percepito a comportamento quotidiano consapevole e proattivo da parte di ogni livello aziendale.',
      bullet: 'Coinvolgimento attivo dei preposti e RLS',
    },
    {
      num: '04',
      icon: BarChart3,
      title: 'Monitoraggio normativo & KPI di performance',
      description:
        'Definiamo indicatori di performance HSE e qualità per rendere visibile il valore generato dal sistema — non solo agli auditor, ma al top management. Traduciamo le novità legislative in chiare linee guida operative subito applicabili.',
      bullet: 'Dashboard KPI personalizzate per CdA e Datori di Lavoro',
    },
  ];

  return (
    <section id="sistemi-integrati" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
            METODOLOGIA E.M SAFETY
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[42px] text-[#0B192C] font-bold tracking-tight leading-tight">
            Sistemi di gestione integrati per generare valore reale, non burocrazia.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Dietro ogni soluzione su misura c'è una rete di professionisti specializzati, selezionati per rigore tecnico ed esperienza sul campo.
          </p>
        </div>

        {/* 4 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {modules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50/70 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-400 group-hover:text-[#1B4332] transition-colors">
                      {mod.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0B192C] group-hover:text-[#1B4332] group-hover:border-[#1B4332]/30 transition-all shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0B192C] tracking-tight">
                    {mod.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#1B4332] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{mod.bullet}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Consultation Call-to-Action Underneath */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-[#0B192C] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-slate-800"
        >
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
              AUDIT INIZIALE • VALUTAZIONE GAP ANALYSIS
            </span>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight">
              Vuoi verificare l'efficacia del tuo attuale sistema di sicurezza?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              I nostri tecnici esperti effettuano un check-up preliminare per rilevare scadenze imminenti e lacune documentali.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleConsultancy}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#1B4332] hover:bg-[#143326] shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Approfondisci la consulenza</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

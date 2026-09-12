import React from 'react';
import { motion } from 'motion/react';
import {
  AlertOctagon,
  ShieldCheck,
  Scale,
  FileX2,
  GraduationCap,
  UserX,
  HeartPulse,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react';

export const CostOfNonComplianceSection: React.FC = () => {
  const comparisonItems = [
    {
      id: 'dvr',
      icon: FileX2,
      title: 'Mancata redazione o aggiornamento DVR',
      norm: 'Art. 28, 29 e 55 D.Lgs. 81/08',
      withoutEmSafety: {
        penalty: 'Arresto da 3 a 6 mesi o ammenda da € 3.071,27 a € 7.862,44',
        consequence:
          'Responsabilità penale diretta del Datore di Lavoro non delegabile. Possibile provvedimento di sospensione immediata dell’attività imprenditoriale ex Allegato I.',
      },
      withEmSafety: {
        solution: 'DVR Dinamico Asseverato & Revisione Continua',
        benefit:
          'Valutazione analitica su misura di ogni reparto e mansione. Documento legalmente inattaccabile con scudo protettivo per il management in sede ispettiva.',
      },
    },
    {
      id: 'formazione',
      icon: GraduationCap,
      title: 'Omessa formazione lavoratori e preposti',
      norm: 'Art. 37 e 55 D.Lgs. 81/08 • Accordi Stato-Regioni',
      withoutEmSafety: {
        penalty: 'Arresto da 2 a 4 mesi o ammenda da € 1.474,21 a € 6.388,23 per lavoratore',
        consequence:
          'Sanzione progressiva moltiplicata per l’organico non formato. Rivalsa totale INAIL sull’azienda in caso di infortunio grave e revoca di appalti.',
      },
      withEmSafety: {
        solution: 'Corsi Accreditati & Scadenziario Cloud 365 gg',
        benefit:
          'Aule certificate con docenti qualificati, attestati numerati a valore legale nazionale e alert automatico a 60 giorni prima della scadenza quinquennale.',
      },
    },
    {
      id: 'rspp',
      icon: UserX,
      title: 'Mancata nomina RSPP qualificato',
      norm: 'Art. 17, 31 e 55 D.Lgs. 81/08',
      withoutEmSafety: {
        penalty: 'Arresto da 3 a 6 mesi o ammenda da € 3.071,27 a € 7.862,44',
        consequence:
          'Obbligo non delegabile. Nullità di fatto delle procedure di sicurezza e impossibilità di partecipare a gare d’appalto pubbliche o private.',
      },
      withEmSafety: {
        solution: 'Incarico Formale RSPP Esterno Abilitato',
        benefit:
          'Presa in carico da parte di ingegneri e tecnici esperti. Presidio costante, gestione dei rapporti con gli enti di controllo (ASL/SPISAL, ITL) e audit in loco.',
      },
    },
    {
      id: 'sanitaria',
      icon: HeartPulse,
      title: 'Omessa sorveglianza sanitaria e visite mediche',
      norm: 'Art. 18, 41 e 55 D.Lgs. 81/08',
      withoutEmSafety: {
        penalty: 'Ammenda da € 2.457,02 a € 4.914,03 per lavoratore',
        consequence:
          'Divieto assoluto di adibire il dipendente alla mansione prima del giudizio di idoneità. Rischio di vertenze per malattia professionale non diagnosticata.',
      },
      withEmSafety: {
        solution: 'Medicina del Lavoro Integrata & Unità Mobili',
        benefit:
          'Nomina tempestiva del Medico Competente convenzionato, stesura del protocollo sanitario specialistico e visite eseguite comodamente presso l’azienda.',
      },
    },
  ];

  return (
    <section id="costo-non-conformita" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-rose-600" />
              <span>Rischi & Responsabilità D.Lgs. 81/08</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
              Quanto costa davvero una mancata conformità?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Un quadro di confronto oggettivo tra i costi e le conseguenze penali dell'omissione normativa e la serenità operativa garantita dal presidio continuativo di E.M Safety.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <span>Dati Verificati • Art. 55 D.Lgs 81/08</span>
          </div>
        </div>

        {/* 4 Cards Grid with Side-by-Side Comparison (Senza Presidio vs Con E.M Safety) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {comparisonItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Card Title & Legal Citation */}
                <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                        {item.norm}
                      </span>
                      <h3 className="text-lg font-bold text-[#0B192C] tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Comparison Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  {/* Without E.M Safety (Risk & Sanction) */}
                  <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Senza Presidio Normativo</span>
                    </div>
                    <p className="text-xs font-black text-rose-900 font-mono">
                      {item.withoutEmSafety.penalty}
                    </p>
                    <p className="text-xs text-rose-800/80 leading-relaxed">
                      {item.withoutEmSafety.consequence}
                    </p>
                  </div>

                  {/* With E.M Safety (Protection & Value) */}
                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Con Metodologia E.M Safety</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-950">
                      {item.withEmSafety.solution}
                    </p>
                    <p className="text-xs text-emerald-900/80 leading-relaxed">
                      {item.withEmSafety.benefit}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

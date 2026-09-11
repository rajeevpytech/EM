import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, FileCheck, ExternalLink, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { AnfosLogo } from './affiliations/AnfosLogo';
import { OpnLogo } from './affiliations/OpnLogo';
import { DanLogo } from './affiliations/DanLogo';

interface AffiliationsSectionProps {
  onLearnMore?: () => void;
}

export const AffiliationsSection: React.FC<AffiliationsSectionProps> = ({ onLearnMore }) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const affiliations = [
    {
      id: 'anfos',
      name: 'ANFOS',
      subtitle: 'Centro di Formazione - Sede Territoriale Periferica',
      description:
        'Associazione Nazionale Formatori della Sicurezza sul Lavoro (operante ai sensi della Legge 4/2013). E.M. Safety eroga percorsi formativi conformi ai dettami dell’Accordo Stato-Regioni con rilascio di attestati numerati e registrati sull’archivio nazionale.',
      legalRef: 'Legge 4/2013 • Art. 37 D.Lgs. 81/08',
      scope: 'Sicurezza generale e specifica, RSPP, RLS, Preposti, Dirigenti, Antincendio e Attrezzature di lavoro.',
      badge: 'Sede Territoriale Periferica',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      logo: <AnfosLogo className="h-28 sm:h-32 w-auto mx-auto drop-shadow-xs" />,
    },
    {
      id: 'opn',
      name: 'O.P.N. ITALIA LAVORO',
      subtitle: 'Organismo Paritetico Nazionale',
      description:
        'Costituito da associazioni datoriali e sindacali comparativamente più rappresentative a livello nazionale ai sensi dell’art. 51 del D.Lgs. 81/08. Garantisce la collaborazione paritetica formale per la verifica e validazione preventiva dei progetti formativi aziendali.',
      legalRef: 'Art. 51 D.Lgs. 81/08 • CCNL Comparativamente Maggioritari',
      scope: 'Collaborazione bilaterale obbligatoria, validazione conformità percorsi formativi, gestione RLST di comparto.',
      badge: 'Organismo Paritetico Nazionale',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      logo: <OpnLogo className="h-28 sm:h-32 w-auto mx-auto drop-shadow-xs" />,
    },
    {
      id: 'dan',
      name: 'DAN Partner',
      subtitle: 'International First Aid & Medical Emergency Partner',
      description:
        'Divers Alert Network è la fondazione medico-scientifica leader mondiale nell’addestramento al primo soccorso, rianimazione cardiopolmonare (BLS-D) e gestione delle emergenze. I protocolli DAN integrano e arricchiscono gli standard del D.M. 388/03.',
      legalRef: 'D.M. 388/03 • Standard Internazionali ERC/ILCOR',
      scope: 'Primo Soccorso Aziendale Gruppi A-B-C, BLS-D adulto/pediatrico, defibrillatori DAE, ossigenoterapia e trauma.',
      badge: 'Training Partner Internazionale',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      logo: <DanLogo className="h-24 sm:h-28 w-auto mx-auto drop-shadow-xs" />,
    },
  ];

  return (
    <section id="affiliazioni" className="py-20 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 border-t border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0A66C2] uppercase tracking-wider"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Accreditamenti & Partnership Istituzionali</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B192C] tracking-tight"
          >
            Affiliazioni
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans-ui"
          >
            E.M. Safety opera in sinergia con i più autorevoli enti paritetici e associazioni nazionali ed internazionali, garantendo il pieno valore legale e la conformità ispettiva per ogni attestato rilasciato.
          </motion.p>
        </div>

        {/* 3 Affiliation Cards Matching the User's Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {affiliations.map((aff, index) => (
            <motion.div
              key={aff.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#0A66C2]/40"
            >
              {/* Card Top Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#0B192C] via-[#0A66C2] to-[#0B192C] opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="p-7 sm:p-8 flex-1 flex flex-col">
                {/* Logo Display Area */}
                <div className="h-44 sm:h-48 flex items-center justify-center p-4 bg-slate-50/70 rounded-xl border border-slate-100 mb-6 group-hover:bg-white transition-colors">
                  {aff.logo}
                </div>

                {/* Badge & Title */}
                <div className="space-y-2 mb-4">
                  <span className={`inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${aff.badgeColor}`}>
                    {aff.badge}
                  </span>
                  <h3 className="font-serif-display text-xl font-bold text-[#0B192C] group-hover:text-[#0A66C2] transition-colors">
                    {aff.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {aff.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1 mb-6">
                  {aff.description}
                </p>

                {/* Legal Reference Box */}
                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Riferimento Normativo:</span>
                      <span className="text-slate-600 text-[11px]">{aff.legalRef}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 pt-1">
                    <FileCheck className="w-4 h-4 text-[#0B192C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Ambiti Didattici:</span>
                      <span className="text-slate-600 text-[11px]">{aff.scope}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="px-7 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Accreditamento Attivo 2026
                </span>
                <span className="text-[11px] text-slate-400">Valido in tutta Italia</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Institutional Compliance Banner below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0B192C] text-white border border-[#1E3E62] shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0A66C2] text-[10px] font-extrabold uppercase tracking-wider text-white">
                Garanzia di Legittimità
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Conformità agli Organi di Vigilanza (SPISAL, ATS, ITL)
              </span>
            </div>
            <h4 className="font-serif-display text-lg sm:text-xl font-bold text-white">
              Tutti gli attestati sono univocamente tracciati e verificabili online con QR Code
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl">
              Ogni corsista riceve un certificato conforme all’Accordo Stato-Regioni e alle disposizioni paritetiche, consultabile in qualsiasi momento dal datore di lavoro o dagli ispettori tramite il Cloud E.M. Safety.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {onLearnMore && (
              <button
                onClick={onLearnMore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#0A66C2] hover:bg-[#004182] text-white transition-colors cursor-pointer shadow-md"
              >
                <span>Richiedi Informazioni Accreditamento</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

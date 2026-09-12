import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope,
  HardHat,
  Compass,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
} from 'lucide-react';

interface PartnershipCategory {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  scope: string;
  advantage: string;
  keyProfiles: string[];
  stat: string;
}

export const PartnershipOrbitSection: React.FC = () => {
  const categories: PartnershipCategory[] = [
    {
      id: 'medici',
      name: 'Medici Competenti e Centri Sanitari',
      shortName: 'Medicina del Lavoro',
      icon: Stethoscope,
      scope:
        'Protocolli sanitari mirati ex art. 25 D.Lgs 81/08, visite mediche periodiche e preventive, accertamento idoneità alla mansione, tossicologia e screening alcol/droghe, gestione registro esposti.',
      advantage:
        'Interventi tempestivi direttamente in azienda con camper sanitari mobili attrezzati o presso studi convenzionati a Milano e Treviso.',
      keyProfiles: [
        'Medici del Lavoro iscritti all’Elenco Nazionale Ministeriale',
        'Infermieri professionali dedicati al prelievo e spirometria',
        'Specialisti in ergonomia e patologie muscolo-scheletriche',
      ],
      stat: 'Oltre 1.200 idoneità rilasciate/anno',
    },
    {
      id: 'consulenti',
      name: 'Consulenti HSE e RSPP Autonomi',
      shortName: 'Consulenti & RSPP',
      icon: HardHat,
      scope:
        'Supporto tecnico per commesse ad alta complessità, co-progettazione di Sistemi Integrati SGI (ISO 45001/14001/9001), rilievi strumentali accreditati e audit periodici su stabilimenti.',
      advantage:
        'Accesso alla suite digitale E.M Safety per la gestione documentale del cliente e convenzioni per asseverazioni e docenze congiunte.',
      keyProfiles: [
        'Ingegneri HSE e RSPP abilitati per tutti i settori ATECO',
        'Tecnici della Prevenzione nell’Ambiente e Luoghi di Lavoro (TPALL)',
        'Auditor qualificati di terza parte per schemi ISO',
      ],
      stat: 'Rete di oltre 35 professionisti convenzionati',
    },
    {
      id: 'ingegneria',
      name: 'Studi di Ingegneria e Cantieri',
      shortName: 'Ingegneria & Progettazione',
      icon: Compass,
      scope:
        'Coordinamento sicurezza in fase di progettazione ed esecuzione (CSP / CSE), redazione Piani di Sicurezza e Coordinamento (PSC), collaudo linee vita (UNI 11578), pratiche antincendio CPI.',
      advantage:
        'Integrazione fluida: la progettazione strutturale e impiantistica dialoga con la sicurezza operativa sul campo senza attriti o ritardi di cantiere.',
      keyProfiles: [
        'Ingegneri strutturisti e collaudatori di linee vita',
        'Professionisti antincendio abilitati ex Legge 818/84',
        'Coordinatori di cantiere con oltre 10 anni di esperienza',
      ],
      stat: 'Supervisione di oltre 80 cantieri complessi',
    },
    {
      id: 'formazione',
      name: 'Centri di Formazione e Associazioni',
      shortName: 'Enti Paritetici & Centri Formazione',
      icon: GraduationCap,
      scope:
        'Collaborazione paritetica formale per la validazione dei progetti formativi aziendali, rilascio di attestati con valore legale nazionale, formazione finanziata tramite Fondi Interprofessionali.',
      advantage:
        'Attestati con QR code univoco anticontraffazione registrati su archivio nazionale verificabile da ASL, ITL e committenti d’appalto.',
      keyProfiles: [
        'Docenti formatori con requisiti ex D.I. 6 marzo 2013',
        'Responsabili di progetto formativo per fondi paritetici',
        'Commissioni paritetiche territoriali bilaterali',
      ],
      stat: '100% validità ispettiva certificata',
    },
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('medici');
  const activeCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  return (
    <section id="partnership-network" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
            ECOSISTEMA PROFESSIONALE E.M SAFETY
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
            Mappa Orbitale delle Partnership Strategiche
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Un network sinergico e qualificato per garantire una copertura totale delle esigenze tecniche, mediche e legali dell'impresa su tutto il territorio nazionale.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Orbital Constellation Diagram on Left, Dynamic Info Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Orbital Interactive Graphic (Works on both touch and click) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[420px]">
            {/* Ambient concentric circles */}
            <div className="absolute w-72 h-72 sm:w-84 sm:h-84 rounded-full border border-dashed border-slate-200 pointer-events-none animate-spin-slow opacity-60" />
            <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-slate-100 pointer-events-none" />

            {/* Central Hub: E.M Safety */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#0B192C] text-white flex flex-col items-center justify-center text-center p-2 shadow-xl border-2 border-emerald-400/50">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 mb-1" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-tight leading-tight">
                E.M SAFETY
              </span>
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-medium leading-none mt-0.5">
                Hub Centrale
              </span>
            </div>

            {/* 4 Orbiting Satellite Nodes */}
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between">
                {/* Top-Left: Medici */}
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId('medici')}
                  className={`pointer-events-auto p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 border shadow-sm ${
                    selectedCategoryId === 'medici'
                      ? 'bg-[#1B4332] text-white border-emerald-500 ring-4 ring-emerald-100 scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">Medici Competenti</span>
                </button>

                {/* Top-Right: Consulenti */}
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId('consulenti')}
                  className={`pointer-events-auto p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 border shadow-sm ${
                    selectedCategoryId === 'consulenti'
                      ? 'bg-[#1B4332] text-white border-emerald-500 ring-4 ring-emerald-100 scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <HardHat className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">Consulenti HSE</span>
                </button>
              </div>

              <div className="flex justify-between">
                {/* Bottom-Left: Ingegneria */}
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId('ingegneria')}
                  className={`pointer-events-auto p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 border shadow-sm ${
                    selectedCategoryId === 'ingegneria'
                      ? 'bg-[#1B4332] text-white border-emerald-500 ring-4 ring-emerald-100 scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">Studi Ingegneria</span>
                </button>

                {/* Bottom-Right: Centri Formazione */}
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId('formazione')}
                  className={`pointer-events-auto p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 border shadow-sm ${
                    selectedCategoryId === 'formazione'
                      ? 'bg-[#1B4332] text-white border-emerald-500 ring-4 ring-emerald-100 scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">Enti Paritetici</span>
                </button>
              </div>
            </div>

            {/* Helper Caption for mobile */}
            <span className="text-[11px] text-slate-400 font-medium mt-auto pt-6 text-center">
              Seleziona un nodo per approfondire la sinergia tecnica
            </span>
          </div>

          {/* Right Column: Selected Category Detailed Info */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1B4332] flex items-center justify-center border border-emerald-200/60 shadow-2xs">
                      <activeCategory.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#0B192C]">
                        {activeCategory.name}
                      </h3>
                      <span className="text-xs font-bold text-[#1B4332]">
                        {activeCategory.stat}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scope */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Ambito di Cooperazione & Competenze
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeCategory.scope}
                  </p>
                </div>

                {/* Advantage */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block">
                    Vantaggio Operativo per l'Azienda Cliente
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {activeCategory.advantage}
                  </p>
                </div>

                {/* Key Profiles */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Figure Professionali Collegate
                  </span>
                  <ul className="space-y-1.5">
                    {activeCategory.keyProfiles.map((profile, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                        <span>{profile}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Category Switcher Pills */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const isSelected = cat.id === selectedCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

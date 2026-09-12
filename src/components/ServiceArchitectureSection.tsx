import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  GraduationCap,
  CloudCheck,
  Factory,
  HardHat,
  Building,
  FlaskConical,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Activity,
  Award,
} from 'lucide-react';

interface ServiceArchitectureSectionProps {
  onRequestQuoteForSector?: (sectorName: string) => void;
}

interface SectorInfo {
  id: string;
  name: string;
  icon: React.ElementType;
  ateco: string;
  riskLevel: 'Alto' | 'Medio' | 'Basso';
  riskBadgeColor: string;
  dvrObligations: string[];
  instrumentalAssessments: string[];
  mandatoryCourses: string[];
  healthSurveillance: string;
  inailOt23Saving: string;
}

export const ServiceArchitectureSection: React.FC<ServiceArchitectureSectionProps> = ({
  onRequestQuoteForSector,
}) => {
  const [selectedService, setSelectedService] = useState<number>(0);
  const [selectedSectorId, setSelectedSectorId] = useState<string>('manifattura');

  const architectureServices = [
    {
      id: 'consulenza',
      icon: ShieldCheck,
      title: 'Consulenza Direzionale e Sistemi HSE',
      badge: 'GOVERNANCE & COMPLIANCE',
      description:
        'Redazione e asseverazione DVR generale, valutazioni dei rischi specifici, assunzione formale dell’incarico di RSPP esterno e progettazione di Sistemi di Gestione Integrati (ISO 45001, 14001, 9001, Modello 231).',
      features: [
        'Incarico RSPP esterno con tecnici abilitati',
        'DVR Dinamico e continuo aggiornamento legislativo',
        'Audit di seconda parte e Gap Analysis preliminare',
        'Adeguamento al D.Lgs. 231/01 e Scudo Penale',
      ],
    },
    {
      id: 'formazione',
      icon: GraduationCap,
      title: 'Formazione e Corsi Accreditati',
      badge: 'CENTRO ACCREDITATO ANFOS & OPN',
      description:
        'Percorsi formativi certificati in conformità all’Accordo Stato-Regioni. Aule frontali presso le nostre sedi di Treviso e Milano, aule dedicate presso la tua sede aziendale o in videoconferenza sincrona (FAD).',
      features: [
        'Formazione Generale e Specifica (Basso, Medio, Alto)',
        'Corsi RSPP/ASPP Datori di Lavoro, RLS e Preposti',
        'Addestramento Antincendio (Livelli 1, 2, 3) e Primo Soccorso',
        'Abilitazione Attrezzature: Carrelli elevatori, PLE, Gru',
      ],
    },
    {
      id: 'cloud',
      icon: CloudCheck,
      title: 'Supporto e Scadenziario Cloud',
      badge: 'MONITORAGGIO 365 GG',
      description:
        'Piattaforma digitale proprietaria per archiviare e monitorare le scadenze di attestati formativi, nomine aziendali, visite mediche periodiche e manutenzioni degli impianti di sicurezza.',
      features: [
        'Avviso automatico a 60 e 30 giorni dalla scadenza',
        'Fascicolo digitale del lavoratore accessibile h24',
        'Verifica immediata validità attestati per appalti',
        'Assistenza tecnica e legale via helpdesk dedicato',
      ],
    },
  ];

  const sectors: SectorInfo[] = [
    {
      id: 'manifattura',
      name: 'Manifattura e Meccanica',
      icon: Factory,
      ateco: 'ATECO C (10–33) • Produzione & Trasformazione',
      riskLevel: 'Alto',
      riskBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      dvrObligations: [
        'DVR generale con valutazione ciclo tecnologico e linee produttive',
        'Valutazione rischio macchine e marcatura CE (Allegato V D.Lgs 81/08)',
        'Valutazione rischio atmosfere esplosive (ATEX) dove presenti polveri/fumi',
        'Piano di Emergenza ed Evacuazione (PEE) con prove pratiche annuali',
      ],
      instrumentalAssessments: [
        'Misurazione strumentale fonometrica (Rumore D.Lgs 81/08 Titolo VIII Capo II)',
        'Valutazione vibrazioni meccaniche sistema mano-braccio (HAV) e corpo intero (WBV)',
        'Valutazione movimentazione manuale dei carichi (Metodo NIOSH / Snook & Ciriello)',
        'Rilevazione polveri sottili, nebbie oleose e fumi di saldatura',
      ],
      mandatoryCourses: [
        'Formazione Lavoratori Rischio Alto (16 ore: 4h Generale + 12h Specifica)',
        'Addestramento Preposti di reparto (8 ore)',
        'Corso Antincendio Livello 2 o 3 con idoneità tecnica Vigili del Fuoco',
        'Abilitazione Carrelli Semoventi e Gru a Ponte (Accordo 22/02/2012)',
      ],
      healthSurveillance:
        'Obbligatoria con periodicità generalmente annuale: spirometria, audiometria e visita ergonometrica.',
      inailOt23Saving: 'Fino al 28% di riduzione del tasso di tariffa INAIL (Interventi A-1, B-1, C-1)',
    },
    {
      id: 'cantieri',
      name: 'Cantieri, Edilizia e Impianti',
      icon: HardHat,
      ateco: 'ATECO F (41–43) • Costruzioni & Impiantistica',
      riskLevel: 'Alto',
      riskBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      dvrObligations: [
        'Piano Operativo di Sicurezza (POS) specifico per ogni cantiere',
        'Piano di Sicurezza e Coordinamento (PSC) e Fascicolo dell’Opera',
        'Piano di Montaggio, Uso e Smontaggio Ponteggi (PIMUS)',
        'Verifica idoneità tecnico-professionale subappaltatori (Allegato XVII)',
      ],
      instrumentalAssessments: [
        'Rischio caduta dall’alto e linee vita (Titolo IV Capo II)',
        'Valutazione Rischio Rumore e Vibrazioni da attrezzi pneumatici ed escavatori',
        'Valutazione Rischio Amianto e Fibre Artificiali Vetrose (FAV)',
        'Verifica impianti di messa a terra di cantiere (DPR 462/01)',
      ],
      mandatoryCourses: [
        'Formazione Lavoratori Rischio Alto (16 ore)',
        'Lavori in Quota e DPI di 3ª Categoria Anticaduta con addestramento pratico (8h)',
        'Corso Montaggio/Smontaggio Ponteggi (28 ore) e Addetto PLE',
        'Coordinatore per la Sicurezza CSP/CSE (120 ore + aggiornamento 40h)',
      ],
      healthSurveillance:
        'Visite mediche specialistiche con accertamento assenza tossicodipendenze per mansioni a rischio terzi.',
      inailOt23Saving: 'Fino al 28% di riduzione con adozione di sistemi anticaduta avanzati e MOG 231',
    },
    {
      id: 'uffici',
      name: 'Uffici, Studi e Servizi',
      icon: Building,
      ateco: 'ATECO J, K, M, N (62–82) • Terziario & Consulenza',
      riskLevel: 'Basso',
      riskBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dvrObligations: [
        'DVR Uffici con particolare attenzione all’ergonomia delle postazioni',
        'Valutazione Stress Lavoro-Correlato (Metodo INAIL)',
        'Regolamento e informativa sicurezza per lavoratori in Smart Working',
        'Designazione e formazione squadra emergenze (Primo Soccorso e Antincendio)',
      ],
      instrumentalAssessments: [
        'Verifica conformità microclimatica (temperatura, umidità relativa, ricambi d’aria)',
        'Rilevazione illuminamento artificiale e naturale (UNI EN 12464-1)',
        'Valutazione uso videoterminali VDT (oltre 20 ore settimanali)',
      ],
      mandatoryCourses: [
        'Formazione Lavoratori Rischio Basso (8 ore: 4h Generale + 4h Specifica)',
        'Addetto Primo Soccorso Aziende Gruppo B-C (12 ore)',
        'Addetto Antincendio Livello 1 (4 ore)',
        'Rappresentante dei Lavoratori per la Sicurezza RLS (32 ore)',
      ],
      healthSurveillance:
        'Visita medica quinquennale o biennale per i lavoratori videoterminalisti conformemente all’art. 176.',
      inailOt23Saving: 'Fino al 10–15% di riduzione per piani di welfare aziendale e cardio-protezione DAE',
    },
    {
      id: 'chimica',
      name: 'Chimica, Pharma e Laboratori',
      icon: FlaskConical,
      ateco: 'ATECO C20–C21 • Farmaceutica & Sintesi Chimica',
      riskLevel: 'Alto',
      riskBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      dvrObligations: [
        'Valutazione Rischio Chimico per la salute e sicurezza (Titolo IX Capo I)',
        'Valutazione Rischio Agenti Cancerogeni e Mutageni con registro esposti',
        'Schede Dati di Sicurezza (SDS) conformi a Regolamento REACH e CLP',
        'Valutazione compatibilità stoccaggio sostanze pericolose e bacini di contenimento',
      ],
      instrumentalAssessments: [
        'Campionamento aerodispersi e monitoraggio ambientale con laboratori certificati',
        'Valutazione delle cappe di aspirazione e velocità di cattura (UNI EN 14175)',
        'Verifica DPI respiratori (facciali filtranti, maschere con filtri gas/vapori)',
      ],
      mandatoryCourses: [
        'Formazione Lavoratori Rischio Alto (16 ore) con modulo specialistico chimico',
        'Addestramento uso DPI 3ª Categoria respiratori ed emergenza sversamenti',
        'Corso Antincendio Livello 3 con gestione sostanze infiammabili',
        'Gestione Primo Soccorso Chimico con docenti medici specialisti',
      ],
      healthSurveillance:
        'Monitoraggio biologico stretto con dosaggio metaboliti urinari e markers di assorbimento specifici.',
      inailOt23Saving: 'Fino al 28% con sostituzione agenti cancerogeni e certificazione ISO 45001',
    },
    {
      id: 'logistica',
      name: 'Logistica, Magazzini e Trasporti',
      icon: Truck,
      ateco: 'ATECO H (49–53) • Magazzinaggio & Hub Intermodali',
      riskLevel: 'Medio',
      riskBadgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      dvrObligations: [
        'Piano di circolazione interna e viabilità pedoni/mezzi (segnaletica orizzontale/verticale)',
        'Verifica periodica integrità scaffalature industriali metalliche (UNI EN 15635)',
        'Valutazione movimentazione manuale dei carichi (sollevamento, traino e spinta)',
        'Gestione interferenze ditte esterne e autotrasportatori (DUVRI / Regolamento)',
      ],
      instrumentalAssessments: [
        'Verifica illuminamento corridoi di stoccaggio e baie di carico',
        'Valutazione vibrazioni trasmesse al corpo intero per carrellisti (WBV)',
        'Controllo fumi di scarico o emissioni ricarica batterie muletti (Idrogeno)',
      ],
      mandatoryCourses: [
        'Formazione Lavoratori Rischio Medio (12 ore)',
        'Abilitazione Carrellisti / Mulettisti (12 ore con prova pratica su circuito)',
        'Addestramento uso PLE per prelievo merci in quota',
        'Primo Soccorso Aziendale Gruppo A o B (12–16 ore)',
      ],
      healthSurveillance:
        'Visita annuale con screening droghe e alcool per addetti alla conduzione di carrelli e mezzi di trasporto.',
      inailOt23Saving: 'Fino al 20–28% con introduzione di sistemi radar anticollisione su carrelli elevatori',
    },
  ];

  const currentSector = sectors.find((s) => s.id === selectedSectorId) || sectors[0];

  return (
    <section id="architettura-servizi" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header 1: Architettura dei Servizi */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
            PORTFOLIO OPERATIVO
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
            Architettura dei Servizi E.M Safety
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Tre pilastri integrati per proteggere il datore di lavoro, i lavoratori e la continuità operativa dell’impresa.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {architectureServices.map((srv, index) => {
            const Icon = srv.icon;
            const isSelected = selectedService === index;
            return (
              <motion.div
                key={srv.id}
                onClick={() => setSelectedService(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 sm:p-8 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-50 border-[#1B4332] shadow-lg ring-1 ring-[#1B4332]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#1B4332] text-white'
                          : 'bg-slate-100 text-[#0B192C]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-slate-400">
                    {srv.badge}
                  </span>

                  <h3 className="text-xl font-bold text-[#0B192C] tracking-tight">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-200">
                    {srv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Header 2: Mappatura degli Obblighi per Settore Produttivo */}
        <div className="pt-6 border-t border-slate-200">
          <div className="max-w-3xl space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>Diagnosi Regolamentare Dinamica</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
              Mappatura degli Obblighi per Settore Produttivo
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Seleziona il tuo comparto merceologico per visualizzare immediatamente gli adempimenti di legge inderogabili, le misurazioni strumentali richieste e le opportunità di sgravio contributivo INAIL.
            </p>
          </div>

          {/* Industry Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              const isActive = sector.id === selectedSectorId;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSectorId(sector.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E5A93C]' : 'text-slate-500'}`} />
                  <span>{sector.name}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Industry Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSector.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm"
            >
              {/* Sector Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C]">
                      {currentSector.name}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentSector.riskBadgeColor}`}>
                      Rischio {currentSector.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-slate-500 font-medium">
                    {currentSector.ateco}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
                  <Award className="w-4 h-4 text-[#E5A93C]" />
                  <span>{currentSector.inailOt23Saving}</span>
                </div>
              </div>

              {/* Obligations 3-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
                {/* Column 1: DVR & Adempimenti Documentali */}
                <div className="space-y-3 bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#0B192C]">
                    <FileText className="w-4 h-4 text-[#1B4332]" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">
                      Adempimenti DVR & Documenti
                    </h4>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    {currentSector.dvrObligations.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Misure Strumentali di Campo */}
                <div className="space-y-3 bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#0B192C]">
                    <Activity className="w-4 h-4 text-[#1B4332]" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">
                      Rilievi Strumentali Tecnici
                    </h4>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    {currentSector.instrumentalAssessments.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Formazione Obbligatoria & Sorveglianza */}
                <div className="space-y-3 bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#0B192C]">
                    <GraduationCap className="w-4 h-4 text-[#1B4332]" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">
                      Corsi Obbligatori & Sanità
                    </h4>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    {currentSector.mandatoryCourses.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
                    <strong className="text-slate-700 block mb-0.5">Sorveglianza Sanitaria:</strong>
                    {currentSector.healthSurveillance}
                  </div>
                </div>
              </div>

              {/* Bottom Sector CTA */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-600">
                  Hai una sede nel comparto <strong>{currentSector.name}</strong>? I nostri tecnici effettuano audit preventivi gratuiti per rilevare scadenze e non conformità.
                </p>

                <button
                  onClick={() => onRequestQuoteForSector && onRequestQuoteForSector(currentSector.name)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#1B4332] hover:bg-[#143326] transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <span>Richiedi Check-Up per {currentSector.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

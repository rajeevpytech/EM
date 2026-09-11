import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Award,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Target,
  Sparkles,
  Phone,
  Flame,
  Activity,
  Layers,
  HardHat,
  BadgePercent,
  Search,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
  onOpenQuote: (serviceTitle?: string) => void;
  onOpenCourses: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenQuote,
  onOpenCourses,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('rspp');

  const services = [
    {
      id: 'rspp',
      title: 'Incarico RSPP Esterno & Presidio Legale D.Lgs. 81/08',
      shortTitle: 'RSPP Esterno & DVR',
      badge: 'Tutela Penale Datore di Lavoro',
      icon: ShieldCheck,
      color: 'border-blue-500 text-[#0A66C2] bg-blue-50',
      summary:
        'Assunzione formale dell’incarico di Responsabile del Servizio di Prevenzione e Protezione (RSPP) da parte di ingegneri e tecnici abilitati per tutti i macrosettori ATECO.',
      deliverables: [
        'Redazione e aggiornamento continuo del Documento di Valutazione dei Rischi (DVR)',
        'Sopralluoghi periodici documentati nei reparti con verbali di audit operativi',
        'Presenza garantita e gestione tecnica durante le ispezioni di SPISAL, ATS, ITL e VVF',
        'Stesura del Piano di Miglioramento della sicurezza e monitoraggio attuazione',
        'Coordinamento della riunione periodica di sicurezza (Art. 35 D.Lgs. 81/08)',
      ],
      suitableFor: 'Aziende manifatturiere, chimiche, logistiche edili e del terziario da 5 a 1.000+ dipendenti.',
      metricHighlight: '100%',
      metricLabel: 'conformità negli audit ispettivi dei nostri clienti',
    },
    {
      id: 'rilievi',
      title: 'Rilievi Strumentali & Laboratorio Igiene Industriale',
      shortTitle: 'Rilievi Strumentali & Rumore',
      badge: 'Strumentazione Certificata Classe 1',
      icon: Activity,
      color: 'border-cyan-500 text-cyan-700 bg-cyan-50',
      summary:
        'Misurazioni fisiche e ambientali sui luoghi di lavoro con fonometri integratori, accelerometri triassiali e campionatori d’aria conformi alle norme UNI EN ISO.',
      deliverables: [
        'Valutazione del rischio Rumore (fonometria) con perizia asseverata da Tecnico Competente TCAA',
        'Misurazione Vibrazioni sistema Mano-Braccio (HAV) e Corpo Intero (WBV)',
        'Campionamenti aerodispersi polveri, solventi, fumi di saldatura e sostanze cancerogene',
        'Valutazione Rischio Chimico analitico con algoritmi MoVaRisCh / Chemiorisk e CLP/REACH',
        'Misure di Microclima (ambienti moderati, caldi e freddi) e Illuminamento (UNI EN 12464)',
      ],
      suitableFor: 'Officine meccaniche, fonderie, falegnamerie, laboratori chimici e magazzini ad alta movimentazione.',
      metricHighlight: '10 giorni',
      metricLabel: 'tempo medio di consegna della relazione tecnica asseverata',
    },
    {
      id: 'iso',
      title: 'Sistemi di Gestione Integrati (ISO 45001, ISO 14001, ISO 9001)',
      shortTitle: 'Sistemi ISO & MOG 231',
      badge: 'Esenzione Responsabilità D.Lgs. 231/01',
      icon: Layers,
      color: 'border-emerald-500 text-emerald-700 bg-emerald-50',
      summary:
        'Progettazione, implementazione e accompagnamento alla certificazione dei Sistemi di Gestione della Sicurezza (ISO 45001), Ambientale (ISO 14001) e Qualità (ISO 9001).',
      deliverables: [
        'Audit iniziale di Gap Analysis per quantificare la distanza dai requisiti della norma',
        'Elaborazione delle procedure gestionali, matrici di rischio e mansionari operativi',
        'Esecuzione degli Audit Interni di conformità prima della verifica dell’ente terzo',
        'Assistenza diretta durante la visita ispettiva dell’organismo accreditato Accredia',
        'Integrazione con i Modelli di Organizzazione e Gestione ex D.Lgs. 231/2001',
      ],
      suitableFor: 'Imprese orientate a gare pubbliche, appalti internazionali e massima solidità patrimoniale.',
      metricHighlight: '100%',
      metricLabel: 'successo al primo passaggio dell’audit di certificazione',
    },
    {
      id: 'antincendio',
      title: 'Prevenzione Incendi, Pratiche SCIA VVF & Piani di Emergenza',
      shortTitle: 'Antincendio & SCIA VVF',
      badge: 'Professionisti Antincendio Ex L. 818/84',
      icon: Flame,
      color: 'border-orange-500 text-orange-700 bg-orange-50',
      summary:
        'Valutazione del rischio incendio secondo il Nuovo Codice (D.M. 03/09/2021) e progettazione antincendio completa per l’ottenimento del Certificato di Prevenzione Incendi (CPI).',
      deliverables: [
        'Valutazione del carico di incendio e classificazione del livello di rischio dei comparti',
        'Redazione del Piano di Emergenza ed Evacuazione (PEE) e planimetrie orientate di emergenza',
        'Organizzazione e verbalizzazione delle prove pratiche annuali di esodo con i lavoratori',
        'Progettazione impianti antincendio (idranti, sprinkler, rilevazione fumo e fumi caldi)',
        'Pratiche telematiche SCIA Antincendio e Rinnovo Periodico di Conformità Antincendio',
      ],
      suitableFor: 'Attività soggette ai controlli di prevenzione incendi (D.P.R. 151/2011) e qualsiasi luogo di lavoro.',
      metricHighlight: 'Zero fermi',
      metricLabel: 'operativi durante i rinnovi di conformità antincendio VVF',
    },
    {
      id: 'inail',
      title: 'Sgravio Tariffario INAIL OT23 & Agevolazioni Economiche',
      shortTitle: 'Sgravio INAIL OT23',
      badge: 'Fino al 28% di Riduzione sul Premio',
      icon: BadgePercent,
      color: 'border-indigo-500 text-indigo-700 bg-indigo-50',
      summary:
        'Recupero economico concreto degli investimenti in sicurezza tramite la riduzione del tasso medio di tariffa INAIL (Modello OT23) per interventi migliorativi.',
      deliverables: [
        'Calcolo preventivo del punteggio raggiungibile (minimo 100 punti) in base agli interventi attuati',
        'Selezione degli interventi strategici più rapidi ed economici da implementare nell’anno solare',
        'Raccolta, asseverazione e caricamento telematico dei documenti probatori sul portale INAIL',
        'Monitoraggio dell’istruttoria fino all’effettivo accredito dello sgravio in busta paga aziendale',
        'Piani di formazione gratuita finanziata al 100% tramite Fondi Paritetici Interprofessionali',
      ],
      suitableFor: 'Tutte le aziende iscritte all’INAIL che investono in prevenzione e formazione certificata.',
      metricHighlight: '€ 40k+',
      metricLabel: 'risparmio medio annuo per aziende manifatturiere medio-grandi',
    },
    {
      id: 'cantieri',
      title: 'Sicurezza Cantieri Temporanei o Mobili (Titolo IV D.Lgs. 81/08)',
      shortTitle: 'Coordinamento Cantieri CSP/CSE',
      badge: 'Ingegneri Qualificati CSP/CSE',
      icon: HardHat,
      color: 'border-amber-500 text-amber-800 bg-amber-50',
      summary:
        'Coordinamento della sicurezza per committenti pubblici e privati in fase di progettazione ed esecuzione lavori per opere edili, impiantistiche e infrastrutturali.',
      deliverables: [
        'Redazione del Piano di Sicurezza e Coordinamento (PSC) e Fascicolo dell’Opera adattato',
        'Verifica preliminare e continua dell’idoneità tecnico-professionale di imprese e lavoratori autonomi',
        'Sopralluoghi settimanali in cantiere con redazione di verbali di coordinamento vincolanti',
        'Gestione delle interferenze e controllo scrupoloso di ponteggi, linee vita e opere provvisionali',
        'Redazione Piani Operativi di Sicurezza (POS) e Piani di Montaggio, Uso e Smontaggio (Pi.M.U.S.)',
      ],
      suitableFor: 'General contractor, stazioni appaltanti, imprese di costruzioni e impianti tecnologici.',
      metricHighlight: 'Zero infortuni',
      metricLabel: 'gravi sui cantieri seguiti dai nostri coordinatori',
    },
  ];

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#1c2923] pt-6 pb-20">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#0A66C2] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0B192C]">Servizi SGI & Consulenza 81/08</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white py-16 sm:py-20 border-b border-[#1E3E62]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-[#70B5F9]/40 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Consulenza Direzionale & Ingegneria della Sicurezza</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Proteggiamo la tua impresa con perizie concrete, non con faldoni burocratici
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-ui">
              Dall’incarico formale di RSPP Esterno alle indagini strumentali di laboratorio, certificazioni ISO 45001 e sgravi INAIL OT23. Un presidio operativo garantito nelle sedi di Treviso e Milano.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Richiedi Audit Preliminare Gratuito</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenContact}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#152B44] hover:bg-[#1E3E62] text-white border border-slate-700 transition-all cursor-pointer"
              >
                Parla con un Tecnico
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Explorer */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C]">
            Le Nostre 6 Aree di Consulenza Specialistica
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Seleziona un ambito per visualizzare le prestazioni erogate, i deliverable tecnici e i vantaggi per la tua azienda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Buttons */}
          <div className="lg:col-span-4 space-y-2.5">
            {services.map((srv) => {
              const Icon = srv.icon;
              const isSelected = srv.id === selectedServiceId;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#0A66C2] text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold leading-snug">
                        {srv.shortTitle}
                      </span>
                      <span
                        className={`block text-[10px] ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {srv.badge}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'translate-x-1 text-orange-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}

            {/* Support Box */}
            <div className="mt-6 p-5 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A66C2] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-orange-500" />
                Non sai quale servizio ti serve?
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-sans-ui">
                I nostri consulenti eseguono un'analisi preliminare di conformità per identificare priorità, scadenze e agevolazioni attivabili.
              </p>
              <button
                type="button"
                onClick={onOpenContact}
                className="w-full py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold text-center transition-colors cursor-pointer shadow-xs"
              >
                Richiedi Chiamata Tecnica
              </button>
            </div>
          </div>

          {/* Right Service Detail Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#0A66C2] mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  {currentService.badge}
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C] leading-tight">
                  {currentService.title}
                </h3>
              </div>

              {/* Metric Card */}
              <div className="shrink-0 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center min-w-[120px]">
                <span className="block text-2xl sm:text-3xl font-black text-[#0A66C2]">
                  {currentService.metricHighlight}
                </span>
                <span className="block text-[10px] font-bold text-slate-600 leading-tight mt-0.5">
                  {currentService.metricLabel}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-slate-700 leading-relaxed font-sans-ui">
              {currentService.summary}
            </p>

            {/* Deliverables */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
                Cosa Include il Nostro Intervento (Deliverables):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentService.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable For */}
            <div className="p-4 bg-slate-100/70 rounded-xl border-l-4 border-[#0A66C2] text-xs text-slate-700">
              <strong className="text-slate-900 block mb-1">Aziende Destinatarie:</strong>
              {currentService.suitableFor}
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onOpenQuote(`Servizio Selezionato: ${currentService.title}`)}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Richiedi Preventivo per Questo Servizio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenCourses}
                className="text-xs font-bold text-slate-600 hover:text-[#0A66C2] underline cursor-pointer"
              >
                Vedi i corsi formativi correlati &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-12 border border-[#1E3E62] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Presidio Operativo nelle Tue Sedi
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Pronto a mettere in sicurezza la tua azienda e i tuoi collaboratori?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans-ui">
              Contatta oggi stesso i nostri uffici di Treviso e Milano. Risposta garantita entro 24 ore lavorative.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition-colors cursor-pointer"
            >
              Richiedi Preventivo Rapido
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#152B44] hover:bg-[#1E3E62] text-white border border-slate-700 transition-colors cursor-pointer"
            >
              Contatta Sede
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

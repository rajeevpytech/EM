import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  History,
  Calendar,
  Compass,
  ShieldCheck,
  Building2,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  FileCheck,
  Scale,
  MapPin,
  TrendingUp,
  Cpu,
  Flame,
  ChevronRight,
} from 'lucide-react';

interface OurStoryPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
  onOpenCourses: () => void;
}

interface StoryEra {
  id: string;
  eraRange: string;
  title: string;
  subtitle: string;
  themeColor: string;
  badge: string;
  image: string;
  narrative: string;
  keyInnovations: string[];
  historicalLawContext: string;
  impactMetric: string;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenCourses,
}) => {
  const [activeEraId, setActiveEraId] = useState<string>('1994');

  const eras: StoryEra[] = [
    {
      id: '1994',
      eraRange: '1994 - 2000',
      title: 'Le Origini & La Rivoluzione della 626',
      subtitle: 'Dalla carta all’ingegneria del lavoro nel cuore produttivo del Veneto',
      themeColor: '#0A66C2',
      badge: 'Capitolo 01 • La Fondazione',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
      narrative:
        "Nel 1994 l'Italia recepisce le direttive comunitarie emanando lo storico D.Lgs. 626/94. Per la prima volta, la sicurezza non è solo prevenzione infortuni passiva, ma organizzazione aziendale, valutazione del rischio (DVR) e formazione. E.M. Safety nasce a Treviso su iniziativa di un gruppo di giovani ingegneri con una convinzione radicale: la sicurezza sul lavoro non deve essere un fardello burocratico, bensì una scienza di precisione a salvaguardia delle persone e della continuità aziendale.",
      keyInnovations: [
        'Prima metodologia proprietaria per la mappatura dei rischi di reparto',
        'Stesura dei primi Documenti di Valutazione dei Rischi (DVR) analitici per il distretto metalmeccanico veneto',
        'Introduzione del principio di affiancamento costante con RSPP dedicato in stabilimento',
      ],
      historicalLawContext:
        'Entrata in vigore del D.Lgs. 626/94 e obbligo per i datori di lavoro di redigere il documento di valutazione dei rischi e nominare il medico competente.',
      impactMetric: '150+ stabilimenti industriali resi conformi nei primi 5 anni',
    },
    {
      id: '2008',
      eraRange: '2001 - 2012',
      title: 'Il Testo Unico D.Lgs. 81/08 & Igiene Industriale',
      subtitle: 'La nascita del laboratorio strumentale e la tutela penale dell’imprenditore',
      themeColor: '#0B192C',
      badge: 'Capitolo 02 • Consolidamento Tecnico',
      image: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=900&q=80',
      narrative:
        "Con l'entrata in vigore del D.Lgs. 81/08 (Testo Unico sulla Sicurezza) e l'introduzione della responsabilità amministrativa degli enti (D.Lgs. 231/01), il rischio per i datori di lavoro si fa stringente. E.M. Safety compie un salto tecnologico: acquisisce strumentazioni di classe 1 per rilievi fonometrici, vibrazioni corpo intero/mano-braccio, campi elettromagnetici e campionamenti chimici, offrendo perizie inoppugnabili di fronte agli organi ispettivi.",
      keyInnovations: [
        'Divisione interna specializzata in Rilievi Strumentali di Igiene Industriale certificati',
        'Modelli di Organizzazione e Gestione (MOG 231) specifici per la sicurezza sul lavoro',
        'Protocollo di difesa e tutela preventiva per la dirigenza e i preposti aziendali',
      ],
      historicalLawContext:
        'D.Lgs. 81/08 e D.Lgs. 106/09: unificazione delle norme prevenzionistiche e inasprimento delle sanzioni penali e interdittive.',
      impactMetric: '0 condanne o prescrizioni penali confermate per le aziende seguite con RSPP esterno',
    },
    {
      id: '2013',
      eraRange: '2013 - 2020',
      title: 'Accreditamenti Nazionali & L’Hub di Milano',
      subtitle: 'Dalla consulenza locale all’accreditamento nazionale ANFOS, O.P.N. e Sede Porta Nuova',
      themeColor: '#1E3E62',
      badge: 'Capitolo 03 • Riconoscimento Istituzionale',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
      narrative:
        "La crescita continua impone una struttura di rango nazionale. E.M. Safety diventa Centro di Formazione e Sede Territoriale Periferica ANFOS (Legge 4/2013), stringe accordi bilaterali con O.P.N. Italia Lavoro e integra i protocolli internazionali DAN per il primo soccorso avanzato. Nel 2018 inaugura la sede di Milano in Piazza Gae Aulenti (Porta Nuova) per coordinare i grandi gruppi multinazionali e il terziario avanzato lombardo.",
      keyInnovations: [
        'Attestati con validità legale diretta su tutto il territorio nazionale ai sensi dell’Accordo Stato-Regioni',
        'Apertura della Direzione Nazionale a Milano per servire il polo economico lombardo',
        'Realizzazione a Treviso del primo campo prove con ponteggi, spazi confinati e carrelli elevatori',
      ],
      historicalLawContext:
        'Accordi Stato-Regioni 2011/2012/2016 per la formazione obbligatoria di lavoratori, preposti, dirigenti, RSPP e addetti attrezzature.',
      impactMetric: 'Oltre 30.000 lavoratori addestrati con metodo pratico-esperienziale',
    },
    {
      id: '2026',
      eraRange: '2021 - 2026+',
      title: 'Ecosistema Cloud & Il Nuovo Accordo 2026',
      subtitle: 'Sicurezza preventiva intelligente, sgravi INAIL OT23 e conformità predittiva',
      themeColor: '#0A66C2',
      badge: 'Capitolo 04 • La Sicurezza del Futuro',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=900&q=80',
      narrative:
        "Oggi E.M. Safety gestisce oltre 450 contratti continuativi di RSPP esterno e compliance integrata SGI (ISO 45001, ISO 9001, ISO 14001). Con l'entrata in vigore del Nuovo Accordo Stato-Regioni 2026 (obbligo formativo quinquennale per tutti i Datori di Lavoro ed estensione addestramento), lanciamo la nostra suite Cloud per la gestione scadenziari e il primo Simulatore Interattivo di conformità per le imprese italiane.",
      keyInnovations: [
        'Area Clienti Cloud proprietaria con scadenziario real-time di visite mediche e attestati',
        'Simulatore Interattivo Nuovo Accordo 2026 per stimare fabbisogno formativo e scadenze',
        'Programmi speciali per lo Sgravio Tariffario INAIL Modello OT23 (fino al 28% di risparmio annuo)',
      ],
      historicalLawContext:
        'Entrata a regime del Nuovo Accordo Stato-Regioni 2026 con obbligo di formazione per il Datore di Lavoro e stretta sulle verifiche ispettive.',
      impactMetric: 'Oltre €420.000 risparmiati dai clienti in premi assicurativi INAIL solo nell’ultimo triennio',
    },
  ];

  const currentEra = eras.find((e) => e.id === activeEraId) || eras[0];

  const pillars = [
    {
      icon: Scale,
      title: 'Ingegneria, Non Burocrazia',
      text: 'Non riempiamo faldoni per lasciarli prendere polvere. Ogni procedura nasce per ottimizzare i flussi di fabbrica e cantiere.',
    },
    {
      icon: ShieldCheck,
      title: 'Assunzione di Responsabilità',
      text: 'Con il ruolo di RSPP Esterno mettiamo la nostra firma a garanzia e scudo del Datore di Lavoro e del Consiglio di Amministrazione.',
    },
    {
      icon: Users,
      title: 'Addestramento Esperienziale',
      text: 'Nei nostri campi prove e nelle aule dedicate di Treviso e Milano insegniamo a manovrare, intervenire e salvare vite con simulatori reali.',
    },
    {
      icon: Cpu,
      title: 'Controllo Digitale Continuo',
      text: 'La nostra piattaforma Cloud monitora giorno per giorno idoneità sanitarie, corsi e manutenzioni senza rischio di prescrizione.',
    },
  ];

  const stats = [
    { num: '1994', label: 'Anno di Fondazione', desc: '32 anni di esperienza continua' },
    { num: '1.800+', label: 'Aziende Servite', desc: 'In Veneto, Lombardia e Nord Italia' },
    { num: '45.000+', label: 'Lavoratori Formati', desc: 'Attestati ANFOS con piena validità legale' },
    { num: '100%', label: 'Conformità Ispettiva', desc: 'Presidio tempestivo h24 su verbali e audit' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#1c2923] pt-6 pb-24">
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
          <span className="text-[#0B192C]">La Nostra Storia (1994 - 2026)</span>
        </div>
      </div>

      {/* Hero Header with Animated Motion */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white py-16 sm:py-24 border-b border-[#1E3E62]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#0A66C2]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-[#70B5F9]/40 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <History className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Trentadue Anni di Cultura della Sicurezza sul Lavoro</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              La Nostra Storia: <br className="hidden sm:inline" />
              Da Pionieri a Riferimento Nazionale
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-ui">
              Dal 1994 a oggi abbiamo attraversato ogni rivoluzione normativa della sicurezza sul lavoro in Italia. Abbiamo visto nascere il D.Lgs. 626/94, maturare il D.Lgs. 81/08 e ora guidiamo le imprese verso il Nuovo Accordo Stato-Regioni 2026.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Counter Stats Ribbon */}
      <section className="bg-white border-b border-slate-200 py-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center sm:text-left border-l-2 border-[#0A66C2]/40 pl-4 space-y-1"
              >
                <div className="font-mono text-3xl sm:text-4xl font-black text-[#0B192C]">
                  {s.num}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {s.label}
                </div>
                <p className="text-[11px] text-slate-500">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Animated Timeline Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
            CRONISTORIA INTERATTIVA
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B192C]">
            Le 4 Grandi Ere della Nostra Evoluzione
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Clicca su ciascuna era per esplorare le tappe tecnologiche, le risposte alle normative storiche e l'impatto reale sulle fabbriche italiane.
          </p>
        </div>

        {/* Timeline Era Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {eras.map((era) => {
            const isSelected = era.id === activeEraId;
            return (
              <button
                key={era.id}
                onClick={() => setActiveEraId(era.id)}
                className={`relative px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-lg shadow-slate-900/10 scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-[#0A66C2] animate-pulse' : 'bg-slate-300'
                    }`}
                  />
                  <span>{era.eraRange}</span>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="eraIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#0B192C] [clip-path:polygon(50%_100%,0_0,100%_0)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Era Interactive Card with Motion Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEra.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left visual representation */}
              <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto min-h-[320px] bg-slate-100 overflow-hidden">
                <img
                  src={currentEra.image}
                  alt={currentEra.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-[#0B192C]/30 to-transparent" />

                {/* Floating Era Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-[#0B192C] shadow-md">
                    {currentEra.badge}
                  </span>
                </div>

                {/* Impact metric badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0B192C]/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#70B5F9] block mb-1">
                    RISULTATO CONCRETO SUL CAMPO
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-100">
                    {currentEra.impactMetric}
                  </p>
                </div>
              </div>

              {/* Right text content */}
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-black text-[#0A66C2]">
                      {currentEra.eraRange}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Tappa Fondamentale
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C] mb-2">
                    {currentEra.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-4">
                    {currentEra.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans-ui mb-6">
                    {currentEra.narrative}
                  </p>

                  {/* Context of Italian Safety Law */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                      <Scale className="w-4 h-4 text-[#0A66C2]" />
                      <span>Quadro Normativo dell'Epoca</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {currentEra.historicalLawContext}
                    </p>
                  </div>

                  {/* Key innovations list */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B192C] block">
                      Cosa Abbiamo Introdotto:
                    </span>
                    <ul className="space-y-2">
                      {currentEra.keyInnovations.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0A66C2] hover:text-[#004182] transition-colors cursor-pointer"
                  >
                    <span>Richiedi consulenza con i nostri ingegneri storici</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenCourses}
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Vedi Catalogo Corsi
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Comparison: How Safety Evolved (1994 vs 2008 vs 2026) */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              ANALISI NORMATIVA
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C]">
              Come è Cambiata la Sicurezza in 30 Anni
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Il confronto sintetico fra le tre epoche che hanno ridefinito le responsabilità del datore di lavoro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1994 D.Lgs 626 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xl font-mono font-black text-slate-400">1994</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  D.Lgs. 626/94
                </span>
              </div>
              <h4 className="font-serif-display text-lg font-bold text-[#0B192C]">
                L'Inizio della Prevenzione Attiva
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• Obbligo del Documento di Valutazione dei Rischi</li>
                <li>• Nascita della figura del RSPP e RLS</li>
                <li>• Introduzione della sorveglianza sanitaria obbligatoria</li>
                <li>• Approccio prevalentemente documentale e formale</li>
              </ul>
            </div>

            {/* 2008 D.Lgs 81 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xl font-mono font-black text-[#1E3E62]">2008</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#1E3E62]">
                  D.Lgs. 81/08
                </span>
              </div>
              <h4 className="font-serif-display text-lg font-bold text-[#0B192C]">
                Il Testo Unico e la Penale
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• Integrazione della Responsabilità Amministrativa 231</li>
                <li>• Obbligo di rilievi strumentali (rumore, vibrazioni, chimico)</li>
                <li>• Sanzioni penali pecuniarie e detentive per datori e dirigenti</li>
                <li>• Coordinamento stringente nei cantieri temporanei (Titolo IV)</li>
              </ul>
            </div>

            {/* 2026 Nuovo Accordo */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#0A66C2] shadow-lg space-y-4 relative">
              <div className="absolute -top-3 right-6 bg-[#0A66C2] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                In Vigore Oggi
              </div>
              <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                <span className="text-xl font-mono font-black text-[#0A66C2]">2026</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#0A66C2]">
                  Nuovo Accordo
                </span>
              </div>
              <h4 className="font-serif-display text-lg font-bold text-[#0B192C]">
                La Sicurezza Comportamentale
              </h4>
              <ul className="text-xs text-slate-700 space-y-2 font-medium">
                <li>• Obbligo di formazione per TUTTI i Datori di Lavoro</li>
                <li>• Addestramento pratico documentato su attrezzature e DPI 3a categoria</li>
                <li>• Monitoraggio Cloud continuo delle scadenze e patentini</li>
                <li>• Sgravi INAIL OT23 mirati ad investimenti reali</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Fundamental Pillars */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
            I NOSTRI PILASTRI
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B192C]">
            Ciò Che Non È Mai Cambiato Dal Primo Giorno
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Le leggi si sono aggiornate, le tecnologie sono passate dal tecnigrafo al cloud, ma i nostri valori guida restano immutati.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0A66C2]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0A66C2] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-[#0B192C]">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans-ui">
                    {p.text}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-[#0A66C2]">
                  <span>Valore Fondante</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Operational Hubs: Treviso & Milano */}
      <section className="py-16 bg-[#0B192C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#70B5F9]">
                DUE POLI STRATEGICI
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold leading-tight">
                Dalle radici venete alla piazza di Milano
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-ui">
                A Treviso batte il cuore operativo con le aule didattiche, il campo prove per carrelli e lavori in quota e il laboratorio rilievi. A Milano, in Porta Nuova, opera la nostra direzione ingegneristica per il coordinamento di grandi gruppi e multinazionali.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] font-bold text-xs uppercase tracking-wider text-white transition-colors cursor-pointer text-center"
                >
                  Fissa un Incontro in Sede
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Treviso Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#70B5F9]">SEDE STORICA & CAMPO PROVE</span>
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="font-serif-display text-xl font-bold text-white">Treviso</h4>
                <p className="text-xs text-slate-300">
                  Via delle Industrie, 42 • 31100 Treviso (TV)
                </p>
                <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1">
                  <div>• Aule accreditate ANFOS</div>
                  <div>• Campo addestramento carrelli & PLE</div>
                  <div>• Laboratorio fonometrie & CEM</div>
                </div>
              </div>

              {/* Milano Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#70B5F9]">DIREZIONE NAZIONALE</span>
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="font-serif-display text-xl font-bold text-white">Milano (Porta Nuova)</h4>
                <p className="text-xs text-slate-300">
                  Piazza Gae Aulenti, 8 • 20124 Milano (MI)
                </p>
                <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1">
                  <div>• Consulenza direzionale & Audit 231</div>
                  <div>• Gestione Grandi Clienti Multisede</div>
                  <div>• Linea Pronto Intervento Ispettivo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B192C]">
          Vuoi scrivere con noi il prossimo capitolo della sicurezza della tua azienda?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Fissa un check-up gratuito con un nostro ingegnere della sicurezza: esaminiamo il tuo DVR, verifichiamo lo scadenziario e ti mostriamo come azzerare i rischi.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenContact}
            className="px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-all shadow-xl cursor-pointer"
          >
            Contatta i Nostri Esperti
          </button>
          <button
            onClick={onNavigateHome}
            className="px-6 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B192C] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Torna alla Home
          </button>
        </div>
      </section>
    </div>
  );
};

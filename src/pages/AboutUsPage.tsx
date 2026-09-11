import React from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  Award,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Target,
  Sparkles,
  Phone,
} from 'lucide-react';
import { AnfosLogo } from '../components/affiliations/AnfosLogo';
import { OpnLogo } from '../components/affiliations/OpnLogo';
import { DanLogo } from '../components/affiliations/DanLogo';

interface AboutUsPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
  onOpenCourses: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenCourses,
}) => {
  const milestones = [
    {
      year: '1994',
      title: 'Fondazione di E.M. Safety',
      description: 'Nascita della società di ingegneria e sicurezza per rispondere all’entrata in vigore del D.Lgs. 626/94 nel polo produttivo veneto.',
    },
    {
      year: '2008',
      title: 'Nuova Era D.Lgs. 81/08',
      description: 'Sviluppo della metodologia proprietaria di Audit Integrato SGI e apertura della divisione Rilievi Strumentali di Igiene Industriale.',
    },
    {
      year: '2013',
      title: 'Accreditamento Nazionale ANFOS',
      description: 'E.M. Safety diventa Centro di Formazione e Sede Territoriale Periferica ANFOS (Legge 4/2013) per il rilascio di attestati legalmente riconosciuti.',
    },
    {
      year: '2018',
      title: 'Sede di Milano & Accordo O.P.N.',
      description: 'Espansione nella piazza economica lombarda con l’apertura degli uffici a Milano e convenzionamento bilaterale con O.P.N. Italia Lavoro.',
    },
    {
      year: '2022',
      title: 'Partnership Internazionale DAN',
      description: 'Integrazione dei protocolli mondiali Divers Alert Network per la formazione avanzata su Primo Soccorso, BLS-D e gestione defibrillatori DAE.',
    },
    {
      year: '2026',
      title: 'Ecosistema Cloud & Nuovo Accordo',
      description: 'Oltre 450 aziende seguite in continuità, piattaforma Cloud proprietaria per la gestione scadenze e lancio del Simulatore Nuovo Accordo Stato-Regioni.',
    },
  ];

  const values = [
    {
      title: 'Approccio Concreto sui Reparti',
      desc: 'Non siamo compilatori di faldoni cartacei. Valutiamo le macchine, i cicli operativi e le abitudini reali delle persone.',
      icon: Target,
    },
    {
      title: 'Responsabilità & Presidio Legale',
      desc: 'Assumiamo incarichi formali di RSPP Esterno tutelando civilmente e penalmente il Datore di Lavoro e la dirigenza.',
      icon: Shield,
    },
    {
      title: 'Trasparenza & Tempi Certificati',
      desc: 'Report chiari senza formule oscure, preventivi definiti a corpo e interventi di urgenza garantiti entro 24-48 ore.',
      icon: CheckCircle2,
    },
    {
      title: 'Formazione che Coinvolge',
      desc: 'Docenti esperti del settore con prove pratiche ed esperienziali che trasformano la percezione della sicurezza in azienda.',
      icon: Users,
    },
  ];

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
          <span className="text-[#0B192C]">Chi Siamo</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white py-16 sm:py-24 border-b border-[#1E3E62]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-[#70B5F9]/40 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <Building2 className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>La Nostra Identità & Storia</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Costruiamo sistemi che trasformano la compliance in valore
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-ui">
              Da oltre trent'anni guidiamo imprese manifatturiere, chimiche, edili e di servizi verso i più elevati standard di sicurezza sul lavoro, igiene industriale e certificazione gestionale.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenContact}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Incontra i Nostri Consulenti</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenCourses}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#152B44] hover:bg-[#1E3E62] text-white border border-slate-700 transition-all cursor-pointer"
              >
                Esplora Catalogo Formazione
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="bg-white border-b border-slate-200 py-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="font-serif-display text-3xl sm:text-4xl font-black text-[#0B192C]">
                30+
              </span>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                Anni di Esperienza sul Campo
              </span>
            </div>
            <div>
              <span className="font-serif-display text-3xl sm:text-4xl font-black text-[#0A66C2]">
                450+
              </span>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                Aziende Clienti Assistite
              </span>
            </div>
            <div>
              <span className="font-serif-display text-3xl sm:text-4xl font-black text-[#0B192C]">
                12.000+
              </span>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                Lavoratori Formati Annualmente
              </span>
            </div>
            <div>
              <span className="font-serif-display text-3xl sm:text-4xl font-black text-[#0A66C2]">
                100%
              </span>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                Conformità Ispettiva Raggiunta
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section with Image */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-4/3 bg-slate-100 relative group">
              <img
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80"
                alt="Consulenti tecnici E.M. Safety sul campo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold uppercase text-[#70B5F9] tracking-wider">
                  TEAM INGEGNERISTICO MULTIDISCIPLINARE
                </span>
                <h4 className="font-serif-display text-xl font-bold">
                  Ingegneri della sicurezza, chimici, fisici e formatori senior
                </h4>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
                LA NOSTRA FILOSOFIA
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B192C]">
                Sicurezza come motore di efficienza, non ostacolo burocratico
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Troppo spesso la conformità al D.Lgs. 81/08 viene percepita come una tassa documentale priva di reale utilità. E.M. Safety è nata per ribaltare questo paradigma.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Quando un reparto lavora in sicurezza, gli infortuni si azzerano, il turnover cala, la reputazione aziendale cresce e i premi assicurativi INAIL scendono fino al 28% grazie alle pratiche OT23 che curiamo direttamente per voi.
            </p>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#0A66C2] shrink-0 mt-0.5" />
              <p className="text-xs text-[#0B192C] font-semibold leading-relaxed">
                "La vera conformità si misura guardando negli occhi gli operai e i preposti quando escono dalla linea produttiva: sanno esattamente come muoversi e cosa fare in ogni circostanza."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Value */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              I NOSTRI PRINCIPI GUIDA
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#0B192C]">
              Cosa rende unico il metodo E.M. Safety
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-[#0A66C2] transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0A66C2]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-[#0B192C]">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
            LA NOSTRA EVOLUZIONE
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B192C]">
            Oltre 30 anni di tappe fondamentali
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#0A66C2] transition-all"
            >
              <div className="h-1 w-full bg-[#0B192C] group-hover:bg-[#0A66C2] absolute top-0 left-0 transition-colors" />
              <div className="text-2xl font-black font-serif-display text-[#0A66C2] mb-2">
                {m.year}
              </div>
              <h3 className="text-base font-bold text-[#0B192C] mb-2">
                {m.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Operative Hubs (Treviso & Milano) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              LE NOSTRE SEDI
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#0B192C]">
              Presenza strategica nei poli industriali
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sede Treviso */}
            <div className="rounded-3xl p-8 bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A66C2]">
                <MapPin className="w-4 h-4" />
                <span>SEDE VENETO & LABORATORIO TECNICO</span>
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#0B192C]">
                Treviso (TV)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Aule didattiche attrezzate, campo prove per carrelli elevatori e PLE, laboratorio di calibrazione strumentale per fonometrie e rilievi vibrazioni.
              </p>
              <div className="pt-2 text-xs text-slate-700 font-semibold space-y-1">
                <p>Via delle Industrie, 42 • Treviso (TV)</p>
                <p>Tel: +39 0422 183 9420 • E-mail: treviso@emsafety.it</p>
              </div>
            </div>

            {/* Sede Milano */}
            <div className="rounded-3xl p-8 bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B192C]">
                <MapPin className="w-4 h-4 text-[#0A66C2]" />
                <span>SEDE LOMBARDIA & DIREZIONE NAZIONALE</span>
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#0B192C]">
                Milano (Porta Nuova)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Uffici di direzione tecnica, divisione Sistemi di Gestione ISO 45001, assistenza grandi gruppi corporate e coordinamento RSPP Lombardia.
              </p>
              <div className="pt-2 text-xs text-slate-700 font-semibold space-y-1">
                <p>Piazza Gae Aulenti, 8 • Milano (MI)</p>
                <p>Tel: +39 02 8719 8920 • E-mail: milano@emsafety.it</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 bg-[#0B192C] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">
            Vuoi approfondire come possiamo affiancare la tua azienda?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            I nostri tecnici sono a disposizione per un audit conoscitivo gratuito presso la vostra sede o in video-conferenza.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0A66C2] hover:bg-[#004182] text-white shadow-xl transition-all cursor-pointer"
            >
              Richiedi Incontro Senza Impegno
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

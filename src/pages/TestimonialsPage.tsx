import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  Quote,
  Building2,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface TestimonialsPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  onNavigateHome,
  onOpenContact,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const testimonials = [
    {
      id: 1,
      name: 'Ing. Roberto Mantovani',
      role: 'Direttore di Stabilimento & Datore di Lavoro',
      company: 'Meccanica Veneta S.p.A. (Metalmeccanica, 240 dipendenti)',
      industry: 'manifattura',
      rating: 5,
      headline: 'Audit SPISAL superato con zero rilievi e una gestione impeccabile del DVR',
      review:
        'Collaboriamo con E.M. Safety da oltre 7 anni. Hanno assunto l’incarico di RSPP Esterno e ristrutturato interamente la nostra valutazione dei rischi sulle linee robotizzate. La loro tempestività e competenza normativa ci ha permesso di affrontare controlli ispettivi con la massima serenità.',
      results: [
        'Zero infortuni con assenza prolungata negli ultimi 3 anni',
        'Audit SPISAL/ATS superato con pieno riscontro di conformità',
        'Sgravio tariffario INAIL OT23 ottenuto consecutivamente ogni anno',
      ],
      date: 'Novembre 2025',
    },
    {
      id: 2,
      name: 'Dott.ssa Laura De Bellis',
      role: 'Responsabile Risorse Umane & Formazione',
      company: 'Logix Nord Ovest S.r.l. (Logistica & Distribuzione, 180 addetti)',
      industry: 'logistica',
      rating: 5,
      headline: 'Formazione carrellisti e primo soccorso DAN che i lavoratori ricordano davvero',
      review:
        'I corsi di formazione per gli operatori di magazzino organizzati da E.M. Safety sono completamente diversi dai soliti noiosi monologhi. Gli istruttori portano casi concreti, simulazioni pratiche con i carrelli e manichini avanzati per il BLS-D. Inoltre, gli attestati con QR Code sono sempre disponibili sul loro portale Cloud in tempo reale.',
      results: [
        'Oltre 120 carrellisti formati e abilitati nei tempi di legge',
        'Scadenziario monitorato automaticamente senza ritardi',
        '100% del costo della formazione coperto con Fondi Interprofessionali',
      ],
      date: 'Gennaio 2026',
    },
    {
      id: 3,
      name: 'Dott. Chim. Alessandro Ferri',
      role: 'HSE Manager',
      company: 'Biotech Polymeric Industries (Chimico, 95 dipendenti)',
      industry: 'chimica',
      rating: 5,
      headline: 'Valutazione rischio chimico e campionamenti fonometrici di altissimo livello',
      review:
        'La precisione tecnica con cui eseguono i rilievi strumentali (fonometrie, vibrazioni e agenti chimici) è ineguagliabile. Relazioni chiare, corredate da grafici esaustivi e indicazioni operative pratiche per i nostri capi reparto, non mere formule teoriche.',
      results: [
        'Mappatura acustica e bonifica su 4 reparti produttivi',
        'Adeguamento completo alle linee guida REACH/CLP',
        'Relazione tecnica certificata consegnata in soli 10 giorni lavorativi',
      ],
      date: 'Febbraio 2026',
    },
    {
      id: 4,
      name: 'Geom. Matteo Zanetti',
      role: 'Titolare & Coordinatore Sicurezza',
      company: 'Edil Costruzioni Trevigiane (Edilizia & Cantieri, 60 addetti)',
      industry: 'costruzioni',
      rating: 5,
      headline: 'POS, PSC e formazione sicurezza cantieri sempre pronti in 24 ore',
      review:
        'Nel nostro settore la reattività è vitale: se apre un cantiere non possiamo aspettare settimane per i piani di sicurezza o per la visita medica. E.M. Safety è per noi un partner strategico irrinunciabile: professionali, disponibili e sempre presenti.',
      results: [
        'Predisposizione fascicoli di cantiere in 24-48 ore',
        'Formazione ponteggi e lavori in quota con addestramento pratico',
        'Assistenza legale continuativa e sopralluoghi periodici',
      ],
      date: 'Dicembre 2025',
    },
    {
      id: 5,
      name: 'Dott.ssa Elena Rinaldi',
      role: 'Operations & Compliance Director',
      company: 'PharmaTech Services Milano (Servizi Sanitari & Laboratori)',
      industry: 'sanita',
      rating: 5,
      headline: 'Implementazione Sistema ISO 45001 e conformità al D.Lgs. 231',
      review:
        'E.M. Safety ci ha guidato passo dopo passo verso la certificazione UNI ISO 45001 integrata con il Modello 231. Hanno semplificato procedure complesse e formato il nostro Organismo di Vigilanza con competenza e garbo.',
      results: [
        'Certificazione ISO 45001 ottenuta al primo audit dell’Ente Terzo',
        'Piena esenzione da responsabilità amministrativa ex D.Lgs. 231/01',
        'Piattaforma digitale condivisa per il monitoraggio dei KPI HSE',
      ],
      date: 'Ottobre 2025',
    },
    {
      id: 6,
      name: 'Marco Vianello',
      role: 'Responsabile Servizio Prevenzione e Protezione Interno',
      company: 'AgriFood Pack S.r.l. (Alimentare, 150 dipendenti)',
      industry: 'manifattura',
      rating: 5,
      headline: 'Un vero supporto per chi fa l’RSPP in azienda',
      review:
        'Anche se abbiamo un RSPP interno, appoggiarsi ad E.M. Safety per i corsi antincendio a rischio alto e per l’analisi dei rischi interferenziali con ditte esterne è stata la scelta migliore. Una squadra sempre reperibile e affidabile.',
      results: [
        'Gestione DUVRI per oltre 30 ditte fornitrici',
        'Addestramento squadra antincendio con prove a fuoco reali',
        'Rinnovo CPI vigili del fuoco ottenuto senza intoppi',
      ],
      date: 'Febbraio 2026',
    },
  ];

  const filteredTestimonials =
    selectedIndustry === 'all'
      ? testimonials
      : testimonials.filter((t) => t.industry === selectedIndustry);

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
          <span className="text-[#0B192C]">Testimonianze & Casi Studio</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white py-16 sm:py-24 border-b border-[#1E3E62]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-[#70B5F9]/40 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <Star className="w-3.5 h-3.5 text-[#0A66C2] fill-[#0A66C2]" />
              <span>Valutazione Media 4.9/5 • Oltre 450 Imprese Soddisfatte</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Cosa dicono di noi i datori di lavoro e gli RSPP
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-ui">
              La reputazione si costruisce sul campo, giorno dopo giorno. Scopri come abbiamo aiutato imprenditori, direttori di stabilimento e responsabili HR a superare audit ispettivi, ridurre infortuni e abbattere i costi INAIL.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-200">
                100% Recensioni Verificate di Aziende Clienti
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Proof Strip */}
      <section className="bg-white border-b border-slate-200 py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-2xl sm:text-3xl font-serif-display">
                <TrendingDown className="w-6 h-6" />
                <span>-68%</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Indice di frequenza infortuni medio nelle aziende seguite
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-serif-display text-[#0B192C]">
                Fino a -28%
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Risparmio sui tassi INAIL ottenuto con il modello OT23
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-serif-display text-[#0A66C2]">
                48 Ore
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Tempo massimo di intervento garantito per urgenze ispettive
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-sky-600 font-bold text-2xl sm:text-3xl font-serif-display">
                <ShieldCheck className="w-6 h-6" />
                <span>99.8%</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Esito positivo in audit ATS, SPISAL e Ispettorato del Lavoro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Filter Controls */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B192C] uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#0A66C2]" />
            <span>Filtra per settore:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tutti i Settori' },
              { id: 'manifattura', label: 'Metalmeccanica & Manifattura' },
              { id: 'logistica', label: 'Logistica & Trasporti' },
              { id: 'chimica', label: 'Chimico & Farmaceutico' },
              { id: 'costruzioni', label: 'Edilizia & Cantieri' },
              { id: 'sanita', label: 'Sanità & Servizi' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedIndustry(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedIndustry === tab.id
                    ? 'bg-[#0B192C] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#0A66C2]/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {t.date}
                  </span>
                </div>

                <h3 className="font-serif-display text-base font-bold text-[#0B192C] mb-3 leading-snug group-hover:text-[#0A66C2] transition-colors">
                  "{t.headline}"
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  {t.review}
                </p>

                {/* Tangible Results Box */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 mb-6 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                    Risultati Raggiunti:
                  </span>
                  {t.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author Box */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#0B192C]">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-[#0A66C2] font-semibold">
                    {t.company}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Building2 className="w-4 h-4 text-[#0B192C]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-[#0B192C] rounded-3xl p-8 sm:p-12 text-white text-center space-y-5 shadow-2xl border border-[#1E3E62] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A66C2]/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold">
            Vuoi proteggere anche la tua azienda con i nostri standard?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Richiedi un check-up gratuito della conformità del tuo DVR o un preventivo per la formazione obbligatoria del tuo personale.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0A66C2] hover:bg-[#004182] text-white shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Contattaci per una Valutazione Rischi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Handshake,
  Users,
  Stethoscope,
  Building,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Send,
  Award,
  ArrowRight,
  FileCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { AnfosLogo } from '../components/affiliations/AnfosLogo';
import { OpnLogo } from '../components/affiliations/OpnLogo';
import { DanLogo } from '../components/affiliations/DanLogo';

interface PartnerPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
}

export const PartnerPage: React.FC<PartnerPageProps> = ({ onNavigateHome, onOpenContact }) => {
  const [partnerType, setPartnerType] = useState('docente');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [companyOrName, setCompanyOrName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const partnershipModels = [
    {
      id: 'docente',
      title: 'Docenti Formatori & Istruttori',
      badge: 'Accreditamento ANFOS & DAN',
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description:
        'Cerchiamo docenti qualificati (D.I. 06/03/2013) per docenze pratiche e teoriche su antincendio, primo soccorso BLS-D, carrelli elevatori, PLE e sicurezza generale.',
      benefits: [
        'Registro attestati ufficiale con rilascio crediti validi in tutta Italia',
        'Materiale didattico, slide, test e registri già predisposti a norma',
        'Compensi puntuali e continuità di calendario nelle sedi di Treviso e Milano',
        'Corsi di aggiornamento docenti gratuiti ogni anno',
      ],
    },
    {
      id: 'medico',
      title: 'Medici Competenti & Poliambulatori',
      badge: 'Sorveglianza Sanitaria Art. 41',
      icon: Stethoscope,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      description:
        'Sviluppiamo sinergie stabili con Medici del Lavoro iscritti all’elenco ministeriale per la gestione sanitaria integrata del nostro parco clienti.',
      benefits: [
        'Supporto segreteria per convocazione visite periodiche e cartelle sanitarie',
        'Unità mobili attrezzate per visite direttamente presso le sedi dei clienti',
        'Integrazione diretta tra DVR tecnico e protocolli sanitari di rischio',
        'Riconoscimento paritetico e convenzioni esami ematochimici e strumentali',
      ],
    },
    {
      id: 'studio',
      title: 'Commercialisti & Consulenti del Lavoro',
      badge: 'Programma Affiliazione Fiscale',
      icon: Building,
      color: 'bg-blue-50 text-[#0A66C2] border-blue-200',
      description:
        'Offri ai tuoi clienti un servizio impeccabile di sicurezza D.Lgs. 81/08 e sgravi INAIL OT23 senza doverti occupare della complessità tecnica.',
      benefits: [
        'Pratiche INAIL Modello OT23 chiavi in mano con risparmio fino al 28% sul tasso',
        'Referente unico dedicato per rispondere a tutti i quesiti dei tuoi assistiti',
        'Cruscotto scadenziario Cloud per monitorare i dipendenti in formazione',
        'Riconoscimento provvigionale o tariffario convenzionato riservato allo Studio',
      ],
    },
    {
      id: 'ente',
      title: 'Società di Consulenza & Agenzie per il Lavoro',
      badge: 'Bilateralità O.P.N. Italia Lavoro',
      icon: Users,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description:
        'Crea valore con percorsi di sicurezza per lavoratori in somministrazione e progetti congiunti finanziati tramite Fondi Paritetici.',
      benefits: [
        'Sessioni formative ad alta frequenza e attivabili entro 48 ore',
        'Rilascio immediato dell’attestato provvisorio valido per assunzione',
        'Verifica preliminare dei piani con O.P.N. Italia Lavoro',
        'Integrazione flessibile aula fisica + E-learning FAD certificata',
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#1c2923] pt-6 pb-20">
      {/* Top Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#0A66C2] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0B192C]">Collabora con Noi</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white py-16 sm:py-24 border-b border-[#1E3E62]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-[#70B5F9]/40 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <Handshake className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Network Istituzionale & Professionale</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Collabora con Noi: Costruiamo Valore Insieme
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-ui">
              Unisci le tue competenze al network E.M. Safety. Offriamo a docenti, medici competenti, commercialisti e società di consulenza un ecosistema accreditato da ANFOS, O.P.N. Italia Lavoro e DAN Partner.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#diventa-partner-form"
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg transition-all"
              >
                Invia Proposta di Partnership
              </a>
              <button
                onClick={onOpenContact}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#152B44] hover:bg-[#1E3E62] text-white border border-slate-700 transition-all cursor-pointer"
              >
                Parla con il Direttore di Rete
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliation Badges Banner */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A66C2] block">
                ORGANISMI ACCREDITATI
              </span>
              <h3 className="font-serif-display text-lg font-bold text-[#0B192C]">
                Tutta la forza dei nostri accreditamenti al servizio dei tuoi clienti
              </h3>
            </div>
            <div className="flex items-center gap-8 opacity-90 hover:opacity-100 transition-opacity">
              <AnfosLogo className="h-14 w-auto drop-shadow-xs" />
              <OpnLogo className="h-14 w-auto drop-shadow-xs" />
              <DanLogo className="h-12 w-auto drop-shadow-xs" />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Partnership Profiles */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
            PROFILI DI COLLABORAZIONE
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B192C]">
            Come possiamo collaborare
          </h2>
          <p className="text-sm text-slate-600">
            Che tu sia un libero professionista o uno studio associato, abbiamo un modello di collaborazione strutturato per valorizzare la tua professionalità.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnershipModels.map((model) => {
            const Icon = model.icon;
            return (
              <div
                key={model.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between group hover:border-[#0A66C2]/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0B192C] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${model.color}`}>
                      {model.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#0B192C] mb-3">
                    {model.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {model.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 block">
                      Cosa Ti Riserviamo:
                    </span>
                    {model.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPartnerType(model.id);
                    const el = document.getElementById('diventa-partner-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-[#0B192C] bg-slate-100 hover:bg-[#0A66C2] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Candidati per questa partnership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* How Partnership Works (3 Steps) */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              PROCESSO DI INGRESSO
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#0B192C]">
              In 3 semplici step nel nostro team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0B192C] text-white font-extrabold flex items-center justify-center mx-auto text-lg shadow-md">
                1
              </div>
              <h3 className="font-bold text-[#0B192C] text-base">
                Contatto & Valutazione Requisiti
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Invio del form o della manifestazione d'interesse con verifica dei titoli abilitativi e delle aree geografiche di competenza.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0A66C2] text-white font-extrabold flex items-center justify-center mx-auto text-lg shadow-md">
                2
              </div>
              <h3 className="font-bold text-[#0B192C] text-base">
                Convenzione & Onboarding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stipula dell'accordo di partnership o incarico professionale con condivisione degli standard qualitativi e accesso alle piattaforme Cloud.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0B192C] text-white font-extrabold flex items-center justify-center mx-auto text-lg shadow-md">
                3
              </div>
              <h3 className="font-bold text-[#0B192C] text-base">
                Avvio Attività & Pieno Supporto
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pianificazione calendari, assegnazione commesse con back-office e segreteria E.M. Safety sempre al tuo fianco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Application Form */}
      <section id="diventa-partner-form" className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/90">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              MODULO DI CONTATTO PARTNER
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C]">
              Invia la tua proposta di collaborazione
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Compila i campi sottostanti. Il nostro responsabile relazioni con i partner ti contatterà telefonicamente entro 24 ore.
            </p>
          </div>

          {formSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#0B192C]">
                Richiesta di Partnership Ricevuta!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Grazie per l'interesse verso E.M. Safety. La direzione esaminerà la tua proposta e fisserà un incontro conoscitivo (di persona o video-call).
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase bg-[#0B192C] text-white hover:bg-[#0A66C2] transition-colors"
              >
                Invia un'altra richiesta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tipologia di Partnership
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'docente', label: 'Docente Formatore' },
                    { id: 'medico', label: 'Medico del Lavoro' },
                    { id: 'studio', label: 'Studio Professionale' },
                    { id: 'ente', label: 'Società Partner' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPartnerType(item.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                        partnerType === item.id
                          ? 'bg-[#0B192C] text-white border-[#0B192C]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Nome e Cognome / Ragione Sociale *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyOrName}
                    onChange={(e) => setCompanyOrName(e.target.value)}
                    placeholder="es. Dott. Marco Bianchi / Studio Bianchi"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Città / Area Geografica *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="es. Treviso, Milano, Padova, Monza..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Indirizzo Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="es. studio@dominio.it"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Telefono Diretto *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 02 ... / +39 340 ..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Descrizione delle Competenze o Obiettivi di Collaborazione
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Es. Corsi che sei abilitato ad erogare, numero di aziende seguite o tipologia di sinergia auspicata..."
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" required id="privacy-partner" className="mt-0.5 rounded text-[#0A66C2]" />
                <label htmlFor="privacy-partner" className="text-[11px] text-slate-500 leading-tight">
                  Acconsento al trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) per fini di contatto professionale e valutazione partnership.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Richiedi Adesione al Network Partner</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

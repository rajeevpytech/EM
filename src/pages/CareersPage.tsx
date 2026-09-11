import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  CheckCircle2,
  Send,
  Upload,
  HeartHandshake,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface CareersPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigateHome, onOpenContact }) => {
  const [selectedJob, setSelectedJob] = useState<string | null>('rspp-senior');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantRole, setApplicantRole] = useState('RSPP Senior / HSE Specialist');
  const [applicantNote, setApplicantNote] = useState('');
  const [cvFile, setCvFile] = useState<string | null>(null);

  const jobOpenings = [
    {
      id: 'rspp-senior',
      title: 'RSPP Senior / Consulente HSE Specialist',
      department: 'Divisione Consulenza Tecnica',
      location: 'Milano (Porta Nuova) / Treviso (Ibrido)',
      type: 'Tempo Indeterminato (Full-time)',
      experience: 'Almeno 4-5 anni di esperienza',
      description:
        'Cerchiamo un professionista abilitato all’incarico di RSPP (Moduli A, B, C) con consolidata esperienza nella gestione di complessi produttivi industriali, cantieri edili e realtà del terziario avanzato.',
      responsibilities: [
        'Assunzione dell’incarico formale di RSPP esterno per aziende clienti',
        'Elaborazione e aggiornamento Documenti di Valutazione dei Rischi (DVR, DUVRI, POS)',
        'Conduzione di audit di conformità periodici e riunioni periodiche art. 35 D.Lgs. 81/08',
        'Supporto nell’implementazione di Sistemi di Gestione Sicurezza UNI ISO 45001',
      ],
      requirements: [
        'Laurea in Ingegneria della Sicurezza, Tecniche della Prevenzione o equipollenti',
        'Attestazione valida per RSPP ex Accordo Stato-Regioni e crediti formativi in regola',
        'Ottima conoscenza delle norme tecniche UNI, CEI e linee guida INAIL',
        'Patente B e disponibilità a trasferte regionali (Lombardia e Veneto)',
      ],
    },
    {
      id: 'docente-formatore',
      title: 'Docente Formatore Qualificato (D.I. 06/03/2013)',
      department: 'E.M. Safety Academy',
      location: 'Treviso / Milano / In-company clienti',
      type: 'Collaborazione Continuativa / P.IVA',
      experience: 'Docenze attestate negli ultimi 3 anni',
      description:
        'Selezioniamo formatori esperti per corsi di sicurezza lavoratori, preposti, dirigenti, RLS, primo soccorso BLS-D accreditato DAN e antincendio livello 1-2-3.',
      responsibilities: [
        'Erogazione docenze in aula e sessioni pratiche nei campi prova dedicati',
        'Gestione del registro presenze cartaceo/digitale a norma ANFOS e OPN Italia Lavoro',
        'Somministrazione test di apprendimento finali e redazione verbali di esame',
        'Partecipazione a tavoli di aggiornamento metodologico interno',
      ],
      requirements: [
        'Requisiti di qualificazione formatore ai sensi del D.I. 06/03/2013 (almeno un criterio soddisfatto)',
        'Iscrizione a registro formatori ANFOS o disponibilità al convenzionamento',
        'Spiccate doti oratorie, empatia e capacità di coinvolgimento con metodologie attive',
        'Preferibile abilitazione Istruttore DAN per corsi di Primo Soccorso BLS-D',
      ],
    },
    {
      id: 'tecnico-acustica-vibrazioni',
      title: 'Tecnico Specialista Rilievi Strumentali & Agenti Fisici',
      department: 'Laboratorio Misure & Igiene Industriale',
      location: 'Treviso (Sede Operativa con uscite clienti Nord Italia)',
      type: 'Tempo Indeterminato',
      experience: '2-3 anni in misurazioni ambientali',
      description:
        'La risorsa si occuperà dell’esecuzione di campagne strumentali per la valutazione dei rischi fisici e chimici nei luoghi di lavoro attraverso strumentazione calibrata di precisione.',
      responsibilities: [
        'Campionamenti fonometrici e mappature acustiche reparti produttivi',
        'Misurazioni vibrazioni trasmesse al sistema mano-braccio (HAV) e corpo intero (WBV)',
        'Rilievi campi elettromagnetici (CEM) e radiazioni ottiche artificiali (ROA)',
        'Elaborazione delle relazioni tecniche e definizione delle misure di bonifica',
      ],
      requirements: [
        'Qualifica di Tecnico Competente in Acustica Ambientale (TCAA) iscritto a ENTECA',
        'Dimestichezza con fonometri integratori di classe 1 e accelerometri triassiali',
        'Precisione nell’elaborazione dati e stesura reportistica tecnico-scientifica',
      ],
    },
    {
      id: 'backoffice-formazione',
      title: 'HSE Training Coordinator & Back-Office Gestione Corsi',
      department: 'Segreteria Didattica & Fondi',
      location: 'Milano (Piazza Gae Aulenti)',
      type: 'Full-time',
      experience: '1-2 anni in enti di formazione o agenzie di lavoro',
      description:
        'Coordinamento operativo delle edizioni a calendario e aziendali, gestione delle piattaforme FAD/E-learning, rapporti con le aziende clienti e rendicontazione su Fondi Interprofessionali.',
      responsibilities: [
        'Pianificazione calendario edizioni formative e convocazione corsisti',
        'Emissione attestati con QR Code univoco e caricamento su registri paritetici',
        'Pratiche di rendicontazione su Fondimpresa, Forte, Fondirigenti',
        'Customer care verso i referenti HR aziendali per scadenziario e rinnovi',
      ],
      requirements: [
        'Diploma o Laurea ad indirizzo umanistico, giuridico o economico',
        'Conoscenza delle dinamiche formative D.Lgs. 81/08 e Accordo Stato-Regioni',
        'Precisione organizzativa, ottime doti relazionali e uso suite Office/Google',
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

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
          <span className="text-[#0B192C]">Lavora con Noi & Carriere</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white py-16 sm:py-24 border-b border-[#1E3E62]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-[#70B5F9]/40 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <Briefcase className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Unisciti alla Squadra E.M. Safety</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Costruisci il tuo futuro nella sicurezza sul lavoro
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-ui">
              Affianchiamo oltre 450 aziende primarie in tutta Italia. Cerchiamo ingegneri, formatori, tecnici di laboratorio e specialisti HR che vogliano fare la differenza trasformando la conformità normativa in valore e tutela della vita.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#posizioni-aperte"
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg transition-all"
              >
                Vedi le Posizioni Aperte ({jobOpenings.length})
              </a>
              <a
                href="#candidatura-spontanea"
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#152B44] hover:bg-[#1E3E62] text-white border border-slate-700 transition-all"
              >
                Invia Candidatura Spontanea
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us (4 Pillars) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              PERCHÉ SCEGLIERCI
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#0B192C]">
              I vantaggi di crescere in E.M. Safety
            </h2>
            <p className="text-sm text-slate-600">
              Un ambiente stimolante, rispettoso dell’equilibrio vita-lavoro e costantemente orientato all’eccellenza tecnica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0A66C2] transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-[#0A66C2] mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0B192C] mb-2">
                Formazione Continua Gratuita
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tutti i crediti di aggiornamento obbligatorio RSPP, Formatore e Coordinatore Sicurezza sono a carico aziendale con percorsi accreditati ANFOS e DAN.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0A66C2] transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-[#0B192C] mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0B192C] mb-2">
                Piani di Crescita Chiari
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Progressione meritocratica da Junior a Senior Project Leader e RSPP titolare, con incentivazione sui risultati e premi di reparto.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0A66C2] transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0B192C] mb-2">
                Smart Working & Flessibilità
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modello ibrido per le attività di back-office, orari flessibili di ingresso e welfare aziendale per supporto alla persona e famiglia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0A66C2] transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0B192C] mb-2">
                Tecnologie all’Avanguardia
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strumentazione di misura di ultima generazione, software Cloud proprietario per scadenziari e aule didattiche multimediali.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Accordion */}
      <section id="posizioni-aperte" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              OPPORTUNITÀ ATTUALI
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B192C] mt-1">
              Posizioni Aperte
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Aggiornate al Mese Corrente • Sedi di Milano & Treviso
          </p>
        </div>

        <div className="space-y-4">
          {jobOpenings.map((job) => {
            const isExpanded = selectedJob === job.id;
            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:border-[#0A66C2]/50"
              >
                <div
                  onClick={() => setSelectedJob(isExpanded ? null : job.id)}
                  className="p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none hover:bg-slate-50/70"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase text-slate-700">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[10px] font-bold uppercase text-[#0A66C2]">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B192C]">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0A66C2]" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {job.experience}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setApplicantRole(job.title);
                        const formElem = document.getElementById('candidatura-spontanea');
                        if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#0A66C2] transition-colors shadow-xs"
                    >
                      Candidati Ora
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-5 text-xs sm:text-sm text-slate-700"
                  >
                    <p className="text-slate-600 leading-relaxed pt-2">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-bold text-[#0B192C] uppercase tracking-wider text-xs">
                          Responsabilità Principali:
                        </h4>
                        <ul className="space-y-1.5">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-bold text-[#0B192C] uppercase tracking-wider text-xs">
                          Requisiti Richiesti:
                        </h4>
                        <ul className="space-y-1.5">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Application Form */}
      <section id="candidatura-spontanea" className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/90">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
                CANDIDATURA DIRETTA
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C]">
                Invia il tuo Curriculum Vitae
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Non hai trovato la posizione adatta? Accogliamo con entusiasmo candidature spontanee di figure tecniche e docenti.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#0B192C]">
                  Candidatura Ricevuta con Successo!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Grazie {applicantName || 'per il tuo interesse'}. Il team HR di E.M. Safety esaminerà il tuo profilo e ti contatterà entro 5 giorni lavorativi.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase bg-[#0B192C] text-white hover:bg-[#0A66C2] transition-colors"
                >
                  Invia un’altra candidatura
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="es. Marco Rossi"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Indirizzo Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="es. marco.rossi@email.it"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Telefono / Cellulare *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+39 333 1234567"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Ruolo di Interesse
                    </label>
                    <select
                      value={applicantRole}
                      onChange={(e) => setApplicantRole(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none bg-white"
                    >
                      <option>RSPP Senior / HSE Specialist</option>
                      <option>Docente Formatore (D.I. 06/03/2013)</option>
                      <option>Tecnico Rilievi Acustica & Strumentale</option>
                      <option>HSE Training Coordinator & Back-Office</option>
                      <option>Candidatura Spontanea Altro Ruolo</option>
                    </select>
                  </div>
                </div>

                {/* Upload Mock Box */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Allega CV (PDF o DOCX, max 10MB) *
                  </label>
                  <div
                    onClick={() => setCvFile('Curriculum_Vitae_Aggiornato.pdf')}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
                      cvFile ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-300 hover:border-[#0A66C2] bg-slate-50'
                    }`}
                  >
                    {cvFile ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold text-xs">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>File selezionato: {cvFile}</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                        <span className="text-xs font-semibold text-slate-700 block">
                          Trascina qui il file o fai clic per caricarlo
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Formati accettati: PDF, DOC, DOCX
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Presentazione o Note Aggiuntive
                  </label>
                  <textarea
                    rows={3}
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    placeholder="Raccontaci brevemente il tuo percorso professionale o le tue disponibilità territoriali..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" required id="privacy-careers" className="mt-0.5 rounded text-[#0A66C2]" />
                  <label htmlFor="privacy-careers" className="text-[11px] text-slate-500 leading-tight">
                    Dichiaro di aver preso visione dell'informativa sul trattamento dei dati personali (Regolamento UE 2016/679 GDPR) e acconsento alla valutazione del mio profilo professionale da parte di E.M. Safety S.r.l.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Invia Candidatura Professionale</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

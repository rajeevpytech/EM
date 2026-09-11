import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAdminStore } from '../utils/adminStore';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileCheck,
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const { addLead } = useAdminStore();
  const [selectedHub, setSelectedHub] = useState<'treviso' | 'milano'>('milano');
  const [serviceType, setServiceType] = useState('consulenza-8108');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [employeesCount, setEmployeesCount] = useState('10-50');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quanto costa e cosa prevede il primo sopralluogo in azienda?',
      a: 'Il primo sopralluogo tecnico di check-up è gratuito e non vincolante. Un nostro ingegnere della sicurezza visita i vostri reparti, esamina il DVR e lo scadenziario formativo, rilasciando una Gap Analysis preliminare con le priorità di intervento.',
    },
    {
      q: 'I corsi di formazione sono validi su tutto il territorio nazionale?',
      a: 'Assolutamente sì. Come Centro di Formazione e Sede Territoriale Periferica ANFOS (L. 4/2013) e convenzionati con O.P.N. Italia Lavoro, tutti i nostri attestati hanno pieno valore legale in ogni regione italiana ai sensi dell’Accordo Stato-Regioni e del D.Lgs. 81/08.',
    },
    {
      q: 'Possiamo svolgere i corsi direttamente presso la nostra sede?',
      a: 'Certamente. Organizziamo corsi in-company su misura in base ai vostri turni produttivi, portando tutto il materiale didattico e attrezzature pratiche (defibrillatori, simulatori fumo, manichini BLS-D).',
    },
    {
      q: 'Come possiamo finanziare la formazione con i Fondi Interprofessionali?',
      a: 'Gestiamo interamente le pratiche su Fondimpresa, Fondo Forte, Fondirigenti, ecc. Dalla presentazione del piano alla rendicontazione finale, consentendovi di azzerare i costi vivi della formazione obbligatoria.',
    },
    {
      q: 'Cosa fare in caso di ispezione SPISAL / ATS o verbale di prescrizione?',
      a: 'Abbiamo una linea di pronto intervento per emergenze ispettive. Entro 24 ore un tecnico senior prende in carico il verbale, redige le memorie tecniche e concorda il cronoprogramma di adeguamento con l’organo di vigilanza.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      fullName: fullName,
      company: company,
      email: email,
      phone: phone,
      source: 'Contatti',
      subject: `Richiesta Sede ${selectedHub === 'milano' ? 'Milano' : 'Treviso'} - ${serviceType}`,
      message: `Dipendenti: ${employeesCount}\n${message}`,
    });
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
          <span className="text-[#0B192C]">Contattaci</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white py-16 sm:py-20 border-b border-[#1E3E62]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-[#70B5F9]/40 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <Phone className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Contatto Diretto con i Nostri Ingegneri</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Parliamo della sicurezza della tua azienda
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-ui">
              Hai bisogno di rinnovare il DVR, nominare un RSPP esterno affidabile, programmare corsi accreditati o affrontare un controllo ispettivo? Siamo a tua disposizione nelle sedi di Milano e Treviso.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Left Hubs & Right Contact Form */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Two Hub Cards + Emergency Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
                LE NOSTRE SEDI OPERATIVE
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C]">
                Presenza diretta sul territorio
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Seleziona la sede di riferimento per visualizzare i recapiti dedicati o fissare un incontro.
              </p>
            </div>

            {/* Sede Milano Card */}
            <div
              onClick={() => setSelectedHub('milano')}
              className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer ${
                selectedHub === 'milano'
                  ? 'bg-white border-[#0A66C2] shadow-xl ring-2 ring-[#0A66C2]/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A66C2]">
                  LOMBARDIA & DIREZIONE NAZIONALE
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A66C2] animate-pulse" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#0B192C] mb-2">
                Milano (Porta Nuova)
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Piazza Gae Aulenti, 8 • 20124 Milano (MI)
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0A66C2]" />
                  <a href="tel:+390287198920" className="font-semibold hover:text-[#0A66C2]">
                    +39 02 8719 8920
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0A66C2]" />
                  <a href="mailto:milano@emsafety.it" className="hover:text-[#0A66C2]">
                    milano@emsafety.it
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Lun - Ven: 09:00 - 18:30 (Continuato)</span>
                </div>
              </div>
            </div>

            {/* Sede Treviso Card */}
            <div
              onClick={() => setSelectedHub('treviso')}
              className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer ${
                selectedHub === 'treviso'
                  ? 'bg-white border-[#0A66C2] shadow-xl ring-2 ring-[#0A66C2]/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B192C]">
                  VENETO & CAMPO PROVE ADDESTRAMENTO
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B192C]" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#0B192C] mb-2">
                Treviso (Sede Operativa)
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Via delle Industrie, 42 • 31100 Treviso (TV)
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0A66C2]" />
                  <a href="tel:+3904221839420" className="font-semibold hover:text-[#0A66C2]">
                    +39 0422 183 9420
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0A66C2]" />
                  <a href="mailto:treviso@emsafety.it" className="hover:text-[#0A66C2]">
                    treviso@emsafety.it
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Lun - Ven: 08:30 - 18:30 (Aule e campo prove)</span>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Box */}
            <div className="p-6 rounded-3xl bg-[#0B192C] text-white border border-[#1E3E62] shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-[#70B5F9] text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Pronto Intervento Ispettivo h24</span>
              </div>
              <h4 className="font-serif-display text-lg font-bold">
                Accesso ispettori o prescrizioni in corso?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                I nostri consulenti legali e tecnici intervengono entro 24 ore per l'assistenza al verbale e la stesura delle controdeduzioni.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <a
                  href="tel:+390287198920"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-xs font-bold text-center text-white transition-colors"
                >
                  Chiama Linea Emergenze
                </a>
                <span className="text-[11px] text-slate-400 font-mono">PEC: emsafety@pec.it</span>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Contact & Quote Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200/90 relative">
              <div className="space-y-2 mb-8">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
                  MODULO DI CONTATTO & PREVENTIVO
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C]">
                  Richiedi una proposta tecnica su misura
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Rispondiamo entro 24 ore lavorative con una prima valutazione di conformità.
                </p>
              </div>

              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0A66C2] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#0B192C]">
                    Messaggio Inviato con Successo!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Grazie {fullName}. La richiesta è stata assegnata all'ingegnere responsabile per la sede di {selectedHub === 'milano' ? 'Milano' : 'Treviso'}. Ti ricontatteremo a breve.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase bg-[#0B192C] text-white hover:bg-[#0A66C2] transition-colors cursor-pointer"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Service Pills */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Ambito di Interesse *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'consulenza-8108', label: 'Consulenza D.Lgs 81/08' },
                        { id: 'incarico-rspp', label: 'Incarico RSPP Esterno' },
                        { id: 'corsi-formazione', label: 'Corsi di Formazione' },
                        { id: 'sgravio-inail', label: 'Sgravio INAIL OT23' },
                        { id: 'rilievi-strumentali', label: 'Rilievi Fonometrie/CEM' },
                        { id: 'medicina-lavoro', label: 'Medicina del Lavoro' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setServiceType(s.id)}
                          className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all border text-center ${
                            serviceType === s.id
                              ? 'bg-[#0B192C] text-white border-[#0B192C]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="es. Mario Bianchi"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Azienda / Ragione Sociale *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="es. Alfa Meccanica S.r.l."
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Aziendale *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="es. m.bianchi@alfameccanica.it"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Telefono / Cellulare *
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
                      Numero Dipendenti in Azienda
                    </label>
                    <select
                      value={employeesCount}
                      onChange={(e) => setEmployeesCount(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none bg-white"
                    >
                      <option value="1-9">1 - 9 dipendenti (Microimpresa)</option>
                      <option value="10-50">10 - 50 dipendenti (Piccola Impresa)</option>
                      <option value="51-250">51 - 250 dipendenti (Media Impresa)</option>
                      <option value="250+">Oltre 250 dipendenti (Grande Impresa / Gruppo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Dettagli della Richiesta o Domanda
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Descrivi la tua esigenza (es. aggiornamento DVR, formazione carrellisti per 15 persone, pratica INAIL OT23...)"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input type="checkbox" required id="privacy-contact" className="mt-0.5 rounded text-[#0A66C2]" />
                    <label htmlFor="privacy-contact" className="text-[11px] text-slate-500 leading-tight">
                      Dichiaro di aver letto e compreso l'Informativa Privacy (Regolamento UE 2016/679 GDPR) e acconsento al trattamento dei dati per la formulazione del preventivo.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Invia Richiesta di Contatto Tecnico</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              DOMANDE FREQUENTI
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B192C]">
              Tutto quello che c'è da sapere prima di iniziare
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0B192C] hover:text-[#0A66C2] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

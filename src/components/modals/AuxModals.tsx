import React, { useState } from 'react';
import { X, MapPin, Mail, Phone, CheckCircle2, Building, Send, Award, Users, Shield } from 'lucide-react';
import { useAdminStore } from '../../utils/adminStore';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillReason?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, prefillReason }) => {
  const { addLead } = useAdminStore();
  const [selectedCity, setSelectedCity] = useState<'treviso' | 'milano'>('treviso');
  const [serviceType, setServiceType] = useState('Consulenza D.Lgs 81/08 & DVR');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="bg-[#0B192C] text-white p-6 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#70B5F9]">
              SEDI OPERATIVE & PREVENTIVO
            </span>
            <h3 className="font-serif-display text-2xl font-bold">
              Richiedi un Preventivo su Misura
            </h3>
            <p className="text-xs text-slate-300">
              Sedi a Treviso e Milano. Interventi in tutto il Nord e Centro Italia.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {sent ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-blue-100 text-[#0A66C2] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-display text-xl text-[#0B192C] font-bold">
                Richiesta Preventivo Ricevuta
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Il responsabile della sede di {selectedCity === 'treviso' ? 'Treviso' : 'Milano'} preparerà l'offerta tecnico-economica entro 48 ore.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] hover:bg-[#0A66C2] text-white rounded-xl transition-colors cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addLead({
                  fullName: fullName,
                  company: company,
                  email: email,
                  phone: phone,
                  source: 'Preventivo',
                  subject: `Preventivo ${selectedCity === 'treviso' ? 'Treviso' : 'Milano'} - ${serviceType}`,
                  message: prefillReason ? `Dettaglio selezionato: ${prefillReason}` : undefined,
                });
                setSent(true);
              }}
              className="space-y-4"
            >
              {/* Sedi selection tabs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Seleziona Sede di Riferimento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCity('treviso')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedCity === 'treviso'
                        ? 'border-[#0A66C2] bg-blue-50/70 ring-1 ring-[#0A66C2]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0A66C2]" />
                      <span className="text-xs font-bold text-[#0B192C]">Sede Treviso (TV)</span>
                    </div>
                    <span className="block text-[11px] text-slate-500 mt-1">
                      Via delle Industrie, 42 • Treviso
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCity('milano')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedCity === 'milano'
                        ? 'border-[#0A66C2] bg-blue-50/70 ring-1 ring-[#0A66C2]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0A66C2]" />
                      <span className="text-xs font-bold text-[#0B192C]">Sede Milano (MI)</span>
                    </div>
                    <span className="block text-[11px] text-slate-500 mt-1">
                      Piazza Gae Aulenti, 8 • Milano
                    </span>
                  </button>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Tipologia di Servizio Richiesto
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#0A66C2]"
                >
                  <option>Consulenza D.Lgs 81/08 & Redazione DVR</option>
                  <option>Incarico RSPP Esterno Qualificato</option>
                  <option>Certificazione ISO 45001 / ISO 9001 / ISO 14001</option>
                  <option>Formazione Aziendale su Misura (presso la nostra o vostra sede)</option>
                  <option>Pratica Sgravio INAIL OT23 (Risparmio fino al 28%)</option>
                  <option>Valutazioni Strumentali (Rumore, Vibrazioni, CEM, Chimico)</option>
                </select>
              </div>

              {prefillReason && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-[#0B192C]">
                  <span className="font-bold text-[#0A66C2]">Oggetto selezionato:</span> {prefillReason}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nome e Cognome *"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                />
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Azienda / P.IVA *"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email aziendale *"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefono per ricontatto"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors shadow-md cursor-pointer"
              >
                Invia Richiesta di Preventivo Gratuito
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const CaseStudiesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const cases = [
    {
      company: 'Gruppo Manifatturiero Veneto (320 dipendenti)',
      tag: 'Zero Infortuni & SGI',
      title: 'Transizione a ISO 45001 e abbattimento infortuni del 92%',
      result: 'Sgravio INAIL OT23 pari a € 44.000/anno e zero prescrizioni negli audit ASL/SPISAL.',
    },
    {
      company: 'Polo Logistico & E-commerce Milano (180 operatori)',
      tag: 'Formazione Carrelli & RSPP',
      title: 'Adeguamento 100% patenti carrelli e gestione smart scadenze',
      result: 'Formazione erogata direttamente in banchina senza bloccare i turni di carico.',
    },
    {
      company: 'Impresa di Costruzioni Generali (85 operai)',
      tag: 'Sicurezza Cantieri & POS',
      title: 'Ristrutturazione completa PSC e POS con sopralluoghi settimanali',
      result: 'Sblocco appalti pubblici di primaria importanza con massimo punteggio sicurezza.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="bg-[#0B192C] text-white p-6 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#70B5F9]">
              CASI STUDIO & SUCCESSI
            </span>
            <h3 className="font-serif-display text-2xl font-bold">
              Come Creiamo Valore con la Sicurezza
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {cases.map((cs, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#0A66C2] bg-blue-100 px-2 py-0.5 rounded">
                  {cs.tag}
                </span>
                <span className="text-xs text-slate-500 font-medium">{cs.company}</span>
              </div>
              <h4 className="font-serif-display text-base font-bold text-[#0B192C]">
                {cs.title}
              </h4>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-900">Risultato certificato:</strong> {cs.result}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] hover:bg-[#0A66C2] text-white rounded-xl transition-colors cursor-pointer">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export const PartnerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="bg-[#0B192C] text-white p-6 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#70B5F9]">
              NETWORK PROFESSIONALE
            </span>
            <h3 className="font-serif-display text-2xl font-bold">
              Diventa Partner E.M Safety
            </h3>
            <p className="text-xs text-slate-300">
              Collabora con noi come Docente Formatore, Medico Competente o Consulente Tecnico.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-700">
          <p>
            E.M Safety seleziona costantemente professionisti qualificati per l'erogazione di corsi di formazione accreditati e incarichi di consulenza tecnica nelle provincie di Treviso, Milano e limitrofe.
          </p>
          <div className="space-y-2 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
              <span>Docenti formatori qualificati ai sensi del D.I. 06/03/2013</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
              <span>Istruttori accreditati ANFOS (Sede Territoriale Periferica) & DAN Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
              <span>Progetti formativi validati con Organismo Paritetico Nazionale (O.P.N. Italia Lavoro)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
              <span>Medici del Lavoro iscritti all'elenco nazionale del Ministero della Salute</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
              <span>Tecnici per rilievi acustici e ambientali abilitati</span>
            </div>
          </div>
          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-slate-800">
            Invia la tua candidatura con CV a: <strong className="text-[#0B192C]">partner@emsafety.it</strong>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] hover:bg-[#0A66C2] text-white rounded-xl transition-colors cursor-pointer">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="bg-[#0B192C] text-white p-6 flex items-start justify-between">
          <h3 className="font-serif-display text-xl font-bold">
            Informativa Privacy & Trattamento Dati (GDPR)
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 text-xs text-slate-700 space-y-3 leading-relaxed max-h-96 overflow-y-auto">
          <p>
            Ai sensi del Regolamento UE 2016/679 (GDPR), E.M Safety S.r.l., con sedi a Treviso e Milano, informa che i dati raccolti attraverso i form del presente sito sono trattati unicamente al fine di rispondere a richieste di preventivo, iscrizione corsi e consulenza.
          </p>
          <p>
            I dati non verranno ceduti a soggetti terzi non autorizzati e sono conservati nel rispetto delle misure di sicurezza informatica adeguate.
          </p>
          <p>
            I corsisti possono richiedere in qualsiasi momento la cancellazione o la rettifica dei propri dati scrivendo a privacy@emsafety.it.
          </p>
        </div>
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] hover:bg-[#0A66C2] text-white rounded-xl transition-colors cursor-pointer">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

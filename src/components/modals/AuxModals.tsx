import React, { useState } from 'react';
import { X, MapPin, Mail, Phone, CheckCircle2, AlertCircle, Building, Send, Award, Users, Shield, Loader2 } from 'lucide-react';
import { useAdminStore } from '../../utils/adminStore';
import { quoteFormSchema, QuoteFormData, validateSingleField } from '../../utils/validationSchemas';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillReason?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, prefillReason }) => {
  const { addLead } = useAdminStore();

  const [formData, setFormData] = useState<QuoteFormData>({
    selectedCity: 'treviso',
    serviceType: 'Consulenza D.Lgs 81/08 & DVR',
    fullName: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
    privacyAccepted: false as unknown as true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleFieldChange = <K extends keyof QuoteFormData>(
    field: K,
    value: QuoteFormData[K]
  ) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field] || errors[field]) {
      const errorMsg = validateSingleField(
        quoteFormSchema,
        field,
        value,
        updated as Record<string, unknown>
      );
      setErrors((prev) => ({
        ...prev,
        [field]: errorMsg || undefined,
      }));
    }
  };

  const handleFieldBlur = (field: keyof QuoteFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateSingleField(
      quoteFormSchema,
      field,
      formData[field],
      formData as unknown as Record<string, unknown>
    );
    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg || undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: Partial<Record<keyof QuoteFormData, boolean>> = {
      fullName: true,
      company: true,
      email: true,
      phone: true,
      selectedCity: true,
      serviceType: true,
      notes: true,
      privacyAccepted: true,
    };
    setTouched(allTouched);

    const result = quoteFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof QuoteFormData;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setGeneralError(result.error.issues[0]?.message || 'Verifica i campi evidenziati prima di inviare.');
      return;
    }

    setGeneralError('');
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      addLead({
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        source: 'Preventivo',
        subject: `Preventivo ${formData.selectedCity === 'treviso' ? 'Treviso' : 'Milano'} - ${formData.serviceType}`,
        message: [
          prefillReason ? `Dettaglio selezionato: ${prefillReason}` : null,
          formData.notes ? `Note aggiuntive: ${formData.notes}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
      });
      setIsSubmitting(false);
      setSent(true);
    }, 850);
  };

  const handleClose = () => {
    setSent(false);
    setIsSubmitting(false);
    setErrors({});
    setTouched({});
    setGeneralError('');
    onClose();
  };

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
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
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
                Il responsabile della sede di {formData.selectedCity === 'treviso' ? 'Treviso' : 'Milano'} preparerà l'offerta tecnico-economica entro 48 ore.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] hover:bg-[#0A66C2] text-white rounded-xl transition-colors cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {generalError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-medium">{generalError}</span>
                </div>
              )}

              {/* Progress bar during submission */}
              {isSubmitting && (
                <div className="w-full bg-blue-100 rounded-full h-1 overflow-hidden">
                  <div className="bg-[#0A66C2] h-full w-full animate-pulse transition-all duration-500" />
                </div>
              )}

              {/* Sedi selection tabs */}
              <div className={isSubmitting ? 'opacity-70 pointer-events-none' : ''}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Seleziona Sede di Riferimento *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleFieldChange('selectedCity', 'treviso')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.selectedCity === 'treviso'
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
                    disabled={isSubmitting}
                    onClick={() => handleFieldChange('selectedCity', 'milano')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.selectedCity === 'milano'
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
              <div className={isSubmitting ? 'opacity-70 pointer-events-none' : ''}>
                <label htmlFor="quote-serviceType" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Tipologia di Servizio Richiesto *
                </label>
                <select
                  id="quote-serviceType"
                  disabled={isSubmitting}
                  value={formData.serviceType}
                  onChange={(e) => handleFieldChange('serviceType', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
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

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                {/* Nome e Cognome */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="quote-fullName" className="text-xs font-bold text-slate-700">
                      Nome e Cognome *
                    </label>
                    <span className={`text-[10px] font-mono ${formData.fullName.length > 60 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                      {formData.fullName.length}/70
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="quote-fullName"
                      type="text"
                      required
                      disabled={isSubmitting}
                      maxLength={70}
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      onBlur={() => handleFieldBlur('fullName')}
                      placeholder="Mario Rossi *"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border transition-all focus:outline-hidden focus:ring-2 ${
                        errors.fullName
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : touched.fullName && formData.fullName.length >= 3
                          ? 'border-emerald-500/60 focus:ring-emerald-200'
                          : 'border-slate-300 focus:ring-[#0A66C2]'
                      }`}
                    />
                    {touched.fullName && !errors.fullName && formData.fullName.length >= 3 && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                    )}
                  </div>
                  {errors.fullName && (
                    <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Ragione Sociale */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="quote-company" className="text-xs font-bold text-slate-700">
                      Azienda / P.IVA *
                    </label>
                    <span className={`text-[10px] font-mono ${formData.company.length > 85 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                      {formData.company.length}/100
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="quote-company"
                      type="text"
                      required
                      disabled={isSubmitting}
                      maxLength={100}
                      value={formData.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      onBlur={() => handleFieldBlur('company')}
                      placeholder="Azienda SpA o P.IVA *"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border transition-all focus:outline-hidden focus:ring-2 ${
                        errors.company
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : touched.company && formData.company.length >= 2
                          ? 'border-emerald-500/60 focus:ring-emerald-200'
                          : 'border-slate-300 focus:ring-[#0A66C2]'
                      }`}
                    />
                    {touched.company && !errors.company && formData.company.length >= 2 && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                    )}
                  </div>
                  {errors.company && (
                    <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.company}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                {/* Email Aziendale */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="quote-email" className="text-xs font-bold text-slate-700">
                      Email Aziendale *
                    </label>
                    <span className={`text-[10px] font-mono ${formData.email.length > 80 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                      {formData.email.length}/100
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="quote-email"
                      type="email"
                      required
                      disabled={isSubmitting}
                      maxLength={100}
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={() => handleFieldBlur('email')}
                      placeholder="preventivi@azienda.it *"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border transition-all focus:outline-hidden focus:ring-2 ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : touched.email && !errors.email && formData.email.includes('@')
                          ? 'border-emerald-500/60 focus:ring-emerald-200'
                          : 'border-slate-300 focus:ring-[#0A66C2]'
                      }`}
                    />
                    {touched.email && !errors.email && formData.email.includes('@') && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                    )}
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Telefono */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="quote-phone" className="text-xs font-bold text-slate-700">
                      Telefono per ricontatto *
                    </label>
                    <span className={`text-[10px] font-mono ${formData.phone.length > 15 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                      {formData.phone.length}/20
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      disabled={isSubmitting}
                      maxLength={20}
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      onBlur={() => handleFieldBlur('phone')}
                      placeholder="+39 333 9876543 *"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border transition-all focus:outline-hidden focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : touched.phone && !errors.phone && formData.phone.length >= 6
                          ? 'border-emerald-500/60 focus:ring-emerald-200'
                          : 'border-slate-300 focus:ring-[#0A66C2]'
                      }`}
                    />
                    {touched.phone && !errors.phone && formData.phone.length >= 6 && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                    )}
                  </div>
                  {errors.phone && (
                    <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Note opzionali */}
              <div className={`space-y-1 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between">
                  <label htmlFor="quote-notes" className="text-xs font-bold text-slate-700">
                    Note aggiuntive o requisiti particolari (opzionale)
                  </label>
                  <span className={`text-[10px] font-mono ${(formData.notes?.length || 0) > 450 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                    {formData.notes?.length || 0}/500
                  </span>
                </div>
                <textarea
                  id="quote-notes"
                  rows={2}
                  disabled={isSubmitting}
                  maxLength={500}
                  value={formData.notes}
                  onChange={(e) => handleFieldChange('notes', e.target.value)}
                  onBlur={() => handleFieldBlur('notes')}
                  placeholder="Numero dipendenti, sedi operative, scadenze imminenti..."
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border resize-none focus:outline-hidden focus:ring-2 ${
                    errors.notes
                      ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                      : 'border-slate-300 focus:ring-[#0A66C2]'
                  }`}
                />
                {errors.notes && (
                  <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.notes}</span>
                  </div>
                )}
              </div>

              {/* Privacy Consent */}
              <div className={`pt-1 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    id="quote-privacyAccepted"
                    type="checkbox"
                    disabled={isSubmitting}
                    checked={formData.privacyAccepted === true}
                    onChange={(e) => handleFieldChange('privacyAccepted', e.target.checked as true)}
                    className={`mt-0.5 w-4 h-4 rounded text-[#0A66C2] focus:ring-[#0A66C2] cursor-pointer ${
                      errors.privacyAccepted ? 'border-rose-400 ring-2 ring-rose-200' : 'border-slate-300'
                    }`}
                  />
                  <span>
                    Accetto il trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) per la ricezione del preventivo.*
                  </span>
                </label>
                {errors.privacyAccepted && (
                  <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium pl-6">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.privacyAccepted}</span>
                  </div>
                )}
              </div>

              {/* Submit Button with Loading State */}
              <button
                id="quote-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Elaborazione preventivo in corso...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Invia Richiesta di Preventivo Gratuito</span>
                  </>
                )}
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

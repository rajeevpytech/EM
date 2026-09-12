import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  CheckCircle2,
  AlertCircle,
  Send,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { useAdminStore } from '../utils/adminStore';
import {
  contactFormSchema,
  ContactFormData,
  validateSingleField,
} from '../utils/validationSchemas';

export const ContactSection: React.FC = () => {
  const { addLead } = useAdminStore();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    interestType: 'Consulenza Direzionale & Sistemi HSE',
    preferredLocation: 'Treviso (Sede Operativa)',
    message: '',
    privacyAccepted: false as unknown as true, // initial unchecked state
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const locations = [
    {
      id: 'treviso',
      city: 'Treviso (TV)',
      badge: 'SEDE OPERATIVA & AULE FORMAZIONE',
      address: 'Polo Tecnologico e Direzionale Veneto',
      phone: '+39 0422 123456',
      email: 'treviso@emsafety.it',
      hours: 'Lun - Ven: 08:30 - 18:30',
      description:
        'Sede storica operativa e aule per la formazione teorico-pratica. Centro addestramento per attrezzature e prove antincendio.',
    },
    {
      id: 'milano',
      city: 'Milano (MI)',
      badge: 'HUB DIREZIONALE & RELAZIONI CORPORATE',
      address: 'Piazza Gae Aulenti • Business District',
      phone: '+39 02 87654321',
      email: 'milano@emsafety.it',
      hours: 'Lun - Ven: 09:00 - 18:00',
      description:
        'Presidio direzionale per grandi gruppi industriali, governance ESG, coordinamento SGI e medicina del lavoro specialistica.',
    },
  ];

  const faqs = [
    {
      question: 'Come avviene la verifica preliminare dei requisiti formativi e documentali?',
      answer:
        'I nostri consulenti senior eseguono un check-up iniziale gratuito esaminando l’organico, il codice ATECO e il DVR vigente. Viene elaborato un prospetto delle scadenze imminenti e delle formazioni mancanti senza alcun vincolo contrattuale immediato.',
    },
    {
      question: 'È possibile svolgere la formazione direttamente presso i nostri stabilimenti o uffici?',
      answer:
        'Certamente. Oltre alle aule attrezzate delle nostre sedi di Treviso e Milano, organizziamo sessioni formative dedicate in-company direttamente presso i tuoi reparti o cantieri, con date concordate e orari frazionati per non arrestare la produzione.',
    },
    {
      question: 'Quali sono le tempistiche di risposta e formulazione di un preventivo tecnico?',
      answer:
        'Garantiamo un primo riscontro tecnico entro 24 ore lavorative dal ricevimento della richiesta. La quotazione dettagliata e il piano esecutivo vengono consegnati entro 48 ore a seguito dell’analisi del fabbisogno aziendale.',
    },
    {
      question: 'Gli attestati rilasciati hanno validità ispettiva su tutto il territorio nazionale?',
      answer:
        'Sì, al 100%. Ogni attestato rilasciato da E.M Safety è conforme ai dettami dell’Accordo Stato-Regioni e rilasciato in collaborazione con enti paritetici accreditati (ANFOS e O.P.N. Italia Lavoro), munito di codice univoco e archiviato su registro nazionale consultabile da ASL e ITL.',
    },
  ];

  const handleFieldChange = <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);

    // Validate in real time if field was touched or already has error
    if (touched[field] || errors[field]) {
      const errorMsg = validateSingleField(
        contactFormSchema,
        field,
        value,
        updatedFormData as Record<string, unknown>
      );
      setErrors((prev) => ({
        ...prev,
        [field]: errorMsg || undefined,
      }));
    }
  };

  const handleFieldBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateSingleField(
      contactFormSchema,
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

    // Mark all fields as touched for comprehensive feedback
    const allTouched: Partial<Record<keyof ContactFormData, boolean>> = {
      fullName: true,
      company: true,
      email: true,
      phone: true,
      interestType: true,
      preferredLocation: true,
      message: true,
      privacyAccepted: true,
    };
    setTouched(allTouched);

    // Validate with Zod schema
    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof ContactFormData;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setErrorMessage(
        result.error.issues[0]?.message || 'Verifica i campi evidenziati prima di inviare.'
      );
      return;
    }

    setErrorMessage('');
    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable async submission to admin store and API
    setTimeout(() => {
      addLead({
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        source: 'Contatti',
        subject: formData.interestType,
        message: formData.message || `Richiesta consulenza/preventivo per sede ${formData.preferredLocation}`,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 850);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      interestType: 'Consulenza Direzionale & Sistemi HSE',
      preferredLocation: 'Treviso (Sede Operativa)',
      message: '',
      privacyAccepted: false as unknown as true,
    });
    setErrors({});
    setTouched({});
    setErrorMessage('');
  };

  return (
    <section id="contatti" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Due poli strategici a servizio del tuo business */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
            PRESENZA SUL TERRITORIO
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
            Due poli strategici a servizio del tuo business
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Presidiamo il Nord Italia attraverso due sedi complementari per garantire risposte tempestive, audit sul campo e aule di formazione sempre accessibili.
          </p>
        </div>

        {/* 2 Strategic Locations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1B4332] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {loc.badge}
                  </span>
                  <Building2 className="w-5 h-5 text-slate-400" />
                </div>

                <h3 className="text-2xl font-bold text-[#0B192C] tracking-tight">
                  {loc.city}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {loc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span className="font-mono">{loc.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>{loc.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{loc.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Consultation Form & Context */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Context & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
                  RICHIESTA DIRETTA
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#0B192C] font-bold tracking-tight">
                  Parla con un consulente tecnico
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  Compila il form per richiedere un confronto preliminare gratuito, una valutazione del fabbisogno formativo o un'offerta per l’assunzione dell’incarico RSPP esterno.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-[#0B192C] block">Risposta Garantita entro 24 Ore</strong>
                    <span className="text-slate-500">Un tecnico dedicato prenderà in carico la tua pratica.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-[#0B192C] block">Nessun Vincolo Contrattuale</strong>
                    <span className="text-slate-500">Check-up preliminare e preventivo sempre gratuiti e trasparenti.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Complete Interactive Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="py-12 px-6 text-center space-y-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1B4332] flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="font-serif-display text-2xl font-bold text-[#0B192C]">
                    Richiesta Ricevuta con Successo
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Grazie <strong>{formData.fullName}</strong>. Un consulente tecnico della sede di <strong>{formData.preferredLocation}</strong> ti contatterà all’indirizzo <strong>{formData.email}</strong> entro 24 ore.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Invia un’altra richiesta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span className="font-medium">{errorMessage}</span>
                    </div>
                  )}

                  {/* Submission Progress Bar when loading */}
                  {isSubmitting && (
                    <div className="w-full bg-emerald-100 rounded-full h-1 overflow-hidden">
                      <div className="bg-[#1B4332] h-full w-full animate-pulse transition-all duration-500" />
                    </div>
                  )}

                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                    {/* Nome e Cognome */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-fullName" className="text-xs font-bold text-slate-700">
                          Nome e Cognome *
                        </label>
                        <span className={`text-[10px] font-mono ${formData.fullName.length > 60 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                          {formData.fullName.length}/70
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          id="contact-fullName"
                          type="text"
                          required
                          disabled={isSubmitting}
                          maxLength={70}
                          placeholder="Es. Mario Rossi"
                          value={formData.fullName}
                          onChange={(e) => handleFieldChange('fullName', e.target.value)}
                          onBlur={() => handleFieldBlur('fullName')}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 ${
                            errors.fullName
                              ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                              : touched.fullName && formData.fullName.length >= 3
                              ? 'border-emerald-500/60 focus:ring-emerald-200'
                              : 'border-slate-300 focus:ring-[#1B4332] focus:border-transparent'
                          }`}
                        />
                        {touched.fullName && !errors.fullName && formData.fullName.length >= 3 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                        )}
                      </div>
                      {errors.fullName && (
                        <div className="flex items-center gap-1.5 text-[11px] text-rose-600 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </div>
                      )}
                    </div>

                    {/* Ragione Sociale Azienda */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-company" className="text-xs font-bold text-slate-700">
                          Ragione Sociale Azienda *
                        </label>
                        <span className={`text-[10px] font-mono ${formData.company.length > 85 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                          {formData.company.length}/100
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          id="contact-company"
                          type="text"
                          required
                          disabled={isSubmitting}
                          maxLength={100}
                          placeholder="Es. Officine Meccaniche SpA"
                          value={formData.company}
                          onChange={(e) => handleFieldChange('company', e.target.value)}
                          onBlur={() => handleFieldBlur('company')}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 ${
                            errors.company
                              ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                              : touched.company && formData.company.length >= 2
                              ? 'border-emerald-500/60 focus:ring-emerald-200'
                              : 'border-slate-300 focus:ring-[#1B4332] focus:border-transparent'
                          }`}
                        />
                        {touched.company && !errors.company && formData.company.length >= 2 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                        )}
                      </div>
                      {errors.company && (
                        <div className="flex items-center gap-1.5 text-[11px] text-rose-600 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.company}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                    {/* Email Aziendale */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-email" className="text-xs font-bold text-slate-700">
                          Email Aziendale *
                        </label>
                        <span className={`text-[10px] font-mono ${formData.email.length > 80 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                          {formData.email.length}/100
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          id="contact-email"
                          type="email"
                          required
                          disabled={isSubmitting}
                          maxLength={100}
                          placeholder="m.rossi@azienda.it"
                          value={formData.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          onBlur={() => handleFieldBlur('email')}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 ${
                            errors.email
                              ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                              : touched.email && !errors.email && formData.email.includes('@')
                              ? 'border-emerald-500/60 focus:ring-emerald-200'
                              : 'border-slate-300 focus:ring-[#1B4332] focus:border-transparent'
                          }`}
                        />
                        {touched.email && !errors.email && formData.email.includes('@') && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                        )}
                      </div>
                      {errors.email && (
                        <div className="flex items-center gap-1.5 text-[11px] text-rose-600 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Telefono Diretto */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-phone" className="text-xs font-bold text-slate-700">
                          Telefono Diretto *
                        </label>
                        <span className={`text-[10px] font-mono ${formData.phone.length > 15 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                          {formData.phone.length}/20
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          disabled={isSubmitting}
                          maxLength={20}
                          placeholder="+39 333 1234567"
                          value={formData.phone}
                          onChange={(e) => handleFieldChange('phone', e.target.value)}
                          onBlur={() => handleFieldBlur('phone')}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 ${
                            errors.phone
                              ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                              : touched.phone && !errors.phone && formData.phone.length >= 6
                              ? 'border-emerald-500/60 focus:ring-emerald-200'
                              : 'border-slate-300 focus:ring-[#1B4332] focus:border-transparent'
                          }`}
                        />
                        {touched.phone && !errors.phone && formData.phone.length >= 6 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                        )}
                      </div>
                      {errors.phone && (
                        <div className="flex items-center gap-1.5 text-[11px] text-rose-600 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                    {/* Tipologia di Interesse */}
                    <div className="space-y-1">
                      <label htmlFor="contact-interestType" className="text-xs font-bold text-slate-700">
                        Tipologia di Interesse
                      </label>
                      <select
                        id="contact-interestType"
                        disabled={isSubmitting}
                        value={formData.interestType}
                        onChange={(e) => handleFieldChange('interestType', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1B4332] focus:border-transparent bg-slate-50/50 cursor-pointer"
                      >
                        <option value="Consulenza Direzionale & Sistemi HSE">Consulenza Direzionale & Sistemi HSE</option>
                        <option value="Incarico RSPP Esterno">Incarico RSPP Esterno</option>
                        <option value="Formazione Corsi Accreditati (Aula / FAD)">Formazione Corsi Accreditati (Aula / FAD)</option>
                        <option value="Medicina del Lavoro & Visite Mediche">Medicina del Lavoro & Visite Mediche</option>
                        <option value="Check-up Gap Analysis Gratuito">Check-up Gap Analysis Gratuito</option>
                      </select>
                    </div>

                    {/* Sede di Riferimento Preferita */}
                    <div className="space-y-1">
                      <label htmlFor="contact-preferredLocation" className="text-xs font-bold text-slate-700">
                        Sede di Riferimento Preferita
                      </label>
                      <select
                        id="contact-preferredLocation"
                        disabled={isSubmitting}
                        value={formData.preferredLocation}
                        onChange={(e) => handleFieldChange('preferredLocation', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1B4332] focus:border-transparent bg-slate-50/50 cursor-pointer"
                      >
                        <option value="Treviso (Sede Operativa)">Treviso (Sede Operativa & Corsi)</option>
                        <option value="Milano (Hub Direzionale)">Milano (Hub Direzionale)</option>
                        <option value="Presidio Nazionale / In-Company">Presidio Nazionale / Presso Azienda</option>
                      </select>
                    </div>
                  </div>

                  {/* Messaggio o Requisiti */}
                  <div className={`space-y-1 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message" className="text-xs font-bold text-slate-700">
                        Dettagli della richiesta o note aggiuntive
                      </label>
                      <span className={`text-[10px] font-mono ${(formData.message?.length || 0) > 900 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                        {formData.message?.length || 0}/1000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={3}
                      disabled={isSubmitting}
                      maxLength={1000}
                      placeholder="Descrivi brevemente la tua realtà aziendale, il numero di dipendenti o i corsi di tuo interesse..."
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      onBlur={() => handleFieldBlur('message')}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 resize-none ${
                        errors.message
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-slate-300 focus:ring-[#1B4332] focus:border-transparent'
                      }`}
                    />
                    {errors.message && (
                      <div className="flex items-center gap-1.5 text-[11px] text-rose-600 mt-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div className={`pt-1 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}>
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        id="contact-privacyAccepted"
                        type="checkbox"
                        disabled={isSubmitting}
                        checked={formData.privacyAccepted === true}
                        onChange={(e) => handleFieldChange('privacyAccepted', e.target.checked as true)}
                        className={`mt-0.5 w-4 h-4 rounded text-[#1B4332] focus:ring-[#1B4332] cursor-pointer ${
                          errors.privacyAccepted ? 'border-rose-400 ring-2 ring-rose-200' : 'border-slate-300'
                        }`}
                      />
                      <span>
                        Ho letto e accetto l’<a href="#privacy" className="text-[#1B4332] underline font-semibold">informativa sulla privacy</a> (Regolamento UE 2016/679 - GDPR) per il trattamento dei dati personali.*
                      </span>
                    </label>
                    {errors.privacyAccepted && (
                      <div className="flex items-center gap-1.5 text-[11px] text-rose-600 mt-1 font-medium pl-6">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.privacyAccepted}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button with Loading State */}
                  <div className="pt-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#1B4332] hover:bg-[#143326] transition-all cursor-pointer shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Invio richiesta in corso...</span>
                        </>
                      ) : (
                        <>
                          <span>Invia Richiesta di Consulenza Gratuita</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332]">
              DOMANDE FREQUENTI
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#0B192C] font-bold tracking-tight">
              Domande frequenti sulla consulenza e formazione
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Tutto quello che c’è da sapere per avviare il percorso con E.M Safety in modo chiaro e trasparente.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0B192C] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1B4332]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

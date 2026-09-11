import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';
import { ContactFormData } from '../types';
import { useAdminStore } from '../utils/adminStore';

export const ContactSection: React.FC = () => {
  const { addLead } = useAdminStore();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    subject: 'Come possiamo aiutarti?',
    message: '',
    privacyAccepted: false,
    newsletterAccepted: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMessage('Inserisci il tuo nome e cognome.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Inserisci un indirizzo email valido.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Descrivi brevemente la tua esigenza nel messaggio.');
      return;
    }
    if (!formData.privacyAccepted) {
      setErrorMessage('È necessario accettare l’informativa privacy per procedere.');
      return;
    }

    setErrorMessage('');
    addLead({
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      source: 'Contatti',
      subject: formData.subject || 'Richiesta Contatto',
      message: formData.message,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      subject: 'Come possiamo aiutarti?',
      message: '',
      privacyAccepted: false,
      newsletterAccepted: false,
    });
  };

  return (
    <section id="contatti" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Context & Imagery */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
                CONTATTO DIRETTO
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
                Raccontaci la tua esigenza
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                Consapevolezza prima di tutto: nessun impegno contrattuale immediato, solo un confronto tecnico
                per comprendere quale percorso di consulenza o calendario corsi è più conforme alla tua realtà produttiva.
              </p>
            </div>

            {/* Handshake meeting image */}
            <div className="rounded-2xl overflow-hidden shadow-md aspect-4/3 bg-slate-100 border border-slate-200 group">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                alt="Incontro consulenza sicurezza lavoro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Scrivici Card Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
            {submitted ? (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-[#0A66C2] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif-display text-2xl text-[#0B192C] font-bold">
                  Richiesta inoltrata con successo
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Grazie {formData.fullName}, abbiamo registrato la tua richiesta per{' '}
                  <strong className="text-slate-900">{formData.company || 'la tua azienda'}</strong>.
                  Un nostro consulente dedicato ti ricontatterà entro <strong className="text-[#0A66C2]">48 ore lavorative</strong>.
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-mono border border-slate-200">
                    Rif: EMS-2026-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Invia un'altra richiesta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif-display text-2xl text-[#0B192C] font-bold mb-4">
                  Scrivici un messaggio
                </h3>

                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nome e cognome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Mario Rossi"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Azienda
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ragione Sociale S.r.l."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email aziendale *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="mario@azienda.it"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+39 0422 ..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Oggetto
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Come possiamo aiutarti?"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Messaggio o specifica esigenza *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descrivi brevemente numero di dipendenti, sede o tipologia di corso/consulenza..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 pt-2 text-xs text-slate-600">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      className="mt-0.5 rounded text-[#0A66C2] focus:ring-[#0A66C2] w-4 h-4 border-slate-300 cursor-pointer"
                    />
                    <span className="leading-snug">
                      Ho letto e accetto l'<span className="underline font-semibold text-slate-900">informativa privacy (Reg. UE 2016/679)</span>. *
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.newsletterAccepted}
                      onChange={(e) => setFormData({ ...formData, newsletterAccepted: e.target.checked })}
                      className="mt-0.5 rounded text-[#0A66C2] focus:ring-[#0A66C2] w-4 h-4 border-slate-300 cursor-pointer"
                    />
                    <span className="leading-snug">
                      Acconsento a ricevere aggiornamenti normativi e scadenziari corsi da E.M Safety (facoltativo).
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors shadow-md cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Invia la richiesta</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

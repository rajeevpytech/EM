import React, { useState } from 'react';
import { Shield, KeyRound, Mail, CheckCircle2, ArrowRight, BellRing } from 'lucide-react';
import { Logo } from './Logo';
import { PageType } from '../types';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenQuote: () => void;
  onOpenSimulatore: () => void;
  onOpenAdmin?: () => void;
  onNavigate?: (page: PageType, targetElementId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenQuote,
  onOpenSimulatore,
  onOpenAdmin,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setStatus('error');
      setErrorMessage('Inserisci un indirizzo email valido.');
      return;
    }

    if (!privacyConsent) {
      setStatus('error');
      setErrorMessage('È necessario accettare l\'informativa sulla privacy per procedere.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate API submission
    setTimeout(() => {
      // Save subscription locally
      try {
        const existing = JSON.parse(localStorage.getItem('emsafety_newsletter_subscribers') || '[]');
        if (!existing.includes(trimmedEmail)) {
          existing.push(trimmedEmail);
          localStorage.setItem('emsafety_newsletter_subscribers', JSON.stringify(existing));
        }
      } catch {
        // Safe fallback
      }

      setStatus('success');
      setEmail('');
      setPrivacyConsent(false);
    }, 600);
  };

  const handleGo = (page: PageType, targetId?: string) => {
    if (onNavigate) {
      onNavigate(page, targetId);
    } else {
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#081220] text-slate-300 pt-16 pb-12 border-t border-[#1E3E62]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Signup Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0c1f38] to-[#0A2647] border border-blue-900/40 p-6 sm:p-8 lg:p-10 shadow-xl">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#0A66C2]/15 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-[#70B5F9] text-xs font-semibold">
                <BellRing className="w-3.5 h-3.5" />
                <span>Aggiornamenti Normativi D.Lgs. 81/08</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Resta sempre aggiornato sulla sicurezza
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Iscriviti alla nostra newsletter tecnica mensile: circolari ministeriali, scadenze formative,
                nuovi accordi Stato-Regioni e approfondimenti dai nostri RSPP certificati. Niente spam.
              </p>
            </div>

            <div className="lg:col-span-6">
              {status === 'success' ? (
                <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-xl p-5 flex items-start gap-3.5 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">
                      Iscrizione completata con successo!
                    </p>
                    <p className="text-xs text-emerald-200">
                      Grazie per esserti iscritto. Riceverai la prossima edizione della nostra rassegna tecnica direttamente nella tua casella di posta.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-xs text-emerald-300 hover:text-white underline underline-offset-2 cursor-pointer font-medium"
                    >
                      Iscrivi un'altra email
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3" id="footer-newsletter-form">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        id="footer-newsletter-email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        placeholder="Inserisci la tua email aziendale..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                        disabled={status === 'loading'}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      id="footer-newsletter-submit-btn"
                      disabled={status === 'loading'}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] disabled:opacity-60 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
                    >
                      <span>{status === 'loading' ? 'Iscrizione in corso...' : 'Iscriviti ora'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Privacy Checkbox & Error Message */}
                  <div className="space-y-1.5">
                    <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-400 select-none">
                      <input
                        type="checkbox"
                        id="footer-newsletter-privacy"
                        checked={privacyConsent}
                        onChange={(e) => {
                          setPrivacyConsent(e.target.checked);
                          if (status === 'error') setStatus('idle');
                        }}
                        className="mt-0.5 rounded border-slate-700 text-[#0A66C2] focus:ring-0 focus:ring-offset-0 bg-slate-900"
                      />
                      <span>
                        Ho letto e accetto l'{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenPrivacy();
                          }}
                          className="text-[#70B5F9] hover:underline cursor-pointer font-medium"
                        >
                          informativa privacy
                        </button>
                        . Posso annullare l'iscrizione in qualsiasi momento con 1 clic.
                      </span>
                    </label>

                    {status === 'error' && errorMessage && (
                      <p className="text-xs text-rose-400 font-medium pl-6">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo variant="light" size="lg" className="h-[52px] sm:h-[62px] w-auto" />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Consulenza specialistica e formazione per la sicurezza sul lavoro (D.Lgs. 81/08). Affianchiamo imprese, responsabili
              HR e RSPP con un approccio concreto, certificato e su misura. Sedi operative a Treviso e Milano.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2 text-[#70B5F9] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#0A66C2] inline-block" />
                <span>Ente Accreditato Regione Veneto & Lombardia</span>
              </p>
              <p className="text-slate-400 text-xs">
                Attestati a norma di legge con tracciamento digitale univoco e verifica anticontraffazione QR Code.
              </p>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white">
              NAVIGAZIONE
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleGo('home')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('story')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer text-white font-medium"
                >
                  La Nostra Storia (1994 - 2026)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('about')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer"
                >
                  Chi siamo (About Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('home', 'affiliazioni')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer text-[#70B5F9] font-semibold"
                >
                  Affiliazioni (ANFOS • OPN • DAN)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('home', 'radar-sgi')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer"
                >
                  Servizi & Radar di Conformità SGI
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('home', 'catalogo-corsi')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer"
                >
                  Catalogo Corsi Accreditati
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('home', 'calendario')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer"
                >
                  Calendario sessioni 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('partner')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer text-white font-medium"
                >
                  Collabora con Noi (Rete Docenti & Medici)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('testimonials')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer text-amber-400 font-medium"
                >
                  Testimonianze & Casi Studio (4.9/5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('careers')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer text-orange-400 font-medium"
                >
                  Lavora con Noi (Carriere)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSimulatore}
                  className="text-[#70B5F9] font-bold hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Simulatore Obblighi 2026</span>
                  <span className="text-[10px] bg-[#0A66C2] text-white px-2 py-0.5 rounded-full font-extrabold">
                    NUOVO
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleGo('contact')}
                  className="hover:text-[#70B5F9] transition-colors cursor-pointer font-bold text-white"
                >
                  Contattaci (Milano & Treviso)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="hover:text-white font-semibold transition-colors cursor-pointer text-[#70B5F9]"
                >
                  Richiedi un preventivo
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts & Legal Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white">
                CONTATTI SEDI
              </h4>
              <p className="text-xs text-slate-300">
                Treviso (Sede Nord-Est) — Milano (Sede Centrale)
              </p>
              <a
                href="mailto:info@emsafety.it"
                className="block text-xs font-bold text-[#70B5F9] hover:text-white transition-colors"
              >
                info@emsafety.it
              </a>
              <p className="text-xs text-slate-400">
                Tel. +39 0422 1834920
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white">
                NOTE LEGALI
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <button onClick={onOpenPrivacy} className="hover:text-[#70B5F9] transition-colors cursor-pointer">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPrivacy} className="hover:text-[#70B5F9] transition-colors cursor-pointer">
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPrivacy} className="hover:text-[#70B5F9] transition-colors cursor-pointer">
                    Preferenze cookie
                  </button>
                </li>
                {onOpenAdmin && (
                  <li className="pt-2">
                    <button
                      onClick={onOpenAdmin}
                      className="inline-flex items-center gap-1.5 text-[#70B5F9] hover:text-white transition-colors cursor-pointer font-semibold"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-orange-400" />
                      <span>Accesso Admin (Back-Office)</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 E.M Safety S.r.l. — P.IVA 04982170268 — REA TV-412890</p>
          <div className="flex items-center gap-4">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px] font-semibold"
                title="Pannello Amministrazione (ID: admin / safety2026)"
              >
                <KeyRound className="w-3 h-3 text-orange-400" />
                <span>Pannello Admin</span>
                <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1 py-0.2 rounded font-mono">
                  ID: admin
                </span>
              </button>
            )}
            <p className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#0A66C2]" />
              <span>La sicurezza al primo posto</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Shield, KeyRound } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif-display text-2xl font-black tracking-tight text-white">
                    E.M.
                  </span>
                  <span className="text-sm font-black tracking-[0.2em] text-[#0A66C2] uppercase">
                    Safety
                  </span>
                </div>
                <span className="text-[10px] tracking-wider text-slate-400 font-semibold uppercase">
                  Consulenze & Formazioni
                </span>
              </div>
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

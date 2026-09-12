import React, { useState } from 'react';
import { X, Cloud, Lock, Download, ShieldCheck, CheckCircle2, AlertTriangle, FileText, User } from 'lucide-react';

interface AreaClientiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AreaClientiModal: React.FC<AreaClientiModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'login'>('preview');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerDownloadNotice = (filename: string) => {
    setDownloadNotice(`Download avviato per: ${filename}`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSuccess(true);
    setTimeout(() => {
      setLoginSuccess(false);
      setActiveTab('preview');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#152B44] border border-[#1E3E62] flex items-center justify-center">
              <Cloud className="w-5 h-5 text-[#0A66C2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-display text-xl font-bold text-white">
                  E.M. Safety Cloud Portal
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-extrabold tracking-wider bg-[#0A66C2] text-white rounded-full uppercase">
                  CLOUD
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Piattaforma documentale per RSPP, HR e Datori di Lavoro
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'preview'
                ? 'border-[#0A66C2] text-[#0B192C] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Registro Documentale & Attestati
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'login'
                ? 'border-[#0A66C2] text-[#0B192C] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Accesso Riservato Aziende
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {downloadNotice && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadNotice}</span>
            </div>
          )}

          {activeTab === 'preview' ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-xs text-[#0B192C] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#0A66C2]" />
                  <span>Stato Compliance Aziendale: <strong className="text-emerald-700">100% REGOLARE</strong></span>
                </div>
                <span className="text-[11px] text-[#0B192C] font-bold bg-white px-2 py-0.5 rounded border border-blue-200">Audit 2026 Conforme</span>
              </div>

              {/* Sample files */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Documenti & Attestati Recenti (Archivio Digitale a Norma)
                </h4>

                <div className="space-y-2">
                  {[
                    {
                      name: 'DVR_Aggiornamento_2026_Rev04.pdf',
                      meta: 'Valutazione Rischi Generale • Firmato digitalmente',
                      date: '10 Feb 2026',
                      type: 'DVR',
                    },
                    {
                      name: 'Attestati_Antincendio_Livello2_Marzo2026.zip',
                      meta: '12 attestati nominativi con QR-Code verifica INL',
                      date: '02 Mar 2026',
                      type: 'Corsi',
                    },
                    {
                      name: 'Certificato_Conformita_ISO_45001_2018.pdf',
                      meta: 'Ente Terzo Accreditato Accredia • Scadenza 2028',
                      date: '18 Gen 2026',
                      type: 'ISO',
                    },
                  ].map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#0B192C] shrink-0" />
                        <div>
                          <span className="block text-xs font-bold text-slate-900">{doc.name}</span>
                          <span className="block text-[11px] text-slate-500">{doc.meta}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDownloadNotice(doc.name)}
                        className="p-2 text-slate-600 hover:text-[#0A66C2] rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Scarica documento"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scadenziario Alert */}
              <div className="border border-blue-200 bg-blue-50/60 p-3.5 rounded-xl flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-800">
                  <span className="font-bold text-[#0B192C]">Scadenziario Smart Attivo:</span> La piattaforma notifica in automatico ad HR ed RSPP le scadenze formative 60 e 30 giorni prima per evitare vuoti di conformità.
                </div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleLoginSubmit}
              className="space-y-4 max-w-md mx-auto py-4"
            >
              {loginSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Accesso verificato. Caricamento documentale in corso...</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Aziendale o Username
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@azienda-partner.it"
                  required
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password di Accesso
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <a href="#" className="text-[#0A66C2] font-semibold hover:underline">
                  Password dimenticata?
                </a>
                <span className="text-slate-400">Accesso SSL 256-bit</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0B192C] hover:bg-[#0A66C2] transition-colors shadow-md cursor-pointer"
              >
                Accedi al Portale
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <span>Supporto dedicato Cloud: helpdesk@emsafety.it</span>
          <button onClick={onClose} className="font-semibold text-neutral-700 hover:underline">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

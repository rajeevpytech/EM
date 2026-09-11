import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Image as ImageIcon,
  RotateCcw,
  Check,
  Upload,
  Sparkles,
  ExternalLink,
  Sliders,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { SiteImages, useSiteImages, DEFAULT_SITE_IMAGES } from '../../utils/imageStore';

interface AdminImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminImageModal: React.FC<AdminImageModalProps> = ({ isOpen, onClose }) => {
  const [siteImages, setSiteImages, resetAllImages] = useSiteImages();

  // Local draft state
  const [draftImages, setDraftImages] = useState<SiteImages>(siteImages);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Login form fields
  const [adminId, setAdminId] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Active category tab in admin panel
  const [activeTab, setActiveTab] = useState<'branding' | 'hero' | 'story' | 'ssgi' | 'sections'>('branding');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default credentials: ID = admin, Password = safety2026
    if (adminId.trim().toLowerCase() === 'admin' && adminPassword.trim() === 'safety2026') {
      setIsAuthenticated(true);
      setLoginError('');
      setDraftImages(siteImages);
    } else {
      setLoginError('ID o Password non corretti. Verifica le credenziali indicate.');
    }
  };

  const handleFieldChange = (key: keyof SiteImages, value: string) => {
    setDraftImages((prev) => ({ ...prev, [key]: value }));
    setSavedSuccess(false);
  };

  const handleFileUpload = (key: keyof SiteImages, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        handleFieldChange(key, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSiteImages(draftImages);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetSingle = (key: keyof SiteImages) => {
    handleFieldChange(key, DEFAULT_SITE_IMAGES[key]);
  };

  const handleResetAll = () => {
    if (window.confirm('Sei sicuro di voler ripristinare tutte le immagini ai valori originali di fabbrica?')) {
      resetAllImages();
      setDraftImages(DEFAULT_SITE_IMAGES);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const renderImageField = (
    label: string,
    key: keyof SiteImages,
    description: string,
    presetUrls: { title: string; url: string }[] = []
  ) => {
    const currentVal = draftImages[key];
    return (
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-[#0B192C]">{label}</h4>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
          <button
            type="button"
            onClick={() => handleResetSingle(key)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0A66C2] self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Valore Predefinito</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Preview Thumbnail */}
          <div className="md:col-span-4 aspect-16/10 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative group flex items-center justify-center">
            {currentVal ? (
              <img
                src={currentVal}
                alt={label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_SITE_IMAGES[key];
                }}
              />
            ) : (
              <div className="p-3 text-center text-xs text-slate-500 flex flex-col items-center gap-1">
                <ImageIcon className="w-6 h-6 text-slate-400" />
                <span>Logo Vettoriale Nativo Attivo</span>
              </div>
            )}
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0B192C]/80 text-[10px] text-white font-mono">
              Anteprima
            </div>
          </div>

          {/* Controls */}
          <div className="md:col-span-8 space-y-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                URL Immagine (Web / Unsplash / CDN)
              </label>
              <input
                type="text"
                value={currentVal}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                placeholder="https://... oppure lascia vuoto per predefinito"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
              />
            </div>

            {/* File Upload from PC */}
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0A66C2] text-xs font-semibold text-slate-700 cursor-pointer shadow-xs transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>Carica dal Computer</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(key, e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>

              {/* Presets */}
              {presetUrls.length > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-400 text-[11px]">Preset:</span>
                  {presetUrls.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleFieldChange(key, preset.url)}
                      className="px-2 py-1 rounded bg-slate-200/80 hover:bg-[#0A66C2] hover:text-white text-[11px] font-medium text-slate-700 transition-colors cursor-pointer"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B192C]/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Strip */}
        <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between border-b border-[#1E3E62] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white">
              {isAuthenticated ? <Sliders className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-serif-display text-base sm:text-lg font-bold">
                Pannello Amministratore Gestione Immagini
              </h3>
              <p className="text-[11px] text-slate-300">
                Aggiorna logo, slogan, SSGI motion e foto di fabbrica in tempo reale
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Chiudi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#0A66C2] flex items-center justify-center mx-auto shadow-inner">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h4 className="font-serif-display text-2xl font-bold text-[#0B192C]">
                  Accesso Riservato Admin
                </h4>
                <p className="text-xs text-slate-600">
                  Inserisci le credenziali di amministratore per modificare e caricare le immagini del sito web.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    ID Amministratore
                  </label>
                  <input
                    type="text"
                    required
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password di Sicurezza
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />
                </div>

                {/* Helpful credentials reminder badge */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-[#0B192C] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Credenziali Predefinite:</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-700">
                    ID: <strong className="text-[#0A66C2]">admin</strong> &bull; Password: <strong className="text-[#0A66C2]">safety2026</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                >
                  Accedi al Pannello Immagini
                </button>
              </form>
            </div>
          ) : (
            /* Admin Portal Tabs & Fields */
            <div className="space-y-6">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setActiveTab('branding')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'branding'
                      ? 'bg-[#0B192C] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Logo & Slogan
                </button>
                <button
                  onClick={() => setActiveTab('hero')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'hero'
                      ? 'bg-[#0B192C] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Hero Slides (Home)
                </button>
                <button
                  onClick={() => setActiveTab('story')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'story'
                      ? 'bg-[#0B192C] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Foto Storia & Archivio
                </button>
                <button
                  onClick={() => setActiveTab('ssgi')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'ssgi'
                      ? 'bg-[#0B192C] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  SSGI Motion Graphic
                </button>
                <button
                  onClick={() => setActiveTab('sections')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'sections'
                      ? 'bg-[#0B192C] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Sezioni (Chi Siamo, Due Percorsi, Contatti)
                </button>
              </div>

              {/* Tab 1: Branding */}
              {activeTab === 'branding' && (
                <div className="space-y-4">
                  {renderImageField(
                    'Logo Ufficiale E.M. Safety',
                    'headerLogoUrl',
                    'Carica o specifica un file immagine per il logo. Se vuoto, viene utilizzato il logo vettoriale ad alta definizione con typography cut.',
                    [
                      { title: 'Vettoriale SVG', url: '/logo-em-safety.svg' },
                    ]
                  )}

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#0B192C]">Testo Slogan Ufficiale</h4>
                      <button
                        type="button"
                        onClick={() => handleFieldChange('headerSloganText', DEFAULT_SITE_IMAGES.headerSloganText)}
                        className="text-xs text-slate-500 hover:text-[#0A66C2]"
                      >
                        Ripristina Testo
                      </button>
                    </div>
                    <input
                      type="text"
                      value={draftImages.headerSloganText}
                      onChange={(e) => handleFieldChange('headerSloganText', e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-800"
                    />
                    <p className="text-[11px] text-slate-500">
                      Visualizzato nell'header accanto al logo, separato dal pipe verticaler |
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Hero Slides */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  {renderImageField(
                    'Slide 1: Hub Direzionale Milano',
                    'heroSlideMilan',
                    'Visuale architettonica di Porta Nuova / Piazza Gae Aulenti',
                    [
                      { title: 'Locale', url: '/hero-milan.jpg' },
                      { title: 'Skyline Milano', url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80' },
                    ]
                  )}
                  {renderImageField(
                    'Slide 2: Cantieri & Industria',
                    'heroSlideField',
                    'Audit e ispezioni sul campo presso fabbriche e stabilimenti',
                    [
                      { title: 'Ingegneria Cantiere', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80' },
                      { title: 'Automazione Fabbrica', url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80' },
                    ]
                  )}
                  {renderImageField(
                    'Slide 3: Safety Academy & Formazione',
                    'heroSlideTraining',
                    'Aule accreditate e docenti esperti per lavoratori e preposti',
                    [
                      { title: 'Aule Treviso/Milano', url: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80' },
                    ]
                  )}
                </div>
              )}

              {/* Tab 3: Story Picture */}
              {activeTab === 'story' && (
                <div className="space-y-4">
                  {renderImageField(
                    'Immagine "La Nostra Storia" (Home & Pagina Dedicata)',
                    'ourStoryImage',
                    'Mostra i 30+ anni di evoluzione (1994 - 2026), dal D.Lgs. 626 al Nuovo Accordo 2026',
                    [
                      { title: 'Ingegneria & Progetti', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80' },
                      { title: 'Laboratorio Rilievi', url: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=1000&q=80' },
                      { title: 'Stabilimento Moderno', url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80' },
                    ]
                  )}
                </div>
              )}

              {/* Tab 4: SSGI Motion Image */}
              {activeTab === 'ssgi' && (
                <div className="space-y-4">
                  {renderImageField(
                    'Sfondo Motion Radar SSGI (ISO 45001 / 9001 / D.Lgs 81 / 14001)',
                    'ssgiMotionImage',
                    'Immagine cinematografica animata in dissolvenza che alimenta la scansione radar continua',
                    [
                      { title: 'Fabbrica Intelligente', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
                      { title: 'Sensori & Robotica', url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80' },
                    ]
                  )}
                </div>
              )}

              {/* Tab 5: Other Sections */}
              {activeTab === 'sections' && (
                <div className="space-y-4">
                  {renderImageField(
                    'Chi Siamo (Sezione Home)',
                    'aboutImage',
                    'Tecnici e ingegneri E.M. Safety sul campo',
                    [
                      { title: 'Ispezione Tecnica', url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80' },
                      { title: 'Consulenza Direzionale', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80' },
                    ]
                  )}
                  {renderImageField(
                    'Due Percorsi - Consulenza Aziendale',
                    'twoPathsConsultancy',
                    'Card Consulenza Tecnica e RSPP esterno',
                    [
                      { title: 'Ufficio & Audit', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80' },
                    ]
                  )}
                  {renderImageField(
                    'Due Percorsi - Formazione Accreditata',
                    'twoPathsCourses',
                    'Card Corsi di Formazione e Aule',
                    [
                      { title: 'Aula Corsi', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80' },
                    ]
                  )}
                  {renderImageField(
                    'Contatti - Foto Confronto Tecnico',
                    'contactImage',
                    'Incontro preliminare e check-up',
                    [
                      { title: 'Accordo & Check-up', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80' },
                    ]
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 rounded-xl hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
                >
                  Ripristina Tutto di Fabbrica
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Disconnetti
                </button>
              </div>

              <div className="flex items-center gap-3">
                {savedSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold">
                    <Check className="w-4 h-4" /> Modifiche salvate con successo!
                  </span>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Chiudi
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Salva Tutte le Modifiche</span>
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Annulla
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

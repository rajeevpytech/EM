import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  BookOpen,
  Calendar,
  Inbox,
  Image as ImageIcon,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Upload,
  Phone,
  Mail,
  MapPin,
  Save,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Eye,
  EyeOff,
  Building2,
} from 'lucide-react';
import {
  useAdminStore,
  ADMIN_CREDENTIALS,
  getAdminAuthStatus,
  setAdminAuthStatus,
} from '../../utils/adminStore';
import { useSiteImages, DEFAULT_SITE_IMAGES, SiteImages } from '../../utils/imageStore';
import { Course, CalendarEvent, AdminLead, AdminLeadStatus, SafetyStory } from '../../types';
import { Logo } from '../Logo';
import { ImageUploadField } from './ImageUploadField';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome: () => void;
  initialTab?: 'panoramica' | 'testi' | 'corsi' | 'calendario' | 'storie' | 'leads' | 'media' | 'backup';
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onNavigateHome,
  initialTab,
}) => {
  const {
    siteInfo,
    courses,
    calendarEvents,
    leads,
    stories,
    updateSiteInfo,
    addCourse,
    updateCourse,
    deleteCourse,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    updateLeadStatus,
    deleteLead,
    addStory,
    updateStory,
    deleteStory,
    toggleStoryFeatured,
    resetAllData,
    exportAllData,
    importAllData,
  } = useAdminStore();

  const [siteImages, setSiteImages, resetAllImages] = useSiteImages();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getAdminAuthStatus());
  const [adminId, setAdminId] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [saveBanner, setSaveBanner] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'panoramica' | 'testi' | 'corsi' | 'calendario' | 'storie' | 'leads' | 'media' | 'backup'
  >(initialTab || 'panoramica');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Story Form state
  const [editingStory, setEditingStory] = useState<SafetyStory | null>(null);
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [storySearch, setStorySearch] = useState('');
  const [storySectorFilter, setStorySectorFilter] = useState<string>('all');
  const [storyForm, setStoryForm] = useState<Partial<SafetyStory>>({
    title: '',
    subtitle: '',
    clientCompany: '',
    sector: 'Metalmeccanica',
    location: 'Treviso (TV)',
    year: '2024 - 2026',
    metric: '0 Infortuni',
    metricLabel: 'negli ultimi 3 anni',
    summary: '',
    challenge: '',
    solution: '',
    results: '',
    quote: '',
    authorName: '',
    authorRole: '',
    badge: 'Caso Certificato',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
  });

  // Course Form Modal state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    code: '',
    title: '',
    category: '81/08',
    hours: 8,
    mode: 'Aula',
    target: '',
    nextDate: '',
    location: 'Treviso (Sede)',
    price: 'da € 150 + IVA',
    description: '',
    validityYears: 5,
  });

  // Calendar Form Modal state
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventForm, setEventForm] = useState<Partial<CalendarEvent>>({
    courseTitle: '',
    category: 'Sicurezza D.Lgs 81/08',
    startDate: '',
    startTime: '09:00 - 18:00',
    location: 'Treviso (Sede)',
    duration: '8 ore',
    seatsAvailable: 8,
    status: 'Confermato',
  });

  // Filter states
  const [courseSearch, setCourseSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | AdminLeadStatus>('all');

  // Draft Site Info for Text Tab
  const [draftInfo, setDraftInfo] = useState(siteInfo);

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = adminId.trim().toLowerCase();
    const cleanPwd = adminPassword.trim();

    if (
      (cleanId === ADMIN_CREDENTIALS.id && cleanPwd === ADMIN_CREDENTIALS.password) ||
      (cleanId === ADMIN_CREDENTIALS.id && cleanPwd === ADMIN_CREDENTIALS.fallbackPassword)
    ) {
      setIsAuthenticated(true);
      setAdminAuthStatus(true);
      setLoginError('');
      setDraftInfo(siteInfo);
    } else {
      setLoginError('Credenziali non corrette. ID o Password errati.');
    }
  };

  const handleQuickLogin = () => {
    setAdminId(ADMIN_CREDENTIALS.id);
    setAdminPassword(ADMIN_CREDENTIALS.password);
    setIsAuthenticated(true);
    setAdminAuthStatus(true);
    setLoginError('');
    setDraftInfo(siteInfo);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthStatus(false);
    setAdminId('');
    setAdminPassword('');
  };

  const showNotification = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(''), 3500);
  };

  // Course Save
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.code) {
      alert('Inserisci almeno Codice e Titolo del corso.');
      return;
    }

    if (editingCourse) {
      updateCourse({
        ...editingCourse,
        ...(courseForm as Course),
      });
      showNotification(`Corso "${courseForm.title}" aggiornato con successo.`);
    } else {
      const newC: Course = {
        id: 'c-' + Date.now(),
        code: courseForm.code || 'CORSO-' + Math.floor(Math.random() * 1000),
        title: courseForm.title || 'Nuovo Corso',
        category: (courseForm.category as any) || '81/08',
        hours: Number(courseForm.hours) || 8,
        mode: (courseForm.mode as any) || 'Aula',
        target: courseForm.target || 'Lavoratori',
        nextDate: courseForm.nextDate || 'In programmazione',
        location: courseForm.location || 'Treviso (Sede)',
        price: courseForm.price || 'da € 150 + IVA',
        description: courseForm.description || '',
        validityYears: Number(courseForm.validityYears) || 5,
      };
      addCourse(newC);
      showNotification(`Nuovo corso "${newC.title}" aggiunto al catalogo.`);
    }

    setIsAddingCourse(false);
    setEditingCourse(null);
  };

  // Calendar Event Save
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.courseTitle || !eventForm.startDate) {
      alert('Inserisci almeno Titolo del corso e Data di inizio.');
      return;
    }

    if (editingEvent) {
      updateCalendarEvent({
        ...editingEvent,
        ...(eventForm as CalendarEvent),
      });
      showNotification(`Edizione aggiornata nel calendario.`);
    } else {
      const newE: CalendarEvent = {
        id: 'cal-' + Date.now(),
        courseTitle: eventForm.courseTitle || 'Edizione Corso',
        category: eventForm.category || 'Sicurezza D.Lgs 81/08',
        startDate: eventForm.startDate || 'Prossima Edizione',
        startTime: eventForm.startTime || '09:00 - 18:00',
        location: (eventForm.location as any) || 'Treviso (Sede)',
        duration: eventForm.duration || '8 ore',
        seatsAvailable: Number(eventForm.seatsAvailable) || 8,
        status: (eventForm.status as any) || 'Confermato',
      };
      addCalendarEvent(newE);
      showNotification(`Nuova edizione programmata nel calendario.`);
    }

    setIsAddingEvent(false);
    setEditingEvent(null);
  };

  // Safety Story Save
  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.title || !storyForm.clientCompany) {
      alert('Inserisci almeno Titolo del caso studio e Azienda cliente.');
      return;
    }

    if (editingStory) {
      updateStory({
        ...editingStory,
        ...(storyForm as SafetyStory),
      });
      showNotification(`Storia aziendale di "${storyForm.clientCompany}" aggiornata con successo!`);
    } else {
      addStory({
        title: storyForm.title || 'Nuovo Caso Studio',
        subtitle: storyForm.subtitle || '',
        clientCompany: storyForm.clientCompany || 'Azienda Cliente',
        sector: storyForm.sector || 'Metalmeccanica & Manifattura',
        location: storyForm.location || 'Treviso (TV)',
        year: storyForm.year || '2024 - 2026',
        metric: storyForm.metric || '0 Infortuni',
        metricLabel: storyForm.metricLabel || 'negli ultimi 3 anni',
        summary: storyForm.summary || '',
        challenge: storyForm.challenge || '',
        solution: storyForm.solution || '',
        results: storyForm.results || '',
        quote: storyForm.quote || '',
        authorName: storyForm.authorName || '',
        authorRole: storyForm.authorRole || '',
        badge: storyForm.badge || 'Caso Reale Certificato',
        imageUrl: storyForm.imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
        featuredOnHome: storyForm.featuredOnHome !== false,
      });
      showNotification('Nuova storia aziendale pubblicata con successo! Ora è visibile sulla Home Page.');
    }

    setIsAddingStory(false);
    setEditingStory(null);
  };

  // Site Info Save
  const handleSaveSiteTexts = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteInfo(draftInfo);
    showNotification('Testi, slogan e recapiti aziendali aggiornati sul sito!');
  };

  // Image Upload helper
  const handleImageUpload = (key: keyof SiteImages, file: File | null) => {
    if (!file) return;
    if (file.size > 12 * 1024 * 1024) {
      showNotification('Nota: Il file supera i 12MB. Consigliamo file compressi per prestazioni ottimali.');
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        setSiteImages({ ...siteImages, [key]: reader.result });
        showNotification('Nuova immagine caricata e salvata con successo sul sito!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetSingleImage = (key: keyof SiteImages) => {
    setSiteImages({ ...siteImages, [key]: DEFAULT_SITE_IMAGES[key] });
    showNotification('Immagine ripristinata al valore predefinito.');
  };

  return (
    <div
      id="admin-dashboard-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* TOP HEADER: Clean Deep Blue/Black */}
        <div className="bg-[#0B192C] text-white px-5 py-4 border-b border-[#1E3E62] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  E.M. Safety • Back-Office
                </h2>
                {isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <Flame className="w-3 h-3 text-orange-400" /> Admin Attivo
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Pannello di Amministrazione Generale & Controllo Contenuti
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateHome();
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Vedi Sito Live</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOTIFICATION TOAST */}
        {saveBanner && (
          <div className="bg-orange-500 text-white px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between shadow-md shrink-0">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              {saveBanner}
            </span>
            <button
              type="button"
              onClick={() => setSaveBanner('')}
              className="text-white hover:text-slate-100 text-xs underline cursor-pointer"
            >
              Chiudi
            </button>
          </div>
        )}

        {/* CONTENT AREA */}
        {!isAuthenticated ? (
          /* ======================================================== */
          /* LOGIN VIEW WITH ZERO-FRICTION ONE-CLICK CREDENTIAL FILL */
          /* ======================================================== */
          <div className="p-6 sm:p-10 flex-1 overflow-y-auto bg-slate-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#0B192C] text-[#0A66C2] flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-7 h-7 text-[#70B5F9]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B192C]">
                  Accesso Area Riservata
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Inserisci le credenziali di amministratore per gestire tutti i contenuti del portale.
                </p>
              </div>

              {/* HIGHLIGHTED CREDENTIALS CALLOUT WITH ORANGE ACCENT */}
              <div className="p-4 rounded-xl bg-orange-50/70 border-2 border-orange-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-orange-600" />
                    Credenziali di Accesso Preview
                  </span>
                  <span className="text-[10px] bg-orange-200 text-orange-900 font-bold px-2 py-0.5 rounded">
                    Admin Full
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-orange-200/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">ID Admin</span>
                    <strong className="text-sm font-mono text-[#0B192C]">admin</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-orange-200/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Password</span>
                    <strong className="text-sm font-mono text-[#0B192C]">safety2026</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Compila & Accedi Automaticamente</span>
                </button>
              </div>

              {/* MANUAL LOGIN FORM */}
              <form onSubmit={handleLogin} className="space-y-4 pt-1">
                {loginError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ID Amministratore
                  </label>
                  <input
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="admin"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="safety2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0B192C] hover:bg-[#081220] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4 text-[#0A66C2]" />
                  <span>Accedi al Pannello Admin</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* LOGGED-IN ADMIN INTERFACE WITH TABS & COMPREHENSIVE CRUD */
          /* ======================================================== */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
            {/* SIDEBAR NAVIGATION */}
            <div className="w-full md:w-60 bg-[#081220] text-slate-300 p-3 flex md:flex-col gap-1 shrink-0 overflow-x-auto border-r border-slate-800">
              <div className="hidden md:block px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Controllo Sito
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('panoramica')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'panoramica'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Panoramica</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('testi')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'testi'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Testi & Identità</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('corsi')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'corsi'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Catalogo Corsi</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-700 text-slate-200">
                  {courses.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calendario')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'calendario'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Calendario Date</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-700 text-slate-200">
                  {calendarEvents.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('storie')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'storie'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 shrink-0 text-orange-400" />
                  <span>Storie & Casi Reali</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-700 text-slate-200 font-bold">
                  {stories.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4 shrink-0" />
                  <span>Inbox Richieste</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-500 text-white font-bold">
                  {leads.filter((l) => l.status === 'Nuova').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'media'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>Immagini & Media</span>
              </button>

              <div className="hidden md:block my-2 border-t border-slate-800" />

              <button
                type="button"
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'backup'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span>Backup & Ripristino</span>
              </button>
            </div>

            {/* TAB BODY */}
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto max-h-[calc(94vh-65px)]">
              {/* TAB 1: PANORAMICA */}
              {activeTab === 'panoramica' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B192C]">
                      Pannello Generale di Controllo
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Gestisci in tempo reale cataloghi, edizioni, testi, recapiti e richieste clienti.
                    </p>
                  </div>

                  {/* 5 Stat Cards in Clean Blue & Black with Orange Accent */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    <div
                      onClick={() => setActiveTab('corsi')}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-[#0A66C2] cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider">Corsi</span>
                        <BookOpen className="w-4 h-4 text-[#0A66C2]" />
                      </div>
                      <div className="text-2xl font-bold text-[#0B192C]">
                        {courses.length}
                      </div>
                      <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-block">
                        Catalogo &rarr;
                      </span>
                    </div>

                    <div
                      onClick={() => setActiveTab('calendario')}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-[#0A66C2] cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider">Calendario</span>
                        <Calendar className="w-4 h-4 text-[#0A66C2]" />
                      </div>
                      <div className="text-2xl font-bold text-[#0B192C]">
                        {calendarEvents.length}
                      </div>
                      <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-block">
                        Date &rarr;
                      </span>
                    </div>

                    <div
                      onClick={() => setActiveTab('storie')}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-orange-500 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider">Storie & Casi</span>
                        <Award className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold text-[#0B192C]">
                        {stories.length}
                      </div>
                      <span className="text-[11px] text-orange-600 font-semibold mt-1 inline-block">
                        {stories.filter((s) => s.featuredOnHome).length} in Home &rarr;
                      </span>
                    </div>

                    <div
                      onClick={() => setActiveTab('leads')}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-orange-500 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider">Richieste</span>
                        <Inbox className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold text-[#0B192C]">
                        {leads.length}
                      </div>
                      <span className="text-[11px] text-orange-600 font-semibold mt-1 inline-block">
                        {leads.filter((l) => l.status === 'Nuova').length} nuove &rarr;
                      </span>
                    </div>

                    <div
                      onClick={() => setActiveTab('media')}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-[#0A66C2] cursor-pointer transition-all col-span-2 sm:col-span-1"
                    >
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider">Media</span>
                        <ImageIcon className="w-4 h-4 text-[#0A66C2]" />
                      </div>
                      <div className="text-2xl font-bold text-[#0B192C]">
                        3 Slide
                      </div>
                      <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-block">
                        Personalizza &rarr;
                      </span>
                    </div>
                  </div>

                  {/* QUICK ACTIONS ROW */}
                  <div className="bg-[#0B192C] text-white p-5 rounded-2xl border border-[#1E3E62] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        Azioni Rapide di Amministrazione
                      </h4>
                      <span className="text-xs text-slate-400">Modifiche con salvataggio istantaneo</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingStory(null);
                          setStoryForm({
                            title: '',
                            subtitle: '',
                            clientCompany: '',
                            sector: 'Metalmeccanica & Manifattura',
                            location: 'Treviso (TV)',
                            year: '2025 - 2026',
                            metric: '0 Infortuni',
                            metricLabel: 'negli ultimi 3 anni',
                            summary: '',
                            challenge: '',
                            solution: '',
                            results: '',
                            quote: '',
                            authorName: '',
                            authorRole: '',
                            badge: 'Caso Certificato',
                            imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
                            featuredOnHome: true,
                          });
                          setIsAddingStory(true);
                          setActiveTab('storie');
                        }}
                        className="p-3 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/40 rounded-xl text-xs font-bold text-left flex items-center justify-between group transition-colors cursor-pointer text-orange-200"
                      >
                        <span className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-orange-400" />
                          <span>+ Nuova Storia di Successo</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingCourse(null);
                          setCourseForm({
                            code: 'NEW-' + Math.floor(100 + Math.random() * 900),
                            title: '',
                            category: '81/08',
                            hours: 8,
                            mode: 'Aula',
                            target: 'Lavoratori e preposti',
                            nextDate: 'Prossima Edizione',
                            location: 'Treviso (Sede)',
                            price: 'da € 160 + IVA',
                            description: '',
                            validityYears: 5,
                          });
                          setIsAddingCourse(true);
                          setActiveTab('corsi');
                        }}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 text-xs font-bold text-left flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <span>+ Aggiungi Nuovo Corso</span>
                        <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingEvent(null);
                          setEventForm({
                            courseTitle: courses[0]?.title || 'Corso Sicurezza',
                            category: 'Accreditata',
                            startDate: 'Mese Prossimo',
                            startTime: '09:00 - 18:00',
                            location: 'Treviso (Sede)',
                            duration: '8 ore',
                            seatsAvailable: 6,
                            status: 'Confermato',
                          });
                          setIsAddingEvent(true);
                          setActiveTab('calendario');
                        }}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 text-xs font-bold text-left flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <span>+ Pianifica Nuova Data</span>
                        <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('testi')}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 text-xs font-bold text-left flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <span>Modifica Slogan & Contatti</span>
                        <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* LATEST LEADS TABLE */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#0B192C] flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-[#0A66C2]" />
                        Ultime Richieste Ricevute (Inbox)
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab('leads')}
                        className="text-xs text-[#0A66C2] font-bold hover:underline"
                      >
                        Vedi tutte ({leads.length}) &rarr;
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {leads.slice(0, 3).map((lead) => (
                        <div key={lead.id} className="py-3 flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="text-xs font-bold text-[#0B192C]">
                                {lead.fullName}
                              </strong>
                              {lead.company && (
                                <span className="text-[11px] text-slate-500 font-medium">
                                  ({lead.company})
                                </span>
                              )}
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                  lead.status === 'Nuova'
                                    ? 'bg-orange-100 text-orange-700'
                                    : lead.status === 'In Lavorazione'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {lead.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-medium mt-0.5">
                              {lead.subject}
                            </p>
                            <span className="text-[10px] text-slate-400 block mt-1">
                              {lead.createdAt} • Fonte: {lead.source}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveTab('leads')}
                            className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          >
                            Dettagli
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TESTI & IDENTITÀ */}
              {activeTab === 'testi' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B192C]">
                        Testi, Slogan & Informazioni Aziendali
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Modifica lo slogan del brand, i recapiti telefonici, le sedi e le statistiche mostrate sul sito.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveSiteTexts} className="space-y-6">
                    {/* Brand & Slogan */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      <h4 className="text-sm font-bold text-[#0B192C] flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        Brand & Slogan Istituzionale
                      </h4>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Slogan Aziendale (mostrato nell'header, mobile banner e hero)
                        </label>
                        <input
                          type="text"
                          value={draftInfo.slogan}
                          onChange={(e) => setDraftInfo({ ...draftInfo, slogan: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#0A66C2] text-sm font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Badge Località Hero
                          </label>
                          <input
                            type="text"
                            value={draftInfo.heroBadge}
                            onChange={(e) => setDraftInfo({ ...draftInfo, heroBadge: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#0A66C2] text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nome Azienda
                          </label>
                          <input
                            type="text"
                            value={draftInfo.companyName}
                            onChange={(e) => setDraftInfo({ ...draftInfo, companyName: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#0A66C2] text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Sottotitolo Descrittivo Hero
                        </label>
                        <textarea
                          rows={3}
                          value={draftInfo.heroSubtitle}
                          onChange={(e) => setDraftInfo({ ...draftInfo, heroSubtitle: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#0A66C2] text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Contacts & Addresses */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      <h4 className="text-sm font-bold text-[#0B192C] flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#0A66C2]" />
                        Recapiti Telefonici & Sedi
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Telefono Fisso Sede
                          </label>
                          <input
                            type="text"
                            value={draftInfo.phone}
                            onChange={(e) => setDraftInfo({ ...draftInfo, phone: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Cellulare / Emergenze
                          </label>
                          <input
                            type="text"
                            value={draftInfo.emergencyPhone}
                            onChange={(e) => setDraftInfo({ ...draftInfo, emergencyPhone: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email Ufficiale
                          </label>
                          <input
                            type="email"
                            value={draftInfo.email}
                            onChange={(e) => setDraftInfo({ ...draftInfo, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Indirizzo Sede Milano
                          </label>
                          <input
                            type="text"
                            value={draftInfo.addressMilano}
                            onChange={(e) => setDraftInfo({ ...draftInfo, addressMilano: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Indirizzo Sede Treviso
                          </label>
                          <input
                            type="text"
                            value={draftInfo.addressTreviso}
                            onChange={(e) => setDraftInfo({ ...draftInfo, addressTreviso: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats ribbon counters */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      <h4 className="text-sm font-bold text-[#0B192C]">
                        Metriche & Numeri Chiave (Nastro Statistiche)
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Valore 1</label>
                          <input
                            type="text"
                            value={draftInfo.statYears}
                            onChange={(e) => setDraftInfo({ ...draftInfo, statYears: e.target.value })}
                            className="w-full px-2 py-1 font-bold text-lg border border-slate-300 rounded mb-1"
                          />
                          <input
                            type="text"
                            value={draftInfo.statYearsLabel}
                            onChange={(e) => setDraftInfo({ ...draftInfo, statYearsLabel: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-600"
                          />
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Valore 2</label>
                          <input
                            type="text"
                            value={draftInfo.statAreas}
                            onChange={(e) => setDraftInfo({ ...draftInfo, statAreas: e.target.value })}
                            className="w-full px-2 py-1 font-bold text-lg border border-slate-300 rounded mb-1"
                          />
                          <input
                            type="text"
                            value={draftInfo.statAreasLabel}
                            onChange={(e) => setDraftInfo({ ...draftInfo, statAreasLabel: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-600"
                          />
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Valore 3</label>
                          <input
                            type="text"
                            value={draftInfo.statModes}
                            onChange={(e) => setDraftInfo({ ...draftInfo, statModes: e.target.value })}
                            className="w-full px-2 py-1 font-bold text-lg border border-slate-300 rounded mb-1"
                          />
                          <input
                            type="text"
                            value={draftInfo.statModesLabel}
                            onChange={(e) => setDraftInfo({ ...draftInfo, statModesLabel: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-600"
                          />
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Valore 4</label>
                          <input
                            type="text"
                            value={draftInfo.statResponse}
                            onChange={(e) => setDraftInfo({ ...draftInfo, statResponse: e.target.value })}
                            className="w-full px-2 py-1 font-bold text-lg border border-slate-300 rounded mb-1"
                          />
                          <input
                            type="text"
                            value={draftInfo.statResponseLabel}
                            onChange={(e) => setDraftInfo({ ...draftInfo, statResponseLabel: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setDraftInfo(siteInfo)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                      >
                        Annulla Modifiche
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#081220] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-[#0A66C2]" />
                        <span>Salva Tutti i Testi Live</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: CATALOGO CORSI */}
              {activeTab === 'corsi' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B192C]">
                        Gestione Catalogo Corsi ({courses.length})
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Aggiungi, modifica o rimuovi i corsi formativi accreditati visibili sul sito.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingCourse(null);
                        setCourseForm({
                          code: 'CRS-' + Math.floor(100 + Math.random() * 900),
                          title: '',
                          category: '81/08',
                          hours: 8,
                          mode: 'Aula',
                          target: 'Lavoratori',
                          nextDate: 'Prossima Edizione',
                          location: 'Treviso (Sede)',
                          price: 'da € 150 + IVA',
                          description: '',
                          validityYears: 5,
                        });
                        setIsAddingCourse(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuovo Corso</span>
                    </button>
                  </div>

                  {/* SEARCH FILTER */}
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cerca corso per titolo o codice..."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      className="w-full text-xs font-medium focus:outline-none bg-transparent"
                    />
                  </div>

                  {/* COURSE FORM MODAL / DRAWER */}
                  {isAddingCourse && (
                    <div className="p-5 bg-blue-50/50 border-2 border-[#0A66C2]/30 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                        <h4 className="text-sm font-bold text-[#0B192C]">
                          {editingCourse ? 'Modifica Corso Esistente' : 'Crea Nuovo Corso a Catalogo'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingCourse(false);
                            setEditingCourse(null);
                          }}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveCourse} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Codice Corso *
                            </label>
                            <input
                              type="text"
                              value={courseForm.code || ''}
                              onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                              placeholder="es. ANT-21-02"
                              required
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Titolo Corso *
                            </label>
                            <input
                              type="text"
                              value={courseForm.title || ''}
                              onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                              placeholder="es. Addetto Antincendio Livello 2"
                              required
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Categoria
                            </label>
                            <select
                              value={courseForm.category || '81/08'}
                              onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            >
                              <option value="81/08">Lavoratori 81/08</option>
                              <option value="antincendio">Antincendio</option>
                              <option value="primo-soccorso">Primo Soccorso</option>
                              <option value="rspp-rls">RSPP & RLS</option>
                              <option value="attrezzature">Carrelli & PLE</option>
                              <option value="iso">Sistemi ISO</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Modalità
                            </label>
                            <select
                              value={courseForm.mode || 'Aula'}
                              onChange={(e) => setCourseForm({ ...courseForm, mode: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            >
                              <option value="Aula">In Aula</option>
                              <option value="Videoconferenza">Videoconferenza FAD</option>
                              <option value="E-learning">E-learning 24/7</option>
                              <option value="Mista">Mista (Blended)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Durata (Ore)
                            </label>
                            <input
                              type="number"
                              value={courseForm.hours || 8}
                              onChange={(e) => setCourseForm({ ...courseForm, hours: Number(e.target.value) })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Validità (Anni)
                            </label>
                            <input
                              type="number"
                              value={courseForm.validityYears || 5}
                              onChange={(e) => setCourseForm({ ...courseForm, validityYears: Number(e.target.value) })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Destinatari
                            </label>
                            <input
                              type="text"
                              value={courseForm.target || ''}
                              onChange={(e) => setCourseForm({ ...courseForm, target: e.target.value })}
                              placeholder="es. Dipendenti e addetti sicurezza"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Prezzo Indicativo
                            </label>
                            <input
                              type="text"
                              value={courseForm.price || ''}
                              onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                              placeholder="es. da € 190 + IVA"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Sede / Erogazione
                            </label>
                            <input
                              type="text"
                              value={courseForm.location || ''}
                              onChange={(e) => setCourseForm({ ...courseForm, location: e.target.value })}
                              placeholder="Treviso (Sede) / Milano"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Descrizione Dettagliata
                          </label>
                          <textarea
                            rows={3}
                            value={courseForm.description || ''}
                            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                            placeholder="Descrivi programma, normativa e abilitazioni rilasciate..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingCourse(false);
                              setEditingCourse(null);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                          >
                            Annulla
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-bold shadow-sm"
                          >
                            {editingCourse ? 'Salva Modifiche Corso' : 'Aggiungi Corso al Catalogo'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* COURSES TABLE */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0B192C] text-slate-300 uppercase tracking-wider text-[10px] font-bold">
                          <tr>
                            <th className="py-3 px-4">Codice</th>
                            <th className="py-3 px-4">Titolo del Corso</th>
                            <th className="py-3 px-4">Categoria</th>
                            <th className="py-3 px-4">Ore</th>
                            <th className="py-3 px-4">Modalità</th>
                            <th className="py-3 px-4">Prezzo</th>
                            <th className="py-3 px-4 text-right">Azioni</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {courses
                            .filter(
                              (c) =>
                                c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
                                c.code.toLowerCase().includes(courseSearch.toLowerCase())
                            )
                            .map((course) => (
                              <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4 font-mono font-bold text-slate-800">
                                  {course.code}
                                </td>
                                <td className="py-3 px-4 font-bold text-[#0B192C] max-w-xs truncate">
                                  {course.title}
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px] uppercase">
                                    {course.category}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-semibold text-slate-700">
                                  {course.hours}h
                                </td>
                                <td className="py-3 px-4 text-slate-600">
                                  {course.mode}
                                </td>
                                <td className="py-3 px-4 font-semibold text-slate-800">
                                  {course.price || 'Su richiesta'}
                                </td>
                                <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingCourse(course);
                                      setCourseForm({ ...course });
                                      setIsAddingCourse(true);
                                    }}
                                    className="p-1.5 rounded hover:bg-slate-200 text-blue-600"
                                    title="Modifica"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`Sei sicuro di voler eliminare il corso "${course.title}"?`)) {
                                        deleteCourse(course.id);
                                        showNotification('Corso rimosso dal catalogo.');
                                      }
                                    }}
                                    className="p-1.5 rounded hover:bg-rose-100 text-rose-600"
                                    title="Elimina"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CALENDARIO DATE */}
              {activeTab === 'calendario' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B192C]">
                        Pianificazione Calendario Corsi ({calendarEvents.length})
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Gestisci le edizioni in partenza, date, orari, sedi (Milano / Treviso / FAD) e disponibilità posti.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingEvent(null);
                        setEventForm({
                          courseTitle: courses[0]?.title || 'Corso Sicurezza',
                          category: 'Sicurezza Lavoro',
                          startDate: 'Prossimo Mese',
                          startTime: '09:00 - 18:00',
                          location: 'Treviso (Sede)',
                          duration: '8 ore',
                          seatsAvailable: 8,
                          status: 'Confermato',
                        });
                        setIsAddingEvent(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuova Edizione</span>
                    </button>
                  </div>

                  {/* CALENDAR FORM */}
                  {isAddingEvent && (
                    <div className="p-5 bg-blue-50/50 border-2 border-[#0A66C2]/30 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                        <h4 className="text-sm font-bold text-[#0B192C]">
                          {editingEvent ? 'Modifica Sessione di Calendario' : 'Pianifica Nuova Edizione'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingEvent(false);
                            setEditingEvent(null);
                          }}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveEvent} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Titolo del Corso *
                            </label>
                            <input
                              type="text"
                              value={eventForm.courseTitle || ''}
                              onChange={(e) => setEventForm({ ...eventForm, courseTitle: e.target.value })}
                              placeholder="es. Primo Soccorso Aziendale Gruppo B/C"
                              required
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Categoria Riferimento
                            </label>
                            <input
                              type="text"
                              value={eventForm.category || ''}
                              onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                              placeholder="es. Primo Soccorso D.M. 388/03"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Data Inizio *
                            </label>
                            <input
                              type="text"
                              value={eventForm.startDate || ''}
                              onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                              placeholder="es. 15 Aprile 2026"
                              required
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Orario
                            </label>
                            <input
                              type="text"
                              value={eventForm.startTime || ''}
                              onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                              placeholder="09:00 - 18:00"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Posti Disponibili
                            </label>
                            <input
                              type="number"
                              value={eventForm.seatsAvailable || 6}
                              onChange={(e) => setEventForm({ ...eventForm, seatsAvailable: Number(e.target.value) })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Stato Iscrizioni
                            </label>
                            <select
                              value={eventForm.status || 'Confermato'}
                              onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            >
                              <option value="Confermato">Confermato</option>
                              <option value="Ultime disponibilità">Ultime disponibilità</option>
                              <option value="In programmazione">In programmazione</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Sede Svolgimento
                            </label>
                            <select
                              value={eventForm.location || 'Treviso (Sede)'}
                              onChange={(e) => setEventForm({ ...eventForm, location: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            >
                              <option value="Treviso (Sede)">Treviso (Sede Principale)</option>
                              <option value="Milano (Sede)">Milano (Presidio Lombardia)</option>
                              <option value="Diretta Streaming (FAD)">Diretta Streaming (FAD)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Durata
                            </label>
                            <input
                              type="text"
                              value={eventForm.duration || ''}
                              onChange={(e) => setEventForm({ ...eventForm, duration: e.target.value })}
                              placeholder="es. 12 ore (2 giorni)"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingEvent(false);
                              setEditingEvent(null);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                          >
                            Annulla
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-bold shadow-sm"
                          >
                            {editingEvent ? 'Salva Edizione' : 'Programma Edizione'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* CALENDAR TABLE */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0B192C] text-slate-300 uppercase tracking-wider text-[10px] font-bold">
                          <tr>
                            <th className="py-3 px-4">Corso</th>
                            <th className="py-3 px-4">Data & Orari</th>
                            <th className="py-3 px-4">Sede</th>
                            <th className="py-3 px-4">Posti</th>
                            <th className="py-3 px-4">Stato</th>
                            <th className="py-3 px-4 text-right">Azioni</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {calendarEvents.map((evt) => (
                            <tr key={evt.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-4 font-bold text-[#0B192C]">
                                {evt.courseTitle}
                                <span className="block text-[10px] font-normal text-slate-500">
                                  {evt.category} • {evt.duration}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-800">
                                {evt.startDate}
                                <span className="block text-[10px] font-normal text-slate-500">
                                  {evt.startTime}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-slate-600 font-medium">
                                {evt.location}
                              </td>
                              <td className="py-3 px-4 font-bold text-[#0A66C2]">
                                {evt.seatsAvailable} posti
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                    evt.status === 'Ultime disponibilità'
                                      ? 'bg-orange-100 text-orange-700'
                                      : evt.status === 'Confermato'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {evt.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingEvent(evt);
                                    setEventForm({ ...evt });
                                    setIsAddingEvent(true);
                                  }}
                                  className="p-1.5 rounded hover:bg-slate-200 text-blue-600"
                                  title="Modifica"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Rimuovere questa edizione dal calendario?`)) {
                                      deleteCalendarEvent(evt.id);
                                      showNotification('Edizione rimossa dal calendario.');
                                    }
                                  }}
                                  className="p-1.5 rounded hover:bg-rose-100 text-rose-600"
                                  title="Elimina"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4.5: GESTIONE STORIE & CASI REALI (HOMEPAGE SYNC) */}
              {activeTab === 'storie' && (
                <div className="space-y-6">
                  {/* TAB HEADER */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-[#0B192C]">
                          Storie Aziendali & Casi di Successo
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                          {stories.length} Casi
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        Gestisci le storie e i casi studio reali sul campo. Le storie contrassegnate come <strong className="text-emerald-700 font-bold">"In Primo Piano"</strong> compaiono all'istante sulla Home Page.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingStory(null);
                        setStoryForm({
                          title: '',
                          subtitle: '',
                          clientCompany: '',
                          sector: 'Metalmeccanica & Manifattura',
                          location: 'Treviso (TV)',
                          year: '2025 - 2026',
                          metric: '0 Infortuni',
                          metricLabel: 'negli ultimi 3 anni su 240 addetti',
                          summary: '',
                          challenge: '',
                          solution: '',
                          results: '',
                          quote: '',
                          authorName: '',
                          authorRole: '',
                          badge: 'Caso Certificato',
                          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
                          featuredOnHome: true,
                        });
                        setIsAddingStory(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Nuova Storia di Successo</span>
                    </button>
                  </div>

                  {/* FORM MODAL / EXPANDED INLINE FORM */}
                  {isAddingStory && (
                    <div className="bg-gradient-to-br from-blue-50/60 to-white rounded-2xl border-2 border-[#0A66C2]/40 p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center font-bold">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#0B192C]">
                              {editingStory ? `Modifica Storia: "${editingStory.clientCompany}"` : 'Pubblica Nuova Storia di Successo Aziendale'}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              Compila i dettagli del caso studio. Comparirà direttamente nella sezione della Home Page.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingStory(false);
                            setEditingStory(null);
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveStory} className="space-y-4">
                        {/* RIGA 1: Titolo e Sottotitolo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Titolo Caso Studio *
                            </label>
                            <input
                              type="text"
                              required
                              value={storyForm.title || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                              placeholder="es. Zero Infortuni & Bonifica Rischi Saldatura"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Sottotitolo / Ambito di Intervento
                            </label>
                            <input
                              type="text"
                              value={storyForm.subtitle || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, subtitle: e.target.value })}
                              placeholder="es. Riorganizzazione 3 stabilimenti con 180 lavoratori"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
                            />
                          </div>
                        </div>

                        {/* RIGA 2: Azienda Cliente, Settore, Sede, Anno */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Azienda Cliente *
                            </label>
                            <input
                              type="text"
                              required
                              value={storyForm.clientCompany || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, clientCompany: e.target.value })}
                              placeholder="es. Gruppo Manifatturiero Veneto"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Settore Produttivo
                            </label>
                            <input
                              type="text"
                              value={storyForm.sector || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, sector: e.target.value })}
                              placeholder="es. Metalmeccanica, Logistica, Chimico..."
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Città / Sede
                            </label>
                            <input
                              type="text"
                              value={storyForm.location || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, location: e.target.value })}
                              placeholder="es. Treviso (TV) o Milano"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Anno / Periodo
                            </label>
                            <input
                              type="text"
                              value={storyForm.year || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, year: e.target.value })}
                              placeholder="es. 2024 - 2026"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                        </div>

                        {/* RIGA 3: Metrica d'impatto e Badge */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Metrica in Evidenza (Grande) *
                            </label>
                            <input
                              type="text"
                              value={storyForm.metric || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, metric: e.target.value })}
                              placeholder="es. 0 Infortuni / -28% Premio INAIL"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-[#0A66C2]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Didascalia Metrica
                            </label>
                            <input
                              type="text"
                              value={storyForm.metricLabel || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, metricLabel: e.target.value })}
                              placeholder="es. negli ultimi 3 anni su 240 addetti"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Badge / Certificazione
                            </label>
                            <input
                              type="text"
                              value={storyForm.badge || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, badge: e.target.value })}
                              placeholder="es. ISO 45001 • Audit SPISAL 100%"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                        </div>

                        {/* RIGA 4: Sintesi per la Card */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Sintesi Breve (visibile nella card in Home Page) *
                          </label>
                          <textarea
                            rows={2}
                            required
                            value={storyForm.summary || ''}
                            onChange={(e) => setStoryForm({ ...storyForm, summary: e.target.value })}
                            placeholder="Descrivi brevemente l'intervento e l'impatto generato per l'azienda cliente..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                          />
                        </div>

                        {/* RIGA 5: Dettagli Trittico: Sfida, Soluzione, Risultati */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1 text-rose-800">
                              La Sfida / Rischio Iniziale
                            </label>
                            <textarea
                              rows={3}
                              value={storyForm.challenge || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, challenge: e.target.value })}
                              placeholder="Cosa rischiava l'azienda prima del nostro intervento? (es. Sanzioni, verifiche SPISAL, infortuni ricorrenti...)"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1 text-[#0A66C2]">
                              L'Intervento di E.M. Safety
                            </label>
                            <textarea
                              rows={3}
                              value={storyForm.solution || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, solution: e.target.value })}
                              placeholder="Come abbiamo operato? (es. Audit integrato, revisione DVR, affiancamento RSPP, piano formativo mirato...)"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1 text-emerald-800">
                              I Risultati Concreti Ottenuti
                            </label>
                            <textarea
                              rows={3}
                              value={storyForm.results || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, results: e.target.value })}
                              placeholder="Cosa ha ottenuto il cliente? (es. Zero infortuni, sgravio INAIL OT23, conformità penale garantita...)"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                        </div>

                        {/* RIGA 6: Testimonianza e Referente */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Citazione Testimonianza del Cliente (facoltativa)
                            </label>
                            <input
                              type="text"
                              value={storyForm.quote || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, quote: e.target.value })}
                              placeholder='es. "Con E.M. Safety abbiamo finalmente eliminato l&apos;ansia dei controlli e coinvolto tutta la squadra."'
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium italic"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Autore & Ruolo
                            </label>
                            <input
                              type="text"
                              value={storyForm.authorName ? `${storyForm.authorName} - ${storyForm.authorRole || ''}` : ''}
                              onChange={(e) => {
                                const parts = e.target.value.split('-');
                                setStoryForm({
                                  ...storyForm,
                                  authorName: parts[0]?.trim() || '',
                                  authorRole: parts[1]?.trim() || '',
                                });
                              }}
                              placeholder="es. Ing. Roberto N. - Direttore Tecnico"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                            />
                          </div>
                        </div>

                        {/* RIGA 7: Immagine e Toggle Home Page */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-white p-3 rounded-xl border border-slate-200">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              URL Immagine di Copertina (Unsplash o CDN)
                            </label>
                            <input
                              type="url"
                              value={storyForm.imageUrl || ''}
                              onChange={(e) => setStoryForm({ ...storyForm, imageUrl: e.target.value })}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium font-mono"
                            />
                          </div>

                          <div className="pt-2">
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={storyForm.featuredOnHome !== false}
                                onChange={(e) => setStoryForm({ ...storyForm, featuredOnHome: e.target.checked })}
                                className="w-4 h-4 text-[#0A66C2] rounded border-slate-300 focus:ring-[#0A66C2]"
                              />
                              <div>
                                <span className="text-xs font-bold text-[#0B192C] block">
                                  Mostra in Primo Piano
                                </span>
                                <span className="text-[10px] text-slate-500">
                                  Visibile direttamente in Home Page
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* BOTTONI FORM */}
                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingStory(false);
                              setEditingStory(null);
                            }}
                            className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            Annulla
                          </button>

                          <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Save className="w-4 h-4" />
                            <span>{editingStory ? 'Aggiorna Caso Studio' : 'Pubblica Storia sul Sito'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* SEARCH AND FILTER TOOLBAR */}
                  <div className="flex flex-col sm:flex-row gap-2.5 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={storySearch}
                        onChange={(e) => setStorySearch(e.target.value)}
                        placeholder="Cerca storia per azienda, titolo, settore o parola chiave..."
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <select
                        value={storySectorFilter}
                        onChange={(e) => setStorySectorFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white"
                      >
                        <option value="all">Tutti i Settori ({stories.length})</option>
                        {Array.from(new Set(stories.map((s) => s.sector))).map((sec) => (
                          <option key={sec} value={sec}>
                            {sec}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* STORIE LIST / CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stories
                      .filter((s) => {
                        const q = storySearch.toLowerCase();
                        const matchesQ =
                          !q ||
                          s.title.toLowerCase().includes(q) ||
                          s.clientCompany.toLowerCase().includes(q) ||
                          s.sector.toLowerCase().includes(q) ||
                          s.summary.toLowerCase().includes(q);
                        const matchesSec = storySectorFilter === 'all' || s.sector === storySectorFilter;
                        return matchesQ && matchesSec;
                      })
                      .map((story) => (
                        <div
                          key={story.id}
                          className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between ${
                            story.featuredOnHome
                              ? 'border-blue-200 ring-1 ring-blue-100'
                              : 'border-slate-200 opacity-90'
                          }`}
                        >
                          <div>
                            {/* Top row: Sector, Home status pill, actions */}
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {story.sector}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {story.location} • {story.year}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {/* Instant Toggle for Home visibility */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    toggleStoryFeatured(story.id);
                                    showNotification(
                                      story.featuredOnHome
                                        ? `Storia "${story.clientCompany}" rimossa dalla Home Page.`
                                        : `Storia "${story.clientCompany}" ora in primo piano sulla Home Page!`
                                    );
                                  }}
                                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                                    story.featuredOnHome
                                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                  title="Clicca per mostrare o nascondere dalla Home Page"
                                >
                                  {story.featuredOnHome ? (
                                    <>
                                      <Eye className="w-3 h-3 text-emerald-700" />
                                      <span>In Home</span>
                                    </>
                                  ) : (
                                    <>
                                      <EyeOff className="w-3 h-3 text-slate-500" />
                                      <span>Nascosta</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingStory(story);
                                    setStoryForm({ ...story });
                                    setIsAddingStory(true);
                                  }}
                                  className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600 transition-colors"
                                  title="Modifica storia"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Eliminare la storia aziendale di "${story.clientCompany}"?`)) {
                                      deleteStory(story.id);
                                      showNotification('Storia rimossa con successo.');
                                    }
                                  }}
                                  className="p-1.5 rounded-md hover:bg-rose-50 text-rose-600 transition-colors"
                                  title="Elimina storia"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Company & Title */}
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] mb-1">
                              <Building2 className="w-3.5 h-3.5 text-orange-500" />
                              <span>{story.clientCompany}</span>
                              {story.badge && (
                                <span className="text-[10px] font-semibold bg-blue-50 text-[#0A66C2] px-1.5 py-0.2 rounded border border-blue-100 ml-auto">
                                  {story.badge}
                                </span>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-[#0B192C] leading-snug mb-2">
                              {story.title}
                            </h4>

                            {/* Highlight Metric block */}
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 mb-3 flex items-center justify-between">
                              <div>
                                <span className="text-base font-extrabold text-[#0B192C]">
                                  {story.metric}
                                </span>
                                <span className="text-[11px] text-slate-600 block">
                                  {story.metricLabel}
                                </span>
                              </div>
                              <Award className="w-6 h-6 text-orange-400 shrink-0" />
                            </div>

                            {/* Summary */}
                            <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                              {story.summary}
                            </p>

                            {/* Quote snippet if any */}
                            {story.quote && (
                              <blockquote className="text-[11px] italic text-slate-700 bg-amber-50/70 border-l-2 border-amber-400 p-2 rounded-r-lg mb-2">
                                "{story.quote}"
                                {story.authorName && (
                                  <span className="block not-italic font-bold text-[10px] text-slate-800 mt-1">
                                    — {story.authorName} {story.authorRole && `(${story.authorRole})`}
                                  </span>
                                )}
                              </blockquote>
                            )}
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                            <span>ID: {story.id}</span>
                            <span>{story.featuredOnHome ? '✓ Visibile in Home' : 'Nascosta dalla Home'}</span>
                          </div>
                        </div>
                      ))}
                  </div>

                  {stories.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                      <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-slate-800">Nessuna storia aziendale presente</h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                        Aggiungi la prima storia di successo aziendale per mostrarla nella sezione dedicata della Home Page.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingStory(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-xs font-bold"
                      >
                        + Aggiungi la Prima Storia
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: LEADS CRM INBOX */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B192C]">
                        Inbox Richieste & Preventivi ({leads.length})
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Visualizza le richieste di preventivo, iscrizione corsi e contatti arrivate dal portale.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">Filtra:</span>
                      <select
                        value={leadStatusFilter}
                        onChange={(e) => setLeadStatusFilter(e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                      >
                        <option value="all">Tutte le richieste</option>
                        <option value="Nuova">Solo Nuove</option>
                        <option value="In Lavorazione">In Lavorazione</option>
                        <option value="Chiusa">Chiuse</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {leads
                      .filter((l) => leadStatusFilter === 'all' || l.status === leadStatusFilter)
                      .map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-[#0B192C]">
                                  {lead.fullName}
                                </h4>
                                {lead.company && (
                                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                    {lead.company}
                                  </span>
                                )}
                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                  Fonte: {lead.source}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3.5 h-3.5" />
                                  {lead.email}
                                </span>
                                {lead.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3.5 h-3.5" />
                                    {lead.phone}
                                  </span>
                                )}
                                <span>{lead.createdAt}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  updateLeadStatus(lead.id, e.target.value as AdminLeadStatus)
                                }
                                className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer ${
                                  lead.status === 'Nuova'
                                    ? 'bg-orange-50 border-orange-300 text-orange-800'
                                    : lead.status === 'In Lavorazione'
                                    ? 'bg-blue-50 border-blue-300 text-blue-800'
                                    : 'bg-slate-50 border-slate-300 text-slate-700'
                                }`}
                              >
                                <option value="Nuova">Stato: Nuova</option>
                                <option value="In Lavorazione">Stato: In Lavorazione</option>
                                <option value="Chiusa">Stato: Chiusa</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm('Vuoi rimuovere questa richiesta?')) {
                                    deleteLead(lead.id);
                                    showNotification('Richiesta eliminata.');
                                  }
                                }}
                                className="p-1.5 rounded hover:bg-rose-50 text-rose-600"
                                title="Elimina"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Message Body */}
                          <div className="bg-slate-50 p-3.5 rounded-xl text-xs text-slate-700 space-y-1">
                            <strong className="block text-[#0B192C] font-semibold">
                              Oggetto: {lead.subject}
                            </strong>
                            <p className="whitespace-pre-line">{lead.message || 'Nessun messaggio aggiuntivo fornito.'}</p>
                          </div>

                          {/* Internal Notes */}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-slate-500 text-[11px] uppercase">Note Interne:</span>
                            <input
                              type="text"
                              defaultValue={lead.notes || ''}
                              onBlur={(e) => updateLeadStatus(lead.id, lead.status, e.target.value)}
                              placeholder="Aggiungi una nota interna (es. 'chiamato alle 10:30, attesa preventivo')..."
                              className="flex-1 px-2.5 py-1 rounded border border-slate-200 text-xs"
                            />
                          </div>
                        </div>
                      ))}

                    {leads.length === 0 && (
                      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
                        <Inbox className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                        <p className="text-sm font-semibold">Nessuna richiesta presente nell'inbox.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: IMMAGINI & MEDIA */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B192C]">
                        Gestione Immagini & Grafica Hero
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Carica le immagini direttamente dal tuo computer con il pulsante dedicato o inserisci un URL.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        resetAllImages();
                        showNotification('Tutte le immagini sono state ripristinate alle impostazioni predefinite!');
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
                      title="Ripristina tutte le immagini ai valori predefiniti"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                      <span>Ripristina Tutte le Immagini</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {/* Slide 1 - Milan Gae Aulenti */}
                    <ImageUploadField
                      id="heroSlideMilan"
                      title="Hero Slide 1: Presidio Direzionale Milano (Piazza Gae Aulenti)"
                      subtitle="Immagine dell'hub direzionale di Milano. Clicca sul pulsante o trascina un file per caricarlo."
                      badge="Slide Principale"
                      value={siteImages.heroSlideMilan}
                      defaultValue={DEFAULT_SITE_IMAGES.heroSlideMilan}
                      onChangeUrl={(url) => setSiteImages({ ...siteImages, heroSlideMilan: url })}
                      onUploadFile={(file) => handleImageUpload('heroSlideMilan', file)}
                      onReset={() => handleResetSingleImage('heroSlideMilan')}
                    />

                    {/* Slide 2 - Cantiere / Audit Tecnico */}
                    <ImageUploadField
                      id="heroSlideField"
                      title="Hero Slide 2: Audit sul Campo & Cantieri Complessi"
                      subtitle="Audit tecnici, cantieri e verifiche di conformità per la sicurezza operativa."
                      badge="Audit & Cantieri"
                      value={siteImages.heroSlideField}
                      defaultValue={DEFAULT_SITE_IMAGES.heroSlideField}
                      onChangeUrl={(url) => setSiteImages({ ...siteImages, heroSlideField: url })}
                      onUploadFile={(file) => handleImageUpload('heroSlideField', file)}
                      onReset={() => handleResetSingleImage('heroSlideField')}
                    />

                    {/* Slide 3 - Formazione Accreditata */}
                    <ImageUploadField
                      id="heroSlideTraining"
                      title="Hero Slide 3: Polo Didattico & Formazione Interattiva"
                      subtitle="Aule corsi accreditate, docenze qualificate e sessioni pratiche di addestramento."
                      badge="Formazione"
                      value={siteImages.heroSlideTraining}
                      defaultValue={DEFAULT_SITE_IMAGES.heroSlideTraining}
                      onChangeUrl={(url) => setSiteImages({ ...siteImages, heroSlideTraining: url })}
                      onUploadFile={(file) => handleImageUpload('heroSlideTraining', file)}
                      onReset={() => handleResetSingleImage('heroSlideTraining')}
                    />
                  </div>
                </div>
              )}

              {/* TAB 7: BACKUP & RIPRISTINO */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B192C]">
                      Backup, Esportazione & Ripristino Dati
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Esporta tutti i dati configurati o ripristina la configurazione iniziale di fabbrica.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Export JSON */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="text-sm font-bold text-[#0B192C] flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#0A66C2]" />
                        Esporta Dati Completi (JSON)
                      </h4>
                      <p className="text-xs text-slate-600">
                        Scarica un file di backup contenente tutti i corsi, le edizioni di calendario, i testi e le richieste ricevute.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const dataStr = exportAllData();
                          const blob = new Blob([dataStr], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = `em_safety_backup_${new Date().toISOString().slice(0, 10)}.json`;
                          link.click();
                          showNotification('Backup JSON scaricato con successo!');
                        }}
                        className="py-2.5 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Scarica Backup (.json)</span>
                      </button>
                    </div>

                    {/* Import JSON */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="text-sm font-bold text-[#0B192C] flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#0A66C2]" />
                        Importa da Backup (JSON)
                      </h4>
                      <p className="text-xs text-slate-600">
                        Carica un file JSON precedentemente salvato per ripristinare cataloghi e configurazioni.
                      </p>
                      <input
                        type="file"
                        accept=".json"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              const ok = importAllData(reader.result);
                              if (ok) {
                                showNotification('Dati importati con successo!');
                              } else {
                                alert('Errore durante la lettura del file JSON.');
                              }
                            }
                          };
                          reader.readAsText(file);
                        }}
                        className="text-xs text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Factory Reset */}
                  <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-3">
                    <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Ripristino Impostazioni Originali di Fabbrica
                    </h4>
                    <p className="text-xs text-rose-700">
                      Attenzione: questa azione reimposta tutti i testi, i corsi, il calendario e le immagini ai valori predefiniti originali.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          confirm(
                            'Confermi il ripristino di tutti i dati ai valori originali di fabbrica?'
                          )
                        ) {
                          resetAllData();
                          resetAllImages();
                          showNotification('Tutti i dati sono stati ripristinati.');
                        }
                      }}
                      className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Ripristina Tutto a Valori Iniziali</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

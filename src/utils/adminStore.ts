import { useState, useEffect } from 'react';
import { Course, CalendarEvent, SiteInfo, AdminLead, AdminLeadStatus, SafetyStory } from '../types';
import { COURSES, CALENDAR_EVENTS } from '../data/mockData';

export const ADMIN_CREDENTIALS = {
  id: 'admin',
  password: 'safety2026',
  fallbackPassword: 'admin', // allows quick testing with admin / admin as well
};

export const DEFAULT_SITE_INFO: SiteInfo = {
  companyName: 'E.M. Safety',
  slogan: 'Costruiamo Sistemi che trasformano la compliance in Valore aggiunto',
  phone: '+39 0422 123456',
  emergencyPhone: '+39 340 9876543',
  email: 'info@emsafety.it',
  addressMilano: 'Piazza Gae Aulenti, 20154 Milano (MI)',
  addressTreviso: 'Viale della Repubblica 154, 31100 Treviso (TV)',
  heroBadge: 'TREVISO • MILANO — PRESIDIO NAZIONALE',
  heroTitle: 'Costruiamo Sistemi che trasformano la compliance in Valore aggiunto.',
  heroSubtitle:
    'Dalla valutazione dei rischi (D.Lgs. 81/08) ai Sistemi di Gestione Integrati (ISO 45001, 14001, 9001). Affianchiamo datori di lavoro, RSPP e HSE Manager con soluzioni operative concrete, non burocrazia.',
  statYears: '15+',
  statYearsLabel: 'anni di esperienza al fianco delle imprese',
  statAreas: '6',
  statAreasLabel: 'aree di consulenza specialistica e audit',
  statModes: '3',
  statModesLabel: 'modalità: in aula, presso azienda, e-learning',
  statResponse: '24h',
  statResponseLabel: 'tempo medio di prima risposta operativa',
};

export const INITIAL_STORIES: SafetyStory[] = [
  {
    id: 'story-1',
    title: 'Transizione ISO 45001 e azzeramento infortuni su linee robotizzate',
    subtitle: 'Stabilimento produttivo ad alto rischio (240 addetti)',
    clientCompany: 'Meccanica Veneta S.p.A.',
    sector: 'Metalmeccanica & Automazione',
    location: 'Treviso (TV)',
    year: '2023 - 2026',
    metric: '0 Infortuni',
    metricLabel: 'negli ultimi 3 anni su 240 operatori',
    summary: 'Ristrutturazione integrale del DVR di stabilimento e nomina del nostro RSPP esterno qualificato per la gestione della sicurezza sulle isole robotizzate ad alto voltaggio.',
    challenge: 'L’azienda registrava frequenti micro-infortuni e un tasso di assenteismo preoccupante prima dei cambi turno. I vecchi faldoni cartacei del DVR erano disallineati rispetto alle nuove celle automatiche.',
    solution: 'E.M. Safety ha condotto una perizia tecnica asseverata sui ripari delle macchine, redatto istruzioni operative grafiche per gli operatori, formato 35 preposti sul campo e implementato il Sistema di Gestione Sicurezza certificato ISO 45001.',
    results: 'Infortuni scesi da 14 all’anno a ZERO per 36 mesi consecutivi. Sgravio tariffario INAIL OT23 pari a € 44.000 all’anno e superamento degli audit SPISAL senza alcuna prescrizione penale.',
    quote: 'Con E.M. Safety abbiamo smesso di subire la sicurezza come obbligo: oggi le nostre linee producono con più ordine, efficienza e la totale serenità del personale.',
    authorName: 'Ing. Roberto Mantovani',
    authorRole: 'Direttore di Stabilimento',
    badge: 'Caso Certificato ISO 45001',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    createdAt: 'Marzo 2026',
  },
  {
    id: 'story-2',
    title: 'Formazione continua carrellisti e hub logistico a prova di audit',
    subtitle: 'Polo logistico e-commerce da 45.000 mq (180 addetti)',
    clientCompany: 'Logix Nord Ovest S.r.l.',
    sector: 'Logistica & Supply Chain',
    location: 'Milano Hub (MI)',
    year: '2024 - 2026',
    metric: '100% Abilitati',
    metricLabel: '120 carrellisti senza fermare i turni h24',
    summary: 'Addestramento pratico carrelli elevatori e retrattili direttamente in banchina, con digitalizzazione di scadenze e patentini tramite piattaforma cloud E.M. Safety.',
    challenge: 'Rinnovare i patentini carrelli per oltre 120 operatori turnisti senza bloccare le spedizioni e con elevato turn-over di cooperative esterne.',
    solution: 'Abbiamo istituito un campo prove dedicato presso la nostra sede di Treviso e sessioni serali in banchina a Milano, validando il percorso con O.P.N. Italia Lavoro e coprendo il 100% dei costi tramite Fondi Interprofessionali.',
    results: 'Audit committenti multinazionali superato con punteggio 100/100. Zero collisioni tra carrelli e pedoni nell’ultimo biennio.',
    quote: 'La flessibilità dei formatori E.M. Safety ha fatto la differenza: formare il nostro personale su tre turni senza perdere un solo collo spedito è stato eccezionale.',
    authorName: 'Dott.ssa Laura De Bellis',
    authorRole: 'Responsabile Risorse Umane',
    badge: 'Eccellenza Logistica',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    createdAt: 'Gennaio 2026',
  },
  {
    id: 'story-3',
    title: 'Mappatura agenti chimici e bonifica acustica in laboratorio farmaceutico',
    subtitle: 'Produzione principi attivi & polimeri speciali (95 tecnici)',
    clientCompany: 'Biotech Polymeric Industries',
    sector: 'Chimico & Farmaceutico',
    location: 'Vicenza (VI)',
    year: '2023 - 2025',
    metric: '-38 dB(A)',
    metricLabel: 'riduzione impatto acustico e bonifica cappe chimiche',
    summary: 'Campionamenti aerodispersi, valutazione rischio chimico specialistico e riprogettazione dei sistemi di captazione per la tutela da vapori tossici.',
    challenge: 'Adeguamento alle direttive europee REACH/CLP in tempi stretti a seguito dell’introduzione di nuovi reattivi di sintesi e contestuale superamento dei livelli di rumore in sala compressori.',
    solution: 'Tecnici igienisti E.M. Safety hanno eseguito campionamenti con pompe a flusso costante e rilievi fonometrici in classe 1, predisponendo schermature fonoassorbenti mirate e DPI di III categoria con addestramento specifico.',
    results: 'Piena conformità alle tabelle ASL/ARPAV e drastica riduzione del rischio chimico a livello moderato/basso.',
    quote: 'La perizia strumentale e la tempestività nella consegna delle relazioni hanno consentito all’azienda di avviare le nuove linee produttive senza alcun ritardo.',
    authorName: 'Dott. Chim. Alessandro Ferri',
    authorRole: 'HSE Manager',
    badge: 'Igiene Industriale Avanzata',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    createdAt: 'Febbraio 2026',
  },
  {
    id: 'story-4',
    title: 'Coordinamento della sicurezza in cantiere e PSC per grandi infrastrutture',
    subtitle: 'Appalti pubblici e ristrutturazione complessi direzionali (110 operai)',
    clientCompany: 'Edil Costruzioni Nord S.p.A.',
    sector: 'Edilizia & Cantieri Complessi',
    location: 'Milano - Porta Nuova',
    year: '2024 - 2026',
    metric: '€ 52.000',
    metricLabel: 'risparmiati sul premio INAIL annuo',
    summary: 'Incarico di Coordinatore della Sicurezza in fase di Progettazione ed Esecuzione (CSP/CSE) con sopralluoghi settimanali rigorosi e controllo continuo subappalti.',
    challenge: 'Coordinare la convivenza di oltre 15 ditte subappaltatrici contemporaneamente con rischi interferenziali elevati in zona urbana ad alta densità.',
    solution: 'Piani Operativi di Sicurezza (POS) digitalizzati, briefing pre-turno di 10 minuti per tutte le maestranze e verifiche strutturali su ponteggi e linee vita.',
    results: 'Cantiere completato nei tempi contrattuali con ZERO infortuni gravi e congratulazioni formali della committenza pubblica.',
    quote: 'Un team di ingegneri sempre reperibile in cantiere con risposte operative pratiche, non burocratiche.',
    authorName: 'Geom. Matteo Vianello',
    authorRole: 'Direttore Tecnico di Cantiere',
    badge: 'Grandi Opere',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    createdAt: 'Gennaio 2026',
  },
];

export const INITIAL_LEADS: AdminLead[] = [
  {
    id: 'lead-1',
    fullName: 'Marco Rossi',
    company: 'Meccanica Veneta S.r.l.',
    email: 'm.rossi@meccanicaveneta.it',
    phone: '+39 335 1234567',
    source: 'Preventivo',
    subject: 'Richiesta Formazione Aziendale Antincendio e RSPP',
    message: 'Vorremmo organizzare un corso antincendio livello 2 per 12 dipendenti direttamente presso il nostro stabilimento di Treviso.',
    createdAt: 'Oggi, 11:20',
    status: 'Nuova',
    notes: 'Priorità alta: contattare entro 24 ore',
  },
  {
    id: 'lead-2',
    fullName: 'Laura Bianchi',
    company: 'Logistica Nord-Est SpA',
    email: 'hr@logisticane.it',
    phone: '+39 02 9876543',
    source: 'Iscrizione Corso',
    subject: 'Iscrizione Corso: Patentino Carrelli Elevatori Semoventi',
    message: 'Richiesta iscrizione per 4 magazzinieri alla sessione di Aprile 2026.',
    createdAt: 'Ieri, 16:45',
    status: 'In Lavorazione',
    notes: 'Inviato modulo anagrafica discenti',
  },
  {
    id: 'lead-3',
    fullName: 'Ing. Giovanni Moretti',
    company: 'Moretti Costruzioni',
    email: 'sicurezza@moretticostruzioni.com',
    phone: '+39 347 5556677',
    source: 'Gap Analysis',
    subject: 'Audit di Gap Analysis per standard: ISO 45001:2018',
    message: 'Interessati ad avviare percorso di certificazione ISO 45001 per sgravi INAIL OT23.',
    createdAt: '3 giorni fa',
    status: 'Nuova',
    notes: 'Fissare video call tecnica',
  },
];

const SITE_INFO_KEY = 'em_safety_site_info_v1';
const COURSES_KEY = 'em_safety_courses_v1';
const CALENDAR_KEY = 'em_safety_calendar_v1';
const LEADS_KEY = 'em_safety_leads_v1';
const STORIES_KEY = 'em_safety_stories_v1';
const ADMIN_AUTH_KEY = 'em_safety_admin_auth_v1';

// Getters from storage
export function getStoredSiteInfo(): SiteInfo {
  try {
    const raw = localStorage.getItem(SITE_INFO_KEY);
    if (raw) return { ...DEFAULT_SITE_INFO, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('Error reading site info', e);
  }
  return DEFAULT_SITE_INFO;
}

export function getStoredCourses(): Course[] {
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading courses', e);
  }
  return COURSES;
}

export function getStoredCalendar(): CalendarEvent[] {
  try {
    const raw = localStorage.getItem(CALENDAR_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading calendar', e);
  }
  return CALENDAR_EVENTS;
}

export function getStoredLeads(): AdminLead[] {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading leads', e);
  }
  return INITIAL_LEADS;
}

export function getStoredStories(): SafetyStory[] {
  try {
    const raw = localStorage.getItem(STORIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading stories', e);
  }
  return INITIAL_STORIES;
}

export function getAdminAuthStatus(): boolean {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthStatus(isAuthenticated: boolean): void {
  try {
    if (isAuthenticated) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (e) {
    console.error(e);
  }
}

// Global Event Dispatcher for instantaneous real-time sync across components
function notifyAdminUpdate(type: string, data: any) {
  window.dispatchEvent(new CustomEvent('em_safety_admin_sync', { detail: { type, data } }));
}

// Unified custom hook for the whole website and admin panel
export function useAdminStore() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(getStoredSiteInfo());
  const [courses, setCourses] = useState<Course[]>(getStoredCourses());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(getStoredCalendar());
  const [leads, setLeads] = useState<AdminLead[]>(getStoredLeads());
  const [stories, setStories] = useState<SafetyStory[]>(getStoredStories());

  useEffect(() => {
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) {
        setSiteInfo(getStoredSiteInfo());
        setCourses(getStoredCourses());
        setCalendarEvents(getStoredCalendar());
        setLeads(getStoredLeads());
        setStories(getStoredStories());
        return;
      }

      if (detail.type === 'site_info') setSiteInfo(detail.data);
      if (detail.type === 'courses') setCourses(detail.data);
      if (detail.type === 'calendar') setCalendarEvents(detail.data);
      if (detail.type === 'leads') setLeads(detail.data);
      if (detail.type === 'stories') setStories(detail.data);
      if (detail.type === 'all_reset') {
        setSiteInfo(DEFAULT_SITE_INFO);
        setCourses(COURSES);
        setCalendarEvents(CALENDAR_EVENTS);
        setLeads(INITIAL_LEADS);
        setStories(INITIAL_STORIES);
      }
    };

    window.addEventListener('em_safety_admin_sync', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('em_safety_admin_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Update Site Info
  const updateSiteInfo = (newInfo: Partial<SiteInfo>) => {
    const updated = { ...siteInfo, ...newInfo };
    localStorage.setItem(SITE_INFO_KEY, JSON.stringify(updated));
    setSiteInfo(updated);
    notifyAdminUpdate('site_info', updated);
  };

  // Courses Operations
  const saveCourses = (newList: Course[]) => {
    localStorage.setItem(COURSES_KEY, JSON.stringify(newList));
    setCourses(newList);
    notifyAdminUpdate('courses', newList);
  };

  const addCourse = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    saveCourses(updated);
  };

  const updateCourse = (updatedCourse: Course) => {
    const updated = courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
    saveCourses(updated);
  };

  const deleteCourse = (courseId: string) => {
    const updated = courses.filter((c) => c.id !== courseId);
    saveCourses(updated);
  };

  // Calendar Operations
  const saveCalendar = (newList: CalendarEvent[]) => {
    localStorage.setItem(CALENDAR_KEY, JSON.stringify(newList));
    setCalendarEvents(newList);
    notifyAdminUpdate('calendar', newList);
  };

  const addCalendarEvent = (newEvent: CalendarEvent) => {
    const updated = [newEvent, ...calendarEvents];
    saveCalendar(updated);
  };

  const updateCalendarEvent = (updatedEvent: CalendarEvent) => {
    const updated = calendarEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
    saveCalendar(updated);
  };

  const deleteCalendarEvent = (eventId: string) => {
    const updated = calendarEvents.filter((e) => e.id !== eventId);
    saveCalendar(updated);
  };

  // Leads Operations
  const saveLeads = (newList: AdminLead[]) => {
    localStorage.setItem(LEADS_KEY, JSON.stringify(newList));
    setLeads(newList);
    notifyAdminUpdate('leads', newList);
  };

  const addLead = (leadInput: Omit<AdminLead, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLead: AdminLead = {
      ...leadInput,
      id: 'lead-' + Date.now(),
      createdAt: `Oggi, ${timeStr}`,
      status: 'Nuova',
    };
    const updated = [newLead, ...leads];
    saveLeads(updated);
    return newLead;
  };

  const updateLeadStatus = (id: string, status: AdminLeadStatus, notes?: string) => {
    const updated = leads.map((l) => {
      if (l.id === id) {
        return { ...l, status, ...(notes !== undefined ? { notes } : {}) };
      }
      return l;
    });
    saveLeads(updated);
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    saveLeads(updated);
  };

  // Stories Operations
  const saveStories = (newList: SafetyStory[]) => {
    localStorage.setItem(STORIES_KEY, JSON.stringify(newList));
    setStories(newList);
    notifyAdminUpdate('stories', newList);
  };

  const addStory = (storyInput: Omit<SafetyStory, 'id' | 'createdAt'>) => {
    const newStory: SafetyStory = {
      ...storyInput,
      id: 'story-' + Date.now(),
      createdAt: new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }),
    };
    const updated = [newStory, ...stories];
    saveStories(updated);
    return newStory;
  };

  const updateStory = (updatedStory: SafetyStory) => {
    const updated = stories.map((s) => (s.id === updatedStory.id ? updatedStory : s));
    saveStories(updated);
  };

  const deleteStory = (storyId: string) => {
    const updated = stories.filter((s) => s.id !== storyId);
    saveStories(updated);
  };

  const toggleStoryFeatured = (storyId: string) => {
    const updated = stories.map((s) =>
      s.id === storyId ? { ...s, featuredOnHome: !s.featuredOnHome } : s
    );
    saveStories(updated);
  };

  // Factory Reset
  const resetAllData = () => {
    localStorage.removeItem(SITE_INFO_KEY);
    localStorage.removeItem(COURSES_KEY);
    localStorage.removeItem(CALENDAR_KEY);
    localStorage.removeItem(LEADS_KEY);
    localStorage.removeItem(STORIES_KEY);
    setSiteInfo(DEFAULT_SITE_INFO);
    setCourses(COURSES);
    setCalendarEvents(CALENDAR_EVENTS);
    setLeads(INITIAL_LEADS);
    setStories(INITIAL_STORIES);
    notifyAdminUpdate('all_reset', null);
  };

  // Export & Import
  const exportAllData = () => {
    return JSON.stringify({
      siteInfo,
      courses,
      calendarEvents,
      leads,
      stories,
      exportedAt: new Date().toISOString(),
    }, null, 2);
  };

  const importAllData = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.siteInfo) {
        localStorage.setItem(SITE_INFO_KEY, JSON.stringify(data.siteInfo));
        setSiteInfo(data.siteInfo);
      }
      if (data.courses) {
        localStorage.setItem(COURSES_KEY, JSON.stringify(data.courses));
        setCourses(data.courses);
      }
      if (data.calendarEvents) {
        localStorage.setItem(CALENDAR_KEY, JSON.stringify(data.calendarEvents));
        setCalendarEvents(data.calendarEvents);
      }
      if (data.leads) {
        localStorage.setItem(LEADS_KEY, JSON.stringify(data.leads));
        setLeads(data.leads);
      }
      if (data.stories) {
        localStorage.setItem(STORIES_KEY, JSON.stringify(data.stories));
        setStories(data.stories);
      }
      notifyAdminUpdate('all_reset', null);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return {
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
    addLead,
    updateLeadStatus,
    deleteLead,
    addStory,
    updateStory,
    deleteStory,
    toggleStoryFeatured,
    resetAllData,
    exportAllData,
    importAllData,
  };
}

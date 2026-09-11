export type PageType = 'home' | 'story' | 'about' | 'services' | 'courses' | 'partner' | 'careers' | 'testimonials' | 'contact';

export interface SafetyStory {
  id: string;
  title: string;
  subtitle?: string;
  clientCompany: string;
  sector: string;
  location: string;
  year: string;
  metric: string; // e.g., "Zero Infortuni in 3 anni", "-28% Premio INAIL OT23", "100% Audit Superati"
  metricLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  quote?: string;
  authorName?: string;
  authorRole?: string;
  badge?: string;
  imageUrl?: string;
  featuredOnHome: boolean;
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: '81/08' | 'antincendio' | 'primo-soccorso' | 'rspp-rls' | 'attrezzature' | 'iso';
  hours: number;
  mode: 'Aula' | 'Videoconferenza' | 'E-learning' | 'Mista';
  target: string;
  nextDate: string;
  location: string;
  price?: string;
  description: string;
  validityYears: number;
}

export interface CalendarEvent {
  id: string;
  courseTitle: string;
  category: string;
  startDate: string;
  startTime: string;
  location: 'Treviso (Sede)' | 'Milano (Sede)' | 'Diretta Streaming (FAD)';
  duration: string;
  seatsAvailable: number;
  status: 'Confermato' | 'Ultime disponibilità' | 'In programmazione';
}

export interface SGIStandard {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  complianceRate: number;
  statusTag: string;
  description: string;
  auditCoverage: number;
  keyPoints: string[];
  inailOt23Eligible: boolean;
  color: string;
}

export interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacyAccepted: boolean;
  newsletterAccepted: boolean;
}

export type AdminLeadStatus = 'Nuova' | 'In Lavorazione' | 'Chiusa';

export interface AdminLead {
  id: string;
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  source: 'Contatti' | 'Preventivo' | 'Simulatore' | 'Iscrizione Corso' | 'Gap Analysis' | 'Manuale';
  subject: string;
  message?: string;
  createdAt: string;
  status: AdminLeadStatus;
  notes?: string;
}

export interface SiteInfo {
  companyName: string;
  slogan: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  addressMilano: string;
  addressTreviso: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  statYears: string;
  statYearsLabel: string;
  statAreas: string;
  statAreasLabel: string;
  statModes: string;
  statModesLabel: string;
  statResponse: string;
  statResponseLabel: string;
}

export type PageType = 'home' | 'story' | 'about' | 'services' | 'courses' | 'partner' | 'careers' | 'testimonials' | 'contact';

export type ContentType = 'story' | 'blog' | 'article';

export interface ContentItem {
  id: string;
  type?: ContentType; // 'story' | 'blog' | 'article'
  title: string;
  subtitle?: string;
  category?: string; // e.g., 'D.Lgs. 81/08', 'ISO 45001', 'Cantieri', 'INAIL OT23', 'Formazione'
  summary: string; // Brief executive summary or teaser
  content?: string; // Full body content (paragraphs, headings, recommendations)
  authorName?: string;
  authorRole?: string;
  publishedAt?: string;
  readTime?: string;
  badge?: string;
  imageUrl?: string;
  featuredOnHome: boolean;
  tags?: string[];

  // Story / Case-Study specific fields
  clientCompany?: string;
  sector?: string;
  location?: string;
  year?: string;
  metric?: string;
  metricLabel?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  quote?: string;
  createdAt?: string;
}

export interface SafetyStory extends ContentItem {
  clientCompany: string;
  sector: string;
  location: string;
  year: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  solution: string;
  results: string;
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

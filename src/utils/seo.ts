import { useEffect } from 'react';
import { PageType } from '../types';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, unknown>;
}

export const BASE_SITE_TITLE = 'E.M. Safety';
export const BASE_SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://emsafety.it';

/**
 * Keyword-optimized meta configurations for each active section of E.M. Safety
 */
export const PAGE_SEO_CONFIG: Record<PageType, PageMeta> = {
  home: {
    title: 'E.M. Safety — Consulenza Sicurezza sul Lavoro D.Lgs. 81/08 & Formazione',
    description:
      'Costruiamo Sistemi che trasformano la compliance in Valore aggiunto. Consulenza D.Lgs. 81/08, sistemi integrati ISO 45001, incarichi RSPP esterni e catalogo corsi sicurezza aziendale a Milano e Treviso.',
    keywords:
      'sicurezza sul lavoro, d.lgs 81/08, consulenza rspp milano, rspp treviso, corsi sicurezza sul lavoro, sistemi gestione iso 45001, dvr valutazione rischi, medicina del lavoro',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'E.M. Safety',
      legalName: 'E.M. Safety Consulenze e Formazioni',
      description:
        'Società leader di consulenza e formazione accreditata per la sicurezza sul lavoro D.Lgs. 81/08 e sistemi di gestione ISO.',
      url: BASE_SITE_URL,
      telephone: '+39 02 8719 8920',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Piazza Gae Aulenti, 4 (Porta Nuova)',
          addressLocality: 'Milano',
          postalCode: '20124',
          addressCountry: 'IT',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Viale della Repubblica, 154',
          addressLocality: 'Treviso',
          postalCode: '31100',
          addressCountry: 'IT',
        },
      ],
      areaServed: ['Lombardia', 'Veneto', 'Italia'],
      sameAs: [],
    },
  },
  story: {
    title: 'La Nostra Storia (1994 - 2026) | 30+ Anni di Sicurezza — E.M. Safety',
    description:
      'Dal 1994 al 2026: oltre trent\'anni al fianco delle imprese italiane. Dalla Legge 626/94 al D.Lgs. 81/08 fino ai moderni sistemi di gestione digitali e ISO 45001.',
    keywords:
      'storia em safety, oltre 30 anni sicurezza sul lavoro, legge 626 94, evoluzione d.lgs 81 08, consulenza storica sicurezza milano treviso',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'La Nostra Storia — Oltre 30 Anni di Sicurezza',
      description: 'Cronistoria e traguardi di E.M. Safety dal 1994 al 2026 nel campo della sicurezza e formazione aziendale.',
      publisher: {
        '@type': 'Organization',
        name: 'E.M. Safety',
      },
    },
  },
  about: {
    title: 'Chi Siamo | Tecnici Qualificati, RSPP & Medici Competenti — E.M. Safety',
    description:
      'Il team multidisciplinare di E.M. Safety: ingegneri della prevenzione, RSPP abilitati, medici del lavoro ed esperti di certificazioni ISO a Milano e Treviso.',
    keywords:
      'chi siamo em safety, squadra consulenti sicurezza, rspp abilitato, medico competente milano treviso, tecnici prevenzione',
    ogType: 'website',
    twitterCard: 'summary',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Chi Siamo — Squadra di Professionisti E.M. Safety',
      description: 'Presentazione del team di tecnici qualificati, formatori certificati e consulenti di E.M. Safety.',
    },
  },
  services: {
    title: 'Servizi di Consulenza Sicurezza sul Lavoro & Sistemi ISO — E.M. Safety',
    description:
      'Valutazione rischi (DVR), assunzione ruolo RSPP esterno, prevenzione incendi e pratiche CPI, rilievi fonometrici e vibrazioni, implementazione ISO 45001, 9001 e 14001.',
    keywords:
      'servizi dvr, rspp esterno milano treviso, pratiche cpi vigili del fuoco, rilievi strumentali rumore vibrazioni, iso 45001 certificazione',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Consulenza Sicurezza sul Lavoro e Certificazioni ISO',
      provider: {
        '@type': 'LocalBusiness',
        name: 'E.M. Safety',
      },
      areaServed: 'IT',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servizi di Consulenza D.Lgs. 81/08',
      },
    },
  },
  courses: {
    title: 'Catalogo Corsi Formazione Sicurezza sul Lavoro D.Lgs. 81/08 — E.M. Safety',
    description:
      'Corsi obbligatori e di specializzazione: Formazione Lavoratori (Generale e Specifica), RLS, Dirigenti, Preposti, Antincendio Livello 1-2-3, Primo Soccorso e Carrelli Elevatori. In aula e FAD.',
    keywords:
      'corsi sicurezza sul lavoro, corso rls milano treviso, corso antincendio livello 2 3, corso primo soccorso aziendale, patentino muletto',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      provider: {
        '@type': 'Organization',
        name: 'E.M. Safety',
        sameAs: BASE_SITE_URL,
      },
      name: 'Catalogo Formazione Obbligatoria Sicurezza D.Lgs. 81/08',
      description: 'Programmi formativi conformi agli Accordi Stato-Regioni con rilascio attestati a norma di legge.',
    },
  },
  partner: {
    title: 'Diventa Partner & Rete Professionale — E.M. Safety',
    description:
      'Collabora con E.M. Safety: convenzioni per commercialisti, consulenti del lavoro, studi tecnici e docenti qualificati per offrire sicurezza integrata alle imprese.',
    keywords:
      'partner em safety, convenzioni consulenti lavoro, studi commerciali sicurezza, docenti sicurezza lavoro',
    ogType: 'website',
    twitterCard: 'summary',
  },
  careers: {
    title: 'Lavora con Noi | Opportunità di Carriera nella Sicurezza — E.M. Safety',
    description:
      'Posizioni aperte per Tecnici della Prevenzione, RSPP qualificati, Docenti formatori certificati e consulenti commerciali a Milano e Treviso.',
    keywords:
      'lavora con noi sicurezza, offerte lavoro rspp, lavoro tecnico prevenzione milano treviso, cercasi docente sicurezza',
    ogType: 'website',
    twitterCard: 'summary',
  },
  testimonials: {
    title: 'Casi Studio & Dicono di Noi | Risultati Verificati — E.M. Safety',
    description:
      'Testimonianze reali di aziende che hanno azzerato gli infortuni, ridotto fino al 28% i premi INAIL con il modello OT23 e superato il 100% degli audit ispettivi.',
    keywords:
      'recensioni em safety, casi studio sicurezza lavoro, riduzione premio inail ot23, audit spisal superati',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  tools: {
    title: 'Strumenti & Diagnostica Interattiva D.Lgs. 81/08 & INAIL — E.M. Safety',
    description:
      'Strumenti diagnostici interattivi gratuiti: Simulatore Obblighi & Sanzioni 2026, Ispezione DPI e Presidi di Campo, Calcolatore Costo Non Conformità e Radar SGI ISO 45001.',
    keywords:
      'simulatore sanzioni 81/08, calcolatore obblighi sicurezza, ispezione dpi, sanzioni inail ot23, radar conformita iso 45001',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  contact: {
    title: 'Contatti & Sedi Operative (Milano & Treviso) — E.M. Safety',
    description:
      'Contatta i nostri consulenti per un audit preliminare gratuito o per preventivi su corsi aziendali e servizi D.Lgs. 81/08. Telefono: +39 02 8719 8920.',
    keywords:
      'contatti em safety, audit sicurezza gratuito, sede milano porta nuova, sede treviso, preventivo sicurezza sul lavoro',
    ogType: 'website',
    twitterCard: 'summary',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contatti E.M. Safety',
      description: 'Canali di contatto diretto per le sedi di Milano e Treviso di E.M. Safety.',
      url: `${BASE_SITE_URL}/#contact`,
    },
  },
};

/**
 * Utility to set or create a <meta> element in document.head
 */
function setMetaTag(selector: string, attributeName: string, attributeValue: string, content: string): void {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Utility to set or create a <link rel="..."> element in document.head
 */
function setLinkTag(rel: string, href: string): void {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Utility to insert or update the JSON-LD structured data script
 */
function setStructuredData(data?: Record<string, unknown>): void {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'em-safety-seo-schema';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (!data) {
    if (script) {
      script.remove();
    }
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  try {
    script.textContent = JSON.stringify(data);
  } catch (err) {
    console.warn('[SEO] Failed to serialize structured data', err);
  }
}

/**
 * Retrieves the page metadata for a given page, with safe fallback to 'home'
 */
export function getPageMeta(page: PageType): PageMeta {
  return PAGE_SEO_CONFIG[page] || PAGE_SEO_CONFIG.home;
}

/**
 * Dynamically updates document.title, standard meta tags, Open Graph,
 * Twitter Cards, canonical URL, and Schema.org JSON-LD structured data
 * based on the active page and optional custom override metadata.
 *
 * @param page The currently active page key
 * @param customMeta Optional override values for title, description, keywords, etc.
 */
export function updateDocumentMeta(page: PageType, customMeta?: Partial<PageMeta>): void {
  if (typeof document === 'undefined') return;

  const defaultMeta = getPageMeta(page);
  const meta: PageMeta = {
    ...defaultMeta,
    ...customMeta,
  };

  // 1. Dynamic Document Title
  document.title = meta.title;

  // 2. Standard Meta Description
  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);

  // 3. Meta Keywords
  if (meta.keywords) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
  }

  // 4. Canonical URL
  const pageHash = page === 'home' ? '' : `#${page}`;
  const canonicalUrl = meta.canonicalUrl || `${BASE_SITE_URL}/${pageHash}`;
  setLinkTag('canonical', canonicalUrl);

  // 5. Open Graph Meta Tags (Facebook, LinkedIn, Slack)
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.ogTitle || meta.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.ogDescription || meta.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'E.M. Safety');
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'it_IT');

  // 6. Twitter Card Meta Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', meta.twitterCard || 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.ogTitle || meta.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.ogDescription || meta.description);

  // 7. Schema.org JSON-LD Structured Data
  setStructuredData(meta.structuredData);
}

/**
 * Custom React Hook that automatically triggers updateDocumentMeta
 * whenever the active page or custom metadata changes.
 *
 * @param activePage Current active PageType
 * @param customMeta Optional dynamic overrides (e.g. course title)
 */
export function usePageSeo(activePage: PageType, customMeta?: Partial<PageMeta>): void {
  useEffect(() => {
    updateDocumentMeta(activePage, customMeta);
  }, [activePage, customMeta?.title, customMeta?.description]);
}

// Re-export useMetadata and MetadataOptions for convenient imports
export { useMetadata, type MetadataOptions } from '../hooks/useMetadata';


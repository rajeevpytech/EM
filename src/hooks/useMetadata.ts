import { useEffect } from 'react';
import { PageType } from '../types';
import { PAGE_SEO_CONFIG, BASE_SITE_URL, BASE_SITE_TITLE, PageMeta } from '../utils/seo';

export interface MetadataOptions {
  /** Page title for <title>, og:title, and twitter:title */
  title?: string;
  /** Meta description for search engine snippets and social sharing */
  description?: string;
  /** Meta keywords (comma-separated) */
  keywords?: string;
  /** Canonical URL for the route to prevent duplicate content issues */
  canonicalUrl?: string;
  /** Open Graph title override */
  ogTitle?: string;
  /** Open Graph description override */
  ogDescription?: string;
  /** Open Graph image absolute URL */
  ogImage?: string;
  /** Open Graph resource type */
  ogType?: 'website' | 'article' | 'profile';
  /** Open Graph site name */
  ogSiteName?: string;
  /** Open Graph locale */
  ogLocale?: string;
  /** Twitter card layout */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Twitter image absolute URL */
  twitterImage?: string;
  /** Robots directive, e.g. "index, follow" or "noindex, nofollow" */
  robots?: string;
  /** Author name */
  author?: string;
  /** Schema.org JSON-LD structured data object */
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Route / page key (fallback to lookup default presets) */
  route?: PageType | string;
}

/**
 * Safely creates or updates a meta tag in document.head
 */
function setMetaTag(selector: string, attrName: string, attrValue: string, content: string): void {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Safely creates or updates a link tag in document.head
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
 * Safely inserts or updates JSON-LD structured data in document.head
 */
function setStructuredData(data?: Record<string, unknown> | Array<Record<string, unknown>>): void {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'em-safety-seo-schema';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (!data) {
    if (script) script.remove();
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
    console.warn('[useMetadata] Failed to serialize structured data', err);
  }
}

/**
 * Computes the canonical URL for a given route/hash
 */
export function getCanonicalUrl(route?: PageType | string, customUrl?: string): string {
  if (customUrl) return customUrl;

  const base = BASE_SITE_URL.replace(/\/+$/, '');
  if (!route || route === 'home') {
    return `${base}/`;
  }
  return `${base}/#${route}`;
}

/**
 * Helper to update document head metadata immediately
 */
export function applyMetadata(options: MetadataOptions): void {
  if (typeof document === 'undefined') return;

  const routeKey = options.route as PageType | undefined;
  const preset: PageMeta | undefined = routeKey && PAGE_SEO_CONFIG[routeKey] ? PAGE_SEO_CONFIG[routeKey] : undefined;

  const finalTitle = options.title || preset?.title || `${BASE_SITE_TITLE} — Consulenza Sicurezza sul Lavoro D.Lgs. 81/08`;
  const finalDescription = options.description || preset?.description || 'Costruiamo Sistemi che trasformano la compliance in Valore aggiunto. Consulenze D.Lgs. 81/08 e Formazione accreditata a Milano e Treviso.';
  const finalKeywords = options.keywords || preset?.keywords || 'sicurezza sul lavoro, d.lgs 81/08, rspp, corsi sicurezza, milano, treviso';
  const finalCanonical = getCanonicalUrl(options.route, options.canonicalUrl || preset?.canonicalUrl);
  const finalOgTitle = options.ogTitle || finalTitle;
  const finalOgDescription = options.ogDescription || finalDescription;
  const finalOgType = options.ogType || preset?.ogType || 'website';
  const finalOgImage = options.ogImage || preset?.ogImage || `${BASE_SITE_URL}/logo-em-safety.png`;
  const finalTwitterCard = options.twitterCard || preset?.twitterCard || 'summary_large_image';
  const finalStructuredData = options.structuredData || preset?.structuredData;

  // 1. Document Title
  document.title = finalTitle;

  // 2. Standard Meta Tags
  setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
  setMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);
  setMetaTag('meta[name="robots"]', 'name', 'robots', options.robots || 'index, follow');
  setMetaTag('meta[name="author"]', 'name', 'author', options.author || 'E.M. Safety Consulenze e Formazioni');

  // 3. Canonical Link Tag
  setLinkTag('canonical', finalCanonical);

  // 4. Open Graph Meta Tags (FB, LinkedIn, Slack, WhatsApp)
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalOgTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalOgDescription);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', finalCanonical);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', finalOgType);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', options.ogSiteName || BASE_SITE_TITLE);
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', options.ogLocale || 'it_IT');
  if (finalOgImage) {
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalOgImage);
  }

  // 5. Twitter Card Meta Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', finalTwitterCard);
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalOgTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalOgDescription);
  if (options.twitterImage || finalOgImage) {
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', options.twitterImage || finalOgImage);
  }

  // 6. Schema.org JSON-LD Structured Data
  setStructuredData(finalStructuredData);
}

/**
 * useMetadata hook: Dynamically manages document head meta tags,
 * Open Graph tags, Twitter Cards, canonical URLs, and structured data
 * for every route or view state.
 *
 * Usage pattern 1 (Route-based):
 *   useMetadata('services', { title: 'Custom Services Title' })
 *
 * Usage pattern 2 (Direct options object):
 *   useMetadata({
 *     title: 'Titolo Pagina',
 *     description: 'Descrizione per i motori di ricerca',
 *     canonicalUrl: 'https://emsafety.it/#corsi',
 *     route: 'courses'
 *   })
 */
export function useMetadata(
  routeOrOptions: PageType | string | MetadataOptions,
  customOptions?: Partial<MetadataOptions>
): void {
  // Normalize arguments
  const options: MetadataOptions =
    typeof routeOrOptions === 'string'
      ? { route: routeOrOptions, ...customOptions }
      : { ...routeOrOptions, ...customOptions };

  const {
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    robots,
    route,
  } = options;

  useEffect(() => {
    applyMetadata(options);
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    robots,
    route,
  ]);
}

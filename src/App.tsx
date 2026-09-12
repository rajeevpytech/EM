import React, { useState, useEffect } from 'react';
import { Navbar, PageType } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RibbonStats } from './components/RibbonStats';
import { TwoPathsSection } from './components/TwoPathsSection';
import { RadarSGISection } from './components/RadarSGISection';
import { CourseCatalogSection } from './components/CourseCatalogSection';
import { CalendarSection } from './components/CalendarSection';
import { AboutSection } from './components/AboutSection';
import { AffiliationsSection } from './components/AffiliationsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { CorporateTrainingBanner } from './components/CorporateTrainingBanner';
import { ContactSection } from './components/ContactSection';
import { OurStorySection } from './components/OurStorySection';
import { CustomerStoriesSection } from './components/CustomerStoriesSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { Footer } from './components/Footer';

// Pages
import { OurStoryPage } from './pages/OurStoryPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ServicesPage } from './pages/ServicesPage';
import { CoursesPage } from './pages/CoursesPage';
import { PartnerPage } from './pages/PartnerPage';
import { CareersPage } from './pages/CareersPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';

// Modals
import { SimulatoreModal } from './components/modals/SimulatoreModal';
import { AreaClientiModal } from './components/modals/AreaClientiModal';
import { GapAnalysisModal } from './components/modals/GapAnalysisModal';
import { CourseDetailModal } from './components/modals/CourseDetailModal';
import { QuoteModal, CaseStudiesModal, PartnerModal, PrivacyModal } from './components/modals/AuxModals';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { Course, CalendarEvent } from './types';
import { ScrollSection } from './components/common/ScrollSection';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');

  // Modal states
  const [isSimulatoreOpen, setIsSimulatoreOpen] = useState(false);
  const [isAreaClientiOpen, setIsAreaClientiOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<
    'panoramica' | 'testi' | 'corsi' | 'calendario' | 'storie' | 'leads' | 'media' | 'backup'
  >('panoramica');

  const handleOpenAdmin = (
    tab: 'panoramica' | 'testi' | 'corsi' | 'calendario' | 'storie' | 'leads' | 'media' | 'backup' = 'panoramica'
  ) => {
    setAdminInitialTab(tab);
    setIsAdminOpen(true);
  };

  const [gapAnalysisStandard, setGapAnalysisStandard] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [quotePrefill, setQuotePrefill] = useState<string>('');

  // Handle URL hash on initial load and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['about', 'partner', 'careers', 'testimonials', 'contact', 'story', 'services', 'courses'].includes(hash)) {
        setActivePage(hash as PageType);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'la-nostra-storia' || hash === 'storia') {
        setActivePage('story');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'servizi' || hash === 'servizi-sgi') {
        setActivePage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'corsi' || hash === 'formazione') {
        setActivePage('courses');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (['admin', 'backoffice', 'back-admin', 'dashboard'].includes(hash)) {
        setIsAdminOpen(true);
      } else if (hash === 'home' || !hash) {
        setActivePage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType, targetElementId?: string) => {
    setActivePage(page);

    if (page === 'home' && targetElementId) {
      setTimeout(() => {
        const el = document.getElementById(targetElementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (page !== 'home') {
        window.history.pushState(null, '', `#${page}`);
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  };

  const handleScrollTo = (elementId: string) => {
    if (activePage !== 'home') {
      handleNavigate('home', elementId);
      return;
    }
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGapAnalysis = (standardId: string) => {
    setGapAnalysisStandard(standardId);
  };

  const handlePlanSelected = (planSummary: string) => {
    setQuotePrefill(planSummary);
    setIsQuoteOpen(true);
  };

  const handleBookCalendarEvent = (event: CalendarEvent) => {
    setQuotePrefill(`Iscrizione Edizione Calendario: ${event.courseTitle} (${event.startDate} - ${event.location})`);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#1c2923] font-sans-ui selection:bg-[#142921] selection:text-white flex flex-col">
      {/* 1. Main Header with Full Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSimulatore={() => setIsSimulatoreOpen(true)}
        onOpenAreaClienti={() => setIsAreaClientiOpen(true)}
        onOpenAdminModal={() => handleOpenAdmin('media')}
        onOpenQuote={() => {
          setQuotePrefill('');
          setIsQuoteOpen(true);
        }}
        onOpenCaseStudies={() => handleNavigate('testimonials')}
        onOpenPartnerModal={() => handleNavigate('partner')}
      />

      <main className="flex-1">
        {/* VIEW ROUTING */}
        {activePage === 'story' && (
          <OurStoryPage
            onNavigateHome={() => handleNavigate('home')}
            onOpenContact={() => handleNavigate('contact')}
            onOpenCourses={() => handleNavigate('home', 'catalogo-corsi')}
          />
        )}

        {activePage === 'about' && (
          <AboutUsPage
            onNavigateHome={() => handleNavigate('home')}
            onOpenContact={() => handleNavigate('contact')}
            onOpenCourses={() => handleNavigate('home', 'catalogo-corsi')}
          />
        )}

        {activePage === 'partner' && (
          <PartnerPage
            onNavigateHome={() => handleNavigate('home')}
            onOpenContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'careers' && (
          <CareersPage
            onNavigateHome={() => handleNavigate('home')}
            onOpenContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'testimonials' && (
          <TestimonialsPage
            onNavigateHome={() => handleNavigate('home')}
            onOpenContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onNavigateHome={() => handleNavigate('home')}
            onOpenContact={() => handleNavigate('contact')}
            onOpenQuote={(title) => {
              setQuotePrefill(title || 'Richiesta Preventivo Servizi SGI');
              setIsQuoteOpen(true);
            }}
            onOpenCourses={() => handleNavigate('courses')}
          />
        )}

        {activePage === 'courses' && (
          <CoursesPage
            onNavigateHome={() => handleNavigate('home')}
            onOpenContact={() => handleNavigate('contact')}
            onOpenQuote={(title) => {
              setQuotePrefill(title || 'Richiesta Info Corso');
              setIsQuoteOpen(true);
            }}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        )}

        {activePage === 'home' && (
          <>
            {/* 2. Hero Section with 4-image bento grid & safety badge */}
            <HeroSection
              onConsultancyClick={() => handleScrollTo('contatti')}
              onCoursesClick={() => handleScrollTo('catalogo-corsi')}
              onOpenAdminMedia={() => handleOpenAdmin('media')}
            />

            {/* 3. Dark forest green Ribbon & 4-Column Stats */}
            <ScrollSection>
              <RibbonStats />
            </ScrollSection>

            {/* 4. "DUE PERCORSI" - "Da dove vuoi partire?" Two large split cards */}
            <ScrollSection>
              <TwoPathsSection
                onSelectConsultancy={() => handleNavigate('services')}
                onSelectCourses={() => handleNavigate('courses')}
              />
            </ScrollSection>

            {/* 5. "SISTEMA INTEGRATO" - "Radar di Conformità & Gestione Integrata SGI" */}
            <ScrollSection>
              <RadarSGISection onRunGapAnalysis={handleOpenGapAnalysis} />
            </ScrollSection>

            {/* 6. "CATALOGO CORSI" - "Trova il corso giusto per te e per il tuo team" */}
            <ScrollSection>
              <CourseCatalogSection
                onSelectCourse={(course) => setSelectedCourse(course)}
                onRequestCorporateCourse={() => {
                  setQuotePrefill('Richiesta Corso Aziendale su Misura (in azienda o aule E.M Safety)');
                  setIsQuoteOpen(true);
                }}
              />
            </ScrollSection>

            {/* 7. "CALENDARIO" - "Prossime edizioni in partenza" */}
            <ScrollSection>
              <CalendarSection
                onContactClick={() => handleScrollTo('contatti')}
                onBookSeat={handleBookCalendarEvent}
              />
            </ScrollSection>

            {/* 8. "CHI SIAMO" - "Un approccio concreto alla sicurezza" */}
            <ScrollSection>
              <AboutSection
                onLearnMore={() => {
                  handleNavigate('story');
                }}
              />
            </ScrollSection>

            {/* 8.05 "LA NOSTRA STORIA" - Sezione Cronistoria sul campo (1994 - 2026) */}
            <ScrollSection>
              <OurStorySection
                onExploreFullStory={() => handleNavigate('story')}
              />
            </ScrollSection>

            {/* 8.06 "STORIE DI SUCCESSO & CASI AZIENDALI" - Gestite dal back-office admin */}
            <ScrollSection>
              <CustomerStoriesSection
                onOpenContact={() => handleNavigate('contact')}
                onOpenQuote={() => {
                  setQuotePrefill('Richiesta Audit Preliminare da Storie di Successo');
                  setIsQuoteOpen(true);
                }}
                onOpenAdmin={() => setIsAdminOpen(true)}
              />
            </ScrollSection>

            {/* 8.07 CAROUSEL TESTIMONIANZE CLIENTI CON ROTAZIONE AUTOMATICA */}
            <ScrollSection>
              <TestimonialCarousel />
            </ScrollSection>

            {/* 8.1 "AFFILIAZIONI" - ANFOS, OPN ITALIA LAVORO, DAN Partner */}
            <ScrollSection>
              <AffiliationsSection
                onLearnMore={() => handleNavigate('contact')}
              />
            </ScrollSection>

            {/* 9. "COME FUNZIONA" - "Dalla richiesta al percorso, in tre passi" */}
            <ScrollSection>
              <HowItWorksSection />
            </ScrollSection>

            {/* 10. "FORMAZIONE PER AZIENDE" Banner */}
            <ScrollSection>
              <CorporateTrainingBanner
                onCorporateRequest={() => {
                  setQuotePrefill('Richiesta Formazione Aziendale dedicata');
                  setIsQuoteOpen(true);
                }}
                onQuoteRequest={() => {
                  setQuotePrefill('Richiesta Preventivo Generale');
                  setIsQuoteOpen(true);
                }}
              />
            </ScrollSection>

            {/* 11. "PARLIAMONE" - "Raccontaci la tua esigenza" + "Scrivici" Card Form */}
            <ScrollSection>
              <ContactSection />
            </ScrollSection>
          </>
        )}
      </main>

      {/* 12. Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenQuote={() => {
          setQuotePrefill('');
          setIsQuoteOpen(true);
        }}
        onOpenSimulatore={() => setIsSimulatoreOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modals */}
      <SimulatoreModal
        isOpen={isSimulatoreOpen}
        onClose={() => setIsSimulatoreOpen(false)}
        onSelectPlan={handlePlanSelected}
      />

      <AreaClientiModal
        isOpen={isAreaClientiOpen}
        onClose={() => setIsAreaClientiOpen(false)}
      />

      <GapAnalysisModal
        isOpen={!!gapAnalysisStandard}
        standardId={gapAnalysisStandard}
        onClose={() => setGapAnalysisStandard(null)}
        onRequestFullAudit={(standard) => {
          setQuotePrefill(`Audit di Gap Analysis per standard: ${standard}`);
          setGapAnalysisStandard(null);
          setIsQuoteOpen(true);
        }}
      />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnrollCourse={(course) => {
          setQuotePrefill(`Iscrizione Corso: ${course.title} (Codice: ${course.code})`);
          setSelectedCourse(null);
          setIsQuoteOpen(true);
        }}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        prefillReason={quotePrefill}
      />

      <CaseStudiesModal
        isOpen={isCaseStudiesOpen}
        onClose={() => setIsCaseStudiesOpen(false)}
        onSelectCase={(title) => {
          setQuotePrefill(`Approfondimento Caso Studio: ${title}`);
          setIsCaseStudiesOpen(false);
          setIsQuoteOpen(true);
        }}
      />

      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        initialTab={adminInitialTab}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash.toLowerCase().includes('admin')) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        onNavigateHome={() => {
          setIsAdminOpen(false);
          handleNavigate('home');
        }}
      />
    </div>
  );
}

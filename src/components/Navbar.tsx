import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MapPin, Phone, Sparkles, Shield, Briefcase, Handshake, Users, Star, MessageSquare, History, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { PageType } from '../types';
import { getAdminAuthStatus } from '../utils/adminStore';

export type { PageType };

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType, targetElementId?: string) => void;
  onOpenSimulatore: () => void;
  onOpenAreaClienti: () => void;
  onOpenQuote: () => void;
  onOpenCaseStudies?: () => void;
  onOpenPartnerModal?: () => void;
  onOpenAdminModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenSimulatore,
  onOpenAreaClienti,
  onOpenQuote,
  onOpenAdminModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsAdminLoggedIn(getAdminAuthStatus());
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PageType, targetElementId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, targetElementId);
  };

  const navItems: Array<{ id: PageType; label: string; elementId?: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Chi siamo' },
    { id: 'services', label: 'Servizi' },
    { id: 'courses', label: 'Corsi' },
    { id: 'courses', label: 'Calendario', elementId: 'calendario-corsi' },
    { id: 'home', label: 'Approfondimenti', elementId: 'simulatore-sanzioni' },
    { id: 'contact', label: 'Contatti' },
  ];

  return (
    <header className={`sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 transition-all duration-300 ${
      isScrolled ? 'shadow-md' : 'shadow-xs'
    }`}>
      {/* Top Corporate Strip with Locations & Direct Contact - hidden on scroll */}
      <div className={`bg-[#0B192C] text-slate-300 text-[11px] px-4 border-[#1E3E62] transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'max-h-0 opacity-0 overflow-hidden py-0 border-b-0 pointer-events-none'
          : 'max-h-16 opacity-100 py-1.5 border-b'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Sedi Operative:</span> Milano (Porta Nuova) • Treviso
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-emerald-400" />
              Milano: +39 02 8719 8920
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px]">
            {isAdminLoggedIn && onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/40 text-[10px] font-bold cursor-pointer transition-colors"
                title="Pannello Amministratore (Cambia immagini e contenuti)"
              >
                <KeyRound className="w-3 h-3 text-amber-400" />
                <span>Admin: Cambia Immagini</span>
              </button>
            )}
            <button
              onClick={() => handleNavClick('testimonials')}
              className="hover:text-white transition-colors cursor-pointer hidden sm:inline"
            >
              Testimonianze & Casi Studio
            </button>
            <span className="hidden sm:inline text-slate-600">•</span>
            <button
              onClick={() => handleNavClick('partner')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Collabora con Noi
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => handleNavClick('careers')}
              className="hover:text-white transition-colors cursor-pointer text-emerald-400 font-semibold"
            >
              Lavora con Noi (Carriere)
            </button>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="hidden lg:inline text-slate-300">Accreditato Veneto & Lombardia</span>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 ${
          isScrolled ? 'py-1.5 sm:py-2' : 'py-2 sm:py-3.5'
        }`}>
          {/* Brand Logo, vertical pipe, and Slogan */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('home')}
              className="flex items-center focus:outline-none shrink-0 cursor-pointer py-0.5 touch-manipulation"
              aria-label="E.M. Safety Home"
            >
              <Logo
                variant="dark"
                size={isScrolled ? "sm" : "xl"}
                className={`transition-all duration-300 ${
                  isScrolled
                    ? 'h-[36px] min-[380px]:h-[40px] sm:h-[44px] md:h-[46px] w-auto max-w-[150px] min-[380px]:max-w-[180px] sm:max-w-none'
                    : 'h-[46px] min-[380px]:h-[52px] sm:h-[68px] md:h-[76px] lg:h-[82px] w-auto max-w-[175px] min-[380px]:max-w-[210px] sm:max-w-none'
                }`}
              />
            </motion.button>

            {/* Slogan - smoothly hidden when scrolled */}
            <div className={`hidden md:flex items-center gap-2 sm:gap-4 transition-all duration-300 overflow-hidden ${
              isScrolled ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-md opacity-100'
            }`}>
              <span className="text-slate-300 font-light text-3xl select-none" aria-hidden="true">
                |
              </span>
              <div className="flex flex-col justify-center select-none whitespace-nowrap">
                <span className="font-sans text-xs lg:text-[14px] text-slate-800 font-normal tracking-wide leading-snug">
                  Costruiamo Sistemi che
                </span>
                <span className="font-sans text-xs lg:text-[14px] text-slate-700 font-normal tracking-wide leading-snug">
                  trasformano la compliance
                </span>
                <span className="font-sans text-xs lg:text-[14px] text-[#1B4332] font-bold tracking-wide leading-snug">
                  in Valore aggiunto
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Menu Buttons - Shown inline when scrolled */}
          {isScrolled && (
            <nav className="hidden lg:flex items-center justify-end gap-1.5 xl:gap-2 text-[13px] xl:text-[14px] font-medium text-slate-700 transition-all duration-300 animate-in fade-in ml-auto">
              {navItems.map((item) => {
                const isActive = !item.elementId && activePage === item.id;
                return (
                  <button
                    key={`scrolled-${item.id}-${item.label}`}
                    onClick={() => handleNavClick(item.id, item.elementId)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-[#1B4332] font-bold bg-emerald-50 border border-emerald-200/80 shadow-2xs'
                        : 'hover:text-[#1B4332] hover:bg-slate-100/80'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Action CTAs - hidden on scroll on desktop so only logo and menu buttons appear */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Area Clienti - shown when !isScrolled on desktop */}
            {!isScrolled && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenAreaClienti}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs touch-manipulation"
              >
                <Shield className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>Area Clienti</span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-[#0B192C] text-white rounded">
                  CLOUD
                </span>
              </motion.button>
            )}

            {/* Richiedi una consulenza Primary Button - shown only when not scrolled */}
            {!isScrolled && (
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenQuote}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1B4332] hover:bg-[#143326] active:bg-[#0f271d] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap touch-manipulation px-2.5 sm:px-4 py-2 sm:py-2.5 min-h-[44px]"
              >
                <span className="hidden sm:inline">Richiedi una consulenza</span>
                <span className="sm:hidden text-[11px]">Consulenza</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            )}

            {/* Mobile menu toggle button */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden min-w-[38px] min-h-[38px] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-slate-800 hover:text-[#1B4332] bg-slate-100/90 hover:bg-slate-200/90 active:bg-slate-200 border border-slate-200/90 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 cursor-pointer touch-manipulation transition-all select-none shadow-2xs"
              aria-label={mobileMenuOpen ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B4332] transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 transition-transform duration-200" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Dedicated Desktop Navigation Bar: Full-width track when at top, hidden on scroll */}
      <div className={`hidden lg:block bg-slate-50/90 border-slate-200/80 shadow-2xs transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'max-h-0 opacity-0 overflow-hidden py-0 border-t-0 pointer-events-none'
          : 'max-h-16 opacity-100 py-1 border-t'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-1 gap-1 text-[12px] xl:text-[13px] font-medium text-slate-700 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = !item.elementId && activePage === item.id;
              return (
                <button
                  key={`top-${item.id}-${item.label}`}
                  onClick={() => handleNavClick(item.id, item.elementId)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#1B4332] font-bold bg-white shadow-2xs border border-emerald-200'
                      : 'hover:text-[#0B192C] hover:bg-white/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              <button
                onClick={onOpenSimulatore}
                className="relative px-3 py-1.5 text-[12px] font-bold text-[#0B192C] hover:text-[#1B4332] transition-colors flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200/80 cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>Simulatore D.Lgs 81/08</span>
                <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded bg-[#1B4332] text-white">
                  2026
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Slogan Banner: Dedicated, hidden on scroll */}
      <div className={`md:hidden bg-gradient-to-r from-slate-50 via-emerald-50/40 to-slate-50 border-slate-200/90 text-center shadow-xs transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'max-h-0 opacity-0 overflow-hidden py-0 border-t-0 border-b-0 pointer-events-none'
          : 'max-h-16 opacity-100 px-4 py-2 border-t border-b'
      }`}>
        <p className="text-xs font-semibold text-slate-800 tracking-tight leading-snug">
          Costruiamo Sistemi che trasformano la compliance in{' '}
          <span className="text-[#1B4332] font-bold">Valore aggiunto</span>
        </p>
      </div>

      {/* Mobile animated dropdown drawer with outside-tap backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Touch backdrop for closing on tap outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30 lg:hidden"
              aria-hidden="true"
            />

            {/* Mobile Navigation Drawer */}
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-40 lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-xl max-h-[85vh] overflow-y-auto"
            >
              {/* Mobile Drawer Brand & Slogan Card */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl mb-3 flex flex-col items-center text-center gap-1 shadow-xs">
                <Logo variant="dark" size="lg" className="h-[52px] sm:h-[60px] w-auto" />
                <p className="text-xs font-medium text-slate-700 tracking-tight leading-snug mt-0.5">
                  Costruiamo Sistemi che trasformano la compliance in{' '}
                  <span className="text-[#1B4332] font-bold">Valore aggiunto</span>
                </p>
              </div>

              <button
                onClick={() => handleNavClick('home')}
                className={`flex items-center w-full text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.99] ${
                  activePage === 'home'
                    ? 'bg-emerald-50 text-[#1B4332] font-bold border border-emerald-200/80'
                    : 'text-slate-800 hover:text-[#1B4332] hover:bg-slate-50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('story')}
                className={`flex items-center justify-between w-full text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.99] ${
                  activePage === 'story'
                    ? 'bg-emerald-50 text-[#1B4332] font-bold border border-emerald-200/80'
                    : 'text-slate-800 hover:text-[#1B4332] hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4 text-[#1B4332]" />
                  La Nostra Storia (1994 - 2026)
                </span>
                <span className="text-[10px] bg-emerald-100 text-[#1B4332] px-2 py-0.5 rounded font-bold uppercase">
                  30+ Anni
                </span>
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`flex items-center w-full text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.99] ${
                  activePage === 'about'
                    ? 'bg-emerald-50 text-[#1B4332] font-bold border border-emerald-200/80'
                    : 'text-slate-800 hover:text-[#1B4332] hover:bg-slate-50'
                }`}
              >
                Chi siamo
              </button>

              <button
                onClick={() => handleNavClick('services')}
                className={`flex items-center w-full text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.99] ${
                  activePage === 'services'
                    ? 'bg-emerald-50 text-[#1B4332] font-bold border border-emerald-200/80'
                    : 'text-slate-800 hover:text-[#1B4332] hover:bg-slate-50'
                }`}
              >
                Servizi
              </button>

              <button
                onClick={() => handleNavClick('courses')}
                className={`flex items-center w-full text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.99] ${
                  activePage === 'courses'
                    ? 'bg-emerald-50 text-[#1B4332] font-bold border border-emerald-200/80'
                    : 'text-slate-800 hover:text-[#1B4332] hover:bg-slate-50'
                }`}
              >
                Corsi
              </button>

              <button
                onClick={() => handleNavClick('courses', 'calendario-corsi')}
                className="flex items-center w-full text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-sm font-semibold text-slate-800 hover:text-[#1B4332] hover:bg-slate-50 transition-all touch-manipulation active:scale-[0.99]"
              >
                Calendario
              </button>

              <button
                onClick={() => handleNavClick('home', 'simulatore-sanzioni')}
                className="flex items-center w-full text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-sm font-semibold text-slate-800 hover:text-[#1B4332] hover:bg-slate-50 transition-all touch-manipulation active:scale-[0.99]"
              >
                Approfondimenti
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`flex items-center w-full text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.99] ${
                  activePage === 'contact'
                    ? 'bg-emerald-50 text-[#1B4332] font-bold border border-emerald-200/80'
                    : 'text-slate-800 hover:text-[#1B4332] hover:bg-slate-50'
                }`}
              >
                Contatti
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSimulatore();
                }}
                className="flex items-center justify-between w-full text-left min-h-[44px] py-2.5 px-3.5 text-sm font-bold text-[#0B192C] bg-emerald-50 rounded-xl border border-emerald-200/90 touch-manipulation active:scale-[0.99]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1B4332]" />
                  Simulatore D.Lgs 81/08
                </span>
                <span className="text-[10px] bg-[#1B4332] text-white px-2 py-0.5 rounded font-bold uppercase">
                  2026
                </span>
              </button>

              <div className="pt-3 border-t border-slate-200 flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAreaClienti();
                  }}
                  className="flex-1 min-h-[44px] py-2.5 px-2 text-center text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 shadow-2xs touch-manipulation flex items-center justify-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5 text-[#1B4332]" />
                  <span>Area Clienti</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="flex-1 min-h-[44px] py-2.5 px-2 text-center text-xs font-bold text-white bg-[#1B4332] hover:bg-[#143326] active:bg-[#0f271d] rounded-xl shadow-sm touch-manipulation flex items-center justify-center gap-1"
                >
                  <span>Richiedi consulenza</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              {onOpenAdminModal && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdminModal();
                    }}
                    className="w-full flex items-center justify-between min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 transition-colors touch-manipulation"
                  >
                    <span className="flex items-center gap-2">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                      Pannello Admin (Gestione Immagini & Dati)
                    </span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold uppercase">
                      {isAdminLoggedIn ? 'Attivo' : 'Accedi'}
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

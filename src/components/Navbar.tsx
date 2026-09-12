import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MapPin, Phone, Sparkles, Shield, Briefcase, Handshake, Users, Star, MessageSquare, History, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
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

  useEffect(() => {
    setIsAdminLoggedIn(getAdminAuthStatus());
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PageType, targetElementId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, targetElementId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all shadow-xs">
      {/* Top Corporate Strip with Locations & Direct Contact */}
      <div className="bg-[#0B192C] text-slate-300 text-[11px] py-1.5 px-4 border-b border-[#1E3E62]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] animate-pulse" />
              <span className="font-semibold text-white">Sedi Operative:</span> Milano (Porta Nuova) • Treviso
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-[#0A66C2]" />
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
              className="hover:text-white transition-colors cursor-pointer text-[#70B5F9] font-semibold"
            >
              Lavora con Noi (Carriere)
            </button>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="hidden lg:inline text-slate-300">Accreditato Veneto & Lombardia</span>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3.5 gap-3 sm:gap-4">
          {/* Brand Logo, vertical pipe, and Slogan - Specially sized larger on phone */}
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('home')}
              className="flex items-center focus:outline-none shrink-0 cursor-pointer py-0.5"
              aria-label="E.M. Safety Home"
            >
              <Logo
                variant="dark"
                size="xl"
                className="h-[62px] sm:h-[72px] md:h-[80px] w-auto max-w-[210px] sm:max-w-none"
              />
            </motion.button>

            {/* Vertical Pipe separator */}
            <span className="hidden md:inline-block text-slate-300 font-light text-3xl select-none" aria-hidden="true">
              |
            </span>

            {/* Slogan matching requirement - enlarged font size for maximum legibility */}
            <div className="hidden md:flex flex-col justify-center select-none">
              <span className="font-sans text-sm sm:text-[15px] text-slate-800 font-normal tracking-wide leading-snug">
                Costruiamo Sistemi che
              </span>
              <span className="font-sans text-sm sm:text-[15px] text-slate-700 font-normal tracking-wide leading-snug">
                trasformano la compliance
              </span>
              <span className="font-sans text-sm sm:text-[15px] text-[#0A66C2] font-bold tracking-wide leading-snug">
                in Valore aggiunto
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Area Clienti */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenAreaClienti}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Area Clienti</span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-[#0B192C] text-white rounded">
                CLOUD
              </span>
            </motion.button>

            {/* Richiedi Preventivo Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Preventivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#0B192C] hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Apri menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Dedicated Desktop Navigation Bar: Full-width track preventing any menu wrap or glitch */}
      <div className="hidden lg:block bg-slate-50/90 border-t border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-1 gap-1 text-[12px] xl:text-[13px] font-medium text-slate-700 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'home'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'about'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              Chi Siamo
            </button>

            <button
              onClick={() => handleNavClick('story')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'story'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              La Nostra Storia
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'services'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              Servizi SGI
            </button>

            <button
              onClick={() => handleNavClick('courses')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'courses'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              Corsi Formazione
            </button>

            <button
              onClick={() => handleNavClick('home', 'affiliazioni')}
              className="px-2.5 py-1.5 rounded hover:text-[#0B192C] hover:bg-white/80 transition-colors cursor-pointer font-semibold text-[#0B192C] whitespace-nowrap shrink-0"
            >
              Affiliazioni
            </button>

            <button
              onClick={() => handleNavClick('partner')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'partner'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              Collabora
            </button>

            <button
              onClick={() => handleNavClick('testimonials')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'testimonials'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              Testimonianze
            </button>

            <button
              onClick={() => handleNavClick('careers')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'careers'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              Carriere
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === 'contact'
                  ? 'text-[#0A66C2] font-bold bg-white shadow-2xs border border-blue-200/60'
                  : 'hover:text-[#0B192C] hover:bg-white/80'
              }`}
            >
              Contatti
            </button>

            <button
              onClick={onOpenSimulatore}
              className="relative px-3 py-1.5 text-[12px] font-bold text-[#0B192C] hover:text-[#0A66C2] transition-colors flex items-center gap-1.5 bg-blue-50/90 hover:bg-blue-100 rounded-md border border-blue-200/80 cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Simulatore 2026</span>
              <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded bg-[#0A66C2] text-white">
                New
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Slogan Banner: Dedicated, prominent, and readable on mobile devices */}
      <div className="md:hidden bg-gradient-to-r from-slate-50 via-blue-50/70 to-slate-50 border-t border-b border-slate-200/90 px-4 py-2.5 text-center shadow-xs">
        <p className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight leading-snug">
          Costruiamo Sistemi che trasformano la compliance in{' '}
          <span className="text-[#0A66C2] font-bold">Valore aggiunto</span>
        </p>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile Drawer Brand & Slogan Card */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl mb-3 flex flex-col items-center text-center gap-1.5 shadow-xs">
            <Logo variant="dark" size="lg" className="h-[62px] sm:h-[70px] w-auto" />
            <p className="text-xs sm:text-sm font-medium text-slate-700 tracking-tight leading-snug mt-1">
              Costruiamo Sistemi che trasformano la compliance in{' '}
              <span className="text-[#0A66C2] font-bold">Valore aggiunto</span>
            </p>
          </div>
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'home' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('story')}
            className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'story' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            <span className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#0A66C2]" />
              La Nostra Storia (1994 - 2026)
            </span>
            <span className="text-[10px] bg-blue-100 text-[#0A66C2] px-2 py-0.5 rounded font-bold uppercase">
              30+ Anni
            </span>
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'about' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            Chi Siamo (About Us)
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'services' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            Consulenza SGI (D.Lgs 81/08 & ISO 45001)
          </button>

          <button
            onClick={() => handleNavClick('courses')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'courses' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            Catalogo Corsi Accreditati
          </button>

          <button
            onClick={() => handleNavClick('home', 'affiliazioni')}
            className="block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#0B192C] font-bold"
          >
            Affiliazioni (ANFOS • OPN • DAN)
          </button>

          <button
            onClick={() => handleNavClick('partner')}
            className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'partner' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Handshake className="w-4 h-4 text-[#0A66C2]" />
              Collabora con Noi
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">
              Rete
            </span>
          </button>

          <button
            onClick={() => handleNavClick('testimonials')}
            className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'testimonials' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#0A66C2]" />
              Testimonianze & Casi Studio
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
              4.9/5
            </span>
          </button>

          <button
            onClick={() => handleNavClick('careers')}
            className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'careers' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#0A66C2]" />
              Lavora con Noi (Carriere)
            </span>
            <span className="text-[10px] bg-orange-100 text-orange-900 px-2 py-0.5 rounded font-bold uppercase">
              Assunzioni
            </span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              activePage === 'contact' ? 'bg-blue-50 text-[#0A66C2] font-bold' : 'text-slate-800 hover:text-[#0A66C2]'
            }`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#0A66C2]" />
              Contattaci (Milano & Treviso)
            </span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSimulatore();
            }}
            className="flex items-center justify-between w-full text-left py-2 text-sm font-bold text-[#0B192C] bg-blue-50 px-3 rounded-lg border border-blue-200"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0A66C2]" />
              Simulatore 2026 (Nuovo Accordo)
            </span>
            <span className="text-[10px] bg-[#0A66C2] text-white px-2 py-0.5 rounded font-bold uppercase">
              Calcola
            </span>
          </button>

          <div className="pt-3 border-t border-slate-200 flex gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAreaClienti();
              }}
              className="flex-1 py-2.5 text-center text-xs font-bold text-[#0B192C] bg-slate-100 rounded-lg border border-slate-300 shadow-2xs"
            >
              Area Clienti Cloud
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-[#0A66C2] rounded-lg shadow-sm"
            >
              Richiedi Preventivo
            </motion.button>
          </div>

          {onOpenAdminModal && (
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 transition-colors"
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
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Award,
  TrendingDown,
  Building2,
  MapPin,
  ArrowRight,
  Quote,
  CheckCircle2,
  Sparkles,
  KeyRound,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAdminStore } from '../utils/adminStore';
import { SafetyStory } from '../types';

interface CustomerStoriesSectionProps {
  onOpenContact: () => void;
  onOpenQuote?: () => void;
  onOpenAdmin?: () => void;
}

export const CustomerStoriesSection: React.FC<CustomerStoriesSectionProps> = ({
  onOpenContact,
  onOpenQuote,
  onOpenAdmin,
}) => {
  const { stories } = useAdminStore();
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [activeStoryModal, setActiveStoryModal] = useState<SafetyStory | null>(null);

  // Filter only stories to show: featured on home (or all if none are featured)
  const homeStories = stories.filter((s) => s.featuredOnHome);
  const displayStories = homeStories.length > 0 ? homeStories : stories;

  // Extract unique sectors
  const sectors = ['all', ...Array.from(new Set(displayStories.map((s) => s.sector)))];

  const filtered = selectedSector === 'all'
    ? displayStories
    : displayStories.filter((s) => s.sector === selectedSector);

  return (
    <section id="storie-successo" className="py-20 bg-slate-50 border-t border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0A66C2] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Award className="w-3.5 h-3.5 text-orange-500" />
              <span>Casi Reali & Risultati Misurabili</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B192C] tracking-tight leading-tight">
              Aziende al Nostro Fianco:{' '}
              <span className="text-[#0A66C2]">Storie di Sicurezza Concreta</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-sans-ui leading-relaxed">
              Dalla metalmeccanica pesante alla logistica h24 e alla chimica avanzata: scopri come trasformiamo le prescrizioni di legge in tutela penale, sgravi INAIL e zero infortuni.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-[#0A66C2] border border-slate-300 hover:border-slate-400 shadow-xs transition-colors cursor-pointer"
                title="Aggiungi o modifica storie dal pannello admin"
              >
                <KeyRound className="w-3.5 h-3.5 text-orange-500" />
                <span>Gestisci Storie (Admin)</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md transition-all cursor-pointer"
            >
              <span>Richiedi un Audit Preliminare</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sector Filter Chips */}
        {sectors.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 shrink-0">
              Filtra settore:
            </span>
            {sectors.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSelectedSector(sec)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {sec === 'all' ? 'Tutte le Storie' : sec}
              </button>
            ))}
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group hover:border-[#0A66C2]/40"
            >
              {/* Card Header with Sector & Metric */}
              <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0A66C2] mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{story.sector}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {story.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B192C] group-hover:text-[#0A66C2] transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Cliente: <span className="text-slate-900 font-bold">{story.clientCompany}</span>
                    {story.year && <span className="text-slate-500"> ({story.year})</span>}
                  </p>
                </div>

                {/* Highlight Metric Pill */}
                <div className="shrink-0 text-right bg-blue-50 border border-blue-200/80 px-3.5 py-2 rounded-xl text-center min-w-[110px]">
                  <span className="block text-xl sm:text-2xl font-black text-[#0A66C2] tracking-tight">
                    {story.metric}
                  </span>
                  <span className="block text-[10px] font-bold text-slate-600 leading-tight mt-0.5">
                    {story.metricLabel}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed font-sans-ui">
                  {story.summary}
                </p>

                {/* Key result bullet preview */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/60 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Soluzione:</strong> {story.solution.length > 120 ? `${story.solution.substring(0, 120)}...` : story.solution}
                    </span>
                  </div>
                </div>

                {/* Client Quote if available */}
                {story.quote && (
                  <div className="relative pl-3 border-l-2 border-orange-400 italic text-xs text-slate-600">
                    <p>"{story.quote}"</p>
                    {story.authorName && (
                      <span className="block not-italic font-bold text-[11px] text-slate-800 mt-1">
                        — {story.authorName} {story.authorRole ? `(${story.authorRole})` : ''}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer action */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  {story.badge ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0A66C2]" />
                      {story.badge}
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveStoryModal(story)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:text-[#004182] group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Leggi il Caso Completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Safety Consultation */}
        <div className="mt-12 bg-[#0B192C] text-white rounded-2xl p-6 sm:p-8 border border-[#1E3E62] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Vuoi ottenere gli stessi risultati nella tua azienda?
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl font-sans-ui">
              I nostri consulenti e RSPP qualificati eseguono una verifica preliminare gratuita della tua conformità (D.Lgs. 81/08 e potenziale sgravio INAIL OT23).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenQuote && (
              <button
                type="button"
                onClick={onOpenQuote}
                className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-colors cursor-pointer"
              >
                Calcola Preventivo Rapido
              </button>
            )}
            <button
              type="button"
              onClick={onOpenContact}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#152B44] hover:bg-[#1E3E62] text-white border border-slate-700 transition-colors cursor-pointer"
            >
              Parla con un Tecnico
            </button>
          </div>
        </div>
      </div>

      {/* FULL STORY MODAL */}
      <AnimatePresence>
        {activeStoryModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Modal Top Header */}
              <div className="bg-[#0B192C] text-white p-6 border-b border-[#1E3E62] flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
                    <span>{activeStoryModal.sector}</span>
                    <span>•</span>
                    <span>{activeStoryModal.location}</span>
                    {activeStoryModal.year && <span>• {activeStoryModal.year}</span>}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {activeStoryModal.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-semibold">
                    Caso Studio Aziendale: {activeStoryModal.clientCompany}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStoryModal(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Highlight Metric Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-600 block">
                      Risultato Concreto Certificato
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#0A66C2]">
                      {activeStoryModal.metric}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 block mt-0.5">
                      {activeStoryModal.metricLabel}
                    </span>
                  </div>

                  {activeStoryModal.badge && (
                    <span className="px-3 py-1.5 rounded-lg bg-[#0B192C] text-white text-xs font-bold">
                      {activeStoryModal.badge}
                    </span>
                  )}
                </div>

                {/* 1. The Challenge */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    La Sfida & La Criticità Iniziale
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    {activeStoryModal.challenge}
                  </p>
                </div>

                {/* 2. The Solution */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A66C2] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                    L'Intervento E.M. Safety
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/40 p-4 rounded-xl border border-blue-100">
                    {activeStoryModal.solution}
                  </p>
                </div>

                {/* 3. The Results */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    I Risultati Misurati & Tutela Penale
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-emerald-50/40 p-4 rounded-xl border border-emerald-100">
                    {activeStoryModal.results}
                  </p>
                </div>

                {/* 4. Testimonial Quote */}
                {activeStoryModal.quote && (
                  <div className="bg-slate-100/70 p-4 rounded-xl border-l-4 border-orange-500 space-y-2">
                    <p className="text-xs sm:text-sm text-slate-800 italic font-medium">
                      "{activeStoryModal.quote}"
                    </p>
                    {activeStoryModal.authorName && (
                      <span className="block text-xs font-bold text-slate-900">
                        — {activeStoryModal.authorName}{' '}
                        {activeStoryModal.authorRole ? `(${activeStoryModal.authorRole})` : ''}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStoryModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
                >
                  Chiudi
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveStoryModal(null);
                    onOpenContact();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Richiedi Soluzione per la Tua Azienda</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

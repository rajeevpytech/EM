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
  BookOpen,
  Newspaper,
  Clock,
  User,
  Tag,
  Calendar,
} from 'lucide-react';
import { useAdminStore } from '../utils/adminStore';
import { ContentItem, ContentType } from '../types';

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
  const { contentItems } = useAdminStore();
  const [selectedType, setSelectedType] = useState<'all' | ContentType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItemModal, setActiveItemModal] = useState<ContentItem | null>(null);

  // Filter items to show: featured on home (or all if none are featured)
  const homeItems = contentItems.filter((i) => i.featuredOnHome);
  const displayItems = homeItems.length > 0 ? homeItems : contentItems;

  // Unique categories
  const categories = [
    'all',
    ...Array.from(new Set(displayItems.map((i) => i.category || i.sector).filter(Boolean))),
  ] as string[];

  // Filter by Type & Category
  const filtered = displayItems.filter((item) => {
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory && item.sector !== selectedCategory) {
      return false;
    }
    return true;
  });

  const storiesCount = displayItems.filter((i) => i.type === 'story').length;
  const articlesCount = displayItems.filter((i) => i.type === 'article').length;
  const blogsCount = displayItems.filter((i) => i.type === 'blog').length;

  return (
    <section id="storie-successo" className="py-20 bg-slate-50 border-t border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0A66C2] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Award className="w-3.5 h-3.5 text-orange-500" />
              <span>Casi Reali, Normativa & Aggiornamenti</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B192C] tracking-tight leading-tight">
              Storie di Sicurezza,{' '}
              <span className="text-[#0A66C2]">Guide Tecniche & News</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-sans-ui leading-relaxed">
              Dai casi studio con azzeramento infortuni e sgravi INAIL agli approfondimenti sul D.Lgs. 81/08 e le novità dai cantieri: scopri le soluzioni concrete di E.M. Safety.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-[#0A66C2] border border-slate-300 hover:border-slate-400 shadow-xs transition-colors cursor-pointer"
                title="Aggiungi o modifica storie, articoli e blog dal pannello admin"
              >
                <KeyRound className="w-3.5 h-3.5 text-orange-500" />
                <span>Gestisci Contenuti (Admin)</span>
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

        {/* Content Type Selector Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              Tutti i Contenuti ({displayItems.length})
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('story')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                selectedType === 'story'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Casi Studio ({storiesCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('article')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                selectedType === 'article'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-indigo-800 hover:bg-indigo-50 border border-indigo-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Articoli & Normativa ({articlesCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('blog')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                selectedType === 'blog'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>Blog & Dal Campo ({blogsCount})</span>
            </button>
          </div>

          {/* Category Filter Chips if more than 2 */}
          {categories.length > 2 && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
                Filtra:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white text-slate-700"
              >
                <option value="all">Tutti i settori e temi</option>
                {categories
                  .filter((c) => c !== 'all')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* Content Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((item) => {
            const isStory = item.type === 'story';
            const isArticle = item.type === 'article';
            const isBlog = item.type === 'blog';

            const typeLabel = isStory
              ? 'Caso Studio Certificato'
              : isArticle
              ? 'Guida & Normativa'
              : 'Post dal Campo';

            const typeColor = isStory
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : isArticle
              ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
              : 'bg-emerald-100 text-emerald-800 border-emerald-200';

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group hover:border-[#0A66C2]/40"
              >
                {/* Card Top Header with Type & Metric/ReadTime */}
                <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold uppercase tracking-wider">
                      <span className={`px-2 py-0.5 rounded-md border text-[10px] ${typeColor}`}>
                        {typeLabel}
                      </span>
                      <span className="text-[#0A66C2]">{item.category || item.sector}</span>
                      {isStory && item.location && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500 flex items-center gap-1 font-normal">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#0B192C] group-hover:text-[#0A66C2] transition-colors leading-snug pt-1">
                      {item.title}
                    </h3>

                    {isStory && item.clientCompany && (
                      <p className="text-xs font-semibold text-slate-600">
                        Azienda: <span className="text-slate-900 font-bold">{item.clientCompany}</span>
                        {item.year && <span className="text-slate-500"> ({item.year})</span>}
                      </p>
                    )}

                    {!isStory && item.subtitle && (
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Story Metric Pill OR Article Read Time Pill */}
                  {isStory && item.metric ? (
                    <div className="shrink-0 text-right bg-blue-50 border border-blue-200/80 px-3.5 py-2 rounded-xl text-center min-w-[110px]">
                      <span className="block text-xl sm:text-2xl font-black text-[#0A66C2] tracking-tight">
                        {item.metric}
                      </span>
                      <span className="block text-[10px] font-bold text-slate-600 leading-tight mt-0.5">
                        {item.metricLabel}
                      </span>
                    </div>
                  ) : (
                    <div className="shrink-0 text-right bg-slate-100/80 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                        <Clock className="w-3 h-3 text-[#0A66C2]" />
                        <span>{item.readTime || '4 min'}</span>
                      </span>
                      {item.publishedAt && (
                        <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">
                          {item.publishedAt}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed font-sans-ui">
                    {item.summary}
                  </p>

                  {/* Story Specific: Solution snippet */}
                  {isStory && item.solution && (
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/60 text-xs space-y-2">
                      <div className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900">Soluzione:</strong>{' '}
                          {item.solution.length > 120
                            ? `${item.solution.substring(0, 120)}...`
                            : item.solution}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Article/Blog Specific: Author & Tags */}
                  {!isStory && (
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-700">{item.authorName}</span>
                        {item.authorRole && (
                          <span className="text-slate-400 hidden sm:inline">({item.authorRole})</span>
                        )}
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          {item.tags.slice(0, 2).map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Client Quote if available */}
                  {item.quote && (
                    <div className="relative pl-3 border-l-2 border-orange-400 italic text-xs text-slate-600">
                      <p>"{item.quote}"</p>
                      {item.authorName && (
                        <span className="block not-italic font-bold text-[11px] text-slate-800 mt-1">
                          — {item.authorName} {item.authorRole ? `(${item.authorRole})` : ''}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer action */}
                  <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                    {item.badge ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0A66C2]" />
                        {item.badge}
                      </span>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveItemModal(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:text-[#004182] group-hover:translate-x-1 transition-all cursor-pointer"
                    >
                      <span>
                        {isStory
                          ? 'Leggi il Caso Completo'
                          : isArticle
                          ? 'Leggi l\'Articolo'
                          : 'Leggi il Post'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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

      {/* FULL CONTENT MODAL (Stories, Articles, Blogs) */}
      <AnimatePresence>
        {activeItemModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Cover Image if available */}
              {activeItemModal.imageUrl && (
                <div className="h-44 sm:h-52 w-full relative overflow-hidden bg-slate-900">
                  <img
                    src={activeItemModal.imageUrl}
                    alt={activeItemModal.title}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <button
                    type="button"
                    onClick={() => setActiveItemModal(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-300 mb-1">
                      <span>{activeItemModal.category || activeItemModal.sector}</span>
                      {activeItemModal.location && <span>• {activeItemModal.location}</span>}
                      {activeItemModal.year && <span>• {activeItemModal.year}</span>}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold leading-snug">
                      {activeItemModal.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Modal Top Header (if no cover image) */}
              {!activeItemModal.imageUrl && (
                <div className="bg-[#0B192C] text-white p-6 border-b border-[#1E3E62] flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
                      <span>{activeItemModal.category || activeItemModal.sector}</span>
                      {activeItemModal.location && <span>• {activeItemModal.location}</span>}
                      {activeItemModal.year && <span>• {activeItemModal.year}</span>}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                      {activeItemModal.title}
                    </h3>
                    {activeItemModal.clientCompany && (
                      <p className="text-xs text-slate-300 mt-1 font-semibold">
                        Caso Studio Aziendale: {activeItemModal.clientCompany}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveItemModal(null)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{activeItemModal.authorName}</span>
                    {activeItemModal.authorRole && (
                      <span className="text-slate-500">({activeItemModal.authorRole})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {activeItemModal.publishedAt && <span>{activeItemModal.publishedAt}</span>}
                    {activeItemModal.readTime && <span>• {activeItemModal.readTime}</span>}
                  </div>
                </div>

                {/* Subtitle */}
                {activeItemModal.subtitle && (
                  <p className="text-sm font-semibold text-slate-700 italic leading-relaxed">
                    {activeItemModal.subtitle}
                  </p>
                )}

                {/* Highlight Metric Banner (for story) */}
                {activeItemModal.type === 'story' && activeItemModal.metric && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-600 block">
                        Risultato Concreto Certificato
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-[#0A66C2]">
                        {activeItemModal.metric}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 block mt-0.5">
                        {activeItemModal.metricLabel}
                      </span>
                    </div>

                    {activeItemModal.badge && (
                      <span className="px-3 py-1.5 rounded-lg bg-[#0B192C] text-white text-xs font-bold">
                        {activeItemModal.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Story Specific Blocks: Challenge, Solution, Results */}
                {activeItemModal.type === 'story' && (
                  <div className="space-y-4">
                    {activeItemModal.challenge && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          La Sfida & La Criticità Iniziale
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-rose-50/40 p-3.5 rounded-xl border border-rose-100">
                          {activeItemModal.challenge}
                        </p>
                      </div>
                    )}

                    {activeItemModal.solution && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A66C2] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                          L'Intervento E.M. Safety
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-blue-50/40 p-3.5 rounded-xl border border-blue-100">
                          {activeItemModal.solution}
                        </p>
                      </div>
                    )}

                    {activeItemModal.results && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          I Risultati Misurati & Tutela Penale
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100">
                          {activeItemModal.results}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Full Formatted Article / Blog / Detailed Content */}
                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                  {(activeItemModal.content || activeItemModal.summary)
                    .split('\n\n')
                    .map((paragraph, index) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4
                            key={index}
                            className="text-sm sm:text-base font-bold text-[#0B192C] pt-2 border-b border-slate-100 pb-1"
                          >
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('- ')) {
                        return (
                          <ul key={index} className="list-disc pl-5 space-y-1">
                            {paragraph.split('\n').map((line, liIdx) => (
                              <li key={liIdx}>{line.replace(/^- /, '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={index}>{paragraph}</p>;
                    })}
                </div>

                {/* Testimonial Quote */}
                {activeItemModal.quote && (
                  <div className="bg-slate-100/70 p-4 rounded-xl border-l-4 border-orange-500 space-y-2">
                    <p className="text-xs sm:text-sm text-slate-800 italic font-medium">
                      "{activeItemModal.quote}"
                    </p>
                    {activeItemModal.authorName && (
                      <span className="block text-xs font-bold text-slate-900">
                        — {activeItemModal.authorName}{' '}
                        {activeItemModal.authorRole ? `(${activeItemModal.authorRole})` : ''}
                      </span>
                    )}
                  </div>
                )}

                {/* Tags */}
                {activeItemModal.tags && activeItemModal.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-2">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    {activeItemModal.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveItemModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
                >
                  Chiudi
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveItemModal(null);
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

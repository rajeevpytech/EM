import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Copy,
  Save,
  X,
  Building2,
  Clock,
  Tag,
  User,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
  Newspaper,
  Flame,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react';
import { ContentItem, ContentType, SafetyStory } from '../../types';

interface ContentManagementTabProps {
  contentItems: ContentItem[];
  stories: SafetyStory[];
  articles: ContentItem[];
  blogs: ContentItem[];
  addContentItem: (item: Omit<ContentItem, 'id' | 'publishedAt'>) => ContentItem;
  updateContentItem: (item: ContentItem) => void;
  deleteContentItem: (id: string) => void;
  toggleContentFeatured: (id: string) => void;
  showNotification: (message: string) => void;
}

const PRESET_IMAGES = [
  { label: 'Industria 4.0', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Cantiere & Opere', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Logistica Hub', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Laboratorio Chimico', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Normativa & Diritto', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Audit & Certificazione', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80' },
];

const CATEGORY_SUGGESTIONS: Record<ContentType, string[]> = {
  story: ['Metalmeccanica & Automazione', 'Logistica & Supply Chain', 'Chimico & Farmaceutico', 'Edilizia & Cantieri Complessi', 'Alimentare & Agroindustria'],
  article: ['D.Lgs. 81/08 & Normativa', 'Sgravi INAIL & ISO 45001', 'Cantieri & Patente a Crediti', 'Formazione Obbligatoria', 'Sanzioni & Giurisprudenza'],
  blog: ['Innovazione & Campo', 'Cantieri & Appalti', 'Dietro le Quinte', 'Eventi & Convegni', 'Consigli Operativi'],
};

export const ContentManagementTab: React.FC<ContentManagementTabProps> = ({
  contentItems,
  stories,
  articles,
  blogs,
  addContentItem,
  updateContentItem,
  deleteContentItem,
  toggleContentFeatured,
  showNotification,
}) => {
  // State
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | ContentType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'hidden'>('all');

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);

  // Form fields
  const [formData, setFormData] = useState<Partial<ContentItem> & { tagsString?: string }>({
    type: 'story',
    title: '',
    subtitle: '',
    category: 'Metalmeccanica & Automazione',
    summary: '',
    content: '',
    authorName: 'Ing. Enrico Marchesin',
    authorRole: 'Direttore Tecnico & RSPP',
    readTime: '4 min lettura',
    badge: 'Caso Certificato',
    imageUrl: PRESET_IMAGES[0].url,
    featuredOnHome: true,
    tagsString: '',
    // Story specific
    clientCompany: '',
    sector: 'Metalmeccanica & Automazione',
    location: 'Treviso (TV)',
    year: '2025 - 2026',
    metric: '0 Infortuni',
    metricLabel: 'negli ultimi 3 anni',
    challenge: '',
    solution: '',
    results: '',
    quote: '',
  });

  // Open Form for New Item
  const handleOpenNew = (type: ContentType = 'story') => {
    setEditingItem(null);
    setFormData({
      type,
      title: '',
      subtitle: '',
      category: CATEGORY_SUGGESTIONS[type][0] || 'Sicurezza sul Lavoro',
      summary: '',
      content: '',
      authorName: 'Ing. Enrico Marchesin',
      authorRole: type === 'story' ? 'Direttore Tecnico' : 'Formatore Qualificato OPN',
      readTime: '4 min lettura',
      badge: type === 'story' ? 'Caso Certificato' : type === 'article' ? 'Normativa 2026' : 'Aggiornamento',
      imageUrl: type === 'article' ? PRESET_IMAGES[4].url : PRESET_IMAGES[0].url,
      featuredOnHome: true,
      tagsString: type === 'article' ? 'D.Lgs 81/08, Normativa, Preposti' : type === 'blog' ? 'Sicurezza, Innovazione, Cantieri' : 'ISO 45001, Manifattura',
      clientCompany: '',
      sector: 'Metalmeccanica',
      location: 'Treviso (TV)',
      year: '2025 - 2026',
      metric: '0 Infortuni',
      metricLabel: 'negli ultimi 3 anni',
      challenge: '',
      solution: '',
      results: '',
      quote: '',
    });
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleOpenEdit = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      ...item,
      tagsString: item.tags?.join(', ') || '',
    });
    setIsFormOpen(true);
  };

  // Duplicate Item
  const handleDuplicate = (item: ContentItem) => {
    const duplicatedTitle = `${item.title} (Copia)`;
    addContentItem({
      ...item,
      title: duplicatedTitle,
      featuredOnHome: false,
    });
    showNotification(`Copia creata per "${duplicatedTitle}".`);
  };

  // Submit Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      alert('Inserisci il Titolo del contenuto.');
      return;
    }

    if (formData.type === 'story' && !formData.clientCompany?.trim()) {
      alert('Per una Storia di Successo è richiesta l\'Azienda Cliente.');
      return;
    }

    const tags = formData.tagsString
      ? formData.tagsString.split(',').map((t) => t.trim()).filter(Boolean)
      : formData.tags || [];

    const itemPayload: Omit<ContentItem, 'id' | 'publishedAt'> = {
      type: formData.type || 'story',
      title: formData.title.trim(),
      subtitle: formData.subtitle?.trim() || '',
      category: formData.category?.trim() || (formData.type === 'story' ? formData.sector || 'Sicurezza' : 'Normativa'),
      summary: formData.summary?.trim() || '',
      content: formData.content?.trim() || (formData.summary?.trim() || ''),
      authorName: formData.authorName?.trim() || 'E.M. Safety Team',
      authorRole: formData.authorRole?.trim() || 'Consulente Sicurezza',
      readTime: formData.readTime?.trim() || '4 min lettura',
      badge: formData.badge?.trim() || '',
      imageUrl: formData.imageUrl?.trim() || PRESET_IMAGES[0].url,
      featuredOnHome: formData.featuredOnHome !== false,
      tags,
      // Story fields
      clientCompany: formData.clientCompany?.trim() || '',
      sector: formData.sector?.trim() || formData.category?.trim() || '',
      location: formData.location?.trim() || 'Treviso (TV)',
      year: formData.year?.trim() || '2025 - 2026',
      metric: formData.metric?.trim() || '',
      metricLabel: formData.metricLabel?.trim() || '',
      challenge: formData.challenge?.trim() || '',
      solution: formData.solution?.trim() || '',
      results: formData.results?.trim() || '',
      quote: formData.quote?.trim() || '',
    };

    const typeLabel =
      formData.type === 'article'
        ? 'Articolo Tecnico'
        : formData.type === 'blog'
        ? 'Post del Blog'
        : 'Storia di Successo';

    if (editingItem) {
      updateContentItem({
        ...editingItem,
        ...itemPayload,
      });
      showNotification(`${typeLabel} "${formData.title}" aggiornato con successo!`);
    } else {
      addContentItem(itemPayload);
      showNotification(`Nuovo ${typeLabel} "${formData.title}" pubblicato sul portale!`);
    }

    setIsFormOpen(false);
    setEditingItem(null);
  };

  // Filtered list
  const filteredItems = contentItems.filter((item) => {
    // Type filter
    if (selectedTypeFilter !== 'all' && item.type !== selectedTypeFilter) return false;

    // Featured filter
    if (featuredFilter === 'featured' && !item.featuredOnHome) return false;
    if (featuredFilter === 'hidden' && item.featuredOnHome) return false;

    // Category filter
    if (categoryFilter !== 'all' && item.category !== categoryFilter && item.sector !== categoryFilter) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchSub = item.subtitle?.toLowerCase().includes(q);
      const matchSum = item.summary?.toLowerCase().includes(q);
      const matchAuthor = item.authorName?.toLowerCase().includes(q);
      const matchCompany = item.clientCompany?.toLowerCase().includes(q);
      const matchCat = item.category?.toLowerCase().includes(q);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));

      if (!matchTitle && !matchSub && !matchSum && !matchAuthor && !matchCompany && !matchCat && !matchTags) {
        return false;
      }
    }

    return true;
  });

  // Unique categories for filter dropdown
  const allCategories = Array.from(
    new Set(contentItems.map((c) => c.category || c.sector).filter(Boolean))
  ) as string[];

  return (
    <div className="space-y-6">
      {/* 1. TOP STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setSelectedTypeFilter('all')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedTypeFilter === 'all'
              ? 'bg-blue-50/80 border-[#0A66C2] ring-2 ring-blue-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tutti i Contenuti</span>
            <Layers className="w-4 h-4 text-[#0A66C2]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0B192C]">{contentItems.length}</div>
          <span className="text-[10px] text-slate-500 font-medium">
            {contentItems.filter((c) => c.featuredOnHome).length} in Home Page
          </span>
        </div>

        <div
          onClick={() => setSelectedTypeFilter('story')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedTypeFilter === 'story'
              ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Storie & Casi</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0B192C]">{stories.length}</div>
          <span className="text-[10px] text-amber-700 font-semibold">Casi studio certificati</span>
        </div>

        <div
          onClick={() => setSelectedTypeFilter('article')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedTypeFilter === 'article'
              ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-indigo-700 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Articoli Tecnici</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0B192C]">{articles.length}</div>
          <span className="text-[10px] text-indigo-700 font-semibold">Guide & D.Lgs. 81/08</span>
        </div>

        <div
          onClick={() => setSelectedTypeFilter('blog')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedTypeFilter === 'blog'
              ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Post del Blog</span>
            <Newspaper className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0B192C]">{blogs.length}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">News & Dal Campo</span>
        </div>
      </div>

      {/* 2. TAB HEADER & CREATION BUTTONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#0B192C]">
              Gestione Contenuti: Storie, Blog & Articoli
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0A66C2]/10 text-[#0A66C2]">
              {filteredItems.length} visibili
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pubblica casi studio, approfondimenti normativi D.Lgs. 81/08 e post del blog con sincronizzazione istantanea sul sito.
          </p>
        </div>

        {/* Quick Add Buttons Group */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleOpenNew('story')}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>+ Storia</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenNew('article')}
            className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>+ Articolo</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenNew('blog')}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
            <span>+ Blog Post</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenNew('story')}
            className="px-3.5 py-1.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nuovo Contenuto</span>
          </button>
        </div>
      </div>

      {/* 3. SEARCH, TYPE TABS & ADVANCED FILTERS */}
      <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-slate-200">
        {/* Type pills bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedTypeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedTypeFilter === 'all'
                ? 'bg-[#0B192C] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tutti ({contentItems.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedTypeFilter('story')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedTypeFilter === 'story'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Storie & Casi ({stories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTypeFilter('article')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedTypeFilter === 'article'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articoli Tecnici ({articles.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTypeFilter('blog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedTypeFilter === 'blog'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Post Blog ({blogs.length})</span>
          </button>
        </div>

        {/* Search and Dropdown filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca per titolo, cliente, parole chiave, autore o norma..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white text-slate-700"
            >
              <option value="all">Tutte le Categorie ({allCategories.length})</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white text-slate-700"
            >
              <option value="all">Tutti gli stati di visibilità</option>
              <option value="featured">Solo In Primo Piano (Home)</option>
              <option value="hidden">Solo Nascosti dalla Home</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. CONTENT CARDS GRID */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">Nessun contenuto corrispondente</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Non è stato trovato alcun articolo, storia o blog post con i filtri applicati. Modifica i parametri di ricerca o pubblica un nuovo contenuto.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedTypeFilter('all');
                setCategoryFilter('all');
                setFeaturedFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
            >
              Azzera Filtri
            </button>
            <button
              type="button"
              onClick={() => handleOpenNew('story')}
              className="px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-xs font-bold"
            >
              + Aggiungi Contenuto
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isStory = item.type === 'story';
            const isArticle = item.type === 'article';
            const isBlog = item.type === 'blog';

            const typeColor = isStory
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : isArticle
              ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
              : 'bg-emerald-100 text-emerald-800 border-emerald-200';

            const typeLabel = isStory ? 'Storia / Caso' : isArticle ? 'Articolo Tecnico' : 'Blog Post';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between ${
                  item.featuredOnHome
                    ? 'border-blue-200 ring-1 ring-blue-100'
                    : 'border-slate-200 opacity-95'
                }`}
              >
                <div>
                  {/* Top Header: Badge, Type, Date & Quick Actions */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${typeColor}`}>
                        {typeLabel}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {item.category || item.sector}
                      </span>
                      {item.publishedAt && (
                        <span className="text-[10px] text-slate-400">
                          • {item.publishedAt}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Live Preview Button */}
                      <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                        title="Anteprima rapida contenuto"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-700" />
                      </button>

                      {/* Instant Home Toggle */}
                      <button
                        type="button"
                        onClick={() => {
                          toggleContentFeatured(item.id);
                          showNotification(
                            item.featuredOnHome
                              ? `"${item.title}" rimosso dalla Home Page.`
                              : `"${item.title}" ora in primo piano sulla Home Page!`
                          );
                        }}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                          item.featuredOnHome
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        title="Mostra / Nascondi dalla Home Page"
                      >
                        {item.featuredOnHome ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>In Home</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            <span>Nascosto</span>
                          </>
                        )}
                      </button>

                      {/* Duplicate */}
                      <button
                        type="button"
                        onClick={() => handleDuplicate(item)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        title="Duplica questo contenuto"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors cursor-pointer"
                        title="Modifica contenuto"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Sei sicuro di voler eliminare "${item.title}"?`)) {
                            deleteContentItem(item.id);
                            showNotification('Contenuto eliminato.');
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                        title="Elimina contenuto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Story Specific: Client Company Banner */}
                  {isStory && item.clientCompany && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] mb-1">
                      <Building2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{item.clientCompany}</span>
                      {item.location && <span className="text-slate-400 font-normal">({item.location})</span>}
                      {item.badge && (
                        <span className="text-[10px] font-semibold bg-blue-50 text-[#0A66C2] px-2 py-0.5 rounded-md border border-blue-100 ml-auto">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-bold text-[#0B192C] leading-snug mb-1">
                    {item.title}
                  </h4>

                  {/* Subtitle */}
                  {item.subtitle && (
                    <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-2">
                      {item.subtitle}
                    </p>
                  )}

                  {/* Story Metric Box */}
                  {isStory && item.metric && (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 mb-3 flex items-center justify-between">
                      <div>
                        <span className="text-base font-extrabold text-[#0B192C]">
                          {item.metric}
                        </span>
                        <span className="text-[11px] text-slate-600 block">
                          {item.metricLabel}
                        </span>
                      </div>
                      <Award className="w-6 h-6 text-amber-500 shrink-0" />
                    </div>
                  )}

                  {/* Summary */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {item.summary}
                  </p>

                  {/* Article/Blog Metadata Row (Read Time, Author, Badge) */}
                  {!isStory && (
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3 flex-wrap">
                      {item.readTime && (
                        <span className="flex items-center gap-1 text-slate-600">
                          <Clock className="w-3 h-3 text-[#0A66C2]" />
                          <span>{item.readTime}</span>
                        </span>
                      )}
                      {item.authorName && (
                        <span className="flex items-center gap-1 text-slate-600">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{item.authorName}</span>
                        </span>
                      )}
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap mb-2">
                      {item.tags.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                        >
                          #{t}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-[10px] text-slate-400">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer: ID and Status */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                  <span className="font-mono">ID: {item.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewItem(item)}
                      className="text-[#0A66C2] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Leggi &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. CREATE / EDIT CONTENT FORM MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#0B192C] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white">
                  {formData.type === 'article' ? (
                    <BookOpen className="w-5 h-5" />
                  ) : formData.type === 'blog' ? (
                    <Newspaper className="w-5 h-5" />
                  ) : (
                    <Award className="w-5 h-5 text-amber-300" />
                  )}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    {editingItem ? `Modifica Contenuto: "${editingItem.title}"` : 'Nuovo Contenuto Editoriale'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Scegli la tipologia e compila i campi. Il contenuto sarà immediatamente pubblicato sul portale.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {/* Type Switcher Selector */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Tipo di Contenuto Editoriale *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        type: 'story',
                        category: prev.category || 'Metalmeccanica & Manifattura',
                        badge: prev.badge || 'Caso Certificato',
                      }));
                    }}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      formData.type === 'story'
                        ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0B192C]">Storia di Successo</div>
                      <div className="text-[11px] text-slate-500">Caso studio reale con cliente, metriche e risultati misurati.</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        type: 'article',
                        category: prev.category || 'D.Lgs. 81/08 & Normativa',
                        badge: prev.badge || 'Normativa 2026',
                        readTime: prev.readTime || '5 min lettura',
                      }));
                    }}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      formData.type === 'article'
                        ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <BookOpen className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0B192C]">Articolo Tecnico / Guida</div>
                      <div className="text-[11px] text-slate-500">Approfondimento normativo (D.Lgs 81/08, INAIL OT23, ISO 45001).</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        type: 'blog',
                        category: prev.category || 'Innovazione & Campo',
                        badge: prev.badge || 'News Aziendale',
                        readTime: prev.readTime || '3 min lettura',
                      }));
                    }}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      formData.type === 'blog'
                        ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Newspaper className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0B192C]">Post del Blog / News</div>
                      <div className="text-[11px] text-slate-500">Notizie dal campo, audit, cantieri e consigli operativi.</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* General Info: Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Titolo Principale *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder={
                      formData.type === 'story'
                        ? 'es. Transizione ISO 45001 e azzeramento infortuni su linee robotizzate'
                        : formData.type === 'article'
                        ? 'es. Nuovo Accordo Stato-Regioni 2026: Guida Operativa per RSPP e Preposti'
                        : 'es. Digitalizzazione dei Registri Antincendio nei presidi di Milano e Treviso'
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sottotitolo / Catenaccio
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Sintesi esplicativa per contestualizzare il tema"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Categoria / Ambito *
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      required
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="es. D.Lgs. 81/08, ISO 45001, Cantieri..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                    />
                    {/* Quick suggestion chips */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-semibold">Suggeriti:</span>
                      {CATEGORY_SUGGESTIONS[formData.type || 'story'].map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: sug })}
                          className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded cursor-pointer transition-colors"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Specific Section */}
              {formData.type === 'story' && (
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Dettagli Specifici della Storia Aziendale</span>
                  </div>

                  {/* Client, Sector, Location, Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Azienda Cliente *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientCompany || ''}
                        onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                        placeholder="es. Meccanica Veneta S.p.A."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Settore Produttivo
                      </label>
                      <input
                        type="text"
                        value={formData.sector || ''}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        placeholder="es. Metalmeccanica & Automazione"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Sede / Territorio
                      </label>
                      <input
                        type="text"
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="es. Treviso (TV) o Milano"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Anno / Periodo
                      </label>
                      <input
                        type="text"
                        value={formData.year || ''}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="es. 2024 - 2026"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Metric Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Metrica Principale in Evidenza
                      </label>
                      <input
                        type="text"
                        value={formData.metric || ''}
                        onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                        placeholder="es. 0 Infortuni oppure -28% Premio INAIL"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-[#0A66C2]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Didascalia Metrica
                      </label>
                      <input
                        type="text"
                        value={formData.metricLabel || ''}
                        onChange={(e) => setFormData({ ...formData, metricLabel: e.target.value })}
                        placeholder="es. negli ultimi 3 anni consecutivi su 240 addetti"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Trittico: Sfida, Soluzione, Risultati */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-rose-800 mb-1">
                        La Sfida / Criticità Iniziale
                      </label>
                      <textarea
                        rows={3}
                        value={formData.challenge || ''}
                        onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                        placeholder="Quali rischi, sanzioni o problemi affrontava il cliente?"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A66C2] mb-1">
                        L'Intervento E.M. Safety
                      </label>
                      <textarea
                        rows={3}
                        value={formData.solution || ''}
                        onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                        placeholder="Quali audit, nomine RSPP o perizie abbiamo condotto?"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-800 mb-1">
                        I Risultati Misurabili
                      </label>
                      <textarea
                        rows={3}
                        value={formData.results || ''}
                        onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                        placeholder="Quali risultati concreti e sgravi sono stati raggiunti?"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Citazione Testimonianza */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Citazione Testimonianza del Referente Aziendale
                    </label>
                    <input
                      type="text"
                      value={formData.quote || ''}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      placeholder='es. "Con E.M. Safety abbiamo smesso di subire la sicurezza come una tassa burocratica."'
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium italic"
                    />
                  </div>
                </div>
              )}

              {/* Summary / Teaser (common to all) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estratto / Sintesi (visibile nella card di anteprima) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary || ''}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Scrivi un breve sommario di 2-3 frasi per attirare l'attenzione del lettore..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              {/* FULL CONTENT EDITOR (Crucial for Articles, Blogs & Detailed Stories) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Testo Completo del Contenuto (Articolo / Corpo Blog / Dettagli) *
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Supporta intestazioni (### Titolo), elenchi (- punto) e paragrafi
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={`Scrivi qui il corpo completo dell'articolo o approfondimento...\n\n### 1. Il contesto normativo\nDescrizione analitica della normativa...\n\n### 2. Implicazioni operative per i Datori di Lavoro\nPunti chiave da verificare:\n- Verifica scadenze attestati\n- Aggiornamento periodico del DVR`}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono leading-relaxed"
                />
              </div>

              {/* Author, ReadTime & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Autore del Contenuto
                  </label>
                  <input
                    type="text"
                    value={formData.authorName || ''}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    placeholder="es. Ing. Enrico Marchesin"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ruolo / Titolo Autore
                  </label>
                  <input
                    type="text"
                    value={formData.authorRole || ''}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    placeholder="es. Formatore Qualificato OPN / RSPP"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tempo di Lettura Stimato
                  </label>
                  <input
                    type="text"
                    value={formData.readTime || ''}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="es. 5 min lettura"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Badge & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Badge Distintivo
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="es. Normativa 2026 oppure Caso Certificato"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tags / Parole Chiave (separate da virgola)
                  </label>
                  <input
                    type="text"
                    value={formData.tagsString || ''}
                    onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                    placeholder="es. D.Lgs 81/08, Preposti, ISO 45001, Formazione"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Cover Image & Presets */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                <label className="block text-xs font-bold text-slate-700">
                  Immagine di Copertina (URL Unsplash o CDN)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-300 shrink-0"
                    />
                  )}
                </div>

                {/* Preset image buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-500 font-semibold">Preset rapidi:</span>
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                      className="text-[10px] bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured On Home Toggle */}
              <div className="flex items-center justify-between bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                <div>
                  <div className="text-xs font-bold text-[#0B192C]">
                    Metti in Primo Piano sulla Home Page
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Se attivo, questo contenuto sarà visualizzato nella sezione dedicata ai casi, articoli e blog della Home Page.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featuredOnHome !== false}
                  onChange={(e) => setFormData({ ...formData, featuredOnHome: e.target.checked })}
                  className="w-5 h-5 rounded text-[#0A66C2] focus:ring-[#0A66C2] cursor-pointer"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingItem ? 'Aggiorna Contenuto' : 'Pubblica Contenuto sul Portale'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. LIVE PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Cover image banner */}
            {previewItem.imageUrl && (
              <div className="h-48 sm:h-64 relative overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={previewItem.imageUrl}
                  alt={previewItem.title}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
                      {previewItem.type === 'story'
                        ? 'Storia di Successo'
                        : previewItem.type === 'article'
                        ? 'Articolo Tecnico'
                        : 'Post del Blog'}
                    </span>
                    <span className="text-xs text-white/80 font-medium">
                      {previewItem.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold leading-tight drop-shadow-xs">
                    {previewItem.title}
                  </h3>
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-5 flex-1">
              {/* Meta bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{previewItem.authorName}</span>
                  {previewItem.authorRole && (
                    <span className="text-slate-400">({previewItem.authorRole})</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {previewItem.publishedAt && <span>{previewItem.publishedAt}</span>}
                  {previewItem.readTime && <span>• {previewItem.readTime}</span>}
                </div>
              </div>

              {/* Subtitle */}
              {previewItem.subtitle && (
                <p className="text-sm font-semibold text-slate-700 italic">
                  {previewItem.subtitle}
                </p>
              )}

              {/* Story Specific Metric Block */}
              {previewItem.type === 'story' && previewItem.metric && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-[#0B192C]">
                      {previewItem.metric}
                    </span>
                    <span className="text-xs text-slate-600 block">
                      {previewItem.metricLabel}
                    </span>
                  </div>
                  <Award className="w-8 h-8 text-amber-500" />
                </div>
              )}

              {/* Formatted Content Paragraphs */}
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                {(previewItem.content || previewItem.summary)
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

              {/* Story Quote if present */}
              {previewItem.quote && (
                <blockquote className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs sm:text-sm italic text-slate-800">
                  "{previewItem.quote}"
                  {previewItem.authorName && (
                    <span className="block font-bold text-xs not-italic text-slate-900 mt-1">
                      — {previewItem.authorName}
                    </span>
                  )}
                </blockquote>
              )}

              {/* Tags */}
              {previewItem.tags && previewItem.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {previewItem.tags.map((tag, idx) => (
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

            {/* Preview Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-400">
                Anteprima fedele della visualizzazione per gli utenti del sito
              </span>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Chiudi Anteprima
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

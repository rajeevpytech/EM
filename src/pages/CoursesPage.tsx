import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  Users,
  Layers,
  FileText,
  KeyRound,
} from 'lucide-react';
import { useAdminStore } from '../utils/adminStore';
import { Course } from '../types';

interface CoursesPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
  onOpenQuote: (courseTitle?: string) => void;
  onOpenAdmin?: () => void;
  onSelectCourse?: (course: Course) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenQuote,
  onOpenAdmin,
  onSelectCourse,
}) => {
  const { courses } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);

  // Extract categories dynamically
  const categories = ['all', '81/08', 'Antincendio', 'Primo Soccorso', 'Attrezzature', 'RSPP/RLS', 'Sistemi ISO'];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        searchQuery === '' ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.target && c.target.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === 'all' ||
        c.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === '81/08' && (c.category.includes('81') || c.category.includes('Lavoratori')));

      const matchMode =
        selectedMode === 'all' ||
        c.mode.toLowerCase().includes(selectedMode.toLowerCase());

      return matchSearch && matchCategory && matchMode;
    });
  }, [courses, searchQuery, selectedCategory, selectedMode]);

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#1c2923] pt-6 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#0A66C2] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0B192C]">Catalogo Corsi di Formazione</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white py-16 sm:py-20 border-b border-[#1E3E62]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-[#70B5F9]/40 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <BookOpen className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Centro di Formazione Accreditato D.Lgs. 81/08</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Formazione Obbligatoria & Specialistica per la Sicurezza
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-ui">
              Corsi a norma di legge con attestati validi su tutto il territorio nazionale. In aula a Treviso e Milano, in videoconferenza sincrona o direttamente presso la sede della tua azienda.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => onOpenQuote('Richiesta Catalogo Corsi Aziendali')}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Richiedi Piano Formativo Aziendale</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="px-4 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#152B44] hover:bg-[#1E3E62] text-slate-200 border border-slate-700 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-orange-400" />
                  <span>Gestisci Corsi (Admin)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca corso per titolo, codice (es. DL-GEN-01) o mansione..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mode Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Modalità:
              </span>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:border-[#0A66C2]"
              >
                <option value="all">Tutte le Modalità</option>
                <option value="Aula">Aula (Treviso/Milano)</option>
                <option value="E-learning">E-learning FAD</option>
                <option value="Videoconferenza">Videoconferenza Sincrona</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 shrink-0">
              Categoria:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Tutti i Corsi' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mt-6 mb-4 text-xs font-semibold text-slate-600">
          <span>
            Visualizzati <strong className="text-slate-900">{filteredCourses.length}</strong> corsi disponibili
          </span>
          {(searchQuery || selectedCategory !== 'all' || selectedMode !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedMode('all');
              }}
              className="text-[#0A66C2] hover:underline font-bold"
            >
              Azzera filtri
            </button>
          )}
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-[#0A66C2]/40"
            >
              {/* Card Top */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0A66C2] text-[11px] font-mono font-bold tracking-wider">
                    {course.code}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B192C] group-hover:text-[#0A66C2] transition-colors leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans-ui">
                  {course.description || `Corso di formazione e addestramento professionale a norma di legge.`}
                </p>

                {/* Key metadata grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.hours} ore</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Validità {course.validityYears || 5} anni</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{course.location || 'Treviso / Sede'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{course.nextDate || 'In programmazione'}</span>
                  </div>
                </div>

                {course.target && (
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
                    <strong>Destinatari:</strong> {course.target}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-4 sm:p-5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Quota</span>
                  <span className="text-sm font-bold text-[#0B192C]">
                    {course.price || 'Su richiesta'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCourse) {
                      onSelectCourse(course);
                    } else {
                      onOpenQuote(`Iscrizione / Info Corso: [${course.code}] ${course.title}`);
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Iscriviti / Info</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <p className="text-base text-slate-600 font-semibold">
              Nessun corso corrisponde ai criteri di ricerca.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedMode('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0A66C2] text-white cursor-pointer"
            >
              Reimposta filtri
            </button>
          </div>
        )}
      </section>

      {/* Corporate Customized Training Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-12 border border-[#1E3E62] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
              <Award className="w-3.5 h-3.5" />
              <span>Formazione Finanziata al 100%</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Corsi Aziendali Dedicati Presso la Tua Sede
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans-ui">
              Organizziamo corsi su misura con orari flessibili e prove pratiche direttamente nei tuoi stabilimenti, finanziabili a costo zero tramite Fondi Paritetici Interprofessionali (Fondimpresa, For.Te., Fon.Coop).
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuote('Richiesta Corso Dedicato in Azienda')}
            className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition-colors cursor-pointer shrink-0"
          >
            Richiedi Corso in Azienda
          </button>
        </div>
      </section>
    </div>
  );
};

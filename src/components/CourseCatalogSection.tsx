import React, { useState } from 'react';
import { Search, Clock, MapPin, Award, ArrowRight, Filter, CheckCircle2 } from 'lucide-react';
import { useAdminStore } from '../utils/adminStore';
import { Course } from '../types';

interface CourseCatalogSectionProps {
  onSelectCourse: (course: Course) => void;
  onRequestCorporateCourse: () => void;
}

export const CourseCatalogSection: React.FC<CourseCatalogSectionProps> = ({
  onSelectCourse,
  onRequestCorporateCourse,
}) => {
  const { courses } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tutti i corsi' },
    { id: 'rspp-rls', label: 'RSPP & RLS' },
    { id: 'antincendio', label: 'Antincendio' },
    { id: 'primo-soccorso', label: 'Primo Soccorso' },
    { id: 'attrezzature', label: 'Carrelli & PLE' },
    { id: '81/08', label: 'Lavoratori 81/08' },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.target.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="catalogo-corsi" className="py-20 bg-[#0B192C] text-white border-t border-[#1E3E62]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mb-8">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#70B5F9]">
            CATALOGO FORMAZIONE ACCREDITATA
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
            Trova il corso giusto per te e per il tuo team
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Corsi conformi al D.Lgs 81/08 e anticipatori del Nuovo Accordo Stato-Regioni 2026. 
            Disponibili in aula a Treviso e Milano, oppure direttamente presso la sede aziendale.
          </p>
        </div>

        {/* Search Bar matching standard corporate website */}
        <div className="max-w-3xl mb-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#081220] p-2.5 rounded-2xl border border-[#1E3E62] shadow-inner"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-[#70B5F9] ml-3 shrink-0 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cerca corso o mansione (es. primo soccorso, antincendio, RSPP, PLE, carrelli)..."
                className="w-full bg-transparent border-0 pl-3 pr-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <Search className="w-4 h-4 text-white" />
              <span>Cerca corsi</span>
            </button>
          </form>

          {/* Quick Categories Filter */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0A66C2] text-white shadow-sm'
                    : 'bg-[#152B44] text-slate-300 hover:bg-[#1E3E62] hover:text-white border border-slate-700/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="bg-[#112338] rounded-xl p-5 border border-[#1E3E62] hover:border-[#0A66C2] transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                  <span className="px-2.5 py-0.5 rounded bg-[#0B192C] text-[#70B5F9] font-bold border border-[#1E3E62]">
                    {course.code}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#70B5F9]" />
                    <span>{course.hours} ore</span>
                  </span>
                </div>

                <h3 className="font-serif-display text-lg font-bold text-white group-hover:text-[#70B5F9] transition-colors leading-snug line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#70B5F9] shrink-0" />
                    <span>{course.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#70B5F9] shrink-0" />
                    <span>Validità: {course.validityYears} anni</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#1E3E62] flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Prossima data: <strong className="text-white">{course.nextDate.split(' ')[0]} {course.nextDate.split(' ')[1]}</strong>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#70B5F9] group-hover:text-white transition-colors">
                  <span>Dettagli</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback if no search results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-[#112338] rounded-xl border border-[#1E3E62] space-y-3">
            <p className="text-sm text-slate-300">
              Nessun corso trovato per "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="text-xs font-bold text-[#70B5F9] underline hover:text-white"
            >
              Reimposta tutti i filtri
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import { useAdminStore } from '../utils/adminStore';
import { CalendarEvent } from '../types';

interface CalendarSectionProps {
  onContactClick: () => void;
  onBookSeat: (event: CalendarEvent) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  onContactClick,
  onBookSeat,
}) => {
  const { calendarEvents } = useAdminStore();
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const filteredEvents = calendarEvents.filter((e) => {
    if (selectedLocation === 'all') return true;
    if (selectedLocation === 'treviso') return e.location.includes('Treviso');
    if (selectedLocation === 'milano') return e.location.includes('Milano');
    if (selectedLocation === 'streaming') return e.location.includes('Streaming');
    return true;
  });

  return (
    <section id="calendario" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              CALENDARIO SESSIONI 2026
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight mt-1">
              Prossime edizioni in partenza
            </h2>
          </div>

          <button
            onClick={() => setShowFullSchedule(!showFullSchedule)}
            className="self-start sm:self-auto text-xs font-bold text-[#0B192C] hover:text-[#0A66C2] flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-blue-50 border border-slate-200 transition-colors cursor-pointer"
          >
            <span>{showFullSchedule ? 'Comprimi elenco' : 'Calendario completo'}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showFullSchedule ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Notice Card Banner matching dark blue / LinkedIn blue corporate theme */}
        <div className="bg-[#0B192C] rounded-2xl p-5 sm:p-6 border border-[#1E3E62] flex flex-col md:flex-row items-center justify-between gap-4 mb-8 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#70B5F9] uppercase tracking-wider">Aule & FAD attive</span>
            <p className="text-sm sm:text-base text-white font-medium">
              Hai esigenze specifiche o vuoi pianificare le edizioni per i tuoi dipendenti direttamente in azienda?
            </p>
          </div>
          <button
            onClick={onContactClick}
            className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors shrink-0 shadow-sm cursor-pointer whitespace-nowrap"
          >
            Richiedi disponibilità
          </button>
        </div>

        {/* Location selector filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-500 font-semibold mr-1">Filtra per sede:</span>
          {[
            { id: 'all', label: 'Tutte le sedi' },
            { id: 'treviso', label: 'Treviso' },
            { id: 'milano', label: 'Milano' },
            { id: 'streaming', label: 'Streaming FAD' },
          ].map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-colors cursor-pointer ${
                selectedLocation === loc.id
                  ? 'bg-[#0B192C] text-white border-[#0B192C]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Upcoming Courses Table / List */}
        <div className="space-y-3">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white hover:bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:border-[#0A66C2]/40"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 text-[#0A66C2] shrink-0 shadow-xs">
                  <CalendarIcon className="w-5 h-5 text-[#0A66C2] mb-0.5" />
                  <span className="text-[10px] uppercase font-extrabold text-[#0B192C]">2026</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-[#1E3E62] border border-blue-200">
                      {evt.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        evt.status === 'Ultime disponibilità'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {evt.status} ({evt.seatsAvailable} posti liberi)
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-[#0B192C]">
                    {evt.courseTitle}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-slate-900">{evt.startDate}</span>
                      <span className="text-slate-400">({evt.startTime})</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span>{evt.location}</span>
                    </span>
                    <span>Durata: {evt.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                <button
                  onClick={() => onBookSeat(evt)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-[#0A66C2] transition-colors shadow-sm cursor-pointer"
                >
                  Iscrizione rapida
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

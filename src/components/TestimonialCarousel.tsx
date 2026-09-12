import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  sector: string;
  rating: number;
  highlightMetric: string;
  metricLabel: string;
  year: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    quote:
      'Grazie al supporto del team E.M Safety abbiamo riorganizzato l’intero Documento di Valutazione dei Rischi e digitalizzato le scadenze formative. Nell’ultimo audit ispettivo non è stata riscontrata alcuna non conformità. Professionalità impeccabile sul campo.',
    author: 'Ing. Marco Vianello',
    role: 'HSE & Plant Safety Manager',
    company: 'Meccanica Veneta S.p.A.',
    location: 'Treviso / Vicenza',
    sector: 'Manifatturiero & Metalmeccanica',
    rating: 5,
    highlightMetric: 'Zero Rilievi',
    metricLabel: 'Audit Ispettivo Superato al 100%',
    year: 'Cliente dal 2018',
  },
  {
    id: '2',
    quote:
      'La docenza sui corsi carrellisti e spazi confinati è stata straordinaria: niente lezioni noiose o teoria fine a se stessa, ma addestramento concreto con scenari reali. I nostri operatori hanno aumentato l’attenzione e i micro-infortuni sono calati drasticamente.',
    author: 'Dott.ssa Elena Moretti',
    role: 'Responsabile Risorse Umane & Formazione',
    company: 'Logix Intermodal S.r.l.',
    location: 'Verona / Mantova',
    sector: 'Logistica & Hub Distributivi',
    rating: 5,
    highlightMetric: '-68% Infortuni',
    metricLabel: 'Riduzione incidenti in magazzino',
    year: 'Cliente dal 2020',
  },
  {
    id: '3',
    quote:
      'Affidare a E.M Safety l’incarico di RSPP Esterno e la redazione dei PSC per i nostri cantieri complessi a Milano è stata la scelta più strategica degli ultimi anni. Sempre reperibili, autorevoli nel dialogo con la committenza e rigorosi nelle procedure.',
    author: 'Arch. Roberto Zanin',
    role: 'Direttore Tecnico di Cantiere',
    company: 'Costruzioni Generali Z.B.',
    location: 'Milano / Monza',
    sector: 'Edilizia & Grandi Opere',
    rating: 5,
    highlightMetric: '14 Cantieri',
    metricLabel: 'Senza fermi o sanzioni operative',
    year: 'Cliente dal 2016',
  },
  {
    id: '4',
    quote:
      'Il pacchetto integrato di sorveglianza sanitaria con Medico Competente e valutazione del rischio chimico e rumore ci ha liberato da continue scadenze burocratiche. Un unico interlocutore che conosce a fondo la nostra realtà industriale.',
    author: 'Dott. Fabio De Rossi',
    role: 'Amministratore Delegato',
    company: 'AgriFood Pack Italia',
    location: 'Padova',
    sector: 'Agroalimentare & Packaging',
    rating: 5,
    highlightMetric: '99.4% Idoneità',
    metricLabel: 'Protocollo Sanitario Tempestivo',
    year: 'Cliente dal 2021',
  },
];

interface TestimonialCarouselProps {
  testimonials?: TestimonialItem[];
  autoRotateInterval?: number; // milliseconds
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials = DEFAULT_TESTIMONIALS,
  autoRotateInterval = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = testimonials.length;
  const current = testimonials[currentIndex];

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, autoRotateInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, autoRotateInterval]);

  return (
    <section
      id="testimonianze"
      aria-label="Testimonianze Clienti"
      className="py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-t border-slate-200/80 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0A66C2] text-xs font-bold tracking-wide uppercase border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Opinioni Certificate & Feedback</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B192C] tracking-tight leading-tight">
            La Voce di Chi Lavora in <span className="text-[#0A66C2]">Sicurezza con Noi</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Responsabili HSE, Datori di lavoro e Direttori tecnici raccontano i traguardi raggiunti grazie
            al metodo integrato E.M Safety sul territorio nazionale.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="min-h-[360px] sm:min-h-[320px] md:min-h-[290px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 md:p-10 relative"
              >
                {/* Large Background Quote Watermark */}
                <div className="absolute top-6 right-6 text-slate-100 pointer-events-none select-none">
                  <Quote className="w-20 h-20 sm:w-28 sm:h-28 text-slate-100 rotate-180" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Left Column: Testimonial & Rating */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Stars & Category */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(current.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-[#0A66C2] bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {current.sector}
                      </span>
                      <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                        • {current.year}
                      </span>
                    </div>

                    {/* Quote text */}
                    <blockquote className="text-base sm:text-lg md:text-xl text-[#0B192C] font-normal leading-relaxed italic">
                      "{current.quote}"
                    </blockquote>

                    {/* Author Meta */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-100">
                      <div>
                        <h3 className="text-base font-bold text-[#0B192C] flex items-center gap-1.5">
                          <span>{current.author}</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 inline shrink-0" />
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium">
                          {current.role} —{' '}
                          <span className="text-[#0A66C2] font-semibold">{current.company}</span>
                        </p>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Sede: {current.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Metric Callout Card */}
                  <div className="lg:col-span-4 bg-gradient-to-br from-[#0B192C] to-[#1E3E62] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-700 flex flex-col justify-center items-center text-center space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#70B5F9]">
                      Impatto Misurato
                    </span>
                    <p className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                      {current.highlightMetric}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-200 leading-snug">
                      {current.metricLabel}
                    </p>
                    <div className="pt-2 w-full border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-emerald-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Conformità Certificata</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            {/* Indicators / Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Seleziona testimonianza">
              {testimonials.map((item, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Vai alla recensione ${index + 1}: ${item.author}`}
                    onClick={() => goToIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-8 bg-[#0A66C2]'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                );
              })}
            </div>

            {/* Actions: Prev / Next / Pause */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer text-xs flex items-center gap-1.5 shadow-2xs"
                title={isPaused ? 'Riproduci rotazione automatica' : 'Metti in pausa rotazione automatica'}
                aria-label={isPaused ? 'Avvia rotazione automatica' : 'Metti in pausa rotazione'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline text-[11px] font-semibold">Riproduci</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline text-[11px] font-semibold">Pausa</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={goToPrev}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#0B192C] transition-colors cursor-pointer shadow-2xs hover:shadow"
                aria-label="Testimonianza precedente"
                title="Precedente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#0B192C] transition-colors cursor-pointer shadow-2xs hover:shadow"
                aria-label="Prossima testimonianza"
                title="Successiva"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import {
  History,
  ArrowRight,
  ShieldCheck,
  Building,
  Award,
  Sparkles,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useSiteImages } from '../utils/imageStore';

interface OurStorySectionProps {
  onExploreFullStory: () => void;
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({ onExploreFullStory }) => {
  const [siteImages] = useSiteImages();

  const milestones = [
    {
      year: '1994',
      tag: 'LE ORIGINI',
      title: 'Pionieri della Legge 626',
      desc: 'Nascita a Treviso per guidare le prime industrie venete nella rivoluzione europea della sicurezza sul lavoro.',
      icon: Compass,
    },
    {
      year: '2008',
      tag: 'IL TESTO UNICO',
      title: 'D.Lgs 81/08 & Rilievi Strumentali',
      desc: 'Sviluppo del laboratorio di igiene industriale e dei modelli SGI certificati ISO 45001.',
      icon: ShieldCheck,
    },
    {
      year: '2018',
      tag: 'ESPANSIONE',
      title: 'Hub Milano & Formazione ANFOS',
      desc: 'Apertura degli uffici direzionali a Milano e convenzionamento nazionale per la formazione accreditata.',
      icon: Building,
    },
    {
      year: '2026',
      tag: 'OGGI & FUTURO',
      title: 'Ecosistema Cloud & Nuovo Accordo',
      desc: 'Oltre 1.800 imprese affiancate stabilmente, simulatore 2026 e addestramento per 45.000 lavoratori.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="la-nostra-storia" className="py-20 sm:py-28 bg-[#0B192C] text-white relative overflow-hidden">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:32px_32px] opacity-35 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#0A66C2]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#1E3E62]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-[#70B5F9]/30 text-xs font-bold uppercase tracking-wider text-[#70B5F9]">
              <History className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Oltre 30 Anni di Passione & Ingegneria (1994 - 2026)</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              La Nostra Storia: Costruire Sicurezza Che Crea Valore
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Non siamo nati come semplici compilatori di adempimenti burocratici. Dal 1994 trasformiamo la complessa normativa italiana in processi produttivi snelli, proteggendo la vita delle persone e il patrimonio delle aziende.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onExploreFullStory}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-all shadow-lg hover:shadow-blue-600/20 cursor-pointer"
            >
              <span>Esplora la Cronistoria Completa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Milestone Cards Interactive Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#0A66C2]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Year Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-white group-hover:text-[#70B5F9] transition-colors">
                    {m.year}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    {m.tag}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-serif-display text-lg font-bold text-white group-hover:text-white transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans-ui">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-[#70B5F9] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-[#0A66C2]" />
                    <span className="text-[11px] font-semibold">Tappa Storica</span>
                  </div>
                  <span className="text-[11px] font-mono">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Story Picture & Founder Philosophy Showcase */}
        <div className="rounded-3xl bg-gradient-to-r from-[#14263b] via-[#102033] to-[#1E3E62] border border-white/15 p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: The Prominent Story Picture with robust error fallback */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/11 shadow-2xl border border-white/20 group">
                <img
                  src={siteImages.ourStoryImage}
                  alt="La Nostra Storia - E.M. Safety sul campo dal 1994"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to guaranteed working Unsplash image if custom URL fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Historic Badge */}
                <div className="absolute top-3 left-3 bg-[#0B192C]/90 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/20 text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse" />
                  <span>Archivio Tecnico E.M. Safety</span>
                </div>

                {/* Bottom Tag */}
                <div className="absolute bottom-3 inset-x-3 text-white text-xs font-semibold flex items-center justify-between">
                  <span className="text-slate-200">Treviso • Milano • Veneto & Lombardia</span>
                  <span className="text-[#70B5F9] font-mono text-[11px] font-bold">1994 &rarr; 2026</span>
                </div>
              </div>
            </div>

            {/* Right: Founder Quote, Values & Story Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#70B5F9] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#0A66C2]" />
                  <span>La Nostra Filosofia dal 1994 ad Oggi</span>
                </div>
                
                <blockquote className="font-serif-display text-xl sm:text-2xl lg:text-3xl text-white font-medium italic leading-snug">
                  "La sicurezza vera non si misura dal peso dei raccoglitori in archivio, ma dalla serenità con cui un imprenditore apre i cancelli ogni mattina."
                </blockquote>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  Trent'anni fa abbiamo iniziato affiancando le storiche officine meccaniche e le industrie manifatturiere venete. Oggi gestiamo la governance della sicurezza per oltre 450 gruppi industriali e cantieri complessi con piattaforme digitali all'avanguardia.
                </p>
              </div>

              {/* 3 Key Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-black text-[#70B5F9]">30+</span>
                  <span className="text-[11px] text-slate-300 font-medium">Anni sul Campo</span>
                </div>
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-black text-white">1.800+</span>
                  <span className="text-[11px] text-slate-300 font-medium">Aziende Seguite</span>
                </div>
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-black text-emerald-400">100%</span>
                  <span className="text-[11px] text-slate-300 font-medium">Conformità Ispettiva</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreFullStory}
                  className="px-6 py-3 rounded-xl bg-white text-[#0B192C] font-bold text-xs uppercase tracking-wider hover:bg-[#0A66C2] hover:text-white transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Leggi la Cronistoria Animata Completa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

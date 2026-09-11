import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, CheckCircle2, ArrowRight, Shield, Award, FileCheck2, Leaf, Info, Play, Pause, Sparkles } from 'lucide-react';
import { SGI_STANDARDS } from '../data/mockData';
import { useSiteImages } from '../utils/imageStore';

interface RadarSGISectionProps {
  onRunGapAnalysis: (standardId: string) => void;
}

export const RadarSGISection: React.FC<RadarSGISectionProps> = ({ onRunGapAnalysis }) => {
  const [selectedStandard, setSelectedStandard] = useState<'iso-45001' | 'iso-9001' | 'dlgs-81' | 'iso-14001'>('iso-45001');
  const [isMotionActive, setIsMotionActive] = useState<boolean>(true);
  const [siteImages] = useSiteImages();

  const activeData = SGI_STANDARDS[selectedStandard];

  return (
    <section id="radar-sgi" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
              SISTEMA INTEGRATO SSGI
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
              Radar di Conformità & Gestione Integrata SGI
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
              Monitora l'interconnessione dinamica tra sicurezza sul lavoro (D.Lgs 81/08), sistemi ISO 45001, qualità ISO 9001 e ambiente ISO 14001.
            </p>
          </div>

          {/* Top-Right Index Pill */}
          <div className="self-start md:self-auto inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-[#0A66C2] shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                INDICE DI TENUTA GLOBALE
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-[#0B192C]">98.2 / 100</span>
                <span className="text-xs font-bold text-[#0A66C2]">(Ottimale)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Grid: Motion Radar Visual on left, Detail card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: SSGI Motion Image Console */}
          <div className="lg:col-span-6 bg-[#0B192C] rounded-2xl p-6 sm:p-8 border border-[#1E3E62] shadow-xl flex flex-col justify-between relative overflow-hidden text-white">
            
            {/* Background Motion Image with slow breathing scale */}
            <motion.div
              animate={{
                scale: isMotionActive ? [1, 1.06, 1.02] : 1,
                opacity: [0.18, 0.28, 0.18],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <img
                src={siteImages.ssgiMotionImage}
                alt="SSGI Smart Factory Motion Backing"
                className="w-full h-full object-cover filter contrast-125"
              />
            </motion.div>

            {/* Cyan/LinkedIn Blue subtle gradient glow */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#0B192C]/70 to-[#0B192C] pointer-events-none" />

            {/* Top Toolbar: Controls & Live Pulse status */}
            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0A66C2] animate-ping" />
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#70B5F9] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#0A66C2]" />
                  SSGI Live Motion Radar
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsMotionActive(!isMotionActive)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                title={isMotionActive ? 'Metti in pausa animazione' : 'Attiva animazione continua'}
              >
                {isMotionActive ? <Pause className="w-3 h-3 text-[#0A66C2]" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isMotionActive ? 'Motion Attivo' : 'In Pausa'}</span>
              </button>
            </div>

            {/* Central Motion Radar Container */}
            <div className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center my-2">
              
              {/* Animated Radar Sweep Line (Rotating continuous 360-deg beam) */}
              {isMotionActive && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-8 rounded-full pointer-events-none opacity-40 z-0"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(10, 102, 194, 0.5) 360deg)',
                  }}
                />
              )}

              {/* Sonar Expanding Waves */}
              {isMotionActive && (
                <motion.div
                  animate={{ scale: [0.3, 1.3], opacity: [0.6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute w-40 h-40 rounded-full border border-[#0A66C2] pointer-events-none z-0"
                />
              )}

              <svg viewBox="0 0 400 400" className="w-full h-full select-none relative z-10">
                {/* Concentric reference circles */}
                <circle cx="200" cy="200" r="140" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="105" fill="none" stroke="#1e293b" strokeWidth="1.2" />
                <circle cx="200" cy="200" r="70" fill="none" stroke="#1e293b" strokeWidth="1.2" />
                <circle cx="200" cy="200" r="35" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />

                {/* Radar Grid Axes */}
                <line x1="200" y1="50" x2="200" y2="350" stroke="#334155" strokeWidth="1.2" />
                <line x1="50" y1="200" x2="350" y2="200" stroke="#334155" strokeWidth="1.2" />
                <line x1="90" y1="90" x2="310" y2="310" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="90" y1="310" x2="310" y2="90" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

                {/* Animated Compliance Filled Polygon with glowing neon stroke */}
                <polygon
                  points="200,64 294,294 100,300 75,195"
                  fill="rgba(10, 102, 194, 0.22)"
                  stroke="#0A66C2"
                  strokeWidth="2.8"
                  className="transition-all duration-700 filter drop-shadow-[0_0_8px_rgba(10,102,194,0.6)]"
                />

                {/* Central SSGI Monogram Core */}
                <circle cx="200" cy="200" r="30" fill="#0B192C" stroke="#0A66C2" strokeWidth="2" />
                <text
                  x="200"
                  y="204"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  letterSpacing="0.08em"
                >
                  SSGI
                </text>

                {/* Pulsing Vertex Nodes */}
                {/* Node 1: ISO 45001 (Top) */}
                <circle
                  cx="200"
                  cy="64"
                  r={selectedStandard === 'iso-45001' ? '9' : '6'}
                  fill={selectedStandard === 'iso-45001' ? '#0A66C2' : '#38BDF8'}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedStandard('iso-45001')}
                />

                {/* Node 2: ISO 9001 (Left) */}
                <circle
                  cx="75"
                  cy="195"
                  r={selectedStandard === 'iso-9001' ? '9' : '6'}
                  fill={selectedStandard === 'iso-9001' ? '#0A66C2' : '#F59E0B'}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedStandard('iso-9001')}
                />

                {/* Node 3: D.Lgs 81/08 (Bottom-Left) */}
                <circle
                  cx="100"
                  cy="300"
                  r={selectedStandard === 'dlgs-81' ? '9' : '6'}
                  fill={selectedStandard === 'dlgs-81' ? '#0A66C2' : '#10B981'}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedStandard('dlgs-81')}
                />

                {/* Node 4: ISO 14001 (Bottom-Right) */}
                <circle
                  cx="294"
                  cy="294"
                  r={selectedStandard === 'iso-14001' ? '9' : '6'}
                  fill={selectedStandard === 'iso-14001' ? '#0A66C2' : '#34D399'}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedStandard('iso-14001')}
                />
              </svg>

              {/* Floating Interactive Labels around radar */}
              {/* Top: ISO 45001 */}
              <button
                onClick={() => setSelectedStandard('iso-45001')}
                className={`absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl border text-left transition-all cursor-pointer z-20 ${
                  selectedStandard === 'iso-45001'
                    ? 'bg-[#0A66C2] text-white border-white shadow-lg scale-105'
                    : 'bg-[#152B44]/90 backdrop-blur-md text-slate-200 border-white/20 hover:border-[#0A66C2]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-white" />
                  <span className="text-[11px] font-bold">ISO 45001</span>
                  <span className="text-[10px] font-extrabold ml-1 opacity-90">98%</span>
                </div>
              </button>

              {/* Left: ISO 9001 */}
              <button
                onClick={() => setSelectedStandard('iso-9001')}
                className={`absolute top-1/2 left-0 -translate-y-1/2 px-2.5 py-1.5 rounded-xl border text-left transition-all cursor-pointer z-20 ${
                  selectedStandard === 'iso-9001'
                    ? 'bg-[#0A66C2] text-white border-white shadow-lg scale-105'
                    : 'bg-[#152B44]/90 backdrop-blur-md text-slate-200 border-white/20 hover:border-[#0A66C2]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <div>
                    <div className="text-[11px] font-bold leading-tight">ISO 9001</div>
                    <div className="text-[9px] font-semibold opacity-90">96% CONFORME</div>
                  </div>
                </div>
              </button>

              {/* Bottom-Left: D.Lgs 81/08 */}
              <button
                onClick={() => setSelectedStandard('dlgs-81')}
                className={`absolute bottom-0 left-0 px-2.5 py-1.5 rounded-xl border text-left transition-all cursor-pointer z-20 ${
                  selectedStandard === 'dlgs-81'
                    ? 'bg-[#0A66C2] text-white border-white shadow-lg scale-105'
                    : 'bg-[#152B44]/90 backdrop-blur-md text-slate-200 border-white/20 hover:border-[#0A66C2]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                  <div>
                    <div className="text-[10px] font-bold leading-tight">D.Lgs 81/08</div>
                    <div className="text-[9px] font-bold opacity-90">100% CONFORME</div>
                  </div>
                </div>
              </button>

              {/* Bottom-Right: ISO 14001 */}
              <button
                onClick={() => setSelectedStandard('iso-14001')}
                className={`absolute bottom-0 right-0 px-2.5 py-1.5 rounded-xl border text-left transition-all cursor-pointer z-20 ${
                  selectedStandard === 'iso-14001'
                    ? 'bg-[#0A66C2] text-white border-white shadow-lg scale-105'
                    : 'bg-[#152B44]/90 backdrop-blur-md text-slate-200 border-white/20 hover:border-[#0A66C2]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-teal-400" />
                  <div>
                    <div className="text-[11px] font-bold leading-tight">ISO 14001</div>
                    <div className="text-[9px] font-semibold opacity-90">94% CONFORME</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Hint underneath */}
            <div className="relative z-10 pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#70B5F9]" />
                <span>Interazione dinamica: seleziona un vertice per la Gap Analysis</span>
              </span>
              <span className="font-bold text-[#0A66C2]">SSGI Motion Core</span>
            </div>
          </div>

          {/* Right Column: Standard Specification Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#0A66C2] border border-blue-200">
                  {activeData.categoryTag}
                </span>

                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-[#0B192C] border border-slate-300">
                  {activeData.statusTag}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-2xl sm:text-[28px] text-[#0B192C] font-bold leading-snug">
                  {activeData.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeData.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 font-medium">Copertura Audit E.M Safety</span>
                  <span className="text-[#0B192C] font-bold">{activeData.auditCoverage}% / 100%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0A66C2] rounded-full transition-all duration-500"
                    style={{ width: `${activeData.auditCoverage}%` }}
                  />
                </div>
              </div>

              {/* 2x2 Key Points Grid */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold tracking-wider uppercase text-slate-500">
                  PUNTI CHIAVE GARANTITI DAL NOSTRO TEAM:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeData.keyPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
                      <span className="text-xs sm:text-[13px] font-medium text-slate-800">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gap Analysis Action Button */}
            <div className="pt-8">
              <button
                onClick={() => onRunGapAnalysis(activeData.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#0B192C] hover:bg-[#1E3E62] transition-colors shadow-md cursor-pointer border border-[#1E3E62]"
              >
                <span>Esegui Gap Analysis {activeData.code.split('—')[0]}</span>
                <ArrowRight className="w-4 h-4 text-[#70B5F9]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

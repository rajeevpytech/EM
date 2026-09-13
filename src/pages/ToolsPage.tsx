import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  Sparkles,
  Phone,
  FileCheck,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import { SanctionsSimulatorSection } from '../components/SanctionsSimulatorSection';
import { PpeInspectionSection } from '../components/PpeInspectionSection';
import { CostOfNonComplianceSection } from '../components/CostOfNonComplianceSection';
import { RadarSGISection } from '../components/RadarSGISection';

interface ToolsPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
  onOpenQuote: (diagnosticSummary?: string) => void;
  onRunGapAnalysis: (standardId: string) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenQuote,
  onRunGapAnalysis,
}) => {
  const [activeTab, setActiveTab] = useState<'simulatore' | 'dpi' | 'costi' | 'radar'>('simulatore');

  const tools = [
    {
      id: 'simulatore' as const,
      name: 'Simulatore Sanzioni & Sgravi OT23',
      shortName: 'Simulatore Sanzioni',
      badge: 'Aggiornato 2026',
      icon: Calculator,
      description: 'Stima del quadro sanzionatorio penale/amministrativo e calcolo dello sconto tariffario INAIL fino al 28%.',
    },
    {
      id: 'dpi' as const,
      name: 'Ispezione Interattiva DPI & Presidi',
      shortName: 'Check-up DPI & Reparti',
      badge: 'Diagnostica Visiva',
      icon: ShieldCheck,
      description: 'Verifica visiva dei Dispositivi di Protezione Individuale e presidi di emergenza per mansione lavorativa.',
    },
    {
      id: 'costi' as const,
      name: 'Analizzatore Costi Non Conformità',
      shortName: 'Costo Non Conformità',
      badge: 'Analisi Finanziaria',
      icon: Scale,
      description: 'Confronto analitico tra i costi reali di violazioni e infortuni rispetto al canone di tutela continuativa.',
    },
    {
      id: 'radar' as const,
      name: 'Radar di Conformità SGI & Gap Analysis',
      shortName: 'Radar ISO 45001 / SGI',
      badge: 'Norme ISO & 81/08',
      icon: Layers,
      description: 'Valutazione quantitativa del livello di maturità dei sistemi ISO 45001, 9001, 14001 e D.Lgs. 81/08.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Header Hero */}
      <section className="bg-gradient-to-b from-[#0B192C] via-[#0F2848] to-[#0B192C] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1E3E62] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6 text-center md:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-semibold text-emerald-400">
              Centro Strumenti & Diagnostica
            </span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suite Diagnostica Gratuita D.Lgs. 81/08</span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Strumenti di Calcolo, Diagnostica e Gap Analysis
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-sans-ui leading-relaxed">
              Verifica in autonomia lo stato di conformità della tua impresa: quantifica le sanzioni per mancato aggiornamento DVR o formazione, calcola il risparmio INAIL con il modello OT23 e controlla i DPI per mansione.
            </p>
          </div>

          {/* Quick Tool Selector Tabs */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between gap-3 ${
                    isActive
                      ? 'bg-white text-[#0B192C] border-white shadow-lg scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-100 text-[#1B4332]' : 'bg-white/10 text-emerald-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      isActive ? 'bg-emerald-800 text-white' : 'bg-white/20 text-slate-300'
                    }`}>
                      {t.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold leading-snug">
                      {t.name}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${isActive ? 'text-slate-600' : 'text-slate-300'}`}>
                      {t.description}
                    </p>
                  </div>

                  <div className={`text-xs font-bold flex items-center gap-1 mt-1 ${isActive ? 'text-[#1B4332]' : 'text-emerald-400'}`}>
                    <span>{isActive ? 'Strumento Attivo' : 'Seleziona strumento'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Tool Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Render Selected Tool */}
        {activeTab === 'simulatore' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-semibold">
                  Simulatore aggiornato con i coefficienti INAIL OT23 e massimali penali D.Lgs. 81/08.
                </span>
              </div>
              <button
                onClick={() => onOpenQuote('Richiesta Check-up Preliminare dal Simulatore Sanzioni')}
                className="px-3 py-1.5 rounded-lg bg-[#1B4332] text-white font-bold hover:bg-[#143326] transition-colors shrink-0 cursor-pointer text-center"
              >
                Richiedi Consulenza su Misura
              </button>
            </div>
            <SanctionsSimulatorSection
              onOpenConsultancyModal={(diagnosticData) => onOpenQuote(diagnosticData)}
            />
          </div>
        )}

        {activeTab === 'dpi' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="font-semibold">
                  Diagnostica visiva DPI: seleziona le diverse parti del corpo o presidi ambientali per verificare gli obblighi.
                </span>
              </div>
              <button
                onClick={() => onOpenQuote('Richiesta Audit DPI e Valutazione Rischi Mansione')}
                className="px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white font-bold hover:bg-[#004182] transition-colors shrink-0 cursor-pointer text-center"
              >
                Audit DPI in Azienda
              </button>
            </div>
            <PpeInspectionSection />
          </div>
        )}

        {activeTab === 'costi' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">
                  Analisi economica comparativa: quanto costa una mancata conformità rispetto a un canone continuativo di prevenzione.
                </span>
              </div>
              <button
                onClick={() => onOpenQuote('Richiesta Piano di Prevenzione & Tutela Continuativa')}
                className="px-3 py-1.5 rounded-lg bg-amber-700 text-white font-bold hover:bg-amber-800 transition-colors shrink-0 cursor-pointer text-center"
              >
                Calcola Preventivo di Tutela
              </button>
            </div>
            <CostOfNonComplianceSection />
          </div>
        )}

        {activeTab === 'radar' && (
          <div className="space-y-6">
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-cyan-900">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-700 shrink-0" />
                <span className="font-semibold">
                  Radar di Conformità SGI: valuta il posizionamento della tua organizzazione rispetto a ISO 45001, 14001, 9001 e D.Lgs. 81/08.
                </span>
              </div>
              <button
                onClick={() => onRunGapAnalysis('iso-45001')}
                className="px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white font-bold hover:bg-[#004182] transition-colors shrink-0 cursor-pointer text-center"
              >
                Avvia Gap Analysis Guidata
              </button>
            </div>
            <RadarSGISection onRunGapAnalysis={onRunGapAnalysis} />
          </div>
        )}
      </main>

      {/* Bottom Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-10 border border-[#1E3E62] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-white">
              Desideri una perizia asseverata da un Ingegnere della Sicurezza?
            </h3>
            <p className="text-sm text-slate-300 font-sans-ui max-w-xl">
              I nostri tecnici effettuano sopralluoghi operativi gratuiti nelle sedi di Milano, Treviso e in tutto il Nord Italia.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenQuote('Richiesta Sopralluogo Gratuito da Centro Strumenti')}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-colors cursor-pointer"
            >
              Prenota Sopralluogo Gratuito
            </button>
            <button
              onClick={onOpenContact}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/15 hover:bg-white/20 text-white border border-white/25 transition-colors cursor-pointer"
            >
              Parla con un Tecnico
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

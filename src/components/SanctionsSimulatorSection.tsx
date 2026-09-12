import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  AlertTriangle,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  FileText,
  Users,
  CheckSquare,
  Square,
  Scale,
  Sparkles,
  Info,
} from 'lucide-react';

interface SanctionsSimulatorSectionProps {
  onOpenConsultancyModal?: (diagnosticData: string) => void;
}

type EmployeeTier = '1-5' | '6-15' | '16-50' | '50+';
type RiskLevel = 'basso' | 'medio' | 'alto';

interface ComplianceChecks {
  hasUpdatedDvr: boolean;
  hasCertifiedTraining: boolean;
  hasNominatedRspp: boolean;
  hasMedicalSurveillance: boolean;
  hasEmergencyDrills: boolean;
}

export const SanctionsSimulatorSection: React.FC<SanctionsSimulatorSectionProps> = ({
  onOpenConsultancyModal,
}) => {
  const [employees, setEmployees] = useState<EmployeeTier>('6-15');
  const [riskClass, setRiskClass] = useState<RiskLevel>('alto');
  const [checks, setChecks] = useState<ComplianceChecks>({
    hasUpdatedDvr: false,
    hasCertifiedTraining: false,
    hasNominatedRspp: true,
    hasMedicalSurveillance: false,
    hasEmergencyDrills: true,
  });

  const toggleCheck = (key: keyof ComplianceChecks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Structured calculations based on Italian Legislative Decree 81/2008
  const analysis = useMemo(() => {
    const missingCount = Object.values(checks).filter((v) => !v).length;

    // Minimum mandatory training hours per worker
    let baseTrainingHours = 8;
    if (riskClass === 'medio') baseTrainingHours = 12;
    if (riskClass === 'alto') baseTrainingHours = 16;

    // Headcount multiplier
    let headCountAvg = 3;
    let inailRatePercent = 28;
    let avgAnnualInailPremium = 4200;

    if (employees === '6-15') {
      headCountAvg = 10;
      inailRatePercent = 18;
      avgAnnualInailPremium = 14000;
    } else if (employees === '16-50') {
      headCountAvg = 30;
      inailRatePercent = 10;
      avgAnnualInailPremium = 45000;
    } else if (employees === '50+') {
      headCountAvg = 90;
      inailRatePercent = 5;
      avgAnnualInailPremium = 130000;
    }

    const estimatedInailSaving = Math.round(avgAnnualInailPremium * (inailRatePercent / 100));

    // Potential fines evaluation based on missing obligations (Articles 55, 68, 18, 41 D.Lgs 81/08)
    let minFine = 0;
    let maxFine = 0;
    const severeRisks: string[] = [];

    if (!checks.hasUpdatedDvr) {
      minFine += 3000;
      maxFine += 7800; // Art. 55 c. 1 lett. a (arresto da 3 a 6 mesi o ammenda da € 3.071,27 a € 7.862,44)
      severeRisks.push('Omessa redazione DVR (Art. 55: arresto fino a 6 mesi per il Datore di Lavoro)');
    }

    if (!checks.hasCertifiedTraining) {
      minFine += 1500 * Math.min(headCountAvg, 5);
      maxFine += 6400 * Math.min(headCountAvg, 5); // Art. 55 c. 5 lett. c
      severeRisks.push('Omessa formazione lavoratori (Sanzione moltiplicata per il numero di lavoratori non formati)');
    }

    if (!checks.hasNominatedRspp) {
      minFine += 2500;
      maxFine += 6400; // Art. 55 c. 1 lett. b
      severeRisks.push('Mancata nomina RSPP (Sanzione penale e divieto assoluto di autocertificazione)');
    }

    if (!checks.hasMedicalSurveillance) {
      minFine += 2000;
      maxFine += 5000; // Art. 55 c. 5 lett. e
      severeRisks.push('Mancata nomina Medico Competente / omessa sorveglianza sanitaria');
    }

    if (!checks.hasEmergencyDrills) {
      minFine += 1200;
      maxFine += 4800; // Art. 43
      severeRisks.push('Omessa gestione del piano emergenze o mancata prova annuale di evacuazione');
    }

    // Risk Status Index
    let statusIndex = 'OTTIMALE';
    let statusColor = 'text-emerald-400';
    let riskSeverity = 'Basso';

    if (missingCount >= 3) {
      statusIndex = 'CRITICO';
      statusColor = 'text-rose-500';
      riskSeverity = 'Grave Rischio Ispettivo';
    } else if (missingCount >= 1) {
      statusIndex = 'ATTENZIONE';
      statusColor = 'text-amber-400';
      riskSeverity = 'Non Conformità Parziale';
    }

    return {
      missingCount,
      minFine,
      maxFine,
      estimatedInailSaving,
      inailRatePercent,
      baseTrainingHours,
      totalTrainingVolume: baseTrainingHours * headCountAvg,
      severeRisks,
      statusIndex,
      statusColor,
      riskSeverity,
    };
  }, [employees, riskClass, checks]);

  const handleRequestReport = () => {
    const summary = `Diagnosi Simulatore INAIL: Organico ${employees} lav., Rischio ${riskClass.toUpperCase()}, ${
      analysis.missingCount
    } obblighi scoperti. Sanzione stimata: € ${analysis.minFine.toLocaleString(
      'it-IT'
    )} - € ${analysis.maxFine.toLocaleString('it-IT')}. Risparmio INAIL OT23 potenziale: € ${analysis.estimatedInailSaving.toLocaleString(
      'it-IT'
    )}/anno.`;
    if (onOpenConsultancyModal) {
      onOpenConsultancyModal(summary);
    }
  };

  return (
    <section id="simulatore-sanzioni" className="py-16 sm:py-24 bg-[#0B192C] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332] text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Calculator className="w-3.5 h-3.5" />
              <span>Calcolatore Regolamentare D.Lgs. 81/08 & Revisione 2026</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
              Simulatore Obblighi, Sanzioni & Sgravi INAIL
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
              Imposta i parametri della tua azienda per stimare istantaneamente il perimetro degli obblighi di sicurezza, le potenziali sanzioni ispettive e i risparmi contributivi con il Modello INAIL OT23.
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
            <Scale className="w-4 h-4 text-[#E5A93C]" />
            <span>Valori Asseverati Art. 55 e 68 D.Lgs. 81/08</span>
          </div>
        </div>

        {/* 2-Column Grid: Inputs on Left, Real-time Analysis on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Form Controls */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            {/* 1. Headcount Tier */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                1. Dimensione Organico Aziendale
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['1-5', '6-15', '16-50', '50+'] as EmployeeTier[]).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setEmployees(tier)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      employees === tier
                        ? 'bg-[#1B4332] text-white border-emerald-500/50 shadow-sm'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750 hover:text-white'
                    }`}
                  >
                    {tier} Lav.
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Risk Class */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#E5A93C]" />
                2. Classe di Rischio ATECO
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'basso', label: 'Basso', desc: 'Uffici, Studi' },
                    { id: 'medio', label: 'Medio', desc: 'Trasporti, PMI' },
                    { id: 'alto', label: 'Alto', desc: 'Industria, Edilizia' },
                  ] as const
                ).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRiskClass(r.id)}
                    className={`py-2.5 px-3 rounded-xl text-left transition-all cursor-pointer border ${
                      riskClass === r.id
                        ? 'bg-[#1B4332] text-white border-emerald-500/50 shadow-sm'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750 hover:text-white'
                    }`}
                  >
                    <span className="block text-xs font-bold">{r.label}</span>
                    <span className="text-[10px] text-slate-400">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Current Compliance Checks */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                3. Stato Attuale degli Adempimenti (Spunta se presente)
              </label>
              <div className="space-y-2.5">
                {[
                  { key: 'hasUpdatedDvr', label: 'DVR redatto o aggiornato negli ultimi 3 anni' },
                  { key: 'hasCertifiedTraining', label: 'Tutti i lavoratori e preposti in regola con gli attestati' },
                  { key: 'hasNominatedRspp', label: 'Incarico formale RSPP (interno o esterno)' },
                  { key: 'hasMedicalSurveillance', label: 'Nomina Medico Competente e idoneità periodiche' },
                  { key: 'hasEmergencyDrills', label: 'Squadra emergenze formata e prova di evacuazione annuale' },
                ].map((item) => {
                  const checked = checks[item.key as keyof ComplianceChecks];
                  return (
                    <div
                      key={item.key}
                      onClick={() => toggleCheck(item.key as keyof ComplianceChecks)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer select-none"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                        checked ? 'bg-[#1B4332] text-white' : 'border border-slate-500 text-transparent'
                      }`}>
                        <CheckSquare className="w-4 h-4" />
                      </div>
                      <span className={`text-xs sm:text-sm ${checked ? 'text-white font-medium' : 'text-slate-400'}`}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Diagnostic Readout */}
          <div className="lg:col-span-6 bg-slate-900/95 rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    LIVELLO DI ESPOSIZIONE ISPETTIVA
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-2xl font-black ${analysis.statusColor}`}>
                      {analysis.statusIndex}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      ({analysis.riskSeverity})
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    OBBLIGHI MANCANTI
                  </span>
                  <p className="text-xl font-bold text-white">
                    {analysis.missingCount} su 5
                  </p>
                </div>
              </div>

              {/* 2 Big Metric Cards: Sanctions vs INAIL Saving */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Penalties */}
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/50 space-y-1">
                  <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider block">
                    Esposizione Sanzioni (D.Lgs 81/08)
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-rose-400 font-mono">
                    € {analysis.minFine.toLocaleString('it-IT')} – € {analysis.maxFine.toLocaleString('it-IT')}
                  </p>
                  <p className="text-[11px] text-rose-200/70">
                    Sanzioni amministrative ed eventuale responsabilità penale del datore di lavoro.
                  </p>
                </div>

                {/* Sgravio INAIL OT23 */}
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                    Opportunità Sgravio INAIL OT23
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    Fino a € {analysis.estimatedInailSaving.toLocaleString('it-IT')} / anno
                  </p>
                  <p className="text-[11px] text-emerald-200/70">
                    Riduzione del {analysis.inailRatePercent}% del tasso di tariffa INAIL con investimenti in sicurezza.
                  </p>
                </div>
              </div>

              {/* Identified High Priority Risks */}
              {analysis.severeRisks.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    Criticità Prioritarie Rilevate
                  </span>
                  <div className="space-y-1.5 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    {analysis.severeRisks.map((risk, idx) => (
                      <p key={idx} className="text-xs text-rose-300 flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{risk}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Training Volume */}
              <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span>Fabbisogno Formativo Stimato per Organico:</span>
                <span className="font-bold text-white font-mono">
                  {analysis.baseTrainingHours}h / lavoratore (~{analysis.totalTrainingVolume} ore totali)
                </span>
              </div>
            </div>

            {/* Action CTA & Legal Disclaimer */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleRequestReport}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#1B4332] hover:bg-[#143326] transition-all cursor-pointer shadow-md"
              >
                <span>Richiedi Relazione di Conformità Completa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mandatory Legal Disclaimer */}
              <div className="flex items-start gap-2 text-[10px] text-slate-400 leading-relaxed font-sans-ui">
                <Info className="w-3.5 h-3.5 shrink-0 text-slate-500 mt-0.5" />
                <p>
                  <strong>Nota informativa:</strong> I valori calcolati dal presente simulatore hanno finalità puramente orientativa ai sensi degli artt. 55 e 68 D.Lgs. 81/08 e non sostituiscono l’audit sul campo o la consulenza tecnica personalizzata di un professionista abilitato E.M Safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

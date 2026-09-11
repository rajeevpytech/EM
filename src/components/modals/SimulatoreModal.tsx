import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, AlertTriangle, Coins, ArrowRight, Check } from 'lucide-react';

interface SimulatoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (summary: string) => void;
}

export const SimulatoreModal: React.FC<SimulatoreModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [sector, setSector] = useState<'basso' | 'medio' | 'alto'>('medio');
  const [employees, setEmployees] = useState<number>(18);
  const [hasForklifts, setHasForklifts] = useState<boolean>(true);
  const [hasChemicalRisk, setHasChemicalRisk] = useState<boolean>(false);

  if (!isOpen) return null;

  // Calculations based on Italian D.Lgs 81/08 & Accordo Stato-Regioni 2026
  const workerHours = sector === 'basso' ? 8 : sector === 'medio' ? 12 : 16;
  const emergencyAddetti = Math.max(2, Math.ceil(employees / 10));
  const prepostiCount = Math.max(1, Math.ceil(employees / 15));
  const inailDiscount = employees > 10 ? 'fino al 28%' : 'fino al 15%';
  const estimatedSavings = Math.round(employees * 165);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 sm:p-7 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#0A66C2] text-[10px] font-extrabold tracking-wider uppercase text-white">
              <span>AGGIORNATO ACCORDO STATO-REGIONI 2026</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold">
              Simulatore Obblighi D.Lgs 81/08 & Risparmio INAIL
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Calcola in pochi secondi il fabbisogno formativo obbligatorio e lo sgravio sul tasso di premio INAIL (OT23).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Step 1: Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Settore ATECO & Livello di Rischio
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as 'basso' | 'medio' | 'alto')}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2] focus:outline-none"
              >
                <option value="basso">Rischio Basso (Uffici, Servizi, Commercio)</option>
                <option value="medio">Rischio Medio (Agricoltura, Trasporti, Pubblica Amm.)</option>
                <option value="alto">Rischio Alto (Edilizia, Manifattura, Metalmeccanica, Chimico)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Numero di Lavoratori in Forza: <span className="text-[#0A66C2] font-black">{employees}</span>
              </label>
              <input
                type="range"
                min={1}
                max={150}
                value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value))}
                className="w-full accent-[#0A66C2] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 dipendente</span>
                <span>50</span>
                <span>100</span>
                <span>150+</span>
              </div>
            </div>
          </div>

          {/* Equipment checkboxes */}
          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasForklifts}
                onChange={(e) => setHasForklifts(e.target.checked)}
                className="rounded text-[#0A66C2] focus:ring-[#0A66C2] w-4 h-4 accent-[#0A66C2]"
              />
              <span>Uso Carrelli Elevatori / PLE / Gru</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasChemicalRisk}
                onChange={(e) => setHasChemicalRisk(e.target.checked)}
                className="rounded text-[#0A66C2] focus:ring-[#0A66C2] w-4 h-4 accent-[#0A66C2]"
              />
              <span>Rischio Chimico o Rumore &gt; 80 dB(A)</span>
            </label>
          </div>

          {/* Results Summary Box */}
          <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B192C] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0A66C2]" />
              <span>Quadro Obblighi Minimi di Legge (D.Lgs 81/08):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Formazione Lavoratori</span>
                <span className="text-base font-black text-[#0B192C]">{workerHours} ore / lavoratore</span>
                <p className="text-[10px] text-slate-500 mt-0.5">4h generale + {workerHours - 4}h specifica</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Squadra Emergenze</span>
                <span className="text-base font-black text-[#0B192C]">{emergencyAddetti} addetti</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Antincendio + Primo Soccorso</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Preposti alla Sicurezza</span>
                <span className="text-base font-black text-[#0B192C]">{prepostiCount} incaricati</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Corso 8h + agg. biennale 6h</p>
              </div>
            </div>

            {/* INAIL Saving Highlight */}
            <div className="bg-[#0B192C] text-white rounded-xl p-4 flex items-center justify-between border border-[#1E3E62]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#152B44] border border-[#1E3E62] flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5 text-[#0A66C2]" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-300">
                    Opportunità Sgravio INAIL OT23:
                  </span>
                  <span className="text-sm font-bold text-white">
                    Riduzione del tasso di premio {inailDiscount} (Stima: ~€{estimatedSavings}/anno)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Valutazione preventiva non vincolante conforme alle linee guida E.M Safety.
          </span>
          <button
            onClick={() => {
              onSelectPlan(`Simulazione ${sector.toUpperCase()} per ${employees} dipendenti (Sgravio OT23 ${inailDiscount})`);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors shadow-md cursor-pointer"
          >
            <span>Richiedi Piano Operativo & Preventivo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

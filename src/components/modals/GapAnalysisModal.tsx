import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight, BarChart3, HelpCircle } from 'lucide-react';
import { SGI_STANDARDS } from '../../data/mockData';

interface GapAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  standardId: string;
  onRequestAudit: (summary: string) => void;
}

export const GapAnalysisModal: React.FC<GapAnalysisModalProps> = ({
  isOpen,
  onClose,
  standardId,
  onRequestAudit,
}) => {
  const standard = SGI_STANDARDS[standardId] || SGI_STANDARDS['iso-45001'];

  const [answers, setAnswers] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: true,
  });

  const questions = [
    'Il DVR o manuale di gestione è stato revisionato negli ultimi 12 mesi con il supporto del Medico Competente e RSPP?',
    'Tutti i lavoratori, RLS e preposti dispongono di attestati di formazione in corso di validità conformi alla normativa vigente?',
    'È presente un registro formale per la segnalazione e gestione tempestiva dei mancati infortuni (Near Miss)?',
    'L’azienda adotta procedure strutturate per la qualifica e il controllo dei fornitori e appaltatori esterni?',
  ];

  if (!isOpen) return null;

  const score = Object.values(answers).filter(Boolean).length * 25;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#70B5F9]">
              AUDIT DIAGNOSTICO PREVENTIVO
            </span>
            <h3 className="font-serif-display text-2xl font-bold">
              Gap Analysis: {standard.code}
            </h3>
            <p className="text-xs text-slate-300">
              Verifica in 4 step la conformità della tua azienda ai requisiti di certificazione e legge.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Questions */}
        <div className="p-6 sm:p-7 space-y-6">
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0A66C2] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {q}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setAnswers({ ...answers, [idx]: true })}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      answers[idx] === true
                        ? 'bg-[#0B192C] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Sì
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, [idx]: false })}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      answers[idx] === false
                        ? 'bg-[#0A66C2] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    No / Da verificare
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Result Score */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Punteggio di Conformità Stimato
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-2">
                <span className="text-3xl font-black text-[#0B192C]">{score}%</span>
                <span className="text-xs font-bold text-[#0A66C2]">
                  {score >= 75 ? 'Livello di Tenuta Ottimale' : 'Intervento di Allineamento Raccomandato'}
                </span>
              </div>
            </div>

            <div className="w-full sm:w-48 h-3 bg-white rounded-full overflow-hidden border border-blue-200">
              <div
                className="h-full bg-[#0A66C2] transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Un consulente senior può svolgere il sopralluogo tecnico a Treviso o Milano.
          </span>
          <button
            onClick={() => {
              onRequestAudit(`Gap Analysis ${standard.code} (Punteggio preliminare: ${score}%)`);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0B192C] hover:bg-[#0A66C2] transition-colors cursor-pointer shadow-md"
          >
            <span>Prenota Audit con Consulente E.M Safety</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

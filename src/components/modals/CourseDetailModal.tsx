import React, { useState } from 'react';
import { X, Clock, MapPin, Award, CheckCircle2, Calendar, FileText, ArrowRight } from 'lucide-react';
import { Course } from '../../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (courseTitle: string, participantCount: number) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnroll,
}) => {
  const [participants, setParticipants] = useState(1);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 sm:p-7 flex items-start justify-between">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#70B5F9]">
              CORSO ACCREDITATO • CODICE {course.code}
            </span>
            <h3 className="font-serif-display text-2xl font-bold leading-snug">
              {course.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>{course.hours} ore certificate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>{course.location}</span>
              </span>
              <span>Validità: {course.validityYears} anni</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6">
          {enrolledSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-blue-100 text-[#0A66C2] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-display text-xl text-[#0B192C] font-bold">
                Prenotazione Ricevuta per {course.title}
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Ti invieremo entro poche ore la scheda anagrafica corsisti, il programma didattico dettagliato e le istruzioni logistiche (sede Treviso/Milano o link streaming FAD).
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] hover:bg-[#0A66C2] text-white rounded-xl transition-colors cursor-pointer"
                >
                  Chiudi finestra
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Descrizione & Obiettivi Formativi
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {course.description} Il percorso garantisce conformità totale alle disposizioni
                  del D.Lgs. 81/08 e dell'Accordo Stato-Regioni. I docenti sono formatori qualificati
                  con oltre 10 anni di esperienza pratica in azienda.
                </p>
              </div>

              {/* Target & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="block font-bold text-slate-900 mb-0.5">Destinatari:</span>
                  <span className="text-slate-600">{course.target}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="block font-bold text-slate-900 mb-0.5">Modalità di Erogazione:</span>
                  <span className="text-slate-600">{course.mode} (in aula attrezzata o piattaforma FAD)</span>
                </div>
              </div>

              {/* Attestato & Materiale */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cosa Include la Quota
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
                    <span>Attestato a norma con QR-Code univoco</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
                    <span>Dispense e materiale didattico in PDF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
                    <span>Verifica apprendimento finale con test</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
                    <span>Archiviazione su Cloud E.M Safety</span>
                  </div>
                </div>
              </div>

              {/* Participants Counter */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Numero partecipanti da iscrivere:
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Sconti per gruppi aziendali superiori a 5 persone
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className="w-8 h-8 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-slate-900">
                    {participants}
                  </span>
                  <button
                    onClick={() => setParticipants(participants + 1)}
                    className="w-8 h-8 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left w-full sm:w-auto">
                  <span className="block text-[11px] text-slate-500">Quota indicativa</span>
                  <span className="text-base font-bold text-[#0B192C]">{course.price || 'Contattaci per tariffario'}</span>
                </div>

                <button
                  onClick={() => {
                    onEnroll(course.title, participants);
                    setEnrolledSuccess(true);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors cursor-pointer shadow-md"
                >
                  <span>Conferma Richiesta Iscrizione ({participants} posti)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

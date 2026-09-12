import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  Eye,
  Headphones,
  HardHat,
  Wind,
  HandMetal,
  Footprints,
  Sparkles,
  Info,
  Check,
  Award,
  ArrowRight,
} from 'lucide-react';

interface PpeArea {
  id: string;
  name: string;
  category: string;
  norm: string;
  icon: React.ElementType;
  hotspot: { x: number; y: number }; // Percentage coords on body
  ppeRequirements: string;
  safetyEquipment: string;
  inspectionPoints: string[];
  complianceStatus: 'Conforme • DPI 3ª Cat.' | 'Conforme • DPI 2ª Cat.' | 'Conforme • DPI 1ª Cat.';
  applicableRisks: string[];
}

export const PpeInspectionSection: React.FC = () => {
  const ppeAreas: PpeArea[] = [
    {
      id: 'head',
      name: 'Testa / Elmetto di Protezione',
      category: 'Protezione Meccanica e Dielettrica',
      norm: 'UNI EN 397 • EN 50365',
      icon: HardHat,
      hotspot: { x: 50, y: 12 },
      ppeRequirements: 'Casco industriale dielettrico classe 0, sottogola a 4 punti di ancoraggio a sgancio tarato.',
      safetyEquipment: 'Marcatura CE indelebile, data di fabbricazione stampigliata (validità max 5 anni), guscio antiurto.',
      inspectionPoints: [
        'Assenza di micro-fessurazioni, forature o deformazioni termiche',
        'Integrità della culla interna e della regolazione a cremagliera',
        'Fascetta parasudore integra e lavabile',
      ],
      complianceStatus: 'Conforme • DPI 2ª Cat.',
      applicableRisks: [
        'Caduta accidentale di carichi e materiali dall’alto',
        'Urto contro ostacoli fissi o elementi di ponteggio sospesi',
        'Contatto accidentale con conduttori elettrici in tensione',
      ],
    },
    {
      id: 'eyes',
      name: 'Occhi e Viso / Protezione Oculare',
      category: 'Protezione da Impatti e Radiazioni',
      norm: 'UNI EN 166 • EN 170',
      icon: Eye,
      hotspot: { x: 50, y: 19 },
      ppeRequirements: 'Occhiali a mascherina panoramica con classe ottica 1 o visiera integrale ribaltabile in policarbonato.',
      safetyEquipment: 'Trattamento permanente antiappannamento (N) e antigraffio rinforzato (K), protezione UV 400.',
      inspectionPoints: [
        'Trasparenza ottica perfetta e assenza di rigature sul campo visivo',
        'Tenuta perimetrale della guarnizione morbida su fronte e zigomi',
        'Fascia elastica regolabile con tensione costante',
      ],
      complianceStatus: 'Conforme • DPI 2ª Cat.',
      applicableRisks: [
        'Schegge incandescenti e trucioli metallici da taglio/molatura',
        'Schizzi di liquidi corrosivi o composti chimici pericolosi',
        'Radiazioni ottiche artificiali (ROA) da saldatura o laser',
      ],
    },
    {
      id: 'hearing',
      name: 'Apparato Uditivo / Otoprotettori',
      category: 'Attenuazione Acustica Selettiva',
      norm: 'UNI EN 352-1 • EN 352-2',
      icon: Headphones,
      hotspot: { x: 38, y: 19 },
      ppeRequirements: 'Cuffie antirumore ad alta attenuazione (SNR ≥ 31 dB) o inserti auricolari preformati con cordino.',
      safetyEquipment: 'Profilo ergonomico ultra-sottile per compatibilità con elmetto, archetto dielettrico isolato.',
      inspectionPoints: [
        'Morbidezza ed elasticità dei cuscinetti di tenuta auricolari',
        'Pulizia e disinfezione periodica dei componenti a contatto',
        'Attenuazione bilanciata per mantenere percepibili gli allarmi antincendio',
      ],
      complianceStatus: 'Conforme • DPI 2ª Cat.',
      applicableRisks: [
        'Esposizione prolungata a rumore continuo Lex,8h > 85 dB(A)',
        'Picchi sonori d’impatto Ppeak > 137 dB(C)',
        'Rischio insorgenza di ipoacusia professionale permanente',
      ],
    },
    {
      id: 'respiratory',
      name: 'Vie Respiratorie / Facciali Filtranti',
      category: 'Protezione Polveri, Nebbie e Vapori',
      norm: 'UNI EN 149:2009 • EN 14387',
      icon: Wind,
      hotspot: { x: 50, y: 25 },
      ppeRequirements: 'Semimaschera monouso FFP3 D (con prova polvere di dolomite) o respiratore a cartucce ABEK1-P3.',
      safetyEquipment: 'Valvola di espirazione a bassa resistenza aerodinamica, clip nasale regolabile a doppia lamina.',
      inspectionPoints: [
        'Controllo aderenza viso (Fit Test) prima di ogni ingresso in area a rischio',
        'Verifica intasamento filtri e data di scadenza delle cartucce',
        'Assenza di lacerazioni del tessuto filtrante o elastici snervati',
      ],
      complianceStatus: 'Conforme • DPI 3ª Cat.',
      applicableRisks: [
        'Inalazione di silice libera cristallina, fibre di amianto o legno duro',
        'Aerosol di verniciatura e vapori chimici organici volatili',
        'Nebbie oleose e fumi di saldatura metallica',
      ],
    },
    {
      id: 'body',
      name: 'Corpo e Torace / Imbracatura Anticaduta',
      category: 'Sistemi di Arresto Caduta dall’Alto',
      norm: 'UNI EN 361 • EN 358 • EN 355',
      icon: Shield,
      hotspot: { x: 50, y: 42 },
      ppeRequirements: 'Imbracatura integrale a 2 punti (sternale + dorsale), cordino doppio ad Y con assorbitore di energia integrato.',
      safetyEquipment: 'Fettucce ad alta resistenza con cuciture a contrasto per rapido controllo visivo, connettori automatici in acciaio.',
      inspectionPoints: [
        'Verifica annuale asseverata da tecnico competente con scheda di vita registrata',
        'Assenza di tagli, sfilacciamenti o bruciature sulle cinghie portanti',
        'Scatto fluido e chiusura automatica delle ghiere dei moschettoni',
      ],
      complianceStatus: 'Conforme • DPI 3ª Cat.',
      applicableRisks: [
        'Lavori in quota a quota h ≥ 2,00 m rispetto al piano stabile',
        'Rischio caduta libera e sindrome da sospensione inerte',
        'Ribaltamento o espulsione da cestello su piattaforma aerea (PLE)',
      ],
    },
    {
      id: 'hands',
      name: 'Mani e Avambracci / Guanti Tecnici',
      category: 'Protezione Meccanica e Chimica',
      norm: 'UNI EN 388 (4X44F) • EN ISO 374-1',
      icon: HandMetal,
      hotspot: { x: 26, y: 55 },
      ppeRequirements: 'Guanti professionali a filo continuo antitaglio livello F (massimo) con palmo in mescola nitrilica grippante.',
      safetyEquipment: 'Rinforzo imbottito tra pollice e indice, protezione anti-urto in TPR sagomato sul dorso delle dita.',
      inspectionPoints: [
        'Integrità superficiale senza abrasioni passanti o forature',
        'Conservazione del grip in presenza di oli industriali pesanti',
        'Flessibilità e destrezza preservate per manovre di precisione',
      ],
      complianceStatus: 'Conforme • DPI 2ª Cat.',
      applicableRisks: [
        'Contatto con lamiere affilate, trucioli e bordi taglienti',
        'Pizzicamento e schiacciamento del dorso dita',
        'Contaminazione dermica da fluidi lubrorefrigeranti',
      ],
    },
    {
      id: 'feet',
      name: 'Piedi e Caviglie / Calzature Antinfortunistiche',
      category: 'Protezione Puntale e Lamina Antiperforazione',
      norm: 'UNI EN ISO 20345:2022 S3S SR FO',
      icon: Footprints,
      hotspot: { x: 44, y: 88 },
      ppeRequirements: 'Scarpa alta idrorepellente con puntale in fibra di carbonio 200J e soletta antiperforazione tessile PS.',
      safetyEquipment: 'Suola con scanalature autopulenti a grip certificato SR su piastrella e glicerina, tacco shock-absorber 20J.',
      inspectionPoints: [
        'Profondità scolpitura battistrada > 2 mm (limite sicurezza usura)',
        'Assenza di distacchi o scollature tra tomaia e suola',
        'Integrità della fodera interna e corretta allacciatura protettiva',
      ],
      complianceStatus: 'Conforme • DPI 2ª Cat.',
      applicableRisks: [
        'Schiacciamento per caduta di pezzi pesanti o movimentazione carichi',
        'Perforazione della pianta del piede da chiodi sporgenti in cantiere',
        'Scivolamento su pavimentazioni umide, oliate o sconnesse',
      ],
    },
  ];

  const [selectedAreaId, setSelectedAreaId] = useState<string>('head');
  const activeArea = ppeAreas.find((a) => a.id === selectedAreaId) || ppeAreas[0];

  return (
    <section id="ispezione-dpi" className="py-16 sm:py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332] text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scanner Diagnostico Visivo • Sicurezza 4.0</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
              Ispezione Interattiva DPI e Presidi di Campo
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
              Seleziona le aree corporee o i presidi operativi per verificare le prescrizioni di legge (D.Lgs. 81/08 Titolo III e Regolamento UE 2016/425), i requisiti EN e i punti di controllo ispettivi.
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Standard UE 2016/425 & Norme Armonizzate</span>
          </div>
        </div>

        {/* Main Interactive Stage: Body Silhouette on Left, Technical Readout on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Human Interactive Silhouette */}
          <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden min-h-[460px]">
            {/* Ambient Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#1B4332 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Silhouette Container */}
            <div className="relative w-64 h-[400px] flex items-center justify-center">
              {/* Stylized Human Body Wireframe Vector */}
              <svg
                viewBox="0 0 200 400"
                className="w-full h-full stroke-slate-700 fill-slate-800/40"
              >
                {/* Head */}
                <circle cx="100" cy="50" r="24" strokeWidth="2" />
                {/* Neck */}
                <path d="M94 74 L94 86 M106 74 L106 86" strokeWidth="2" />
                {/* Torso */}
                <path
                  d="M70 86 L130 86 L120 210 L80 210 Z"
                  strokeWidth="2"
                  className="fill-slate-800/70"
                />
                {/* Arms */}
                <path
                  d="M70 86 L40 180 L52 230 M130 86 L160 180 L148 230"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Legs */}
                <path
                  d="M86 210 L80 340 L65 375 M114 210 L120 340 L135 375"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              {/* Clickable Hotspots overlaying the body */}
              {ppeAreas.map((area) => {
                const isSelected = area.id === selectedAreaId;
                return (
                  <button
                    key={area.id}
                    onClick={() => setSelectedAreaId(area.id)}
                    style={{
                      left: `${area.hotspot.x}%`,
                      top: `${area.hotspot.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-10 p-2 rounded-full transition-all duration-300 cursor-pointer group flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#1B4332] text-white ring-4 ring-emerald-400/50 scale-125 shadow-lg'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white ring-2 ring-slate-600'
                    }`}
                    title={`Ispeziona ${area.name}`}
                  >
                    <area.icon className="w-3.5 h-3.5" />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Helper Text */}
            <span className="text-[11px] font-mono text-slate-400 tracking-wider mt-4">
              [ Clicca sui nodi o sui pulsanti sottostanti per analizzare il DPI ]
            </span>
          </div>

          {/* Right Column: Detailed Diagnostic Spec Card */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Top Readout Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5A93C]">
                      {activeArea.category}
                    </span>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {activeArea.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {activeArea.complianceStatus}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900 text-slate-300 border border-slate-700">
                      {activeArea.norm}
                    </span>
                  </div>
                </div>

                {/* Requirements & Equipment Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Prescrizioni di Legge DPI
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {activeArea.ppeRequirements}
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Dotazioni di Sicurezza & Marcatura
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {activeArea.safetyEquipment}
                    </p>
                  </div>
                </div>

                {/* Inspection Points Checklist */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Punti di Controllo Ispettivo Obbligatorio
                  </span>
                  <ul className="space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                    {activeArea.inspectionPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Applicable Workplace Risks */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Rischi Tipici Mitigati nel DVR
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeArea.applicableRisks.map((risk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700/80"
                      >
                        • {risk}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Quick Area Selector Tabs */}
            <div className="pt-6 mt-6 border-t border-slate-700 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {ppeAreas.map((area) => {
                const isActive = area.id === selectedAreaId;
                return (
                  <button
                    key={area.id}
                    onClick={() => setSelectedAreaId(area.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {area.name.split('/')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

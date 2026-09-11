import React from 'react';
import { MessageSquare, PhoneCall, ClipboardCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '1',
      icon: MessageSquare,
      title: 'Raccontaci la tua esigenza',
      description: 'Compila il modulo online o chiamaci direttamente: pochi dati aziendali bastano per avviare il processo.',
    },
    {
      num: '2',
      icon: PhoneCall,
      title: 'Confrontiamoci sul percorso tecnico',
      description: 'I nostri consulenti senior analizzano rischi specifici, tempistiche di rinnovo e vincoli di bilancio.',
    },
    {
      num: '3',
      icon: ClipboardCheck,
      title: 'Definiamo il piano esecutivo',
      description: 'Ricevi una proposta dettagliata: calendario aule, audit sul campo e preventivo chiaro senza sorprese.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0A66C2]">
            METODO DI LAVORO COLLAUDATO
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#0B192C] font-bold tracking-tight">
            Dalla richiesta al piano esecutivo in 3 semplici passi
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl">
            Semplifichiamo gli adempimenti normativi con risposte certe e tempi di intervento garantiti entro 48 ore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 3 Steps Timeline */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.15 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#0A66C2] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0B192C] text-white font-extrabold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#0A66C2] transition-colors shadow-xs">
                    {step.num}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#0A66C2] shrink-0" />
                      <h3 className="text-base font-bold text-[#0B192C] leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Two photo cards with hover motion */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {/* Image 1: Meeting consultation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-md aspect-4/5 bg-slate-100 border border-slate-200 group"
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                alt="Incontro consulenza strategica sicurezza"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-white text-xs font-bold">
                Consulenza personalizzata
              </div>
            </motion.div>

            {/* Image 2: Welder with protection mask in manufacturing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-md aspect-4/5 bg-slate-100 border border-slate-200 group"
            >
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
                alt="Saldatore con maschera protettiva in officina"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-white text-xs font-bold">
                Sicurezza nei reparti produttivi
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

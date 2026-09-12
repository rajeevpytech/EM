import { useState, useEffect } from 'react';
import { Course, CalendarEvent, SiteInfo, AdminLead, AdminLeadStatus, SafetyStory, ContentItem, ContentType, AdminCredentials } from '../types';
import { COURSES, CALENDAR_EVENTS } from '../data/mockData';

export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  id: 'Admin',
  password: 'admin123',
  updatedAt: 'Default 2026',
};

// Backward-compatible ADMIN_CREDENTIALS export
export const ADMIN_CREDENTIALS = {
  id: 'Admin',
  password: 'admin123',
  fallbackPassword: 'admin',
};

export const DEFAULT_SITE_INFO: SiteInfo = {
  companyName: 'E.M. Safety',
  slogan: 'Costruiamo Sistemi che trasformano la compliance in Valore aggiunto',
  phone: '+39 0422 123456',
  emergencyPhone: '+39 340 9876543',
  email: 'info@emsafety.it',
  addressMilano: 'Piazza Gae Aulenti, 20154 Milano (MI)',
  addressTreviso: 'Viale della Repubblica 154, 31100 Treviso (TV)',
  heroBadge: 'TREVISO • MILANO — PRESIDIO NAZIONALE',
  heroTitle: 'Costruiamo Sistemi che trasformano la compliance in Valore aggiunto.',
  heroSubtitle:
    'Dalla valutazione dei rischi (D.Lgs. 81/08) ai Sistemi di Gestione Integrati (ISO 45001, 14001, 9001). Affianchiamo datori di lavoro, RSPP e HSE Manager con soluzioni operative concrete, non burocrazia.',
  statYears: '15+',
  statYearsLabel: 'anni di esperienza al fianco delle imprese',
  statAreas: '6',
  statAreasLabel: 'aree di consulenza specialistica e audit',
  statModes: '3',
  statModesLabel: 'modalità: in aula, presso azienda, e-learning',
  statResponse: '24h',
  statResponseLabel: 'tempo medio di prima risposta operativa',
};

export const INITIAL_STORIES: SafetyStory[] = [
  {
    id: 'story-1',
    type: 'story',
    category: 'Metalmeccanica & Automazione',
    title: 'Transizione ISO 45001 e azzeramento infortuni su linee robotizzate',
    subtitle: 'Stabilimento produttivo ad alto rischio (240 addetti)',
    clientCompany: 'Meccanica Veneta S.p.A.',
    sector: 'Metalmeccanica & Automazione',
    location: 'Treviso (TV)',
    year: '2023 - 2026',
    metric: '0 Infortuni',
    metricLabel: 'negli ultimi 3 anni su 240 operatori',
    summary: 'Ristrutturazione integrale del DVR di stabilimento e nomina del nostro RSPP esterno qualificato per la gestione della sicurezza sulle isole robotizzate ad alto voltaggio.',
    content: 'Ristrutturazione integrale del DVR di stabilimento e nomina del nostro RSPP esterno qualificato per la gestione della sicurezza sulle isole robotizzate ad alto voltaggio.\n\n### La Sfida Aziendale\nL’azienda registrava frequenti micro-infortuni e un tasso di assenteismo preoccupante prima dei cambi turno. I vecchi faldoni cartacei del DVR erano disallineati rispetto alle nuove celle automatiche.\n\n### L\'Intervento di E.M. Safety\nE.M. Safety ha condotto una perizia tecnica asseverata sui ripari delle macchine, redatto istruzioni operative grafiche per gli operatori, formato 35 preposti sul campo e implementato il Sistema di Gestione Sicurezza certificato ISO 45001.\n\n### Risultati Concreti Ottenuti\nInfortuni scesi da 14 all’anno a ZERO per 36 mesi consecutivi. Sgravio tariffario INAIL OT23 pari a € 44.000 all’anno e superamento degli audit SPISAL senza alcuna prescrizione penale.',
    challenge: 'L’azienda registrava frequenti micro-infortuni e un tasso di assenteismo preoccupante prima dei cambi turno. I vecchi faldoni cartacei del DVR erano disallineati rispetto alle nuove celle automatiche.',
    solution: 'E.M. Safety ha condotto una perizia tecnica asseverata sui ripari delle macchine, redatto istruzioni operative grafiche per gli operatori, formato 35 preposti sul campo e implementato il Sistema di Gestione Sicurezza certificato ISO 45001.',
    results: 'Infortuni scesi da 14 all’anno a ZERO per 36 mesi consecutivi. Sgravio tariffario INAIL OT23 pari a € 44.000 all’anno e superamento degli audit SPISAL senza alcuna prescrizione penale.',
    quote: 'Con E.M. Safety abbiamo smesso di subire la sicurezza come obbligo: oggi le nostre linee producono con più ordine, efficienza e la totale serenità del personale.',
    authorName: 'Ing. Roberto Mantovani',
    authorRole: 'Direttore di Stabilimento',
    badge: 'Caso Certificato ISO 45001',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    publishedAt: 'Marzo 2026',
    readTime: '3 min lettura',
    createdAt: 'Marzo 2026',
    tags: ['ISO 45001', 'Metalmeccanica', 'Zero Infortuni', 'SPISAL'],
  },
  {
    id: 'story-2',
    type: 'story',
    category: 'Logistica & Supply Chain',
    title: 'Formazione continua carrellisti e hub logistico a prova di audit',
    subtitle: 'Polo logistico e-commerce da 45.000 mq (180 addetti)',
    clientCompany: 'Logix Nord Ovest S.r.l.',
    sector: 'Logistica & Supply Chain',
    location: 'Milano Hub (MI)',
    year: '2024 - 2026',
    metric: '100% Abilitati',
    metricLabel: '120 carrellisti senza fermare i turni h24',
    summary: 'Addestramento pratico carrelli elevatori e retrattili direttamente in banchina, con digitalizzazione di scadenze e patentini tramite piattaforma cloud E.M. Safety.',
    content: 'Addestramento pratico carrelli elevatori e retrattili direttamente in banchina, con digitalizzazione di scadenze e patentini tramite piattaforma cloud E.M. Safety.\n\n### La Sfida Aziendale\nRinnovare i patentini carrelli per oltre 120 operatori turnisti senza bloccare le spedizioni e con elevato turn-over di cooperative esterne.\n\n### L\'Intervento di E.M. Safety\nAbbiamo istituito un campo prove dedicato presso la nostra sede di Treviso e sessioni serali in banchina a Milano, validando il percorso con O.P.N. Italia Lavoro e coprendo il 100% dei costi tramite Fondi Interprofessionali.\n\n### Risultati Concreti Ottenuti\nAudit committenti multinazionali superato con punteggio 100/100. Zero collisioni tra carrelli e pedoni nell’ultimo biennio.',
    challenge: 'Rinnovare i patentini carrelli per oltre 120 operatori turnisti senza bloccare le spedizioni e con elevato turn-over di cooperative esterne.',
    solution: 'Abbiamo istituito un campo prove dedicato presso la nostra sede di Treviso e sessioni serali in banchina a Milano, validando il percorso con O.P.N. Italia Lavoro e coprendo il 100% dei costi tramite Fondi Interprofessionali.',
    results: 'Audit committenti multinazionali superato con punteggio 100/100. Zero collisioni tra carrelli e pedoni nell’ultimo biennio.',
    quote: 'La flessibilità dei formatori E.M. Safety ha fatto la differenza: formare il nostro personale su tre turni senza perdere un solo collo spedito è stato eccezionale.',
    authorName: 'Dott.ssa Laura De Bellis',
    authorRole: 'Responsabile Risorse Umane',
    badge: 'Eccellenza Logistica',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    publishedAt: 'Gennaio 2026',
    readTime: '3 min lettura',
    createdAt: 'Gennaio 2026',
    tags: ['Carrelli Elevatori', 'Logistica', 'Formazione Finanziata', 'Patentino'],
  },
  {
    id: 'story-3',
    type: 'story',
    category: 'Chimico & Farmaceutico',
    title: 'Mappatura agenti chimici e bonifica acustica in laboratorio farmaceutico',
    subtitle: 'Produzione principi attivi & polimeri speciali (95 tecnici)',
    clientCompany: 'Biotech Polymeric Industries',
    sector: 'Chimico & Farmaceutico',
    location: 'Vicenza (VI)',
    year: '2023 - 2025',
    metric: '-38 dB(A)',
    metricLabel: 'riduzione impatto acustico e bonifica cappe chimiche',
    summary: 'Campionamenti aerodispersi, valutazione rischio chimico specialistico e riprogettazione dei sistemi di captazione per la tutela da vapori tossici.',
    content: 'Campionamenti aerodispersi, valutazione rischio chimico specialistico e riprogettazione dei sistemi di captazione per la tutela da vapori tossici.\n\n### La Sfida Aziendale\nAdeguamento alle direttive europee REACH/CLP in tempi stretti a seguito dell’introduzione di nuovi reattivi di sintesi e contestuale superamento dei livelli di rumore in sala compressori.\n\n### L\'Intervento di E.M. Safety\nTecnici igienisti E.M. Safety hanno eseguito campionamenti con pompe a flusso costante e rilievi fonometrici in classe 1, predisponendo schermature fonoassorbenti mirate e DPI di III categoria con addestramento specifico.\n\n### Risultati Concreti Ottenuti\nPiena conformità alle tabelle ASL/ARPAV e drastica riduzione del rischio chimico a livello moderato/basso.',
    challenge: 'Adeguamento alle direttive europee REACH/CLP in tempi stretti a seguito dell’introduzione di nuovi reattivi di sintesi e contestuale superamento dei livelli di rumore in sala compressori.',
    solution: 'Tecnici igienisti E.M. Safety hanno eseguito campionamenti con pompe a flusso costante e rilievi fonometrici in classe 1, predisponendo schermature fonoassorbenti mirate e DPI di III categoria con addestramento specifico.',
    results: 'Piena conformità alle tabelle ASL/ARPAV e drastica riduzione del rischio chimico a livello moderato/basso.',
    quote: 'La perizia strumentale e la tempestività nella consegna delle relazioni hanno consentito all’azienda di avviare le nuove linee produttive senza alcun ritardo.',
    authorName: 'Dott. Chim. Alessandro Ferri',
    authorRole: 'HSE Manager',
    badge: 'Igiene Industriale Avanzata',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    publishedAt: 'Febbraio 2026',
    readTime: '3 min lettura',
    createdAt: 'Febbraio 2026',
    tags: ['Rischio Chimico', 'REACH CLP', 'Fonometria', 'Igiene Industriale'],
  },
  {
    id: 'story-4',
    type: 'story',
    category: 'Edilizia & Cantieri Complessi',
    title: 'Coordinamento della sicurezza in cantiere e PSC per grandi infrastrutture',
    subtitle: 'Appalti pubblici e ristrutturazione complessi direzionali (110 operai)',
    clientCompany: 'Edil Costruzioni Nord S.p.A.',
    sector: 'Edilizia & Cantieri Complessi',
    location: 'Milano - Porta Nuova',
    year: '2024 - 2026',
    metric: '€ 52.000',
    metricLabel: 'risparmiati sul premio INAIL annuo',
    summary: 'Incarico di Coordinatore della Sicurezza in fase di Progettazione ed Esecuzione (CSP/CSE) con sopralluoghi settimanali rigorosi e controllo continuo subappalti.',
    content: 'Incarico di Coordinatore della Sicurezza in fase di Progettazione ed Esecuzione (CSP/CSE) con sopralluoghi settimanali rigorosi e controllo continuo subappalti.\n\n### La Sfida Aziendale\nCoordinare la convivenza di oltre 15 ditte subappaltatrici contemporaneamente con rischi interferenziali elevati in zona urbana ad alta densità.\n\n### L\'Intervento di E.M. Safety\nPiani Operativi di Sicurezza (POS) digitalizzati, briefing pre-turno di 10 minuti per tutte le maestranze e verifiche strutturali su ponteggi e linee vita.\n\n### Risultati Concreti Ottenuti\nCantiere completato nei tempi contrattuali con ZERO infortuni gravi e congratulazioni formali della committenza pubblica.',
    challenge: 'Coordinare la convivenza di oltre 15 ditte subappaltatrici contemporaneamente con rischi interferenziali elevati in zona urbana ad alta densità.',
    solution: 'Piani Operativi di Sicurezza (POS) digitalizzati, briefing pre-turno di 10 minuti per tutte le maestranze e verifiche strutturali su ponteggi e linee vita.',
    results: 'Cantiere completato nei tempi contrattuali con ZERO infortuni gravi e congratulazioni formali della committenza pubblica.',
    quote: 'Un team di ingegneri sempre reperibile in cantiere con risposte operative pratiche, non burocratiche.',
    authorName: 'Geom. Matteo Vianello',
    authorRole: 'Direttore Tecnico di Cantiere',
    badge: 'Grandi Opere',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    publishedAt: 'Gennaio 2026',
    readTime: '3 min lettura',
    createdAt: 'Gennaio 2026',
    tags: ['Cantieri', 'CSP CSE', 'PSC', 'Opere Pubbliche'],
  },
];

export const INITIAL_CONTENT_ITEMS: ContentItem[] = [
  ...INITIAL_STORIES,
  {
    id: 'art-1',
    type: 'article',
    title: 'Nuovo Accordo Stato-Regioni 2026: Guida Operativa per Datori di Lavoro e Preposti',
    subtitle: 'Quadro sinottico ragionato sulle nuove durate minime, verifiche di apprendimento obbligatorie e periodicità di aggiornamento biennale.',
    category: 'D.Lgs. 81/08 & Normativa',
    summary: 'Con l’entrata in vigore del Nuovo Accordo Stato-Regioni sulla Formazione alla Sicurezza, cambiano radicalmente i requisiti per le figure chiave aziendali. Ecco la sintesi operativa elaborata dai consulenti e formatori E.M. Safety.',
    content: `Il Nuovo Accordo Stato-Regioni 2026 segna un punto di svolta decisivo nella disciplina della formazione sulla salute e sicurezza nei luoghi di lavoro (D.Lgs. 81/08). La revisione unifica e sostituisce i precedenti accordi del 2011 e 2016, introducendo standard più severi per l'accreditamento, il monitoraggio delle presenze e la qualità della docenza.

### 1. La nuova figura del Preposto: addestramento e cadenza biennale
Tra le novità di maggior impatto operativo spicca l'obbligo di aggiornamento biennale per i preposti (non più quinquennale), con una durata minima elevata e l'obbligo di svolgere la formazione interamente in presenza o in videoconferenza sincrona. Viene inoltre introdotto il modulo di "addestramento comportamentale" (Safety Coaching) mirato a potenziare la capacità di intervento e stop dei lavori in caso di pericolo immediato.

### 2. Datori di Lavoro: fine delle esenzioni
Anche per i Datori di Lavoro che non svolgono direttamente i compiti del Servizio di Prevenzione e Protezione (RSPP DDL) viene introdotto uno specifico percorso formativo obbligatorio. Questo modulo si concentra sulle responsabilità giuridico-penali derivanti dalla delega di funzioni (art. 16 D.Lgs. 81/08) e sui modelli organizzativi esimenti ex D.Lgs. 231/01.

### 3. Verifiche di efficacia e simulazioni pratiche
Non basta più la mera presenza in aula: il nuovo quadro normativo impone verifiche intermedie rigorose e prove di addestramento pratico documentate per tutti i corsi abilitanti (carrelli semoventi, PLE, spazi confinati, lavori in quota). Le attestazioni rilasciate dovranno essere tracciate tramite QR-code univoco con codice di validazione centrale.

### Indicazioni operative per le Direzioni HR e RSPP
Consigliamo alle aziende di Treviso, Milano e del territorio nazionale di avviare tempestivamente una ricognizione dei libretti formativi dei propri addetti. Il team di E.M. Safety è a disposizione per effettuare un audit documentale gratuito e predisporre un piano di allineamento formativo calibrato sui nuovi adempimenti.`,
    authorName: 'Ing. Enrico Marchesin',
    authorRole: 'Direttore Tecnico & Formatore Qualificato OPN',
    publishedAt: '04 Settembre 2026',
    readTime: '6 min lettura',
    badge: 'Normativa 2026',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    tags: ['D.Lgs 81/08', 'Accordo Stato Regioni', 'Preposti', 'Formazione Obbligatoria', 'Sanzioni'],
  },
  {
    id: 'art-2',
    type: 'article',
    title: 'Modello INAIL OT23: Riduzione del Tasso di Premio Fino al 28% con la Sicurezza',
    subtitle: 'Come pianificare gli interventi di miglioramento aziendale e beneficiare dello sconto tariffario annuale senza contestazioni.',
    category: 'Sgravi INAIL & ISO 45001',
    summary: 'Il Modello OT23 rappresenta lo strumento più efficace per trasformare gli investimenti in prevenzione in un risparmio economico tangibile e ricorrente sul tasso medio di tariffa INAIL.',
    content: `Ogni anno l'INAIL premia le imprese virtuose che hanno attuato interventi per il miglioramento delle condizioni di salute e sicurezza nei luoghi di lavoro, ulteriori rispetto a quelli prescritti per legge dal D.Lgs. 81/08.

### 1. La soglia dei 100 punti e gli interventi ammessi
Per accedere alla riduzione del tasso di premio, l'azienda deve raggiungere una quota minima di 100 punti scegliendo tra gli interventi indicati nel modulo ministeriale OT23. Tra le categorie più remunerative rientrano:
- Interventi di bonifica acustica e vibrazioni (Sezione B)
- Adozione di dispositivi uomo a terra e sensori anticollisione su carrelli (Sezione C)
- Piani di promozione della salute nei luoghi di lavoro (Sezione D)
- Implementazione o asseverazione di Sistemi di Gestione della Sicurezza (Sezione E)

### 2. L'adozione del Sistema ISO 45001: 100 punti immediati
L'adozione o il mantenimento di un Sistema di Gestione certificato UNI ISO 45001 con accreditamento Accredia garantisce di per sé l'assegnazione automatica di tutti i 100 punti richiesti. Ciò significa che l'investimento sostenuto per la certificazione viene spesso ammortizzato già nel primo anno di applicazione dello sconto INAIL.

### 3. Tempistiche e documentazione probante
La domanda telematica va presentata entro e non oltre il 28 febbraio di ogni anno tramite i servizi online dell'INAIL, allegando fatture quietanzate, verbali di audit e relazioni tecniche asseverate. Una documentazione carente o non conforme espone l'azienda al rigetto e al recupero retroattivo delle somme.

### Calcolo medio del risparmio per le PMI
Per un'azienda manifatturiera con 60 dipendenti e un monte salari di 2,2 milioni di euro, la riduzione del tasso del 18-28% corrisponde a un risparmio netto compreso tra € 22.000 e € 48.000 all'anno. E.M. Safety affianca l'azienda in tutte le fasi: dalla selezione degli interventi alla perizia tecnica asseverata.`,
    authorName: 'Dott.ssa Laura De Bellis',
    authorRole: 'Lead Auditor Sistemi Integrati SGI & ISO',
    publishedAt: '28 Agosto 2026',
    readTime: '5 min lettura',
    badge: 'Guida Fiscale',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    tags: ['INAIL OT23', 'Sgravi Fiscali', 'ISO 45001', 'Premi Assicurativi', 'ROI Sicurezza'],
  },
  {
    id: 'blog-1',
    type: 'blog',
    title: 'Digitalizzazione dei Registri Antincendio: Addio Faldoni nei Presidi di Milano e Treviso',
    subtitle: 'L’esperienza sul campo: come abbiamo migrato oltre 140 aziende clienti dalla carta al registro digitale cloud con presidi QR-code.',
    category: 'Innovazione & Campo',
    summary: 'Il Decreto Controlli del 1 Settembre 2021 impone la tenuta rigorosa del registro di sicurezza antincendio. Ecco perché il passaggio al digitale evita sanzioni penali e fa risparmiare centinaia di ore di gestione.',
    content: `Durante i nostri audit semestrali negli stabilimenti produttivi e poli logistici tra Veneto e Lombardia, uno dei riscontri più frequenti riguarda i registri antincendio cartacei mancanti, non aggiornati o con firme illegibili.

### Il rischio penale del registro cartaceo
In caso di sopralluogo dei Vigili del Fuoco o dello SPISAL, esibire cartelline sgualcite con timbri sbiaditi è il primo campanello d'allarme che porta all'irrogazione di prescrizioni penali ai sensi dell'art. 64 e 68 del D.Lgs. 81/08. La legge non ammette lacune nella tracciabilità della sorveglianza periodica di estintori, manichette, porte tagliafuoco e lampade di emergenza.

### Il metodo E.M. Safety Cloud: un QR-code per ogni presidio
Abbiamo applicato su ogni presidio antincendio dei nostri clienti una speciale etichetta metallica con QR-code univoco. Il manutentore o l'addetto interno scansiona il codice con il proprio smartphone, esegue la checklist guidata e registra in tempo reale l'esito della verifica con geolocalizzazione e timestamp asseverato.

### I risultati dopo 12 mesi di adozione
I nostri clienti registrano:
- Riduzione del 75% del tempo impiegato per raccogliere i verbali in occasione degli audit ISO 14001 e 45001;
- Notifiche automatiche 30 giorni prima della scadenza delle revisioni decennali e collaudi serbatoi;
- Accesso immediato ai certificati di conformità e omologazione dei presidi in caso di ispezione improvvisa.`,
    authorName: 'Geom. Matteo Vianello',
    authorRole: 'Specialista Antincendio & Impianti E.M. Safety',
    publishedAt: '10 Settembre 2026',
    readTime: '4 min lettura',
    badge: 'Dietro le Quinte',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    tags: ['Antincendio', 'Cloud', 'Registro Digitale', 'D.M. 1 Settembre 2021', 'Manutenzione'],
  },
  {
    id: 'blog-2',
    type: 'blog',
    title: 'Patente a Crediti nei Cantieri Edili: Prime Verifiche Ispettive e Consigli Pratici',
    subtitle: 'Cosa controllano realmente gli ispettori ITL sul portale e come verificare i subappalti prima di iniziare i lavori per non rischiare il blocco.',
    category: 'Cantieri & Appalti',
    summary: 'La patente a crediti per l’edilizia è ormai a pieno regime. Analizziamo le prime casistiche di decurtazione punti riscontrate e il protocollo di verifica preventiva documentale da applicare.',
    content: `Con l'entrata in vigore del sistema di qualificazione a crediti per imprese e lavoratori autonomi operanti nei cantieri temporanei o mobili (art. 27 D.Lgs. 81/08), il panorama delle responsabilità per committenti, datori di lavoro affidatari e coordinatori per la sicurezza (CSE) ha subito una stretta formidabile.

### I punti caldi controllati dall'Ispettorato Nazionale del Lavoro (ITL)
Dalle prime verifiche congiunte a cui i nostri tecnici hanno assistito nei cantieri di Milano e della Marca Trevigiana, i funzionari ITL richiedono l'esibizione immediata del codice identificativo della patente e verificano la veridicità delle autodichiarazioni caricate:
1. Effettiva corrispondenza del DVR aziendale e della nomina dell'RSPP;
2. Regolarità del DURC on-line alla data di inizio lavorazioni;
3. Formazione obbligatoria dei lavoratori effettivamente presente a fascicolo prima dell'ingresso al gate.

### Il rischio per l'Impresa Affidataria
Accogliere in cantiere un'impresa esecutrice o un artigiano privo di patente valida o con un punteggio residuo inferiore a 15 crediti comporta la sospensione immediata dei lavori e una sanzione amministrativa fino al 10% del valore dell'opera (con un minimo di € 6.000).

### Il nostro consiglio: check-in digitale al cancello
Consigliamo di non attendere il giorno della consegna lavori per richiedere i documenti: E.M. Safety supporta i cantieri con una procedura di pre-qualifica fornitore che valida patente e crediti 5 giorni lavorativi prima dell'ingresso, azzerando il rischio di fermo cantiere.`,
    authorName: 'Ing. Roberto Mantovani',
    authorRole: 'Coordinatore Sicurezza Cantieri CSP/CSE',
    publishedAt: '01 Settembre 2026',
    readTime: '5 min lettura',
    badge: 'Focus Cantieri',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    featuredOnHome: true,
    tags: ['Patente a Crediti', 'Cantieri Edili', 'ITL', 'Subappalti', 'CSP CSE'],
  },
];

export const INITIAL_LEADS: AdminLead[] = [
  {
    id: 'lead-1',
    fullName: 'Marco Rossi',
    company: 'Meccanica Veneta S.r.l.',
    email: 'm.rossi@meccanicaveneta.it',
    phone: '+39 335 1234567',
    source: 'Preventivo',
    subject: 'Richiesta Formazione Aziendale Antincendio e RSPP',
    message: 'Vorremmo organizzare un corso antincendio livello 2 per 12 dipendenti direttamente presso il nostro stabilimento di Treviso.',
    createdAt: 'Oggi, 11:20',
    status: 'Nuova',
    notes: 'Priorità alta: contattare entro 24 ore',
  },
  {
    id: 'lead-2',
    fullName: 'Laura Bianchi',
    company: 'Logistica Nord-Est SpA',
    email: 'hr@logisticane.it',
    phone: '+39 02 9876543',
    source: 'Iscrizione Corso',
    subject: 'Iscrizione Corso: Patentino Carrelli Elevatori Semoventi',
    message: 'Richiesta iscrizione per 4 magazzinieri alla sessione di Aprile 2026.',
    createdAt: 'Ieri, 16:45',
    status: 'In Lavorazione',
    notes: 'Inviato modulo anagrafica discenti',
  },
  {
    id: 'lead-3',
    fullName: 'Ing. Giovanni Moretti',
    company: 'Moretti Costruzioni',
    email: 'sicurezza@moretticostruzioni.com',
    phone: '+39 347 5556677',
    source: 'Gap Analysis',
    subject: 'Audit di Gap Analysis per standard: ISO 45001:2018',
    message: 'Interessati ad avviare percorso di certificazione ISO 45001 per sgravi INAIL OT23.',
    createdAt: '3 giorni fa',
    status: 'Nuova',
    notes: 'Fissare video call tecnica',
  },
];

const SITE_INFO_KEY = 'em_safety_site_info_v1';
const COURSES_KEY = 'em_safety_courses_v1';
const CALENDAR_KEY = 'em_safety_calendar_v1';
const LEADS_KEY = 'em_safety_leads_v1';
const STORIES_KEY = 'em_safety_stories_v1';
const CONTENT_ITEMS_KEY = 'em_safety_content_items_v2';
const ADMIN_AUTH_KEY = 'em_safety_admin_auth_v1';
const ADMIN_CREDENTIALS_KEY = 'em_safety_admin_creds_v2';

// Get and persist custom administrator credentials (User ID and Password)
export function getAdminCredentials(): AdminCredentials {
  try {
    const raw = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.id === 'string' && typeof parsed.password === 'string') {
        // Automatic migration if legacy temporary password was stored
        if (parsed.password === 'safety2026' || parsed.password === 'admin') {
          const migrated: AdminCredentials = {
            id: parsed.id.trim() || 'Admin',
            password: 'admin123',
            updatedAt: 'Migrato a standard admin123',
          };
          localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(migrated));
          return migrated;
        }
        return {
          id: parsed.id.trim() || 'Admin',
          password: parsed.password.trim() || 'admin123',
          updatedAt: parsed.updatedAt || 'Aggiornato',
        };
      }
    }
  } catch (e) {
    console.warn('Error reading admin credentials', e);
  }
  return DEFAULT_ADMIN_CREDENTIALS;
}

export function setAdminCredentials(creds: AdminCredentials): void {
  try {
    const sanitized: AdminCredentials = {
      id: (creds.id || 'Admin').trim(),
      password: (creds.password || 'admin123').trim(),
      updatedAt: creds.updatedAt || new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(sanitized));
    notifyAdminUpdate('admin_credentials', sanitized);
  } catch (e) {
    console.error('Error saving admin credentials', e);
  }
}

export function resetAdminCredentials(): AdminCredentials {
  try {
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN_CREDENTIALS));
    notifyAdminUpdate('admin_credentials', DEFAULT_ADMIN_CREDENTIALS);
  } catch (e) {
    console.error('Error resetting admin credentials', e);
  }
  return DEFAULT_ADMIN_CREDENTIALS;
}

// Seamless authentication verification (case-insensitive for User ID, exact for Password)
export function verifyAdminCredentials(inputUser: string, inputPass: string): boolean {
  const current = getAdminCredentials();
  const cleanInputUser = (inputUser || '').trim().toLowerCase();
  const cleanInputPass = (inputPass || '').trim();

  const currentId = current.id.trim().toLowerCase();
  const currentPassword = current.password.trim();

  // Match against current custom credentials
  if (cleanInputUser === currentId && cleanInputPass === currentPassword) {
    return true;
  }

  // Also support default credentials: ID 'Admin' (or 'admin') and password 'admin123'
  if ((cleanInputUser === 'admin' || cleanInputUser === currentId) && cleanInputPass === 'admin123') {
    return true;
  }

  return false;
}

// Getters from storage
export function getStoredSiteInfo(): SiteInfo {
  try {
    const raw = localStorage.getItem(SITE_INFO_KEY);
    if (raw) return { ...DEFAULT_SITE_INFO, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('Error reading site info', e);
  }
  return DEFAULT_SITE_INFO;
}

export function getStoredCourses(): Course[] {
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading courses', e);
  }
  return COURSES;
}

export function getStoredCalendar(): CalendarEvent[] {
  try {
    const raw = localStorage.getItem(CALENDAR_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading calendar', e);
  }
  return CALENDAR_EVENTS;
}

export function getStoredLeads(): AdminLead[] {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading leads', e);
  }
  return INITIAL_LEADS;
}

export function getStoredContentItems(): ContentItem[] {
  try {
    const raw = localStorage.getItem(CONTENT_ITEMS_KEY);
    if (raw) return JSON.parse(raw);

    // Migration from v1 stories if present
    const rawStories = localStorage.getItem(STORIES_KEY);
    if (rawStories) {
      const parsedStories = JSON.parse(rawStories);
      if (Array.isArray(parsedStories) && parsedStories.length > 0) {
        const migratedStories = parsedStories.map((s: any) => ({
          ...s,
          type: 'story' as const,
          category: s.sector || s.category || 'Metalmeccanica & Manifattura',
          publishedAt: s.createdAt || 'Marzo 2026',
          readTime: '3 min lettura',
          content: s.content || `${s.summary}\n\n### La Sfida Aziendale\n${s.challenge}\n\n### L'Intervento di E.M. Safety\n${s.solution}\n\n### Risultati Ottenuti\n${s.results}`,
        }));
        const articlesAndBlogs = INITIAL_CONTENT_ITEMS.filter((c) => c.type !== 'story');
        const combined = [...migratedStories, ...articlesAndBlogs];
        localStorage.setItem(CONTENT_ITEMS_KEY, JSON.stringify(combined));
        return combined;
      }
    }
  } catch (e) {
    console.warn('Error reading content items', e);
  }
  return INITIAL_CONTENT_ITEMS;
}

export function getStoredStories(): SafetyStory[] {
  const all = getStoredContentItems();
  const stories = all.filter((item) => item.type === 'story') as SafetyStory[];
  return stories.length > 0 ? stories : INITIAL_STORIES;
}

export function getAdminAuthStatus(): boolean {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthStatus(isAuthenticated: boolean): void {
  try {
    if (isAuthenticated) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (e) {
    console.error(e);
  }
}

// Global Event Dispatcher for instantaneous real-time sync across components
function notifyAdminUpdate(type: string, data: any) {
  window.dispatchEvent(new CustomEvent('em_safety_admin_sync', { detail: { type, data } }));
}

// Unified custom hook for the whole website and admin panel
export function useAdminStore() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(getStoredSiteInfo());
  const [courses, setCourses] = useState<Course[]>(getStoredCourses());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(getStoredCalendar());
  const [leads, setLeads] = useState<AdminLead[]>(getStoredLeads());
  const [contentItems, setContentItems] = useState<ContentItem[]>(getStoredContentItems());
  const [adminCredentials, setAdminCredentialsState] = useState<AdminCredentials>(getAdminCredentials());

  // Backward-compatible stories list
  const stories = contentItems.filter((item) => item.type === 'story') as SafetyStory[];
  const articles = contentItems.filter((item) => item.type === 'article');
  const blogs = contentItems.filter((item) => item.type === 'blog');

  useEffect(() => {
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) {
        setSiteInfo(getStoredSiteInfo());
        setCourses(getStoredCourses());
        setCalendarEvents(getStoredCalendar());
        setLeads(getStoredLeads());
        setContentItems(getStoredContentItems());
        setAdminCredentialsState(getAdminCredentials());
        return;
      }

      if (detail.type === 'site_info') setSiteInfo(detail.data);
      if (detail.type === 'courses') setCourses(detail.data);
      if (detail.type === 'calendar') setCalendarEvents(detail.data);
      if (detail.type === 'leads') setLeads(detail.data);
      if (detail.type === 'content_items') setContentItems(detail.data);
      if (detail.type === 'admin_credentials') setAdminCredentialsState(detail.data);
      if (detail.type === 'stories') {
        // Refresh content items if stories updated from another source
        setContentItems(getStoredContentItems());
      }
      if (detail.type === 'all_reset') {
        setSiteInfo(DEFAULT_SITE_INFO);
        setCourses(COURSES);
        setCalendarEvents(CALENDAR_EVENTS);
        setLeads(INITIAL_LEADS);
        setContentItems(INITIAL_CONTENT_ITEMS);
        setAdminCredentialsState(DEFAULT_ADMIN_CREDENTIALS);
      }
    };

    window.addEventListener('em_safety_admin_sync', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('em_safety_admin_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Update Site Info
  const updateSiteInfo = (newInfo: Partial<SiteInfo>) => {
    const updated = { ...siteInfo, ...newInfo };
    localStorage.setItem(SITE_INFO_KEY, JSON.stringify(updated));
    setSiteInfo(updated);
    notifyAdminUpdate('site_info', updated);
  };

  // Courses Operations
  const saveCourses = (newList: Course[]) => {
    localStorage.setItem(COURSES_KEY, JSON.stringify(newList));
    setCourses(newList);
    notifyAdminUpdate('courses', newList);
  };

  const addCourse = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    saveCourses(updated);
  };

  const updateCourse = (updatedCourse: Course) => {
    const updated = courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
    saveCourses(updated);
  };

  const deleteCourse = (courseId: string) => {
    const updated = courses.filter((c) => c.id !== courseId);
    saveCourses(updated);
  };

  // Calendar Operations
  const saveCalendar = (newList: CalendarEvent[]) => {
    localStorage.setItem(CALENDAR_KEY, JSON.stringify(newList));
    setCalendarEvents(newList);
    notifyAdminUpdate('calendar', newList);
  };

  const addCalendarEvent = (newEvent: CalendarEvent) => {
    const updated = [newEvent, ...calendarEvents];
    saveCalendar(updated);
  };

  const updateCalendarEvent = (updatedEvent: CalendarEvent) => {
    const updated = calendarEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
    saveCalendar(updated);
  };

  const deleteCalendarEvent = (eventId: string) => {
    const updated = calendarEvents.filter((e) => e.id !== eventId);
    saveCalendar(updated);
  };

  // Leads Operations
  const saveLeads = (newList: AdminLead[]) => {
    localStorage.setItem(LEADS_KEY, JSON.stringify(newList));
    setLeads(newList);
    notifyAdminUpdate('leads', newList);
  };

  const addLead = (leadInput: Omit<AdminLead, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLead: AdminLead = {
      ...leadInput,
      id: 'lead-' + Date.now(),
      createdAt: `Oggi, ${timeStr}`,
      status: 'Nuova',
    };
    const updated = [newLead, ...leads];
    saveLeads(updated);
    return newLead;
  };

  const updateLeadStatus = (id: string, status: AdminLeadStatus, notes?: string) => {
    const updated = leads.map((l) => {
      if (l.id === id) {
        return { ...l, status, ...(notes !== undefined ? { notes } : {}) };
      }
      return l;
    });
    saveLeads(updated);
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    saveLeads(updated);
  };

  // Content Operations (Stories, Blogs, Articles)
  const saveContentItems = (newList: ContentItem[]) => {
    localStorage.setItem(CONTENT_ITEMS_KEY, JSON.stringify(newList));
    // Also sync stories back to STORIES_KEY for any external legacy readers
    const storiesOnly = newList.filter((item) => item.type === 'story');
    localStorage.setItem(STORIES_KEY, JSON.stringify(storiesOnly));

    setContentItems(newList);
    notifyAdminUpdate('content_items', newList);
    notifyAdminUpdate('stories', storiesOnly);
  };

  const addContentItem = (itemInput: Omit<ContentItem, 'id' | 'publishedAt'>) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
    const formattedMonth = now.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

    const newItem: ContentItem = {
      ...itemInput,
      id: `${itemInput.type || 'item'}-${Date.now()}`,
      publishedAt: formattedDate,
      createdAt: formattedMonth,
    };
    const updated = [newItem, ...contentItems];
    saveContentItems(updated);
    return newItem;
  };

  const updateContentItem = (updatedItem: ContentItem) => {
    const updated = contentItems.map((c) => (c.id === updatedItem.id ? updatedItem : c));
    saveContentItems(updated);
  };

  const deleteContentItem = (itemId: string) => {
    const updated = contentItems.filter((c) => c.id !== itemId);
    saveContentItems(updated);
  };

  const toggleContentFeatured = (itemId: string) => {
    const updated = contentItems.map((c) =>
      c.id === itemId ? { ...c, featuredOnHome: !c.featuredOnHome } : c
    );
    saveContentItems(updated);
  };

  // Backwards-compatible Story wrappers
  const saveStories = (newList: SafetyStory[]) => {
    const nonStories = contentItems.filter((item) => item.type !== 'story');
    const updated = [...newList, ...nonStories];
    saveContentItems(updated);
  };

  const addStory = (storyInput: Omit<SafetyStory, 'id' | 'createdAt'>) => {
    const formattedMonth = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
    const newStory = addContentItem({
      ...storyInput,
      type: 'story',
      category: storyInput.sector || 'Metalmeccanica',
      content:
        storyInput.content ||
        `${storyInput.summary}\n\n### La Sfida Aziendale\n${storyInput.challenge}\n\n### L'Intervento di E.M. Safety\n${storyInput.solution}\n\n### Risultati Ottenuti\n${storyInput.results}`,
      createdAt: formattedMonth,
    });
    return newStory as SafetyStory;
  };

  const updateStory = (updatedStory: SafetyStory) => {
    updateContentItem({
      ...updatedStory,
      type: 'story',
      category: updatedStory.sector || updatedStory.category || 'Sicurezza',
    });
  };

  const deleteStory = (storyId: string) => {
    deleteContentItem(storyId);
  };

  const toggleStoryFeatured = (storyId: string) => {
    toggleContentFeatured(storyId);
  };

  // Factory Reset
  const resetAllData = () => {
    localStorage.removeItem(SITE_INFO_KEY);
    localStorage.removeItem(COURSES_KEY);
    localStorage.removeItem(CALENDAR_KEY);
    localStorage.removeItem(LEADS_KEY);
    localStorage.removeItem(STORIES_KEY);
    localStorage.removeItem(CONTENT_ITEMS_KEY);
    setSiteInfo(DEFAULT_SITE_INFO);
    setCourses(COURSES);
    setCalendarEvents(CALENDAR_EVENTS);
    setLeads(INITIAL_LEADS);
    setContentItems(INITIAL_CONTENT_ITEMS);
    notifyAdminUpdate('all_reset', null);
  };

  // Export & Import
  const exportAllData = () => {
    return JSON.stringify(
      {
        siteInfo,
        courses,
        calendarEvents,
        leads,
        stories,
        contentItems,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importAllData = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.siteInfo) {
        localStorage.setItem(SITE_INFO_KEY, JSON.stringify(data.siteInfo));
        setSiteInfo(data.siteInfo);
      }
      if (data.courses) {
        localStorage.setItem(COURSES_KEY, JSON.stringify(data.courses));
        setCourses(data.courses);
      }
      if (data.calendarEvents) {
        localStorage.setItem(CALENDAR_KEY, JSON.stringify(data.calendarEvents));
        setCalendarEvents(data.calendarEvents);
      }
      if (data.leads) {
        localStorage.setItem(LEADS_KEY, JSON.stringify(data.leads));
        setLeads(data.leads);
      }
      if (data.contentItems) {
        localStorage.setItem(CONTENT_ITEMS_KEY, JSON.stringify(data.contentItems));
        setContentItems(data.contentItems);
      } else if (data.stories) {
        localStorage.setItem(STORIES_KEY, JSON.stringify(data.stories));
        setContentItems(data.stories);
      }
      notifyAdminUpdate('all_reset', null);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return {
    siteInfo,
    courses,
    calendarEvents,
    leads,
    stories,
    contentItems,
    articles,
    blogs,
    updateSiteInfo,
    addCourse,
    updateCourse,
    deleteCourse,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    addLead,
    updateLeadStatus,
    deleteLead,
    addContentItem,
    updateContentItem,
    deleteContentItem,
    toggleContentFeatured,
    addStory,
    updateStory,
    deleteStory,
    toggleStoryFeatured,
    resetAllData,
    exportAllData,
    importAllData,
    adminCredentials,
    updateAdminCredentials: (newId: string, newPassword: string): { success: boolean; message: string } => {
      const sanitizedId = (newId || '').trim();
      const sanitizedPassword = (newPassword || '').trim();

      if (!sanitizedId || sanitizedId.length < 3) {
        return { success: false, message: "L'ID Amministratore deve contenere almeno 3 caratteri." };
      }
      if (!sanitizedPassword || sanitizedPassword.length < 4) {
        return { success: false, message: "La password deve contenere almeno 4 caratteri." };
      }

      const updated: AdminCredentials = {
        id: sanitizedId,
        password: sanitizedPassword,
        updatedAt: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };

      setAdminCredentials(updated);
      setAdminCredentialsState(updated);
      return { success: true, message: `Credenziali aggiornate con successo! Nuovo ID: "${sanitizedId}"` };
    },
    resetDefaultCredentials: (): { success: boolean; message: string } => {
      const res = resetAdminCredentials();
      setAdminCredentialsState(res);
      return { success: true, message: 'Credenziali ripristinate ai valori predefiniti: ID "Admin" • Password "admin123"' };
    },
  };
}

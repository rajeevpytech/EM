import { z } from 'zod';

// Phone regex allowing Italian and international numbers (+39, spaces, dashes, etc.)
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{5,18}$/;

/**
 * Zod schema for ContactSection form
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Il nome completo deve contenere almeno 3 caratteri')
    .max(70, 'Il nome non può superare i 70 caratteri')
    .refine((val) => val.split(/\s+/).filter(Boolean).length >= 2, {
      message: 'Inserisci sia nome che cognome (es. Mario Rossi)',
    }),
  company: z
    .string()
    .trim()
    .min(2, 'La ragione sociale deve contenere almeno 2 caratteri')
    .max(100, 'La ragione sociale non può superare i 100 caratteri'),
  email: z
    .string()
    .trim()
    .min(1, "L'email aziendale è obbligatoria")
    .max(100, "L'email non può superare i 100 caratteri")
    .email('Inserisci un indirizzo email valido (es. nome@azienda.it)'),
  phone: z
    .string()
    .trim()
    .min(6, 'Il recapito telefonico deve contenere almeno 6 cifre')
    .max(20, 'Il recapito telefonico non può superare i 20 caratteri')
    .regex(PHONE_REGEX, 'Inserisci un numero di telefono valido (es. +39 02 1234567 o 333 1234567)'),
  interestType: z.string().min(1, 'Seleziona una tipologia di interesse'),
  preferredLocation: z.string().min(1, 'Seleziona una sede di riferimento'),
  message: z
    .string()
    .max(1000, 'Il messaggio non può superare i 1000 caratteri')
    .optional()
    .or(z.literal('')),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: "È obbligatorio accettare l'informativa sulla privacy (GDPR) per procedere",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Zod schema for QuoteModal form
 */
export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Il nome e cognome deve contenere almeno 3 caratteri')
    .max(70, 'Il nome non può superare i 70 caratteri')
    .refine((val) => val.split(/\s+/).filter(Boolean).length >= 2, {
      message: 'Inserisci sia nome che cognome (es. Marco Bianchi)',
    }),
  company: z
    .string()
    .trim()
    .min(2, 'Inserisci la ragione sociale o P.IVA (almeno 2 caratteri)')
    .max(100, 'La ragione sociale non può superare i 100 caratteri'),
  email: z
    .string()
    .trim()
    .min(1, "L'email aziendale è obbligatoria")
    .max(100, "L'email non può superare i 100 caratteri")
    .email('Inserisci un indirizzo email valido (es. preventivi@azienda.it)'),
  phone: z
    .string()
    .trim()
    .min(6, 'Il telefono deve contenere almeno 6 cifre')
    .max(20, 'Il telefono non può superare i 20 caratteri')
    .regex(PHONE_REGEX, 'Inserisci un numero telefonico valido (es. +39 333 9876543)'),
  selectedCity: z.enum(['treviso', 'milano']),
  serviceType: z.string().min(1, 'Seleziona la tipologia di servizio richiesto'),
  notes: z
    .string()
    .max(500, 'Le note aggiuntive non possono superare i 500 caratteri')
    .optional()
    .or(z.literal('')),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: "È obbligatorio accettare l'informativa sulla privacy per ricevere il preventivo",
  }),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

/**
 * Helper to validate a single field against a schema safely for real-time feedback
 */
export function validateSingleField<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  field: keyof T,
  value: unknown,
  entireFormData?: Record<string, unknown>
): string | null {
  try {
    const fieldSchema = schema.shape[field] as unknown as z.ZodTypeAny | undefined;
    if (fieldSchema) {
      const fieldResult = fieldSchema.safeParse(value);
      if (!fieldResult.success) {
        return fieldResult.error.issues[0]?.message || 'Campo non valido';
      }
    }
    // If field passes isolated schema, also test in object context if provided
    if (entireFormData) {
      const partialResult = schema.safeParse({
        ...entireFormData,
        [field]: value,
      });
      if (!partialResult.success) {
        const matchingIssue = partialResult.error.issues.find(
          (issue) => issue.path[0] === field
        );
        if (matchingIssue) {
          return matchingIssue.message;
        }
      }
    }
    return null;
  } catch {
    return 'Valore non valido';
  }
}

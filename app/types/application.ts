/** Modelo de una postulación (Application) para el Application Tracker */
export interface Application {
  id: string
  status: string
  cvId?: string
  jobOfferId: string
  notes?: string
  historyEvents?: Array<{ date: string; event: string }>
  createdAt: string
  updatedAt?: string
  jobOffer?: {
    company: string
    role: string
    sourceUrl?: string
    description?: string
  }
  cv?: {
    name: string
    version?: string
  }
  /** Match % con la oferta (opcional, puede venir del backend más adelante) */
  matchScore?: number
}

export interface ApplicationStats {
  active: number
  interviews: number
  offers: number
  successRatio?: number
}

export interface ApplicationFilters {
  cvId?: string
  company?: string
  status?: string
  from?: string
  to?: string
}

/** Etapas del pipeline (status values) */
export const APPLICATION_STAGES = [
  'guardado',
  'postulado',
  'screening',
  'entrevista',
  'prueba_tecnica',
  'oferta',
  'rechazado',
  'aceptado',
] as const

export type ApplicationStage = (typeof APPLICATION_STAGES)[number]

/** Títulos legibles por etapa */
export const STAGE_TITLES: Record<string, string> = {
  guardado: 'Guardado',
  postulado: 'Postulado',
  screening: 'Screening',
  entrevista: 'Entrevista',
  prueba_tecnica: 'Prueba técnica',
  oferta: 'Oferta',
  rechazado: 'Rechazado',
  aceptado: 'Aceptado',
}

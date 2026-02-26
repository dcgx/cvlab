import type { JobOfferAnalysis } from '../stores/jobOffer'
import { useJobOfferStore } from '../stores/jobOffer'

export interface AnalyzeAndGeneratePayload {
  title: string
  rawText: string
  sourceUrl?: string
}

export interface AnalyzeAndGenerateResult {
  cvId: string
  analysis: JobOfferAnalysis
}

export function useJobOfferAnalyze() {
  const jobOfferStore = useJobOfferStore()

  async function analyzeAndGenerateCv(payload: AnalyzeAndGeneratePayload): Promise<AnalyzeAndGenerateResult> {
    const minLength = 200

    if (!payload.rawText || payload.rawText.trim().length < minLength) {
      const message = 'Necesitamos más detalle de la oferta para adaptarte mejor.'
      jobOfferStore.setError(message)
      throw new Error(message)
    }

    jobOfferStore.setStatus('analyzing')
    jobOfferStore.setError('')

    try {
      // Endpoint a definir por backend; para MVP se puede mockear
      const response = await $fetch<AnalyzeAndGenerateResult>('/api/job-offers/analyze-and-generate-cv', {
        method: 'POST',
        body: payload,
      })

      jobOfferStore.setAnalysis(response.analysis)
      return response
    } catch (error: any) {
      const message =
        (error?.data?.message as string | undefined) ||
        (error?.message as string | undefined) ||
        'No se pudo analizar la oferta. Inténtalo de nuevo.'
      jobOfferStore.setError(message)
      throw new Error(message)
    }
  }

  return {
    analyzeAndGenerateCv,
  }
}


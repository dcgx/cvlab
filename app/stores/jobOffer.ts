import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { JobOfferStatus } from '../types/jobOffer'

export interface JobOfferAnalysis {
  skills: string[]
  technologies: string[]
  seniority?: string
  role?: string
  keywords: string[]
}

export const useJobOfferStore = defineStore('job-offer', () => {
  const id = ref<string | null>(null)
  const title = ref('')
  const rawText = ref('')
  const sourceUrl = ref('')
  const analysis = ref<JobOfferAnalysis | null>(null)
  const status = ref<JobOfferStatus>('idle')
  const errorMessage = ref<string | null>(null)

  function setTitle(value: string) {
    title.value = value
  }

  function setRawText(value: string) {
    rawText.value = value
  }

  function setSourceUrl(value: string) {
    sourceUrl.value = value
  }

  function setAnalysis(value: JobOfferAnalysis) {
    analysis.value = value
    status.value = 'analyzed'
    errorMessage.value = null
  }

  function setStatus(value: JobOfferStatus) {
    status.value = value
  }

  function setError(message: string) {
    status.value = 'error'
    errorMessage.value = message
  }

  function reset() {
    id.value = null
    title.value = ''
    rawText.value = ''
    sourceUrl.value = ''
    analysis.value = null
    status.value = 'idle'
    errorMessage.value = null
  }

  return {
    id,
    title,
    rawText,
    sourceUrl,
    analysis,
    status,
    errorMessage,
    setTitle,
    setRawText,
    setSourceUrl,
    setAnalysis,
    setStatus,
    setError,
    reset,
  }
})


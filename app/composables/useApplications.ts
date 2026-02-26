import type { Application, ApplicationStats } from '~/types/application'

export function useApplications() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase ?? ''

  const fetchList = async (query?: Record<string, string>) => {
    const data = await $fetch<Application[]>(`${base}/applications`, { query })
    return data
  }

  const fetchOne = async (id: string) => {
    return await $fetch<Application>(`${base}/applications/${id}`)
  }

  const updateStatus = async (id: string, status: string) => {
    return await $fetch<Application>(`${base}/applications/${id}`, {
      method: 'PATCH',
      body: { status },
    })
  }

  const updateNotes = async (id: string, notes: string) => {
    return await $fetch<Application>(`${base}/applications/${id}`, {
      method: 'PATCH',
      body: { notes },
    })
  }

  /** Calcula estadísticas desde el listado (si no hay endpoint /stats) */
  const computeStats = (apps: Application[]): ApplicationStats => {
    const active = apps.filter(
      (a) => !['rechazado', 'aceptado'].includes(a.status)
    ).length
    const interviews = apps.filter((a) =>
      ['entrevista', 'prueba_tecnica'].includes(a.status)
    ).length
    const offers = apps.filter((a) => a.status === 'oferta').length
    const accepted = apps.filter((a) => a.status === 'aceptado').length
    const total = apps.length
    const successRatio = total > 0 ? Math.round((accepted / total) * 100) : 0
    return { active, interviews, offers, successRatio }
  }

  return { fetchList, fetchOne, updateStatus, updateNotes, computeStats }
}

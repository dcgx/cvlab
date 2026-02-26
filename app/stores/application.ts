import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Application, ApplicationFilters as Filters, ApplicationStats } from '~/types/application'
import { APPLICATION_STAGES, STAGE_TITLES } from '~/types/application'
import { useApplications } from '~/composables/useApplications'

export const useApplicationStore = defineStore('application', () => {
  const applications = ref<Application[]>([])
  const columns = ref([...APPLICATION_STAGES])
  const selectedApplication = ref<Application | null>(null)
  const filters = ref<Filters>({})
  const stats = ref<ApplicationStats>({ active: 0, interviews: 0, offers: 0 })
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchList, updateStatus, updateNotes } = useApplications()

  const applicationsByStage = computed(() => {
    const byStage: Record<string, Application[]> = {}
    for (const stage of APPLICATION_STAGES) {
      byStage[stage] = applications.value.filter((a) => a.status === stage)
    }
    return byStage
  })

  const columnDefs = computed(() =>
    APPLICATION_STAGES.map((id) => ({ id, title: STAGE_TITLES[id] ?? id }))
  )

  async function fetchApplications() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchList(filters.value as Record<string, string>)
      applications.value = Array.isArray(data) ? data : []
      computeStats()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error al cargar postulaciones'
      error.value = message
      applications.value = []
    } finally {
      loading.value = false
    }
  }

  async function updateApplicationStatus(id: string, status: string) {
    try {
      await updateStatus(id, status)
      const app = applications.value.find((a) => a.id === id)
      if (app) app.status = status
      if (selectedApplication.value?.id === id) selectedApplication.value = { ...selectedApplication.value, status }
      computeStats()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error al actualizar estado'
      error.value = message
      throw e
    }
  }

  function openApplication(app: Application | null) {
    selectedApplication.value = app
  }

  async function addNote(id: string, notes: string) {
    try {
      await updateNotes(id, notes)
      const app = applications.value.find((a) => a.id === id)
      if (app) app.notes = notes
      if (selectedApplication.value?.id === id) selectedApplication.value = { ...selectedApplication.value, notes }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error al guardar notas'
      error.value = message
      throw e
    }
  }

  function computeStats() {
    const list = applications.value
    const active = list.filter((a) => !['rechazado', 'aceptado'].includes(a.status)).length
    const interviews = list.filter((a) =>
      ['screening', 'entrevista', 'prueba_tecnica'].includes(a.status)
    ).length
    const offers = list.filter((a) => a.status === 'oferta').length
    const accepted = list.filter((a) => a.status === 'aceptado').length
    const total = list.length
    stats.value = {
      active,
      interviews,
      offers,
      successRatio: total > 0 ? Math.round((accepted / total) * 100) : 0,
    }
  }

  async function fetchStats() {
    await fetchApplications()
  }

  function setFilters(newFilters: Filters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  return {
    applications,
    columns,
    selectedApplication,
    filters,
    stats,
    loading,
    error,
    applicationsByStage,
    columnDefs,
    fetchApplications,
    updateApplicationStatus,
    openApplication,
    addNote,
    fetchStats,
    setFilters,
    computeStats,
  }
})

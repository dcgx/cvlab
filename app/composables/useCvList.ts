/**
 * Lista de CVs del usuario para el dashboard.
 * Mock en cliente hasta tener API de listado.
 */
export interface CvSummary {
  id: string
  title: string
  updatedAt: string
  thumbnail?: string
}

export function useCvList() {
  const list = ref<CvSummary[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchList() {
    loading.value = true
    error.value = null
    try {
      // TODO: reemplazar por $fetch('/api/cvs') cuando exista backend
      await new Promise((r) => setTimeout(r, 300))
      list.value = []
    } catch (e) {
      error.value = 'No se pudo cargar la lista'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchList())
  return { list, loading, error, refresh: fetchList }
}

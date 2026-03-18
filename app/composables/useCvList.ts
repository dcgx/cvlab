/**
 * Lista de CVs del usuario para el dashboard.
 * Conectado al backend API.
 */
export interface CvSummary {
  id: string
  title: string
  updatedAt: string
  thumbnail?: string
  /** Si existe, este CV fue generado como adaptado a una oferta (mostrar etiqueta "CV adaptado") */
  adaptedFromOffer?: string
}

export function useCvList() {
  const list = ref<CvSummary[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { fetchList: fetchFromApi } = useCvApi()

  async function fetchList() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchFromApi()
      list.value = Array.isArray(data)
        ? data.map((c) => ({
            id: c.id,
            title: c.title,
            updatedAt: c.updatedAt ?? '',
          }))
        : []
    } catch (_e) {
      error.value = 'No se pudo cargar la lista'
      list.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchList())
  return { list, loading, error, refresh: fetchList }
}

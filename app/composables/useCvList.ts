/**
 * Lista de CVs del usuario para el dashboard.
 * Para MVP, lee el draft guardado en localStorage
 * (clave usada por el store: 'cvlab-cv-draft').
 */
export interface CvSummary {
  id: string
  title: string
  updatedAt: string
  thumbnail?: string
}

const LOCAL_STORAGE_KEY = 'cvlab-cv-draft'

export function useCvList() {
  const list = ref<CvSummary[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchList() {
    loading.value = true
    error.value = null
    try {
      // MVP: fuente localStorage hasta tener backend
      if (import.meta.client) {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (raw) {
          const data = JSON.parse(raw) as any
          const id = typeof data.id === 'string' && data.id ? data.id : 'local'
          const title =
            (data.professionalTitle as string | undefined) ||
            (data.position as string | undefined) ||
            'CV Maestro'
          const updatedAt = (data.updatedAt as string | undefined) || ''

          list.value = [
            {
              id,
              title,
              updatedAt,
            },
          ]
        } else {
          list.value = []
        }
      } else {
        list.value = []
      }
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

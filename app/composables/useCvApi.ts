/**
 * Composable para llamadas API de CV contra el backend.
 * Incluye token de Supabase si hay sesión.
 */
export function useCvApi() {
  const { fetch } = useApiFetch()

  const fetchList = async () => {
    return await fetch<Array<{ id: string; title: string; updatedAt: string }>>('/cvs')
  }

  const fetchOne = async (id: string) => {
    return await fetch<Record<string, unknown>>(`/cvs/${id}`)
  }

  const create = async (body: Record<string, unknown>) => {
    return await fetch<Record<string, unknown>>('/cvs', { method: 'POST', body })
  }

  const update = async (id: string, body: Record<string, unknown>) => {
    return await fetch<Record<string, unknown>>(`/cvs/${id}`, { method: 'PATCH', body })
  }

  const remove = async (id: string) => {
    return await fetch(`/cvs/${id}`, { method: 'DELETE' })
  }

  return { fetchList, fetchOne, create, update, remove }
}

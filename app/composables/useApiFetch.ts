/**
 * $fetch con Authorization Bearer si hay sesión de Supabase.
 * Usar para todas las llamadas al backend API.
 */
export function useApiFetch() {
  const config = useRuntimeConfig()
  const base = (config.public.apiBase as string) ?? ''
  const supabase = useNuxtApp().$supabase as { auth: { getSession: () => Promise<{ data: { session: { access_token?: string } | null } }> } } | null

  async function getToken(): Promise<string | null> {
    if (!supabase?.auth) return null
    try {
      const { data } = await supabase.auth.getSession()
      return data.session?.access_token ?? null
    } catch {
      return null
    }
  }

  async function fetch<T>(
    path: string,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`
    const token = await getToken()
    const headers: Record<string, string> = { ...((options.headers as Record<string, string>) ?? {}) }
    if (token) headers.Authorization = `Bearer ${token}`
    return $fetch<T>(url, { ...options, headers })
  }

  return { fetch, getToken }
}

import { ref, computed } from 'vue'
import type { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const supabase = useSupabaseClient()
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)

  const isAuthenticated = computed(() => !!session.value?.access_token)

  async function init() {
    if (!supabase) return
    const { data: { session: s } } = await supabase.auth.getSession()
    session.value = s
    user.value = s?.user ?? null

    supabase.auth.onAuthStateChange((_event, s) => {
      session.value = s
      user.value = s?.user ?? null
    })
  }

  async function signIn(email: string, password: string) {
    if (!supabase) throw new Error('Supabase no configurado')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signUp(email: string, password: string, options?: { name?: string }) {
    if (!supabase) throw new Error('Supabase no configurado')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: options?.name ? { full_name: options.name } : undefined },
    })
    if (error) throw error
    return data
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    session.value = null
    user.value = null
  }

  function getAccessToken(): string | null {
    return session.value?.access_token ?? null
  }

  return {
    user,
    session,
    isAuthenticated,
    init,
    signIn,
    signUp,
    signOut,
    getAccessToken,
  }
}

export function useSupabaseClient() {
  const supabase = useNuxtApp().$supabase as ReturnType<typeof import('@supabase/supabase-js').createClient> | null
  return supabase
}

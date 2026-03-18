import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseAnonKey = config.public.supabaseAnonKey as string

  if (!supabaseUrl || !supabaseAnonKey) {
    return { provide: { supabase: null } }
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  return { provide: { supabase } }
})

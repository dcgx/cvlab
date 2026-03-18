/**
 * Middleware de autenticación para rutas /dashboard/*.
 * Cuando exista login, redirigir aquí si el usuario no está autenticado.
 */
export default defineNuxtRouteMiddleware(async () => {
  const supabase = useNuxtApp().$supabase
  if (!supabase) return // Sin Supabase configurado: permitir acceso (modo dev con usuario por defecto)

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return navigateTo('/login')
  }
})

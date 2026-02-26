/**
 * Middleware de autenticación para rutas /dashboard/*.
 * Cuando exista login, redirigir aquí si el usuario no está autenticado.
 */
export default defineNuxtRouteMiddleware(() => {
  // TODO: comprobar token/sesión y redirigir a /login si no autenticado
  // const { isAuthenticated } = useAuth()
  // if (!isAuthenticated.value) return navigateTo('/login')
})

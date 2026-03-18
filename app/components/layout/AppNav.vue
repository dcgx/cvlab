<script setup lang="ts">
// Navegación principal: Dashboard, Crear CV, Biblioteca (estilo Vercel)
const route = useRoute()
const auth = useAuth()
const supabase = useNuxtApp().$supabase

onMounted(() => auth.init())

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/crear-cv', label: 'Crear CV' },
  { to: '/job-offers/new', label: 'CV desde oferta' },
  { to: '/dashboard/applications', label: 'Postulaciones' },
  { to: '/biblioteca', label: 'Biblioteca' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

async function handleSignOut() {
  await auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <header class="bg-surface border-b border-gray-200">
    <nav class="w-full max-w-content mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-primary transition duration-200"
        >
          <span>CVLab</span>
        </NuxtLink>
        <ul class="flex items-center gap-1 sm:gap-2">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm font-medium rounded-lg px-3 py-2 transition duration-200"
              :class="isActive(link.to)
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
          <li v-if="supabase" class="ml-2">
            <NuxtLink
              v-if="!auth.isAuthenticated"
              to="/login"
              class="text-sm font-medium rounded-lg px-3 py-2 text-indigo-600 hover:bg-indigo-50"
            >
              Entrar
            </NuxtLink>
            <button
              v-else
              type="button"
              class="text-sm font-medium rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
              @click="handleSignOut"
            >
              Salir
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

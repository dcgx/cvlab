<script setup lang="ts">
// Navegación principal: Dashboard, Crear CV, Biblioteca (estilo Vercel)
const route = useRoute()

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/crear-cv', label: 'Crear CV' },
  { to: '/biblioteca', label: 'Biblioteca' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
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
        </ul>
      </div>
    </nav>
  </header>
</template>

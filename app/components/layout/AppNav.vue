<script setup lang="ts">
// Navegación principal: Dashboard, Crear CV, Biblioteca
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
  <header class="bg-secondary text-white shadow">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-lg font-heading font-bold text-white hover:opacity-90"
        >
          <span>CVLab</span>
        </NuxtLink>
        <ul class="flex items-center gap-4 sm:gap-6">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm font-body font-medium transition rounded-md px-3 py-2"
              :class="isActive(link.to) ? 'bg-white bg-opacity-20 text-white' : 'text-white opacity-90 hover:bg-white hover:bg-opacity-10'"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

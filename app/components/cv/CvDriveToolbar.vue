<script setup lang="ts">
// Barra del dashboard: título y acción Nuevo CV (estilo Vercel)
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-semibold text-gray-900">
      Mis CVs
    </h1>
    <div class="flex items-center gap-2">
      <NuxtLink
        to="/job-offers/new"
        class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Generar CV desde oferta
      </NuxtLink>
      <NuxtLink
        to="/crear-cv"
        class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium bg-primary text-white hover:opacity-90 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Nuevo CV
      </NuxtLink>
    </div>
  </div>
</template>

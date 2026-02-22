<script setup lang="ts">
// Barra del dashboard: título y acción Nuevo CV
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="font-heading text-2xl text-secondary">
      Mis CVs
    </h1>
    <NuxtLink
      to="/crear-cv"
      class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium transition"
    >
      Nuevo CV
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'CV adaptado a oferta - CVLab',
  description: 'Genera un CV adaptado pegando una oferta de trabajo.',
})
</script>

<template>
  <ClientOnly>
    <JobOfferCreateView />
    <template #fallback>
      <div class="flex min-h-[40vh] items-center justify-center text-gray-500">
        Cargando...
      </div>
    </template>
  </ClientOnly>
</template>


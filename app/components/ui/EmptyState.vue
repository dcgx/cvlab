<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  actionLabel?: string
  /** Ruta del CTA. Por defecto /crear-cv */
  actionTo?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Aún no tienes CVs',
  description: 'Crea tu primer CV para empezar.',
  actionLabel: 'Crear mi primer CV',
  actionTo: '/crear-cv',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <h2 class="text-2xl font-semibold text-gray-900">
      {{ title }}
    </h2>
    <p class="mt-2 text-base text-gray-500 max-w-sm">
      {{ description }}
    </p>
    <NuxtLink
      :to="actionTo"
      class="mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium bg-primary text-white hover:opacity-90 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {{ actionLabel }}
    </NuxtLink>
  </div>
</template>

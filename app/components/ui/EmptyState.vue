<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  actionLabel?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Aún no tienes CVs',
  description: 'Crea tu primer CV para empezar.',
  actionLabel: 'Crear CV',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <p class="font-heading text-xl text-secondary">
      {{ title }}
    </p>
    <p class="mt-2 text-body text-gray-600">
      {{ description }}
    </p>
    <NuxtLink
      to="/crear-cv"
      class="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition"
    >
      {{ actionLabel }}
    </NuxtLink>
  </div>
</template>

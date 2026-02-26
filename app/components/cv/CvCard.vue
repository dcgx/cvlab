<script setup lang="ts">
import type { CvSummary } from '~/composables/useCvList'

interface Props {
  cv: CvSummary
  layout?: 'grid' | 'list'
}

withDefaults(defineProps<Props>(), { layout: 'grid' })

const emit = defineEmits<{
  (e: 'open', id: string): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <div
    class="rounded-xl border border-gray-200 bg-surface p-4 transition duration-200 hover:border-gray-300 cursor-pointer flex flex-col gap-3"
    :class="layout === 'list' ? 'sm:flex-row sm:items-center' : ''"
    @click="emit('open', cv.id)"
  >
    <div v-if="cv.thumbnail" class="shrink-0 w-12 h-12 rounded overflow-hidden bg-gray-100">
      <img :src="cv.thumbnail" :alt="cv.title" class="w-full h-full object-cover">
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 flex-wrap">
        <h3 class="font-medium text-gray-900 truncate">
          {{ cv.title }}
        </h3>
        <span
          v-if="cv.adaptedFromOffer"
          class="shrink-0 inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
        >
          CV adaptado
        </span>
      </div>
      <p class="text-sm text-gray-500 mt-0.5">
        {{ cv.updatedAt }}
      </p>
    </div>
    <div class="flex gap-2 shrink-0" @click.stop>
      <UiButton
        variant="primary"
        @click="emit('open', cv.id)"
      >
        Abrir
      </UiButton>
      <UiButton
        variant="secondary"
        @click="emit('delete', cv.id)"
      >
        Eliminar
      </UiButton>
    </div>
  </div>
</template>

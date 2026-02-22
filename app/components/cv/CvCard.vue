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
    class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col gap-3"
    :class="layout === 'list' ? 'sm:flex-row sm:items-center' : ''"
    @click="emit('open', cv.id)"
  >
    <div v-if="cv.thumbnail" class="shrink-0 w-12 h-12 rounded overflow-hidden bg-gray-100">
      <img :src="cv.thumbnail" :alt="cv.title" class="w-full h-full object-cover">
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="font-medium text-secondary truncate">
        {{ cv.title }}
      </h3>
      <p class="text-sm text-gray-500 mt-0.5">
        {{ cv.updatedAt }}
      </p>
    </div>
    <div class="flex gap-2 shrink-0" @click.stop>
      <button
        type="button"
        class="px-3 py-1.5 text-sm rounded bg-secondary text-white hover:bg-secondary/90 transition"
        @click="emit('open', cv.id)"
      >
        Abrir
      </button>
      <button
        type="button"
        class="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        @click="emit('delete', cv.id)"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Application } from '~/types/application'

interface Props {
  application: Application
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'click', application: Application): void
}>()

function formatDate(value: string | undefined) {
  if (!value) return '—'
  try {
    const d = new Date(value)
    return d.toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return value
  }
}

function onDragStart(e: DragEvent, application: Application) {
  if (!e.dataTransfer) return
  e.dataTransfer.setData('application/id', application.id)
  e.dataTransfer.setData('application/status', application.status)
  e.dataTransfer.effectAllowed = 'move'
}
</script>

<template>
  <div
    class="application-card rounded-lg border border-gray-200 bg-white p-3 cursor-pointer transition hover:border-primary/50 hover:shadow-sm"
    draggable="true"
    @click="emit('click', application)"
    @dragstart="onDragStart($event, application)"
  >
    <p class="font-medium text-gray-900">
      {{ application.jobOffer?.company ?? 'Sin empresa' }} – {{ application.jobOffer?.role ?? 'Sin cargo' }}
    </p>
    <p class="text-gray-600 text-sm mt-0.5">
      CV: {{ application.cv?.name ?? '—' }}
    </p>
    <p v-if="application.matchScore != null" class="text-primary text-xs font-medium mt-1">
      Match: {{ application.matchScore }}%
    </p>
    <p class="text-gray-500 text-xs mt-1">
      {{ formatDate(application.updatedAt ?? application.createdAt) }}
    </p>
  </div>
</template>

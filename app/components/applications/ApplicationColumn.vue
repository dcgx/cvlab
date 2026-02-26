<script setup lang="ts">
import type { Application } from '~/types/application'

interface Props {
  stage: string
  title: string
  applications: Application[]
  loading?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', application: Application): void
  (e: 'drop', applicationId: string, fromStatus: string, toStatus: string): void
}>()

function onDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
}

function onDrop(e: DragEvent, toStatus: string) {
  e.preventDefault()
  const id = e.dataTransfer?.getData('application/id')
  const fromStatus = e.dataTransfer?.getData('application/status')
  if (id && fromStatus && fromStatus !== toStatus) {
    emit('drop', id, fromStatus, toStatus)
  }
}
</script>

<template>
  <div
    class="application-column rounded-lg border border-gray-200 bg-gray-50/80 p-3 min-w-[280px] flex flex-col"
    :data-stage="stage"
    @dragover="onDragOver"
    @drop="onDrop($event, stage)"
  >
    <div class="flex justify-between items-center mb-3">
      <h3 class="font-medium text-gray-900">
        {{ title }}
      </h3>
      <span class="text-gray-500 text-sm">
        {{ applications.length }}
      </span>
    </div>
    <div class="space-y-2 flex-1 min-h-[80px]">
      <ApplicationsApplicationCard
        v-for="app in applications"
        :key="app.id"
        :application="app"
        @click="(application) => emit('select', application)"
      />
    </div>
  </div>
</template>

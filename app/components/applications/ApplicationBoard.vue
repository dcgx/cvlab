<script setup lang="ts">
import { useApplicationStore } from '~/stores/application'

const applicationStore = useApplicationStore()

function applicationsByStage(stageId: string) {
  return applicationStore.applicationsByStage[stageId] ?? []
}

function onDrop(applicationId: string, targetStage: string) {
  applicationStore.updateApplicationStatus(applicationId, targetStage)
}
</script>

<template>
  <div class="application-board flex gap-4 overflow-x-auto pb-4 min-h-[320px]">
    <ApplicationsApplicationColumn
      v-for="col in applicationStore.columnDefs"
      :key="col.id"
      :stage="col.id"
      :title="col.title"
      :applications="applicationsByStage(col.id)"
      :loading="applicationStore.loading"
      @drop="(id) => onDrop(id, col.id)"
      @select="applicationStore.openApplication"
    />
  </div>
</template>

<script setup lang="ts">
import { useApplicationStore } from '~/stores/application'

const applicationStore = useApplicationStore()

const stats = computed(() => applicationStore.stats)
</script>

<template>
  <div class="application-stats-bar flex flex-wrap gap-6 py-3 px-4 rounded-lg border border-gray-200 bg-surface">
    <div class="flex items-center gap-2">
      <span class="text-gray-500 text-sm">Activas</span>
      <span class="font-semibold text-gray-900">{{ stats.active }}</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-gray-500 text-sm">Entrevistas</span>
      <span class="font-semibold text-gray-900">{{ stats.interviews }}</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-gray-500 text-sm">Ofertas</span>
      <span class="font-semibold text-primary">{{ stats.offers }}</span>
    </div>
    <div v-if="stats.successRatio != null" class="flex items-center gap-2">
      <span class="text-gray-500 text-sm">Ratio éxito</span>
      <span class="font-semibold text-gray-900">{{ stats.successRatio }}%</span>
    </div>
  </div>
</template>

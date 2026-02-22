<script setup lang="ts">
interface Props {
  percentage: number
}

defineProps<Props>()
</script>

<template>
  <div class="cv-progress">
    <div class="flex items-center justify-between mb-1">
      <span class="text-sm font-medium text-secondary">{{ percentage }} % Progreso</span>
    </div>
    <div class="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
      <div
        class="h-full rounded-full bg-black transition-all duration-300"
        :style="{ width: `${Math.min(100, Math.max(0, percentage))}%` }"
      />
    </div>
  </div>
</template>

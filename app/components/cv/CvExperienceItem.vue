<script setup lang="ts">
import type { ExperienceItem } from '~/stores/cv'

interface Props {
  experience: ExperienceItem
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update', payload: Partial<ExperienceItem>): void
  (e: 'remove'): void
}>()

function inputValue(e: Event): string {
  return (e.target as HTMLInputElement | HTMLTextAreaElement).value
}

function emitUpdate(field: keyof Omit<ExperienceItem, 'id'>, e: Event) {
  emit('update', { [field]: inputValue(e) })
}
</script>

<template>
  <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3">
    <div>
      <label :for="`exp-title-${experience.id}`" class="block text-sm font-medium text-secondary mb-1">
        Puesto / Cargo
      </label>
      <input
        :id="`exp-title-${experience.id}`"
        type="text"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="experience.title"
        placeholder="Ej. Gerente de Proyectos"
        @input="emitUpdate('title', $event)"
      >
    </div>
    <div>
      <label :for="`exp-company-${experience.id}`" class="block text-sm font-medium text-secondary mb-1">
        Empresa
      </label>
      <input
        :id="`exp-company-${experience.id}`"
        type="text"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="experience.company"
        placeholder="Ej. Empresa Ejemplo S.A."
        @input="emitUpdate('company', $event)"
      >
    </div>
    <div>
      <label :for="`exp-period-${experience.id}`" class="block text-sm font-medium text-secondary mb-1">
        Período
      </label>
      <input
        :id="`exp-period-${experience.id}`"
        type="text"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="experience.period"
        placeholder="Ej. 2020 - Actualidad"
        @input="emitUpdate('period', $event)"
      >
    </div>
    <div>
      <label :for="`exp-desc-${experience.id}`" class="block text-sm font-medium text-secondary mb-1">
        Descripción
      </label>
      <textarea
        :id="`exp-desc-${experience.id}`"
        class="w-full rounded-lg border border-gray-300 p-2 min-h-[80px]"
        :value="experience.description"
        placeholder="Descripción y logros principales."
        rows="3"
        @input="emitUpdate('description', $event)"
      />
    </div>
    <button
      type="button"
      class="text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-100"
      @click="emit('remove')"
    >
      Eliminar
    </button>
  </div>
</template>

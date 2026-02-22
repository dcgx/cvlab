<script setup lang="ts">
import type { ExperienceItem } from '~/stores/cv'

interface Props {
  experience: ExperienceItem
}

const props = defineProps<Props>()
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

function addAchievement() {
  const list = [...(props.experience.achievements ?? []), '']
  emit('update', { achievements: list })
}

function updateAchievement(index: number, value: string) {
  const list = [...(props.experience.achievements ?? [])]
  list[index] = value
  emit('update', { achievements: list })
}

function removeAchievement(index: number) {
  const list = (props.experience.achievements ?? []).filter((_, i) => i !== index)
  emit('update', { achievements: list })
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
        placeholder="Descripción del rol."
        rows="3"
        @input="emitUpdate('description', $event)"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-secondary mb-1">Logros (ítems separados)</label>
      <div class="space-y-2">
        <div
          v-for="(item, idx) in (experience.achievements ?? [])"
          :key="idx"
          class="flex gap-2 items-center"
        >
          <input
            type="text"
            class="flex-1 rounded-lg border border-gray-300 p-2 text-sm"
            :value="item"
            placeholder="Ej. Reducción de costos en 20%"
            @input="updateAchievement(idx, ($event.target as HTMLInputElement).value)"
          >
          <button
            type="button"
            class="text-gray-500 hover:text-red-600 shrink-0"
            @click="removeAchievement(idx)"
          >
            ×
          </button>
        </div>
        <button
          type="button"
          class="text-sm text-primary hover:underline"
          @click="addAchievement"
        >
          + Agregar logro
        </button>
      </div>
    </div>
    <div>
      <label :for="`exp-tech-${experience.id}`" class="block text-sm font-medium text-secondary mb-1">
        Tecnologías usadas
      </label>
      <input
        :id="`exp-tech-${experience.id}`"
        type="text"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="(experience.technologies ?? []).join(', ')"
        placeholder="Vue, TypeScript, Node.js"
        @input="emit('update', { technologies: ($event.target as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean) })"
      >
    </div>
    <button
      type="button"
      class="text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-100"
      @click="emit('remove')"
    >
      Eliminar experiencia
    </button>
  </div>
</template>

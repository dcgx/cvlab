<script setup lang="ts">
import type { SkillCategory } from '~/stores/cv'

interface Props {
  modelValue: string[]
  category: SkillCategory
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), { placeholder: 'Añadir skill' })
const emit = defineEmits<{ (e: 'update:modelValue', v: string[]): void }>()

const input = ref('')
const suggestions = ['Vue', 'React', 'TypeScript', 'Node.js', 'NestJS', 'Docker', 'Scrum', 'Liderazgo', 'Comunicación']

function addTag() {
  const name = input.value.trim()
  if (!name) return
  const current = [...(props.modelValue ?? [])]
  if (current.includes(name)) return
  emit('update:modelValue', [...current, name])
  input.value = ''
}

function removeTag(name: string) {
  emit('update:modelValue', (props.modelValue ?? []).filter((s) => s !== name))
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    addTag()
  }
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap gap-2 rounded-lg border border-gray-300 p-2 bg-white min-h-[42px]">
      <span
        v-for="tag in (modelValue ?? [])"
        :key="tag"
        class="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm"
      >
        {{ tag }}
        <button
          type="button"
          class="text-gray-500 hover:text-red-600 leading-none"
          @click="removeTag(tag)"
        >
          ×
        </button>
      </span>
      <input
        v-model="input"
        type="text"
        class="flex-1 min-w-[120px] border-0 p-1 text-sm focus:ring-0 focus:outline-none"
        :placeholder="placeholder"
        @keydown="onKeydown"
        @blur="addTag"
      >
    </div>
    <p class="text-xs text-gray-500">
      Sugerencias: {{ suggestions.slice(0, 5).join(', ') }}. Escribe y pulsa Enter o coma.
    </p>
  </div>
</template>

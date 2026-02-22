<script setup lang="ts">
interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const placeholder =
  'Gerente de proyectos con más de 5 años de experiencia en busca de una nueva oportunidad.'

function onHelp() {
  // Solo UI por ahora
}

function onImproveAi() {
  // Solo UI por ahora
}
</script>

<template>
  <div class="profile-block">
    <label class="block text-sm font-medium text-secondary mb-2">
      Breve párrafo en la parte superior de tu CV que resuma tu experiencia y cualificaciones relevantes de 4 a 6 líneas.
    </label>
    <textarea
      class="w-full rounded-lg border border-gray-300 p-3 min-h-[120px]"
      :placeholder="placeholder"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <div class="flex gap-2 mt-2">
      <button
        type="button"
        class="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
        @click="onHelp"
      >
        Recibe ayuda en tu redacción
      </button>
      <button
        type="button"
        class="px-3 py-1.5 text-sm rounded bg-black text-white hover:bg-gray-800"
        @click="onImproveAi"
      >
        Mejorar con IA
      </button>
    </div>
  </div>
</template>

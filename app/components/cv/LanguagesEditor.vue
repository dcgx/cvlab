<script setup lang="ts">
const cv = useCvStore()

function inputValue(e: Event): string {
  return (e.target as HTMLInputElement).value
}

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Nativo']
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-heading text-xl text-secondary">
      Idiomas
    </h2>
    <p class="text-sm text-gray-600">
      Idioma y nivel (ej. B2, Nativo).
    </p>
    <div class="space-y-4">
      <div
        v-for="lang in cv.languages"
        :key="lang.id"
        class="rounded-lg border border-gray-200 bg-gray-50 p-4 flex flex-wrap gap-4 items-end"
      >
        <div class="flex-1 min-w-[140px]">
          <label :for="`lang-name-${lang.id}`" class="block text-sm font-medium text-secondary mb-1">Idioma</label>
          <input
            :id="`lang-name-${lang.id}`"
            type="text"
            class="w-full rounded-lg border border-gray-300 p-2"
            :value="lang.name"
            placeholder="Inglés"
            @input="cv.updateLanguage(lang.id, { name: inputValue($event) })"
          >
        </div>
        <div class="w-32">
          <label :for="`lang-level-${lang.id}`" class="block text-sm font-medium text-secondary mb-1">Nivel</label>
          <select
            :id="`lang-level-${lang.id}`"
            class="w-full rounded-lg border border-gray-300 p-2"
            :value="lang.level"
            @change="cv.updateLanguage(lang.id, { level: ($event.target as HTMLSelectElement).value })"
          >
            <option value="">
              —
            </option>
            <option v-for="l in levels" :key="l" :value="l">
              {{ l }}
            </option>
          </select>
        </div>
        <button
          type="button"
          class="text-sm text-gray-600 hover:text-red-600"
          @click="cv.removeLanguage(lang.id)"
        >
          Eliminar
        </button>
      </div>
    </div>
    <button
      type="button"
      class="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition text-sm font-medium"
      @click="cv.addLanguage()"
    >
      + Agregar idioma
    </button>
  </div>
</template>

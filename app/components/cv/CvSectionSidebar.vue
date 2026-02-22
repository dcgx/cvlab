<script setup lang="ts">
const sections = [
  { id: 'profile', label: 'Perfil' },
  { id: 'summary', label: 'Resumen' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Educación' },
  { id: 'certifications', label: 'Certificaciones' },
  { id: 'languages', label: 'Idiomas' },
  { id: 'preview', label: 'Vista previa' },
]

const activeSection = defineModel<string>({ required: true })
const cv = useCvStore()
</script>

<template>
  <nav class="sidebar w-full lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white p-4">
    <ul class="flex flex-wrap gap-1 lg:flex-col lg:flex-nowrap lg:space-y-1">
      <li v-for="s in sections" :key="s.id" class="lg:w-full">
        <button
          type="button"
          class="w-full text-left px-3 py-2 rounded-lg text-sm transition"
          :class="activeSection === s.id ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'"
          @click="activeSection = s.id"
        >
          {{ s.label }}
        </button>
      </li>
    </ul>
    <div class="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
      <span v-if="cv.autosaveStatus === 'saving'">Guardando…</span>
      <span v-else-if="cv.autosaveStatus === 'saved'">Guardado</span>
      <span v-else-if="cv.autosaveStatus === 'error'">Error al guardar</span>
      <span v-else>—</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
const cv = useCvStore()
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-heading text-xl text-secondary">
      Experiencia laboral
    </h2>
    <p class="text-sm text-gray-600">
      Añade cada puesto con empresa, período, descripción, logros (como ítems) y tecnologías usadas.
    </p>
    <div class="space-y-4">
      <CvExperienceItem
        v-for="exp in cv.experiences"
        :key="exp.id"
        :experience="exp"
        @update="(payload) => cv.updateExperience(exp.id, payload)"
        @remove="cv.removeExperience(exp.id)"
      />
    </div>
    <button
      type="button"
      class="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition text-sm font-medium"
      @click="cv.addExperience()"
    >
      + Agregar experiencia
    </button>
  </div>
</template>

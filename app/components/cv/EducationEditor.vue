<script setup lang="ts">
const cv = useCvStore()

function inputValue(e: Event): string {
  return (e.target as HTMLInputElement).value
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-heading text-xl text-secondary">
      Educación
    </h2>
    <p class="text-sm text-gray-600">
      Institución, título y año o período.
    </p>
    <div class="space-y-4">
      <div
        v-for="edu in cv.educations"
        :key="edu.id"
        class="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3"
      >
        <div>
          <label :for="`edu-institution-${edu.id}`" class="block text-sm font-medium text-secondary mb-1">Institución</label>
          <input
            :id="`edu-institution-${edu.id}`"
            type="text"
            class="w-full rounded-lg border border-gray-300 p-2"
            :value="edu.institution"
            @input="cv.updateEducation(edu.id, { institution: inputValue($event) })"
          >
        </div>
        <div>
          <label :for="`edu-degree-${edu.id}`" class="block text-sm font-medium text-secondary mb-1">Título</label>
          <input
            :id="`edu-degree-${edu.id}`"
            type="text"
            class="w-full rounded-lg border border-gray-300 p-2"
            :value="edu.degree"
            @input="cv.updateEducation(edu.id, { degree: inputValue($event) })"
          >
        </div>
        <div>
          <label :for="`edu-period-${edu.id}`" class="block text-sm font-medium text-secondary mb-1">Año / Período</label>
          <input
            :id="`edu-period-${edu.id}`"
            type="text"
            class="w-full rounded-lg border border-gray-300 p-2"
            :value="edu.period"
            placeholder="2015 - 2019"
            @input="cv.updateEducation(edu.id, { period: inputValue($event) })"
          >
        </div>
        <button
          type="button"
          class="text-sm text-gray-600 hover:text-red-600"
          @click="cv.removeEducation(edu.id)"
        >
          Eliminar
        </button>
      </div>
    </div>
    <button
      type="button"
      class="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition text-sm font-medium"
      @click="cv.addEducation()"
    >
      + Agregar educación
    </button>
  </div>
</template>

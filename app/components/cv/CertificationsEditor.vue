<script setup lang="ts">
const cv = useCvStore()

function inputValue(e: Event): string {
  return (e.target as HTMLInputElement).value
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-heading text-xl text-secondary">
      Certificaciones
    </h2>
    <p class="text-sm text-gray-600">
      Opcional. Nombre, emisor y año.
    </p>
    <div class="space-y-4">
      <div
        v-for="cert in cv.certifications"
        :key="cert.id"
        class="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3"
      >
        <div>
          <label :for="`cert-name-${cert.id}`" class="block text-sm font-medium text-secondary mb-1">Nombre</label>
          <input
            :id="`cert-name-${cert.id}`"
            type="text"
            class="w-full rounded-lg border border-gray-300 p-2"
            :value="cert.name"
            @input="cv.updateCertification(cert.id, { name: inputValue($event) })"
          >
        </div>
        <div>
          <label :for="`cert-issuer-${cert.id}`" class="block text-sm font-medium text-secondary mb-1">Emisor</label>
          <input
            :id="`cert-issuer-${cert.id}`"
            type="text"
            class="w-full rounded-lg border border-gray-300 p-2"
            :value="cert.issuer"
            @input="cv.updateCertification(cert.id, { issuer: inputValue($event) })"
          >
        </div>
        <div>
          <label :for="`cert-year-${cert.id}`" class="block text-sm font-medium text-secondary mb-1">Año</label>
          <input
            :id="`cert-year-${cert.id}`"
            type="text"
            class="w-full rounded-lg border border-gray-300 p-2"
            :value="cert.year"
            @input="cv.updateCertification(cert.id, { year: inputValue($event) })"
          >
        </div>
        <button
          type="button"
          class="text-sm text-gray-600 hover:text-red-600"
          @click="cv.removeCertification(cert.id)"
        >
          Eliminar
        </button>
      </div>
    </div>
    <button
      type="button"
      class="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition text-sm font-medium"
      @click="cv.addCertification()"
    >
      + Agregar certificación
    </button>
  </div>
</template>

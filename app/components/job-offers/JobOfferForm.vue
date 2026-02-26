<script setup lang="ts">
import { useJobOfferStore } from '../../stores/jobOffer'

const jobOfferStore = useJobOfferStore()

const emit = defineEmits<{
  (e: 'submit'): void
}>()

function handleSubmit(event: Event) {
  event.preventDefault()
  emit('submit')
}
</script>

<template>
  <form class="space-y-6" @submit="handleSubmit">
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Título de la oportunidad
      </label>
      <input
        v-model="jobOfferStore.title"
        type="text"
        class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Backend Engineer – Acme"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        Oferta de trabajo
      </label>
      <p class="mt-1 text-xs text-gray-500">
        Pega aquí la descripción completa de la oferta (responsabilidades, requisitos, nice-to-have). Cuanto más detalle, mejor adaptaremos tu CV.
      </p>
      <textarea
        v-model="jobOfferStore.rawText"
        rows="10"
        class="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Pega aquí el texto completo de la oferta..."
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        URL de la oferta (opcional)
      </label>
      <input
        v-model="jobOfferStore.sourceUrl"
        type="url"
        class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="https://empresa.com/oferta/backend-engineer"
      >
    </div>

    <p class="text-xs text-gray-500">
      Se creará un <strong>CV adaptado</strong> a esta oferta. Tu CV Maestro no se modifica.
    </p>
    <div class="pt-2">
      <UiButton
        :disabled="jobOfferStore.status === 'analyzing'"
        type="submit"
        variant="primary"
      >
        <span v-if="jobOfferStore.status === 'analyzing'">
          Generando CV adaptado...
        </span>
        <span v-else>
          Generar CV adaptado
        </span>
      </UiButton>
    </div>
  </form>
</template>


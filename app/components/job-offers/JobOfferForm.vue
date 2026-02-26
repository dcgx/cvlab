<script setup lang="ts">
import { useJobOfferStore } from '~/stores/jobOffer'

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
        :value="jobOfferStore.title"
        type="text"
        class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Backend Engineer – Acme"
        @input="jobOfferStore.setTitle(($event.target as HTMLInputElement).value)"
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
        :value="jobOfferStore.rawText"
        rows="10"
        class="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Pega aquí el texto completo de la oferta..."
        @input="jobOfferStore.setRawText(($event.target as HTMLTextAreaElement).value)"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        URL de la oferta (opcional)
      </label>
      <input
        :value="jobOfferStore.sourceUrl"
        type="url"
        class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="https://empresa.com/oferta/backend-engineer"
        @input="jobOfferStore.setSourceUrl(($event.target as HTMLInputElement).value)"
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


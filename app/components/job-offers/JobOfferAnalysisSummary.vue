<script setup lang="ts">
import { useJobOfferStore } from '../../stores/jobOffer'

const jobOfferStore = useJobOfferStore()
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-surface p-4">
    <h2 class="text-sm font-medium text-gray-700">
      Cómo adaptaremos tu CV a esta oferta
    </h2>

    <p v-if="jobOfferStore.status === 'idle' && !jobOfferStore.analysis" class="mt-2 text-sm text-gray-500">
      Tras generar tu <strong>CV adaptado</strong>, aquí verás el resumen de la oferta que usamos: rol, seniority, skills y tecnologías clave.
    </p>

    <p v-else-if="jobOfferStore.status === 'analyzing'" class="mt-2 text-sm text-gray-500">
      Analizando la oferta y generando tu <strong>CV adaptado</strong>...
    </p>

    <p v-else-if="jobOfferStore.status === 'error' && jobOfferStore.errorMessage" class="mt-2 text-sm text-red-600">
      {{ jobOfferStore.errorMessage }}
    </p>

    <div v-else-if="jobOfferStore.analysis" class="mt-3 space-y-4 text-sm">
      <div v-if="jobOfferStore.analysis?.role">
        <p class="font-medium text-gray-800">
          Rol detectado
        </p>
        <p class="mt-0.5 text-gray-600">
          {{ jobOfferStore.analysis.role }}
        </p>
      </div>

      <div v-if="jobOfferStore.analysis?.seniority">
        <p class="font-medium text-gray-800">
          Seniority estimado
        </p>
        <p class="mt-0.5 text-gray-600">
          {{ jobOfferStore.analysis.seniority }}
        </p>
      </div>

      <div v-if="jobOfferStore.analysis?.skills?.length">
        <p class="font-medium text-gray-800">
          Skills clave
        </p>
        <div class="mt-1 flex flex-wrap gap-1.5">
          <span
            v-for="skill in jobOfferStore.analysis.skills"
            :key="skill"
            class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div v-if="jobOfferStore.analysis?.technologies?.length">
        <p class="font-medium text-gray-800">
          Tecnologías
        </p>
        <div class="mt-1 flex flex-wrap gap-1.5">
          <span
            v-for="tech in jobOfferStore.analysis.technologies"
            :key="tech"
            class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div v-if="jobOfferStore.analysis?.keywords?.length">
        <p class="font-medium text-gray-800">
          Keywords clave
        </p>
        <div class="mt-1 flex flex-wrap gap-1.5">
          <span
            v-for="keyword in jobOfferStore.analysis.keywords"
            :key="keyword"
            class="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-600"
          >
            {{ keyword }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


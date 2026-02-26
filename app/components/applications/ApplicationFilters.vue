<script setup lang="ts">
import type { ApplicationFilters } from '~/types/application'
import { useApplicationStore } from '~/stores/application'

const applicationStore = useApplicationStore()

const localFilters = ref<ApplicationFilters>({ ...applicationStore.filters })

function applyFilters() {
  applicationStore.setFilters(localFilters.value)
  applicationStore.fetchApplications()
}

function clearFilters() {
  localFilters.value = {}
  applicationStore.setFilters({})
  applicationStore.fetchApplications()
}
</script>

<template>
  <div class="application-filters flex flex-wrap items-end gap-3 py-3">
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">CV</label>
      <input
        v-model="localFilters.cvId"
        type="text"
        placeholder="ID o nombre"
        class="w-40 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">Empresa</label>
      <input
        v-model="localFilters.company"
        type="text"
        placeholder="Nombre empresa"
        class="w-40 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">Estado</label>
      <select
        v-model="localFilters.status"
        class="w-36 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">Todos</option>
        <option value="guardado">Guardado</option>
        <option value="postulado">Postulado</option>
        <option value="screening">Screening</option>
        <option value="entrevista">Entrevista</option>
        <option value="prueba_tecnica">Prueba técnica</option>
        <option value="oferta">Oferta</option>
        <option value="rechazado">Rechazado</option>
        <option value="aceptado">Aceptado</option>
      </select>
    </div>
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">Desde</label>
      <input
        v-model="localFilters.from"
        type="date"
        class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">Hasta</label>
      <input
        v-model="localFilters.to"
        type="date"
        class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
    <UiButton variant="primary" @click="applyFilters">
      Filtrar
    </UiButton>
    <UiButton variant="secondary" @click="clearFilters">
      Limpiar
    </UiButton>
  </div>
</template>

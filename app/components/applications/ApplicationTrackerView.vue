<script setup lang="ts">
import { useApplicationStore } from '~/stores/application'

const applicationStore = useApplicationStore()
const drawerOpen = computed({
  get: () => !!applicationStore.selectedApplication,
  set: (v) => {
    if (!v) applicationStore.openApplication(null)
  },
})

onMounted(() => {
  applicationStore.fetchApplications()
})

function goToNewApplication() {
  navigateTo('/job-offers/new')
}
</script>

<template>
  <div class="application-tracker-view space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl font-semibold text-gray-900">
        Gestor de Postulaciones
      </h1>
      <UiButton variant="primary" @click="goToNewApplication">
        Nueva Postulación
      </UiButton>
    </div>

    <div v-if="applicationStore.error" class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      {{ applicationStore.error }}
    </div>

    <ApplicationsApplicationStatsBar />

    <ApplicationsApplicationFilters />

    <div v-if="applicationStore.loading" class="flex items-center justify-center py-16">
      <div class="rounded-full h-10 w-10 border-2 border-primary border-t-transparent animate-spin" />
    </div>

    <template v-else-if="applicationStore.applications.length === 0">
      <UiEmptyState
        title="Aún no tienes postulaciones"
        description="Crea una nueva postulación desde una oferta de empleo para empezar a seguir su estado."
        action-label="Nueva Postulación"
        action-to="/job-offers/new"
      />
    </template>

    <ApplicationsApplicationBoard v-else />

    <ApplicationsApplicationDetailsDrawer
      v-model="drawerOpen"
      :application="applicationStore.selectedApplication"
    />
  </div>
</template>

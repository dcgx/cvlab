<script setup lang="ts">
useSeoMeta({ title: 'Dashboard - CVLab', description: 'Tus CVs creados' })

const { list, loading, error } = useCvList()

function handleOpen(id: string) {
  navigateTo(`/crear-cv?id=${id}`)
}

function handleDelete(id: string) {
  // TODO: confirmar y llamar API o store cuando exista backend
}
</script>

<template>
  <div class="min-h-screen">
    <CvDriveToolbar />
    <div v-if="loading" class="py-12 text-center text-gray-500">
      Cargando...
    </div>
    <div v-else-if="error" class="py-12 text-center text-red-600">
      {{ error }}
    </div>
    <div v-else-if="list.length === 0">
      <UiEmptyState />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <CvCard
        v-for="item in list"
        :key="item.id"
        :cv="item"
        @open="handleOpen"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Dashboard - CVLab', description: 'Tus CVs creados' })

const { list, loading, error, refresh } = useCvList()
const { remove } = useCvApi()

function handleOpen(id: string) {
  navigateTo(`/crear-cv?id=${id}`)
}

async function handleDelete(id: string) {
  if (!confirm('¿Eliminar este CV?')) return
  try {
    await remove(id)
    await refresh()
  } catch (e) {
    console.error('Error al eliminar:', e)
  }
}
</script>

<template>
  <div>
    <CvDriveToolbar />
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <UiSkeletonCard v-for="i in 8" :key="i" />
    </div>
    <div v-else-if="error" class="py-12 text-center text-gray-600">
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

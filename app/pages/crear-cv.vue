<script setup lang="ts">
useSeoMeta({ title: 'Mi CV - CVLab', description: 'Tu perfil profesional' })

useCvAutosave()

const activeSection = ref('profile')
const route = useRoute()

onMounted(() => {
  const id = route.query.id
  const store = useCvStore()
  if (id && typeof id === 'string') {
    store.loadCv(id)
  } else {
    store.loadFromLocalStorage()
  }
})
</script>

<template>
  <div class="min-h-screen">
    <CvBuilderView v-model="activeSection" />
  </div>
</template>

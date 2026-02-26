<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: 'dashboard' })
useSeoMeta({ title: 'Gestor de Postulaciones - CVLab' })
</script>

<template>
  <div class="min-h-screen bg-background">
    <ApplicationsApplicationTrackerView />
  </div>
</template>

<script setup lang="ts">
// Layout raíz: header + contenido principal
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <LayoutAppNav />
    <main class="w-full max-w-content mx-auto px-4 py-8 flex-1 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>

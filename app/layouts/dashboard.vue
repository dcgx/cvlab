<script setup lang="ts">
// Layout dashboard: nav superior + área de contenido (sidebar opcional)
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <LayoutAppNav />
    <main class="w-full max-w-content mx-auto px-4 py-8 flex-1 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

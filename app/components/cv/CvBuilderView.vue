<script setup lang="ts">
const activeSection = defineModel<string>({ required: true })
</script>

<template>
  <div class="cv-builder flex flex-col lg:flex-row min-h-screen bg-background">
    <CvSectionSidebar v-model="activeSection" />
    <main class="editor-area flex-1 overflow-auto p-4 lg:p-6 min-w-0">
      <CvEditorSection :section="activeSection" />
    </main>
    <aside class="preview-area w-full lg:w-[400px] xl:w-[480px] shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white overflow-auto">
      <div class="p-4 lg:sticky lg:top-0">
        <h2 class="text-sm font-medium text-secondary mb-2">
          Vista previa
        </h2>
        <CvPreviewHarvard />
      </div>
    </aside>
  </div>
</template>

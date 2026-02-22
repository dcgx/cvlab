<script setup lang="ts">
const cv = useCvStore()
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-heading text-xl text-secondary">
      Resumen profesional
    </h2>
    <p class="text-sm text-gray-600">
      Breve párrafo que resuma tu experiencia y cualificaciones. La IA podrá optimizar el texto más adelante.
    </p>
    <textarea
      class="w-full rounded-lg border border-gray-300 p-3 min-h-[180px]"
      placeholder="4-6 líneas sobre tu perfil profesional..."
      :value="cv.profileSummary"
      @input="cv.setProfileSummary(($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

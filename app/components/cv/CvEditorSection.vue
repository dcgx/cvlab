<script setup lang="ts">
defineProps<{ section: string }>()
</script>

<template>
  <div class="cv-editor-section">
    <CvProfileEditor v-if="section === 'profile'" />
    <CvResumenEditor v-else-if="section === 'summary'" />
    <CvExperienceEditor v-else-if="section === 'experience'" />
    <CvSkillsEditor v-else-if="section === 'skills'" />
    <CvEducationEditor v-else-if="section === 'education'" />
    <CvCertificationsEditor v-else-if="section === 'certifications'" />
    <CvLanguagesEditor v-else-if="section === 'languages'" />
    <p v-else-if="section === 'preview'" class="text-gray-500 text-sm">
      La vista previa está a la derecha.
    </p>
    <p v-else class="text-gray-500 text-sm">
      Sección no definida.
    </p>
  </div>
</template>

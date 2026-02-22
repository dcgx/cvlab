<script setup lang="ts">
import type { SkillCategory } from '~/stores/cv'

const cv = useCvStore()

const categories: { id: SkillCategory; label: string }[] = [
  { id: 'technical', label: 'Técnicas' },
  { id: 'soft', label: 'Blandas' },
  { id: 'tools', label: 'Herramientas' },
]

function getNamesFor(category: SkillCategory): string[] {
  return cv.skills.filter((s) => s.category === category).map((s) => s.name)
}

function setNamesFor(category: SkillCategory, names: string[]) {
  cv.setSkillsForCategory(category, names)
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="font-heading text-xl text-secondary">
      Skills
    </h2>
    <p class="text-sm text-gray-600">
      Clasifica tus habilidades en técnicas, blandas o herramientas. Usa el input tipo tag para añadir.
    </p>
    <div v-for="cat in categories" :key="cat.id" class="space-y-2">
      <label class="block text-sm font-medium text-secondary">{{ cat.label }}</label>
      <CvSkillsTagInput
        :model-value="getNamesFor(cat.id)"
        :category="cat.id"
        :placeholder="`Añadir ${cat.label.toLowerCase()}...`"
        @update:model-value="setNamesFor(cat.id, $event)"
      />
    </div>
  </div>
</template>

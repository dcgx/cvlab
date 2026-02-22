<script setup lang="ts">
/**
 * Preview del CV en formato Harvard: nombre centrado, secciones claras.
 * Se actualiza en vivo desde el store. No seleccionable (solo visual).
 */
const cv = useCvStore()

const photoUrl = ref<string | null>(null)
watch(
  () => cv.photoFile,
  (file) => {
    if (photoUrl.value) URL.revokeObjectURL(photoUrl.value)
    photoUrl.value = file ? URL.createObjectURL(file) : null
  },
  { immediate: true }
)
onUnmounted(() => {
  if (photoUrl.value) URL.revokeObjectURL(photoUrl.value)
})

const fullName = computed(() => {
  const first = (cv.firstName || '').trim()
  const last = (cv.lastName || '').trim()
  return [first, last].filter(Boolean).join(' ') || null
})

const hasContent = computed(() => {
  return !!(
    fullName.value ||
    cv.email?.trim() ||
    cv.position?.trim() ||
    cv.profileSummary?.trim() ||
    (cv.experiences?.length ?? 0) > 0 ||
    (cv.skills?.length ?? 0) > 0 ||
    (cv.educations?.length ?? 0) > 0
  )
})

</script>

<template>
  <div
    class="cv-preview-harvard select-none bg-white shadow-lg rounded-lg overflow-hidden text-gray-900"
    style="min-height: 420px;"
  >
    <!-- Placeholder cuando no hay contenido -->
    <div
      v-if="!hasContent"
      class="flex items-center justify-center p-8 text-gray-400 text-sm text-center"
    >
      Tu CV se verá aquí. Completa el formulario para ver el preview en formato Harvard.
    </div>

    <div v-else class="p-8 font-body text-sm">
      <!-- Nombre centrado -->
      <h1
        v-if="fullName"
        class="text-xl font-heading font-bold text-center border-b-0 mb-1"
      >
        {{ fullName }}
      </h1>

      <!-- Contacto (email, posición) en una línea centrada -->
      <div
        v-if="cv.email?.trim() || cv.position?.trim()"
        class="text-center text-gray-600 text-xs mb-4"
      >
        <span v-if="cv.email?.trim()">{{ cv.email }}</span>
        <span v-if="cv.email?.trim() && cv.position?.trim()"> · </span>
        <span v-if="cv.position?.trim()">{{ cv.position }}</span>
      </div>

      <!-- Foto (opcional, pequeña a la derecha o centrada) -->
      <div v-if="photoUrl" class="flex justify-center mb-4">
        <img
          :src="photoUrl"
          alt="Foto"
          class="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
        >
      </div>

      <!-- Perfil -->
      <section v-if="cv.profileSummary?.trim()" class="mb-4">
        <h2 class="text-sm font-bold uppercase tracking-wide border-b border-black pb-0.5 mb-2">
          Perfil
        </h2>
        <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {{ cv.profileSummary }}
        </p>
      </section>

      <!-- Experiencia laboral -->
      <section v-if="cv.experiences?.length" class="mb-4">
        <h2 class="text-sm font-bold uppercase tracking-wide border-b border-black pb-0.5 mb-2">
          Experiencia laboral
        </h2>
        <ul class="space-y-3">
          <li
            v-for="exp in cv.experiences"
            :key="exp.id"
          >
            <div class="font-semibold">
              {{ exp.title }}, {{ exp.company }}
            </div>
            <div class="text-gray-600 text-xs">
              {{ exp.period }}
            </div>
            <p v-if="exp.description?.trim()" class="mt-1 text-gray-700 text-xs leading-relaxed">
              {{ exp.description }}
            </p>
          </li>
        </ul>
      </section>

      <!-- Habilidades -->
      <section v-if="cv.skills?.length" class="mb-4">
        <h2 class="text-sm font-bold uppercase tracking-wide border-b border-black pb-0.5 mb-2">
          Habilidades
        </h2>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="(sk, idx) in cv.skills"
            :key="sk.id"
            class="text-gray-700 text-xs"
          >
            {{ sk.name }}<span v-if="idx < (cv.skills?.length ?? 0) - 1">, </span>
          </span>
        </div>
      </section>

      <!-- Educación -->
      <section v-if="cv.educations?.length" class="mb-4">
        <h2 class="text-sm font-bold uppercase tracking-wide border-b border-black pb-0.5 mb-2">
          Educación
        </h2>
        <ul class="space-y-2">
          <li
            v-for="edu in cv.educations"
            :key="edu.id"
          >
            <span class="font-semibold">{{ edu.degree }}</span>, {{ edu.institution }}
            <span class="text-gray-600 text-xs">({{ edu.period }})</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

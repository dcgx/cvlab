<script setup lang="ts">
const cv = useCvStore()

function inputValue(e: Event): string {
  return (e.target as HTMLInputElement).value
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-heading text-xl text-secondary">
      Información personal
    </h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="profile-firstName" class="block text-sm font-medium text-secondary mb-1">Nombre(s)</label>
        <input
          id="profile-firstName"
          type="text"
          class="w-full rounded-lg border border-gray-300 p-2"
          :value="cv.firstName"
          @input="cv.setFirstName(inputValue($event))"
        >
      </div>
      <div>
        <label for="profile-lastName" class="block text-sm font-medium text-secondary mb-1">Apellido(s)</label>
        <input
          id="profile-lastName"
          type="text"
          class="w-full rounded-lg border border-gray-300 p-2"
          :value="cv.lastName"
          @input="cv.setLastName(inputValue($event))"
        >
      </div>
    </div>
    <div>
      <label for="profile-title" class="block text-sm font-medium text-secondary mb-1">Título profesional</label>
      <input
        id="profile-title"
        type="text"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="cv.professionalTitle"
        placeholder="Ej. Ingeniero de Software"
        @input="cv.setProfessionalTitle(inputValue($event))"
      >
    </div>
    <div>
      <label for="profile-position" class="block text-sm font-medium text-secondary mb-1">Cargo / Posición</label>
      <input
        id="profile-position"
        type="text"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="cv.position"
        placeholder="Ej. Senior Developer"
        @input="cv.setPosition(inputValue($event))"
      >
    </div>
    <div>
      <label for="profile-location" class="block text-sm font-medium text-secondary mb-1">Ubicación</label>
      <input
        id="profile-location"
        type="text"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="cv.location"
        placeholder="Ciudad, País"
        @input="cv.setLocation(inputValue($event))"
      >
    </div>
    <div>
      <label for="profile-email" class="block text-sm font-medium text-secondary mb-1">Email</label>
      <input
        id="profile-email"
        type="email"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="cv.email"
        @input="cv.setEmail(inputValue($event))"
      >
    </div>
    <div>
      <label for="profile-linkedin" class="block text-sm font-medium text-secondary mb-1">LinkedIn</label>
      <input
        id="profile-linkedin"
        type="url"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="cv.linkedIn"
        placeholder="https://linkedin.com/in/..."
        @input="cv.setLinkedIn(inputValue($event))"
      >
    </div>
    <div>
      <label for="profile-github" class="block text-sm font-medium text-secondary mb-1">GitHub</label>
      <input
        id="profile-github"
        type="url"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="cv.github"
        placeholder="https://github.com/..."
        @input="cv.setGithub(inputValue($event))"
      >
    </div>
    <div>
      <label for="profile-portfolio" class="block text-sm font-medium text-secondary mb-1">Portfolio</label>
      <input
        id="profile-portfolio"
        type="url"
        class="w-full rounded-lg border border-gray-300 p-2"
        :value="cv.portfolio"
        placeholder="https://..."
        @input="cv.setPortfolio(inputValue($event))"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-secondary mb-1">Foto</label>
      <CvPhotoUpload @change="cv.setPhotoFile" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', file: File | null): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] ?? null
  emit('change', file)
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file?.type.startsWith('image/')) {
    emit('change', file)
  }
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function triggerInput() {
  inputRef.value?.click()
}
</script>

<template>
  <div class="photo-upload">
    <input
      ref="inputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onFileChange"
    >
    <button
      type="button"
      class="photo-zone w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors"
      :class="isDragging ? 'border-black bg-gray-100' : 'border-gray-300 hover:border-black'"
      @click="triggerInput"
      @drop.prevent="onDrop"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
    >
      <span class="text-secondary text-sm">Elija un archivo o arrástrelo aquí</span>
    </button>
  </div>
</template>

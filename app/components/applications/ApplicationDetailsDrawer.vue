<script setup lang="ts">
import type { Application } from '~/types/application'
import { useApplicationStore } from '~/stores/application'

interface Props {
  modelValue: boolean
  application: Application | null
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const applicationStore = useApplicationStore()
const localNotes = ref('')
const savingNotes = ref(false)
const notesSaved = ref(false)
let saveTimeout: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.application,
  (app) => {
    localNotes.value = app?.notes ?? ''
    notesSaved.value = false
  },
  { immediate: true }
)

function close() {
  emit('update:modelValue', false)
  applicationStore.openApplication(null)
}

function formatDate(value?: string) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return value
  }
}

function scheduleSaveNotes() {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(async () => {
    if (!props.application?.id) return
    savingNotes.value = true
    notesSaved.value = false
    try {
      await applicationStore.addNote(props.application.id, localNotes.value)
      notesSaved.value = true
    } finally {
      savingNotes.value = false
    }
  }, 600)
}

onUnmounted(() => {
  if (saveTimeout) clearTimeout(saveTimeout)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex justify-end"
        @click.self="close"
      >
        <div
          class="absolute inset-0 bg-black/30"
          aria-hidden="true"
        />
        <aside
          class="relative w-full max-w-md bg-surface border-l border-gray-200 shadow-xl overflow-y-auto flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Detalle de postulación"
        >
          <div class="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-surface">
            <h2 class="text-lg font-semibold text-gray-900">
              Detalle de postulación
            </h2>
            <button
              type="button"
              class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
              aria-label="Cerrar"
              @click="close"
            >
              <span class="text-xl leading-none">×</span>
            </button>
          </div>

          <div v-if="application" class="p-4 space-y-6">
            <!-- Oferta -->
            <section>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Oferta</h3>
              <p class="font-medium text-gray-900">
                {{ application.jobOffer?.company ?? '—' }} – {{ application.jobOffer?.role ?? '—' }}
              </p>
              <a
                v-if="application.jobOffer?.sourceUrl"
                :href="application.jobOffer.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-primary hover:underline mt-1 inline-block"
              >
                Ver oferta original
              </a>
              <p v-if="application.jobOffer?.description" class="text-sm text-gray-600 mt-2 line-clamp-3">
                {{ application.jobOffer.description }}
              </p>
            </section>

            <!-- CV utilizado -->
            <section>
              <h3 class="text-sm font-medium text-gray-500 mb-2">CV utilizado</h3>
              <p class="text-gray-900">{{ application.cv?.name ?? '—' }}</p>
              <p v-if="application.cv?.version" class="text-xs text-gray-500">{{ application.cv.version }}</p>
            </section>

            <!-- Historial -->
            <section v-if="application.historyEvents?.length">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Historial</h3>
              <ul class="space-y-2">
                <li
                  v-for="(ev, i) in application.historyEvents"
                  :key="i"
                  class="text-sm text-gray-700 flex gap-2"
                >
                  <span class="text-gray-500 shrink-0">{{ formatDate(ev.date) }}</span>
                  <span>{{ ev.event }}</span>
                </li>
              </ul>
            </section>

            <!-- Notas -->
            <section>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Notas</h3>
              <textarea
                v-model="localNotes"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px]"
                placeholder="Añade notas sobre esta postulación..."
                @input="scheduleSaveNotes"
              />
              <p v-if="savingNotes" class="text-xs text-gray-500 mt-1">Guardando...</p>
              <p v-else-if="notesSaved" class="text-xs text-primary mt-1">Guardado</p>
            </section>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}
.drawer-enter-active aside,
.drawer-leave-active aside {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from aside,
.drawer-leave-to aside {
  transform: translateX(100%);
}
</style>

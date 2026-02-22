/**
 * Autosave del CV Maestro cada 3 segundos cuando hay cambios (isDirty).
 */
export function useCvAutosave() {
  const cvStore = useCvStore()
  let timer: ReturnType<typeof setInterval> | null = null

  function runAutosave() {
    if (!cvStore.isDirty) return
    cvStore.autosave()
  }

  onMounted(() => {
    timer = setInterval(runAutosave, 3000)
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })

  return { runAutosave }
}

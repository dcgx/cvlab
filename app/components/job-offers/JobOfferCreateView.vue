<script setup lang="ts">
import { useJobOfferStore } from '../../stores/jobOffer'
import { useJobOfferAnalyze } from '../../composables/useJobOfferAnalyze'

const jobOfferStore = useJobOfferStore()
const { analyzeAndGenerateCv } = useJobOfferAnalyze()

// Al entrar en la vista, aseguramos un estado limpio para la oferta
jobOfferStore.reset()

async function handleSubmit() {
  if (jobOfferStore.status === 'analyzing') return

  try {
    const result = await analyzeAndGenerateCv({
      title: jobOfferStore.title,
      rawText: jobOfferStore.rawText,
      sourceUrl: jobOfferStore.sourceUrl || undefined,
    })

    // Después de generar el CV adaptado, navegar al editor de CV (solo en cliente)
    if (typeof window !== 'undefined') {
      window.location.href = `/crear-cv?id=${encodeURIComponent(result.cvId)}`
    }
  } catch {
    // El store ya gestiona el mensaje de error
  }
}
</script>

<template>
  <div class="min-h-screen">
    <div class="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <header class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Generar CV adaptado a una oferta
        </h1>
        <p class="text-sm text-gray-500 max-w-xl">
          Pega la oferta de trabajo y obtendrás un <strong>CV adaptado</strong> a esa oportunidad. Usamos tu CV Maestro como base; no lo modificamos. El resultado es un nuevo CV listo para esa postulación.
        </p>
      </header>

      <section class="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <div>
          <JobOfferForm @submit="handleSubmit" />
        </div>

        <div class="lg:self-start">
          <JobOfferAnalysisSummary />
        </div>
      </section>
    </div>
  </div>
</template>


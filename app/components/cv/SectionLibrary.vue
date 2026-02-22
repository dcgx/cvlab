<script setup lang="ts">
const RECOMMENDED = [
  'Perfil personal',
  'Experiencia laboral',
  'Habilidades',
  'Educación',
  'Extra',
]

const EXTRA = [
  'Pasatiempos',
  'Cursos',
  'Idiomas',
  'Referencias',
  'Pasantías',
  'Certificados',
  'Características',
  'Aviso de privacidad',
  'Sitio web y redes sociales',
]
</script>

<template>
  <div class="section-library rounded-lg border border-gray-200 p-4">
    <h3 class="text-lg font-medium text-secondary mb-3">Biblioteca de secciones</h3>
    <div class="mb-4">
      <h4 class="text-sm font-medium text-secondary mb-2">Recomendado</h4>
      <p class="text-sm text-gray-600 mb-2">
        Empieza a redactar tu CV con nuestras secciones recomendadas para mostrar toda tu gama de competencias y experiencia.
      </p>
      <ul class="list-disc list-inside text-sm text-secondary">
        <li v-for="item in RECOMMENDED" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div class="mb-4">
      <h4 class="text-sm font-medium text-secondary mb-2">Extra</h4>
      <p class="text-sm text-gray-600 mb-2">
        Secciones adicionales para que tu CV sea único y destaque.
      </p>
      <ul class="list-disc list-inside text-sm text-secondary">
        <li v-for="item in EXTRA" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div class="mb-2">
      <h4 class="text-sm font-medium text-secondary mb-2">Agregar sección personalizada</h4>
      <p class="text-sm text-gray-600">
        Añade cualquier cosa que quieras destacar: habilidades o experiencia únicas.
      </p>
    </div>
    <div class="text-sm text-gray-500 mt-2">
      Opciones de contenido: Experiencia, Salto de página, Lista de habilidades, Lista básica, Listado descriptivo.
    </div>
  </div>
</template>

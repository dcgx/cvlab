<script setup lang="ts">
useSeoMeta({ title: 'Registro - CVLab' })

const auth = useAuth()
const email = ref('')
const password = ref('')
const name = ref('')
const error = ref('')
const loading = ref(false)
const success = ref(false)

onMounted(() => auth.init())

async function handleSubmit() {
  error.value = ''
  loading.value = true
  success.value = false
  try {
    await auth.signUp(email.value, password.value, { name: name.value })
    success.value = true
    await navigateTo('/login')
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al registrarse'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-sm space-y-6">
      <h1 class="text-center text-2xl font-semibold text-gray-900">Crear cuenta</h1>
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            minlength="6"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
        </button>
      </form>
      <p class="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?
        <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          Iniciar sesión
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

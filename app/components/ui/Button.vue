<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    :class="variant === 'primary'
      ? 'bg-primary text-white hover:opacity-90'
      : 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50'"
  >
    <slot />
  </button>
</template>

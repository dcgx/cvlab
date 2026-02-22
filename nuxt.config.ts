// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2025-02-14',
  devtools: { enabled: true },
  srcDir: 'app',
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    // Workaround: force PostCSS to use tailwind.config.js (evita "import.meta outside a module")
    (_options, nuxt) => {
      nuxt.hook('modules:done', () => {
        const root = nuxt.options.rootDir ?? process.cwd()
        const postcssOpts = (nuxt.options as { postcss?: { plugins?: Record<string, unknown> } }).postcss
          ?? (nuxt.options.build as { postcss?: { plugins?: Record<string, unknown> } })?.postcss
        const plugins = postcssOpts?.plugins as Record<string, unknown> | undefined
        if (plugins?.tailwindcss && typeof plugins.tailwindcss === 'string' && plugins.tailwindcss.includes('.nuxt/tailwind/postcss.mjs')) {
          plugins.tailwindcss = path.join(root, 'tailwind.config.js')
        }
      })
    },
  ],
  tailwindcss: { cssPath: '~/assets/css/main.css' },
  typescript: { strict: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
    },
  },
})

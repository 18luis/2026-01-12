export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  ui: {
    icons: ['heroicons']
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  }
})
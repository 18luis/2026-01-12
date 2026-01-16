export default defineNuxtConfig({
	modules: ['@nuxt/ui'],
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL
		}
	}
})
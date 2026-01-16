export const useApi = () => {
	const config = useRuntimeConfig()

	return $fetch.create({
		baseURL: config.public.apiBaseUrl,

		onResponseError({ response }) {
			if (response.status === 401) {
				navigateTo('/login')
			}
		}
	})
}
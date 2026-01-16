export const useApi = () => {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.apiBaseUrl,

    onRequest({ options }) {
      const token = useCookie('token').value

      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      }
    }
  })
}
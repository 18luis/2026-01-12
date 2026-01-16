import type { Expense } from "~/types/expense"

export const useGastos = () => {

    const api = useApi()

    const gastos = ref<Expense[]>([])
    const gasto = ref<Expense | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const toast = useToast()

    const fetchGastos = async () => {
        loading.value = true
        error.value = null

        try {

            gastos.value = await api<Expense[]>('/expenses')

        } catch (err) {
            toast.add({
                title: 'Error al cargar los gastos',
                color: 'error',
                icon: 'i-lucide-circle-check'
            })
            error.value = 'Error al cargar los gastos'
        } finally {
            loading.value = false
        }
    }

    const fetchGasto = async (id: number) => {
        loading.value = true
        error.value = null

        try {

            gasto.value = await api<Expense>(`/expenses/${id}`)

        } catch (err) {
            toast.add({
                title: 'Error al cargar el gasto',
                color: 'error',
                icon: 'i-lucide-circle-check'
            })
            error.value = 'Error al cargar el gasto'
        } finally {
            loading.value = false
        }
    }

    const createGasto = async (data: Expense) => {
        loading.value = true
        error.value = null

        try {

            gastos.value = await api<Expense[]>('/expenses', {
                method: 'POST',
                body: data
            })
            toast.add({
                title: 'Gasto creado correctamente',
                color: 'success',
                icon: 'i-lucide-circle-check'
            })

            navigateTo('/')

        } catch (err) {
            toast.add({
                title: 'Error al crear el gasto',
                color: 'error',
                icon: 'i-lucide-circle-check'
            })
            error.value = 'Error al crear el gasto'
        } finally {
            loading.value = false
        }
    }

    const editGasto = async (id: number, data: Expense) => {
        loading.value = true
        error.value = null

        try {

            await api<Expense>(`/expenses/${id}`, {
                method: 'PUT',
                body: data
            })
            toast.add({
                title: 'Gasto editado correctamente',
                color: 'success',
                icon: 'i-lucide-circle-check'
            })

            navigateTo('/')

        } catch (err) {
            toast.add({
                title: 'Error al editar el gasto',
                color: 'error',
                icon: 'i-lucide-circle-check'
            })
            error.value = 'Error al editar el gasto'
        } finally {
            loading.value = false
        }
    }

    const deleteGasto = async (id: number) => {
        loading.value = true
        error.value = null

        try {

            gastos.value = await api<Expense[]>(`/expenses/${id}`, {
                method: 'DELETE'
            })

            toast.add({
                title: 'Gasto eliminado correctamente',
                color: 'success',
                icon: 'i-lucide-circle-check'
            })

            fetchGastos()

        } catch (err) {
            toast.add({
                title: 'Error al eliminar el gasto' + err,
                color: 'error',
                icon: 'i-lucide-circle-check'
            })
            error.value = 'Error al eliminar el gasto'
        } finally {
            loading.value = false
        }
    }

    return { gastos, gasto, loading, fetchGastos, fetchGasto, createGasto, editGasto, deleteGasto }
}
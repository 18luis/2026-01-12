import type { Expense } from '~/types/expense'

export const useExpenses = () => {
    const api = useApi()

    const expenses = useState<Expense[]>('expenses_state', () => [])
    const loading = useState<boolean>('expenses_loading', () => false)
    const error = useState<string | null>('expenses_error', () => null)

    const fetchExpenses = async () => {
        loading.value = true
        error.value = null

        try {

            const data = await api<Expense[]>('/expenses')

            expenses.value = data

        } catch (err) {
            error.value = 'Error al cargar los gastos'
        } finally {
            loading.value = false
        }
    }

    const addExpense = async (payload: Omit<Expense, 'id'>) => {
        try {
            await api('/expenses', {
                method: 'POST',
                body: payload
            })
        } catch {
            throw new Error('Error al guardar el gasto')
        }
    }

    return {
        expenses,
        loading,
        error,
        fetchExpenses,
        addExpense
    }
}
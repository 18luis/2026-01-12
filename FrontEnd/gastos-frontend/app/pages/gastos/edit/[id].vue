<script setup lang="ts">
import { useGastos } from '~/composables/useGastos'
import type { Expense } from '~/types/expense'

const { editGasto, fetchGasto, gasto } = useGastos()

const route = useRoute()
const router = useRouter()
const expenseId = Number(route.params.id)

const loading = ref(true)
const error = ref<string | null>(null)

const form = ref<any>({
    description: '',
    amount: 0,
    category: '',
    date: ''
})

const items = ['Tecnología', 'Oficina', 'Software', 'Marketing', 'Servicios', 'Otros']

onMounted(async () => {
    try {
        await fetchGasto(expenseId)
        form.value.description = gasto.value.description
        form.value.amount = gasto.value.amount
        form.value.category = gasto.value.category
        form.value.date = gasto.value.date ? new Date(gasto.value.date).toISOString().split('T')[0] : ''
    } catch (err) {
        error.value = 'Error al cargar el gasto'
        console.error(err)
    } finally {
        loading.value = false
    }
})

const validate = () => form.value.description && form.value.amount > 0 && form.value.category && form.value.date

const handleSubmit = async () => {
    try {
        await editGasto(expenseId, form.value)
        router.push('/')
    } catch (err) {
        console.error('Error al editar:', err)
    }
}
</script>

<template>
    <div class="h-screen flex items-center justify-center p-4">
        <UCard class="w-full max-w-xl" variant="subtle">
            <h2 class="text-lg font-semibold mb-4">Editar gasto</h2>
            <UForm @submit.prevent="handleSubmit" class="space-y-4">
                <UFormField label="Nombre" required>
                    <UInput v-model="form.description" />
                </UFormField>

                <UFormField label="Monto" required>
                    <UInput type="number" v-model.number="form.amount" />
                </UFormField>

                <UFormField label="Categoría" required>
                    <USelect v-model="form.category" :items="items" placeholder="Selecciona una categoría"
                        class="w-48" />
                </UFormField>

                <UFormField label="Fecha" required>
                    <UInput type="date" v-model="form.date" />
                </UFormField>

                <div class="flex gap-2">
                    <UButton type="submit" :disabled="!validate()">
                        Guardar
                    </UButton>

                    <NuxtLink to="/">
                        <UButton color="error">Cancelar</UButton>
                    </NuxtLink>
                </div>
            </UForm>
        </UCard>
    </div>
</template>
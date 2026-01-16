<script setup lang="ts">
import { useGastos } from '~/composables/useGastos'
import type { Expense } from "~/types/expense"

const { gastos, loading, fetchGastos, deleteGasto } = useGastos()

const search = ref('')
const category = ref('')
const showDeleteModal = ref(false)
const selectedId = ref<number | null>(null)

const openModal = (id: number | string) => {
	selectedId.value = Number(id)
	showDeleteModal.value = true
}

const confirmDelete = () => {
	if (selectedId.value === null) return

	deleteGasto(selectedId.value)

	showDeleteModal.value = false
}

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(gastos.value.length / 5))
const paginatedExpenses = computed(() => {
	const start = (currentPage.value - 1) * 5
	const end = start + 5
	return gastos.value.slice(start, end)
})

watch(gastos, () => {
	if (currentPage.value > totalPages.value) {
		currentPage.value = totalPages.value || 1
	}
})

onMounted(fetchGastos)

const columns: TableColumn<Expense>[] = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'description',
		header: 'Descripcion'
	},
	{
		accessorKey: 'amount',
		header: 'Cantidad'
	},
	{
		accessorKey: 'category',
		header: 'Categoria'
	},
	{
		accessorKey: 'date',
		header: 'Fecha',
		cell: ({ row }) => {
			return new Date(row.original.date).toISOString().split('T')[0]
		}
	},
	{
		id: 'action'
	}
]
</script>

<template>
	<div class="h-screen flex items-center justify-center p-4">
		<UCard class="w-full max-w-6xl" variant="subtle">
			<div class="flex justify-between mb-4">
				<h1 class="text-xl font-semibold">Gastos</h1>
				<NuxtLink to="/gastos/create">
					<UButton icon="i-lucide-diamond-plus">Nuevo gasto</UButton>
				</NuxtLink>
			</div>

			<UEmpty v-if="!loading && gastos.length === 0" icon="i-lucide-list" title="No hay gastos registrados"
				description="Agrega uno nuevo" />

			<!-- Tabla -->
			<UTable v-if="gastos.length > 0" :data="paginatedExpenses" :loading="loading" :columns="columns"
				class="flex-1">
				<template #action-cell="{ row }">
					<div class="flex gap-5">
						<NuxtLink :to="`/gastos/edit/${row.original.id}`">
							<UButton icon="i-lucide-edit" />
						</NuxtLink>

						<UButton icon="i-lucide-trash" color="error" @click="openModal(row.original.id)" />
					</div>
				</template>
			</UTable>

			<!-- Pagination -->
			<div v-if="totalPages > 1" class="flex justify-center mt-6">
				<UPagination v-model:page="currentPage" :total="totalPages" />
			</div>

			<ConfirmDelete v-model="showDeleteModal" @confirm="confirmDelete" />
		</UCard>
	</div>
</template>
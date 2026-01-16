<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { useExpenses } from '~/composables/useExpenses'
import type { Expense } from '~/types/expense'
import { ref, reactive } from 'vue'

const { expenses, loading, error, fetchExpenses, addExpense } = useExpenses()

onMounted(fetchExpenses)

const toast = useToast()

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
		header: 'Fecha'
	},
	{
		id: 'action'
	}
]

const showAddModal = ref(false)

const newExpense = reactive<Omit<Expense, 'id'>>({
	description: '',
	amount: 0,
	category: '',
	date: ''
})

function openAddModal() {
	newExpense.description = ''
	newExpense.amount = 0
	newExpense.category = ''
	newExpense.date = new Date().toISOString().slice(0, 10)
	showAddModal.value = true
}

async function handleAddSubmit() {
	try {
		await addExpense({
			description: newExpense.description,
			amount: newExpense.amount,
			category: newExpense.category,
			date: newExpense.date
		})
		await fetchExpenses()
		toast.add({
			title: 'Gasto agregado',
			color: 'success',
			icon: 'i-lucide-circle-check'
		})
		showAddModal.value = false
	} catch (err) {
		toast.add({
			title: 'Error al guardar el gasto',
			color: 'error',
			icon: 'i-lucide-circle-check'
		})
	}
}

function getDropdownActions(expense: Expense): DropdownMenuItem[][] {
	return [
		[
			{
				label: 'Agregar',
				icon: 'i-lucide-diamond-plus',
				onClick: () => openAddModal()
			},
			{
				label: 'Editar',
				icon: 'i-lucide-edit'
			},
			{
				label: 'Eliminar',
				icon: 'i-lucide-trash',
				color: 'error'
			}
		]
	]
}
</script>

<template>
	<div class="p-6 space-y-6">
		<h1 class="text-2xl font-bold">Listado de Gastos</h1>

		<!-- Tabla -->
		<UTable :data="expenses" :columns="columns" class="flex-1">
			<template #action-cell="{ row }">
				<UDropdownMenu :items="getDropdownActions(row.original)">
					<UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
				</UDropdownMenu>
			</template>
		</UTable>

		<!-- Modal Agregar Gasto (UModal) -->
		<UModal v-model:show="showAddModal" :fullscreen="false" class="max-w-lg">
			<template #header>
				<h2 class="text-lg font-semibold">Agregar Gasto</h2>
			</template>
			<div class="p-2">
				<form @submit.prevent="handleAddSubmit" class="space-y-3">
					<div>
						<label class="block text-sm">Descripcion</label>
						<input v-model="newExpense.description" required class="w-full border rounded px-2 py-1" />
					</div>
					<div>
						<label class="block text-sm">Cantidad</label>
						<input v-model.number="newExpense.amount" type="number" required
							class="w-full border rounded px-2 py-1" />
					</div>
					<div>
						<label class="block text-sm">Categoria</label>
						<input v-model="newExpense.category" class="w-full border rounded px-2 py-1" />
					</div>
					<div>
						<label class="block text-sm">Fecha</label>
						<input v-model="newExpense.date" type="date" required class="w-full border rounded px-2 py-1" />
					</div>
					<div class="flex justify-end gap-2 mt-4">
						<UButton type="button" variant="ghost" @click="showAddModal = false">Cancelar</UButton>
						<UButton type="submit" color="primary">Guardar</UButton>
					</div>
				</form>
			</div>
		</UModal>
	</div>
</template>
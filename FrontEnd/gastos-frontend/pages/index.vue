<script setup lang="ts">
import { onMounted, reactive, computed, ref } from 'vue'
import { useExpenses } from '~/composables/useExpenses'
import type { Expense } from '~/types/expense'

import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'

const { expenses, loading, error, fetchExpenses, addExpense } = useExpenses()

const form = reactive<Omit<Expense, 'id'>>({
	description: '',
	amount: 0,
	category: '',
	date: ''
})

const formError = ref<string | null>(null)

const validateForm = (): boolean => {
	if (!form.description || !form.category || !form.date) {
		formError.value = 'Todos los campos son obligatorios'
		return false
	}

	if (form.amount <= 0) {
		formError.value = 'El monto debe ser mayor a 0'
		return false
	}

	formError.value = null
	return true
}

const submit = async () => {
	if (!validateForm()) return

	try {
		await addExpense(form)

		Object.assign(form, {
			description: '',
			amount: 0,
			category: '',
			date: ''
		})
	} catch (err) {
		formError.value = (err as Error).message
	}
}

onMounted(async () => {
	await fetchExpenses()
})

//Prueba de tabla
interface User {
	id: number
	name: string
	position: string
	email: string
	role: string
}

const toast = useToast()
const { copy } = useClipboard()

const data = ref<User[]>([
	{
		id: 1,
		name: 'Lindsay Walton',
		position: 'Front-end Developer',
		email: 'lindsay.walton@example.com',
		role: 'Member'
	},
	{
		id: 2,
		name: 'Courtney Henry',
		position: 'Designer',
		email: 'courtney.henry@example.com',
		role: 'Admin'
	},
	{
		id: 3,
		name: 'Tom Cook',
		position: 'Director of Product',
		email: 'tom.cook@example.com',
		role: 'Member'
	},
	{
		id: 4,
		name: 'Whitney Francis',
		position: 'Copywriter',
		email: 'whitney.francis@example.com',
		role: 'Admin'
	},
	{
		id: 5,
		name: 'Leonard Krasner',
		position: 'Senior Designer',
		email: 'leonard.krasner@example.com',
		role: 'Owner'
	},
	{
		id: 6,
		name: 'Floyd Miles',
		position: 'Principal Designer',
		email: 'floyd.miles@example.com',
		role: 'Member'
	}
])

const columns: TableColumn<User>[] = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'role',
		header: 'Role'
	},
	{
		id: 'action'
	}
]

function getDropdownActions(user: User): DropdownMenuItem[][] {
	return [
		[
			{
				label: 'Copy user Id',
				icon: 'i-lucide-copy',
				onSelect: () => {
					copy(user.id.toString())

					toast.add({
						title: 'User ID copied to clipboard!',
						color: 'success',
						icon: 'i-lucide-circle-check'
					})
				}
			}
		],
		[
			{
				label: 'Edit',
				icon: 'i-lucide-edit'
			},
			{
				label: 'Delete',
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

		<!-- Formulario -->
		<UCard>
			<form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="submit">
				<UInput v-model="form.description" placeholder="Descripción" />
				<UInput v-model.number="form.amount" type="number" placeholder="Monto" />
				<UInput v-model="form.category" placeholder="Categoría" />
				<UInput v-model="form.date" type="date" />

				<div class="md:col-span-2">
					<UButton type="submit">Agregar gasto</UButton>
				</div>

				<UAlert v-if="formError" color="red" :title="formError" />
			</form>
		</UCard>

		<!-- Errores HTTP -->
		<UAlert v-if="error" color="red" :title="error" />

		<pre class="bg-gray-100 p-2 text-xs">{{ expenses }}</pre>

		<!-- Tabla -->
		<UTable :data="data" :columns="columns" class="flex-1">
			<template #name-cell="{ row }">
				<div class="flex items-center gap-3">
					<UAvatar :src="`https://i.pravatar.cc/120?img=${row.original.id}`" size="lg"
						:alt="`${row.original.name} avatar`" />
					<div>
						<p class="font-medium text-highlighted">
							{{ row.original.name }}
						</p>
						<p>
							{{ row.original.position }}
						</p>
					</div>
				</div>
			</template>
			<template #action-cell="{ row }">
				<UDropdownMenu :items="getDropdownActions(row.original)">
					<UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
				</UDropdownMenu>
			</template>
		</UTable>
	</div>
</template>
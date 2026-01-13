<template>
  <div>
    <UCard v-if="expenses.length === 0">
      <div class="text-center py-12">
        <div class="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-heroicons-exclamation-circle" class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No hay gastos registrados</h3>
        <p class="text-gray-500 mb-6">Comienza agregando tu primer gasto</p>
        <UButton
          icon="i-heroicons-plus"
          size="lg"
          @click="$emit('create')"
        >
          Crear Gasto
        </UButton>
      </div>
    </UCard>

    <UCard v-else>
      <UTable :rows="expenses" :columns="columns">
        <template #product-data="{ row }">
          <div>
            <p class="font-semibold text-gray-900">{{ row.product }}</p>
            <p v-if="row.description" class="text-sm text-gray-500 mt-1">
              {{ row.description }}
            </p>
          </div>
        </template>

        <template #category-data="{ row }">
          <UBadge color="blue" variant="soft">
            {{ row.category }}
          </UBadge>
        </template>

        <template #amount-data="{ row }">
          <span class="font-bold text-gray-900">
            ${{ row.amount.toLocaleString() }}
          </span>
        </template>

        <template #date-data="{ row }">
          {{ new Date(row.date).toLocaleDateString('es-MX') }}
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-center justify-end gap-2">
            <UButton
              icon="i-heroicons-pencil"
              size="sm"
              color="primary"
              variant="ghost"
              @click="$emit('edit', row)"
            />
            <UButton
              icon="i-heroicons-trash"
              size="sm"
              color="red"
              variant="ghost"
              @click="$emit('delete', row.id)"
            />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Expense } from '~/types/expense'

defineProps<{
  expenses: Expense[]
}>()

defineEmits(['create', 'edit', 'delete'])

const columns = [
  { key: 'product', label: 'Producto' },
  { key: 'category', label: 'Categoría' },
  { key: 'amount', label: 'Monto' },
  { key: 'date', label: 'Fecha' },
  { key: 'actions', label: '' }
]
</script>
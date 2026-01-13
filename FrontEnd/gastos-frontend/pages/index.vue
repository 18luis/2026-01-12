<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader @create="handleCreate" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <StatsCards
        :total-expenses="expenses.length"
        :total-amount="totalAmount"
        :filtered-count="filteredExpenses.length"
        class="mb-8"
      />

      <!-- Filters -->
      <ExpenseFilters
        v-model:search-term="searchTerm"
        v-model:category-filter="categoryFilter"
        class="mb-6"
      />

      <!-- Table -->
      <ExpenseTable
        :expenses="paginatedExpenses"
        @create="handleCreate"
        @edit="handleEdit"
        @delete="handleDeleteConfirm"
      />

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-6">
        <UPagination
          v-model="currentPage"
          :page-count="totalPages"
        />
      </div>
    </div>

    <!-- Modal Create/Edit -->
    <ExpenseModal
      :is-open="isModalOpen"
      :mode="modalMode"
      :form-data="formData"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation -->
    <DeleteConfirmation
      :is-open="!!deleteId"
      :loading="isDeleting"
      @cancel="deleteId = null"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ITEMS_PER_PAGE } from '~/utils/constants'

// Composables
const { expenses, addExpense, updateExpense, deleteExpense, totalAmount } = useExpenses()
const { searchTerm, categoryFilter, filteredExpenses } = useFilters(expenses)
const { isOpen: isModalOpen, mode: modalMode, formData, openModal, closeModal } = useModal()
const toast = useToast()

// Estado
const currentPage = ref(1)
const deleteId = ref<number | null>(null)
const isDeleting = ref(false)

// Paginación
const totalPages = computed(() => Math.ceil(filteredExpenses.value.length / ITEMS_PER_PAGE))
const paginatedExpenses = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredExpenses.value.slice(start, end)
})

// Handlers
const handleCreate = () => {
  openModal('create')
}

const handleEdit = (expense: any) => {
  openModal('edit', expense)
}

const handleDeleteConfirm = (id: number) => {
  deleteId.value = id
}

const handleSubmit = (data: any) => {
  if (modalMode.value === 'create') {
    const newExpense = {
      ...data,
      id: Date.now(),
      amount: parseFloat(data.amount)
    }
    addExpense(newExpense)
    toast.add({
      title: 'Éxito',
      description: 'Gasto creado exitosamente',
      color: 'green'
    })
  } else {
    updateExpense(data.id, {
      ...data,
      amount: parseFloat(data.amount)
    })
    toast.add({
      title: 'Éxito',
      description: 'Gasto actualizado exitosamente',
      color: 'green'
    })
  }
  closeModal()
}

const confirmDelete = async () => {
  if (!deleteId.value) return
  
  isDeleting.value = true
  
  setTimeout(() => {
    deleteExpense(deleteId.value!)
    deleteId.value = null
    isDeleting.value = false
    
    toast.add({
      title: 'Eliminado',
      description: 'Gasto eliminado exitosamente',
      color: 'red'
    })
  }, 300)
}

// Reset page cuando cambian filtros
watch([searchTerm, categoryFilter], () => {
  currentPage.value = 1
})
</script>
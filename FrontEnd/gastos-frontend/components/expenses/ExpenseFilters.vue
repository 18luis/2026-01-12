<template>
  <UCard>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UInput
        v-model="localSearch"
        icon="i-heroicons-magnifying-glass"
        size="lg"
        placeholder="Buscar productos..."
      />

      <USelect
        v-model="localCategory"
        :options="categoryOptions"
        size="lg"
        placeholder="Todas las categorías"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { EXPENSE_CATEGORIES } from '~/utils/constants'

const props = defineProps<{
  searchTerm: string
  categoryFilter: string
}>()

const emit = defineEmits(['update:searchTerm', 'update:categoryFilter'])

const localSearch = computed({
  get: () => props.searchTerm,
  set: (value) => emit('update:searchTerm', value)
})

const localCategory = computed({
  get: () => props.categoryFilter,
  set: (value) => emit('update:categoryFilter', value)
})

const categoryOptions = [
  { label: 'Todas las categorías', value: 'all' },
  ...EXPENSE_CATEGORIES.map(cat => ({ label: cat, value: cat }))
]
</script>
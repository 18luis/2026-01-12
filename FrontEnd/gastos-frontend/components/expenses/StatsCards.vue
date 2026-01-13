<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <UCard>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 font-medium">Total Gastos</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">{{ totalExpenses }}</p>
        </div>
        <div class="bg-blue-100 p-4 rounded-xl">
          <UIcon name="i-heroicons-trending-up" class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </UCard>

    <UCard>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 font-medium">Monto Total</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">${{ totalAmount.toLocaleString() }}</p>
        </div>
        <div class="bg-green-100 p-4 rounded-xl">
          <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-green-600" />
        </div>
      </div>
    </UCard>

    <UCard>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 font-medium">Este Mes</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">{{ filteredCount }}</p>
        </div>
        <div class="bg-purple-100 p-4 rounded-xl">
          <UIcon name="i-heroicons-calendar" class="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalExpenses: number
  totalAmount: number
  filteredCount: number
}>()
</script>
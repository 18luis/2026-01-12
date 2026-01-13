<template>
  <div class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestor de Gastos</h1>
            <p class="text-sm text-gray-500">Administra tus gastos de forma eficiente</p>
          </div>
        </div>
        <UButton
          icon="i-heroicons-plus"
          size="lg"
          color="primary"
          @click="$emit('create')"
        >
          Nuevo Gasto
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['create'])
</script>
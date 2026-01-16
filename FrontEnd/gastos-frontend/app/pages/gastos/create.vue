<script setup lang="ts">
import { useGastos } from '~/composables/useGastos'
const { createGasto } = useGastos()

const gasto = ref({ description: '', amount: 0, category: '', date: '' })
</script>

<template>
    <div class="h-screen flex items-center justify-center p-4">
        <UCard class="w-full max-w-xl" variant="subtle">
            <h2 class="text-lg font-semibold mb-4">Nuevo gasto</h2>
            <GastoForm :model-value="gasto" @submit="createGasto" />
        </UCard>
    </div>
</template>
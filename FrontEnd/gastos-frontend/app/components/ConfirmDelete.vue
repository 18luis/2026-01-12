<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm'): void
}>()
</script>

<template>
    <UModal :open="props.modelValue" @update:open="emit('update:modelValue', $event)"
        title="¿Deseas eliminar este gasto?" :ui="{ footer: 'justify-end' }">

        <template #body>
            Esta acción no se puede deshacer y el gasto será eliminado de forma permanente.
        </template>

        <template #footer="{ close }">
            <UButton color="error" @click="emit('confirm')">Eliminar</UButton>
            <UButton @click="close">Cancelar</UButton>
        </template>
    </UModal>
</template>
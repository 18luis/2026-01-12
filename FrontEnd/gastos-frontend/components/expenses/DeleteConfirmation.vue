<template>
  <UModal v-model="isOpen">
    <UCard>
      <div class="text-center">
        <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-heroicons-trash" class="w-8 h-8 text-red-600" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          ¿Eliminar gasto?
        </h3>
        <p class="text-gray-600 mb-6">
          Esta acción no se puede deshacer. El gasto será eliminado permanentemente.
        </p>
      </div>

      <template #footer>
        <div class="flex gap-3">
          <UButton
            color="gray"
            variant="ghost"
            block
            @click="$emit('cancel')"
            :disabled="loading"
          >
            Cancelar
          </UButton>
          <UButton
            color="red"
            block
            :loading="loading"
            @click="$emit('confirm')"
          >
            Eliminar
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  loading: boolean
}>()

defineEmits(['cancel', 'confirm'])
</script>
<template>
  <UModal v-model="isOpen" :prevent-close="loading">
    <UCard>
      <template #header>
        <h2 class="text-xl font-bold">
          {{ mode === 'create' ? 'Nuevo Gasto' : 'Editar Gasto' }}
        </h2>
      </template>

      <div class="space-y-4">
        <UFormGroup label="Producto" required :error="errors.product">
          <UInput
            v-model="form.product"
            placeholder="Ej: Laptop Dell XPS"
          />
        </UFormGroup>

        <UFormGroup label="Categoría" required :error="errors.category">
          <USelect
            v-model="form.category"
            :options="categoryOptions"
            placeholder="Selecciona una categoría"
          />
        </UFormGroup>

        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Monto" required :error="errors.amount">
            <UInput
              v-model="form.amount"
              type="number"
              placeholder="0.00"
            />
          </UFormGroup>

          <UFormGroup label="Fecha" required :error="errors.date">
            <UInput
              v-model="form.date"
              type="date"
            />
          </UFormGroup>
        </div>

        <UFormGroup label="Descripción">
          <UTextarea
            v-model="form.description"
            :rows="3"
            placeholder="Descripción adicional del gasto..."
          />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            color="gray"
            variant="ghost"
            @click="closeModal"
            :disabled="loading"
          >
            Cancelar
          </UButton>
          <UButton
            :loading="loading"
            @click="handleSubmit"
          >
            {{ mode === 'create' ? 'Crear Gasto' : 'Guardar Cambios' }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { EXPENSE_CATEGORIES } from '~/utils/constants'
import type { ExpenseFormData } from '~/types/expense'

const props = defineProps<{
  isOpen: boolean
  mode: 'create' | 'edit'
  formData: ExpenseFormData
}>()

const emit = defineEmits(['close', 'submit'])

const form = ref({ ...props.formData })
const errors = ref<Record<string, string>>({})
const loading = ref(false)

const categoryOptions = EXPENSE_CATEGORIES.map(cat => ({ 
  label: cat, 
  value: cat 
}))

watch(() => props.formData, (newData) => {
  form.value = { ...newData }
  errors.value = {}
}, { deep: true })

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.product.trim()) {
    errors.value.product = 'El producto es requerido'
  }
  if (!form.value.category) {
    errors.value.category = 'La categoría es requerida'
  }
  if (!form.value.amount || Number(form.value.amount) <= 0) {
    errors.value.amount = 'El monto debe ser mayor a 0'
  }
  if (!form.value.date) {
    errors.value.date = 'La fecha es requerida'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  setTimeout(() => {
    emit('submit', { ...form.value })
    loading.value = false
  }, 500)
}

const closeModal = () => {
  if (!loading.value) {
    emit('close')
  }
}
</script>
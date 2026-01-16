<script setup lang="ts">
const props = defineProps<{ modelValue: any }>()

const emit = defineEmits(['submit'])

const form = reactive({ ...props.modelValue })

const validate = () => form.description && form.amount > 0 && form.category && form.date

const items = ref(['Tecnología', 'Oficina', 'Software', 'Marketing', 'Servicios', 'Otros'])
</script>

<template>
    <UForm @submit="emit('submit', form)" class="space-y-4">
        <UFormField label="Nombre" required>
            <UInput v-model="form.description" />
        </UFormField>

        <UFormField label="Monto" required>
            <UInput type="number" v-model="form.amount" />
        </UFormField>

        <UFormField label="Categoría" required>
            <USelect v-model="form.category" :items="items"
                placeholder="Selecciona una categoría" class="w-48" />
        </UFormField>

        <UFormField label="Fecha" required>
            <UInput type="date" v-model="form.date" />
        </UFormField>

        <div class="flex gap-2">
            <UButton type="submit" :disabled="!validate()">
                Guardar
            </UButton>

            <NuxtLink to="/">
                <UButton color="error">Cancelar</UButton>
            </NuxtLink>
        </div>
    </UForm>
</template>
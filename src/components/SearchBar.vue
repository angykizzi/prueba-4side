<script setup lang="ts">
import InputText from "primevue/inputtext";

defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="mb-4 flex justify-start md:justify-end">
    <span class="p-input-icon-left">
      <InputText
        :value="modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        placeholder="Buscar por Nombre"
        class="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </span>
  </div>
</template>

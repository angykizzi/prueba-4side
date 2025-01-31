<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { defineProps, defineEmits, ref } from "vue";
import { Trash2 } from "lucide-vue-next"; // 📌 Icono de trash

defineProps<{
  value: any[];
  columns: { field: string; header: string }[];
}>();

const emit = defineEmits(["deleteRow"]);

const first = ref(0);
const rowsPerPage = 10;
</script>

<template>
  <DataTable
    :value="value"
    :columns="columns"
    class="w-full bg-white dark:bg-gray-900 dark:text-white"
    paginator
    :rows="rowsPerPage"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :first="first"
    @page="(event) => (first = event.first)"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
    responsiveLayout="scroll"
  >
    <!-- 🔹 Número de Registro -->
    <Column header="#" class="text-center">
      <template #body="slotProps">
        <span class="text-gray-700 font-medium">
          {{ first + slotProps.index + 1 }}
        </span>
      </template>
    </Column>

    <!-- 🔹 Columnas dinámicas -->
    <Column
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    >
      <template #body="slotProps">
        <span class="text-gray-900 font-medium">
          {{ slotProps.data[col.field] }}
        </span>
      </template>
    </Column>

    <!-- 🔹 Acciones -->
    <Column header="Acciones" class="text-center">
      <template #body="slotProps">
        <button
          @click="emit('deleteRow', slotProps.data)"
          class="p-2 text-red-500 hover:text-red-700 transition cursor-pointer"
        >
          <Trash2 :size="18" />
        </button>
      </template>
    </Column>

    <!-- ✅ Mensaje cuando no hay datos -->
    <template #empty>
      <div class="text-center text-gray-500 py-4">
        No se encontraron coincidencias
      </div>
    </template>
  </DataTable>
</template>

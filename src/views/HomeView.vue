<script setup lang="ts">
import { useUsers } from "@/composables/useUsers";
import { useDeleteConfirmation } from "@/composables/useDeleteConfirmation";
import DataTable from "@/components/DataTable.vue";
import SearchBar from "@/components/SearchBar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import DeleteConfirmationDialog from "@/components/DeleteUserConfirmationDialog.vue";
import { computed } from "vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";

const { filteredUsers, searchQuery, error, loading, deleteUser } = useUsers();
const { showModal, userToDelete, isDeleting, confirmDelete, proceedDelete } =
  useDeleteConfirmation();

// ✅ Crear un `computed` para modificar los datos sin tocar el componente reutilizable
const processedUsers = computed(() =>
  filteredUsers.value.map((user) => ({
    ...user,
    nombreCompleto:
      `${user.usuarioNombre} ${user.usuarioApellidoPaterno} ${user.usuarioApellidoMaterno}`.trim(),
  }))
);

// ✅ Definir las columnas de la tabla
const userColumns = [
  { field: "nombreCompleto", header: "Nombre Completo" },
  { field: "usuarioTelefono", header: "Teléfono" },
  { field: "usuarioEmail", header: "Correo Electrónico" },
];
</script>

<template>
  <div class="container mx-auto p-6">
    <!-- 🔹 Spinner de Carga -->
    <LoadingSpinner v-if="loading" />

    <!-- 🔹 Mensaje de Error -->
    <ErrorMessage v-else-if="error" :message="error" />

    <!-- 🔹 Tabla con Filtro -->
    <div v-else>
      <h1 class="text-center text-2xl font-semibold my-4">Página Principal</h1>
      <DarkModeToggle />
      <SearchBar v-model="searchQuery" />
      <div
        class="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
      >
        <DataTable
          :value="processedUsers"
          :columns="userColumns"
          @deleteRow="confirmDelete"
        />
      </div>
    </div>

    <!-- 🔹 Modal de Confirmación -->
    <DeleteConfirmationDialog
      :showModal="showModal"
      :userToDelete="userToDelete"
      :isDeleting="isDeleting"
      :proceedDelete="() => proceedDelete(deleteUser)"
      :closeDialog="() => (showModal = false)"
    />
  </div>
</template>

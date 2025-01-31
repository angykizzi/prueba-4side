<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useUsers } from "@/composables/useUsers";

const { users } = useUsers();
</script>

<template>
  <div class="card">
    <h2>Lista de Usuarios</h2>

    <DataTable :value="users" tableStyle="min-width: 50rem" paginator :rows="10" responsiveLayout="scroll">
      <Column field="usuarioNombre" header="Nombre"></Column>
      <Column field="usuarioApellidoPaterno" header="Apellido Paterno"></Column>
      <Column field="usuarioApellidoMaterno" header="Apellido Materno"></Column>
      <Column field="usuarioTelefono" header="Teléfono"></Column>
      <Column field="usuarioEmail" header="Correo Electrónico"></Column>
    </DataTable>
  </div>
</template>

<style scoped>
.card {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>

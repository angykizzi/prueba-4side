<script setup lang="ts">
import { useUsers } from "@/composables/useUsers";
import { useDeleteConfirmation } from "@/composables/useDeleteConfirmation";
import { useCamera } from "@/composables/useCamera";
import DataTable from "@/components/DataTable.vue";
import SearchBar from "@/components/SearchBar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import DeleteConfirmationDialog from "@/components/DeleteUserConfirmationDialog.vue";
import Header from "@/components/Header.vue";
import CameraModal from "@/components/CameraModal.vue";
import { computed } from "vue";
import { userColumns } from "@/constants";
import { formatUsers } from "@/utils/formatters";

const { filteredUsers, searchQuery, error, loading, deleteUser } = useUsers();
const { showModal, userToDelete, isDeleting, confirmDelete, proceedDelete } =
  useDeleteConfirmation();
const { selectedUser, showCameraModal, openCamera } = useCamera();

const processedUsers = computed(() => formatUsers(filteredUsers.value));
</script>

<template>
  <Header />
  <div class="container mx-auto p-6">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    
    <div v-else>
      <h1 class="text-center text-2xl font-semibold my-4">Página Principal</h1>
      <SearchBar v-model="searchQuery" />
      <div class="shadow-md rounded-xl overflow-hidden border border-gray-200">
        <DataTable
          :value="processedUsers"
          :columns="userColumns"
          @deleteRow="confirmDelete"
          @openCamera="openCamera"
        />
      </div>
    </div>

    <DeleteConfirmationDialog
      :showModal="showModal"
      :userToDelete="userToDelete"
      :isDeleting="isDeleting"
      :proceedDelete="() => proceedDelete(deleteUser)"
      :closeDialog="() => (showModal = false)"
    />
    <CameraModal v-model:visible="showCameraModal" :user="selectedUser" />
  </div>
</template>

import { ref } from "vue";

export function useDeleteConfirmation() {
  const showModal = ref(false);
  const userToDelete = ref<any>(null);
  const isDeleting = ref(false);

  // ✅ Función para abrir el modal y almacenar el usuario a eliminar
  const confirmDelete = (user: any) => {
    userToDelete.value = user;
    showModal.value = true;
  };

  // ✅ Función para proceder con la eliminación con Spinner
  const proceedDelete = async (deleteUser: (user: any) => void) => {
    isDeleting.value = true;
    setTimeout(() => {
      if (userToDelete.value) {
        deleteUser(userToDelete.value);
      }
      isDeleting.value = false;
      showModal.value = false;
    }, 500);
  };

  return { showModal, userToDelete, isDeleting, confirmDelete, proceedDelete };
}

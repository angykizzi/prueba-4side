import { ref, computed, type Ref, onMounted } from "vue";
import type { User } from "@/types/User";
import { getUsers } from "@/services/api";

export function useUsers() {
  const users: Ref<User[]> = ref([]);
  const error: Ref<string | null> = ref(null);
  const loading: Ref<boolean> = ref(true);
  const searchQuery = ref("");

  // ✅ Función para obtener los usuarios de la API
  const fetchUsers = async () => {
    loading.value = true;
    const { data, error: apiError } = await getUsers();
    if (apiError) {
      error.value = apiError;
    } else {
      users.value = [...data];
    }
    loading.value = false;
  };

  onMounted(fetchUsers);

  // ✅ Función para eliminar un usuario
  const deleteUser = (userToDelete: User) => {
    users.value = users.value.filter(
      (user) => user.usuarioEmail !== userToDelete.usuarioEmail
    );
    users.value = [...users.value];
    console.log("Usuario eliminado:", userToDelete);
  };

  // ✅ Filtrar usuarios por Nombre Completo
  const filteredUsers = computed(() => {
    return users.value.filter((user) =>
      `${user.usuarioNombre} ${user.usuarioApellidoPaterno} ${user.usuarioApellidoMaterno}`
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    );
  });

  return { users, filteredUsers, searchQuery, error, loading, deleteUser };
}

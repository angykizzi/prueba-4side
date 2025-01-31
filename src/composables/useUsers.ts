import { ref, onMounted } from "vue";
import { getUsers } from "@/services/api";

export function useUsers() {
  const users = ref([]);

  const fetchUsers = async () => {
    users.value = await getUsers();
    console.log("Usuarios cargados:", users.value);
  };

  onMounted(fetchUsers);

  return { users };
}

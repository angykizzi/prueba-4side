import { ref } from "vue";
import type { User } from "@/types/User";

export function useCamera() {
  const selectedUser = ref<User | null>(null);
  const showCameraModal = ref(false);

  const openCamera = (user: User) => {
    selectedUser.value = user;
    showCameraModal.value = true;
  };

  return { selectedUser, showCameraModal, openCamera };
}

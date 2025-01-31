import { ref, onMounted } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(false);

  // ✅ Cargar preferencia desde localStorage o sistema operativo
  const loadDarkMode = () => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      isDarkMode.value = savedMode === "dark";
    } else {
      isDarkMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyDarkMode();
  };

  // ✅ Aplicar clase dark y actualizar PrimeVue
  const applyDarkMode = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.value ? "dark" : "light");
  };

  // ✅ Alternar entre Modo Claro y Oscuro
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    applyDarkMode();
  };

  // ✅ Ejecutar al montar la app
  onMounted(loadDarkMode);

  return { isDarkMode, toggleDarkMode };
}

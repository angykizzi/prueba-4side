import { ref, onMounted } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(false);

  const loadDarkMode = () => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      isDarkMode.value = savedMode === "dark";
    } else {
      isDarkMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyDarkMode();
  };

  const applyDarkMode = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.value ? "dark" : "light");
  };

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    applyDarkMode();
  };

  onMounted(loadDarkMode);

  return { isDarkMode, toggleDarkMode };
}

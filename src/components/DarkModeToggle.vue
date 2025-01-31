<script setup lang="ts">
import { useDarkMode } from "@/composables/useDarkMode";

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
  <button
    @click="toggleDarkMode"
    class="p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
  >
    <span v-if="isDarkMode">🌙 Modo Oscuro</span>
    <span v-else>☀️ Modo Claro</span>
  </button>
</template>

<script setup lang="ts">
import DarkModeToggle from "@/components/DarkModeToggle.vue";
</script>

<template>
  <header
    class="w-full py-4 px-6 flex justify-between items-center bg-gray-100 dark:bg-[#1e1e1e] shadow-md"
  >
    <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">
      Mi Aplicación
    </h1>
    <DarkModeToggle />
  </header>
</template>

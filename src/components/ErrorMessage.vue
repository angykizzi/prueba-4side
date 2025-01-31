<script setup lang="ts">
defineProps<{ message: string }>();
</script>

<template>
  <div class="text-center text-red-600 font-bold py-4">
    ⚠️ {{ message }}
  </div>
</template>
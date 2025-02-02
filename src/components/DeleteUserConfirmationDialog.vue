<script setup lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const props = defineProps<{
  showModal: boolean;
  userToDelete: any;
  isDeleting: boolean;
  proceedDelete: () => void;
  closeDialog: () => void;
}>();
</script>

<template>
  <Dialog v-model:visible="props.showModal" modal header="Confirmación" class="w-96" :closable="false">
    <p class="text-lg">
      ¿Está seguro que desea eliminar a
      <span class="font-bold">{{ props.userToDelete?.nombreCompleto }}</span>?
    </p>
    <div class="flex justify-end gap-3 mt-4">
      <Button label="No" class="p-button-secondary" @click="props.closeDialog" :disabled="props.isDeleting" />
      <Button class="p-button-danger flex items-center" @click="props.proceedDelete" :disabled="props.isDeleting">
        <span v-if="props.isDeleting" class="mr-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        {{ props.isDeleting ? "Eliminando..." : "Sí, Eliminar" }}
      </Button>
    </div>
  </Dialog>
</template>

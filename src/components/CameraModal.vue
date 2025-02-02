<script setup lang="ts">
import { ref, watch, onUnmounted, defineEmits } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const props = defineProps<{ visible: boolean; user: any }>();
const emit = defineEmits(["update:visible"]);

const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const photo = ref<string | null>(null);
const cameraError = ref<string | null>(null);
let stream: MediaStream | null = null;

const checkCameraPermissions = async () => {
  try {
    const permission = await navigator.permissions.query({
      name: "camera" as any,
    });
    if (permission.state === "denied") {
      cameraError.value =
        "Permiso de cámara denegado. Actívalo en la configuración del navegador.";
      return false;
    }
    return true;
  } catch (error) {
    console.warn("⚠ No se pudo verificar el estado de los permisos.", error);
    return false;
  }
};

const startCamera = async () => {
  cameraError.value = null;
  try {
    const hasPermission = await checkCameraPermissions();
    if (!hasPermission) return;

    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (video.value) {
      video.value.srcObject = stream;
    }
  } catch (error) {
    console.error("❌ Error al acceder a la cámara:", error);
    cameraError.value =
      "No se pudo acceder a la cámara. Verifica los permisos en tu navegador.";
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
};

const capturePhoto = () => {
  if (video.value && canvas.value) {
    const context = canvas.value.getContext("2d");
    if (context) {
      canvas.value.width = video.value.videoWidth;
      canvas.value.height = video.value.videoHeight;
      context.drawImage(
        video.value,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
      photo.value = canvas.value.toDataURL("image/png");
    }
  }
};

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue) {
      await startCamera();
    } else {
      stopCamera();
    }
  }
);

const closeModal = () => {
  emit("update:visible", false);
  stopCamera();
};

onUnmounted(() => {
  stopCamera();
});
</script>

<template>
  <Dialog
    v-model:visible="props.visible"
    modal
    header="Tomar Foto"
    :style="{ width: '25rem' }"
    :closable="false"
    @hide="closeModal"
  >
    <p class="text-center mb-2">
      📸 Capturar imagen de <b>{{ props.user?.nombreCompleto }}</b>
    </p>

    <div v-if="cameraError" class="text-red-500 text-center mb-2">
      {{ cameraError }}
    </div>

    <div class="flex flex-col items-center">
      <video ref="video" class="w-full max-w-md bg-gray-200" autoplay></video>
      <canvas ref="canvas" class="hidden"></canvas>
      <img v-if="photo" :src="photo" alt="Foto capturada" class="mt-4" />

      <div class="flex items-center justify-center gap-3 mt-4">
        <Button
          label="Cancelar"
          class="p-button-secondary mt-2"
          @click="closeModal"
        />
        <Button
          label="Capturar"
          class="mt-4 p-button-success"
          @click="capturePhoto"
          :disabled="!!cameraError"
        />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
video {
  transform: scaleX(-1);
}
</style>

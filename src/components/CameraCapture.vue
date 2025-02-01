<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const visible = ref(false);
const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const photo = ref<string | null>(null);
let stream: MediaStream | null = null;

const startCamera = async () => {
  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  if (video.value) {
    video.value.srcObject = stream;
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

watch(visible, (newValue) => {
  if (newValue) {
    startCamera();
  } else {
    stopCamera();
  }
});

onUnmounted(() => {
  stopCamera();
});
</script>

<template>
  <Button label="Show" @click="visible = true" />
  <Dialog
    v-model:visible="visible"
    modal
    header="Tomar Foto"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col items-center">
      <video ref="video" class="w-full max-w-md bg-gray-200" autoplay></video>
      <button
        @click="capturePhoto"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Tomar Foto
      </button>
      <canvas ref="canvas" class="hidden"></canvas>
      <img v-if="photo" :src="photo" alt="Foto capturada" class="mt-4" />
    </div>
  </Dialog>
</template>

<style scoped>
video {
  transform: scaleX(-1);
}
</style>

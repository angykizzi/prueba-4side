import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import Aura from "@primevue/themes/aura";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  ripple: true,
});
app.use(ConfirmationService);
app.use(DialogService);

app.mount("#app");

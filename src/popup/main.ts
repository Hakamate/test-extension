import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./Popup.vue";

import '../assets/index.scss'

const app = createApp(App).use(createPinia());
app.mount('#app')

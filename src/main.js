// src/main.js (Final update)
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // <-- NEW IMPORT

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router); // <-- Tell the app to use the router

app.mount('#app');
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import 'vue-toast-notification/dist/theme-sugar.css';
import "@fortawesome/fontawesome-free/css/all.min.css"
import './assets/style.css'
import './assets/main.css'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

createApp(App).use(router).use(pinia).mount('#app')
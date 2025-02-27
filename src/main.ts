import { createApp } from 'vue'
import './style.css'
import "../src/assets/styles/index.css"
import router from './router/index'
import App from './App.vue'

createApp(App).use(router).mount('#app')

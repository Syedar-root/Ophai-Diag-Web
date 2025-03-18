import { createApp } from 'vue'
import './style.css'
import '../src/assets/styles/index.css'
import router from './router'
import { setupDirectives ,routeDirective} from './util/custom_directive'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
// 注册自定义指令
// setupDirectives(app)
app.directive('route',routeDirective);
app.use(router).use(ElementPlus).use(pinia).mount('#app')

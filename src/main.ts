import { createApp } from 'vue'
import './style.css'
import "../src/assets/styles/index.css"
import router from './router'
import {setupDirectives} from "./util/custom_directive";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App);
// 注册自定义指令
setupDirectives(app);
app.use(router).use(ElementPlus).mount('#app')

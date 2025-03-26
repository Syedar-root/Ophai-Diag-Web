import { createApp } from 'vue'
import './style.css'
import '../src/assets/styles/index.css'
import router from './router/index.ts'
import { setupDirectives } from './util/custom_directive'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { initPerformanceMonitor } from './util/performance'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

// 初始化性能监控
const performanceMonitor = initPerformanceMonitor()

// 收集首屏性能数据
const observer = new PerformanceObserver((list) => {
  const fcpEntry = list.getEntriesByName('first-contentful-paint')[0];
  const [navigationEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  
  if (fcpEntry && navigationEntry) {
    // const fcp = fcpEntry.startTime - navigationEntry.startTime;
    const fcp = performanceMonitor.getFirstContentfulPaint();
    const firstPaint = performanceMonitor.getFirstPaintTime();
    
    performanceMonitor.sendMetrics({
      firstPaint: `${firstPaint.toFixed(2)}ms`,
      firstContentfulPaint: `${fcp.toFixed(2)}ms`
    });
  }
});

observer.observe({ type: 'paint', buffered: true });

// 注册自定义指令
setupDirectives(app)
// app.directive('route',routeDirective);
app.use(router).use(pinia).mount('#app')

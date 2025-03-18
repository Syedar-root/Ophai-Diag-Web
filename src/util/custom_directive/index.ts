// 在文件顶部添加类型声明
declare global {
  // interface HTMLElement {
  //     _routeHandler: () => void
  // }
}

import type { App } from 'vue'
import router from '../../router'

export const routeDirective = {
  mounted(el: HTMLElement, binding: { value: string }) {
    el.style.cursor = 'pointer'

    const handler = () => {
      // 使用导入的路由实例替代useRouter()
      router.push(binding.value)
    }

    el.addEventListener('click', handler)
    // 存储处理器以便卸载时移除
    el._routeHandler = handler
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('click', el._routeHandler)
  }
}

export function setupDirectives(app: App) {
  app.directive('route', routeDirective)
}

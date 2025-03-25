// 在文件顶部添加类型声明
declare global {
  interface HTMLElement {
    _routeHandler: () => void
  }
}

import type { App } from 'vue'
import router from '../../router'
import type { Directive } from 'vue' // 添加类型导入

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
  unmounted(el: HTMLElement & { _routeHandler?: () => void }) {
    if (el._routeHandler) {
      el.removeEventListener('click', el._routeHandler)
    }
  }
} as Directive<HTMLElement, string>

export function setupDirectives(app: App) {
  app.directive('route', routeDirective)
}

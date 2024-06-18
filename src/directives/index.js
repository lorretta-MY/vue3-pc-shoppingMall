// 使用了vueuse获取元素是否出现在视口中的函数方法
import { useIntersectionObserver } from '@vueuse/core'

// 创建 图片懒加载的自定义指令
export const lazyImgPlugin = {
  install(app) {
    app.directive('lazy-img', {
      // el 指令绑定的元素
      // binding 指令等号后面的内容 binding.value这里是图片的src
      mounted(el, binding) {
        // el.src = `@/assets/images/none.png`
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 替换img真正的图片地址
            el.src = binding.value
            stop()
          }
        })
      }
    })
  }
}

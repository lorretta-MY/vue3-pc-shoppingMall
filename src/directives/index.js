// 使用了vueuse获取元素是否出现在视口中的函数方法
import { useIntersectionObserver } from '@vueuse/core'
import { onBeforeMount, onBeforeUpdate } from 'vue'

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

// 后台返回的权限code列表存入store
const hasBtnPermission = (value)=>{
  // 判断是否是数组 是就递归继续判断具体code
  if(Array.isArray(value)){
    return value.some((code=> hasBtnPermission(code)))
  }else{
    // mock code list
    return ['savePublic','saveMine','downloadPublic'].indexOf(value) !== -1
  }
}

// 自定义的按钮权限判断指令
export const hasPermission = {
  install(app) {
    app.directive('permission', {
      // el 指令绑定的元素
      // binding 指令等号后面的内容 binding.value这里是传入的权限code
      beforeMount(el,binding){
        const {value, instance} = binding
        instance._originDisplayStyle = el.style.display
        if(!hasBtnPermission(value)){
          el.style.display = 'none'
        }
      },
      beforeUpdate(el,binding){
        const {value, instance} = binding
        instance._originDisplayStyle = el.style.display
        if(!hasBtnPermission(value)){
          el.style.display = 'none'
        }else{
          el.style.display = instance._originDisplayStyle
        }
      }
    })
  }
}

import { createApp } from 'vue'

// 样式初始化
import './styles/reset.css'
import './styles/common.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 引入并注册自定义的图片懒加载组件
import { lazyImgPlugin } from '@/directives/index'
app.use(lazyImgPlugin)

// 引入插件化的全局组件
import { componentsPlugin } from '@/components/index'
app.use(componentsPlugin)

// 引入pinia数据持久化插件
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')

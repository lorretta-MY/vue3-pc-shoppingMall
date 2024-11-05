import { createApp } from 'vue'
const app = createApp(App)

// v-md-editor相关配置
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})

app.use(VueMarkdownEditor);

// 样式初始化
import './styles/reset.css'
import './styles/common.css'

import App from './App.vue'
import router from './router'


import { ElMessage } from 'element-plus'

// 引入help
import helper from '@/utils/index.js'
app.config.globalProperties.$helper = helper

// $copy 全局复制
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
app.config.globalProperties.$copy = async (text) => {
    try {
        await toClipboard(text)
        ElMessage.success('复制成功')
    } catch (error) {
        ElMessage.warning('复制失败: ' + error.message)
    }
}

// 引入并注册自定义的权限判断指令
import { hasPermission } from '@/directives/index'
app.use(hasPermission)


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

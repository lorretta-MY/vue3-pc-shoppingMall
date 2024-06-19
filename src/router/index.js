// createRouter 创建路由实例 createWebHistory 创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'

// 引入组件
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Test from '@/views/test/index.vue'
import Home from '@/views/Home/index.vue'

// 引入模块路由
import Modules from './modules/index'

// 获取用户是否登录
const isLogin =
  localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).userInfo?.token
    ? true
    : false
console.log(isLogin)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
          // component: () => import('./views/Home/index')
        },
        ...Modules
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
  // 路由行为的配置项 切换路由时自动滚回顶部
  // scrollBehavior(){
  //   return {
  //     top:0
  //   }
  // }
})

router.beforeEach((to, from, next) => {
  ElLoading.service({
    fullscreen: true,
    text: 'Loading...'
  })
  // if (!isLogin) {
  //   // 跳转至登录页面
  //   router.push('/login')
  //   return
  // }
  window.scrollTo(0, 0)
  next()
})

router.afterEach((to) => {
  setTimeout(() => {
    const loadingInstance = ElLoading.service()
    loadingInstance.close()
  }, 500)
  document.title = to.meta.title || 'my project'
})

export default router

import axios from 'axios'

// 引入toast
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

// 引入pinia里的userstore
import { useLoginUserStore } from '@/stores/userStore'
import router from '@/router'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
http.interceptors.request.use(
  (config) => {
    const userStore = useLoginUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (e) => {
    // 接口错误提示
    ElMessage({
      type: 'error',
      message: e.response.data.message || e.response.data.msg || '服务器错误'
    })
    // 接口401 token过期统一处理
    if (e.response.status == '401') {
      // 清除用户数据
      const userStore = useLoginUserStore()
      userStore.clearUserInfo()
      setTimeout(() => {
        // 跳转至登录页面
        router.replace('/login')
      }, 1200)
    }
    return Promise.reject(e)
  }
)
export default http

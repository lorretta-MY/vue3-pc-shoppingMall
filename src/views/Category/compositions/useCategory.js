// 获取url里的id值
import { useRoute } from 'vue-router'
// 根据id获取二级导航以及商品信息
import { ref, onMounted } from 'vue'
import { getCategoryHeaderAPI } from '@/api/category'
// 解决路由缓存的问题
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const route = useRoute()
  const nav_name = ref('')
  const categoryData = ref([])
  const getNavList = async (id) => {
    const res = await getCategoryHeaderAPI(id ? id : route.params.id)
    nav_name.value = res.result.name
    categoryData.value = res.result
  }
  onMounted(() => {
    getNavList()
  })
  // 解决路由缓存的问题 当router更新时重新发送页面请求
  onBeforeRouteUpdate((to) => {
    getNavList(to.params.id)
  })
  return {
    nav_name,
    categoryData
  }
}

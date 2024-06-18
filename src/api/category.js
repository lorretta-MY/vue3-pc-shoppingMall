import http from '@/utils/http'

// 获取一级导航
export function getCategoryAPI() {
  return http({
    url: 'home/category/head'
  })
}

// 获取二级导航
export function getCategoryHeaderAPI(id) {
  return http({
    url: '/category',
    params:{
      id
    }
  })
}
// 获取二级分类面包屑数据
export const getCategoryFilterAPI = (id) => {
  return http({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

// 二级分类商品数据
   export const getSubCategoryAPI = (data) => {
    return http({
      url:'/category/goods/temporary',
      method:'POST',
      data
    })
  }
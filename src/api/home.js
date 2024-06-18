import http from '@/utils/http'

//获取首页轮播图
export function getHomeBannerAPI(type) {
  // return http({
  //   url: 'home/banner'
  // })
  // 默认为1 商品为2
  // const { type } = params
  return http({
    url: '/home/banner',
    params: {
      distributionSite: type
    }
  })
}

//获取新鲜好物
export function getHomeNewAPI() {
  return http({
    url: 'home/new'
  })
}
//获取人气推荐
export function getHomeHotAPI() {
  return http({
    url: 'home/hot'
  })
}
//获取产品列表
export function getHomeGoodsAPI() {
  return http({
    url: 'home/goods'
  })
}
//

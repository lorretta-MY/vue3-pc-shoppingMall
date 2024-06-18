import http from '@/utils/http'

// 用户登录
export const loginApi = (data)=>{
    return http({
        url: 'login',
        method: 'POST',
        data,
    })
}

// 会员中心 猜你喜欢
export const getLikeListAPI = ({ limit = 4 }) => {
  return http({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}

// 会员中心 订单列表
export const getUserOrder = (params) => {
  return http({
    url:'/member/order',
    method:'GET',
    params
  })
}




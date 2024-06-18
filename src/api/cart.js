import http from '@/utils/http'


// 加入购物车
export const addCartApi = ({skuId,count}) => {
    return http({
      url:'/member/cart',
      method:'POST',
      data:{
        skuId,
        count
      }
    })
  }

// 获取购物车列表 
export const getCartApi = ()=>{
    return http({
        url: '/member/cart'
    })
}

// 删除购物车
export const delCartApi = (data)=>{
    return http({
        url: '/member/cart',
        method: 'DELETE',
        data,
    })
}

// 合并购物车
export const mergeCartApi = (data)=>{
    return http({
        url: '/member/cart/merge',
        method: 'POST',
        data,
    })
}


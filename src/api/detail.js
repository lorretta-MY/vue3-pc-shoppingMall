import http from '@/utils/http'
// 商品详情
export const getDetailApi = (id)=>{
    return http({
        url: 'goods',
        params:{id}
    })
}
// 热销推荐
export const getGoodsHotApi = ({id, type, limit = 3})=>{
    return http({
        url: 'goods/hot',
        params:{
            id, 
            type, 
            limit
          }
    })
}
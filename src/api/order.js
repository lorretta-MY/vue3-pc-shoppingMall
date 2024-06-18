import http from '@/utils/http'

// 获取订单详情
export const getOrderDetailApi = ()=>{
    return http({
        url: '/member/order/pre',
    })
}

// 创建订单
export const creatOrderApi = (data)=>{
    return http({
        url: '/member/order',
        method: 'POST',
        data,
    })
}

// 获取支付订单详情
export const getOrderPayApi = (id)=>{
    return http({
        url: `/member/order/${id}`,
    })
}



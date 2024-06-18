// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi } from '@/api/user'
import { useCartStore } from './cartStore'
import { mergeCartApi } from '@/api/cart'

export const useLoginUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()

    // 定义数据store
    const userInfo = ref({})

    // 定义获取用户数据的方法 action
    const getUserInfo = async ({ account: name, password }) => {
      const res = await loginApi({ account: name, password })
      userInfo.value = res.result
      // 登录成功 合并本地购物车数据
      await mergeCartApi(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      // 获取最新的购物车列表
      cartStore.updateCartList()
    }
    // 清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
      // 清除 本地购物车数据
      cartStore.clearCart()
    }
    // 以对象的方式把数据和方法return出去
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  { persist: true }
)

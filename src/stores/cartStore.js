import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLoginUserStore } from './userStore'
import { addCartApi, getCartApi, delCartApi } from '@/api/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 商品列表
    let cartList = ref([])

    // 通过用户token判断是否登录 记住这里的计算属性，要实时更新当前登陆状态
    const useUserStore = useLoginUserStore()
    const isLogin = computed(() => (useUserStore?.userInfo?.token ? true : false))

    // 接口更新购物车列表
    const updateCartList = async () => {
      const res = await getCartApi()
      cartList.value = res.result
    }

    // 加入购物车
    const addCart = async (good) => {
      if (isLogin.value) {
        await addCartApi({
          skuId: good.skuId,
          count: good.count
        })
        updateCartList()
      } else {
        // 通过skuId判断添加的是否为同一个商品
        const item = cartList.value.find((item) => good.skuId === item.skuId)
        if (item) {
          item.count++
        } else {
          cartList.value.push(good)
        }
        // console.log('useCartStore cartList end', cartList.value);
      }
    }
    // 清空购物车
    const clearCart = () => {
      cartList.value = []
    }
    // 删除购物车某一项
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartApi({
          ids: [skuId]
        })
        updateCartList()
      } else {
        // cartList.value.filter(v=> v.skuId  !== skuId )
        const idx = cartList.value.findIndex((v) => skuId === v.skuId)
        cartList.value.splice(idx, 1)
      }
    }

    // 结算页 购物车切换单选
    const singleChange = (i, selected) => {
      // console.log('切换单选', i, selected);
      const good = cartList.value.find((item) => item.skuId === i.skuId)
      good.selected = selected
    }
    // 结算页 购物车切换全选
    const AllChange = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // 计算属性
    // 1、列表数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 2、列表总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.price * c.count, 0))
    // 3、是否全选
    const isAllChecked = computed(() => cartList.value.every((item) => item.selected))
    // 4、结算页 已选件数
    const checkedAllCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0)
    )
    // 5、结算页 已选总价
    const checkedAllPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0)
    )

    return {
      cartList,
      allCount,
      allPrice,
      isAllChecked,
      checkedAllCount,
      checkedAllPrice,
      addCart,
      clearCart,
      delCart,
      singleChange,
      AllChange,
      updateCartList
    }
  },
  {
    persist: true
  }
)

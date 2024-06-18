import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import Cart from '@/views/Cart/index.vue'
import Order from '@/views/Order/index.vue'
import Pay from '@/views/Pay/index.vue'

import Member from '@/views/Member/index.vue'
import MemberUser from '@/views/Member/components/user.vue'
import MemberOrder from '@/views/Member/components/order.vue'

const routes = [
  {
    path: 'category/:id',
    component: Category
  },
  {
    path: 'category/sub/:subid',
    component: SubCategory
  },
  {
    path: 'detail/:id',
    component: Detail
  },
  {
    path: 'cart',
    component: Cart
  },
  {
    path: 'order',
    component: Order
  },
  {
    path: 'pay',
    component: Pay
  },
  // 个人中心+三级路由页面
  {
    path: 'member',
    component: Member,
    redirect: 'member/user',
    children: [
      {
        path: 'user',
        component: MemberUser
      },
      {
        path: 'order',
        component: MemberOrder
      }
    ]
  }
]

export default routes

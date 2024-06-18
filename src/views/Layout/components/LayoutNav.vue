<script setup>
import {useLoginUserStore} from '@/stores/userStore'
const useStore = useLoginUserStore()
import {useRouter} from 'vue-router'
const router = useRouter()

const doOutLogin = ()=>{
  // 清除当前用户信息
  useStore.clearUserInfo()
  // 跳转到登录页
  router.replace('/login')

}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="useStore.userInfo.token">
          <img :src="useStore.userInfo.avatar" alt="" class="avatar" v-if="useStore.userInfo.avatar">
          <li><a href="javascript:;"><i class="iconfont icon-user" ></i>{{useStore.userInfo.account}}</a></li>
          <li>
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="doOutLogin">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
          <li><a href="javascript:;" @click="$router.push('/member/user')">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
     .avatar{
        width: 20px;
        height: 20px;
        display: inline-block;
      }
    li {
     
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>@/stores/userStore
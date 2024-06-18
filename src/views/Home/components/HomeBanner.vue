<script setup>
import { ref, onMounted, toRefs } from 'vue'
import { getHomeBannerAPI } from '@/api/home'

const props = defineProps({
  bannerType: {
    type: String
  }
})
const { bannerType } = toRefs(props)

const bannerList = ref([])
const getBanner = async () => {
  let res = {}
  if (bannerType.value == 'goods') {
    res = await getHomeBannerAPI('2')
  } else {
    res = await getHomeBannerAPI('1')
  }
  bannerList.value = res.result
}
onMounted(() => {
  getBanner()
})
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="banner" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>

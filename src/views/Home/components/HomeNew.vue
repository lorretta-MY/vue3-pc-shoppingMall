<script setup>
import HomePanel from './HomePanel.vue'
import {ref, onMounted} from 'vue'
import {getHomeNewAPI} from '@/api/home'

const goodList = ref([])
const getGoodList = async()=>{
    const res = await getHomeNewAPI()
    goodList.value = res.result
}
onMounted(()=>{
    getGoodList()
})

</script>

<template>
<HomePanel title="新鲜好物" sub-title="新鲜出炉 品质过硬">
  <ul class="goods-list">
    <li v-for="item in goodList" :key="item.id">
      <RouterLink :to="`detail/${item.id}`">
        <img v-lazy-img="item.picture"   alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
</HomePanel>

</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    // background: #f0f9f4;
    transition: all .5s;
    border-radius: 10px;
    border: 1px solid #efefef;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
      border-radius: 10px 10px 0 0;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
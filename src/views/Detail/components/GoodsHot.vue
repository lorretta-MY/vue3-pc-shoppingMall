<script setup>
import { getGoodsHotApi } from '@/api/detail.js'
import { ref, onMounted, toRefs, computed } from 'vue'

const props = defineProps({
  id: {
    type: String || Number
  },
  limit: {
    type: String || Number
  },
  hotType: {
    type: String || Number
  }
})

const TYPEMAP = {
  1: '24小时榜',
  2: '一周热销',
  3: '总销热榜'
}
const panelTitle = computed(() => TYPEMAP[props.hotType])

// 获取商品详情数据
const GoodsHotObj = ref({})
const getGoodsHot = async () => {
  const res = await getGoodsHotApi({
    id: props.id,
    limit: props.limit,
    type: props.hotType //热销类型，1为24小时，2为周榜，3为总榜，默认为1
  })
  GoodsHotObj.value = res.result
}
onMounted(() => {
  getGoodsHot()
})
</script>

<template>
  <div class="goods-hot">
    <!-- <h3 v-if="hotType == 1">24小时榜单</h3>
    <h3 v-else-if="hotType == 2">一周热销</h3>
    <h3 v-else-if="hotType == 3">总销热榜</h3> -->
    <h3>{{ panelTitle }}</h3>
    <!-- 商品列表-->
    <rita-goods-item v-for="good in GoodsHotObj" :key="good.id" :goods="good" />
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  background-color: #fff;
  padding-bottom: 20px;
  margin-bottom: 20px;
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    // padding-left: 25px;
    text-align: center;
    margin-bottom: 14px;
    font-weight: normal;
  }
  .goods-item {
    margin: 0px auto 0;
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;
    img {
      width: 160px;
      height: 160px;
    }
    p {
      padding-top: 10px;
    }
    .name {
      font-size: 16px;
    }
    .desc {
      color: #999;
      height: 29px;
    }
    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>

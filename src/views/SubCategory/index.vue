<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api/category'
// 获取url里的id值
import { useRoute } from 'vue-router'
const route = useRoute()
// 获取二级面包屑导航的值
const subCategoryData = ref({})
const getSubCategory = async () => {
  let res = await getCategoryFilterAPI(route.params.subid)
  subCategoryData.value = res.result
}

// 获取二级分类里的商品列表数据
let queryData = ref({
  categoryId: route.params.subid,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
  //  sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
})
const subCategoryGoodsList = ref([])
const getSubCategorGoodsList = async () => {
  const res = await getSubCategoryAPI(queryData.value)
  subCategoryGoodsList.value = res.result.items
}
const tabChange = () => {
  queryData.value.page = 1
  getSubCategorGoodsList(queryData)
}
// 瀑布流 商品无限加载
const disabled = ref(false)
const load = async () => {
  // 触底一次 页码+1 并重新发送请求
  queryData.value.page++
  const res = await getSubCategoryAPI(queryData.value)
  // 商品数据拼接
  subCategoryGoodsList.value = [...subCategoryGoodsList.value, ...res.result.items]
  // 加载完毕 停止监听
  if (res?.result?.items.length === 0) {
    disabled.value = true
  }
}

onMounted(() => {
  getSubCategory()
  getSubCategorGoodsList()
})
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategoryData.parentId}` }"
          >{{ subCategoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs type="card" v-model="queryData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- element plus组件提供的触底监听 与停止监听 -->
      <!-- v-infinite-scroll="load" :infinite-scroll-disabled="disabled" -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <rita-goods-item v-for="good in subCategoryGoodsList" :key="good.id" :goods="good" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>

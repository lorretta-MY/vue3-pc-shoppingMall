<template>
  <div class="my-infinite-list-wrap">
    <baseVirtualScroll
      v-if="goodsList.length > 0"
      :list="goodsList"
      :grid-number="2"
      :gap="12"
      :item-main-size="60"
      :empty="goodsList.length == 0 ? true : false"
      key-field="name"
    >
      <template #item="{ item, active }">
        <div class="card-item">
          <el-tag type="success">{{ item.desc }}</el-tag>
          <span class="txt">{{ item.name }}</span>
        </div>
      </template>
    </baseVirtualScroll>
  </div>
  <!-- 无限加载组件 -->
  <baseInfiniteLoading
    v-if="goodsList.length > 0"
    :identifier="`{mockRefreshKey}`"
    :handle-load="loadMore"
  />
  <el-empty v-else description="暂无数据" />
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance, onMounted, watch } from "vue";
import { descriptionProps, ElMessage } from "element-plus";
import { getSubCategoryAPI } from "@/api/category";

import baseInfiniteLoading from "./baseInfiniteLoading.vue";
import baseVirtualScroll from "./baseVirtualScroll.vue";

import { useRoute } from "vue-router";
const route = useRoute();

const { proxy: instance } = getCurrentInstance();

let fetchAllData = null;
const goodsList = ref([]);

const nextPage = ref(1);
const pageSize = ref(20);
const mockRefreshKey = ref(0);
const mockPageGoodsList = ref([]);

// 模拟分页加载
const loadMore = async () => {
  await fetchAllData;

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 50);
  });

  const startIndex = (nextPage.value - 1) * pageSize.value;
  const list = goodsList.value.slice(startIndex, startIndex + pageSize.value);

  mockPageGoodsList.value = [...mockPageGoodsList.value, ...list];

  nextPage.value += 1;

  return mockPageGoodsList.value.length >= goodsList.value.length;
};

// 获取二级分类里的商品列表数据
const refreshList = async () => {
  try {
    fetchAllData = getSubCategoryAPI({
      categoryId: "1008017",
      page: 1,
      pageSize: 500,
      sortField: "publishTime",
    });
    const res = await fetchAllData;
    // if (res?.code !== 1) {
    //   return;
    // }
    goodsList.value = res.result.items;
    mockRefreshKey.value++;
    mockPageGoodsList.value = [];
    nextPage.value = 1;
  } catch (error) {
    console.log(error);
  }
};

const fetchId = computed(() => route.query.goodsId || "1008017");
watch(
  () => fetchId,
  () => {
    refreshList();
  },
  {
    deep: true,
    immediate: true,
  }
);
// onMounted(() => {
//   getSubCategorGoodsList();
// });
</script>

<style lang="scss" scoped>
.my-infinite-list-wrap {
  background-color: rgb(248, 250, 252);
  padding: 20px;
  .card-item {
    padding: 10px;
    background-color: #fff;
    border-radius: 12px;
    margin-bottom: 20px;
    cursor: pointer;
    border: 1px solid transparent;

    :deep(.el-tag) {
      max-width: 60%;
      overflow: hidden;

      .el-tag__content {
        width: 100%;
      }

      word-break: break-all;
    }

    &.active {
      border: 1px solid #27ba9b;
    }

    span.txt {
      font-weight: 600;
      margin-left: 6px;
    }
  }
}
</style>

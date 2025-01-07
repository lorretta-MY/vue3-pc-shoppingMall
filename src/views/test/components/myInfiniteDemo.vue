<template>
  <el-scrollbar height="600px">
    <div class="my-infinite-list-wrap">
      <ul class="card-list">
        <li
          class="card-item"
          :class="i.active ? 'active' : ''"
          v-for="i in subCategoryGoodsList"
          :key="i.id"
          @mouseenter="handleCardActive(i)"
          @mouseleave="handleCardMoveOut"
        >
          <el-tag type="success">{{ i.desc }}</el-tag>
          <span class="txt">{{ i.name }}</span>
        </li>
      </ul>
    </div>
    <!-- 无限加载组件 -->
    <baseInfiniteLoading :identifier="`{refreshKey}`" :handle-load="loadMore" />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { getSubCategoryAPI } from "@/api/category";

import baseInfiniteLoading from "./baseInfiniteLoading.vue";

const { proxy: instance } = getCurrentInstance();

const nextPage = ref(1);
const pageSize = ref(10);
const subCategoryGoodsList = ref([]);

const getList = async (pageNum) => {
  let res = [];
  try {
    res = await getSubCategoryAPI({
      page: pageNum,
      pageSize: pageSize.value,
      categoryId: "1008017",
      sortField: "publishTime",
    });
    if (res?.code !== 1) {
      console.log(res);
    }
  } catch (error) {
    throw error;
  }

  const total = res.result?.counts || 0;
  const list = res.result?.items || [];

  return {
    total,
    list,
  };
};

const refreshKey = ref(0);
const refreshList = () => {
  nextPage.value = 1;
  subCategoryGoodsList.value = [];
  refreshKey.value++;
};

const loadMore = async () => {
  const { list, total } = await getList(nextPage.value);
  subCategoryGoodsList.value.push(...list);
  nextPage.value += 1;
  return subCategoryGoodsList.value.length >= total;
};

onMounted(() => {
  refreshList();
});

// watch(
//     ()=> props.id,
//     ()=>{
//         refreshList()
//     },
//     {
//         flush:'sync',
//         immediate: true
//     }
// )

const handleCardActive = (card) => {
  subCategoryGoodsList.value.map((v) => {
    v.active = false;
  });
  card.active = true;
};
const handleCardMoveOut = () => {
  subCategoryGoodsList.value.map((v) => {
    v.active = false;
  });
};
</script>

<style lang="scss" scoped>
.my-infinite-list-wrap {
  //   height: calc(100vh - 160px);
  // overflow-y: auto;
  background-color: rgb(248, 250, 252);
  padding: 20px;

  ul.card-list {
    li.card-item {
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
}
</style>

<template>
  <p class="demo-title">draggable demo1</p>
  <BaseDraggable v-model="subCategoryGoodsList" item-key="id">
    <template #items="{ element }">
      <span class="card-item">{{ element.name }}</span>
    </template>
  </BaseDraggable>

  <hr />

  <p class="demo-title">draggable demo2</p>
  <baseDraggableSimpleDemo />
</template>

<script setup>
import { computed, ref, getCurrentInstance, onMounted, watch } from "vue";
import { descriptionProps, ElMessage } from "element-plus";
import { getSubCategoryAPI } from "@/api/category";

import BaseDraggable from "../components/baseDraggable.vue";
import baseDraggableSimpleDemo from "./baseDraggableSimpleDemo.vue";

import { useRoute } from "vue-router";
const route = useRoute();

const { proxy: instance } = getCurrentInstance();

let queryData = ref({
  categoryId: "1008017",
  page: 10,
  pageSize: 8,
  sortField: "publishTime",
});
const subCategoryGoodsList = ref([]);
const getSubCategorGoodsList = async () => {
  const res = await getSubCategoryAPI(queryData.value);
  subCategoryGoodsList.value = res.result.items;
};

onMounted(() => {
  getSubCategorGoodsList();
});
</script>

<style lang="scss" scoped>
.card-item {
  margin-left: 8px;
  padding: 4px 6px;
  background-color: rgb(223, 228, 234);
  border-radius: 4px;
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
.demo-title {
  font-weight: 600;
  margin: 20px 0;
}
</style>

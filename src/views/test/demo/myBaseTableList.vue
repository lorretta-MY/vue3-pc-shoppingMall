<template>
  <div class="my-base-table-list-wrap">
    <!-- 列表 -->
    <P class="list-title"
      >表头自定义筛选高级表格
      <el-button size="small" @click="resetTable">重置</el-button></P
    >
    <el-table
      style="width: 100%"
      v-loading="isTableLoading"
      :data="tableData"
      :border="true"
      ref="myFilterTableRef"
      @filter-change="handleTableFiltersChange"
      @sort-change="handleTableSortChange"
    >
      <el-table-column label="商品id" width="130">
        <template #default="scope">
          {{ scope.row.id }}
        </template>
        <template #header>
          <baseHeaderSearchDown
            label="商品id"
            type="search"
            ref="goodsIdSearchDownRef"
            @search="(val) => handleTableHeaderSearch('goodsId', val)"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
        <template #header>
          <baseHeaderSearchDown
            label="商品名称"
            type="search"
            ref="goodsNameSearchDownRef"
            @search="(val) => handleTableHeaderSearch('goodsName', val)"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品描述">
        <template #default="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <!-- 前端筛选 -->
      <el-table-column
        label="商品价格"
        width="140"
        sortable
        :sort-method="sortPrice"
      >
        <template #default="scope"> ￥{{ scope.row.price || "-- " }} </template>
      </el-table-column>
      <!-- 后端接口入参实现筛选 -->
      <el-table-column
        label="商品序列"
        width="140"
        sortable="custom"
        column-key="order"
      >
        <template #default="scope">
          {{ scope.row.orderNum }}
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        label="tags"
        :filters="[
          { text: 'Home', value: 'Home' },
          { text: 'Office', value: 'Office' },
        ]"
        column-key="tags"
        filter-placement="bottom-end"
      >
        <!-- :filter-method="filterTag" -->
        <template #default="scope">
          <el-tag
            :type="scope.row.orderNum > 20 ? 'primary' : 'warning'"
            disable-transitions
            >{{ scope.row.orderNum > 20 ? "Home" : "Office" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="100">
        <template #default="scope">
          <!-- 图片预览 -->
          <el-image
            preview-teleported
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            style="width: 60px; height: 50px"
            :preview-src-list="[scope.row.picture]"
            :src="scope.row.picture"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80" v-if="false">
        <template #default="scope">
          <span v-if="scope.row.isEdit">
            <el-button
              type="primary"
              size="small"
              @click="confirmEdit(scope.row)"
            >
              确定
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="cancelEdit(scope.row)"
            >
              取消
            </el-button>
          </span>
          <span v-else>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除这条信息吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDeleteAction(scope.row)"
            >
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" :image-size="80"></el-empty>
      </template>
    </el-table>

    <!-- 页码 -->
    <el-pagination
      v-if="total > 0"
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      class="common-pagination-line"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance, watch } from "vue";
import { ElMessage } from "element-plus";
import { getSubCategoryAPI } from "@/api/category";

import baseHeaderSearchDown from "../components/baseHeaderSearchDown.vue";

const { proxy: instance } = getCurrentInstance();

// 分页相关 前端分页
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);

const tableData = ref([]);
const isTableLoading = ref(false);

const myFilterTableRef = ref(null);
const goodsIdSearchDownRef = ref(null);
const goodsNameSearchDownRef = ref(null);

// 表头筛选
const searchPrames = ref({
  goodsName: "",
  goodsId: "",
  tags: [],
  price: "",
  order: "",
});
const handleTableHeaderSearch = (cls, val) => {
  console.log("cls, val", cls, val);
  searchPrames.value[cls] = val;
  initList();
};
const filterTag = (value, row) => {
  return value == "Home" ? row.orderNum > 20 : row.orderNum < 20;
};
const sortPrice = (a, b) => a.price - b.price;

const handleTableFiltersChange = (filters) => {
  let key = Object.keys(filters)[0];
  if (key) {
    searchPrames.value[key] = filters[key];
    initList();
  }
};
const handleTableSortChange = (filters) => {
  const key = filters.column["columnKey"];
  if (key) {
    searchPrames.value[key] =
      filters["order"] && filters["order"] == "ascending" ? "up" : "down";
    initList();
  }
};

const resetTable = () => {
  myFilterTableRef.value?.clearFilter();
  myFilterTableRef.value?.clearSort();
  goodsIdSearchDownRef.value?.resetHeaderSearchStatus();
  goodsNameSearchDownRef.value?.resetHeaderSearchStatus();
  searchPrames.value = {};

  initList();
};

const initList = () => {
  pageNum.value = 1;
  getList();
};

const getList = async () => {
  try {
    isTableLoading.value = true;
    const res = await getSubCategoryAPI({
      page: pageNum.value,
      pageSize: pageSize.value,
      categoryId: "1005002",
      sortField: "publishTime",
      ...searchPrames.value,
    });
    if (res?.code !== "1") {
      ElMessage.warning("数据请求失败");
      return;
    }
    total.value = res?.result?.counts || 0;
    tableData.value = res?.result?.items || [];
  } catch (error) {
    throw error;
  } finally {
    isTableLoading.value = false;
  }
};

watch(
  pageNum,
  () => {
    getList();
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.my-base-table-list-wrap {
  padding: 0 20px 20px;

  .list-title {
    font-weight: 600;
    margin-bottom: 20px;
  }
  .common-pagination-line {
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>

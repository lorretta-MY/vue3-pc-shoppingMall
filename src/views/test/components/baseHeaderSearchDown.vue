<template>
  <el-popover
    placement="bottom-start"
    :width="240"
    :visible="isPopVisible"
    trigger="click"
    class="basic-header-searchdown"
  >
    <!-- 筛选框 -->
    <template v-if="type === 'search'">
      <el-input
        v-model="searchInputText"
        style="width: 100%"
        :placeholder="`输入关键词搜索 ${label}`"
        clearable
      />
    </template>
    <div class="operate-btn-line">
      <el-text class="search-btn" type="info" @click="handlePopSearch"
        >筛选</el-text
      >
      <el-text @click="handlePopReset">重置</el-text>
    </div>
    <!-- 标题栏 -->
    <template #reference>
      <p @click="togglePopVisible" class="basic-header-label-line">
        <span :class="searchInputText ? 'is-select' : ''">{{ label }}</span>
        <el-icon
          :class="isPopVisible ? 'is-rotate' : ''"
          class="selected-arrow-icon"
        >
          <ArrowDown />
        </el-icon>
      </p>
    </template>
  </el-popover>
</template>

<script setup>
import { computed, ref } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "search",
  },
});

const emit = defineEmits(["search"]);

const searchInputText = ref("");
const isPopVisible = ref(false);

const togglePopVisible = () => {
  isPopVisible.value = !isPopVisible.value;
};

const handlePopSearch = () => {
  emit("search", searchInputText.value);
  isPopVisible.value = false;
};

const handlePopReset = () => {
  emit("search", "");
  isPopVisible.value = false;
  searchInputText.value = "";
};

const resetHeaderSearchStatus = () => {
  isPopVisible.value = false;
  searchInputText.value = "";
};

defineExpose({
  resetHeaderSearchStatus,
});
</script>

<style scoped lang="scss">
.operate-btn-line {
  // text-align: right;
  margin-top: 8px;
  padding-left: 2px;
  .search-btn {
    margin-right: 8px;
  }
  .el-text {
    cursor: pointer;
    font-size: 12px;
  }
}
p.basic-header-label-line {
  min-width: 120px;
  > span.is-select {
    color: #27ba9b;
  }
  .selected-arrow-icon {
    cursor: pointer;
    position: relative;
    top: 2px;
    left: 2px;
    &.is-rotate {
      transform: rotate(180deg);
    }
  }
}
</style>

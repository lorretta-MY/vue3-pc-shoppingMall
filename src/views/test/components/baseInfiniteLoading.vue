<template>
    <InfiniteLoading v-bind="attrs" @infinite="load" class="base-infinite-loading-component">
        <template #complete>
            <div class="base-infinite-loading-component__tips">没有更多了...</div>
        </template>
        <template #error="{ retry }">
            <div class="base-infinite-loading-component__error">
                <span>加载失败，</span>
                <span style="color: blue" @click.stop="retry">点击重试</span>
            </div>
        </template>
    </InfiniteLoading>
</template>

<script setup>
import { computed, ref, getCurrentInstance, onMounted, useAttrs } from "vue";
import { ElMessage } from "element-plus";
import { getSubCategoryAPI } from "@/api/category";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; // required if you're not going to override default slots

const attrs = useAttrs();
const props = defineProps({
  handleLoad: {
    type: Function,
    default: async () => true,
  },
});

const load = async ($state) => {
  try {
    const complete = await props.handleLoad();
    if (complete) {
      $state.complete();
    } else {
      $state.loaded();
    }
  } catch (error) {
    $state.error();
  }
};
</script>

<style lang="scss" scoped>
.base-infinite-loading-component {
    &__tips {
        text-align: center;
        padding-top: 20px;
        color: #666;
    }
}
</style>

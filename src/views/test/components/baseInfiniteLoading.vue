<template>
    <InfiniteLoading v-bind="attrs" @infinite="load" class="base-infinite-loading-component">
        <template #complete>
            <div class="base-infinite-loading-component__tips">没有更多了...</div>
        </template>
        <template #error="{ retry }">
            <div class="base-infinite-loading-component__error">
                <span>加载失败，</span>
                <a href="javascript:" class="retry-btn" @click.stop="retry">点击重试</a>
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    color: #666;


    :deep(.container) {
        display: flex;
        align-items: center;
        justify-content: center;

        .spinner {
            width: 18px;
            height: 18px;
            border: 2px solid #3a77f0;
            border-right-color: transparent;
        }
    }

    &__tips {
        text-align: center;
        color: #666;
    }

    &__error {
        .retry-btn {
            color: #3a77f0;
            font-weight: 600
        }
    }
}
</style>

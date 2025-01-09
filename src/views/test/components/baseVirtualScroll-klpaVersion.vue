<template>
  <div class="basic-virtual-scroll">
    <RecycleScroller
      class="scroller"
      v-slot="{ item, index, active }"
      :page-mode="pageMode"
      :buffer="200"
      :items="list"
      :item-size="50"
      :item-secondary-size="itemSecondarySize"
      :key-field="keyField"
      :grid-items="gridNumber"
      ref="containerSizeRef"
    >
      <slot name="item" :item="item" :index="index" :active="active"></slot>
    </RecycleScroller>
    <el-empty v-if="empty" description="没有数据哦"></el-empty>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import {useResizeObserver} from '../hooks/useResizeObserver'

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  keyField: {
    type: String,
    default: "id",
  },
  itemMainSize: {
    type: Number,
    default: 1,
  },
  gridNumber: {
    type: Number,
    default: 3,
  },
  pageMode: {
    type: Boolean,
    default: false,
  },
  gap: {
    type: Number,
    default: 12,
  },
  empty: {
    type: Boolean,
    default: false,
  },
});

const containerSizeRef = ref(null);
const containerSize = useResizeObserver(containerSizeRef);

const itemSecondarySize = computed(() => {
  return (
    (containerSize.value.width + props.gap * (props.gridNumber - 1)) /
    props.gridNumber
  );
});

const containerStyle = computed(()=>{
  return '--grid-gap': `${props.gap}px`
})
</script>

<style scoped lang="less">
/* .scroller {
  overflow-x: hidden;
  :deep(.vue-recycle-scroller__item-wrapper) {
    .vue-recycle-scroller__item-view {
      width: 100% !important;
    }
  }
}  */

.basic-virtual-scroll {
  .scroller {
    overflow: hidden;
    :deep(.vue-recycle-scroller__item-wrapper) {
      width: calc(100% + var(--grid-gap));
      .vue-recycle-scroller__item-view {
        padding-right: var(--grid-gap);
      }
    }
  }
}
</style>

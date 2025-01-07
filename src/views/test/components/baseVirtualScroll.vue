<template>
  <div class="basic-virtual-scroll">
    <RecycleScroller
      v-if="!empty"
      class="scroller"
      :items="list"
      :item-size="itemMainSize"
      key-field="id"
      v-slot="{ item, index, active }"
    >
      <slot name="item" :item="item" :index="index" :active="active"></slot>
    </RecycleScroller>
    <el-empty v-if="empty" description="没有数据哦"></el-empty>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  itemMainSize: {
    type: Number,
    default: 20,
  },
  empty: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.scroller {
  height: 100%;
  // height: calc(100vh - 200px);
}
</style>

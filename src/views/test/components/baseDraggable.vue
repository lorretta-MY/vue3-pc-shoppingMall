<template>
  <draggable
    v-if="modelValue?.length"
    v-model="modelValue"
    v-bind="attrs"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'draggable-flip-list' : null,
    }"
    :class="[attrs?.class, 'draggable-list-group']"
    :animation="300"
    ghost-class="drag-ghost"
    chosen-class="chosen"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <li class="draggable-list-group-item">
        <el-icon><Fold /></el-icon>
        <slot name="items" :element="element" />
      </li>
    </template>
  </draggable>
</template>

<script setup>
import { ref, useAttrs } from "vue";
import { Fold } from "@element-plus/icons-vue";

import draggable from "vuedraggable";

const attrs = useAttrs();

const modelValue = defineModel("modelValue");

const dragging = ref(false);
</script>

<style lang="scss">
.draggable-flip-list-move {
  transition: transform 0.5s;
}

.drag-ghost {
  opacity: 0.5;
}

.draggable-list-group-item {
  cursor: move;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 8px;
  background-color: #fff;
  margin-top: 8px;
  .anticon-holder {
    color: #999;
    margin-right: 4px;
  }
}
</style>

<template>
  <el-button @click="add" type="primary">Add</el-button>
  <draggable
    :list="state.list"
    :disabled="!state.enabled"
    item-key="name"
    class="w-25"
    ghost-class="ghost"
    chosen-class="chosen"
    @start="state.dragging = true"
    @end="state.dragging = false"
    animation="300"
  >
    <template #item="{ element }">
      <div class="mt-2 w-100%">
        <el-tag
          class="item"
          :class="{ 'not-draggable': !state.enabled }"
          :key="element.id"
        >
          {{ element.name }}
        </el-tag>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import draggable from "vuedraggable";

let id = 1;
const state = reactive({
  enabled: true,
  list: [
    { name: "西瓜", id: 0 },
    { name: "橙子", id: 1 },
    { name: "草莓", id: 2 },
  ],
  dragging: false,
});

const draggingInfo = computed(() => (state.dragging ? "under drag" : ""));

const add = () => {
  state.list.push({ name: "水果" + id, id: id++ });
};
</script>

<style scoped lang="scss">
.ghost {
  opacity: 0.5;
  border: 1px solid #18a058;
}
.chosen {
  border: 1px solid #18a058;
}
.item {
  width: 100%;
  margin-top: 12px;
  cursor: move;
  &:hover {
    background-color: #f0f0f0;
  }
}
.not-draggable {
  cursor: no-drop;
}
</style>

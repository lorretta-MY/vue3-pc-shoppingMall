<template>
  <TextDetect
    v-if="noTooltip || !overflow"
    :style="attrs.style"
    :class="attrs.class"
    :maxLine="!noTooltip ? maxLine : 10"
    :value="value"
    @overflowChange="setOverflowValue"
  />
  <el-tooltip v-bind="attrs" popper-class="basic-text-tooltips" v-else>
    <template #content>
      <div class="overflow-tips">{{ value }}</div>
      <!-- copy -->
      <p v-if="showCopy" class="overflow-copy">
        <el-button @click="$copy(value)" size="small">
          <el-tooltip content="复制文本" effect="light">
            <el-icon><CopyDocument /></el-icon>
          </el-tooltip>
        </el-button>
      </p>
    </template>
    <!-- 文本 -->
    <TextDetect
      :style="attrs.style"
      :class="attrs.class"
      :maxLine="maxLine"
      :value="value"
      @overflowChange="setOverflowValue"
    />
  </el-tooltip>
</template>

<script setup>
import { useAttrs, computed, ref } from "vue";
import { CopyDocument } from "@element-plus/icons-vue";
import TextDetect from "./textDetect.vue";
const attrs = useAttrs();

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  showCopy: {
    type: Boolean,
    default: false,
  },
  noTooltip: {
    type: Boolean,
    default: false,
  },
  maxLine: {
    type: Number,
    default: 1,
  },
});

const overflow = ref(false);

const setOverflowValue = (val) => {
  overflow.value = val;
};
</script>

<style scoped lang="scss">
.overflow-tips {
  max-width: 300px;
  max-height: 100px;
  overflow-y: auto;
}
.overflow-copy {
  position: absolute;
  right: 4px;
  bottom: 4px;
  opacity: 0;
  cursor: pointer;
  :deep(.el-button.el-button--small) {
    height: 16px;
    padding: 0 2px;
  }
}
.basic-text-tooltips {
  &:hover {
    .overflow-copy {
      opacity: 1;
    }
  }
}
</style>

<template>
  <div class="basic-multi-line-text" :style="textStyle" ref="textRef">
    {{ value }}
  </div>
</template>

<script setup>
import { computed, ref, defineEmits, onMounted, onUpdated } from "vue";

const emit = defineEmits(["overflowChange", ["update:value"]]);

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  maxLine: {
    type: Number,
    default: 1,
  },
});

const textStyle = computed(() => `-webkit-line-clamp:${props.maxLine}`);

const textRef = ref(null);
const overflow = ref(false);

const checkIsOverflow = () => {
  if (!textRef.value) {
    overflow.value = false;
    return;
  }

  const nextOverflow =
    textRef.value.scrollHeight > textRef.value.clientHeight ||
    textRef.value.scrollWidth > textRef.value.clientWidth;

  overflow.value = nextOverflow;

  emit("overflowChange", nextOverflow);
};

onMounted(() => checkIsOverflow());
onUpdated(() => checkIsOverflow());
</script>

<style lang="scss" scoped>
.basic-multi-line-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: initial;
}
</style>

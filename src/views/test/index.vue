<template>
  <div>
    <el-button @click="$copy('复制')">复制</el-button>
    <el-button @click="handleCopy('999')">复制</el-button>
  </div>
  <hr>
  <!-- codemirror -->
  <codeEditor :readonly="false" />

  <!-- 富文本编辑框 -->

</template>

<script setup>
import codeEditor from './components/codeEditor.vue'
import { getCurrentInstance } from 'vue'
const { proxy: instance } = getCurrentInstance()
const handleCopy = (val) => {
  instance.$copy(val)
}
</script>

<style scoped lang="scss"></style>
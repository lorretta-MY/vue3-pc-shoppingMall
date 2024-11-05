<template>
  <div class="test-page-wrap">
    <el-tabs type="border-card">
      <el-tab-pane label="无限滚动列表">
        <myInfiniteDemo />
      </el-tab-pane>
      <el-tab-pane label="待办事项清单">
        <myList />
      </el-tab-pane>
      <el-tab-pane label="代码编辑框">
        <div>
          <el-button @click="$copy('复制')">复制</el-button>
          <el-button @click="handleCopy('999')">复制</el-button>
        </div>
        <hr>
        <!-- codemirror -->
        <codeEditor :readonly="false" />
      </el-tab-pane>
      <el-tab-pane label="markdown">
        <myMarkdown />
      </el-tab-pane>
    </el-tabs>
  </div>




</template>

<script setup>
import codeEditor from './components/codeEditor.vue'
import myMarkdown from './components/myMarkdown.vue'
import myList from './components/myList.vue'
import myInfiniteDemo from './components/myInfiniteDemo.vue'

import { getCurrentInstance } from 'vue'
const { proxy: instance } = getCurrentInstance()

const handleCopy = (val) => {
  instance.$copy(val)
}
</script>

<style scoped lang="scss">
.test-page-wrap {
  padding: 20px;
}
</style>
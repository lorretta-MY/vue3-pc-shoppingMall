<template>
    <div class="code-mioor-wrap el-box-shadow-dark
">
        <codemirror v-model="code" placeholder="请输入您的代码..." :style="{ height: '400px' }" :autofocus="true" :tabSize="2"
            :extensions="extensions" :disabled="readonly" />
    </div>

</template>

<script lang="ts" setup>
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { ref } from "vue";
import { EditorView } from "@codemirror/view"

const props = defineProps({
    readonly: {
        type: Boolean,
        default: false
    }
})

// 自定义主题颜色
let myTheme = EditorView.theme({
    // 输入的字体颜色
    "&": {
        color: "#0052D9",
        backgroundColor: "#FFFFFF"
    },
    ".cm-content": {
        caretColor: "#0052D9",
    },
    // 激活背景色
    ".cm-activeLine": {
        backgroundColor: "#FAFAFA"
    },
    // 激活序列的背景色
    ".cm-activeLineGutter": {
        backgroundColor: "#FAFAFA"
    },
    //光标的颜色
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0052D9"
    },
    // 选中的状态
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#0052D9",
        color: '#FFFFFF'
    },
    // 左侧侧边栏的颜色
    ".cm-gutters": {
        backgroundColor: "#FFFFFF",
        color: "#ddd", //侧边栏文字颜色
        border: "none"
    }
}, { dark: true })

const code = ref(`console.log('hello world')`);

const extensions = [javascript(), oneDark];



// const Change = () => {

// }
</script>

<style lang="scss" scoped>
.code-mioor-wrap {
    margin: 20px;
    border: 1px solid #333;
    border-radius: 6px;
}
</style>
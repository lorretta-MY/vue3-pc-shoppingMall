<template>
    <div class="my-list-wrap">
        <!-- 输入框 -->
        <el-input v-model="addText" style="max-width: 600px; height: 36px" placeholder="请输入您的待办事项"
            class="input-with-select">
            <template #append>
                <el-button type="primary" @click="handleListAdd">新增</el-button>
            </template>
        </el-input>
        <el-button @click="handleBatchDel">批量删除</el-button>
        <!-- 列表 -->
        <P class="list-title">今日待办事项清单</P>
        <el-table :border="true" :data="tableData" style="width: 100%" @select="handleSelectionChange"
            @select-all="handleSelectionChange">
            <el-table-column type="selection" width="80px" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="content" label="内容" />
            <el-table-column prop="tags" label="标签" />
            <el-table-column prop="date" label="创建日期" />
            <el-table-column prop="username" label="创建人" />
            <el-table-column fixed="right" label="Operations" min-width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick">
                        编辑
                    </el-button>
                    <el-popconfirm title="确认删除这条信息吗?" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDeleteAction(scope.row, 1)">
                        <template #reference>
                            <el-button link type="danger" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="暂无数据" :image-size="80"></el-empty>
            </template>
        </el-table>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, descriptionProps } from 'element-plus'
import dayjs from 'dayjs';
const addText = ref('')

const handleClick = () => {
    console.log('click')
}

const tableData = ref([
    {
        title: '自定义标题',
        content: '自定义标题内容',
        tags: '初始化',
        date: '2024-07-22 20:21:30',
        username: 'RITA'
    }
])
// 新增
const handleListAdd = () => {
    if (!addText.value) return
    // 校验是否重复
    tableData.value.unshift({
        title: addText.value,
        content: '自定义标题内容',
        tags: '初始化',
        date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        username: 'RITA'
    })
}
// 删除
const userSelectList = ref([])
const handleBatchDel = () => {
    if (!userSelectList.value.length) {
        ElMessage({
            message: '请至少选择一条数据',
            type: 'warning',
        })
        return
    }
    handleDeleteAction({}, 2)
}

const handleSelectionChange = (data) => {
    userSelectList.value = data.map(item => item.title)
}
const handleDeleteAction = (row, delType) => {
    // 1 删除 2批量删除
    if (delType === 1) {
        delAction([row.title])
    } else {
        delAction(userSelectList.value)
    }
}
const delAction = (ids) => {
    tableData.value = tableData.value.filter((a) => {
        return !ids.some((b) => a.title === b)
    })
}
</script>

<style lang="scss" scoped>
.my-list-wrap {
    padding: 20px;

    .list-title {
        font-weight: 600;
        margin: 40px 0 20px;
    }
}
</style>
<template>
    <div class="my-list-wrap">
        <!-- 输入框 -->
        <div class="operate-header">
            <el-input v-model.trim="addText" @keydown.enter="handleListAdd" style="max-width: 600px; height: 36px"
                placeholder="请输入您的待办事项" class="input-with-select">
                <template #append>
                    <el-button type=" primary" @click="handleListAdd">新增</el-button>
                </template>
            </el-input>
            <el-button @click="handleBatchDel" style=" height: 36px" v-permission="'savePublic1'">批量删除</el-button>
        </div>

        <!-- 列表 -->
        <P class="list-title">今日待办事项清单</P>
        <el-table :border="true" :data="tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
            style="width: 100%" @select="handleSelectionChange" @select-all="handleSelectionChange">
            <el-table-column type="selection" width="80px" />
            <el-table-column prop="title" label="标题" min-width="180px">
                <template #default="scope">
                    <el-input type="text" v-if="!!scope.row.isEdit" v-model.trim="questionInput"></el-input>
                    <p v-else>{{ scope.row.title }}</p>
                </template>

            </el-table-column>

            <el-table-column label="操作" min-width="80">
                <template #default="scope">
                    <span v-if="scope.row.isEdit">
                        <el-button type="primary" size="small" @click="confirmEdit(scope.row)">
                            确定
                        </el-button>
                        <el-button type="danger" size="small" @click="cancelEdit(scope.row)">
                            取消
                        </el-button>
                    </span>
                    <span v-else>
                        <el-button link type="primary" size="small" @click="handleClick(scope.row)">
                            编辑
                        </el-button>
                        <el-popconfirm title="确认删除这条信息吗?" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="handleDeleteAction(scope.row)">
                            <template #reference>
                                <el-button link type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </span>

                </template>

            </el-table-column>
            <el-table-column prop="content" label="内容" />
            <el-table-column prop="tags" label="标签" />
            <el-table-column prop="username" label="创建人" />
            <el-table-column prop="date" label="创建日期" />

            <template #empty>
                <el-empty description="暂无数据" :image-size="80"></el-empty>
            </template>
        </el-table>

        <!-- 页码 -->
        <el-pagination v-if="total > 0" v-model:current-page="pageNum" v-model:page-size="pageSize"
            layout="total, prev, pager, next" :total="total" class="common-pagination-line" />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance } from 'vue'
import { ElMessage, } from 'element-plus'
import dayjs from 'dayjs';

const { proxy: instance } = getCurrentInstance()

const addText = ref('')

// 校验是否重复
const validateDateRepeat = (title) => {
    let flag = false
    tableData.value.map((item) => {
        if (item.title === title) {
            flag = true
        }
    })
    return flag
}

// 分页相关 前端分页
const pageNum = ref(1)
const pageSize = ref(6)
const total = computed(() => tableData.value.length)

const tableData = ref([
    {
        title: '自定义标题',
        content: '自定义标题内容',
        tags: '初始化',
        date: '2024-07-22 20:21:30',
        username: 'RITA'
    }
])

// 1、新增
const handleListAdd = () => {

    if (!addText.value) return
    // 校验是否重复
    if (validateDateRepeat(addText.value)) {
        ElMessage({
            message: '您输入的数据有重复，请重新输入。',
            type: 'warning',
        })
        return
    }
    tableData.value.unshift({
        title: addText.value,
        content: '自定义标题内容',
        tags: '初始化',
        date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        username: instance.$helper.userName()
    })
    addText.value = ''
}

// 2、删除
const userSelectList = ref([])
const handleSelectionChange = (data) => {
    userSelectList.value = data.map(item => item.title)
}
// 批量删除
const handleBatchDel = () => {
    if (!userSelectList.value.length) {
        ElMessage({
            message: '请至少选择一条数据',
            type: 'warning',
        })
        return
    }
    delAction(userSelectList.value)
}
// 单条删除
const handleDeleteAction = (row) => {
    delAction([row.title])
}
const delAction = (ids) => {
    tableData.value = tableData.value.filter((a) => {
        return !ids.some((b) => a.title === b)
    })
}

// 3、修改
const questionInput = ref('')
const cacheTitle = ref('')
const handleClick = (row) => {
    tableData.value.map(grid => {
        return grid['isEdit'] = false
    })
    questionInput.value = row.title
    cacheTitle.value = row.title
    row['isEdit'] = true
}
// 确定修改
const confirmEdit = (row) => {
    if (!questionInput.value) return
    // 校验是否重复
    if (validateDateRepeat(questionInput.value)) {
        ElMessage({
            message: '您输入的数据有重复，请重新输入。',
            type: 'warning',
        })
        return
    }
    ElMessage({
        message: '编辑成功',
        type: 'success',
    })
    row['title'] = questionInput.value
    row['isEdit'] = false
}
// 取消修改
const cancelEdit = (row) => {
    row['title'] = questionInput.value
    row['isEdit'] = false
}

</script>

<style lang="scss" scoped>
.my-list-wrap {
    padding: 20px;

    .list-title {
        font-weight: 600;
        margin: 40px 0 20px;
    }

    .operate-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .common-pagination-line {
        justify-content: flex-end;
        margin-top: 20px;
    }
}
</style>
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import powerSet from './powerSet'

// 获取props传入的goodid
const props = defineProps({
  goodid: {
    type: String
  }
})

const emit = defineEmits(['sku', 'num'])

// 商品数据
const goods = ref({})
let pathMap = {}

const getGoods = async () => {
  const res = await axios.get(
    `http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=${props.goodid}`
  )
  // const res = await axios.get(`http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074 / 1135076`)

  goods.value = res.data.result
  pathMap = getPathMap(goods.value)

  // 初始化更新按钮状态
  initDisabledState(goods.value.specs, pathMap)
}
onMounted(() => getGoods())

// 点击选项 切换选中状态
const handleSelect = (item, val) => {
  if (val.disabled) return
  // item 当前循环的数组 val 当前点击的对象
  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach((innerItem) => {
      innerItem.selected = false
    })
    val.selected = true
  }
  // 点击时 确认选项是否禁用
  updateDisabledState(goods.value.specs, pathMap)
  // 产出SKU对象数据
  const flag = getSelectedValues(goods.value.specs).findIndex((v) => v === undefined)
  if (flag == -1) {
    // 获取sku对象
    const key = getSelectedValues(goods.value.specs).join('-')
    const skuIds = pathMap[key]
    // 通过skuid来匹配goods.value.skus数组
    const skuObj = goods.value.skus.find((v) => v.id === skuIds[0])
    // console.log('sku对象为', skuObj)
    emit('sku', skuObj)
  }
}
const num = ref(1)
const handleChange = (value) => {
  emit('num', value)
}

// 创建生成路径字典对象函数
const getPathMap = (goods) => {
  const pathMap = {}
  // 1. 得到所有有效的Sku集合
  const effectiveSkus = goods.skus.filter((sku) => sku.inventory > 0)
  // 2. 根据有效的Sku集合使用powerSet算法得到所有子集 [1,2] => [[1], [2], [1,2]]
  effectiveSkus.forEach((sku) => {
    // 2.1 获取可选规格值数组
    const selectedValArr = sku.specs.map((val) => val.valueName)
    // 2.2 获取可选值数组的子集
    const valueArrPowerSet = powerSet(selectedValArr)
    // 3. 根据子集生成路径字典对象
    // 3.1 遍历子集 往pathMap中插入数据
    valueArrPowerSet.forEach((arr) => {
      // 根据Arr得到字符串的key，约定使用-分割 ['蓝色'，'美国'] => '蓝色-美国'
      const key = arr.join('-')
      // 给pathMap设置数据
      if (pathMap[key]) {
        pathMap[key].push(sku.id)
      } else {
        pathMap[key] = [sku.id]
      }
    })
  })
  return pathMap
}

// 初始化 查询选项是否是禁用状态
const initDisabledState = (specs, pathMap) => {
  // 约定：每一个按钮的状态由自身的disabled进行控制
  specs.forEach((item) => {
    item.values.forEach((val) => {
      // 路径字典中查找是否有数据 有-可以点击 没有-禁用
      val.disabled = !pathMap[val.name]
    })
  })
}

// 获取选中匹配数组 ['黑色',undefined,undefined]
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((value) => value.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}

// 切换时 更新选项是否是禁用状态
const updateDisabledState = (specs, pathMap) => {
  // 约定：每一个按钮的状态由自身的disabled进行控制
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach((val) => {
      if (val.selected) return
      const _seletedValues = [...selectedValues]
      _seletedValues[i] = val.name
      const key = _seletedValues.filter((value) => value).join('-')
      // 路径字典中查找是否有数据 有-可以点击 没有-禁用
      // if (pathMap[key]) {
      //   val.disabled = false
      // } else {
      //   val.disabled = true
      // }
      val.disabled = !pathMap[key]
    })
  })
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd style="display: flex">
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
            :class="[{ selected: val.selected }, { disabled: val.disabled }]"
            @click="handleSelect(item, val)"
          />
          <!-- 文字类型规格 -->
          <span
            v-else
            :class="[{ selected: val.selected }, { disabled: val.disabled }]"
            @click="handleSelect(item, val)"
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
    <dl>
      <dt>数量</dt>
      <dd><el-input-number v-model="num" :min="1" :max="100" @change="handleChange" /></dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>

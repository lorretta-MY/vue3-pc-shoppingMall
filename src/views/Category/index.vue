<script setup>
import HomeBanner from '../Home/components/HomeBanner.vue'
import { useCategory } from './compositions/useCategory'
const { nav_name, categoryData } = useCategory()

// 获取url里的id值
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ nav_name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 type是goods-->
      <div class="goods-banner">
        <HomeBanner banner-type="goods" />
      </div>
      <!-- 分类列表 全部分类概览-->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <!-- <RouterLink :to="`/category/${route.params.id}/sub/${i.id}`"> -->
            <RouterLink :to="`sub/${i.id}`">
              <img v-lazy-img="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 分类列表 具体分类栏目-->
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
        </div>
        <div class="body">
          <RitaGoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  .goods-banner {
    margin: 0px 0;
    .home-banner {
      position: initial;
    }
  }
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
            margin: 0 auto;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>

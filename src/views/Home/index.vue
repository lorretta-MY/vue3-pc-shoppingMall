<script setup>
import HomeNew from './components/HomeNew.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeGoods from './components/HomeGoods.vue'
import HomeProducts from './components/HomeProducts.vue'
</script>

<template>
  <div>
    <div class="container">
      <HomeCategory />
      <HomeBanner banner-type="home" />
    </div>
      <HomeNew />
      <HomeGoods />
      <HomeProducts />
      
  </div>

</template>

<style scoped lang="scss">

</style>
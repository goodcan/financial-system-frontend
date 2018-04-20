<template>
  <el-container>
    <el-header class="my-header-nav">
      <nav-header/>
    </el-header>
    <el-container style="margin-top: 60px">
      <el-aside style="width: 250px">
        <nav-bar/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import NavHeader from '../components/nav/NavHeader'
  import NavFooter from '../components/nav/NavFooter'
  import NavBar from '../components/nav/NavBar'

  import '../assets/csss/base.css'

  export default {
    data() {
      return {}
    },
    components: {
      NavHeader,
      NavFooter,
      NavBar
    }
  }
</script>

<style scoped>
  .my-header-nav {
    padding: 0;
    position: fixed;
    width: 100%;
    height: 60px;
    z-index: 1
  }
</style>

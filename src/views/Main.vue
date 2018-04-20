<template>
  <el-container>
    <el-header class="nav-bar-header">
      <nav-header/>
    </el-header>
    <el-container class="nav-bar-container">
      <el-aside class="nav-bar-aside">
        <nav-bar/>
      </el-aside>
      <el-main class="nav-bar-main">
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
  .nav-bar-header {
    padding: 0;
    position: fixed;
    width: 100%;
    height: 60px;
    z-index: 1
  }

  .nav-bar-main {
    height: 100%;
    overflow: auto;
  }

  .nav-bar-container {
    margin-top: 60px;
    position: fixed;
    height: 100%;
    width: 100%;
    padding-bottom: 50px
  }

  .nav-bar-aside {
    width: auto !important;
    height: 100%;
    overflow: auto;
    padding-bottom: 30px
  }
</style>

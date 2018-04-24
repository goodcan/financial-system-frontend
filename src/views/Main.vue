<template>
  <el-container>
    <el-header class="custom-nav-header">
      <nav-header/>
    </el-header>
    <el-container class="custom-nav-container">
      <el-aside class="custom-nav-aside">
        <nav-bar/>
      </el-aside>
      <el-main class="custom-nav-main">
        <router-view/>
      </el-main>
    </el-container>
    <el-footer class="custom-nav-footer">
      <nav-footer/>
    </el-footer>
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
  .custom-nav-header {
    padding: 0;
    position: fixed;
    width: 100%;
    height: 60px;
    z-index: 1
  }

  .custom-nav-main {
    height: 100%;
    overflow: auto;
  }

  .custom-nav-container {
    margin-top: 60px;
    position: fixed;
    height: 100%;
    width: 100%;
    padding-bottom: 120px
  }

  .custom-nav-aside {
    width: auto !important;
    height: 100%;
    overflow: auto;
  }

  .custom-nav-footer {
    position: absolute;
    height: 60px;
    bottom: 0;
    width: 100%;
    background-color: #535c63
  }
</style>

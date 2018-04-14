<template>
  <el-container>
    <el-header style="padding: 0;">
      <nav-header/>
    </el-header>
    <el-container>
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

</style>

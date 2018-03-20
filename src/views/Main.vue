<template>
  <el-row>
    <nav-header/>
    <el-row :gutter="15" style="margin-top: 15px">
      <el-col style="width: 15%;">
        <nav-bar/>
      </el-col>
      <el-col style="width: 85%;">
          <router-view/>
      </el-col>
    </el-row>
  </el-row>
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

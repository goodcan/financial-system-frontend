<template>
  <el-row>
    <nav-header/>
    <el-row :gutter="15" style="margin-top: 30px">
      <el-col :span="4">
        <nav-bar/>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import NavHeader from '../components/NavHeader'
  import NavFooter from '../components/NavFooter'
  import NavBar from '../components/NavBar'

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

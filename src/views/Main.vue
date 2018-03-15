<template>
  <el-row>
    <el-row :gutter="15">
      <el-col :span="4">
        <nav-bar/>
      </el-col>
      <el-col :span="20">
        <nav-header/>
        <el-row style="margin-top: 30px">
          <router-view/>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import NavHeader from '../components/nav/NavHeader'
  import NavFooter from '../components/nav/NavFooter'
  import NavBar from '../components/nav/NavBar'

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

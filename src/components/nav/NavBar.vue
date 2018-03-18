<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :router="true"
    @open="handleOpen"
    @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>基本操作</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/createOrder">创建订单</el-menu-item>
        <el-menu-item index="/selfOrderList">我创建的订单</el-menu-item>
        <el-menu-item
          index="/dptOrderList"
          v-if="this.$store.state.userPms.readDptOrder === 1">
          我部门的订单
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2" v-if="this.$store.state.userPms.summaryOrder === 1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>订单汇总</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/summaryAllOrder">所有订单</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3" v-if="this.$store.state.userPms.editUser === 1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>管理系统人员</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userList">人员列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4" v-if="this.$store.state.userPms.editOrderOption === 1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>订单选项管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/createDpt">部门管理</el-menu-item>
        <el-menu-item index="/createClass">类目管理</el-menu-item>
        <el-menu-item index="/createCustomer">客户管理</el-menu-item>
        <el-menu-item index="/createContact">对接人管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      },
    }
  }
</script>

<style scoped>

</style>

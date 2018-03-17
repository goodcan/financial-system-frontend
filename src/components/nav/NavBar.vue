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
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/createOrder">创建订单</el-menu-item>
        <el-menu-item index="/orderList">订单列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>导航二</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">预算订单汇总</el-menu-item>
        <el-menu-item index="2-2">支付订单汇总</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3" v-if="userPermissions.editUser === 1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>管理系统人员</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userList">人员列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4" v-if="userPermissions.editOrderOption === 1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>订单信息管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/createDpt">部门管理</el-menu-item>
        <el-menu-item index="/createClass">类目管理</el-menu-item>
        <el-menu-item index="/createCustomer">客户管理</el-menu-item>
        <el-menu-item index="/createContact">联系人管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      userPermissions() {
        if (this.$store.state.userObj) {
          return this.$store.state.userObj.permissions
        } else {
          return {}
        }
      }
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      },
      toOrder() {
        this.$router.push({
          path: '/createOrder'
        })
      }
    }
  }
</script>

<style scoped>

</style>

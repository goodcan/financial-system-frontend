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
        <el-menu-item index="1-2">确认支付订单</el-menu-item>
        <el-menu-item index="1-3">结算订单</el-menu-item>
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
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>人员信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">所有人员</el-menu-item>
        <el-menu-item index="3-2">修改</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>创建模板</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/createClass">创建新类目</el-menu-item>
        <el-menu-item index="/createCustomer">创建新客户</el-menu-item>
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

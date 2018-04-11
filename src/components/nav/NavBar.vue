<template>
  <el-menu
    default-active="2"
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
        <el-submenu index="2-2">
          <template slot="title">图表统计</template>
          <el-menu-item index="statisticContacts">外包人员</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3" v-if="this.$store.state.userPms.editUser === 1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>管理系统人员</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userList">人员列表</el-menu-item>
        <el-menu-item index="/logList">操作日志</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4" v-if="this.$store.state.userPms.editOrderOption === 1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>订单选项管理</span>
      </template>
      <el-menu-item-group>
        <!--<el-menu-item index="/createDpt">部门</el-menu-item>-->
        <el-menu-item index="/createCompany">公司</el-menu-item>
        <el-menu-item index="/createClass">类目</el-menu-item>
        <el-menu-item index="/createCustomer">客户</el-menu-item>
        <el-menu-item index="/createContact">外包人员</el-menu-item>
        <el-menu-item index="/createWorkClass">外包技能</el-menu-item>
        <el-menu-item index="/createHelp">帮助信息</el-menu-item>
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

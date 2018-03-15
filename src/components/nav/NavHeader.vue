<template>
  <el-row>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      <el-submenu index="5" v-if="isLogin" style="float: right;">
        <template slot="title">{{user.username}}</template>
        <el-menu-item index="5-1" @click="logout">Sign out</el-menu-item>
      </el-submenu>
        <el-menu-item index="6" @click="toRegister" v-if="!isLogin"
                      style="float: right">Sign up</el-menu-item>
        <el-menu-item index="7" @click="toLogin" v-if="!isLogin"
                      style="float: right">Sign in</el-menu-item>
    </el-menu>
  </el-row>

</template>

<script>
  // import { registerApi } from '../api/userApi'
  import axios from '../../axios'

  export default {
    data() {
      return {
        activeIndex: '2-1',
        isLogin: false
      }
    },
    computed: {
      user() {
        return this.$store.state.userObj;
      }
    },
    mounted() {
      this.checkLogin();
    },
    methods: {
      checkLogin() {
        axios.post('/api/checkLogin', {
          token: this.$store.state.token
        }).then((response) => {
          let res = response.data;
          if (res.code === 1) {
            this.$store.commit('updateUserObj', res.result.userObj);
            this.isLogin = true
          } else {
            this.$router.push({path: '/login'})
          }
        })
      },
      handleSelect(key, keyPath) {

      },
      toRegister() {
        this.$router.push({
          path: '/register'
        })
      },
      toLogin() {
        this.$router.push({
          path: '/Login'
        })
      },
      logout() {
        this.$store.commit('updateToken', null);
        this.$store.commit('updateUserObj', null);
        this.isLogin = false;
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style scoped>

</style>

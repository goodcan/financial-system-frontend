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
      <el-submenu index="1" v-if="isLogin" style="float: right;">
        <template slot="title">{{user.username}}</template>
        <el-menu-item index="1-1" @click="logout">Sign out</el-menu-item>
      </el-submenu>
        <el-menu-item index="2" @click="toRegister" v-if="!isLogin"
                      style="float: right">Sign up</el-menu-item>
        <el-menu-item index="3" @click="toLogin" v-if="!isLogin"
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
        activeIndex: '1',
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

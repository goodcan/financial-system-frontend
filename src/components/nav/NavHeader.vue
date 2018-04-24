<template>
  <el-row>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <span class="nav-title nav-title-bth" @click="changeNavCollapse">
         <el-tooltip class="item" effect="dark"
                     :content="this.$store.state.userObj.navCollapse? '展开左侧导航': '收起左侧导航'"
                     placement="bottom-start">
            <i v-bind:class="{
            'el-icon-arrow-up': this.$store.state.userObj.navCollapse,
            'el-icon-arrow-down': !this.$store.state.userObj.navCollapse
            }"></i>
         </el-tooltip>
      </span>
      <span class="nav-title">十字星外包管理系统</span>


      <el-submenu index="2" v-if="isLogin" style="float: right;">
        <template slot="title">{{user.username}}</template>
        <el-menu-item index="2-1" @click="logout">退出</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"
                    @click="toRegister"
                    v-if="!isLogin"
                    style="float: right">注册
      </el-menu-item>
      <el-menu-item index="4"
                    @click="toLogin"
                    v-if="!isLogin"
                    style="float: right">登录
      </el-menu-item>
      <!--<nav-bell-popover/>-->
    </el-menu>
  </el-row>

</template>

<style>
  .nav-title {
    color: white;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
  }

  .nav-bell {
    color: white;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    float: right;
  }

  .nav-bell:hover {
    cursor: pointer;
    background-color: rgb(67, 74, 80);
  }

  .nav-title-bth {
    font-weight: bold;
  }

  .nav-title-bth:hover {
    cursor: pointer;
  }

  .my-bell-badge-item sup.is-dot {
    margin-top: 20px;
  }
</style>

<script>
  import axios from '../../axios'
  import NavBellPopover from '../../components/popover/NavBellPopover'

  export default {
    data() {
      return {
        activeIndex: '1',
        isLogin: false
      }
    },
    components: {
      NavBellPopover
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
      },
      changeNavCollapse() {
        let setCollapse = !this.$store.state.userObj.navCollapse;
        this.$store.commit('updateNavCollapse', setCollapse);
        axios.post('/api/setNavCollapse', {
          userId: this.$store.state.userObj.userId,
          setCollapse: setCollapse
        })
      }
    }
  }
</script>

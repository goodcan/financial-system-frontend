<template>
  <el-form label-width="80px" label-position="top">
    <h3>登录</h3>
    <el-form-item label="用户名">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input type="password" v-model="form.password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">登录</el-button>
      <el-button type="primary" @click="form.username='';form.password=''">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      register() {
        axios.post('/api/login', {
          username: this.form.username,
          password: this.form.password
        }).then((response) => {
          let res = response.data;
          if (res.code === 1) {
            this.$store.commit('updateUserObj', res.result.userObj);
            this.$store.commit('updateToken', res.result.token);
            this.$router.push({
              path: '/'
            })
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>

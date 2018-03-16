<template>
  <el-form
    :model="form"
    ref="form"
    :status-icon="true"
    :rules="rules"
    label-width="80px"
    label-position="top">
    <h3>登录</h3>
    <el-form-item label="账户" prop="username">
      <el-input v-model="form.username" placeholder="请输入账户"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login('form')">登录</el-button>
      <el-button type="primary" @click="resetForm('form')">清空</el-button>
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
        },
        rules: {
          username: [
            {required: true, message: '用户名能为空', trigger: 'blur'},
            {min: 6, max: 24, message: '需要6到12个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, max: 24, message: '需要6到12个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error'
                });
              }
            })
          } else {
            return false
          }
        });

      },
    }
  }
</script>

<style scoped>

</style>

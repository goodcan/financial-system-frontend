<template>
  <div class="login-container">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <h3 class="login-title">十字星外包管理系统</h3>
    <el-form
      :model="form"
      ref="form"
      :status-icon="true"
      :rules="rules"
      label-width="80px"
      label-position="top">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名">
          <template slot="prepend">
            <span class="glyphicon glyphicon-user"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password" placeholder="请输入密码"
          @keyup.enter.native="login('form')">>
          <template slot="prepend">
            <span class="glyphicon glyphicon-lock"></span>
          </template>
        </el-input>
      </el-form-item>
      <div class="login-btn">
        <el-button
          type="success"
          round plain
          @click="login('form')"
          style="width: 100%;margin: 5px auto;">
          登录
        </el-button>
        <el-button
          type="warning"
          round plain
          @click="resetForm('form')"
          style="width: 100%;margin: 5px auto;">
          重置
        </el-button>
        <router-link href="javascript:" to="/register">注册新用户</router-link>
        <div><span class="note">注：建议使用Chrome浏览器</span></div>
      </div>
    </el-form>
  </div>
</template>
<style>
  .note {
    color: red;
    opacity: 0.5;
  }
  .note:hover {
    color: red;
    opacity: 1;
  }

  .login-container {
    display: block;
    margin: 10% auto 0 auto;
    width: 300px;
    padding: 15px;
    border: 1px solid #337ab7;
    border-radius: 15px;
    box-shadow: 0 8px 25px #333;
  }

  .login-title {
    text-align: center;
    margin: 15px auto;
  }

  .login-btn {
    text-align: center;
  }

  .login-container .el-input-group__prepend {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
  }

  .login-container .el-input__inner {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .login-container .el-form-item__error {
    margin-left: 55px;
  }

</style>
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
            {min: 2, max: 24, message: '需要6到12个字符', trigger: 'blur'}
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
                this.$refs[formName].clearValidate();
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



<template>
  <el-form
    :model="form"
    ref="form"
    :status-icon="true"
    :rules="rules"
    label-width="80px"
    label-position="top">
    <h3>注册</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item label="设置密码" prop="password1">
      <el-input type="password" v-model="form.password1"/>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input type="password" v-model="form.password2"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register('form')">注册</el-button>
      <el-button type="primary" @click="resetForm('form')">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      let validatePwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空'));
        } else if (value !== this.form.password1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        form: {
          username: '',
          password1: '',
          password2: ''
        },
        rules: {
          username: [
            {required: true, message: '用户名能为空', trigger: 'blur'}
          ],
          password1: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          password2: [
            {validator: validatePwd2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/register', {
              username: this.form.username,
              password1: this.form.password1,
              password2: this.form.password2
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
          } else {
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>

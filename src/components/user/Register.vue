<template>
  <div class="register-container">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <h3 class="register-title">注册</h3>
    <el-form
      :model="form"
      ref="form"
      :status-icon="true"
      :rules="rules"
      label-width="80px"
      label-position="top">
      <el-form-item prop="username">
        <el-input v-model="form.username">
          <template slot="prepend">
            <span class="glyphicon glyphicon-user"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password1">
        <el-input type="password" v-model="form.password1">
          <template slot="prepend">
            <span class="glyphicon glyphicon-lock"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input type="password" v-model="form.password2">
          <template slot="prepend">
            <span class="glyphicon glyphicon-lock"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="department">
        <div class=" el-input-group__prepend " style="display: inline;float: left">
          <span class="glyphicon glyphicon-tag"></span>
        </div>
        <el-select
          v-model="form.department"
          placeholder="请选择部门"
          class="input-with-select">
          <el-option
            v-for="item in departments"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <div class="register-btn">
        <el-button
          type="success"
          round plain
          @click="register('form')"
          style="width: 100%;margin: 5px auto">
          注册
        </el-button>
        <el-button
          type="warning"
          round plain
          @click="resetForm('form')"
          style="width: 100%;margin: 5px auto">
          重置
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style>
  .register-container {
    display: block;
    margin: 10% auto 0 auto;
    width: 300px;
    padding: 15px;
    border: 1px solid #337ab7;
    border-radius: 15px;
    box-shadow: 0 8px 25px #333;
  }

  .register-title {
    text-align: center;
    margin: 15px auto;
  }

  .register-btn {
    text-align: center;
  }

  .input-with-select .el-input-group__append {
    background-color: #fff;
  }

  .el-input-group__prepend {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
  }

  .my-select .el-input__inner {
    width: 0;
    padding: 0;
  }

  .my-select .el-input-group__append {
    background-color: #fff;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .my-select .el-select .el-input {
    width: 210px;
  }

  .my-select .el-select .el-input .el-input__inner {
    width: 240px;
    padding-left: 15px;
  }

  .el-input__inner {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .el-form-item__error {
    margin-left: 55px;
  }

</style>
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
          password2: '',
          department: '',
        },
        departments: [],
        rules: {
          username: [
            {required: true, message: '用户名能为空', trigger: 'blur'},
            {min: 6, max: 24, message: '需要6到12个字符', trigger: 'blur'}
          ],
          password1: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, max: 24, message: '需要6到12个字符', trigger: 'blur'}
          ],
          password2: [
            {required: true, validator: validatePwd2, trigger: 'blur'},
            {min: 6, max: 24, message: '需要6到12个字符', trigger: 'blur'}
          ],
          department: [
            {required: true, message: '没有部门', trigger: 'blur'},
          ]
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        axios.post('/api/registerInitData').then((response) => {
          let res = response.data;
          if (res.code === 1) {
            this.departments = res.result.departments;
          }
        })
      },
      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/register', {
              username: this.form.username,
              password1: this.form.password1,
              password2: this.form.password2,
              userType: this.form.department
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<template>
  <div>
    <h1>{{this.$route.params.userId}}</h1>
    <el-form :model="user" ref="user" :rules="rules" label-width="80px">
      <el-form-item label="用户ID：">
        <el-col :span="12">
          <el-input type="text" v-model="user._id" disabled/>
        </el-col>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-col :span="12">
          <el-input type="text" v-model="user.username" disabled/>
        </el-col>
      </el-form-item>
      <el-form-item label="部门：" prop="department">
        <el-col :span="12">
          <el-select
            v-model="user.department"
            placeholder="请选择部门">
            <el-option
              v-for="item in departments"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="电话：" prop="tel">
        <el-col :span="12">
          <el-input type="text" v-model="user.tel" placeholder="请输入手机号码"/>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-col :span="12">
          <el-input type="text" v-model="user.email" placeholder="请输入邮箱"/>
        </el-col>
      </el-form-item>
      <el-form-item label="QQ：" prop="qq">
        <el-col :span="12">
          <el-input type="text" v-model="user.qq" placeholder="请输入QQ"/>
        </el-col>
      </el-form-item>
      <el-form-item label="权限：">
        <template>
          <el-transfer
            :titles="transferTitles"
            v-model="user.setPermissions"
            :data="transferData"/>
        </template>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-button type="primary" @click="submitForm('user')">提交设置</el-button>
          <el-button type="primary" @click="resetForm('user')">重置</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        user: {},
        departments: [],
        transferData: [],
        nowPermissions: [],
        transferTitles: ["没有的权限", "拥有的权限"],
        rules: {
          department: [
            {required: true, message: '部门不能为空', trigger: 'blur'},
          ],
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        axios.post('/api/editUserInitData', {
          userId: parseInt(this.$route.params.userId)
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.user = res.result.user;
            this.departments = res.result.departments;
            this.transferData = res.result.permissions;
            this.nowPermissions = this.user.setPermissions
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            axios.post('/api/editUser', this.user).then(response => {
              let res = response.data;
              if (res.code === 1) {
                this.init();
                this.$refs[formName].clearValidate();
                if (this.user._id === this.$store.state.userObj.userId) {
                  this.$store.commit('updateUserObj', res.result.userObj)
                }
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.msg
                });
                this.$refs[formName].clearValidate();
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.user.setPermissions = this.nowPermissions
      }
    }
  }
</script>

<style scoped>

</style>

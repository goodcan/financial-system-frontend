<template>
  <el-form
    :model="dptForm"
    ref="dptForm"
    :status-icon="true"
    label-width="100px">
    <div v-for="(department, index) in dptForm.departments">
      <el-form-item
        :label="'部门名称'+ index"
        :prop="'departments.' + index + '.name'"
        :rules="{required: true, message: '客户名不能为空', trigger: 'blur'}">
        <el-input v-model="department.name"/>
      </el-form-item>
      <el-form-item>
        <el-button @click.prevent="removeDpt(department)" v-if="index > 0">删除</el-button>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dptForm')">提交</el-button>
      <el-button @click="addDpt">新增客户名称</el-button>
      <el-button @click="resetForm('dptForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

  import axios from '../../axios'

  export default {
    data() {
      return {
        dptForm: {
          departments: [{
            name: '',
            time: Date.now()
          }],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            axios.post('/api/addOrderDpt', {
              departments: this.dptForm.departments,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.dptForm.departments = [{name: '', time: Date.now()}];
                this.$notify({
                  title: '成功',
                  message: '新的客户添加成功',
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.msg
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        // this.dptForm.departments = [{name: '', time: Date.now()}]
      },
      removeDpt(item) {
        console.log(item);
        let index = this.dptForm.departments.indexOf(item);
        console.log(index);
        if (index !== -1) {
          this.dptForm.departments.splice(index, 1)
        }
      },
      addDpt() {
        this.dptForm.departments.push({
          value: '',
          time: Date.now()
        });
      }
    }
  }
</script>

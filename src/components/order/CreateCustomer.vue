<template>
  <el-form
    :model="customerForm"
    ref="customerForm"
    :status-icon="true"
    label-width="100px">
    <div v-for="(customer, index) in customerForm.customers">
      <el-form-item
        :label="'客户名称'+ index"
        :prop="'customers.' + index + '.name'"
        :rules="{required: true, message: '客户名不能为空', trigger: 'blur'}">
        <el-input v-model="customer.name"/>
      </el-form-item>
      <el-form-item>
        <el-button @click.prevent="removeCustomer(customer)" v-if="index > 0">删除</el-button>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm('customerForm')">提交</el-button>
      <el-button @click="addCustomer">新增客户名称</el-button>
      <el-button @click="resetForm('customerForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

  import axios from '../../axios'

  export default {
    data() {
      return {
        customerForm: {
          customers: [{
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
            axios.post('/api/addOrderCustomer', {
              customers: this.customerForm.customers,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.customerForm.customers = [{name: '', time: Date.now()}];
                this.$notify({
                  title: '添加成功',
                  message: '新的客户添加成功',
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: '添加失败',
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
        // this.customerForm.customers = [{name: '', time: Date.now()}]
      },
      removeCustomer(item) {
        console.log(item);
        let index = this.customerForm.customers.indexOf(item);
        console.log(index);
        if (index !== -1) {
          this.customerForm.customers.splice(index, 1)
        }
      },
      addCustomer() {
        this.customerForm.customers.push({
          value: '',
          time: Date.now()
        });
      }
    }
  }
</script>

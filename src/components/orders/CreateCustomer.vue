<template>
  <el-form :model="customerForm" ref="customerForm" label-width="100px">
    <el-form-item
      v-for="(customer, index) in customerForm.customers"
      :label="'客户名称'+ index"
      :key="customer.time"
      :prop="'customers.' + index + '.name'"
      :rules="{required: true, message: '客户名不能为空', trigger: 'blur'}">
      <el-input v-model="customer.name"/>
      <el-button @click.prevent="removeCustomer(customer)" v-if="index > 0">删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('customerForm')">提交</el-button>
      <el-button @click="addClass">新增客户名称</el-button>
      <el-button @click="resetForm()">重置</el-button>
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
              customers: this.customerForm.customers
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.customerForm.customers = [{name: '', time: Date.now()}];
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
      resetForm() {
        // this.$refs[formName].resetFields();
        this.customerForm.customers = [{name: '', time: Date.now()}]
      },
      removeCustomer(item) {
        console.log(item);
        let index = this.customerForm.customers.indexOf(item);
        console.log(index);
        if (index !== -1) {
          this.customerForm.customers.splice(index, 1)
        }
      },
      addClass() {
        this.customerForm.customers.push({
          value: '',
          time: Date.now()
        });
      }
    }
  }
</script>

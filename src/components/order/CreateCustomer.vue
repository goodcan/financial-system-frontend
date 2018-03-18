<template>
  <el-row>
    <h3 class="add-option-title-h3">当前已有客户</h3>
    <el-table
      :data="customers"
      :stripe="true"
      width="100%">
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="添加时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="添加人"
        prop="createUser">
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="delOrderOption(scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3 class="add-option-title-h3">添加新的客户</h3>
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
          <el-button @click.prevent="removeCustomer(customer)" v-if="index > 0">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="addOrderOption('customerForm')">添加</el-button>
        <el-button @click="addCustomer">新增客户名称</el-button>
        <el-button @click="resetForm('customerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
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
        },
        customers: [],
        optionType: 'customers'
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        axios.post('/api/orderOptionInitData', {
          optionType: this.optionType
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.customers = res.result;
          }
        })
      },
      delOrderOption(option) {
        this.$confirm('此操作将永久删除'+option.name+'客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.post('/api/delOrderOption', {
            optionType: this.optionType,
            name: option.name
          }).then(response => {
            let res = response.data;
            if (res.code === 1) {
              this.$message({
                showClose: true,
                message: '删除成功!',
                type: 'success'
              });
              this.init();
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      addOrderOption(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
                this.init();
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

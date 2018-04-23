<template>
  <el-row>
    <h3 class="my-title-h3">当前已有客户</h3>
    <el-row class="my-center-row">
      <el-form
        inline
        @submit.native.prevent="init"
        v-model="searchForm">
        <el-form-item label="名称" prop="keyName">
          <el-input
            v-model="searchForm.keyName"
            clearable
            prefix-icon="el-icon-search"
            type="text"
            placeholder="请输入关键字"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchCustomers">
            <i class="el-icon-refresh">刷新</i>
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      v-loading="loading"
      :data="customers"
      :stripe="true"
      size="small"
      width="100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" class="table-expand">
            <el-col :span="12">
              <el-form-item label="客户名称：">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="创建人：">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开票信息：">
                <p class="custom-p">{{ props.row.billInfo }}</p>
              </el-form-item>
              <el-form-item label="邮寄地址：">
                <p class="custom-p">{{ props.row.mailAddress }}</p>
              </el-form-item>
            </el-col>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        align="center"
        label="添加时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        label="添加人"
        prop="createUser">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="confirmEdit(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delOrderOption(scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-style">
      <el-pagination
        @current-change="init()"
        layout="prev, pager, next, total"
        :current-page.sync="page"
        :page-size="pageSize"
        :total="totalCount">
      </el-pagination>
    </div>


    <h3 class="my-title-h3">添加新的客户</h3>
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
          <el-input
            type="text"
            placeholder="请填写客户名称"
            v-model="customer.name"/>
        </el-form-item>
        <el-form-item
          :label="'开票信息'"
          :prop="'customers.' + index + '.billInfo'"
          :rules="{required: true, message: '开票信息不能为空', trigger: 'blur'}">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请填写开票信息"
            v-model="customer.billInfo"/>
        </el-form-item>
        <el-form-item
          :label="'邮寄地址'"
          :prop="'customers.' + index + '.mailAddress'"
          :rules="{required: true, message: '邮寄地址不能为空', trigger: 'blur'}">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请填写寄件地址"
            v-model="customer.mailAddress"/>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="removeCustomer(customer)" v-if="index > 0">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="addOrderOption('customerForm')">添加</el-button>
        <el-button @click="addCustomer">新增客户</el-button>
        <el-button @click="resetForm('customerForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :append-to-body="true"
      :title="editTitle"
      :visible.sync="editShow"
      width="60%">
      <el-form
        :model="editCustomer"
        ref="editCustomer"
        :status-icon="true"
        label-width="100px">
        <el-form-item
          label="客户名称"
          prop="name">
          <el-input type="text" disabled v-model="editCustomer.name"/>
        </el-form-item>
        <el-form-item
          label="开票信息"
          prop="billInfo"
          :rules="{required: true, message: '开票信息不能为空', trigger: 'blur'}">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请填写开票信息"
            v-model="editCustomer.billInfo"/>
        </el-form-item>
        <el-form-item
          label="邮寄地址"
          prop="mailAddress"
          :rules="{required: true, message: '邮寄地址不能为空', trigger: 'blur'}">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请填写寄件地址"
            v-model="editCustomer.mailAddress"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeConfirmOrder('editCustomer')">取 消</el-button>
        <el-button type="primary" @click="editOrderOption('editCustomer')">提交</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>

  import axios from '../../axios'

  export default {
    data() {
      return {
        editTitle: '修改客户信息',
        editShow: false,
        editCustomer: '',
        customerForm: {
          customers: [{
            name: '',
            billInfo: '',
            mailAddress: '',
            time: Date.now()
          }],
        },
        loading: true,
        searchForm: {
          keyName: '',
        },
        page: 1,
        pageSize: 0,
        totalCount: 0,
        customers: [],
        optionType: 'customers'
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.loading = true;
        axios.post('/api/orderOptionInitData', {
          optionType: this.optionType,
          page: this.page,
          keyName: this.searchForm.keyName
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.customers = res.result.customers;
            this.totalCount = res.result.totalCount;
            this.pageSize = res.result.pageSize;
            this.loading = false
          }
        })
      },
      delOrderOption(option) {
        this.$confirm('此操作将永久删除' + option.name + '客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.post('/api/delOrderOption', {
            opsUserId: this.$store.state.userObj.userId,
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
              this.clearSearch();
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
              opsUserId: this.$store.state.userObj.userId,
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
                this.clearSearch();
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
      },
      confirmEdit(option) {
        this.editCustomer = option;
        this.editShow = true
      },
      closeConfirmOrder(formName) {
        this.$refs[formName].resetFields();
        this.editCustomer = {};
        this.editShow = false;
      },
      editOrderOption(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            axios.post('/api/editOrderOption', {
              opsUserId: this.$store.state.userObj.userId,
              option: this.editCustomer,
              createUser: this.$store.state.userObj.username,
              optionType: 'customers'
            }).then(response => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.$notify({
                  title: '修改成功',
                  message: '客户信息修改成功',
                  type: 'success'
                });
                this.editCustomer = {};
                this.editShow = false;
                this.init();
              } else {
                this.$notify.error({
                  title: '修改失败',
                  message: res.msg
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      searchCustomers() {
        this.page = 1;
        this.init()
      },
      clearSearch() {
        this.page = 1;
        this.searchForm.keyName = '';
      }
    }
  }
</script>

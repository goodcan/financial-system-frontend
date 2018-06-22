<template>
  <el-row>
    <h3 class="my-title-h3">当前已有公司</h3>
    <el-table
      v-loading="loading"
      :data="companies"
      :stripe="true"
      size="small"
      width="100%">
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
            type="danger"
            @click="delOrderOption(scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3 class="my-title-h3">添加新的公司</h3>
    <el-form
      :model="companyForm"
      ref="companyForm"
      :status-icon="true"
      label-width="100px">
      <div v-for="(company, index) in companyForm.companies">
        <el-form-item
          :label="'公司名称'+ index"
          :prop="'companies.' + index + '.name'"
          :rules="{required: true, message: '公司名称不能为空', trigger: 'blur'}">
          <el-input v-model="company.name" placeholder="请填写公司名称"/>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="removeCompany(company)" v-if="index > 0">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="addOrderOption('companyForm')">添加</el-button>
        <el-button @click="addCompany">新增公司</el-button>
        <el-button @click="resetForm('companyForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>

  import axios from '../../axios'

  export default {
    data() {
      return {
        companyForm: {
          companies: [{
            name: '',
            time: Date.now()
          }],
        },
        loading: true,
        companies: [],
        optionType: 'companies'
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.loading = true;
        axios.post('/api/orderOptionInitData', {
          optionType: this.optionType
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.companies = res.result;
            this.loading = false
          }
        })
      },
      delOrderOption(option) {
        this.$confirm('此操作将永久删除'+option.name+'公司, 是否继续?', '提示', {
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
            axios.post('/api/addOrderCompany', {
              opsUserId: this.$store.state.userObj.userId,
              companies: this.companyForm.companies,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.companyForm.companies = [{name: '', time: Date.now()}];
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
        // this.companyForm.companies = [{name: '', time: Date.now()}]
      },
      removeCompany(item) {
        console.log(item);
        let index = this.companyForm.companies.indexOf(item);
        console.log(index);
        if (index !== -1) {
          this.companyForm.companies.splice(index, 1)
        }
      },
      addCompany() {
        this.companyForm.companies.push({
          value: '',
          time: Date.now()
        });
      }
    }
  }
</script>

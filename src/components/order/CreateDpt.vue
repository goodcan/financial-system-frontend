<template>
  <el-row>
    <h3 class="my-title-h3">当前已有部门</h3>
    <el-table
      :data="departments"
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
    <h3 class="my-title-h3">添加新的部门</h3>
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
          <el-button @click.prevent="removeDpt(department)" v-if="index > 0">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="addOrderOption('dptForm')">提交</el-button>
        <el-button @click="addDpt">新增客户名称</el-button>
        <el-button @click="resetForm('dptForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
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
        },
        departments: [],
        optionType: 'departments'
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
            this.departments = res.result;
          }
        })
      },
      delOrderOption(option) {
        this.$confirm('此操作将永久删除'+option.name+'部门, 是否继续?', '提示', {
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
            axios.post('/api/addOrderDpt', {
              opsUserId: this.$store.state.userObj.userId,
              departments: this.dptForm.departments,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.dptForm.departments = [{name: '', time: Date.now()}];
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

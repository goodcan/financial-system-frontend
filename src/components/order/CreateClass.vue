<template>
  <el-row>
    <h3 class="add-option-title-h3">当前已有类目</h3>
    <el-table
      :data="classes"
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
            @click="delOrderOption(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3 class="add-option-title-h3">添加新的类目</h3>
    <el-form
      :model="classForm"
      ref="classForm"
      :status-icon="true"
      label-width="100px">
      <div v-for="(eachClass, index) in classForm.classes">
        <el-form-item
          :label="'类目名称'+ index"
          :prop="'classes.' + index + '.name'"
          :rules="{required: true, message: '类目名不能为空', trigger: 'blur'}">
          <el-input v-model="eachClass.name"/>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="removeClasses(eachClass)" v-if="index > 0">删除</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="addOrderOption('classForm')">添加</el-button>
        <el-button @click="addClass">新增类目</el-button>
        <el-button @click="resetForm('classForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>

  import axios from '../../axios'

  export default {
    data() {
      return {
        classForm: {
          classes: [{
            name: '',
            time: Date.now()
          }]
        },
        classes: [],
        optionType: 'classes'
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
            this.classes = res.result;
          }
        })
      },
      delOrderOption(option) {
        this.$confirm('此操作将永久删除该类目, 是否继续?', '提示', {
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
            // alert('submit!');
            axios.post('/api/addOrderClass', {
              classes: this.classForm.classes,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.classForm.classes = [{name: '', time: Date.now()}];
                this.$notify({
                  title: '添加成功',
                  message: '新的类目添加成功',
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
        // this.classForm.classes = [{name: '', time: Date.now()}]
      },
      removeClasses(item) {
        console.log(item);
        let index = this.classForm.classes.indexOf(item);
        console.log(index);
        if (index !== -1) {
          this.classForm.classes.splice(index, 1)
        }
      },
      addClass() {
        this.classForm.classes.push({
          value: '',
          time: Date.now()
        });
      }
    }
  }
</script>

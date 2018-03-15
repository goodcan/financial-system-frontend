<template>
  <el-form :model="classForm" ref="classForm" label-width="100px">
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
      <el-button type="primary" @click="submitForm('classForm')">提交</el-button>
      <el-button @click="addClass">新增类目</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
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
          }],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            axios.post('/api/addOrderClass', {
              classes: this.classForm.classes,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.classForm.classes = [{name: '', time: Date.now()}];
                this.$notify({
                  title: '成功',
                  message: '新的类目添加成功',
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
        this.classForm.classes = [{name: '', time: Date.now()}]
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

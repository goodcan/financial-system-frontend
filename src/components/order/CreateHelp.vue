<template>
  <el-form
    label-width="100px"
    :model="helpContent"
    ref="helpContent"
    :rules="rules"
    style="margin: 15px 15px">
    <el-form-item label="帮助内容：" prop="content">
      <el-input
        type="textarea"
        v-model="helpContent.content"
        :autosize="{ minRows: 10, maxRows: 20}"
        placeholder="请输入帮助信息"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addOrderHelpInfo('helpContent')">保存</el-button>
      <el-button type="primary" @click="resetForm('helpContent')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        helpContent: {
          content: ''
        },
        rules: {
          content: [
            {required: true, message: '内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      addOrderHelpInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/addOrderHelpInfo', {
              helpInfo: this.helpContent.content
            }).then(response => {
              let res = response.data;
              if (res.code === 1) {
                this.$notify({
                  title: '设置成功',
                  message: '订单帮助说明设置完成',
                  type: 'success'
                });
                this.$refs[formName].resetFields();
              } else {
                this.$notify.error({
                  title: '设置失败',
                  message: res.msg
                });
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

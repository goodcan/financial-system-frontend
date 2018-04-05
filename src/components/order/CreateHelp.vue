<template>
  <div>
    <h3 class="my-title-h3">当前帮助信息</h3>
    <pre style="border: 1px solid #dcdfe6;margin: 15px 30px;padding: 15px 15px">{{helpInfo? helpInfo: '暂未设置'}}</pre>
    <h3 class="my-title-h3">重新设置帮助信息</h3>
    <el-form
      label-position="top"
      :model="helpContent"
      ref="helpContent"
      :rules="rules"
      style="margin: 15px 30px">
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
  </div>
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
        },
        helpInfo: ''
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        axios.post('/api/orderOptionInitData', {
          optionType: 'helpInfo'
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.helpInfo = res.result[0].content
          }
        })
      },
      addOrderHelpInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/addOrderHelpInfo', {
              opsUserId: this.$store.state.userObj.userId,
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
                this.init()
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

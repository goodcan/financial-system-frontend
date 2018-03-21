<template>
  <el-form
    label-width="100px"
    :model="helpContent"
  style="margin: 15px 15px">
    <el-form-item label="帮助内容：" props="content">
      <el-input
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 20}"
        placeholder="请输入帮助信息" v-model="helpContent.content"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        helpContent: {
          content: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="订单类目">
      <el-select v-model="form.selectClass" placeholder="请选择订单类目">
        <el-option
          v-for="item in classes"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="订单客户">
      <el-select v-model="form.selectCustomer" placeholder="请选择订单客户">
        <el-option
          v-for="item in customers"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="对接人员">
      <el-select v-model="form.selectCustomer" placeholder="请选择对接人员">
        <el-option
          v-for="item in customers"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="预计完成时间">
      <el-col :span="10">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.expectDate" style="width: 100%;"/>
      </el-col>
    </el-form-item>
    <el-form-item label="金额">
      <el-col :span="10">
        <el-input placeholder="请输入金额" v-model="form.price">
          <template slot="prepend">￥</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="备注">
      <el-col :span="10">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入备注" v-model="form.note"/>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">创建订单</el-button>
      <el-button type="primary" @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        form: {
          price: '',
          selectClass: '',
          selectCustomer: '',
          expectDate: '',
          note: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        classes: '',
        customers: '',
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      init() {
        axios.post('/api/orderInitData').then((response) => {
            let res = response.data;
            if (res.code === 1) {
              this.classes = res.result.classes;
              this.customers = res.result.customers;
            }
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>

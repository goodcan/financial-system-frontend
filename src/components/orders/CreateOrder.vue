<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name"/>
    </el-form-item>
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
  </el-form>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        form: {
          name: '',
          selectClass: '',
          selectCustomer: '',
          date1: '',
          date2: '',
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
      onSubmit() {
        console.log('submit!');
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

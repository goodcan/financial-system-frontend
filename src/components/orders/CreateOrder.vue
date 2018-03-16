<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :status-icon="true"
    label-width="100px">
    <el-form-item label="部门" prop="selectClass">
      <el-select
        v-model="form.selectDpt"
        placeholder="请选择部门">
        <el-option
          v-for="item in departments"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="订单类目" prop="selectClass">
      <el-select
        v-model="form.selectClass"
        placeholder="请选择订单类目">
        <el-option
          v-for="item in classes"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="订单客户" prop="selectCustomer">
      <el-select
        v-model="form.selectCustomer"
        placeholder="请选择订单客户">
        <el-option
          v-for="item in customers"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="对接人员" prop="selectContact">
      <el-select
        v-model="form.selectContact"
        placeholder="请选择对接人员">
        <el-option
          v-for="item in contacts"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="预计完成时间" prop="expectDate">
      <el-col :span="10">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.expectDate"
          value-format="yyyy-MM-dd"
          style="width: 100%;"/>
      </el-col>
    </el-form-item>
    <el-form-item label="佣金" prop="price">
      <el-col :span="10">
        <el-input placeholder="请输入金额" v-model="form.price">
          <template slot="prepend">￥</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="备注" prop="desc">
      <el-col :span="10">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入备注" v-model="form.desc"/>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="createOrder('form')">创建订单</el-button>
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
          selectDpt: '',
          selectClass: '',
          selectCustomer: '',
          selectContact: '',
          expectDate: '',
          desc: '',
        },
        classes: '',
        customers: '',
        contacts: '',
        departments: '',
        rules: {
          price: [
            {required: true, message: '类目不能为空', trigger: 'blur'},
          ],
          selectClass: [
            {required: true, message: '客户不能为空', trigger: 'blur'},
          ],
          selectCustomer: [
            {required: true, message: '对接人员不能为空', trigger: 'blur'},
          ],
          selectContact: [
            {required: true, message: '佣金不能为空', trigger: 'blur'},
          ],
        }
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
              this.contacts = res.result.contacts;
              this.departments = res.result.departments;
            }
          }
        )
      },
      createOrder(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/createOrder', {
              userId: this.$store.state.userObj.userId,
              createUser: this.$store.state.userObj.username,
              userType: this.$store.state.userObj.userType,
              department: this.form.selectDpt,
              className: this.form.selectClass,
              customerName: this.form.selectCustomer,
              contactName: this.form.selectContact,
              expectDate: this.form.expectDate,
              price: this.form.price,
              desc: this.form.desc
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.$notify({
                  title: '成功',
                  message: '新的订单已经创建',
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
            return false
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>

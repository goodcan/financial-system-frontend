<template>
  <el-row>
    <h3 class="my-title-h3">创建新的订单</h3>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :status-icon="true"
      label-width="100px"
      class="create-form-size">
      <el-form-item label="名称" prop="title">
        <el-input placeholder="请输入订单名称" v-model="form.title"/>
      </el-form-item>
      <el-form-item label="部门" prop="selectDpt">
        <el-select
          v-model="form.selectDpt"
          placeholder="请选择部门"
          style="width: 100%">
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
          placeholder="请选择订单类目"
          style="width: 100%">
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
          placeholder="请选择订单客户"
          style="width: 100%;">
          <el-option
            v-for="item in customers"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="外包人员" prop="selectContact">
        <el-select
          v-model="form.selectContact"
          placeholder="请选择对接人员"
          style="width: 100%">
          <el-option
            v-for="item in contacts"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="预计完成时间" prop="expectDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.expectDate"
          value-format="yyyy-MM-dd"
          style="width: 100%;"/>
      </el-form-item>
      <el-form-item label="单价类型" prop="selectTax">
        <el-select
          v-model="form.selectTax"
          placeholder="请选择类型"
          style="width: 100%">
          <el-option label="税前" value="preTax"/>
          <el-option label="税后" value="afterTax"/>
        </el-select>
      </el-form-item>
      <el-form-item label="单位类型" prop="selectUnit">
        <el-select
          v-model="form.selectUnit"
          placeholder="请选择类型"
          style="width: 100%">
          <el-option label="页" value="page"/>
          <el-option label="字" value="character"/>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单价" prop="price" class="input-with-prepend">
            <el-input placeholder="请输入金额" v-model="form.price">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单价对应" v-if="form.selectUnit">
            <el-input-number
              v-model="form.unitNum"
              :min="1"
              label="单价对应"/>
            <span style="margin-left: 5px">{{showUnit(form.selectUnit)}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="数量">
        <el-input-number
          v-model="form.num"
          :min="1"
          label="字数/页数"/>
        <span style="margin-left: 5px">{{showUnit(form.selectUnit)}}</span>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入备注" v-model="form.desc"/>
      </el-form-item>
      <el-form-item label="预算总金额：">
        <span class="payment-num">{{(form.num / form.unitNum * form.price) | currency('￥')}}</span>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="createOrder('form')">创建订单</el-button>
        <el-button type="primary" @click="resetForm('form')">重置</el-button>
        <el-button type="primary" @click="helpContent">
          <i class="el-icon-question">帮助</i>
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="帮助信息"
      :visible.sync="helpShow">
      <pre style="margin: 0 0">{{helpInfo? helpInfo: '暂无帮助信息'}}</pre>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="helpShow = false">知道了
        </el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        form: {
          title: '',
          price: '',
          unitNum: '',
          num: '',
          selectDpt: '',
          selectClass: '',
          selectCustomer: '',
          selectContact: '',
          expectDate: '',
          selectTax: '',
          selectUnit: '',
          desc: '',
        },
        helpShow: false,
        classes: '',
        customers: '',
        contacts: '',
        departments: '',
        helpInfo: '',
        rules: {
          title: [
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {max: 25, message: '名称不能超过30个字符', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '类目不能为空', trigger: 'blur'},
          ],
          selectDpt: [
            {required: true, message: '客户不能为空', trigger: 'blur'},
          ],
          selectClass: [
            {required: true, message: '客户不能为空', trigger: 'blur'},
          ],
          selectCustomer: [
            {required: true, message: '对接人员不能为空', trigger: 'blur'},
          ],
          selectContact: [
            {required: true, message: '外包人员不能为空', trigger: 'blur'},
          ],
          selectTax: [
            {required: true, message: '单价类型不能为空', trigger: 'blur'},
          ],
          selectUnit: [
            {required: true, message: '单价单位类型不能为空', trigger: 'blur'},
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
              this.helpInfo = res.result.helpInfo[0]['content'];
              this.form.selectDpt = this.$store.state.userObj.department
            }
          }
        )
      },
      createOrder(formName) {
        if (this.$store.state.userPms.createOrder !== 1) {
          this.$confirm('没有权限，请联系管理员!', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
          }).catch(() => {
          });
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post('/api/createOrder', {
                userId: this.$store.state.userObj.userId,
                createUser: this.$store.state.userObj.username,
                title: this.form.title,
                department: this.form.selectDpt,
                className: this.form.selectClass,
                customerName: this.form.selectCustomer,
                contactName: this.form.selectContact,
                expectDate: this.form.expectDate,
                price: parseFloat(this.form.price),
                tax: this.form.selectTax,
                num: this.form.num,
                unit: this.form.selectUnit,
                unitNum: this.form.unitNum,
                desc: this.form.desc
              }).then((response) => {
                let res = response.data;
                if (res.code === 1) {
                  this.$refs[formName].resetFields();
                  this.$notify({
                    title: '创建成功',
                    message: '新的订单已经创建',
                    type: 'success'
                  });
                } else {
                  this.$notify.error({
                    title: '创建失败',
                    message: res.msg
                  });
                  this.$refs[formName].clearValidate();
                }
              })
            } else {
              return false
            }
          });
        }
      },
      helpContent() {
        this.helpShow = true;
      },
      showUnit(unit) {
        if (unit === 'page') {
          return '页'
        } else if (unit === 'character') {
          return '字'
        }
      }
    }
  }
</script>

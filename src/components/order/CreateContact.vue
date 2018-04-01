<template>
  <el-row>
    <h3 class="my-title-h3">当前已有外包人员</h3>
    <el-table
      :data="contacts"
      :stripe="true"
      width="100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" class="table-expand">
            <el-col :span="12">
              <el-form-item label="姓名：">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="创建人：">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
              <el-form-item label="付款信息：">
                <p class="custom-p">{{ props.row.payInfo }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="技能：">
                <span>{{ props.row.workClass }}</span>
              </el-form-item>
              <el-form-item label="手机号码：">
                <span>{{ props.row.tel? props.row.tel: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="QQ：">
                <span>{{ props.row.qq? props.row.qq: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="邮箱：">
                <span>{{ props.row.email? props.row.email: '未设置' }}</span>
              </el-form-item>
            </el-col>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="技能"
        prop="workClass">
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="confirmEdit(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delOrderOption(scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-style">
      <el-pagination
        @current-change="init()"
        layout="prev, pager, next, total"
        :current-page.sync="page"
        :page-size="pageSize"
        :total="totalCount">
      </el-pagination>
    </div>

    <h3 class="my-title-h3">添加新的外包人员</h3>
    <el-form
      :model="contactForm"
      ref="contactForm"
      :status-icon="true"
      label-width="100px">
      <div v-for="(contact, index) in contactForm.contacts">
        <el-form-item
          :label="'姓名' + index"
          :prop="'contacts.' + index + '.name'"
          :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
          <el-input
            type="text"
            placeholder="请填写姓名"
            v-model="contact.name"/>
        </el-form-item>
        <el-form-item
          :label="'付款信息'"
          :prop="'contacts.' + index + '.payInfo'"
          :rules="{required: true, message: '付款信息不能为空', trigger: 'blur'}">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请填写付款信息"
            v-model="contact.payInfo"/>
        </el-form-item>
        <el-form-item
          label="技能"
          :prop="'contacts.' + index + '.workClass'"
          :rules="{required: true, message: '技能不能为空', trigger: 'blur'}">
          <el-select
            v-model="contact.workClass"
            placeholder="请选择订单客户"
            style="width: 100%;">
            <el-option
              v-for="item in workClasses"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="'电话'"
          :prop="'contacts.' + index + '.tel'">
          <el-input
            type="text"
            placeholder="请填写电话号码"
            v-model="contact.tel"/>
        </el-form-item>
        <el-form-item
          :label="'邮箱'"
          :prop="'contacts.' + index + '.email'">
          <el-input
            type="text"
            placeholder="请填写邮箱地址"
            v-model="contact.email"/>
        </el-form-item>
        <el-form-item
          :label="'QQ'"
          :prop="'contacts.' + index + '.qq'">
          <el-input
            type="text"
            placeholder="请填写QQ号码"
            v-model="contact.qq"/>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="removeContact(contact)" v-if="index > 0">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="addOrderOption('contactForm')">提交</el-button>
        <el-button @click="addContact">新增类目</el-button>
        <el-button @click="resetForm('contactForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :title="editTitle"
      :visible.sync="editShow"
      width="60%">
      <el-form
        :model="editContact"
        ref="editContact"
        :status-icon="true"
        label-width="100px">
        <el-form-item
          label="姓名"
          prop="name">
          <el-input type="text" disabled v-model="editContact.name"/>
        </el-form-item>
        <el-form-item
          label="付款信息"
          prop="payInfo"
          :rules="{required: true, message: '付款信息不能为空', trigger: 'blur'}">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请填写付款信息"
            v-model="editContact.payInfo"/>
        </el-form-item>
        <el-form-item
          label="技能"
          prop="workClass"
          :rules="{required: true, message: '技能不能为空', trigger: 'blur'}">
          <el-select
            v-model="editContact.workClass"
            placeholder="请选择订单客户"
            style="width: 100%;">
            <el-option
              v-for="item in workClasses"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="tel">
          <el-input
            type="text"
            placeholder="请填写电话号码"
            v-model="editContact.tel"/>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input
            type="text"
            placeholder="请填写邮箱地址"
            v-model="editContact.email"/>
        </el-form-item>
        <el-form-item
          label="QQ"
          prop="qq">
          <el-input
            type="text"
            placeholder="请填写QQ号码"
            v-model="editContact.qq"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeConfirmOrder('editContact')">取 消</el-button>
        <el-button type="primary" @click="editOrderOption('editContact')">提交</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>

  import axios from '../../axios'

  export default {
    data() {
      return {
        page: 1,
        pageSize: 0,
        totalCount: 0,
        editTitle: '修改外包人员信息',
        editShow: false,
        editContact: '',
        contactForm: {
          contacts: [{
            name: '',
            tel: '',
            email: '',
            qq: '',
            payInfo: '',
            workClass: '',
            time: Date.now()
          }],
        },
        contacts: [],
        workClasses: '',
        optionType: 'contacts'
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        axios.post('/api/orderOptionInitData', {
          optionType: this.optionType,
          page: this.page,
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.contacts = res.result.contacts;
            this.workClasses = res.result.workClasses;
            this.totalCount = res.result.totalCount;
            this.pageSize = res.result.pageSize
          }
        })
      },
      delOrderOption(option) {
        this.$confirm('此操作将永久删除' + option.name + '对接人, 是否继续?', '提示', {
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
            axios.post('/api/addOrderContact', {
              contacts: this.contactForm.contacts,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.contactForm.contacts = [{name: '', tel: '', email: '', qq: '', time: Date.now()}];
                this.$notify({
                  title: '添加成功',
                  message: '新的外包人员添加成功',
                  type: 'success'
                });
                this.page = 1;
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
        // this.contactForm.contacts = [{name: '', time: Date.now()}]
      },
      removeContact(item) {
        console.log(item);
        let index = this.contactForm.contacts.indexOf(item);
        console.log(index);
        if (index !== -1) {
          this.contactForm.contacts.splice(index, 1)
        }
      },
      addContact() {
        this.contactForm.contacts.push({
          value: '',
          tel: '',
          email: '',
          qq: '',
          time: Date.now()
        });
      },
      confirmEdit(option) {
        this.editContact = option;
        this.editShow = true
      },
      closeConfirmOrder(formName) {
        this.$refs[formName].resetFields();
        this.editContact = {};
        this.editShow = false;
      },
      editOrderOption(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            axios.post('/api/editOrderOption', {
              option: this.editContact,
              createUser: this.$store.state.userObj.username,
              optionType: 'contacts'
            }).then(response => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.$notify({
                  title: '修改成功',
                  message: '外包人员信息修改成功',
                  type: 'success'
                });
                this.editContact = {};
                this.editShow = false;
                this.init();
              } else {
                this.$notify.error({
                  title: '修改失败',
                  message: res.msg
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>

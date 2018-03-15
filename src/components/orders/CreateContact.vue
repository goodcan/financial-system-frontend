<template>
  <el-form :model="contactForm" ref="contactForm" label-width="100px">
    <div v-for="(contact, index) in contactForm.contacts">
      <el-form-item
        :label="'姓名' + index"
        :prop="'contacts.' + index + '.name'"
        :rules="{required: true, message: '类目名不能为空', trigger: 'blur'}">
        <el-input v-model="contact.name"/>
      </el-form-item>
      <el-form-item
        :label="'电话'"
        :prop="'contacts.' + index + '.tel'">
        <!--:rules="{required: true, message: '类目名不能为空', trigger: 'blur'}">-->
        <el-input v-model="contact.tel"/>
      </el-form-item>
      <el-form-item
        :label="'邮箱'"
        :prop="'contacts.' + index + '.email'">
        <!--:rules="{required: true, message: '类目名不能为空', trigger: 'blur'}">-->
        <el-input v-model="contact.email"/>
      </el-form-item>
      <el-form-item
        :label="'QQ'"
        :prop="'contacts.' + index + '.qq'">
        <!--:rules="{required: true, message: '类目名不能为空', trigger: 'blur'}">-->
        <el-input v-model="contact.qq"/>
      </el-form-item>
      <el-form-item>
        <el-button @click.prevent="removeContact(contact)" v-if="index > 0">删除</el-button>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm('contactForm')">提交</el-button>
      <el-button @click="addContact">新增类目</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

  import axios from '../../axios'

  export default {
    data() {
      return {
        contactForm: {
          contacts: [{
            name: '',
            tel: '',
            email: '',
            qq: '',
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
            axios.post('/api/addOrderContact', {
              contacts: this.contactForm.contacts,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.contactForm.contacts = [{name: '', tel: '', email: '', qq: '', time: Date.now()}];
                this.$notify({
                  title: '成功',
                  message: '新的联系人添加成功',
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
        this.contactForm.contacts = [{name: '', time: Date.now()}]
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
      }
    }
  }
</script>

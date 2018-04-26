<template>
  <div>
    <el-popover
      ref="popover"
      placement="right"
      :title="contactName + '的信息'"
      width="300"
      trigger="hover">
      <div v-if="errMsg">
        <div class="my-popover-div">{{errMsg}}</div>
      </div>
      <div v-else>
        <div class="my-popover-div">
          <span>真实姓名：{{contact.realName? contact.realName: '未设置'}}</span>
        </div>
        <div
          v-if="this.$store.state.userPms.summaryOrder"
          class="my-popover-div">
          <span>付款信息：{{contact.payInfo? contact.payInfo: '未设置'}}</span>
        </div>
        <div class="my-popover-div">
          <span>QQ：{{contact.qq? contact.qq: '未设置'}}</span>
        </div>
        <div class="my-popover-div">
          <span>电话：{{contact.tel? contact.tel: '未设置'}}</span>
        </div>
        <div class="my-popover-div">
          <span>邮箱：{{contact.email? contact.email: '未设置'}}</span>
        </div>
      </div>
    </el-popover>
    <span
      v-popover:popover
      class="my-popover-span">{{ contactName }}</span>
  </div>
</template>

<script>
  import axios from '../../axios'

  export default {
    props: ['contactName'],
    data() {
      return {
        contact: {},
        errMsg: ''
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        axios.post('/api/getContactPopover', {
          contactName: this.contactName
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.contact = res.result
          } else {
            this.errMsg = res.msg
          }
        })
      }
    }
  }
</script>

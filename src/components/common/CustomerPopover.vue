<template>
  <div>
    <el-popover
      ref="popover"
      placement="right"
      :title="customerName + '的信息'"
      width="300"
      trigger="hover">
      <div v-if="errMsg">
        <div class="my-popover-div">{{errMsg}}</div>
      </div>
      <div v-else>
        <div class="my-popover-div">
          <span>开票信息：</span>
          <p class="custom-popover-p">{{customer.billInfo}}</p>
        </div>
        <div class="my-popover-div">
          <span>邮寄地址：</span>
          <p class="custom-popover-p">{{customer.mailAddress}}</p>
        </div>
      </div>
    </el-popover>
    <span
      v-if="this.$store.state.userPms.summaryOrder"
      v-popover:popover
      class="my-popover-span">{{ customerName }}</span>
    <span v-else>{{ customerName }}</span>
  </div>
</template>

<script>
  import axios from '../../axios'

  export default {
    props: ['customerName'],
    data() {
      return {
        customer: {},
        errMsg: ''
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        axios.post('/api/getCustomerPopover', {
          customerName: this.customerName
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.customer = res.result
          } else {
            this.errMsg = res.msg
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

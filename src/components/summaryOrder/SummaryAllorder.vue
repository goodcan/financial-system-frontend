<template>
  <el-row>
    <order-list v-bind:orderListType="orderListType">
      <h3 slot="title" class="my-title-h3">所有订单列表</h3>
      <el-row slot="download" class="my-center-row">
        <el-button
          type="primary"
          plain
          size="small"
          @click="downloadTable('summaryAll')">下载总汇总表</el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="downloadTable('summaryExpect')">下载预算汇总表</el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="downloadTable('summaryPayment')">下载支出汇总表</el-button>
      </el-row>
    </order-list>
  </el-row>
</template>

<script>
  import axios from '../../axios'
  import OrderList from '../order/OrderList'

  export default {
    data() {
      return {
        orderListType: 'summary'
      }
    },
    components: {
      OrderList
    },
    methods: {
      downloadTable(taleType) {
        axios.get('/api/downloadTable', {
          params: {
            opsUserId: this.$store.state.userObj.userId,
            tableType: taleType
          }
        }).then(res => {
          axios.post('/api/writeDownloadLog', {
            opsUserId: this.$store.state.userObj.userId,
            tableType: taleType
          })
        })
      }
    }
  }
</script>


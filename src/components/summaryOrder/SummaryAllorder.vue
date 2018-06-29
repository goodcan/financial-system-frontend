<template>
  <el-row>
    <order-list v-bind:orderListType="orderListType">
      <h3 slot="title" class="my-order-title-h3">所有订单列表</h3>
      <div slot="download" class="order-list-top-col">
        <div>
          <div class="block">
            <el-date-picker
              v-model="tableDate"
              type="month"
              value-format="yyyy-MM-dd"
              placeholder="选择汇总月份">
            </el-date-picker>
          </div>
          <el-row class="order-list-download-btn">
            <el-button
              type="primary"
              plain
              size="small"
              @click="downloadTable('summaryAll')">下载总汇总表
            </el-button>
          </el-row>
          <el-row class="order-list-download-btn">
            <el-button
              type="primary"
              plain
              size="small"
              @click="downloadTable('summaryExpect')">下载预算汇总表
            </el-button>
          </el-row>
          <el-row class="order-list-download-btn">
            <el-button
              type="primary"
              plain
              size="small"
              @click="downloadTable('summaryPayment')">下载支出汇总表
            </el-button>
          </el-row>
        </div>
      </div>
    </order-list>
  </el-row>
</template>

<script>
  import axios from '../../axios'
  import OrderList from '../order/OrderList'

  export default {
    data() {
      return {
        tableDate: '',
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
            tableType: taleType,
            tableDate: this.tableDate
          }
        }).then(() => {
          axios.post('/api/writeDownloadLog', {
            opsUserId: this.$store.state.userObj.userId,
            tableType: taleType,
            tableDate: this.tableDate
          })
        })
      }
    }
  }
</script>


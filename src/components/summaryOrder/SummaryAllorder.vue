<template>
  <el-row>
    <order-list v-bind:orderListType="orderListType">
      <h3 slot="title" class="my-title-h3">所有订单列表</h3>
    </order-list>
  </el-row>
</template>

<script>
  import OrderList from '../order/OrderList'

  export default {
    data() {
      return {
        orderListType: 'summary'
      }
    },
    components: {
      OrderList
    }
  }
</script>


<template>
  <div>
    <order-list v-bind:orderListType="orderListType">
        <h3 slot="title" class="my-order-title-h3">我创建的订单列表</h3>
    </order-list>
  </div>
</template>

<script>
  import OrderList from './OrderList'

  export default {
    data() {
      return {
        orderListType: 'self'
      }
    },
    components: {
      OrderList
    }
  }
</script>

<style scoped>

</style>

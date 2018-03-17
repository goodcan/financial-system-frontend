<template>
  <div>
    <order-list v-bind:orderListType="orderListType"/>
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

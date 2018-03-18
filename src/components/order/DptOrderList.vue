<template>
  <div>
    <order-list v-bind:orderListType="orderListType">
      <h3 slot="title" class="my-title-h3">{{this.$store.state.userObj? this.$store.state.userObj.department: ''}}部门的订单列表</h3>
    </order-list>
  </div>
</template>

<script>
  import OrderList from './OrderList'

  export default {
    data() {
      return {
        orderListType: 'department'
      }
    },
    components: {
      OrderList
    }
  }
</script>

<style scoped>

</style>

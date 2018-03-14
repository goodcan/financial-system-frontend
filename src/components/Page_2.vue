<template>
  <div>
    <h1>page_2</h1>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {}
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        axios.get('http://127.0.0.1:9851/admin/2')
      }
    }
  }
</script>

<style scoped>

</style>

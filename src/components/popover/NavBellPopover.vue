<template>
    <span
      class="nav-bell"
      v-popover:bell_popover>
      <el-popover
        ref="bell_popover"
        placement="bottom"
        title="消息"
        width="200"
        trigger="click"
        popper-class="nav-bell-popover"
        content="暂无消息">
      </el-popover>
        <el-badge is-dot class="my-bell-badge-item">
            <i class="el-icon-bell"></i>
        </el-badge>
      </span>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .nav-bell {
    color: white;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    float: right;
  }

  .nav-bell:hover {
    cursor: pointer;
    background-color: rgb(67, 74, 80);
  }
</style>

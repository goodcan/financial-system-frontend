<template>
    <span
      class="nav-bell"
      @click="clearBadge"
      v-popover:bell_popover>
      <el-popover
        ref="bell_popover"
        placement="bottom"
        title="通知信息"
        width="350"
        trigger="click"
        popper-class="nav-bell-popover">
        <div v-if="msg.length === 0" class="my-popover-div">
           <span>暂无新的消息</span>
        </div>
        <div v-else class="my-popover-div">
          <el-table
            :data="msg"
            :show-header="false"
            style="width: 100%;">
              <el-table-column>
                <template slot-scope="scope">
                  {{scope.row.content.orderTitle}}
                </template>
              </el-table-column>
              <el-table-column width="100px">
                <template slot-scope="scope">
                  {{scope.row.content.status === 2? '申请付款': '完成付款'}}
                </template>
              </el-table-column>
          </el-table>
        </div>
      </el-popover>
        <el-badge v-if="showBadge" is-dot class="my-bell-badge-item">
            <i class="el-icon-bell"></i>
        </el-badge>
        <i v-else class="el-icon-bell"></i>
      </span>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        msg: [],
        showBadge: false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        axios.post('/api/checkMsg', {
          userId: this.$store.state.userObj.userId
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.msg = res.result.msg;
            this.showBadge = res.result.showBadge
          }
        })
      },
      clearBadge() {
        if (this.showBadge) {
          let clearBadgeMsg = [];
          this.msg.forEach(item => {
            if (item.isRead === false) {
              clearBadgeMsg.push(item)
            }
          });
          axios.post('/api/clearBadgeMsg', {
            userId: this.$store.state.userObj.userId,
            clearBadgeMsg: clearBadgeMsg
          }).then(response => {
            let res = response.data;
            if (res.code === 1) {
              this.showBadge = false
            }
          })
        }
      }
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

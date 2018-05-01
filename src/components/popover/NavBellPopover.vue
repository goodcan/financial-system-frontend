<template>
  <span
    class="nav-bell"
    @click="clearBadge"
    v-popover:bell_popover>
      <el-popover
        ref="bell_popover"
        placement="bottom"
        width="350"
        trigger="click">
        <p style="margin: 10px">
          <span>通知中心</span>
          <span style="float: right">
            共 <span style="color: red;font-weight: bold;">{{msg.length}}</span> 条
          </span>
        </p>
            <div v-if="msg.length === 0" class="my-popover-div bell-popover-div">
               <p style="margin: 10px 0;text-align: center">暂无新的消息</p>
            </div>
            <div v-else class="my-popover-div bell-popover-div">
              <el-table
                :data="msg"
                :show-header="false"
                style="width: 100%">
                  <el-table-column>
                    <template slot-scope="scope">
                      <p style="font-size: 8px;margin: 0;margin-bottom: 5px">
                        <span>订单信息</span>
                        <span style="float: right">{{scope.row.sendTime}}</span>
                      </p>
                      [{{showTextByStatus(scope.row)}}] {{scope.row.content.orderTitle}}
                    </template>
                  </el-table-column>
              </el-table>
            </div>
      </el-popover>
        <el-badge :hidden="!showBadge" is-dot class="my-bell-badge-item">
            <i class="el-icon-bell"></i>
        </el-badge>
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
      },
      showTextByStatus(msg) {
        let status = msg.content.status;
        if (status === 1) {
          return '订单修改'
        } else if (status === 2) {
          return '申请付款'
        } else if (status === 3) {
          return '完成付款'
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

  .bell-popover-div {
    border-top: solid 1px #ccc;
    height: 300px;
    overflow: auto;
  }
</style>

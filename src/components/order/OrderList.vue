<template>
  <div>
    <el-row style="text-align: center;margin-bottom: 15px">
      <span>需要支出：{{payStatus.need | currency('￥')}}</span> |
      <span>预计支出：{{payStatus.expect | currency('￥')}}</span> |
      <span>已经支出：{{payStatus.had | currency('￥')}}</span>
    </el-row>
    <el-table
      :data="orders"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-form-item>
              <el-steps :active="props.row.status" finish-status="success">
                <el-step title="创建订单"/>
                <el-step title="制作完成"/>
                <el-step title="结算完成"/>
              </el-steps>
            </el-form-item>
            <el-col :span="12">
              <el-form-item label="订单ID：">
                <span>{{ props.row.orderId }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人：">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
              <el-form-item label="部门类别：">
                <span>{{ props.row.department }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="订单类目：">
                <span>{{ props.row.className }}</span>
              </el-form-item>
              <el-form-item label="客户名称：">
                <span>{{ props.row.customerName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对接人员：">
                <span>{{ props.row.contactName }}</span>
              </el-form-item>
              <el-form-item label="佣金：">
                <span>{{ props.row.price | currency('￥') }}</span>
              </el-form-item>
            </el-col>
            <el-form-item label="备注：" v-if="props.row.desc">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单 ID"
        prop="orderId">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="创建人"
        width="100px"
        prop="createUser">
      </el-table-column>
      <el-table-column
        label="部门"
        width="80px"
        prop="department">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="orderStatus(scope.row.status)"
            lose-transition>
            {{orderStatusText(scope.row.status)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="delOrder(scope.row)">删除
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status !== 1"
            @click="editOrderStatus(scope.row, 1)">重新制作
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status !== 2"
            @click="editOrderStatus(scope.row, 2)">制作完成
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status !== 3"
            @click="editOrderStatus(scope.row, 3)">完成付款
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
</style>

<script>
  import axios from '../../axios'

  export default {
    props: ['orderListType'],
    data() {
      return {
        orders: []
      }
    },
    computed: {
      payStatus() {
        let needPay = 0;
        let hadPay = 0;
        let expectPay = 0;
        this.orders.forEach((item) => {
          if (item.status === 1) {
            expectPay += item.price;
          } else if (item.status === 2) {
            needPay += item.price
          } else if (item.status === 3) {
            hadPay += item.price
          }
        });
        return {
          need: needPay,
          had: hadPay,
          expect: expectPay
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        console.log('user: ' + this.$store.state.userObj);
        axios.post('/api/orderList', {
          orderListType: this.orderListType
        }).then((response) => {
          let res = response.data;
          if (res.code === 1) {
            this.orders = res.result;
          }
        })
      },
      delOrder(order) {
        if (this.$store.state.userPms.createOrder !== 1) {
          this.$confirm('没有权限，请联系管理员TXT', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
          }).catch(() => {
          });
        } else {
          this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            axios.post('/api/delOrder', {
              userId: order.userId,
              orderId: order.orderId
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$message({
                  showClose: true,
                  message: '删除成功!',
                  type: 'success'
                });
                this.init();
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      orderStatus(status) {
        if (status === 1) {
          return 'primary'
        } else if (status === 2) {
          return 'warning'
        } else if (status === 3) {
          return 'success'
        }
      },
      orderStatusText(status) {
        if (status === 1) {
          return '制作中'
        } else if (status === 2) {
          return '待付款'
        } else if (status === 3) {
          return '已付款'
        }
      },
      editOrderStatus(order, status) {
        if (this.$store.state.userPms.createOrder !== 1) {
          this.$confirm('没有权限，请联系管理员TXT', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
          }).catch(() => {
          });
        } else {
          axios.post('/api/editOrderStatus', {
            status: status,
            orderId: order.orderId
          }).then((response) => {
            let res = response.data;
            if (res.code === 1) {
              this.$notify({
                title: '成功',
                message: res.msg,
                type: 'success'
              });
              this.init();
            } else {
              this.$notify.error({
                title: '失败',
                message: res.msg
              });
            }
          })
        }
      },
    }
  }
</script>



<template>
  <div>
    <slot name="title"/>
    <el-row style="margin: 15px auto;text-align: center">
      <el-badge :value="payStatus.expect.expectNum" :max="99" class="my-badge-item">
        <el-tag type="primary">未完成</el-tag>
      </el-badge>
      <el-badge :value="payStatus.need.needNum" :max="99" class="my-badge-item">
        <el-tag type="warning">需要支付</el-tag>
      </el-badge>
      <el-badge :value="payStatus.had.hadNum" :max="99" class="my-badge-item">
        <el-tag type="success">已支付</el-tag>
      </el-badge>
    </el-row>
    <el-row style="margin: 15px auto;text-align: center">
      <span>预计支出：{{payStatus.expect.expectPay | currency('￥')}}</span> |
      <span>需要支出：{{payStatus.need.needPay | currency('￥')}}</span> |
      <span>已经支出：{{payStatus.had.hadPay | currency('￥')}}</span>
    </el-row>
    <el-table
      v-loading="loading"
      :data="orders"
      :stripe="true"
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
              <el-form-item label="创建人：">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
              <el-form-item label="部门类别：">
                <span>{{ props.row.department }}</span>
              </el-form-item>
              <el-form-item label="订单类目：">
                <span>{{ props.row.className }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户名称：">
                <span>{{ props.row.customerName }}</span>
              </el-form-item>
              <el-form-item label="对接人员：">
                <span>{{ props.row.contactName }}</span>
              </el-form-item>
              <el-form-item label="佣金：">
                <span>{{ props.row.price | currency('￥') }}</span>
              </el-form-item>
              <el-form-item label="预计完成：">
                <span>{{ props.row.expectDate? props.row.expectDate: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="备注：">
                <span>{{ props.row.desc? props.row.desc: '未设置' }}</span>
              </el-form-item>
            </el-col>
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
        label="佣金"
        prop="showPrice">
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
          <el-button
            size="mini"
            type="danger"
            @click="delOrder(scope.row)"><i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from '../../axios'
  import {currency} from "../../util/currency";

  export default {
    props: ['orderListType'],
    data() {
      return {
        orders: [],
        loading: false
      }
    },
    computed: {
      payStatus() {
        let needPay = 0;
        let needNum = 0;
        let hadPay = 0;
        let hadNum = 0;
        let expectPay = 0;
        let expectNum = 0;
        this.orders.forEach((item) => {
          if (item.status === 1) {
            expectPay += item.price;
            expectNum += 1;
          } else if (item.status === 2) {
            needPay += item.price;
            needNum += 1
          } else if (item.status === 3) {
            hadPay += item.price;
            hadNum += 1;
          }
        });
        return {
          need: {
            needPay,
            needNum
          },
          had: {
            hadPay,
            hadNum
          },
          expect: {
            expectPay,
            expectNum
          }
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.loading = true;
        console.log('user: ' + this.$store.state.userObj);
        axios.post('/api/orderList', {
          orderListType: this.orderListType
        }).then((response) => {
          let res = response.data;
          if (res.code === 1) {
            this.orders = res.result;
          }
          this.orders.forEach(item => {
            item.showPrice = currency(item.price, '￥')
          });
          this.loading = false;
        })
      },
      getEditPms(order) {
        let user = this.$store.state.userObj;
        if (this.$store.state.userPms.editAllOrder === 1) {
          return true
        } else if (this.$store.state.userPms.editDptOrder === 1 && order.department === user.department) {
          return true
        } else {
          return this.$store.state.userPms.editSelfOrder === 1 && order.userId === user.userId
        }
      },
      delOrder(order) {
        if (this.getEditPms(order)) {
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
        } else {
          this.$confirm('没有权限，请联系管理员TXT', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
          }).catch(() => {
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
        if (this.getEditPms(order)) {
          axios.post('/api/editOrderStatus', {
            status: status,
            orderId: order.orderId
          }).then((response) => {
            let res = response.data;
            if (res.code === 1) {
              this.$notify({
                title: '操作成功',
                message: res.msg,
                type: 'success'
              });
              // this.init();
              order.status = status;
            } else {
              this.$notify.error({
                title: '操作失败',
                message: res.msg
              });
            }
          })
        } else {
          this.$confirm('没有权限，请联系管理员TXT', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
          }).catch(() => {
          });
        }
      },
    }
  }
</script>



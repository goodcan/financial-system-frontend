<template>
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
              <span>{{ props.row.price }}</span>
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
      prop="createUser">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="状态">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === 1 ? 'primary' : 'success'"
          lose-transition>
          {{scope.row.status === 1? '进行中': '已完成'}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <!--<el-button-->
        <!--size="mini"-->
        <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <el-button
          size="mini"
          type="danger"
          @click="delOrder(scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
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
    data() {
      return {
        orders: []
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        console.log('user: ' + this.$store.state.userObj);
        axios.post('/api/orderList', {
          userId: this.$store.state.userObj.userId
        }).then((response) => {
          let res = response.data;
          if (res.code === 1) {
            this.orders = res.result;
          }
        })
      },
      delOrder(order) {
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
    }
  }
</script>



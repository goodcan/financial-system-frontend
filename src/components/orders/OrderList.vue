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
              <el-step title="进行中"/>
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
          :type="scope.row.status === 2 ? 'primary' : 'success'"
          lose-transition>
          {{scope.row.status === 2? '进行中': '已完成'}}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
      }
    }
  }
</script>



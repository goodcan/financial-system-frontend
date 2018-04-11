<template>
  <div>
    <h3 class="my-title-h3">所有系统人员</h3>
    <el-table
      :data="users"
      :stripe="true"
      size="small"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" class="table-expand">
            <el-col :span="12">
              <el-form-item label="用户ID：">
                <span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="用户名：">
                <span>{{ props.row.username }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="上次登录：">
                <span>{{ props.row.lastLogin }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门：">
                <span>{{ props.row.department? props.row.department: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="手机号码：">
                <span>{{ props.row.tel? props.row.tel: '未设置' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ：">
                <span>{{ props.row.qq? props.row.qq: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="邮箱：">
                <span>{{ props.row.email? props.row.email: '未设置' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="权限：">
              <span v-if="props.row.pmsListName.length !== 0" v-for="each in props.row.pmsListName">
                <el-tag style="margin-right: 5px">{{each}}</el-tag>
              </span>
                <span v-if="props.row.pmsListName.length === 0">
                没有任何权限
              </span>
              </el-form-item>
            </el-col>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="用户ID"
        prop="userId">
      </el-table-column>
      <el-table-column
        align="center"
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        align="center"
        label="所属公司">
        <template slot-scope="scope">
          {{scope.row.company? scope.row.company: '未设置'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="上次登录"
        prop="lastLogin">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="toEditUser(scope.row.userId)">
            <i class="el-icon-edit"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        users: []
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        axios.post('/api/userList').then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.users = res.result;
          }
        })
      },
      toEditUser(userId) {
        this.$router.push({
          path: '/editUser/' + userId
        })
      },
    }
  }
</script>

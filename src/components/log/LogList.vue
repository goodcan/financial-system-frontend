<template>
  <el-row>
    <h3 class="my-title-h3">用户操作日志</h3>
    <el-table
      v-loading="loading"
      :data="logs"
      :stripe="true"
      style="width: 100%">
      <el-table-column
        align="center"
        label="操作时间"
        prop="logTime">
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
        label="操作"
        prop="action">
      </el-table-column>
    </el-table>

    <div class="pagination-style" style="margin-bottom: 15px">
      <el-pagination
        @size-change="sizeChange"
        @current-change="init"
        layout="sizes, prev, pager, next, total"
        :current-page.sync="page"
        :size-page.sync="pageSize"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="pageSize"
        :total="totalCount">
      </el-pagination>
    </div>

  </el-row>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        loading: false,
        page: 1,
        pageSize: 25,
        totalCount: 0,
        logs: []
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.loading = true;
        axios.post('/api/logList', {
          page: this.page,
          pageSize: this.pageSize
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.logs = res.result.logs;
            this.page = res.result.page;
            this.pageSize = res.result.pageSize;
            this.totalCount = res.result.totalCount;
            this.loading = false;
          } else {

          }
        })
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.init()
      }
    }
  }
</script>

<style scoped>

</style>

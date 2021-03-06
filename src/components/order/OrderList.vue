<template>
  <div>
    <div align="center">
      <slot name="title"/>
      <el-tooltip class="item" effect="dark" content="刷新列表" placement="right">
        <el-button
          size="mini" style="border-radius: 50%;padding: 3px;margin-left: 5px"
          @click="init"><i class="el-icon-refresh" style="font-weight: bold"></i></el-button>
      </el-tooltip>
    </div>
    <el-row type="flex" justify="center" style="margin-bottom: 15px">
      <div class="order-list-top-col">
        <div>
          <el-row>
            <el-badge :value="payStatus.expect.expectNum" :max="99" class="my-badge-item">
              <el-tag type="primary" class="order-list-top-tag">制作中</el-tag>
            </el-badge>
            <span>预计支出：{{payStatus.expect.expectPay | currency('￥')}}</span>
          </el-row>
          <el-row>
            <el-badge :value="payStatus.need.needNum" :max="99" class="my-badge-item">
              <el-tag type="warning" class="order-list-top-tag">待付款</el-tag>
            </el-badge>
            <span>需要支出：{{payStatus.need.needPay | currency('￥')}}</span>
          </el-row>
          <el-row>
            <el-badge :value="payStatus.had.hadNum" :max="99" class="my-badge-item">
              <el-tag type="success" class="order-list-top-tag">已付款</el-tag>
            </el-badge>
            <span>已经支出：{{payStatus.had.hadPay | currency('￥')}}</span>
          </el-row>
        </div>
      </div>
      <div class="order-list-top-col">
        <el-form
          :model="search"
          label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="订单名称" prop="title">
                <el-input
                  type="text"
                  @change="init"
                  clearable
                  prefix-icon="el-icon-search"
                  placeholder="请输入关键字"
                  v-model="search.title"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建日期">
                <el-date-picker
                  v-model="search.date"
                  @change="init"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="订单状态">
                <el-select
                  v-model="search.status"
                  @change="init"
                  placeholder="请选择订单状态"
                  style="width: 100%">
                  <el-option label="不区分" :value="-1"/>
                  <el-option label="未完成" :value="1"/>
                  <el-option label="待付款" :value="2"/>
                  <el-option label="已付款" :value="3"/>
                </el-select>
              </el-form-item>
              <el-form-item label="所属公司">
                <el-select
                  v-model="search.company"
                  @change="init"
                  :disabled="orderListType === 'company'"
                  placeholder="请选择所属公司"
                  style="width: 100%">
                  <el-option
                    label="不区分"
                    :key="'all'"
                    :value="'all'"/>
                  <el-option
                    v-for="item in companies"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="订单客户">
                <el-select
                  v-model="search.customer"
                  filterable
                  @change="init"
                  placeholder="请选择订单客户"
                  style="width: 100%">
                  <el-option
                    label="不区分"
                    :key="'all'"
                    :value="'all'"/>
                  <el-option
                    v-for="item in customers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="外包人员">
                <el-select
                  v-model="search.contact"
                  filterable
                  @change="init"
                  placeholder="请选择外包人员"
                  style="width: 100%">
                  <el-option
                    label="不区分"
                    :key="'all'"
                    :value="'all'"/>
                  <el-option
                    v-for="item in contacts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <slot name="download"/>
    </el-row>
    <el-table
      v-loading="loading"
      :data="showOrders"
      :stripe="true"
      size="small"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-steps
            :active="props.row.status"
            finish-status="success"
            style="margin: 15px 15px">
            <el-step title="创建订单"/>
            <el-step title="制作完成"/>
            <el-step title="结算完成"/>
          </el-steps>
          <el-form label-position="right" label-width="120px" class="table-expand">
            <el-col :span="12">
              <el-form-item label="订单ID：">
                <span>{{ props.row.orderId }}</span>
              </el-form-item>
              <el-form-item label="订单名称：">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="创建人：">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
              <el-form-item label="所属公司：">
                <span>{{ props.row.company }}</span>
              </el-form-item>
              <el-form-item label="订单类目：">
                <span>{{ props.row.className }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户名称：">
                <customer-popover v-bind:customerName="props.row.customerName"></customer-popover>
              </el-form-item>
              <el-form-item label="外包人员：">
                <contact-popover v-bind:contactName="props.row.contactName"></contact-popover>
              </el-form-item>
              <el-form-item label="预计完成：">
                <span>{{ props.row.expectDate? props.row.expectDate: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="预算单价：">
                <span>{{showExpectTax(props.row.expect)}} | {{props.row.expect.unitNum}}{{showUnit(props.row.expect.unit)}} | {{props.row.expect.price | currency('￥') }}</span>
              </el-form-item>
              <el-form-item label="预算数量：">
                <span>{{props.row.expect.num}} {{showExpectUnit(props.row.expect)}}</span>
              </el-form-item>
              <el-form-item label="预算总金额：">
                <span :class="{'payment-num': props.row.status === 1}">{{(props.row.expect.num / props.row.expect.unitNum * props.row.expect.price) | currency('￥')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：">
                <p class="order-list-p">{{ props.row.desc? props.row.desc: '未设置' }}</p>
              </el-form-item>
            </el-col>
            <div v-if="props.row.status !== 1">
              <el-col :span="12">
                <div v-if="props.row.status >= 2">
                  <el-form-item label="申请付款时间：">
                    <span>{{props.row.completeTime}}</span>
                  </el-form-item>
                </div>
                <el-form-item label="结算单价：">
                  <span>{{showExpectTax(props.row)}} | {{props.row.unitNum}}{{showUnit(props.row.unit)}} | {{props.row.price | currency('￥') }}</span>
                </el-form-item>
                <el-form-item label="结算金额：">
                  <span
                    class="payment-num">{{(props.row.num / props.row.unitNum * props.row.price) | currency('￥')}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div v-if="props.row.status >= 3">
                  <el-form-item label="完成付款时间：">
                    <span>{{props.row.paymentTime}}</span>
                  </el-form-item>
                </div>
                <el-form-item label="结算数量：">
                  <span>{{props.row.num}} {{showExpectUnit(props.row)}}</span>
                </el-form-item>
                <el-form-item label="评价外包：">
                  <div
                    v-if="props.row.evaluation !== 0"
                    style="padding: 5px;font-size: 25px">
                    <el-rate
                      v-model="props.row.evaluation"
                      disabled
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      show-text>
                    </el-rate>
                  </div>
                  <span v-else>
                      未评价
                    </span>
                </el-form-item>
              </el-col>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单名称"
        prop="title">
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        width="200px"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        label="创建人"
        prop="createUser">
      </el-table-column>
      <el-table-column
        align="center"
        label="所属公司"
        prop="company">
      </el-table-column>
      <el-table-column
        align="center"
        label="客户"
        prop="customerName">
      </el-table-column>
      <el-table-column
        align="center"
        label="外包人员"
        prop="contactName">
      </el-table-column>
      <el-table-column
        align="center"
        label="总金额">
        <template slot-scope="scope">
          <sum-price-popover v-bind:order="scope.row"></sum-price-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="orderStatus(scope.row.status)"
            lose-transition>
            {{orderStatusText(scope.row.status)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="280px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.status !== 1"
            @click="confirmOrder(scope.row, 1)">修改订单
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status === 1"
            @click="confirmOrder(scope.row, 2)">制作完成
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status === 2"
            @click="confirmOrder(scope.row, 3)">完成付款
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delOrder(scope.row)"><i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-style">
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        layout="sizes, prev, pager, next, total"
        :current-page.sync="page"
        :size-page.sync="pageSize"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="pageSize"
        :total="totalCount">
      </el-pagination>
    </div>

    <el-dialog
      :append-to-body="true"
      :title="confirmTitle"
      :visible.sync="confirmShow"
      width="60%">
      <el-steps
        :active="confirmStatus"
        finish-status="success"
        style="margin: 15px 15px">
        <el-step title="创建订单"/>
        <el-step title="制作完成"/>
        <el-step title="结算完成"/>
      </el-steps>
      <el-form
        :model="confirmData"
        ref="confirmData"
        label-width="125px"
        label-position="right"
        :rules="rules"
        :status-icon="true">
        <div v-if="confirmStatus !== 1">
          <el-col :span="12">
            <el-form-item label="订单ID：">
              <span>{{ confirmData.orderId }}</span>
            </el-form-item>
            <el-form-item label="订单名称：">
              <span>{{ confirmData.title }}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{ confirmData.createTime }}</span>
            </el-form-item>
            <el-form-item label="创建人：">
              <span>{{ confirmData.createUser }}</span>
            </el-form-item>
            <el-form-item label="所属公司：">
              <span>{{ confirmData.company }}</span>
            </el-form-item>
            <el-form-item label="订单类目：">
              <span>{{ confirmData.className }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称：">
              <span>{{ confirmData.customerName }}</span>
            </el-form-item>
            <el-form-item label="外包人员：">
              <span>{{ confirmData.contactName }}</span>
            </el-form-item>
            <el-form-item label="预计完成：">
              <span>{{ confirmData.expectDate? confirmData.expectDate: '未设置' }}</span>
            </el-form-item>
            <el-form-item label="预算单价：">
              <span>{{showExpectTax(confirmData)}} | {{confirmData.expect.unitNUm}}{{showUnit(confirmData.expect.unit)}} | {{confirmData.expect.price | currency('￥') }}</span>
            </el-form-item>
            <el-form-item label="预算数量：">
              <span>{{confirmData.expect.num}} {{showExpectUnit(confirmData)}}</span>
            </el-form-item>
            <el-form-item label="预算总金额：">
              <span>{{(confirmData.expect.num / confirmData.expect.unitNum * confirmData.expect.price) | currency('￥') }}</span>
            </el-form-item>
          </el-col>
          <el-form-item label="备注：" prop="desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入备注" v-model="confirmData.desc"/>
          </el-form-item>
        </div>
        <div v-else>
          <div v-if="this.$store.state.userPms.editOrderMoreParam === 1">
            <el-col :span="24">
              <el-form-item label="订单ID：">
                <span>{{ confirmData.orderId }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ confirmData.createTime }}</span>
              </el-form-item>
              <el-form-item label="创建人：">
                <span>{{ confirmData.createUser }}</span>
              </el-form-item>
              <el-form-item label="名称：" prop="title">
                <el-input placeholder="请输入订单名称" v-model="confirmData.title"/>
              </el-form-item>
              <el-form-item label="部门：" prop="company">
                <el-select
                  v-model="confirmData.company"
                  placeholder="请选择部门"
                  style="width: 100%">
                  <el-option
                    v-for="item in companies"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="订单类目：" prop="className">
                <el-select
                  filterable
                  v-model="confirmData.className"
                  placeholder="请选择订单类目"
                  style="width: 100%">
                  <el-option
                    v-for="item in classes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="订单客户：" prop="customerName">
                <el-select
                  filterable
                  v-model="confirmData.customerName"
                  placeholder="请选择订单客户"
                  style="width: 100%;">
                  <el-option
                    v-for="item in customers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="外包人员：" prop="contactName">
                <el-select
                  filterable
                  v-model="confirmData.contactName"
                  placeholder="请选择对接人员"
                  style="width: 100%">
                  <el-option
                    v-for="item in contacts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="预计完成时间：" prop="expectDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="confirmData.expectDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"/>
              </el-form-item>
            </el-col>
          </div>
          <div v-else>
            <el-col :span="12">
              <el-form-item label="订单ID：">
                <span>{{ confirmData.orderId }}</span>
              </el-form-item>
              <el-form-item label="订单名称：">
                <span>{{ confirmData.title }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ confirmData.createTime }}</span>
              </el-form-item>
              <el-form-item label="创建人：">
                <span>{{ confirmData.createUser }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属公司：">
                <span>{{ confirmData.company }}</span>
              </el-form-item>
              <el-form-item label="订单类目：">
                <span>{{ confirmData.className }}</span>
              </el-form-item>
              <el-form-item label="客户名称：">
                <span>{{ confirmData.customerName }}</span>
              </el-form-item>
              <el-form-item label="外包人员：">
                <span>{{ confirmData.contactName }}</span>
              </el-form-item>
            </el-col>
            <el-form-item label="备注：" prop="desc">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入备注" v-model="confirmData.desc"/>
            </el-form-item>
          </div>
          <el-col :span="24">
            <el-form-item label="预算单价类型：" prop="tax">
              <el-select
                v-model="confirmData.tax"
                placeholder="请选择类型"
                style="width: 100%;">
                <el-option label="税前" value="preTax"/>
                <el-option label="税后" value="afterTax"/>
              </el-select>
            </el-form-item>
            <el-form-item label="预算单价单位：" prop="unit">
              <el-select
                v-model="confirmData.unit"
                placeholder="请选择类型："
                style="width: 100%;">
                <el-option label="页" value="page"/>
                <el-option label="字" value="character"/>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预算单价：" prop="price" class="input-with-prepend">
                  <el-input placeholder="请输入金额" v-model="confirmData.price">
                    <template slot="prepend">￥</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单价对应：" v-if="confirmData.unit">
                  <el-input-number
                    v-model="confirmData.unitNum"
                    :min="1"
                    label="单价对应"/>
                  <span style="margin-left: 5px">{{showUnit(confirmData.unit)}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="预算数量：">
              <el-input-number
                v-model="confirmData.num"
                :min="1"
                label="字数/页数"/>
            </el-form-item>
            <el-form-item label="备注：" prop="desc" v-if="this.$store.state.userPms.editOrderMoreParam === 1">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入备注" v-model="confirmData.desc"/>
            </el-form-item>
            <el-form-item label="预算总金额：">
              <span
                class="payment-num">{{(confirmData.num / confirmData.unitNum * confirmData.price) | currency('￥')}}
              </span>
            </el-form-item>
          </el-col>
        </div>
        <div v-if="confirmStatus === 2">
          <el-form-item label="结算单价类型" prop="tax">
            <el-select
              v-model="confirmData.tax"
              placeholder="请选择类型"
              style="width: 100%;">
              <el-option label="税前" value="preTax"/>
              <el-option label="税后" value="afterTax"/>
            </el-select>
          </el-form-item>
          <el-form-item label="结算单价单位：" prop="unit">
            <el-select
              v-model="confirmData.unit"
              placeholder="请选择类型："
              style="width: 100%;">
              <el-option label="页" value="page"/>
              <el-option label="字" value="character"/>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="结算单价：" prop="price" class="input-with-prepend">
                <el-input placeholder="请输入金额" v-model="confirmData.price">
                  <template slot="prepend">￥</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单价对应" v-if="confirmData.unit">
                <el-input-number
                  v-model="confirmData.unitNum"
                  :min="1"
                  label="单价对应"/>
                <span style="margin-left: 5px">{{showUnit(confirmData.unit)}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="结算数量：">
            <el-input-number
              v-model="confirmData.num"
              :min="1"
              label="字数/页数"/>
          </el-form-item>
          <el-form-item label="结算金额：">
            <span
              class="payment-num">{{(confirmData.num / confirmData.unitNum * confirmData.price) | currency('￥')}}</span>
          </el-form-item>
          <el-form-item label="评价外包：">
            <div style="padding: 5px;font-size: 25px">
              <el-rate
                v-model="confirmData.evaluation"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                show-text>
              </el-rate>
            </div>
          </el-form-item>
        </div>
        <div v-else-if="confirmStatus === 3">
          <el-col :span="12">
            <el-form-item label="结算单价：">
              <span>{{showExpectTax(confirmData)}} | {{confirmData.unitNum}}{{showUnit(confirmData.unit)}} | {{confirmData.price | currency('￥') }}</span>
            </el-form-item>
            <el-form-item label="结算总金额：">
              <span
                class="payment-num">{{(confirmData.num / confirmData.unitNum * confirmData.price) | currency('￥') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算数量：">
              <span>{{confirmData.num}} {{showExpectUnit(confirmData)}}</span>
            </el-form-item>
            <el-form-item label="评价外包：">
              <div
                v-if="confirmData.evaluation !== 0"
                style="padding: 5px;font-size: 25px">
                <el-rate
                  v-model="confirmData.evaluation"
                  disabled
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  show-text>
                </el-rate>
              </div>
              <span v-else>
                未评价
              </span>
            </el-form-item>
          </el-col>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeConfirmOrder()">取 消</el-button>
        <el-button type="primary"
                   @click="editOrderStatus('confirmData', confirmData, confirmStatus)">{{confirmBtn}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from '../../axios'
  import CustomerPopover from '../popover/CustomerPopover'
  import ContactPopover from '../popover/ContactPopover'
  import SumPricePopover from '../popover/SumPricePopover'
  import {currency} from "../../util/currency";

  export default {
    props: ['orderListType'],
    data() {
      return {
        page: 1,
        pageSize: 25,
        totalCount: 0,
        customerDetail: '',
        search: {
          date: [],
          title: '',
          createUser: 'all',
          company: 'all',
          status: -1,
          customer: 'all',
          contact: 'all'
        },
        orders: [],
        showOrders: [],
        loading: true,
        confirmTitle: '',
        confirmShow: false,
        confirmStatus: 0,
        confirmBtn: '',
        confirmData: {'expect': {}},
        rules: {
          price: [
            {required: true, message: '单价不能为空', trigger: 'blur'},
          ],
          tax: [
            {required: true, message: '单价类型不能为空', trigger: 'blur'},
          ],
          unit: [
            {required: true, message: '单价单位类型不能为空', trigger: 'blur'},
          ],
        },
        classes: '',
        customers: '',
        contacts: '',
        companies: '',
      }
    },
    components: {
      CustomerPopover,
      ContactPopover,
      SumPricePopover
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
            expectPay += item.expect.num / item.expect.unitNum * item.expect.price;
            expectNum += 1;
          } else if (item.status === 2) {
            needPay += item.num / item.unitNum * item.price;
            needNum += 1
          } else if (item.status === 3) {
            hadPay += item.num / item.unitNum * item.price;
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
      this.initOptionData();
      this.init();
    },
    methods: {
      initOptionData() {
        if (this.orderListType === 'company') {
          this.search.company = this.$store.state.userObj.company
        }
        axios.post('/api/orderInitData').then((response) => {
            let res = response.data;
            if (res.code === 1) {
              this.classes = res.result.classes;
              this.customers = res.result.customers;
              this.contacts = res.result.contacts;
              this.companies = res.result.companies;
            }
          }
        )
      },
      init() {
        this.loading = true;
        // console.log('user: ' + this.$store.state.userObj);
        axios.post('/api/orderList', {
          orderListType: this.orderListType,
          search: this.search,
        }).then((response) => {
          let res = response.data;
          if (res.code === 1) {
            this.orders = res.result.orders;
            this.search.date = res.result.searchDate;
            this.totalCount = res.result.totalCount;
          }
          this.orders.forEach(item => {
            item.showPrice = currency(item.price, '￥')
          });
          this.computedShowOrders();
          this.loading = false;
        })
      },
      getEditPms(order) {
        let user = this.$store.state.userObj;
        if (this.$store.state.userPms.editAllOrder === 1) {
          return true
          // } else if (this.$store.state.userPms.editDptOrder === 1 && order.department === user.department) {
        } else if (this.$store.state.userPms.editCompanyOrder === 1 && order.company === user.company) {
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
              opsUserId: this.$store.state.userObj.userId,
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
          this.$confirm('没有权限，请联系管理员!', '提示', {
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
      confirmOrder(order, status) {

        if (this.getEditPms(order)) {
          this.confirmStatus = status;
          if (status === 1) {
            this.confirmTitle = '请确认重新制作的订单信息';
            this.confirmBtn = '确认重做';
            this.confirmData = order;
            this.confirmShow = true
          } else if (status === 2) {
            this.confirmTitle = '请确认订单制作完成并申请付款';
            this.confirmBtn = '申请付款';
            this.confirmData = order;
            this.confirmShow = true
          } else if (status === 3) {
            if (this.$store.state.userPms.summaryOrder !== 1) {
              this.$confirm('没有权限，请联系管理员!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
                center: true
              }).catch(() => {
              });
            } else {
              this.confirmTitle = '请确认订单并完成支付';
              this.confirmBtn = '确认付款';
              this.confirmData = order;
              this.confirmShow = true
            }
          }
        } else {
          this.$confirm('没有权限，请联系管理员!', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
          }).catch(() => {
          });
        }
      },
      closeConfirmOrder() {
        this.confirmStatus = 0;
        this.confirmData = {'expect': {}};
        this.confirmShow = false
      },
      editOrderStatus(formName, order, status) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let setParams = {
              opsUserId: this.$store.state.userObj.userId,
              status: status,
              title: order.title,
              orderId: order.orderId,
              userId: order.userId,
              createUser: order.createUser,
              price: order.price,
              tax: order.tax,
              unit: order.unit,
              num: order.num,
              unitNum: order.unitNum,
              sumPrice: order.num / order.unitNum * order.price,
              evaluation: order.evaluation,
              desc: order.desc
            };

            // 订单用户修改订单其他信息
            if (status === 1 && this.$store.state.userPms.editOrderMoreParam === 1) {
              setParams.title = order.title;
              setParams.className = order.className;
              // setParams.department = order.department;
              setParams.company = order.company;
              setParams.customerName = order.customerName;
              setParams.contactName = order.contactName;
              setParams.desc = order.desc;
              setParams.isCanEdit = this.$store.state.userPms.editOrderMoreParam
            }

            axios.post('/api/editOrderStatus', setParams).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$notify({
                  title: '操作成功',
                  message: res.msg,
                  type: 'success'
                });
                // this.init();
                order.status = status;
                if (status === 1) {
                  order.expect.tax = order.tax;
                  order.expect.price = order.price;
                  order.expect.num = order.num;
                  order.expect.unit = order.unit;
                  order.expect.unitNum = order.unitNum;
                  order.evaluation = 0;
                } else if (status === 2) {
                  order.completeTime = res.result.opsTime;
                } else if (status === 3) {
                  order.paymentTime = res.result.opsTime;
                }
                this.confirmShow = false;
              } else {
                this.$notify.error({
                  title: '操作失败',
                  message: res.msg
                });
              }
            });
            this.$refs[formName].clearValidate();
          } else {
            return false
          }
        })
      },
      showExpectTax(order) {
        if (order.tax === 'preTax') {
          return '税前'
        } else if (order.tax === 'afterTax') {
          return '税后'
        }
      },
      showExpectUnit(order) {
        if (order.unit === 'page') {
          return '页'
        } else if (order.unit === 'character') {
          return '字'
        }
      },
      showUnit(unit) {
        if (unit === 'page') {
          return '页'
        } else if (unit === 'character') {
          return '字'
        }
      },
      pageChange(page) {
        this.page = page;
        this.computedShowOrders()
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.computedShowOrders()
      },
      computedShowOrders() {
        let skip = (this.page - 1) * this.pageSize;
        if ((skip + this.pageSize) < this.totalCount) {
          this.showOrders = this.orders.slice(skip, skip + this.pageSize)
        } else {
          this.showOrders = this.orders.slice(skip, this.totalCount)
        }
      }
    }
  }
</script>

<template>
  <div>
    <el-popover
      ref="popover"
      placement="left"
      :title="'价格信息'"
      width="300"
      trigger="hover">
      <div>
        <div class="my-popover-div">
          <span>
            单价：{{showExpectTax(order)}} | {{order.unitNum}}{{showUnit(order.unit)}} | {{order.price | currency('￥') }}
          </span>
        </div>
        <div class="my-popover-div">
          <span>
            数量：{{order.num}} {{showExpectUnit(order)}}
          </span>
        </div>
      </div>
    </el-popover>
    <span
      v-popover:popover
      class="my-popover-span">
      {{(order.num / order.unitNum * order.price) | currency('￥')}}
    </span>
  </div>
</template>

<script>
  export default {
    props: ['order'],
    data() {
      return {}
    },
    methods: {
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
    }
  }
</script>

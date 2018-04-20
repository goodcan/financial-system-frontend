<template>
  <div>
    <h3 class="my-title-h3">常用外包人员 - TOP10</h3>
    <div v-if="!hasData" align="center">
      {{msg}}
    </div>
    <div v-if="hasData">
      <div id="container" style="height: 550px"></div>
    </div>
  </div>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {
        hasData: true,
        msg: ''
      }
    },
    computed: {
      userType() {
        return this.$route.params.userType
      }
    },
    watch: {
      userType(newData, oldData) {
        this.init()
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.hasData = true;
        axios.post('/api/contactUseTop10', {
          userType: this.$route.params.userType
        }).then(response => {
          let res = response.data;
          let contacts = null;
          let option = null;
          if (res.code === 1) {
            let echarts = require('echarts');
            let dom = document.getElementById("container");
            let myChart = echarts.init(dom);
            myChart.showLoading({
              text: '',
              color: '#409EFF'
            });
            let contactNameList = [];
            let useNumList = [];
            let seriesData = [];
            contacts = res.result;
            contacts.forEach(item => {
              contactNameList.push(item._id);
              useNumList.push(parseInt(item.num));
              seriesData.push({value: parseInt(item.num)})
            });
            option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'none'
                },
                formatter: function (params) {
                  return params[0].name + ': ' + params[0].value + '单';
                }
              },
              xAxis: {
                data: contactNameList,
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                  textStyle: {
                    color: '#409EFF',
                    // fontSize: 16
                  }
                }
              },
              yAxis: {
                splitLine: {show: false},
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {show: false}
              },
              color: ['#e54035'],
              series: [{
                name: 'hill',
                type: 'pictorialBar',
                barCategoryGap: '-130%',
                // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                itemStyle: {
                  normal: {
                    opacity: 0.5
                  },
                  emphasis: {
                    opacity: 1
                  }
                },
                data: useNumList,
                z: 10
              },
                // {
                //   name: 'glyph',
                //   type: 'pictorialBar',
                //   barGap: '-100%',
                //   symbolPosition: 'end',
                //   symbolSize: 10,
                //   symbolOffset: [0, '-120%'],
                //   data: seriesData
                // }
              ]
            };
            // console.log(option);
            if (option && typeof option === "object") {
              // console.log(true);
              myChart.hideLoading();
              myChart.setOption(option, true);
            }
          } else {
            this.hasData = false;
            this.msg = res.msg;
          }
        });
      }
    }
  }
</script>


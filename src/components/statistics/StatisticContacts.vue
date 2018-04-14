<template>
  <div>
    <h3 class="my-title-h3">常用外包人员 - TOP10</h3>
    <div id="container" style="height: 450px"></div>
  </div>
</template>

<script>
  import axios from '../../axios'

  export default {
    data() {
      return {}
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let echarts = require('echarts');
        let dom = document.getElementById("container");
        let myChart = echarts.init(dom);
        myChart.showLoading({
          text: '',
          color: '#409EFF'
        });
        axios.post('/api/contactUseTop10').then(response => {
          let contactNameList = [];
          let useNumList = [];
          let seriesData = [];
          let contacts = null;
          let option = null;
          let res = response.data;
          if (res.code === 1) {
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

          }
        });
      }
    }
  }
</script>

<style scoped>

</style>

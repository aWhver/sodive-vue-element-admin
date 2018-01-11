<template>
  <div class="user-chart"></div>
</template>
<script>
  import echarts from 'echarts'
  import 'echarts/theme/macarons'
  export default {
    name: 'newuserChart',
    data () {
      return {
        chart: null,
        newData: [0, 20, 56, 100, 70, 105, 154, 190, 220, 163, 180],
        oldData: [0, 30, 70, 80, 100, 150, 120, 160, 180, 150, 170],
        autoResize: true
      }
    },
    mounted () {
      this.initChart()
      if (this.autoResize) {
        this.resizeHandle = () => {
          if (this.chart) this.chart.resize()
        }
        window.addEventListener('resize', this.resizeHandle)
      }
      const sidebarElm = document.getElementsByClassName('scrollBar-wrapper')[0]
      sidebarElm.addEventListener('transitionend', this.resizeHandle)
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.resizeHanlder)
      }
      const sidebarElm = document.getElementsByClassName('scrollBar-wrapper')[0]
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    watch: {
      data: {
        deep: true,
        handler (val) {
          this.setOptions(val)
        }
      }
    },
    methods: {
      setOptions (data1, data2) {
        this.chart.setOption({
          xAxis: {
            data: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['新增用户', '上月新增用户']
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          series: [
            {
              name: '新增用户',
              data: data1,
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#1c6eff',
                  lineStyle: {
                    color: '#1c6eff',
                    width: 2
                  }
                }
              },
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: '上月新增用户',
              data: data2,
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#ff5df9',
                  lineStyle: {
                    color: '#ff5df9',
                    width: 2
                  }
                }
              },
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            }
          ]
        })
      },
      initChart () {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.newData, this.oldData)
      }
    }
  }
</script>
<style lang="less" scoped>
  .user-chart {
    width: 100%;
    height: 400px;
  }
</style>

<template>
  <div>
    <div class="tabs">
      <div class="tab" :class="{'active': currentTab === 'statistics'}" @click="toggleTab('statistics')">用户分享统计</div>
      <div class="tab" :class="{'active': currentTab === 'detail'}" @click="toggleTab('detail')">用户分享详情</div>
    </div>
    <div>
      <keep-alive>
        <component :is="currentTab"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import statistics from './children/statistics'
  import detail from './children/detail'
  export default {
    name: 'shareStatistics',
    data () {
      return {
        currentTab: 'statistics'
      }
    },
    methods: {
      toggleTab (name) {
        this.currentTab = name
      }
    },
    components: { statistics, detail }
  }
</script>
<style lang="less" scoped>
  .tabs {
    height: 54px;
    .tab {
      padding: 10px 0;
      margin-right: 30px;
      display: inline-block;
      cursor: pointer;
      &.active {
        color: #1c84c6;
        border-bottom: 2px solid #1c84c6;
       }
    }
  }
</style>

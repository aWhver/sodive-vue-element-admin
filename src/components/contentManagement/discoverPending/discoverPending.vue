<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in coverPendMap" :name="item.name" :label="item.label" :key="item.type">
        <cover-pending v-if="item.name === activeName" :type="item.type"></cover-pending>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import coverPending from 'views/tab/coverPending'
  export default {
    name: 'discoverPending',
    data () {
      return {
        activeName: 'pending',
        coverPendMap: [
          {name: 'pending', label: '待审核', type: 1},
          {name: 'failed', label: '审核失败', type: 0}
        ]
      }
    },
    components: { coverPending }
  }
</script>
<style lang="less">

</style>

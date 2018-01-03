<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in taskStatusMap" :key="item.status" :label="item.label" :name="item.status">
        <keep-alive>
          <task-pend :type="item.status" v-if="activeName === item.status"></task-pend>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import taskPend from 'views/tab/taskPend'
  export default {
    name: 'taskPending',
    data () {
      return {
        activeName: 'pending',
        taskStatusMap: [
          {status: 'pending', label: '待审核'},
          {status: 'pended', label: '审核通过'},
          {status: 'failed', label: '审核失败'}
        ]
      }
    },
    components: { taskPend }
  }
</script>
<style lang="less">

</style>

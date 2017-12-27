<template>
  <div>
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="item in tabOptions" :label="item.label" :name="item.name" :key="item.type">
          <keep-alive>
            <certificate-pend v-if="item.name === activeName" :type="item.type"></certificate-pend>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script>
  import certificatePend from 'views/tab/certificatePending'
  export default {
    name: 'coachExamine',
    data () {
      return {
        activeName: 'pending',
        tabOptions: [
          {type: 0, name: 'pending', label: '待审核证件'},
          {type: 1, name: 'pended', label: '已审核证件'},
          {type: 2, name: 'failed', label: '审核失败'}
        ]
      }
    },
    components: { certificatePend }
  }
</script>

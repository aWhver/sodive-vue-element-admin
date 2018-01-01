<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :listQuery="listQuery"></certificate-filter>
    <el-main>
      <el-table :data="list"></el-table>
    </el-main>
  </div>
</template>
<script>
export default {
  name: 'logger',
  data () {
    return {
      list: null,
      total: 1,
      listQuery: {page: 1}
    }
  },
  methods: {
    acceptQuery (query) {
      this.listQuery = query.listQuery
    }
  }
}
</script>
<style lang="less">

</style>

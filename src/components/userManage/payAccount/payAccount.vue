<template>
  <div>
    <certificate-filter></certificate-filter>
  </div>
</template>
<script>
  import { getPayAccountList } from 'api/userManage'
  import certificateFilter from 'views/multiplicationFilter/certificateFilter'
  export default {
    name: 'payAccount',
    data () {
      return {
        total: 1,
        listQuery: {page: 1, payType: undefined}
      }
    },
    methods: {
      GetPayAccountList () {
        getPayAccountList(this.listQuery).then(response => {
          console.log(response)
        })
      }
    },
    components: { certificateFilter }
  }
</script>
<style lang="less">

</style>

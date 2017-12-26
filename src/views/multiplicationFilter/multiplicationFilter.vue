<template>
  <el-header>
    <div class="filter-container">
      <div class="filter-item">
        <el-input style="width: 100px" v-model="listQuery.userId" placeholder="ID" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-input style="width: 100px" v-model="listQuery.nickName" placeholder="昵称" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-input style="width: 150px" v-model="listQuery.phoneNo" placeholder="手机" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-input style="width: 200px" v-model="listQuery.email" placeholder="邮箱" clearable></el-input>
      </div>
      <div class="filter-item filter-select">
        <el-select style="width: 120px" v-model="listQuery.countryName" placeholder="国籍" clearable>
          <el-option v-for="country in countryMap" :key="country.key" :value="country.key" :label="country.name"></el-option>
        </el-select>
      </div>
      <div class="filter-item filter-select">
        <el-select style="width: 135px" v-model="listQuery.sortId" placeholder="排序" @change="searchBtn()">
          <el-option v-for="item in sortOptions" :key="item.key" :value="item.key" :label="item.label"></el-option>
        </el-select>
      </div>
      <slot></slot>
      <!--<div class="filter-item">
        <el-button type="primary" icon="el-icon-search" @click="searchBtn()">搜索</el-button>
      </div>
      <div class="filter-item">
        <el-button type="primary" icon="el-icon-edit" @click="agentVisible = true">新增合伙人</el-button>
      </div>-->
    </div>
  </el-header>
</template>
<script>
  export default {
    name: 'multiplicationFilter',
    data () {
      return {
        listQuery: {
          page: 1,
          limit: 10,
          userId: null,
          nickName: null,
          phoneNo: null,
          email: null,
          countryName: null,
          sortId: '+id'
        },
        sortOptions: [{ label: '按ID升序排列', key: '+id' }, { label: '按ID降序排列', key: '-id' }],
        countryMap: [
          {key: 'cn', name: '中国'},
          {key: 'us', name: '美国'},
          {key: 'nsl', name: '新西兰'}
        ]
      }
    },
    props: {
      searchBtn: {
        type: Function,
        required: true
      }
    },
    methods: {
      queryToParent () {
        let _this = this
        this.$emit('sendListQuery', {
          listQuery: _this.listQuery,
          countryMap: _this.countryMap
        })
      }
    },
    mounted () { this.queryToParent() }
  }
</script>

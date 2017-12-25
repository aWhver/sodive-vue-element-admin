<template>
  <div>
    <el-container>
      <el-header>
        <div class="filter-container">
          <div class="filter-item">
            <el-input style="width: 100px" v-model="listQuery.agentId" placeholder="ID" clearable></el-input>
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
            <el-select style="width: 120px" v-model="listQuery.countryName" placeholder="国籍">
              <el-option v-for="country in countryMap" :key="country.key" :value="country.key" :label="country.name"></el-option>
            </el-select>
          </div>
          <div class="filter-item filter-select">
            <el-select style="width: 135px" v-model="listQuery.sortId" placeholder="排序" @change="searchBtn()">
              <el-option v-for="item in sortOptions" :key="item.key" :value="item.key" :label="item.label"></el-option>
            </el-select>
          </div>
          <div class="filter-item">
            <el-button type="primary" icon="el-icon-search" @click="searchBtn()">搜索</el-button>
          </div>
          <div class="filter-item">
            <el-button type="primary" icon="el-icon-edit" @click="agentVisible = true">新增合伙人</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-table :data="list" style="width:100%" border v-loading="loading" element-loading-text="小主,我需要时间...">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="expand-table">
                <el-form-item label="性别">
                  <span>{{ props.row.sex }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="手机">
                  <span>{{ props.row.phoneNo }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="id" width="90px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.agentId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="昵称" width="150px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.nickName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="积分" width="80px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.point }}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" min-width="120px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.registerTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="国籍" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.countryName | countryFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下属教练" width="90px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.ownCoach }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="70px" align="center">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status === 0">
                正常
              </el-tag>
              <el-tag type="danger" v-if="scope.row.status === 1">
                注销
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="modifyData(scope.row)">修改</el-button>
              <el-button type="info" :disabled="scope.row.status === 1" @click="logOff(scope.row)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[10, 15, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
        </el-pagination>
      </el-footer>
    </el-container>
    <!-- 新增合伙人弹窗 -->
    <el-dialog title="新增合伙人" :visible.sync='agentVisible' width="350px">
      <div class="input-item">
        <el-input v-model="listQuery.agentId" placeholder="输入合伙人ID"></el-input>
      </div>
      <div class="input-item">
        <!--<el-input v-model="listQuery.countryName" placeholder="国籍"></el-input>-->
        <el-select v-model="listQuery.countryName">
          <el-option v-for="country in countryMap" :key="country.key" :value="country.key" :label="country.name"></el-option>
        </el-select>
      </div>
      <div class="input-item">
        <el-input v-model="listQuery.email" placeholder="输入合伙人邮箱地址"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="agentVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddAgent()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 合伙人国际修改弹窗 -->
    <el-dialog title="修改合伙人国籍信息" :visible.sync="modifyVisible" width="350px">
      <div class="input-item">
        <el-select v-model="ModifyData.countryName">
          <el-option v-for="country in countryMap" :key="country.key" :value="country.key" :label="country.name"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureModify()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 合伙人国际修改弹窗 -->
    <el-dialog title="注销合伙人" :visible.sync="cancelVisible" width="350px">
      <div class="input-item" style="text-align: center;">
        <h3>确定要注销合伙人(ID: A45454)?</h3>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureLogOff()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getAgentList, addAgent } from 'api/userManage/agent'
  const countryMap = [
    {key: 'cn', name: '中国'},
    {key: 'us', name: '美国'},
    {key: 'nsl', name: '新西兰'}
  ]

  // array to obj
  const countryObj = countryMap.reduce((obj, item) => {
    obj[item.key] = item.name
    return obj
  }, {})

  export default {
    name: 'agent',
    data () {
      return {
        list: null,
        total: null,
        loading: true,
        agentVisible: false,
        modifyVisible: false,
        cancelVisible: false,
        listQuery: {
          page: 1,
          limit: 10,
          agentId: null,
          nickName: null,
          phoneNo: null,
          email: null,
          countryName: null,
          sortId: '+id'
        },
        ModifyData: {
          id: '',
          agentId: '',
          nickName: '',
          point: 0,
          registerTime: '',
          ownCoach: 0,
          email: '',
          sex: '',
          phoneNo: '',
          countryName: '',
          status: 0
        },
        countryMap: countryMap,
        sortOptions: [{ label: '按ID升序排列', key: '+id' }, { label: '按ID降序排列', key: '-id' }]
      }
    },
    mounted () {
      this.GetAgentList()
    },
    methods: {
      GetAgentList () {
        this.loading = true
        getAgentList(this.listQuery).then(response => {
          this.list = response.data.agentList
          this.total = response.data.total
          this.loading = false
        })
      },
      searchBtn () {
        this.listQuery.page = 1
        this.GetAgentList()
      },
      AddAgent () {
        this.loading = true
        addAgent(this.listQuery.agentId, this.listQuery.countryName, this.listQuery.email).then(response => {
          this.list.unshift(response.data.newArticle)
          this.total = response.data.total
          this.loading = false
          this.agentVisible = false
          this.$notify({
            type: response.data.info,
            title: '成功',
            message: '添加合伙人成功',
            duration: 2000
          })
        })
      },
      modifyData (row) {
        this.ModifyData = Object.assign({}, row)
        this.modifyVisible = true
        const toModify = countryMap.filter(item => item.key === row.countryName)
        this.ModifyData.countryName = toModify[0]['key']
      },
      sureModify () {
        for (const i of this.list) {
          if (i.id === this.ModifyData.id) {
            const index = this.list.indexOf(i)
            this.list.splice(index, 1, this.ModifyData)
            break
          }
        }
        this.modifyVisible = false
        this.$notify({
          type: 'success',
          title: '成功',
          message: '修改国籍成功',
          duration: 2000
        })
      },
      logOff (row) {
        this.ModifyData = Object.assign({}, row)
        this.cancelVisible = true
      },
      sureLogOff () {
        for (const i of this.list) {
          if (i.agentId === this.ModifyData.agentId) {
            const index = this.list.indexOf(i)
            this.list[index].status = 1
            break
          }
        }
        this.cancelVisible = false
        this.$notify({
          type: 'success',
          title: '成功',
          message: '注销成功',
          duration: 2000
        })
      },
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.GetAgentList()
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.GetAgentList()
      }
    },
    filters: {
      countryFilter (val) {
        return countryObj[val]
      }
    }
  }
</script>
<style lang="less">
  .expand-table {
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
  .el-dialog {
    .input-item {margin: 15px 0;}
    &__footer {text-align: center;}
  }
</style>

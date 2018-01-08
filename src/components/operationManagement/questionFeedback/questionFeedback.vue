<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetQuestionList"></certificate-filter>
    <el-main>
      <el-table :data="list" border v-loading="loading" element-loading-text="小主,我需要时间..." style="text-align: center">
        <el-table-column label="用户问题" align="left" min-width="200px" style="word-break: keep-all">
          <template slot-scope="scope">
            <el-button type="text" @click.native="answerQuestion(scope.row)">{{ scope.row.question.content }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="提问人ID" prop="userId" width="120px"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="昵称" prop="nickName" width="120px"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="190px"></el-table-column>
        <el-table-column label="答复时间" width="190px">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">{{ scope.row.answerTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetQuestionList"></pagination>
    </el-footer>
    <!-- 查看问题内容弹窗 -->
    <el-dialog title="问题内容" :visible.sync="visible" align="center" class="question-container" center>
      <div class="question-content">
        <p><span>提问内容:&nbsp;&nbsp;&nbsp;</span>{{ questionContent.content }}(图片点击大图浏览)</p>
        <div class="question-picture">
          <div v-for="(item, index) in questionContent.questionImage" :key="index" ref="pictureItem"><img :src="item" @click="photoSwipe"></div>
        </div>
        <div class="user-profile">
          <span>提问人ID:&nbsp;&nbsp;&nbsp;{{questionContent.userId}}</span>
          <span>昵称:&nbsp;&nbsp;&nbsp;{{questionContent.nickName}}</span>
          <span>邮箱:&nbsp;&nbsp;&nbsp;{{questionContent.email}}</span>
        </div>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-input v-model="questionContent.answerContent" type="textarea" placeholder="请输入回复内容" class="fl"></el-input>
        <div class="fl">
          <el-button type="primary" @click="reply">确定</el-button>
          <el-button @click=" visible = false ">取消</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 大图浏览 -->
    <div class="photoSwipe">
      <div class="photoSwipe-container">
        <div class="picture-container">
          <div ref="pictureItem1" v-for="(item, index) in questionContent.questionImage" :key="index" :class="{'active': currentIndex === index}"><img :src="item"></div>
        </div>
        <div class="control">
          <span class="left-btn btn" @click="prev"><svg-icon :iconClass="'arrowleftcircle'"></svg-icon></span>
          <span class="right-btn btn" @click="next"><svg-icon :iconClass="'arrowrightcircle'"></svg-icon></span>
        </div>
      </div>
      <span class="close" @click="closePhotoSwipe"><svg-icon :iconClass="'close'"></svg-icon></span>
    </div>
  </div>
</template>
<script>
  import { getQuestionList } from 'api/operationManage'
  import { formatTime } from 'utils/index'
  export default {
    name: 'questionFeedback',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1},
        visible: false,
        loading: true,
        questionContent: {
          id: '',
          content: '',
          questionImage: ['http://img.sodive.com/newupload/20171220/1513736922599.jpg'], // 为了点击首次弹出出来可以计算图片size给的默认图片,与下面的this.visible = true 的作用相配合
          userId: '',
          nickName: '',
          email: '',
          answerContent: ''
        },
        index: 0 // 图片索引
      }
    },
    created () {
      this.GetQuestionList()
      this.calculatePictureSize('pictureItem')
    },
    watch: {
      visible (value) {
        if (value) {
          this.calculatePictureSize('pictureItem')
        } else {
          const oPhotoSwipe = document.getElementsByClassName('photoSwipe')[0]
          oPhotoSwipe.style.display = 'none'
        }
      }
    },
    methods: {
      GetQuestionList () {
        this.loading = true
        this.visible = true // el-dialog首次进入不会渲染body部分,点击第一次弹窗的时候图片无法缩小,所以在加载列表的时候先显示一次,加载完在关掉，进入该路由会有闪的画面,待优化
        getQuestionList(this.listQuery).then(response => {
          this.list = response.data.questionList
          this.total = response.data.total
          this.loading = false
          this.visible = false
        })
      },
      answerQuestion (row) {
        this.visible = true
        this.questionContent.id = row.id
        this.questionContent.content = row.question.content
        this.questionContent.questionImage = row.question.images
        this.questionContent.userId = row.userId
        this.questionContent.nickName = row.nickName
        this.questionContent.email = row.email
        this.questionContent.answerContent = row.status === 1 ? row.answerContent : ''
      },
      reply () {
        if (!this.questionContent.answerContent) {
          this.$message.warning('请输入答复内容!')
          return
        }
        for (let item of this.list) {
          if (item.id === this.questionContent.id) {
            item.status = 1
            item.answerContent = this.questionContent.answerContent
            item.answerTime = formatTime()
            this.visible = false
            this.$message.success('您已答复该用户!')
          }
        }
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
      },
      calculatePictureSize (ref) {
        const pictureItems = this.$refs[ref]
        let oImg
        this.$nextTick(() => {
          if (pictureItems !== undefined) {
            const pictureItemWidth = pictureItems[0].offsetWidth // 图片父级width
            for (let pictureItem of pictureItems) {
              oImg = pictureItem.querySelector('img')
              let pictureWidth = pictureItem.querySelector('img').offsetWidth
              let pictureHeight = pictureItem.querySelector('img').offsetHeight
              if (pictureWidth >= pictureHeight) {
                oImg.style.height = pictureItemWidth * pictureHeight / pictureWidth + 'px'
                oImg.style.width = pictureItemWidth + 'px'
                oImg.style.marginTop = -(pictureItemWidth * pictureHeight / pictureWidth) / 2 + 'px'
                oImg.style.marginLeft = -pictureItemWidth / 2 + 'px'
              } else {
                oImg.style.width = pictureItemWidth * pictureWidth / pictureHeight + 'px'
                oImg.style.height = pictureItemWidth + 'px'
                oImg.style.marginTop = -pictureItemWidth / 2 + 'px'
                oImg.style.marginLeft = -(pictureItemWidth * pictureWidth / pictureHeight) / 2 + 'px'
              }
            }
          }
        })
      },
      photoSwipe (e) {
        const oPhotoSwipe = document.getElementsByClassName('photoSwipe')[0]
        oPhotoSwipe.style.display = 'block'
        this.calculatePictureSize('pictureItem1')
        this.changePicture(e)
      },
      changePicture (e) {
        for (let image of this.questionContent.questionImage) {
          if (image === e.target.currentSrc) {
            this.index = this.questionContent.questionImage.indexOf(image)
          }
        }
      },
      prev () {
        this.index--
        if (this.index < 0) {
          this.$message.info('已经是第一张了，别再翻了!')
          this.index = 0
        }
      },
      next () {
        this.index++
        if (this.index > this.questionContent.questionImage.length - 1) {
          this.$message.info('已经是最后一张了，到头了!')
          this.index = this.questionContent.questionImage.length - 1
        }
      },
      closePhotoSwipe () {
        const oPhotoSwipe = document.getElementsByClassName('photoSwipe')[0]
        oPhotoSwipe.style.display = 'none'
      }
    },
    computed: {
      currentIndex () {
        return this.index
      }
    },
    filters: {
      statusFilter (status) {
        const statusMap = ['未答复', '已答复']
        return statusMap[status]
      }
    }
  }
</script>
<style lang="less">
.question-container {
  .el-dialog__body {
    .user-profile span { margin: 0 15px 0 0; }
    .question-picture div {
      width: 100px;
      height: 100px;
      margin: 0 10px;
      display: inline-block;
      position: relative;
      box-shadow: 0 0 1px 1px #409EFF;
      border-radius: 4px;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
      }
    }
  }
  .el-dialog__footer {
    overflow: hidden;
    .el-textarea {
      width: 85% !important;
      textarea {height: 100px; resize: none}
    }
    .fl {
      width: 15%;
      .el-button {margin: 5px 0;}
    }
  }
}
  .photoSwipe {
    display: none;
    position: fixed;
    width: 800px;
    z-index: 99999;
    top: 15vh;
    left: 50%;
    margin-left: -400px;
    background: #000;
    &-container {
      width: 400px;
      height: 400px;
      margin: 20px auto;
      position: relative;
      .picture-container div {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        transition: opacity 0.4s linear;
        &.active {opacity: 1;}
        img {
          position: absolute;
          top: 50%;
          left: 50%;
        }
      }
      .btn {
        position: absolute;
        width: 50px;
        height: 80px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        text-align: center;
        line-height: 80px;
        &.left-btn {left: -60px;}
        &.right-btn {right: -60px;}
      }
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
    .svg-icon {width: 2.5em; height: 2.5em;margin-right: 0;}
  }
</style>

<template>
  <div class="photoSwipe">
    <div class="photoSwipe-container">
      <div class="picture-container">
        <div ref="pictureItem1" v-for="(item, index) in imageList" :key="index" :class="{'active': currentIndex === index}"><img :src="item"></div>
      </div>
      <div class="control">
        <span class="left-btn btn" @click="prev"><svg-icon :iconClass="'arrowleftcircle'"></svg-icon></span>
        <span class="right-btn btn" @click="next"><svg-icon :iconClass="'arrowrightcircle'"></svg-icon></span>
      </div>
    </div>
    <span class="close" @click="closePhotoSwipe"><svg-icon :iconClass="'close'"></svg-icon></span>
  </div>
</template>
<script>
  export default {
    name: 'photoSwipe',
    data () {
      return {
        index: 0
      }
    },
    props: {
      imageList: {
        type: Array
      }
    },
    created () { this.calculatePictureSize('pictureItem1') },
    watch: {
      imageList (value) {
        const oPhotoSwipe = document.getElementsByClassName('photoSwipe')[0]
        if (value.length !== 0) {
          oPhotoSwipe.style.display = 'block'
          this.calculatePictureSize('pictureItem1')
        } else {
          this.imageList = []
          this.index = 0
          oPhotoSwipe.style.display = 'none'
        }
      }
    },
    methods: {
      calculatePictureSize (ref) {
        const pictureItems = this.$refs[ref]
        let oImg
        this.$nextTick(() => {
          if (pictureItems !== undefined) {
            const pictureItemWidth = pictureItems[0].offsetWidth // 图片父级width
            for (let pictureItem of pictureItems) {
              oImg = pictureItem.querySelector('img')
              let pictureWidth = oImg.offsetWidth
              let pictureHeight = oImg.offsetHeight
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
      prev () {
        this.index--
        if (this.index < 0) {
          this.$message.info('已经是第一张了，别再翻了!')
          this.index = 0
        }
      },
      next () {
        this.index++
        if (this.index > this.imageList.length - 1) {
          this.$message.info('已经是最后一张了，到头了!')
          this.index = this.imageList.length - 1
        }
      },
      closePhotoSwipe () {
        const oPhotoSwipe = document.getElementsByClassName('photoSwipe')[0]
        oPhotoSwipe.style.display = 'none'
        this.index = 0
      }
    },
    computed: {
      currentIndex () {
        return this.index
      }
    }
  }
</script>

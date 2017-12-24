<template>
  <div class="tag-views-container">
    <scrollPane ref="scrollPane">
      <router-link v-for="route in Array.from(visitedTags)" :class="isActive(route)? 'active' : ''" ref="tag" v-if="visitedTags.length !== 0" :to="route.path" :key="route.path" @contextmenu.prevent.native="openMenu(route, $event)">
        <el-tag :disable-transitions="false" closable @close.prevent.stop="closeTag(route)">{{route.title}}</el-tag>
      </router-link>
    </scrollPane>
    <ul class="contextMenu" v-show="visible" :style="{left: `${left}px`, top: `${top}px`}">
      <li @click="closeTag(selectedTag)">closeTag</li>
      <li @click="closeOtherTag()">closeOtherTag</li>
      <li @click="closeAllTag">closeAllTag</li>
    </ul>
  </div>
</template>
<script>
  import scrollPane from 'views/scrollPane/scrollPane'
  export default {
    data () {
      return {
        visible: false,
        left: '',
        top: '',
        selectedTag: {}
      }
    },
    computed: {
      visitedTags () {
        return this.$store.state.routeTag.visitedTags
      }
    },
    methods: {
      generateRoute () {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      addTags () {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.$store.dispatch('addVisibleTag', route)
      },
      isActive (route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      closeTag (route) {
        this.$store.dispatch('delVisibleTag', route).then(tags => {
          let lastTag = tags.splice(-1)[0]
          if (lastTag) {
            this.$router.push(lastTag.path)
          } else {
            this.$router.push('/')
          }
        })
      },
      closeOtherTag () {
        this.$router.push(this.selectedTag)
        this.$store.dispatch('delOtherTag', this.selectedTag)
      },
      closeAllTag () {
        this.$store.dispatch('delAllTag').then(() => {
          this.$router.push('/')
        })
      },
      openMenu (tag, e) {
        this.visible = true
        this.selectedTag = tag
        this.left = e.clientX
        this.top = e.clientY
      },
      closeMenu () {
        this.visible = false
      },
      moveToCurrentTag () {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          if (tags) {
            for (const tag of tags) {
              if (tag.to === this.$route.path) {
                this.$refs.scrollPane.moveToTarget(tag.$el)
                break
              }
            }
          }
        })
      }
    },
    mounted () {
      this.addTags()
      this.moveToCurrentTag()
    },
    watch: {
      $route () {
        this.addTags()
        this.moveToCurrentTag()
      },
      visible (value) {
        if (value) {
          window.addEventListener('click', this.closeMenu)
        } else {
          window.removeEventListener('click', this.closeMenu)
        }
      }
    },
    components: { scrollPane }
  }
</script>
<style lang="less">
.tag-views-container{
  .scroll-wrapper {height: 35px;}
  a{
    margin: 0 5px;
    &.active .el-tag{
      background: #e1ff5f;
    }
  }
  .contextMenu {
    position: absolute;
    z-index: 8;
    font-size: 12px;
    padding: 3px 0;
    border-radius: 4px;
    box-shadow: 2px 2px 3px rgba(0,0,0,.3);
    background: #fff;
    li {
      padding: 6px 5px;
      cursor: pointer;
      &:hover {
        background: #e7eaec;
      }
    }
  }
}
</style>

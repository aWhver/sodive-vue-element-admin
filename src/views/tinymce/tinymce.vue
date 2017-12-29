<template>
  <div class="tinymce-container">
    <textarea :id="tinymceId"></textarea>
    <div class="edit-image">
      <image-upload></image-upload>
    </div>
  </div>
</template>
<script>
  import imageUpload from 'views/imageUpload/imageUpload'
  export default {
    name: 'tinymce',
    props: {
      id: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 400
      },
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default () {
          return ['removeformat undo redo |  bullist numlist | outdent indent | strikethrough forecolor backcolor | fullscreen code', 'formatselect | bold italic blockquote | h2 p  media link | alignleft aligncenter alignright alignjustify']
        }
      },
      menubar: {
        default: ''
      }
    },
    data () {
      return {
        hasInit: false,
        hasChange: false,
        tinymceId: this.id || 'tinymce' + +new Date()
      }
    },
    watch: {
      value (val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
        }
      }
    },
    mounted () { this.tinymceInit() },
    methods: {
      tinymceInit () {
        // const _this = this
        window.tinymce.init({
          'selector': `#${this.tinymceId}`,
          'height': this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: this.toolbar,
          menubar: this.menubar,
          plugins: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools', // 允许启用那些功能
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
          imagetools_toolbar: 'watermark',
          default_link_target: '_blank',
          link_title: false,
          init_instance_callback: editor => { // 编辑器每次实例化时执行的函数
            if (this.value) {
              editor.setContent(this.value)
            }
            this.hasInit = true
            editor.on('NodeChange Change KeyUp', () => {
              this.hasChange = true
              this.$emit('input', editor.getContent({ format: 'raw' }))
            })
          }
        })
      }
    },
    components: { imageUpload }
  }
</script>
<style lang="less" scoped>
  .tinymce-container {
    position: relative;
    .edit-image {
      position: absolute;
      right: 16px;
      top: 16px;
    }
  }
</style>

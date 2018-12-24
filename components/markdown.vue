<!--
    Created by linfengluo@gmail.com on 2018/12/22.
-->
<template>
  <span>
    <mavon-editor
      v-model="content"
      :toolbars="toolbars"
      class="myMarkdown"
      :subfield="false"
      placeholder="请输入……"
      defaultOpen="edit">
    </mavon-editor>
  </span>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
const hasProp = (instance, prop) => {
  const $options = instance.$options || {}
  const propsData = $options.propsData || {}
  return prop in propsData
}
export default {
  props: ['value'],
  data () {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  components: {
    mavonEditor
  },
  computed: {
    content: {
      get(){
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

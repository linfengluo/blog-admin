<!--
    Created by linfengluo@gmail.com on 2018/12/10.
-->
<template>
  <section class="articles" >
    <a-form :form="form">
      <a-form-item
        label='标题'
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'title',
            {
              rules: [{ required: true, message: '请输入标题!' }],
              initialValue: article.title
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label='分类'
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select v-decorator="[
          'classify',
          {
            rules: [{ required: true, message: '请选择分类!' }],
            initialValue: article.classify
          }
        ]">
          <a-select-option v-for="item of classify"
                           :value="item._id"
                           :key="item._id"
          >{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label='标签'
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select mode="tags"
                  v-decorator="[
                    'tabs',
                    {
                      initialValue: article.tabs
                    }
                  ]"
                  @change="handleTabsChange"
        >
          <a-select-option v-for="(tab, index) of tabList"
                           :value="tab"
                           :key="index"
          >{{ tab }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='内容'
      >
        <MarkdonInput v-decorator="[
          'content',
          {
            rules: [{ required: true, message: '请输入内容!' }],
            initialValue: article.content
          }
        ]"
        />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="{
          offset: 2
        }"
      >
        <a-button @click="handleBack">返回</a-button>
        <a-button type='primary' @click="handleSubmit" class="submitBtn">提交</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MarkdonInput from '../../components/markdown.vue'
import apiConfig from '../../units/apiConfig'
import {SET_PAGE_TITLE} from '../../units/types'
const TABS_NAME = 'myTabList'

export default {
  async asyncData ({query, store}) {
    let title = '添加文章'
    let data = {
      classify: "",
      content: "",
      desc: "",
      isShow: true,
      tabs: [],
      title: "",
    }
    if (query.id) {
      data = await store.dispatch('getArticle', query.id).then(res => {return res});
      title = '编辑文章'
    }

    store.commit('SET_PAGE_TITLE', title)

    return {
      article: data,
      articleId: query.id || null
    }
  },
  data() {
    return {
      tabList: [],
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 19
      },
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },

  components: {
    MarkdonInput
  },
  mixins: [],
  created(){
    if (this.$store.state.classify.length <= 0) {
      this.$store.dispatch('getClassify')
    }

    if (window.localStorage) {
      const list = window.localStorage.getItem(TABS_NAME)
      this.tabList = list ? JSON.parse(list) : []
    }
  },
  mounted(){
  },
  watch: {},
  computed: {
    ...mapState({
      classify: state => state.classify
    }),
  },
  methods: {
    handleBack(){
      this.$router.back()
    },

    updateArticle(data){
      this.$axios({
        method: data.type,
        url: apiConfig.article,
        data: data.params
      }).then(res => {
        if (res.code < 400) {
          this.$message.success(this.articleId ? '更新成功' : '创建成功');
          this.$router.push({
            name: 'article'
          })
        } else {
          this.$message.success(res.msg ? res.msg : '提交失败');
        }
      }).catch(err => {
        this.$message.success('提交失败');
      });
    },
    handleSubmit(e){
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }
        let params = values
        if (this.articleId) {
          params.id = this.articleId
        }
        this.updateArticle({
          type: this.articleId ? 'put' : 'post',
          params: params
        })
      })
    },
    handleTabsChange(value){
      let tabs = [...this.tabList, ...value]
      this.tabList =  Array.from(new Set(tabs))

      window.localStorage.setItem(TABS_NAME, JSON.stringify(this.tabList))
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.submitBtn{
  margin-left: 12px;
}
</style>

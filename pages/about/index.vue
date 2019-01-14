<!--
    Created by linfengluo@gmail.com on 2018/12/10.
-->
<template>
  <section class="about" >
    <a-form :form="form">
      <a-form-item>
        <MarkdonInput v-decorator="[
          'content',
          {
            rules: [{ required: true, message: '请输入内容!' }],
            initialValue: about.content
          }
        ]"
        />
      </a-form-item>
      <a-form-item>
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
    let defaultData = {
      content: "",
    }
    let data = await store.dispatch('getAbout').then(res => {return res});

    store.commit('SET_PAGE_TITLE', '关于我')

    return {
      about: data || defaultData,
      aboutId: data._id || null
    }
  },
  data() {
    return {
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
  methods: {
    handleBack(){
      this.$router.back()
    },

    updateAbout(data){
      this.$axios({
        method: data.type,
        url: apiConfig.about,
        data: data.params
      }).then(res => {
        if (res.code < 400) {
          this.$message.success(this.aboutId ? '更新成功' : '创建成功');
          this.aboutId = this.aboutId ? this.aboutId : res.data._id
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
        if (this.aboutId) {
          params.id = this.aboutId
        }
        this.updateAbout({
          type: this.aboutId ? 'put' : 'post',
          params: params
        })
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.submitBtn{
  margin-left: 12px;
}
</style>

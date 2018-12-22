<!--
    Created by linfengluo@gmail.com on 2018/12/10.
-->
<template>
  <section class="articles" >
    <a-form :form="form">
      <a-form-item
        help='Should be combination of numbers & alphabets'
      >
        <price-input v-decorator="[
          'price',
          {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: checkPrice }],
          }
        ]"
        />
      </a-form-item>
    </a-form>
  </section>
</template>

<script>
  import priceInput from '../../components/markdown.vue'
  export default {
    asyncData ({query, store}) {
      let data = {
        classify: "",
        content: "",
        desc: "",
        isShow: true,
        tabs: [],
        title: "",
      }
      if (query.id) {
        store.dispatch('getArticle', query.id)
          .then(res => {
            console.log(res)
          })
      }
      return {
        article: data,
      }
    },
    data() {
      return {}
    },
    beforeCreate () {
      this.form = this.$form.createForm(this)
    },
    components: {
      priceInput
    },
    mixins: [],
    created(){
    },
    mounted(){
    },
    watch: {},
    computed: {},
    methods: {
      checkPrice  (rule, value, callback) {
        if (value.number > 0) {
          callback()
          return
        }
        callback('Price must greater than zero!')
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>

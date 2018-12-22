<!--
    Created by linfengluo@gmail.com on 2018/12/22.
-->
<template>
  <span>
     <mavon-editor
       v-model="content"
       v-if="isInit"
       class="myMarkdown"
       :subfield="false"
       defaultOpen="edit">
      </mavon-editor>
    <a-input
      type='text'
      :value="number"
      @change="handleNumberChange"
      style="width: 63%; margin-right: 2%;"
    />
    <a-select
      :value="currency"
      style="width: 32%"
      @change="handleCurrencyChange"
    >
      <a-select-option value='rmb'>RMB</a-select-option>
      <a-select-option value='dollar'>Dollar</a-select-option>
    </a-select>
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
    const value = this.value || {}
    return {
      content: value.content || 0,
      currency: value.currency || 'rmb',
    }
  },
  components: {
    mavonEditor
  },
  watch: {
    value (val = {}) {
      this.content = val.content || ''
    },
  },
  methods: {
    handleContentChange (e) {
      const content = parseInt(e.target.value || 0, 10)
      if (isNaN(content)) {
        return
      }
      if (!hasProp(this, 'value')) {
        this.content = content
      }
      this.triggerChange({ content })
    },
    handleCurrencyChange(currency) {
      if (!hasProp(this, 'value')) {
        this.currency = currency
      }
      this.triggerChange({ currency })
    },
    triggerChange  (changedValue) {
      this.$emit('change', Object.assign({}, this.$data, changedValue))
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

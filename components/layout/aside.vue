<!--
    Created by linfengluo@gmail.com on 2018/12/10.
-->
<template>
  <a-layout-sider
    :trigger="null"
    collapsible
    v-model="menuCollapse"
  >
    <div class="logo" />
    <a-menu theme="dark"
            mode="inline"
            :defaultSelectedKeys="['1']"
            @click="handleClick"
    >
      <a-menu-item v-for="(item, index) in menuConfig"
                   :key="index" >
        <a-icon type="user" />
        <span>{{ item.label }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import menuConfig from '../../units/menuConfig'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      menuConfig: menuConfig
    }
  },
  computed: {
    ...mapState({
      menuCollapse: state => state.menuCollapse
    })
  },
  methods: {
    handleClick(data) {
      const {key} = data
      this.$router.push(this.menuConfig[key].route)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>

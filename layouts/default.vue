<template>
  <a-layout>
    <AsideLayput />
    <a-layout class="layout">
      <a-layout-header class="layout__header">
        <div>
          <a-icon
            class="trigger"
            :type="menuCollapse ? 'menu-unfold' : 'menu-fold'"
            @click="toggleMenuState"
          />
        </div>
        <div>
          <h2>{{ title }}</h2>
        </div>
        <div>

        </div>

      </a-layout-header>
      <a-layout-content class="layout__content">
        <nuxt/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import AsideLayput from '../components/layout/aside.vue'
import { TOGGLE_ASIDE } from '../units/types'
export default {
  data(){
    return {
    }
  },
  components: {
    AsideLayput
  },
  methods: {
    toggleMenuState(){
      this.$store.commit(TOGGLE_ASIDE)
    }
  },
  computed: {
    ...mapState({
      menuCollapse: state => state.menuCollapse,
      title: state=> state.pageConf.title
    })
  }
}
</script>
<style rel="stylesheet/scss" scoped lang="scss">
.layout{
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__content{
    flex: 1;
    overflow: auto;
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
  }

  &__header{
    background: #fff;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;

    .trigger{
      cursor: pointer;
    }
  }
}
</style>

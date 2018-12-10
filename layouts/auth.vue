<template>
  <a-layout class="authLayout">
    <div class="authLayout__content">
      <nuxt/>
    </div>
  </a-layout>
</template>
<script>
export default {
  data(){
    return {
      collapsed: false
    }
  }
}
</script>
<style rel="stylesheet/scss" scoped lang="scss">
.authLayout{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #7f828bs;

  &__content{
    width: 300px;
    height: 300px;
  }
}
</style>

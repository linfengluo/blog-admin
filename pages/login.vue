<!--
    Created by linfengluo@gmail.com on 2018/12/10.
-->
<template>
  <section class="container">
    <a-form :form="form" @submit="handleSubmit" class='login-form'>
      <a-form-item>
        <a-input
          placeholder='Username'
          v-decorator="[
            'email',
            { rules: [{ required: true, message: 'Please input your username!' }] }
          ]"
        >
          <a-icon slot="prefix" type='user' style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] }
          ]"
          type='password'
          placeholder='Password'
        >
          <a-icon slot="prefix" type='lock' style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type='primary' htmlType='submit' class='login-form-button'>
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script>
import apiConfig from '../units/apiConfig'
export default {
  layout: 'auth',
  components: {
  },
  data(){
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const redirect = this.$route.query.from || '/'
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('login', values)
            .then(res => {
              this.$message.success('登录成功');
              this.$router.push(redirect)
            })
            .catch(err => {
              this.$message.error(err);
            })
        }
      })
    },
  }
}
</script>

<style>

</style>

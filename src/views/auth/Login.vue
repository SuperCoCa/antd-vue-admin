<template>
  <div>
    <a-form
      class="login-form"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="手机号"
          v-decorator="[
            'phone',
            {rules: [{required: true, message: '请输入手机号'}], validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{color: 'rgba(0, 0, 0, .65)'}"></a-icon>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="password"
          placeholder="密码"
          v-decorator="[
            'password',
            {rules: [{required: true, message: '请输入密码'}], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{color: 'rgba(0, 0, 0, .65)'}"></a-icon>
        </a-input>
      </a-form-item>
      <a-button size="large" type="primary" html-type="submit" class="login-btn">登录</a-button>
    </a-form>
  </div>
</template>

<script>
import { login } from '@/api/auth/login'
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)

          login(values).then(res => {
            const token = res.data.token
            
            setToken(token)
            
            this.$router.push({ path: '/' });
          }).catch(error => {
            console.log(error)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-form {
  margin: auto !important;
  max-width: 300px;
}

.login-btn {
  width: 100%;
}
</style>

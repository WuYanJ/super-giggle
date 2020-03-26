<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('./../../public/img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt="" />
            </div>
            <v-form :model="loginForm" :rules="rules" :ref="loginForm">
              <fg-input v-model="loginForm.username"
                        type="text"
                        class="no-border"
                        addon-left-icon="now-ui-icons users_circle-08"
                        placeholder="User Name..."
              >
              </fg-input>

              <fg-input v-model="loginForm.password"
                        type="password"
                        class="no-border"
                        addon-left-icon="now-ui-icons text_caps-small"
                        placeholder="Password..."
              >
              </fg-input>
               <div class="card-footer text-center">
                  <a v-on:click="login"
                     :disabled="!loginForm"
                  href="/"
                  class="btn btn-primary btn-round btn-lg btn-block"
                  >Get Started</a
                  >
               </div>
                <div class="pull-left">
                 <h6>
                   <router-link to="/" class="link footer-link">
                      Create Account
                    </router-link>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="/" class="link footer-link">Need Help?</a>
                </h6>
              </div>
            </v-form>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { Card, Button, FormGroupInput } from '@/components'
import MainFooter from '@/layout/MainFooter'
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  mixins: [validationMixin],
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    validate () {
      this.$refs.loginForm.validate()
    },
    login () {
      this.$axios.post('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
        .then(resp => {
          console.log(resp)
          if (resp.status === 200 && resp.data.hasOwnProperty('token')) {
            alert('登录成功！')
            this.$store.commit('login', resp.data)
            this.$store.state.username = this.loginForm.username
            localStorage.setItem('userName', this.loginForm.username)
            localStorage.setItem('now', true)
            this.$router.push({path: '/meeting'})
          } else {
            alert(resp.data)
          }
        })
        .catch(error => {
          console.log(error)
          alert('用户名不存在！')
        })
    }
  }
}
</script>
<style></style>

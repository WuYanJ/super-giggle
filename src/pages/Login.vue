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
            <h3>Sign in</h3>
            <v-form :model="loginForm" :ref="loginForm">
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
import store from './../store'
import { validationMixin } from 'vuelidate'
import { Card, Button, FormGroupInput, Alert } from '@/components'

import MainFooter from '@/layout/MainFooter'
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  mixins: [validationMixin],
  components: {
    Card,
    MainFooter,
    Alert,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      showAlert: false
    }
  },
  methods: {
    validate () {
      this.$refs.loginForm.validate()
    },
    login () {
      if (store.state.userName != null) {//
        alert('已经登陆过了哥')
      } else {
        this.$axios.post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
          .then(resp => {
            console.log(resp)
            if (resp.status === 200 && resp.data.hasOwnProperty('token')) {
              alert('登录成功！')
              this.$store.commit('login', resp.data)
              this.$store.state.userName = this.loginForm.username
              localStorage.setItem('userName', this.loginForm.username)
              localStorage.setItem('now', true)
              if(this.loginForm.username === 'admin'){
                this.$router.replace({path: '/adminApprove'})
              }else this.$router.replace({path: '/workspace'})
              location.reload()
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
}
</script>
<style></style>

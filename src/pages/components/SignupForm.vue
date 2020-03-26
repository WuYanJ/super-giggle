<template>
  <div
    class="section section-signup"
    style="background-image: url(img/bg11.jpg); background-size: cover; background-position: top center; min-height: 700px;"
  >
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">Sign Up</h3>
          </template>
          <template :model="registerForm" :rules="rules" v-loading="loading" :ref="registerForm">
            <fg-input
              type="text"
              v-model="registerForm.username"
              :rules="usernameRules"
              class="no-border"
              placeholder="Name..."
              addon-left-icon="now-ui-icons users_circle-08"
            >
            </fg-input>

            <fg-input
              type="text"
              v-model="registerForm.fullname"
              :rules="fullnameRules"
              auto-complete="off"
              class="no-border"
              placeholder="Full Name..."
              addon-left-icon="now-ui-icons text_caps-small"
            >
            </fg-input>

            <fg-input
                    type="text"
                    v-model="registerForm.password"

                    :rules="passwordRules"
                    auto-complete="off"
                    class="no-border"
                    placeholder="Password..."
                    addon-left-icon="now-ui-icons text_caps-small"
            >
            </fg-input>

            <fg-input
                    type="text"
                    v-model="registerForm.email"
                    :rules="emailRules"
                    auto-complete="off"
                    class="no-border"
                    placeholder="Email"
                    addon-left-icon="now-ui-icons text_caps-small"
            >
            </fg-input>

            <fg-input
                    type="text"
                    v-model="registerForm.affiliation"
                    :rules="affiliationRules"
                    auto-complete="off"
              class="no-border"
              placeholder="Affiliation"
              addon-left-icon="now-ui-icons ui-1_email-85"
            >
            </fg-input>

            <fg-input
                    type="text"
                    v-model="registerForm.region"
                    :rules="regionRules"
                    auto-complete="off"
                    class="no-border"
                    placeholder="Region"
                    addon-left-icon="now-ui-icons text_caps-small"
            >
            </fg-input>

          </template>
          <div class="card-footer text-center">
            <n-button type="neutral" round size="lg" v-on:click="register(registerForm)">Get Started</n-button>
          </div>
        </card>
      </div>
      <div class="col text-center">
        <router-link
          to="/login"
          class="btn btn-simple btn-round btn-white btn-lg"
        >
          View Login Page
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, FormGroupInput, Button } from '@/components'

export default {
  name: 'register',
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
        fullname: '',
        email: '',
        affiliation: '',
        region: ''
      },
      usernameRules: [
        v => !!v || 'Name is required'
      ],
      fullnameRules: [
        v => !!v || 'Full Name is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      emailRules: [
        v => !!v || 'Email is required'
      ],
      affiliationRules: [
        v => !!v || 'Affiliation is required'
      ],
      regionRules: [
        v => !!v || 'Region is required'
      ],

      loading: false
    }
  },
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  methods: {
    register (formName) {
      this.$axios.post('/register', { // axios.post (url, data)
        username: this.registerForm.username,
        password: this.registerForm.password,
        fullname: this.registerForm.fullname,
        email: this.registerForm.email,
        affiliation: this.registerForm.affiliation,
        region: this.registerForm.region
      })
        .then(resp => {
          // 根据后端的返回数据修改
          if (resp.status === 200 && resp.data.hasOwnProperty('id')) {
            // 跳转到login
            alert('successful registration')
            this.$router.replace('/login')
          } else {
            alert('register error')
          }
        })
        .catch(error => {
          console.log(error)
          alert('该用户名已经被注册了')
        })
    }
  }
}
</script>
<style></style>

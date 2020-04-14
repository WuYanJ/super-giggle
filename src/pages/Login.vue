<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="8"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="username"
                    label="Login"
                    name="login"
                    type="text"
                  />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login"
                       :disabled="!valid"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import store from './../store'
  export default {
    props: {
      source: String,
    },
    data () {
      return {
        valid: '',
          username: '',
          password: '',
        loading: false,
        showAlert: false
      }
    },
    methods:{
      login () {
        console.log(this.password)
        if (store.state.userName != null) {//
          alert('已经登陆过了哥')
        } else {
          this.$axios.post('/login', {
            username: this.username,
            password: this.password
          })
            .then(resp => {
              console.log(resp)
              if (resp.status === 200 && resp.data.hasOwnProperty('token')) {
                alert('登录成功！')
                this.$store.commit('login', resp.data)
                this.$store.state.userName = this.username
                localStorage.setItem('userName', this.username)
                localStorage.setItem('now', true)
                if(this.username === 'admin'){
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

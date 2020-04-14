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
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    name="Username"
                    type="text"
                  />

                  <v-text-field
                    v-model="fullName"
                    :rules="nameRules"
                    :counter="10"
                    label="Full name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <v-text-field
                    v-model="confirmPassword"
                    id="password"
                    label="Confirm Password"
                    name="confirm password"
                    type="password"
                  />

                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="affiliation"
                    label="Affiliation"
                    name="Full Name"
                    type="text"
                  />

                  <v-text-field
                    v-model="region"
                    label="Region"
                    name="region"
                    type="text"
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="register(valid)">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data() {
      return{

        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],

        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        valid: '',
          username: '',
          fullName: '',
          password: '',
          confirmPassword: '',
          email: '',
          affiliation: '',
          region: ''

      }
    },
    methods: {
      register (formName) {
            this.$axios.post('/register', { // axios.post (url, data)
              username: this.username,
              password: this.password,
              fullname: this.fullName,
              email: this.email,
              affiliation: this.affiliation,
              region: this.region
            })
              .then(resp => {
                // 根据后端的返回数据修改
                if (resp.status === 200 && resp.data.hasOwnProperty('id')) {
                  // 跳转到login
                  alert('successful registration')
                  this.$router.push('/login')
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

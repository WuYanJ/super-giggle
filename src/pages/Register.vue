<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
              <h3>Sign In</h3>
            <el-form :model="registerForm" :rules="rules" class="register_container" label-position="left"
                     label-width="0px" v-loading="loading" :ref="registerForm">
              <el-form-item prop="username">
                <el-input type="text" v-model="registerForm.username"
                          auto-complete="off" placeholder="username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="registerForm.password"
                          auto-complete="off" placeholder="password"></el-input>
              </el-form-item>
              <el-form-item prop="fullname">
                <el-input type="text" v-model="registerForm.fullname"
                          auto-complete="off" placeholder="fullname"></el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input type="text" v-model="registerForm.email"
                          auto-complete="off" placeholder="email"></el-input>
              </el-form-item>
              <el-form-item prop="affiliation">
                <el-input type="text" v-model="registerForm.affiliation"
                          auto-complete="off" placeholder="affiliation"></el-input>
              </el-form-item>
              <el-form-item prop="region">
                <el-input type="text" v-model="registerForm.region"
                          auto-complete="off" placeholder="region"></el-input>
              </el-form-item>
              <div class="clearfix"></div>
            </el-form>
            <div class="card-footer text-center">
              <n-button type="neutral" round size="lg" v-on:click="register(registerForm)">Get Started</n-button>
            </div>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import { Card, FormGroupInput, Button } from '@/components'
export default {
  name: 'register',
  data () {
    const dataValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('can\'t be empty'))
      }
      if (value === '') {
        return callback(new Error('can\'t be empty'))
      }
      return callback()
    }
    const usernameValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('can\'t be empty'))
      } else if (value === '') {
        return callback(new Error('can\'t be empty'))
      } else {
        // eslint-disable-next-line no-useless-escape
        let reg = /^[a-zA-Z\-][a-zA-Z0-9_\-]*$/
        if (!reg.test(value)) {
          return callback(new Error('只能包含字母，数字或两种特殊字符(-_)且只能以字母或-开头'))
        }
      }
      return callback()
    }
    const passwordValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('can\'t be empty'))
      } else if (value === '') {
        return callback(new Error('can\'t be empty'))
      } else {
        // eslint-disable-next-line no-useless-escape
        let reg = /^[a-zA-Z0-9_\-]*$/
        let regLetter = /^.*[a-zA-z].*$/
        let regNumber = /^.*[0-9].*$/
        // eslint-disable-next-line no-useless-escape
        let regCharacter = /^.*[_\-].*$/
        if (!reg.test(value)) {
          return callback(new Error('只能包含字母，数字或两种特殊字符(-_)'))
        } else {
          if (regLetter.test(value) && regNumber.test(value) && regCharacter.test(value)) {
            return callback()
          } else if (regLetter.test(value) && regNumber.test(value)) {
            return callback()
          } else if (regLetter.test(value) && regCharacter.test(value)) {
            return callback()
          } else if (regNumber.test(value) && regCharacter.test(value)) {
            return callback()
          } else {
            return callback(new Error('字母，数字或者特殊字符(-_)至少包含两种'))
          }
        }
      }
    }
    const containValid = (rule, value, callback) => {
      if (value.indexOf(this.registerForm.username) !== -1) {
        return callback(new Error('密码不能包含账号'))
      } else {
        return callback()
      }
    }
    const emailValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('can\'t be empty'))
      } else if (value === '') {
        return callback(new Error('can\'t be empty'))
      } else {
        // if (value !== '') {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(value)) {
          return callback(new Error('fill in the correct email form'))
        }
        return callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        fullname: '',
        email: '',
        affiliation: '',
        region: ''
      },
      rules: {
        // blur 失去鼠标焦点时触发验证
        username: [
          {required: true, message: 'fill in your username', trigger: 'blur'},
          {min: 5, max: 32},
          {validator: usernameValid, trigger: 'blur'},
          {validator: dataValid, trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'fill in your password', trigger: 'blur'},
          {min: 6, max: 32},
          {validator: passwordValid, trigger: 'blur'},
          {validator: containValid, trigger: 'blur'},
          {validator: dataValid, trigger: 'blur'}
        ],
        fullname: [
          {required: true, message: 'fill in your fullname', trigger: 'blur'},
          {validator: dataValid, trigger: 'blur'}
        ],
        email: [
          {required: true, message: 'fill in your email', trigger: 'blur'},
          {validator: emailValid, trigger: 'blur'},
          {validator: dataValid, trigger: 'blur'}
        ],
        affiliation: [
          {required: true, message: 'fill in your affiliation', trigger: 'blur'},
          {validator: dataValid, trigger: 'blur'}
        ],
        region: [
          {required: true, message: 'fill in your region', trigger: 'blur'},
          {validator: dataValid, trigger: 'blur'}
        ]
      },
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
      this.$refs[formName].validate(valid => {
        if (valid) {
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
        } else {
          alert('表单填写有误哥')
        }
      })
    }
  }
}
</script>

<style >
  input.el-input__inner {
    padding: 0 30px;
    opacity:0.5;
    border-radius: 20px;
  }
</style>

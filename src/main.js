// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NowUiKit from './plugins/now-ui-kit'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueWechatTitle from 'vue-wechat-title'
import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueWechatTitle)
Vue.use(NowUiKit)
Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(ElementUI)

export default new Vuetify({ })

// axios 配置
var axios = require('axios')
// Axios挂载到prototype，全局可以使用this.$axios访问
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

Vue.config.productionTip = false

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      // 判断是否有token，若存在，每个http header加上token
      config.headers.Authorization = 'Bearer ' + store.state.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error.response)
    if (error) {
      // 清除token 如果不是register/login, 跳转至login
      //store.commit('logout')//要改回来哦！注释掉方便调试！
      // router.currentRoute.path !== '/login' &&//要改回来哦！注释掉方便调试！
      // router.currentRoute.path !== '/register' &&//要改回来哦！注释掉方便调试！
      // router.replace({//要改回来哦！注释掉方便调试！
      //   path: '/login',//要改回来哦！注释掉方便调试！
      //   query: {redirect: router.currentRoute.path}//要改回来哦！注释掉方便调试！
      // })//要改回来哦！注释掉方便调试！
    }
    return Promise.reject(error.response.data)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify(),
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile.vue'
import AboutUs from '../pages/AboutUs'
import ApplyMeeting from '../pages/ApplyMeeting'
import Workspace from '../pages/Workspace'
import AdminApprove from '../pages/AdminApprove'
import TimeLine from '../pages/components/TimeLine'
import Contribute from '../pages/Contribute'
import Invite from '../pages/Invite'
import MainNavbar from '../layout/MainNavbar.vue'
import MainFooter from '../layout/MainFooter.vue'

import pdfTest from '../pages/pdfTest'
import store from '../store'

Vue.use(Router)

export const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: { title: 'Homepage' }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      components: { default: AboutUs, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: { title: 'AboutUs' }
    },
    {
      path: '/login',
      name: 'login',
      components: { default: Login, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: { title: 'Login' }
    },
    {
      path: '/register',
      name: 'register',
      components: { default: Register, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: { title: 'Register' }
    },
    {
      path: '/applyMeeting',
      name: 'applyMeeting',
      components: { default: ApplyMeeting, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
      // ,
      // meta: {
      //   requireAuth: true, // 需要登录权限
      //   title: 'ApplyMeeting'
      // }
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        requireAuth: true, // 需要登录权限
        title: 'Profile' }
    },
    {
      path: '/workspace',
      name: 'workspace',
      components: { default: Workspace, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        requireAuth: true, // 需要登录权限
        title: 'Workspace' }
    },
    {
      path: '/timeLine',
      name: 'timeLine',
      components: { default: TimeLine, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        title: 'Line' }
    },
    {
      path: '/adminApprove',
      name: 'adminApprove',
      components: { default: AdminApprove, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        requireAuth : true,
        title: 'AdminApprove' }
    },
    {
      path: '/contribute',
      name: 'contribute',
      components: { default: Contribute, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: { title: 'Contribute' }
    },
    {
      path: '/invite',
      name: 'invite',
      components: { default: Invite, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: { title: 'Invite' }
    },
    {
      path: '/pdf',
      name: 'pdfTest',
      components: { default: pdfTest },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: { title: 'pdfTest' }
    },
  ]
})

// 前端登录拦截
router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      if(to.path === "/adminApprove"){
        if(store.state.userName === 'admin'){
          next()
        } else {
          alert("没有管理员权限")
          next({
            path: '/workspace'
          })
        }
      } else next()
    } else {
      alert('You Need Login First')
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      })
    }
  } else {
    next()
  }
})

import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile.vue'
import Landing from '../pages/Landing'
import Meeting from '../pages/Meeting'
import Workspace from '../pages/Workspace'
import AdminApprove from '../pages/AdminApprove'
import Line from '../pages/Line'
import Contribute from '../pages/Contribute'
import Invite from '../pages/Invite'
import MainNavbar from '../layout/MainNavbar.vue'
import MainFooter from '../layout/MainFooter.vue'
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
      path: '/landing',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: { title: 'Landing' }
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
      path: '/meeting',
      name: 'meeting',
      components: { default: Meeting, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        requireAuth: true, // 需要登录权限
        title: 'Meeting'
      }
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
      path: '/line',
      name: 'line',
      components: { default: Line, header: MainNavbar, footer: MainFooter },
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
      meta: { title: 'AdminApprove' }
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
    }
  ]
})

// 前端登录拦截
router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next()
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

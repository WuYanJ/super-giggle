import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ApplyMeeting from '../pages/ApplyMeeting'
import Workspace from '../pages/Workspace'
import Invite from '../pages/Invite'
import News from '../pages/News'
import Window from '../pages/Window'
import AdminApprove from '../pages/AdminApprove'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import store from '../store'

Vue.use(Router)

export const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index},
      meta: { title: 'Index' },
      children: [
        {
          // 当 /foo/:id/profile 匹配成功，
          // FooProfile 会被渲染在 Foo的 <router-view> 中
          path: 'profile',
          name: 'profile',
          component: Profile
        },
        {
          // 当 /foo/:id/profile 匹配成功，
          // FooProfile 会被渲染在 Foo的 <router-view> 中
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          // 当 /foo/:id/profile 匹配成功，
          // FooProfile 会被渲染在 Foo的 <router-view> 中
          path: 'news',
          name: 'news',
          component: News
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          // 当 /foo/:id/profile 匹配成功，
          // FooProfile 会被渲染在 Foo的 <router-view> 中
          path: 'applyMeeting',
          name: 'applyMeeting',
          component: ApplyMeeting
        },
        {
          // 当 /foo/:id/profile 匹配成功，
          // FooProfile 会被渲染在 Foo的 <router-view> 中
          path: 'workspace',
          name: 'workspace',
          component: Workspace
        },
        {
          // 当 /foo/:id/profile 匹配成功，
          // FooProfile 会被渲染在 Foo的 <router-view> 中
          path: 'invite/:id',
          name: 'invite',
          component: Invite
        },
        {
          path: 'window',
          name: 'window',
          component: Window
        },
        {
          path: 'adminApprove',
          name: 'adminApprove',
          component: AdminApprove
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    }
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
      } else if(store.state.userName === 'admin') {
        if(to.path !== "/adminApprove" || to.path !== "/"){
          alert('Administer has not credential')
          next({
            path: '/adminApprove'
          })
        } else next()
      }
      else next()
    }
    else {
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

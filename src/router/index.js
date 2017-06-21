import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Yj from '@/components/Yj'
import login from '@/components/login'
import register from '@/components/register'
import record from '@/components/record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Yj',
      name: 'Yj',
      component: Yj
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/record',
      name: 'record',
      component: record
    }
  ]
})

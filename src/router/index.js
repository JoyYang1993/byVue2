import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Yj from '@/components/Yj'
import login from '@/components/login'

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
    }
  ]
})

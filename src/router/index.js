import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Attendance from '@/components/Attendance'
import Moderation from '@/components/Moderation'
import Replacement from '@/components/Replacement'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Attendance',
      name: 'Attendance',
      component: Attendance
    },
    {
      path: '/Moderation',
      name: 'Moderation',
      component: Moderation
    },
    {
      path: '/Replacement',
      name: 'Replacement',
      component: Replacement
    }
  ]
})

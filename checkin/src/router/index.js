import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcome'
import checkin from '@/components/checkin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/checkin',
      name: 'checkin',
      component: checkin
    }
  ]
})

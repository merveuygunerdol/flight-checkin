import Vue from 'vue'
import Router from 'vue-router'
import checkin from '@/components/checkin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'checkin',
      component: checkin
    }
  ]
})

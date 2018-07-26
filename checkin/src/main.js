// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import storeOptions from './store/index'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store(storeOptions)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

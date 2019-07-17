// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './components/global.js'
import App from './App'
import router from './router'
import store from './store/index'
import Http from './utils/http'
import api from './utils/api'
import './utils/filter'
import FastClick from 'fastclick'
import NP from 'number-precision'
import './assets/css/reset.css'
import './assets/css/vux-reset.css'
import { DatetimePlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin } from 'vux'

// import VConsole from 'vconsole'
// var vConsole = new VConsole()

Vue.config.productionTip = false

var passiveSupported = false

try {
  var options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true
    }
  })

  window.addEventListener('test', null, options)
} catch (err) {

}

Vue.prototype.$passiveSupported = passiveSupported

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, passiveSupported ? { passive: true } : false)
}

Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.prototype.$http = new Http(store, api)
Vue.prototype.API = api
Vue.prototype.NP = NP

// store.dispatch('get_user_data', router)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

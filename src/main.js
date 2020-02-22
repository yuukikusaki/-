import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import store from '../store/index'
import Vuex from 'vuex'

Vue.use(Vuex)

import Vue from 'vue'
import App from './App.vue'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 引入 socket
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug:true,
  connection:'http://192.168.0.102:3000',
}));

import router from './router/router'
import VueRouter from 'vue-resource'
Vue.use(VueRouter)
Vue.http.options.root = 'http://localhost:3000';
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push(function (request, next) {//拦截器
  // 跨域携带cookie
  request.credentials = true;
  next()
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

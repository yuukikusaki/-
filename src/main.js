import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$message = Message

// 导入全局样式
import './assets/css/global.css'

// 导入 axios
import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.0.105:3000';
axios.interceptors.request.use(config=>{
  window.console.log(config)
  config.headers.token = Vue.prototype.$cookies.get("token");
  return config;
})
// axios.defaults.withCredentials=true;
Vue.prototype.$http = axios;

import store from '../store/index'
import Vuex from 'vuex'
import Vue from 'vue'
import App from './App.vue'

import VueCookies from 'vue-cookies'
Vue.use(Vuex)
Vue.use(VueCookies);

// 引入 socket
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug:true,
  connection:'http://192.168.0.105:3000',
}));

import router from './router'

// 引入时间过滤器
import moment from 'moment'
Vue.filter('dateFormat', function (dateStr,pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
});

// Vue.http.options.root = 'http://localhost:3000';
// Vue.http.options.emulateJSON = true;
// Vue.http.interceptors.push(function (request, next) {//拦截器
//   // 跨域携带cookie
//   request.credentials = true;
//   next()
// })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

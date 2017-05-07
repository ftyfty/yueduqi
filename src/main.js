// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import * as filter from './filters'
import store from './vuex/index'
Vue.config.productionTip = false
//引入css重置文件,基本的样式文件
require('./js/lib-flexible.js')
require('./assets/css/reset.css')
// 将axios挂载到vue对象的原型下边以实现全局通用
Vue.prototype.axios = axios
//注册过滤器
Object.keys(filter).forEach( k=> Vue.filter(k,filter[k]))
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

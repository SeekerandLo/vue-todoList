// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Elementui)

import store from './store'

// // Not using an ES6 transpiler
// var slicksort = require('vue-slicksort');
// var ContainerMixin = slicksort.ContainerMixin;
// var ElementMixin = slicksort.ElementMixin;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store,
  template: '<App/>'
})

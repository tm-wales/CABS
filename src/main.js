// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Meta from 'vue-meta'
import VueScrollTo from 'vue-scrollto'
import store from './store/store'
import inViewportDirective from 'vue-in-viewport-directive'
import vueResource from 'vue-resource'
import vueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

// Vue Scroll To Defaults options
Vue.use(VueScrollTo, {
     container: 'body',
     duration: 1000,
     easing: 'ease',
     offset: 0,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
})

// Vue-meta
Vue.use(Meta)

// vue resource
Vue.use(vueResource)

// Vue analytics
Vue.use(vueAnalytics, {
  id: 'UA-120665843-2',
  router
})

// view in viewport
inViewportDirective.defaults.top = -200
Vue.directive('in-viewport', inViewportDirective)

/* eslint-disable no-new */
/* eslint-disable indent */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

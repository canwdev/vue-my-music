import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/css/base.styl'
import './assets/css/theme.styl'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body)

Vue.use(vueLazyLoad, {
  preLoad: 1.3,
  loading: require('./assets/img/loading.svg')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'



import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './Layout/css/style.css'
import './Layout/css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

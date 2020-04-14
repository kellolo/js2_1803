import './public/style/style.css'
import './public/style/normalize.css'

import Vue from 'vue'
import app from './public/app.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

new Vue({
    render: h => h(app)
}).$mount('#app')

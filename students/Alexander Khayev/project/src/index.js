import app from './index.vue'
import './css/style.css'
import Vue from 'vue'


new Vue ({
  render: h=>h(app),
}).$mount('#app');

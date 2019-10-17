import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes.js'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
import store from './store.js'

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

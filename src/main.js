import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes.js'
import '@mdi/font/css/materialdesignicons.css'
import store from './store.js'
import i18n from './i18n'
import '@/assets/css/utils.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

store.dispatch('loadCustomizations')

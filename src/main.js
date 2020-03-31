import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes.js'
import '@mdi/font/css/materialdesignicons.css'
import VueI18n from 'vue-i18n'
import messages from './i18n-messages'
import store from './store.js'

Vue.config.productionTip = false

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'es', // set locale
  messages, // set locale messages
})

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

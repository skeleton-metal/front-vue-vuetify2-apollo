import { mount,createLocalVue } from '@vue/test-utils'

//LocalVue
const localVue = createLocalVue()

// Vuetify
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)


//Component
import Login from "@/modules/user/auth/pages/Login";

//Vuex
import Vuex from 'vuex'
localVue.use(Vuex)

//i18n
import VueI18n from 'vue-i18n'
import i18nMessages from '../../src/i18n-messages'
localVue.use(VueI18n)

//router
import VueRouter from 'vue-router'
import router from "../../src/routes";
localVue.use(VueRouter)


describe('Login.vue', () => {
  let actions
  let getters
  let state
  let store
  let vuetify
  let i18n

  beforeEach(() => {

    //Before Vuetify
    vuetify = new Vuetify({
      mocks: {
        $vuetify: {
          lang: {
            t: (val) => val,
          },
        },
      }
    })

    //Before Vuex
    actions = { login: jest.fn() }
    getters = {isAuth: () => false}
    state = {loading: false, userInvalid: false, generalError: ''}

    store = new Vuex.Store({
      modules: {
        auth: {
          state,
          actions,
          getters: getters
        }
      }
    })

    i18n =  new VueI18n({
      locale: 'es',
      messages: i18nMessages.es
    })

  })


  it('renders something', () => {
    const wrapper = mount(Login, {
      vuetify,
      localVue,
      store,
      i18n,
      router
    })
    expect(wrapper.text()).toMatch('inicio')
  })
})

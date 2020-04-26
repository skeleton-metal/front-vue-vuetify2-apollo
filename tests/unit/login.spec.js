import { mount } from '@vue/test-utils'

//i18n, Vuetify, LocalValue
import {i18n, vuetify, localVue} from "../setup";

//Component
import Login from "@/modules/user/auth/pages/Login";

import router from "@/routes";

//Vuex
import Vuex from 'vuex'
localVue.use(Vuex)

describe('Login.vue', () => {
  let actions
  let getters
  let state
  let store


  beforeEach(() => {
    actions = { login: jest.fn() }
    getters = {isAuth: () => false}
    state = {loading: false, userInvalid: false, generalError: ''}
    store = new Vuex.Store({modules: {auth: {state, actions, getters}}})
  })


  it('renders something', () => {
    const wrapper = mount(Login, {
      vuetify,
      localVue,
      store,
      i18n,
      router
    })
    expect(wrapper.text()).toMatch('Iniciar sesión')
  })
})

import {mount} from '@vue/test-utils'

//i18n, Vuetify, LocalValue
import {i18n, vuetify, localVue} from "../../../../setup";

//Component
import Login from "@/modules/user/auth/components/Login";

import router from "@/routes";

//Vuex
import Vuex from 'vuex'
import UserAuthStore from "../../../../../src/modules/user/auth/storage/UserAuthStore";

localVue.use(Vuex)


const createStore = (actions, getters, state, mutations) => {

    actions = actions ? actions : UserAuthStore.actions
    getters = getters ? getters : UserAuthStore.getters
    state = state ? state : UserAuthStore.state
    mutations = mutations ? mutations : UserAuthStore.mutations

    return new Vuex.Store(
        {modules: {auth: {actions, state, getters, mutations}}}
    )
}

describe('LoginPage.vue', () => {



    it('Render Sign in on start', () => {
        const wrapper = mount(Login, {
            vuetify,
            localVue,
            store: createStore(),
            i18n,
            router
        })
        expect(wrapper.text()).toMatch('Sign in')
    })


    it('Render Bad Credentials on login fail', async () => {

        let actions = {
            login: jest.fn(function() {
                this.commit('SET_USER_INVALID', true);
                this.commit('SET_GENERAL_ERROR', 'user.badCredentials')
            })
        }

        const wrapper = mount(Login, {
            vuetify,
            localVue,
            store: createStore(actions),
            i18n,
            router
        })

        let button = wrapper.find({ref: 'loginBtn'})
        button.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toMatch('Bad credentials')
    })


    it('Render Network Error on server fault', async () => {

        let actions = {
            login: jest.fn(function() {
                this.commit('SET_USER_INVALID', true);
                this.commit('SET_GENERAL_ERROR', 'common.networkError')
            })
        }

        const wrapper = mount(Login, {
            vuetify,
            localVue,
            store: createStore(actions),
            i18n,
            router
        })

        let button = wrapper.find({ref: 'loginBtn'})
        button.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toMatch('Network error. The server does not respond.')
    })


    it('Go Home on Login ok', async () => {

        let actions = {
            login: jest.fn(function() {
                //Set user. This is watch by the component Login for push to home
                this.commit('SET_ME_USER', {username: 'root'});
            })
        }

        const wrapper = mount(Login, {
            vuetify,
            localVue,
            store: createStore(actions),
            i18n,
            router
        })

        let button = wrapper.find({ref: 'loginBtn'})
        button.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$route.name).toBe('home')
    })
})

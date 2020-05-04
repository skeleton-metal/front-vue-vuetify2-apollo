require('jest-fetch-mock').enableMocks()
import { createLocalVue } from '@vue/test-utils'

//Create LocalVue
export const localVue = createLocalVue()

//Setup Vuetify
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

export const vuetify = new Vuetify({
    mocks: {
        $vuetify: {
            lang: {
                t: (val) => val,
            },
        },
    }
})

//Setup i18n
import VueI18n from 'vue-i18n'
import i18nMessages from '@/i18n-merge-messages.js'
localVue.use(VueI18n)

export const i18n =  new VueI18n({
    locale: 'en',
    messages: i18nMessages
})


//Setup Router
import VueRouter from 'vue-router'
localVue.use(VueRouter)



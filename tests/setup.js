require('jest-fetch-mock').enableMocks()
import { createLocalVue } from '@vue/test-utils'

//LocalVue
export const localVue = createLocalVue()



// Vuetify
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

//i18n
import VueI18n from 'vue-i18n'
import i18nMessages from '@/i18n-messages.js'
localVue.use(VueI18n)

export const i18n =  new VueI18n({
    locale: 'en',
    messages: i18nMessages
})


//router
import VueRouter from 'vue-router'
localVue.use(VueRouter)

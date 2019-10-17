import Vue from 'vue'
import Vuex from 'vuex'

import UserAuthStore from './auth/storage/UserAuthStore'
import UserRecoveryStore from './recovery/storage/UserRecoveryStore'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        UserAuthStore: UserAuthStore,
        UserRecoveryStore: UserRecoveryStore,
    },

})

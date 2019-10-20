import Vue from 'vue'
import Vuex from 'vuex'


import UserAuthStore from './modules/user/auth/storage/UserAuthStore'
import UserRecoveryStore from "./modules/user/recovery/storage/UserRecoveryStore";
import UserProfileStore from "./modules/user/profile/storage/UserProfileStore";
import UserAdminStore from "./modules/user/admin/storage/UserAdminStore";
import UserRegisterStore from "./modules/user/register/storage/UserRegisterStore";
import ErrorStore from './modules/error/storage/ErrorStore'

import appStore from './modules/app/storage/AppStore'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        //USER
        //userStore: UserStore,
        auth: UserAuthStore,
        recovery: UserRecoveryStore,
        profile: UserProfileStore,
        admin: UserAdminStore,
        register: UserRegisterStore,
        //APP
        app: appStore,
        //ERROR
        error: ErrorStore
    },
    plugins: [
        createPersistedState({
            key: 'skeleton',
            paths: ['auth'],
            reducer: state => (
                {
                    auth: {
                        access_token: state.auth.access_token,
                        me: state.auth.me
                    }
                })
        })
    ]
})

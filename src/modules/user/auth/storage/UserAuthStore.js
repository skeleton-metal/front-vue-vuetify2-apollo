import router from '../../../../routes'
import graphqlClient from "../../../../apollo";
import AuthProvider from '../providers/AuthProvider'
import jwt_decode from 'jwt-decode'
import Vue from 'vue'

import {
    SET_TOKEN,
    SET_ME_USER,
    SET_AUTH_LOADING,
    SET_GENERAL_ERROR,
    SET_USER_IMG,
    SET_USER_INVALID, AVATAR_UPDATE,
} from './auth-mutations-type'


export default {
    state: {
        access_token: null,
        me: {
            id: null,
            username: null,
            name: null,
            email: null,
            phone: null,
            img: null,
            roles: [],
            avatar: null
        },
        loadingAuth: false,
        generalError: null,
        userInvalid: false,
    },
    getters: {
        me: (state) => {
            return state.me
        },
        getToken: (state) => {
            return state.access_token
        },
        isAuth: (state) => {
            return (state.access_token) ? true : false
        },
        hasRole: (state) => (groups) => {
            let value = false
            groups.forEach(function (group) {
                if (state.me && state.me.groups && state.me.groups.some(value => value.name == group)) {
                    value = true
                }
            })

            return value
        },
    },
    actions: {
        login({commit}, login) {
            commit(SET_TOKEN, '')
            commit(SET_AUTH_LOADING, true)
            commit(SET_GENERAL_ERROR, "")
            commit(SET_USER_INVALID, false)

            AuthProvider.auth(login.username, login.password).then((response) => {

                commit(SET_TOKEN, response.data.auth.token)
                commit(SET_ME_USER, response.data.auth.user)
                commit(SET_AUTH_LOADING, false)
                router.push('/')

            }).catch((error) => {
                commit(SET_GENERAL_ERROR, error.message)
                commit(SET_AUTH_LOADING, false)
                commit(SET_USER_INVALID, true)
            })


        },

        me({commit, dispatch}) {
            commit(SET_AUTH_LOADING, true)
            commit(SET_GENERAL_ERROR, "")
            AuthProvider.me().then((response) => {
                commit(SET_ME_USER, response.data.me)
                commit(SET_AUTH_LOADING, false)
            }).catch((error) => {
                commit(SET_GENERAL_ERROR, error)
                commit(SET_AUTH_LOADING, false)
                dispatch('logout')
            })
        },


        avatarChange({commit}, data) {
            commit(SET_AUTH_LOADING, true)
            //console.log(data)
            AuthProvider.avatar(data.id, data.avatar).then((response) => {
                commit(SET_AUTH_LOADING, false)
                commit(SET_USER_IMG, response.data.avatar.image)
            });

        },

        logout({commit}) {
            commit(SET_TOKEN, '')
            commit(SET_ME_USER, [])
            graphqlClient.resetStore()
            router.push('/login')
        },

        checkAuth: ({state, dispatch}) => {
            if (state.access_token) {
                let payload = jwt_decode(state.access_token)
                if (payload.exp) {
                    let dateNow = new Date();
                    let dateToken = new Date(payload.exp * 1000)
                    if (dateNow > dateToken) {
                        console.log("Token expire. Logout.")
                        dispatch('logout')
                    }
                }
            }

        },


    },
    mutations: {
        [SET_TOKEN](state, token) {
            state.access_token = token
        }
        ,
        [SET_ME_USER](state, data) {
            state.me = data
        },
        [AVATAR_UPDATE](state, url) {
            state.me.avatarurl = url
        }
        ,
        [SET_AUTH_LOADING](state, data) {
            state.loadingAuth = data
        }
        ,
        [SET_GENERAL_ERROR](state, data) {
            state.generalError = data
        }
        ,
        [SET_USER_IMG](state, img) {
            state.me.avatar = {image: null}
            Vue.set(state.me.avatar, 'image', img)
        }
        ,
        [SET_USER_INVALID](state, data) {
            state.userInvalid = data
        },

    }
}

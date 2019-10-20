import Vue from 'vue'

import {
    SET_USERS,
    SET_LOADING_USERS,
    SET_ROLES,
    SET_LOADING_ROLES,

    SET_FLASH_MESSAGE,
    ADD_USER,
    UPDATE_USER,
    SET_INPUT_ERROR_USER,

    SET_CHANGE_PASSWORD,


} from './user-mutations-type'

import UserAdminProvider from "../providers/UserAdminProvider";


export default {
    state: {

        users: [],
        loadingUsers: false,

        roles: [],
        loadingRoles: false,

        flashMessage: null,
        inputErrorUser: [],

        changePassword: false,

    },
    getters: {
        hasFieldInUserErrors: (state) => (field) => {
            return state.inputErrorUser.some(item => item.field == field)
        },
        getMessagesInUserErrors: (state) => (field) => {
            let i = state.inputErrorUser.find(item => item.field == field)
            return i ? i.messages : []
        },
    },
    actions: {
        fetchUsers({commit}) {
            commit(SET_LOADING_USERS, true)
            UserAdminProvider.users().then((response) => {
                commit(SET_USERS, response.data.users)
                commit(SET_LOADING_USERS, false)
            }).catch((error) => {
                //@TODO Handle Errors
                console.error(error)
                commit(SET_LOADING_USERS, false)
            })

        },

        fetchRoles({commit}) {
            commit(SET_LOADING_ROLES, true)
            UserAdminProvider.roles().then((response) => {
                commit(SET_ROLES, response.data.roles)
                commit(SET_LOADING_ROLES, false)
            }).catch((error) => {
                //@TODO Handle Errors
                console.error(error)
                commit(SET_LOADING_ROLES, false)
            })
        },

        createUser({commit}, data) {
            commit(SET_LOADING_USERS, true)
            commit(SET_FLASH_MESSAGE, "")
            commit(SET_INPUT_ERROR_USER, [])


            return UserAdminProvider.createUser(
                data.username,
                data.password,
                data.name,
                data.email,
                data.phone,
                data.role,
                data.active
            ).then((response) => {
                if (response.data.createUser.user) {
                    commit(ADD_USER, response.data.createUser.user)
                    commit(SET_FLASH_MESSAGE, "Se creo correctamente el Usuario")
                }
                commit(SET_LOADING_USERS, false)
                return true
            }).catch((error) => {
                if (error.graphQLErrors && error.graphQLErrors[0].code != undefined && error.graphQLErrors[0].code == "BAD_USER_INPUT" && error.graphQLErrors[0].inputErrors) {
                    commit(SET_INPUT_ERROR_USER, error.graphQLErrors[0].inputErrors)
                } else {
                    //@TODO Handle GENERAL Errors
                    console.error(error)
                }
                commit(SET_LOADING_USERS, false)
                return false
            })


        },


        updateUser({commit}, data) {
            commit(SET_LOADING_USERS, true)
            commit(SET_FLASH_MESSAGE, "")
            commit(SET_INPUT_ERROR_USER, [])

            return UserAdminProvider.updateUser(
                data.id,
                data.name,
                data.username,
                data.email,
                data.phone,
                data.role,
                data.active
            ).then((response) => {
                // console.log(response.data.updateUser.user)
                if (response.data.updateUser.user) {
                    commit(UPDATE_USER, response.data.updateUser.user)
                    commit(SET_FLASH_MESSAGE, "Se edito correctamente el Usuario")
                }
                commit(SET_LOADING_USERS, false)
                return true
            }).catch((error) => {

                console.log("Vuex Error: " + error)
                commit(SET_LOADING_USERS, false)
                return false
            })

        },

        passwordChange({commit}, data) {
            commit(SET_LOADING_USERS, true)
            commit(SET_CHANGE_PASSWORD, false)
            UserAdminProvider.password(data.id, data.password, data.password_verify).then((response) => {
                console.log(response)
                commit(SET_LOADING_USERS, false)
                commit(SET_CHANGE_PASSWORD, true)
            }).catch((error) => {
                console.log(error)
                commit(SET_LOADING_USERS, false)
                commit(SET_CHANGE_PASSWORD, false)
            })
        },


    },
    mutations: {

        [SET_USERS](state, data) {
            state.users = data
        },
        [SET_LOADING_USERS](state, data) {
            state.loadingUsers = data
        },

        [SET_ROLES](state, data) {
            state.roles = data
        },
        [SET_LOADING_ROLES](state, data) {
            state.loadingRoles = data
        },

        [ADD_USER](state, data) {
            state.users.push(data)
        },
        [UPDATE_USER](state, data) {
            let index = state.users.findIndex(user => user.id == data.id)
            Vue.set(state.users, index, data)
        },

        [SET_INPUT_ERROR_USER](state, data) {
            state.inputErrorUser = data
        },


        [SET_CHANGE_PASSWORD](state, data) {
            state.changePassword = data
        },
        [SET_FLASH_MESSAGE](state, data) {
            state.flashMessage = data
        }
    }
}

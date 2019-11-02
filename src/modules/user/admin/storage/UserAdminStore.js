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
    SET_CHANGE_PASSWORD_MESSAGE,

    SET_ERROR_MESSAGE_ADMIN,


} from './user-mutations-type'

import UserAdminProvider from "../providers/UserAdminProvider";
import ClientError from "../../errors/ClientError";


export default {
    state: {

        users: [],
        loadingUsers: false,

        roles: [],
        loadingRoles: false,

        flashMessage: null,

        errorMessageAdmin: null,
        inputErrorUser: [],

        changePassword: false,
        changePasswordMessage: ""
    },
    getters: {
        hasFieldInUserErrors: (state) => (field) => {
            return state.inputErrorUser[field] != undefined
        },
        getMessagesInUserErrors: (state) => (field) => {
            if (state.inputErrorUser[field] != undefined) {
                let message = state.inputErrorUser[field].message
                return [message]
            }
            return []

        },
    },
    actions: {

        clearErrorMessageAdmin({commit}) {
            commit(SET_ERROR_MESSAGE_ADMIN, "")
        },

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
            commit(SET_ERROR_MESSAGE_ADMIN, "")
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
                    commit(SET_FLASH_MESSAGE, "Se creo el usuario con exito")
                }
                commit(SET_LOADING_USERS, false)
                return true
            }).catch((clientError) => {
                if (clientError instanceof ClientError) {
                    commit(SET_INPUT_ERROR_USER, clientError.inputErrors)
                    commit(SET_ERROR_MESSAGE_ADMIN, clientError.showMessage)
                }
                commit(SET_LOADING_USERS, false)
                return false
            })


        },


        updateUser({commit}, data) {
            commit(SET_LOADING_USERS, true)
            commit(SET_FLASH_MESSAGE, "")
            commit(SET_ERROR_MESSAGE_ADMIN, "")
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
                if (response.data.updateUser.user) {
                    commit(UPDATE_USER, response.data.updateUser.user)
                    commit(SET_FLASH_MESSAGE, "Se modifico el usuario con exito")
                }
                commit(SET_LOADING_USERS, false)
                return true
            }).catch((clientError) => {
                if (clientError instanceof ClientError) {
                    commit(SET_INPUT_ERROR_USER, clientError.inputErrors)
                    commit(SET_ERROR_MESSAGE_ADMIN, clientError.showMessage)
                }
                commit(SET_LOADING_USERS, false)
                return false
            })

        },

        adminChangePassword({commit}, data) {
            commit(SET_LOADING_USERS, true)
            commit(SET_CHANGE_PASSWORD, false)
            return UserAdminProvider.adminChangePassword(data.id, data.password, data.passwordVerify).then((response) => {
                if (response.data.adminChangePassword.status) {
                    commit(SET_LOADING_USERS, false)
                    commit(SET_CHANGE_PASSWORD, true)
                    commit(SET_FLASH_MESSAGE, "Se modifico la password del usuario con exito")
                }
                return true
            }).catch((clientError) => {
                if (clientError instanceof ClientError) {
                    commit(SET_INPUT_ERROR_USER, clientError.inputErrors)
                    commit(SET_FLASH_MESSAGE, clientError.showMessage)
                }
                commit(SET_LOADING_USERS, false)
                commit(SET_CHANGE_PASSWORD, false)
                return false
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
        [SET_CHANGE_PASSWORD_MESSAGE](state, data) {
            state.changePasswordMessage = data
        },
        [SET_FLASH_MESSAGE](state, data) {
            state.flashMessage = data
        },
        [SET_ERROR_MESSAGE_ADMIN](state, data) {
            state.errorMessageAdmin = data
        }
    }
}

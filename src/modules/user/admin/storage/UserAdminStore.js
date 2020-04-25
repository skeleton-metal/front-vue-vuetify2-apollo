import Vue from 'vue'
import i18n from './../../../../i18n'

import {
    SET_USERS,
    SET_LOADING_USERS,

    SET_ROLES,
    SET_LOADING_ROLES,

    SET_GROUPS,
    SET_LOADING_GROUPS,

    SET_FLASH_MESSAGE,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    SET_INPUT_ERROR_USER,

    SET_CHANGE_PASSWORD,
    SET_CHANGE_PASSWORD_MESSAGE,

    SET_ERROR_MESSAGE_ADMIN,
    SET_TOTAL_ITEMS, INCREASE_TOTAL_ITEMS, DECREASE_TOTAL_ITEMS


} from './user-mutations-type'

import UserAdminProvider from "../providers/UserAdminProvider";

import {ClientError} from 'front-module-commons';


export default {
    state: {

        users: [],
        loadingUsers: false,

        roles: [],
        loadingRoles: false,

        groups:[],
        loadingGroups: false,

        flashMessage: null,

        errorMessageAdmin: null,
        inputErrorUser: [],

        changePassword: false,
        changePasswordMessage: "",

        //Pagination
        totalItems: null,
        currentPage: 1,
        limit: 5,
        next: null,
        nextPage: null,
        prevPage: null
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
        getLimit: state => {
          return state.limit
        }
    },
    actions: {

        clearErrorMessageAdmin({commit}) {
            commit(SET_ERROR_MESSAGE_ADMIN, "")
        },

        paginateUsers({commit,getters}, {pageNumber, search, orderBy, orderDesc}) {
            if(Array.isArray(orderBy)) orderBy = orderBy[0]
            if(Array.isArray(orderDesc)) orderDesc = orderDesc[0]

            commit(SET_LOADING_USERS, true)

            UserAdminProvider.paginateUsers(getters.getLimit , pageNumber, search, orderBy, orderDesc).then((response) => {
                commit(SET_TOTAL_ITEMS, response.data.paginateUsers.totalItems)
                commit(SET_USERS, response.data.paginateUsers.users)
                commit(SET_LOADING_USERS, false)
            }).catch((error) => {
                //@TODO Handle Errors
                console.error(error)
                commit(SET_LOADING_USERS, false)
            })

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

        fetchGroups({commit}) {
            commit(SET_LOADING_GROUPS, true)
            UserAdminProvider.groups().then((response) => {
                commit(SET_GROUPS, response.data.groups)
                commit(SET_LOADING_GROUPS, false)
            }).catch((error) => {
                //@TODO Handle Errors
                console.error(error)
                commit(SET_LOADING_GROUPS, false)
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
                data.groups,
                data.active
            ).then((response) => {
                if (response.data.createUser) {
                    commit(ADD_USER, response.data.createUser)
                    commit(INCREASE_TOTAL_ITEMS)
                    commit(SET_FLASH_MESSAGE, i18n.t('user.userCreated'))
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
                data.groups,
                data.active
            ).then((response) => {
                if (response.data.updateUser) {
                    commit(UPDATE_USER, response.data.updateUser)
                    commit(SET_FLASH_MESSAGE, i18n.t('user.userModified'))
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


        deleteUser({commit}, id) {
            commit(SET_LOADING_USERS, true)
            commit(SET_FLASH_MESSAGE, "")
            commit(SET_ERROR_MESSAGE_ADMIN, "")
            commit(SET_INPUT_ERROR_USER, [])

            return UserAdminProvider.deleteUser(
                id
            ).then((response) => {
                if (response.data.deleteUser.success) {
                    commit(DELETE_USER, id)
                    commit(DECREASE_TOTAL_ITEMS)
                    commit(SET_FLASH_MESSAGE,  i18n.t('user.userDeleted'))
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
                if (response.data.adminChangePassword.success) {
                    commit(SET_LOADING_USERS, false)
                    commit(SET_CHANGE_PASSWORD, true)
                    commit(SET_FLASH_MESSAGE, i18n.t('user.passwordChange'))
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

        [SET_TOTAL_ITEMS](state, data) {
            state.totalItems = data
        },

        [INCREASE_TOTAL_ITEMS](state) {
            state.totalItems = state.totalItems++
        },

        [DECREASE_TOTAL_ITEMS](state) {
            state.totalItems = state.totalItems--
        },

        [SET_LOADING_USERS](state, value) {
            state.loadingUsers = value
        },

        [SET_ROLES](state, data) {
            state.roles = data
        },
        [SET_LOADING_ROLES](state, value) {
            state.loadingRoles = value
        },

        [SET_GROUPS](state, data) {
            state.groups = data
        },
        [SET_LOADING_GROUPS](state, value) {
            state.loadingGroups = value
        },

        [ADD_USER](state, data) {
            state.users.push(data)
        },
        [UPDATE_USER](state, data) {
            let index = state.users.findIndex(user => user.id == data.id)
            Vue.set(state.users, index, data)
        },
        [DELETE_USER](state, userId) {
            let index = state.users.findIndex(user => user.id == userId)
            state.users.splice(index, 1)
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

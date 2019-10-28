import RegisterProvider from '../providers/UserRegisterProvider'
import {
    LOADING_USER_REGISTER_OFF,
    LOADING_USER_REGISTER_ON, SET_ACCOUNT_CREATED, SET_CONFIRMATION_EMAIL,
    SET_INPUT_ERROR_REGISTER, SET_REGISTER_FLASH_MESSAGE, SET_EXPIRE_TOKEN_ACTIVATION,
    SET_INVALID_TOKEN_ACTIVATION, SET_STATUS_ACTIVATION, SET_MESSAGE_ACTIVATION
} from "./user-register-mutations-type";
import ClientError from "../../errors/ClientError";
import jwt_decode from "jwt-decode";


export default {
    state: {
        loadingUserRegister: false,

        flashMessageRegister: null,
        inputErrorRegister: [],

        accountCreated: false,
        confirmationEmail: null,

        expireTokenMessageActivation: "",
        invalidTokenActivation: false,
        statusActivation: false,
        messageActivation: ""
    },
    getters: {
        hasFieldInRegisterErrors: (state) => (field) => {
            return state.inputErrorRegister[field] != undefined
        },
        getMessagesInRegisterErrors: (state) => (field) => {
            if (state.inputErrorRegister[field] != undefined) {
                let message = state.inputErrorRegister[field].message
                return [message]
            }
            return []
        },
        getInvalidTokenActivation(state) {
            return state.invalidTokenActivation
        },
        getExpireTokenMessageActivation(state) {
            return state.expireTokenMessageActivation
        },
        getLoadingUserRegister(state) {
            return state.loadingUserRegister
        },
        getStatusActivation(state) {
            return state.statusActivation
        },
        getMessageActivation(state) {
            return state.messageActivation
        }
    },
    actions: {

        registerUser({commit}, data) {
            commit(LOADING_USER_REGISTER_ON)
            commit(SET_REGISTER_FLASH_MESSAGE, "")
            commit(SET_INPUT_ERROR_REGISTER, [])


            return RegisterProvider.registerUser(
                data.username,
                data.password,
                data.name,
                data.email,
                data.phone
            ).then((response) => {
                if (response.data.registerUser.status) {
                    commit(SET_REGISTER_FLASH_MESSAGE, "Se creo correctamente el Usuario")
                    commit(SET_CONFIRMATION_EMAIL, response.data.registerUser.email)
                    commit(SET_ACCOUNT_CREATED, true)
                    return response.data.registerUser
                }
                commit(LOADING_USER_REGISTER_OFF)

            }).catch((clientError) => {
                if (clientError instanceof ClientError) {
                    commit(SET_INPUT_ERROR_REGISTER, clientError.inputErrors)
                    commit(SET_REGISTER_FLASH_MESSAGE, clientError.showMessage)
                }
                commit(LOADING_USER_REGISTER_OFF)
                return false
            })
        },

        checkTokenActivation: ({commit, dispatch}, token) => {
            commit(SET_EXPIRE_TOKEN_ACTIVATION, "")
            commit(SET_INVALID_TOKEN_ACTIVATION, false)
            if (token) {
                try {
                    let payload = jwt_decode(token)
                    if (payload.exp && payload != undefined) {
                        let dateNow = new Date();
                        let dateToken = new Date(payload.exp * 1000)
                        if (dateNow > dateToken) {
                            commit(SET_EXPIRE_TOKEN_ACTIVATION, "El token ya expiro, contacte un adminitrador para dar de alto tu usuario")
                        } else {
                            commit('SET_TOKEN', token)
                            dispatch('activation', payload.id)
                        }
                    } else {
                        commit(SET_INVALID_TOKEN_ACTIVATION, true)
                    }
                } catch (e) {
                    commit(SET_INVALID_TOKEN_ACTIVATION, true)
                }
            }
        },

        activation: ({commit}, id) => {
            commit(LOADING_USER_REGISTER_ON)
            RegisterProvider.activation(id).then((response) => {
                commit(SET_STATUS_ACTIVATION, response.data.activationUser.status)
                commit(SET_MESSAGE_ACTIVATION, response.data.activationUser.message)
                commit('SET_TOKEN', '')
                commit(LOADING_USER_REGISTER_OFF)
            })

        }
    },
    mutations: {
        [LOADING_USER_REGISTER_ON](state) {
            state.loadingUserRegister = true
        },
        [LOADING_USER_REGISTER_OFF](state) {
            state.loadingUserRegister = false
        },
        [SET_INPUT_ERROR_REGISTER](state, values) {
            state.inputErrorRegister = values
        },
        [SET_REGISTER_FLASH_MESSAGE](state, value) {
            state.flashMessageRegister = value
        },
        [SET_CONFIRMATION_EMAIL](state, value) {
            state.confirmationEmail = value
        },
        [SET_ACCOUNT_CREATED](state, value) {
            state.accountCreated = value
        },
        [SET_EXPIRE_TOKEN_ACTIVATION](state, data) {
            state.expireTokenMessage = data
        },
        [SET_INVALID_TOKEN_ACTIVATION](state, data) {
            state.invalidTokenActivation = data
        },
        [SET_MESSAGE_ACTIVATION](state, data) {
            state.messageActivation = data
        },
        [SET_STATUS_ACTIVATION](state, data) {
            state.statusActivation = data
        }

    }
}

import RegisterProvider from '../providers/UserRegisterProvider'
import {
    LOADING_USER_REGISTER_OFF,
    LOADING_USER_REGISTER_ON, SET_ACCOUNT_CREATED, SET_CONFIRMATION_EMAIL,
    SET_INPUT_ERROR_REGISTER, SET_REGISTER_FLASH_MESSAGE
} from "./user-register-mutations-type";
import ClientError from "../../errors/ClientError";


export default {
    state: {
        loadingUserRegister: false,

        flashMessageRegister: null,
        inputErrorRegister: [],

        accountCreated: false,
        confirmationEmail: null,
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

    }
}

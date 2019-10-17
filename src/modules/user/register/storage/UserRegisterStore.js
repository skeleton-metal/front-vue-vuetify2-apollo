import RegisterProvider from '../providers/UserRegisterProvider'
import {
    LOADING_USER_REGISTER_OFF,
    LOADING_USER_REGISTER_ON, SET_ACCOUNT_CREATED, SET_CONFIRMATION_EMAIL,
    SET_INPUT_ERROR_REGISTER, SET_REGISTER_FLASH_MESSAGE
} from "./user-register-mutations-type";


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
            return state.inputErrorRegister.some(item => item.field == field)
        },
        getMessagesInRegisterErrors: (state) => (field) => {
            let i = state.inputErrorRegister.find(item => item.field == field)
            return i ? i.messages : []
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

            }).catch((error) => {
                if (error.graphQLErrors && error.graphQLErrors[0].code == "BAD_USER_INPUT" && error.graphQLErrors[0].inputErrors) {
                    commit(SET_INPUT_ERROR_REGISTER, error.graphQLErrors[0].inputErrors)
                } else {
                    //@TODO Handle GENERAL Errors
                    console.log(error)
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
            state.loadingUserRegister = true
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

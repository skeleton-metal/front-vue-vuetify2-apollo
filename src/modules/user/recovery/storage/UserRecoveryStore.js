import UserProfileProvider from '../providers/UserRecoveryProvider'
import jwt_decode from "jwt-decode";

import {
    SET_EXPIRE_TOKEN,
    // eslint-disable-next-line no-unused-vars
    SET_INVALID_TOKEN
} from "./user-recovery-mutation-type";

export default {
    state: {
        loadingUserRecovery: false,
        recoveryStatus: null,
        recoveryMessage: "",
        expireTokenMessage: "",
        invalidToken: false
    },
    getters: {
        getExpireTokenMessage(state) {
            return state.expireTokenMessage
        },
        getInvalidToken(state) {
            return state.invalidToken
        }
    },
    actions: {

        recoveryPassword({commit}, email) {
            commit('LOADING_USERPROFILE_ON')
            commit('SET_RECOVERY_RESULT', {status: null, message: ""})
            UserProfileProvider.recoveryPassword(email).then((response) => {
                commit('SET_RECOVERY_RESULT', response.data.recoveryPassword)
                commit('LOADING_USERPROFILE_OFF')
            }).catch((error) => {
                if (error.message.search("encontro") != -1) {
                    commit('SET_RECOVERY_RESULT', {status: false, message: "No se encontro el usuario"})
                }
            })
        },
        resetRecovery({commit}) {
            commit('SET_RECOVERY_RESULT', {status: null, message: ""})
        },

        checkToken: ({commit}, token) => {
            commit(SET_EXPIRE_TOKEN, "")
            commit('SET_INVALID_TOKEN', false)
            if (token) {
                try {
                    let payload = jwt_decode(token)
                    if (payload.exp) {
                        let dateNow = new Date();
                        let dateToken = new Date(payload.exp * 1000)
                        if (dateNow > dateToken) {
                            console.log("Token expire. Logout.")
                            commit('SET_EXPIRE_TOKEN', "El token ya expiro, realise un nuevo recuperar contraseña")
                        } else {
                            commit('SET_TOKEN', token)
                        }
                    }
                } catch (e) {
                    commit('SET_INVALID_TOKEN', true)
                }
            }
        },

        recoveryPasswordChange({commit}, data) {
            commit('LOADING_USER_PROFILE_ON')
            UserProfileProvider.changePassword(data.password, data.passwordVerify).then((response) => {
                commit('SET_CHANGE_PASSWORD_STATUS', response.data.changePassword.status)
                commit('SET_CHANGE_PASSWORD_MESSAGE', response.data.changePassword.message)
                commit('LOADING_USER_PROFILE_OFF')
                commit('SET_TOKEN', '')
            }).catch((error) => {
                //Todo handleErrors
                console.error(error)
            })
        },
    },
    mutations: {
        LOADING_USERPROFILE_ON(state) {
            state.loadingUserProfile = true
        },
        LOADING_USERPROFILE_OFF(state) {
            state.loadingUserProfile = false
        },
        SET_RECOVERY_RESULT(state, {status, message}) {
            state.recoveryStatus = status
            state.recoveryMessage = message
        },
        SET_EXPIRE_TOKEN(state, data) {
            state.expireTokenMessage = data
        },
        SET_INVALID_TOKEN(state, data) {
            state.invalidToken = data
        }

    }
}

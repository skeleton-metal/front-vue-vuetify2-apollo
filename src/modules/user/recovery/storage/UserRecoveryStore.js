import UserProfileProvider from '../providers/UserRecoveryProvider'


export default {
    state: {
        loadingUserRecovery: false,
        recoveryStatus: null,
        recoveryMessage: ""
    },
    getters: {},
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
        }

    },
    mutations: {
        LOADING_USERPROFILE_ON(state) {
            state.loadingUserProfile = true
        },
        LOADING_USERPROFILE_OFF(state) {
            state.loadingUserProfile = true
        },
        SET_RECOVERY_RESULT(state, {status, message}) {
            state.recoveryStatus = status
            state.recoveryMessage = message
        }

    }
}

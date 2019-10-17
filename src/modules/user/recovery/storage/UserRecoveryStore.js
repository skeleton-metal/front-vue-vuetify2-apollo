import UserProfileProvider from '../providers/UserRecoveryProvider'


export default {
    state: {
        loadingUserRecovery: false,
        recoveryStatus: null,
        recoveryMessage: ""
    },
    getters: {
    },
    actions: {

        recoveryPassword({commit}, email) {
            commit('LOADING_USERPROFILE_ON')
            commit('SET_RECOVERY_RESULT', {status: null, message: ""})
            UserProfileProvider.recoveryPassword(email).then((response) => {
                commit('SET_RECOVERY_RESULT', response.data.recoveryPassword)
                commit('LOADING_USERPROFILE_OFF')
            }).catch((error) => {
                console.error(error)
            })
        },
        resetRecovery({commit}){
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

export default {
    state: {
        generalError: false,
        generalErrorText: null,
    },
    getters: {
    },
    actions: {
        generalError({commit}, error) {
            commit('setGeneralError', error)
        }
    },
    mutations: {
        clearGeneralError(state) {
            state.generalError = false
            state.generalErrorText = ""
        },
        setGeneralError(state, error) {
            state.generalError = true
            state.generalErrorText = error
        }
    }
}
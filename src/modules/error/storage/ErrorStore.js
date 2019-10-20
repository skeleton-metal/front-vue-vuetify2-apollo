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
        setGeneralError(state, error) {
            state.generalError = true
            state.generalErrorText = error
        }
    }
}
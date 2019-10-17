export default {
    state: {
        msg: "message",
    },
    getters: {
        getMsg({state}) {
            return state.msg
        }
    },
    actions: {},
    mutations: {
        setMsg(state, tab) {
            state.msg = tab
        }
    }
}
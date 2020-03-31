const localCustom = JSON.parse(localStorage.getItem('custom'))

export default {
    state: {
        logo: {
            mode: localCustom.logo.mode,
            title: localCustom.logo.title,
            url: localCustom.logo.url

        }
    },
    getters:{
        getLogo: state => {
            return state.logo
        }
    },
    actions: {
      setLogo({commit},logo){
          commit('setLogo',logo)
      }
    },
    mutations: {
        setLogo (state, {mode, title, url}) {
            state.logo.mode = mode
            state.logo.title = title
            state.logo.url = url
        }
    }
}

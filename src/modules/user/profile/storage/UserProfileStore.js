import UserProfileProvider from './../providers/UserProfileProvider'
import {AVATAR_UPDATE} from "../../auth/storage/auth-mutations-type";


export default {
    state: {
        loadingUserProfile: false,
        changePasswordStatus: null,
        changePasswordMessage: ""
    },
    getters: {},
    actions: {

        changeAvatar({commit}, file) {
            commit('LOADING_USER_PROFILE_ON')
            UserProfileProvider.avatarUpload(file).then((response) => {
                console.log(response.data.avatarUpload.url)
                commit(AVATAR_UPDATE,response.data.avatarUpload.url)
                commit('LOADING_USER_PROFILE_OFF')
            }).catch((error) => {
                //Todo handleErrors
            })
        },
        changePassword({commit}, {password, passwordVerify}) {
            commit('LOADING_USER_PROFILE_ON')
            UserProfileProvider.changePassword(password, passwordVerify).then((response) => {
                commit('SET_CHANGE_PASSWORD_STATUS', response.data.changePassword.status)
                commit('SET_CHANGE_PASSWORD_MESSAGE', response.data.changePassword.message)
                commit('LOADING_USER_PROFILE_OFF')
            }).catch((error) => {
                //Todo handleErrors
            })
        },
    },
    mutations: {
        LOADING_USER_PROFILE_ON(state) {
            state.loadingUserProfile = true
        },
        LOADING_USER_PROFILE_OFF(state) {
            state.loadingUserProfile = false
        },
        SET_CHANGE_PASSWORD_STATUS(state, value) {
            state.changePasswordStatus = value
        },
        SET_CHANGE_PASSWORD_MESSAGE(state, value) {
            state.changePasswordMessage = value
        }

    }
}

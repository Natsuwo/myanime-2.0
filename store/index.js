const cookieparser = process.server ? require('cookieparser') : undefined
import { checkUserToken } from "../services/Auth"

export const state = () => {
    return {
        signIn: false
    }
}

export const mutations = {
    setAuth(state, auth) {
        this.state.auth.isLogin = auth.isLogin
        this.state.auth.userToken = auth.token
        this.state.auth.user_id = auth.user_id
    },
    signIn(state, payload) {
        state.signIn = payload
    }
}
export const actions = {
    async nuxtServerInit({ commit }, { req }) {
        if (req.headers.cookie) {
            var cookie = cookieparser.parse(req.headers.cookie)
            var headers = {
                "x-user-session": cookie.USER_ACCESS_TOKEN || ""
            }
            var checkAuth = (await checkUserToken({ headers })).data
            if (checkAuth.success) {
                commit('setAuth', { user_id: checkAuth.user_id, token: checkAuth.token, isLogin: true })
            }
        }
    }
}
const cookieparser = process.server ? require('cookieparser') : undefined
import { checkUserToken } from "../services/Auth"
import { getFollowing } from "../services/User"
import { getFlags } from "../services/Language"
import { getTerms } from "../services/Anime"
export const state = () => {
    return {
        signIn: false,
        flags: []
    }
}

export const mutations = {
    signIn(state, payload) {
        state.signIn = payload
    },
    getFlags(state, payload) {
        state.flags = payload
    }
}
export const actions = {
    async nuxtServerInit({ commit }, { req }) {
        if (req.headers.cookie) {
            var cookie = cookieparser.parse(req.headers.cookie)
            var headers = {
                "x-user-session": cookie.USER_ACCESS_TOKEN || ""
            }
            var checkAuth = (await checkUserToken(headers)).data
            if (checkAuth.success) {
                commit('auth/setAuth', { profile: checkAuth.user, token: checkAuth.token, isLogin: true })
                // // following
                var follow = await getFollowing(headers)
                commit('auth/getFollowing', follow.data.data)
            }
        }
        // Get Flags
        var flags = (await getFlags()).data
        commit("getFlags", flags.result)
        var terms = (await getTerms()).data
        commit("anime/getTerms", terms.data)
    }
}
const cookieparser = process.server ? require('cookieparser') : undefined
import { checkUserToken } from "../services/Auth"
import { getFollowing, getNoti } from "../services/User"
import { getFlags } from "../services/Language"
import { getTerms, getSettings } from "../services/Anime"

export const state = () => {
    return {
        signIn: false,
        flags: [],
        settings: [],
        isLoading: false
    }
}

export const mutations = {
    signIn(state, payload) {
        state.signIn = payload
    },
    getFlags(state, payload) {
        state.flags = payload
    },
    setSettings(state, payload) {
        state.settings = payload
    },
    SET_LOADING(state, isLoading) {
        state.isLoading = isLoading
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
                // Noti
                var noti = await getNoti(headers)
                commit('auth/setNoti', noti.data.results)
            }
        }
        // Get Flags
        var flags = (await getFlags()).data
        commit("getFlags", flags.result)
        var terms = (await getTerms()).data
        commit("anime/getTerms", terms.data)
        var { settings } = (await getSettings()).data
        commit("setSettings", settings)
    }
}
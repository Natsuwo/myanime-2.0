const USERMETA = 'usermeta'

export const state = () => {
    return {
        isLogin: false,
        userToken: "",
        profile: {},
        usermeta: [],
        following: [],
        followprofile: []
    }
}

export const actions = {
    async userMetaData({ commit }, data) {
        return commit(USERMETA, { data })
    }
}

export const mutations = {
    setAuth(state, auth) {
        state.isLogin = auth.isLogin
        state.userToken = auth.token
        state.profile = auth.profile
    },
    updateAvatar(state, avatar) {
        state.profile.avatar = avatar
    },
    getFollowing(state, following) {
        state.following = following
    },
    getFollowProfile(state, follows) {
        state.followprofile = follows
    },
    follow(state, item) {
        state.following.unshift(item)
    },
    unfollow(state, item) {
        var indexA = state.following.findIndex(x => x.anime_id === item.anime_id)
        if (indexA >= 0) {
            state.following.splice(indexA, 1)
        }
        if (state.followprofile.animes.length > 0) {
            var indexB = state.followprofile.animes.indexOf(item)
            if (indexB && indexB >= 0) {
                state.followprofile.animes.splice(indexB, 1)
                state.followprofile.metas.splice(indexB, 1)
            }
        }
    },
    [USERMETA](state, { data }) {
        state.usermeta = data
    }
}
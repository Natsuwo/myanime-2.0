const USERMETA = 'usermeta'

export const state = () => {
    return {
        isLogin: false,
        userToken: "",
        profile: {},
        usermeta: [],
        following: [],
        lists: []
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
    getLists(state, follows) {
        state.lists = follows
    },
    updateLists(state, { item, option, type }) {
        var oldValue = item.meta_value
        var index = state.lists.follow[type.title].findIndex(x => x.parent_id === item.parent_id)
        if (index >= 0) {
            state.lists.follow[type.title][index].meta_value = option.title
            state.lists.follow[option.title].unshift(state.lists.follow[type.title][index])
        }
        var indexRe = state.lists.follow[oldValue].findIndex(x => x.parent_id === item.parent_id)
        if (indexRe >= 0) {
            state.lists.follow[oldValue].splice(indexRe, 1)
        }

        if (option.title === 'completed' || option.title === 'skipping') {
            var indexF = state.following.findIndex(x => x.anime_id === item.parent_id)
            if (indexF >= 0) state.following.splice(indexF, 1)
        }
    },
    follow(state, item) {
        if (item.description) item.description = undefined
        state.following.unshift(item)
    },
    unfollow(state, item) {
        var indexA = state.following.findIndex(x => x.anime_id === item.anime_id)
        if (indexA >= 0) {
            state.following.splice(indexA, 1)
        }
        if (!state.lists.length && state.lists.animes.length > 0) {
            var indexB = state.lists.animes.indexOf(item)
            if (indexB && indexB >= 0) {
                state.lists.animes.splice(indexB, 1)
                state.lists.metas.splice(indexB, 1)
            }
            var types = ["all", "watching", "considering", "completed", "skipping"]
            for (var type of types) {
                var index = state.lists.follow[type].findIndex(x => x.parent_id === item.anime_id)
                if (index >= 0) {
                    state.lists.follow[type].splice(index, 1)
                }
            }
        }

    },
    [USERMETA](state, { data }) {
        state.usermeta = data
    }
}
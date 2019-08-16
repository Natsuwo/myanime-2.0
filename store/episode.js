const EPISODE = 'fetch'
const EPISODES = 'getusermeta'
const SIDEBAR = 'sidebar'
const LOADMORE = 'loadmore'
const LOADMORECHANNEL = 'loadmorechannel'

export const state = () => ({
    episodes: [],
    episode: [],
    sidebar: []
})

export const actions = {
    async episodesData({ commit }, data) {
        return commit(EPISODES, { episodes: data })
    },
    async episodeData({ commit }, data) {
        return commit(EPISODE, { episode: data })
    },
    async sidebarData({ commit }, data) {
        return commit(SIDEBAR, { data })
    },
    async sidebarLoadmore({ commit }, res) {
        return commit(LOADMORE, { res })
    },
    async loadMoreChannel({ commit }, res) {
        return commit(LOADMORECHANNEL, { res })
    }
}

export const mutations = {
    [EPISODES](state, { episodes }) {
        return state.episodes = episodes;
    },
    [EPISODE](state, { episode }) {
        return state.episode = episode;
    },
    [SIDEBAR](state, { data }) {
        return state.sidebar = data;
    },
    [LOADMORE](state, { res }) {
        var current = state.sidebar.playList
        var newData = res.data
        return state.sidebar.playList = current.concat(newData)
    },
    [LOADMORECHANNEL](state, { res }) {
        var current = state.episodes.all
        var newData = res.data
        return state.episodes.all = current.concat(newData)
    }
}
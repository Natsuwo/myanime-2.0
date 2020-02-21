const EPISODE = 'fetch'
const EPISODES = 'episodes'
const SIDEBAR = 'sidebar'
const LOADMORE = 'loadmore'

export const state = () => ({
    episodes: {
        recent: [],
        trending: [],
        random: [],
        current: []
    },
    episode: [],
    sidebar: []
})

export const actions = {
    async episodesData({ commit }, { type, data }) {
        return commit(EPISODES, { type, data })
    },
    async episodeData({ commit }, data) {
        return commit(EPISODE, { episode: data })
    },
    async sidebarData({ commit }, data) {
        return commit(SIDEBAR, { data })
    },
    async sidebarLoadmore({ commit }, res) {
        return commit(LOADMORE, { res })
    }
}

export const mutations = {
    [EPISODES](state, { type, data }) {
         state.episodes[type] = data;
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
    errorThumb(state, { target, item }) {
        var index = state.sidebar[target].indexOf(item)
        if (index > -1) {
            state.sidebar[target][index].thumbnail = '/thumb-error.jpg'
        }
    }
}
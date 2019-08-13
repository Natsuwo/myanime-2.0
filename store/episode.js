const EPISODE = 'fetch'
const EPISODES = 'getusermeta'
const SIDEBAR = 'sidebar'

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
    }
}
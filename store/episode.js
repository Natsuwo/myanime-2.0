import { getEpisodes, getEpisode, getUserMeta, getDataSidebar } from "../services/Episode"

const FETCH = 'fetch'
const SHOW = 'show'
const SIDEBAR = 'sidebar'
const EDIT = 'edit'
const DELETE = 'delete'
const ADD = 'add'
const GETUSERMETA = 'getusermeta'

export const state = () => ({
    episodes: [],
    episode: {},
    sidebar: []
})

export const actions = {
    async getEpisodes({ commit }) {
        let response = (await getEpisodes()).data
        return commit(FETCH, { episodes: response.data })
    },
    async getEpisode({ commit }, data) {
        let response = (await getEpisode(data.headers, data.form)).data
        return commit(SHOW, { episode: response.data })
    },
    async getUserMeta({ commit }, data) {
        let response = (await getUserMeta(data.headers, data.anime_id, data.episode_id))
        return commit(GETUSERMETA, { data: response.data })
    },
    async getSidebar({ commit }, data) {
        let response = (await getDataSidebar(data.headers, data.form.episode_id)).data
        return commit(SIDEBAR, { sidebar: response.data })
    }
    // async addUser({ commit }, data = {}) {
    //     let response = await callApiAdd(data)
    //     return response;
    // },
    // async getUser({ commit }, data = {}) {
    //     let response = await callApiShow(data)

    //     return commit(SHOW, { user: response.data })
    // },
    // async editUser({ commit }, data) {
    //     let response = await callApiEdit(data.id, data)

    //     return commit(EDIT, { user: response.data })
    // },
    // async deleteUser({ commit }, data) {
    //     let response = await callApiDelete(data)
    //     return response;
    // },
}

export const mutations = {
    [FETCH](state, { episodes }) {
        return state.episodes = episodes;
    },
    [SHOW](state, { episode }) {
        return state.episode = episode;
    },
    [SIDEBAR](state, { sidebar }) {
        return state.sidebar = sidebar;
    },
    [GETUSERMETA](state, { data }) {
        if (data.success) {
            return state.episode.usermeta = data.result;
        }
    },
    // [EDIT](state, payload) {
    //    console.log()
    // },
}
import { getEpisodes, getEpisode, likeEpisode } from "../services/Episode"

const FETCH = 'fetch'
const SHOW = 'show'
const EDIT = 'edit'
const DELETE = 'delete'
const ADD = 'add'

export const state = () => ({
    episodes: [],
    episode: {}
})

export const actions = {
    async getEpisodes({ commit }) {
        let response = (await getEpisodes()).data
        return commit(FETCH, { episodes: response.data })
    },
    async getEpisode({ commit }, data) {
        let response = (await getEpisode(data.headers, data.form)).data
        return commit(SHOW, { episode: response.data, comments: response.comment })
    },
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
    [SHOW](state, { episode, comments }) {
        state.comments = comments
        return state.episode = episode;
    },
    // [EDIT](state, payload) {
    //    console.log()
    // },
}
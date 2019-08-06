import { like, unlike, changeVote } from "../services/Vote"

const ADD = 'add'
const LIKE = 'like'
const DISLIKE = 'dislike'
const DELETE = 'delete'

export const actions = {
    async add({ commit }, data) {
        await like(data.headers, data.form)
        return commit(ADD, data.form.isLike)
    },
    async like({ commit }, data) {
        await changeVote(data.headers, data.form)
        return commit(LIKE)
    },
    async dislike({ commit }, data) {
        await changeVote(data.headers, data.form)
        return commit(DISLIKE)
    },
    async unlike({ commit }, data) {
        await unlike(data.headers, data.form)
        return commit(DELETE, data.form.isLike)
    }
}

export const mutations = {
    [ADD](state, payload) {
        if (payload) {
            return this.state.episode.episode.likes += 1
        }
        return this.state.episode.episode.dislikes += 1

    },
    [LIKE](state, payload) {
        this.state.episode.episode.likes += 1
        this.state.episode.episode.dislikes -= 1

    },
    [DISLIKE](state, payload) {
        this.state.episode.episode.dislikes += 1
        this.state.episode.episode.likes -= 1

    },
    [DELETE](state, payload) {
        if (payload) {
            return this.state.episode.episode.likes -= 1
        }
        this.state.episode.episode.dislikes -= 1
    }
}
import { like, unlike, changeVote } from "../services/Vote"

const ADD = 'add'
const LIKE = 'like'
const DISLIKE = 'dislike'
const DELETE = 'delete'

export const actions = {
    async add({ commit }, data) {
        var response = await like(data.headers, data.form)
        return commit(ADD, { data: response.data, isLike: data.form.isLike })
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
    [ADD](state, { isLike, data }) {
        this.state.episode.episode.usermeta.push(data.result)
        if (isLike) {
            return this.state.episode.episode.likes += 1
        }
        return this.state.episode.episode.dislikes += 1

    },
    [LIKE](state, payload) {
        var index = this.state.episode.episode.usermeta.findIndex(x => x.meta_key === 'vote')
        this.state.episode.episode.usermeta[index].meta_value = true
        this.state.episode.episode.likes += 1
        this.state.episode.episode.dislikes -= 1
    },
    [DISLIKE](state, payload) {
        var index = this.state.episode.episode.usermeta.findIndex(x => x.meta_key === 'vote')
        this.state.episode.episode.usermeta[index].meta_value = false
        this.state.episode.episode.dislikes += 1
        this.state.episode.episode.likes -= 1
    },
    [DELETE](state, payload) {
        var index = this.state.episode.episode.usermeta.findIndex(x => x.meta_key === 'vote')
        this.state.episode.episode.usermeta.splice(index, 1);
        if (payload) {
            return this.state.episode.episode.likes -= 1
        }
        this.state.episode.episode.dislikes -= 1
    }
}